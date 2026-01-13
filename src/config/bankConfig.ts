// ============================================
// BANK CONFIGURATION - EDIT VALUES HERE
// ============================================

// User credentials - change these to your preferred login details
export const USER_CREDENTIALS = {
  email: "demo@mybank.com",
  password: "Demo123!",
  firstName: "John",
  lastName: "Smith",
};

// Starting balance - change this to set initial account balance
export const INITIAL_BALANCE = 12847.53;

// Transaction history - add, remove, or modify transactions here
export const INITIAL_TRANSACTIONS = [
  {
    id: "1",
    type: "credit" as const,
    description: "Salary Deposit",
    amount: 5200.00,
    date: "2026-01-13",
    category: "Income",
  },
  {
    id: "2",
    type: "debit" as const,
    description: "Netflix Subscription",
    amount: 15.99,
    date: "2026-01-12",
    category: "Entertainment",
  },
  {
    id: "3",
    type: "debit" as const,
    description: "Grocery Store",
    amount: 127.43,
    date: "2026-01-11",
    category: "Shopping",
  },
  {
    id: "4",
    type: "credit" as const,
    description: "Freelance Payment",
    amount: 850.00,
    date: "2026-01-10",
    category: "Income",
  },
  {
    id: "5",
    type: "debit" as const,
    description: "Electric Bill",
    amount: 89.50,
    date: "2026-01-08",
    category: "Utilities",
  },
  {
    id: "6",
    type: "debit" as const,
    description: "Coffee Shop",
    amount: 4.75,
    date: "2026-01-07",
    category: "Food & Drink",
  },
  {
    id: "7",
    type: "debit" as const,
    description: "Amazon Purchase",
    amount: 67.99,
    date: "2026-01-05",
    category: "Shopping",
  },
];

// Bank name and branding
export const BANK_CONFIG = {
  name: "NexusBank",
  tagline: "Your Digital Banking Partner",
  accountNumber: "****4521",
  routingNumber: "****8847",
};
