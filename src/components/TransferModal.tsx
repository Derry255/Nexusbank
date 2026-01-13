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
  const [accountNumber, setAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
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

    if (!accountNumber.trim() || accountNumber.length < 8) {
      setError("Please enter a valid account number (min 8 digits)");
      return;
    }

    if (!recipientName.trim()) {
      setError("Please enter recipient name");
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
    const success = makeTransfer(amountNum, recipientName, `To account: ${accountNumber}`);
    
    if (success) {
      setStep("success");
    } else {
      setStep("error");
    }
  };

  const handleClose = () => {
    setStep("form");
    setAccountNumber("");
    setRecipientName("");
    setAmount("");
    setError("");
    onClose();
  };

  const renderContent = () => {
    switch (step) {
      case "form":
        return (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Recipient Account Number</Label>
              <Input
                id="accountNumber"
                type="text"
                inputMode="numeric"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                className="h-12 text-base"
                maxLength={16}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipientName">Recipient Name</Label>
              <Input
                id="recipientName"
                placeholder="Enter recipient's full name"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount to Transfer</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
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
                  className="h-12 pl-8 text-base"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Available balance: {formatCurrency(balance)}
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <Button type="submit" className="w-full h-12 font-semibold text-base">
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        );

      case "confirm":
        return (
          <div className="space-y-6">
            <div className="bg-secondary/50 rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Account Number</span>
                <span className="font-mono font-semibold">{accountNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Recipient Name</span>
                <span className="font-semibold">{recipientName}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-border">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-display font-bold text-2xl text-primary">
                  {formatCurrency(parseFloat(amount))}
                </span>
              </div>
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
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 mx-auto mb-6 rounded-full gradient-success flex items-center justify-center"
            >
              <CheckCircle2 className="w-12 h-12 text-success-foreground" />
            </motion.div>
            <h3 className="text-2xl font-display font-bold mb-2">
              Transfer Successful!
            </h3>
            <p className="text-muted-foreground mb-2">
              {formatCurrency(parseFloat(amount))}
            </p>
            <p className="text-muted-foreground mb-8">
              sent to <span className="font-semibold text-foreground">{recipientName}</span>
            </p>
            <Button onClick={handleClose} className="w-full h-12 font-semibold text-base">
              Done
            </Button>
          </motion.div>
        );

      case "error":
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-destructive" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-2">
              Transfer Failed
            </h3>
            <p className="text-muted-foreground mb-8">
              Something went wrong. Please try again.
            </p>
            <Button onClick={() => setStep("form")} className="w-full h-12 font-semibold text-base">
              Try Again
            </Button>
          </motion.div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border">
            <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
              <h2 className="text-xl font-display font-bold">
                {step === "success" ? "Complete" : step === "confirm" ? "Confirm Transfer" : "Send Money"}
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
          </div>

          {/* Content */}
          <div className="max-w-lg mx-auto px-4 py-6">
            {renderContent()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransferModal;
