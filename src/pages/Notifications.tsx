import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, CheckCircle2, AlertCircle, Info, Gift, TrendingUp } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "success",
    icon: <CheckCircle2 className="w-5 h-5" />,
    title: "Transfer Successful",
    message: "Your transfer of $250.00 to John Smith was successful.",
    time: "2 mins ago",
    read: false,
  },
  {
    id: 2,
    type: "promo",
    icon: <Gift className="w-5 h-5" />,
    title: "New Offer Available",
    message: "Earn 5% cashback on all online purchases this weekend!",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "alert",
    icon: <AlertCircle className="w-5 h-5" />,
    title: "Security Alert",
    message: "New login detected from iPhone 15 Pro in New York.",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "info",
    icon: <Info className="w-5 h-5" />,
    title: "Bill Reminder",
    message: "Your electricity bill of $125.50 is due in 3 days.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 5,
    type: "success",
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Savings Goal Reached",
    message: "Congratulations! You've reached your vacation savings goal.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 6,
    type: "info",
    icon: <Bell className="w-5 h-5" />,
    title: "Direct Deposit Received",
    message: "A deposit of $3,500.00 has been added to your account.",
    time: "3 days ago",
    read: true,
  },
];

const getNotificationStyle = (type: string) => {
  switch (type) {
    case "success":
      return "bg-green-500/20 text-green-600";
    case "alert":
      return "bg-red-500/20 text-red-600";
    case "promo":
      return "bg-purple-500/20 text-purple-600";
    default:
      return "bg-blue-500/20 text-blue-600";
  }
};

const Notifications = () => {
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border"
      >
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-display font-bold text-lg">Notifications</h1>
          </div>
          {unreadCount > 0 && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-card rounded-2xl p-4 shadow-card flex gap-4 ${
                !notification.read ? "border-l-4 border-primary" : ""
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${getNotificationStyle(
                  notification.type
                )}`}
              >
                {notification.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold">{notification.title}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {notification.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.message}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Notifications;
