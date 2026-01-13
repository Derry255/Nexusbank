import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, QrCode, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBank } from "@/context/BankContext";
import { BANK_CONFIG } from "@/config/bankConfig";

const Receive = () => {
  const navigate = useNavigate();
  const { user } = useBank();
  const [copied, setCopied] = useState(false);

  const accountNumber = "1234567890";
  const routingNumber = "021000021";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border"
      >
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display font-bold text-lg">Receive Money</h1>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* QR Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-card text-center"
        >
          <div className="w-48 h-48 mx-auto mb-6 bg-secondary rounded-2xl flex items-center justify-center">
            <QrCode className="w-32 h-32 text-foreground/20" />
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Scan this QR code to send money to
          </p>
          <p className="font-display font-bold text-lg">
            {user?.firstName} {user?.lastName}
          </p>
        </motion.div>

        {/* Account Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-6 shadow-card space-y-4"
        >
          <h2 className="font-display font-semibold text-lg">Account Details</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
              <div>
                <p className="text-xs text-muted-foreground">Account Number</p>
                <p className="font-mono font-semibold">{accountNumber}</p>
              </div>
              <button
                onClick={() => handleCopy(accountNumber)}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
              <div>
                <p className="text-xs text-muted-foreground">Routing Number</p>
                <p className="font-mono font-semibold">{routingNumber}</p>
              </div>
              <button
                onClick={() => handleCopy(routingNumber)}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
              <div>
                <p className="text-xs text-muted-foreground">Bank Name</p>
                <p className="font-semibold">{BANK_CONFIG.name}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Share Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button className="w-full h-14 font-semibold text-base">
            <Share2 className="w-5 h-5 mr-2" />
            Share Account Details
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Receive;
