import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LogOut, Bell, Settings } from "lucide-react";
import { useBank } from "@/context/BankContext";
import { BANK_CONFIG } from "@/config/bankConfig";
import BalanceCard from "@/components/BalanceCard";
import QuickActions from "@/components/QuickActions";
import TransactionList from "@/components/TransactionList";
import TransferModal from "@/components/TransferModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useBank();
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border"
      >
        <div className="max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl gradient-hero flex items-center justify-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full gradient-success" />
            </div>
            <span className="font-display font-bold text-sm sm:text-base text-foreground">
              {BANK_CONFIG.name}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button 
              onClick={() => navigate("/notifications")}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
            </button>
            <button 
              onClick={() => navigate("/settings")}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
            </button>
            <button
              onClick={handleLogout}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <BalanceCard />
        <QuickActions onTransferClick={() => setIsTransferOpen(true)} />
        <TransactionList />
      </main>

      {/* Transfer Modal */}
      <TransferModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
