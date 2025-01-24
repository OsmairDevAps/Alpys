import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useTransactionSupabase } from "@/src/database/useTransactionSupabase";
import { IDataTransaction } from "@/src/constants/interface";

type FinanceData = {
  sales: number;
  buys: number;
  balance: number;
};

type FinanceContextType = {
  data: FinanceData;
  dataTransaction: IDataTransaction[];
  updateSales: (value: number) => void;
  updateBuys: (value: number) => void;
  isLoading: boolean;
};

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FinanceData>({ sales: 0, buys: 0, balance: 0 });
  const [dataTransaction, setDataTransaction] = useState<IDataTransaction[]>([])
  const useTransactionDatabase = useTransactionSupabase()
  const [isLoading, setIsLoading] = useState(true);

  const fetchFinanceData = async (): Promise<FinanceData> => {
    const response = await useTransactionDatabase.listGraphic()
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          sales: Number(response[0].sale),
          buys: Number(response[0].buy),
          balance: Number(response[0].sale) - Number(response[0].buy),
        });
      }, 1000)
    );
  };

  const fetchFinanceItems = async(): Promise<IDataTransaction[]> => {
    const response: IDataTransaction[] = await useTransactionDatabase.list()
    return new Promise((resolve) => 
      resolve(response)
    );
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const [financeData, financeTransaction] = await Promise.all([
          fetchFinanceData(),
          fetchFinanceItems(),
        ]);

        setData(financeData);
        setDataTransaction(financeTransaction); 
      } catch (error) {
        console.error("Erro ao carregar dados financeiros:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    loadData();
  }, []);

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
    <FinanceContext.Provider value={{ data, dataTransaction, updateSales, updateBuys, isLoading }}>
      {children}
    </FinanceContext.Provider>
  );
};

export default function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) throw new Error("useFinance must be used within FinanceProvider");
  return context;
};
