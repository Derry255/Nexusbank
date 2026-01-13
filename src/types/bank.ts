export interface Transaction {
  id: string;
  type: "credit" | "debit";
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
}

export interface BankState {
  user: User | null;
  balance: number;
  transactions: Transaction[];
  isAuthenticated: boolean;
}
