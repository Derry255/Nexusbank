import { motion } from "framer-motion";
import { Eye, EyeOff, CreditCard } from "lucide-react";
import { useState } from "react";
import { useBank } from "@/context/BankContext";
import { BANK_CONFIG } from "@/config/bankConfig";

const BalanceCard = () => {
  const { balance, user } = useBank();
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="gradient-hero rounded-2xl p-6 md:p-8 text-primary-foreground relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-primary-foreground/70 text-sm font-medium mb-1">
              Welcome back,
            </p>
            <h2 className="text-xl md:text-2xl font-display font-bold">
              {user?.firstName} {user?.lastName}
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
            <CreditCard className="w-4 h-4" />
            <span className="text-sm font-medium">{BANK_CONFIG.accountNumber}</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <p className="text-primary-foreground/70 text-sm">Available Balance</p>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <motion.p
            key={showBalance ? "visible" : "hidden"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="balance-display text-3xl md:text-4xl lg:text-5xl"
          >
            {showBalance ? formatCurrency(balance) : "••••••••"}
          </motion.p>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
            <span className="text-primary-foreground/80">Active</span>
          </div>
          <span className="text-primary-foreground/50">|</span>
          <span className="text-primary-foreground/70">{BANK_CONFIG.name}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceCard;
