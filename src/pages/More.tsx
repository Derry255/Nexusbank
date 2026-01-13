import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  PiggyBank,
  TrendingUp,
  Gift,
  ShieldCheck,
  HelpCircle,
  FileText,
  Users,
  Globe,
} from "lucide-react";

const moreOptions = [
  { icon: <CreditCard className="w-5 h-5" />, label: "Cards", description: "Manage your debit & credit cards", path: "/cards" },
  { icon: <Wallet className="w-5 h-5" />, label: "Accounts", description: "View all your accounts", path: "/accounts" },
  { icon: <PiggyBank className="w-5 h-5" />, label: "Savings Goals", description: "Set and track savings goals", path: "/savings" },
  { icon: <TrendingUp className="w-5 h-5" />, label: "Investments", description: "Stocks, bonds & mutual funds", path: "/investments" },
  { icon: <Gift className="w-5 h-5" />, label: "Rewards", description: "Redeem your cashback rewards", path: "/rewards" },
  { icon: <Users className="w-5 h-5" />, label: "Refer Friends", description: "Earn $50 for each referral", path: "/referrals" },
  { icon: <Globe className="w-5 h-5" />, label: "International", description: "Send money abroad", path: "/international" },
  { icon: <ShieldCheck className="w-5 h-5" />, label: "Security Center", description: "Manage security settings", path: "/security" },
  { icon: <FileText className="w-5 h-5" />, label: "Statements", description: "Download account statements", path: "/statements" },
  { icon: <HelpCircle className="w-5 h-5" />, label: "Help & Support", description: "Get help with your account", path: "/support" },
];

const More = () => {
  const navigate = useNavigate();

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
          <h1 className="font-display font-bold text-lg">More Options</h1>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl shadow-card overflow-hidden"
        >
          {moreOptions.map((option, index) => (
            <motion.button
              key={option.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors border-b border-border last:border-b-0 text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                {option.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{option.label}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {option.description}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default More;
