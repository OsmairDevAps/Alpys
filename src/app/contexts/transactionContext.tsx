import React, { createContext, useState, useContext, useEffect } from "react";

type FinanceData = {
  sales: number;
  buys: number;
  balance: number;
};

type FinanceContextType = {
  data: FinanceData;
  updateSales: (value: number) => void;
  updateBuys: (value: number) => void;
};

const FinanceContext = createContext<FinanceContextType | null>(null);

export const FinanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<FinanceData>({ sales: 0, buys: 0, balance: 0 });

  const updateSales = (value: number) => {
    setData((prev) => ({
      ...prev,
      sales: prev.sales + value,
      balance: prev.balance + value,
    }));
  };

  const updateBuys = (value: number) => {
    setData((prev) => ({
      ...prev,
      buys: prev.buys + value,
      balance: prev.balance - value,
    }));
  };

  return (
    <FinanceContext.Provider value={{ data, updateSales, updateBuys }}>
      {children}
    </FinanceContext.Provider>
  );
};

export default function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) throw new Error("useFinance must be used within FinanceProvider");
  return context;
};
