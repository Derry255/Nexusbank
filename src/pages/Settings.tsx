import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Lock,
  Bell,
  Smartphone,
  CreditCard,
  Globe,
  Moon,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useBank } from "@/context/BankContext";

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useBank();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const settingsSections = [
    {
      title: "Account",
      items: [
        { icon: <User className="w-5 h-5" />, label: "Personal Information", hasArrow: true },
        { icon: <Lock className="w-5 h-5" />, label: "Change Password", hasArrow: true },
        { icon: <CreditCard className="w-5 h-5" />, label: "Linked Cards", hasArrow: true },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: <Bell className="w-5 h-5" />,
          label: "Push Notifications",
          toggle: true,
          value: notifications,
          onChange: setNotifications,
        },
        {
          icon: <Smartphone className="w-5 h-5" />,
          label: "Biometric Login",
          toggle: true,
          value: biometric,
          onChange: setBiometric,
        },
        {
          icon: <Moon className="w-5 h-5" />,
          label: "Dark Mode",
          toggle: true,
          value: darkMode,
          onChange: setDarkMode,
        },
        { icon: <Globe className="w-5 h-5" />, label: "Language", subtitle: "English (US)", hasArrow: true },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: <HelpCircle className="w-5 h-5" />, label: "Help Center", hasArrow: true },
        { icon: <FileText className="w-5 h-5" />, label: "Terms & Privacy", hasArrow: true },
      ],
    },
  ];

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
          <h1 className="font-display font-bold text-lg">Settings</h1>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-card flex items-center gap-4"
        >
          <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center text-white font-display font-bold text-xl">
            {user?.firstName?.charAt(0) || "U"}
          </div>
          <div>
            <p className="font-display font-bold text-lg">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </motion.div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + sectionIndex * 0.05 }}
            className="bg-card rounded-2xl shadow-card overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {section.title}
              </h2>
            </div>
            {section.items.map((item, index) => (
              <button
                key={item.label}
                className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors border-b border-border last:border-b-0 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.label}</p>
                    {item.subtitle && (
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    )}
                  </div>
                </div>
                {item.toggle ? (
                  <Switch
                    checked={item.value}
                    onCheckedChange={item.onChange}
                  />
                ) : item.hasArrow ? (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                ) : null}
              </button>
            ))}
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 p-4 bg-destructive/10 text-destructive rounded-2xl font-semibold hover:bg-destructive/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </motion.button>

        {/* App Version */}
        <p className="text-center text-sm text-muted-foreground">
          Version 1.0.0
        </p>
      </main>
    </div>
  );
};

export default Settings;
