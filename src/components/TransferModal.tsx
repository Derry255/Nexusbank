import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBank } from "@/context/BankContext";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TransferStep = "form" | "confirm" | "success" | "error";

const TransferModal = ({ isOpen, onClose }: TransferModalProps) => {
  const { balance, makeTransfer } = useBank();
  const [step, setStep] = useState<TransferStep>("form");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const amountNum = parseFloat(amount);

    if (!recipient.trim()) {
      setError("Please enter a recipient name");
      return;
    }

    if (isNaN(amountNum) || amountNum <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (amountNum > balance) {
      setError("Insufficient balance");
      return;
    }

    setStep("confirm");
  };

  const handleConfirm = () => {
    const amountNum = parseFloat(amount);
    const success = makeTransfer(amountNum, recipient, description);
    
    if (success) {
      setStep("success");
    } else {
      setStep("error");
    }
  };

  const handleClose = () => {
    setStep("form");
    setRecipient("");
    setAmount("");
    setDescription("");
    setError("");
    onClose();
  };

  const renderContent = () => {
    switch (step) {
      case "form":
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Name</Label>
              <Input
                id="recipient"
                placeholder="Enter recipient name"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12 pl-8"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Available: {formatCurrency(balance)}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="What's this for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-12"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            <Button type="submit" className="w-full h-12 font-semibold">
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        );

      case "confirm":
        return (
          <div className="space-y-6">
            <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">To</span>
                <span className="font-semibold">{recipient}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-display font-bold text-xl">
                  {formatCurrency(parseFloat(amount))}
                </span>
              </div>
              {description && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Description</span>
                  <span className="font-medium">{description}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("form")}
                className="flex-1 h-12"
              >
                Back
              </Button>
              <Button onClick={handleConfirm} className="flex-1 h-12 font-semibold">
                Confirm Transfer
              </Button>
            </div>
          </div>
        );

      case "success":
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 mx-auto mb-6 rounded-full gradient-success flex items-center justify-center"
            >
              <CheckCircle2 className="w-10 h-10 text-success-foreground" />
            </motion.div>
            <h3 className="text-xl font-display font-bold mb-2">
              Transfer Successful!
            </h3>
            <p className="text-muted-foreground mb-6">
              {formatCurrency(parseFloat(amount))} sent to {recipient}
            </p>
            <Button onClick={handleClose} className="w-full h-12 font-semibold">
              Done
            </Button>
          </motion.div>
        );

      case "error":
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-6"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
            <h3 className="text-xl font-display font-bold mb-2">
              Transfer Failed
            </h3>
            <p className="text-muted-foreground mb-6">
              Something went wrong. Please try again.
            </p>
            <Button onClick={() => setStep("form")} className="w-full h-12 font-semibold">
              Try Again
            </Button>
          </motion.div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card rounded-2xl p-6 shadow-lg z-50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold">
                {step === "success" ? "" : step === "confirm" ? "Confirm Transfer" : "Send Money"}
              </h2>
              {step !== "success" && (
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {renderContent()}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TransferModal;
