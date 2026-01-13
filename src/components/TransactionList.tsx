import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, ShoppingBag, Zap, Film, Coffee, Package, DollarSign } from "lucide-react";
import { useBank } from "@/context/BankContext";
import { Transaction } from "@/types/bank";

const categoryIcons: Record<string, React.ReactNode> = {
  "Income": <DollarSign className="w-4 h-4" />,
  "Shopping": <ShoppingBag className="w-4 h-4" />,
  "Utilities": <Zap className="w-4 h-4" />,
  "Entertainment": <Film className="w-4 h-4" />,
  "Food & Drink": <Coffee className="w-4 h-4" />,
  "Transfer": <ArrowUpRight className="w-4 h-4" />,
};

const TransactionItem = ({ transaction, index }: { transaction: Transaction; index: number }) => {
  const isCredit = transaction.type === "credit";
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="flex items-center justify-between p-4 hover:bg-secondary/50 rounded-xl transition-colors cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isCredit
              ? "bg-accent/10 text-accent"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {isCredit ? (
            <ArrowDownLeft className="w-5 h-5" />
          ) : (
            categoryIcons[transaction.category] || <Package className="w-4 h-4" />
          )}
        </div>
        <div>
          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
            {transaction.description}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatDate(transaction.date)} · {transaction.category}
          </p>
        </div>
      </div>
      <p
        className={`font-display font-semibold ${
          isCredit ? "text-accent" : "text-foreground"
        }`}
      >
        {isCredit ? "+" : "-"}{formatCurrency(transaction.amount)}
      </p>
    </motion.div>
  );
};

const TransactionList = () => {
  const { transactions } = useBank();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-card rounded-2xl p-6 shadow-card"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display font-semibold text-foreground">
          Recent Transactions
        </h3>
        <span className="text-sm text-muted-foreground">
          {transactions.length} transactions
        </span>
      </div>

      <div className="space-y-1">
        {transactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No transactions yet
          </p>
        ) : (
          transactions.map((transaction, index) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              index={index}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};

export default TransactionList;
