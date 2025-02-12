import React, { createContext, useState, useContext, ReactNode } from "react";
import { useTransactionSupabase } from "@/src/database/useTransactionSupabase";
import { IDataTransaction } from "@/src/constants/interface";

type FinanceData = {
  datetransaction: string;
  buy: number;
  sale: number;
};

type DataResume = {
  buy: number;
  sale: number;
  resume: number;
};

type FinanceContextType = {
  dataResume: DataResume;
  dataTransaction: IDataTransaction[];
  loadData: (dtIni: string, dtFim: string) => Promise<void>;
  isLoading: boolean;
};

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FinanceData[]>([]);
  const [dataResume, setDataResume] = useState<DataResume>({} as DataResume);
  const [dataTransaction, setDataTransaction] = useState<IDataTransaction[]>([]);
  const useTransactionDatabase = useTransactionSupabase();
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async (dtIni: string, dtFim: string) => {
    setIsLoading(true);
    try {
      const financeData: FinanceData[] | null = await useTransactionDatabase.listResume(dtIni, dtFim)
      const financeTransaction: IDataTransaction[] | null = await useTransactionDatabase.listTransactions(dtIni, dtFim)
      if (financeData) {
        const total_buy = financeData.reduce((sum, row) => sum + (row.buy ? Number(row.buy) : 0), 0);
        const total_sale = financeData.reduce((sum, row) => sum + (row.sale ? Number(row.sale) : 0), 0);
        const total_resume = Number(total_sale) - Number(total_buy)
        setDataResume({buy: Number(total_buy), sale: Number(total_sale), resume: Number(total_resume)});
      }
      setDataTransaction(financeTransaction || [])
    } catch (error) {
      console.error("Erro ao carregar dados financeiros:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FinanceContext.Provider value={{ dataResume, dataTransaction, loadData, isLoading }}>
      {children}
    </FinanceContext.Provider>
  );
};

export default function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) throw new Error("useFinance must be used within FinanceProvider");
  return context;
};