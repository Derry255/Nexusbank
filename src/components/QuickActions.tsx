import { motion } from "framer-motion";
import { Send, Download, Receipt, MoreHorizontal } from "lucide-react";

interface QuickActionsProps {
  onTransferClick: () => void;
}

const QuickActions = ({ onTransferClick }: QuickActionsProps) => {
  const actions = [
    {
      icon: <Send className="w-5 h-5" />,
      label: "Transfer",
      onClick: onTransferClick,
      primary: true,
    },
    {
      icon: <Download className="w-5 h-5" />,
      label: "Receive",
      onClick: () => {},
    },
    {
      icon: <Receipt className="w-5 h-5" />,
      label: "Pay Bills",
      onClick: () => {},
    },
    {
      icon: <MoreHorizontal className="w-5 h-5" />,
      label: "More",
      onClick: () => {},
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="grid grid-cols-4 gap-3"
    >
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 + index * 0.05 }}
          onClick={action.onClick}
          className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-105 active:scale-95 ${
            action.primary
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-card text-foreground hover:bg-secondary shadow-card"
          }`}
        >
          {action.icon}
          <span className="text-xs font-medium">{action.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default QuickActions;
