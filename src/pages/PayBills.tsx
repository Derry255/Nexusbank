import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Wifi, Droplets, Phone, Tv, CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const billCategories = [
  { icon: <Zap className="w-6 h-6" />, label: "Electricity", color: "bg-yellow-500/20 text-yellow-600" },
  { icon: <Wifi className="w-6 h-6" />, label: "Internet", color: "bg-blue-500/20 text-blue-600" },
  { icon: <Droplets className="w-6 h-6" />, label: "Water", color: "bg-cyan-500/20 text-cyan-600" },
  { icon: <Phone className="w-6 h-6" />, label: "Mobile", color: "bg-green-500/20 text-green-600" },
  { icon: <Tv className="w-6 h-6" />, label: "Cable TV", color: "bg-purple-500/20 text-purple-600" },
  { icon: <CreditCard className="w-6 h-6" />, label: "Credit Card", color: "bg-red-500/20 text-red-600" },
];

const savedBillers = [
  { name: "City Power Co.", category: "Electricity", lastPaid: "Dec 15, 2025", amount: 125.50 },
  { name: "FastNet Internet", category: "Internet", lastPaid: "Jan 02, 2026", amount: 79.99 },
  { name: "WaterWorks Utility", category: "Water", lastPaid: "Jan 05, 2026", amount: 45.00 },
];

const PayBills = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
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
          <h1 className="font-display font-bold text-lg">Pay Bills</h1>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Bill Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-card"
        >
          <h2 className="font-display font-semibold text-lg mb-4">Categories</h2>
          <div className="grid grid-cols-3 gap-3">
            {billCategories.map((category, index) => (
              <motion.button
                key={category.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category.label)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                  selectedCategory === category.label
                    ? "bg-primary text-primary-foreground"
                    : category.color
                }`}
              >
                {category.icon}
                <span className="text-xs font-medium">{category.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Saved Billers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-6 shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg">Saved Billers</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              <Plus className="w-4 h-4 mr-1" />
              Add New
            </Button>
          </div>

          <div className="space-y-3">
            {savedBillers.map((biller, index) => (
              <motion.button
                key={biller.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                className="w-full flex items-center justify-between p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors text-left"
              >
                <div>
                  <p className="font-semibold">{biller.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Last paid: {biller.lastPaid}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold">{formatCurrency(biller.amount)}</p>
                  <p className="text-xs text-muted-foreground">{biller.category}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Quick Pay Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button className="w-full h-14 font-semibold text-base">
            Pay Selected Bill
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default PayBills;
