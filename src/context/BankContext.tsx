import React, { createContext, useContext, useState, useCallback } from "react";
import { Transaction, User, BankState } from "@/types/bank";
import {
  USER_CREDENTIALS,
  INITIAL_BALANCE,
  INITIAL_TRANSACTIONS,
} from "@/config/bankConfig";

interface BankContextType extends BankState {
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  makeTransfer: (amount: number, recipient: string, description: string) => boolean;
}

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<number>(INITIAL_BALANCE);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback((email: string, password: string) => {
    // Check email first
    if (email !== USER_CREDENTIALS.email) {
      return { success: false, error: "Wrong email" };
    }
    
    // Then check password
    if (password !== USER_CREDENTIALS.password) {
      return { success: false, error: "Wrong password" };
    }

    // Both correct - login successful
    setUser({
      email: USER_CREDENTIALS.email,
      firstName: USER_CREDENTIALS.firstName,
      lastName: USER_CREDENTIALS.lastName,
    });
    setIsAuthenticated(true);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    // Reset to initial state
    setBalance(INITIAL_BALANCE);
    setTransactions(INITIAL_TRANSACTIONS);
  }, []);

  const makeTransfer = useCallback((amount: number, recipient: string, description: string) => {
    if (amount > balance || amount <= 0) {
      return false;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "debit",
      description: `Transfer to ${recipient}${description ? ` - ${description}` : ""}`,
      amount: amount,
      date: new Date().toISOString().split("T")[0],
      category: "Transfer",
    };

    setBalance((prev) => parseFloat((prev - amount).toFixed(2)));
    setTransactions((prev) => [newTransaction, ...prev]);
    return true;
  }, [balance]);

  return (
    <BankContext.Provider
      value={{
        user,
        balance,
        transactions,
        isAuthenticated,
        login,
        logout,
        makeTransfer,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => {
  const context = useContext(BankContext);
  if (context === undefined) {
    throw new Error("useBank must be used within a BankProvider");
  }
  return context;
};
