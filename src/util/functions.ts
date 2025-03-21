import { DateTime } from "luxon";

export const convertDateStringToDate = (dateStr: string): Date => {
  // Converte a string para um objeto DateTime
  const dateTime = DateTime.fromFormat(dateStr, "dd/MM/yyyy", { zone: "UTC" });
  // Verifica se a conversão foi válida
  if (!dateTime.isValid) {
    throw new Error("Formato de data inválido. Use o formato dd/MM/yyyy.");
  }
  // Retorna a data no formato YYYY-MM-DD HH:mm:ss+ZZ
  return dateTime.toJSDate();
}

export const convertDateToString = (date: Date): string => {
  console.log(date)
  return DateTime.fromJSDate(date).toFormat("dd/MM/yyyy");
};

export const convertISOToFormattedString = (isoString: string): string => {
  const dateTime = DateTime.fromISO(isoString, { zone: "UTC" });
  if (!dateTime.isValid) {
    throw new Error("Data inválida.");
  }
  // Retorna a data no formato dd/mm/yyyy
  return dateTime.toFormat("dd/MM/yyyy");
};

export function getSecondWord(text: string) {
  // Divide o texto usando o caractere "-"
  const parts = text.split(" - ");
  
  // Retorna a segunda parte se existir
  return parts[1] || "";
}

export const convertDateFormat = (dateStr: string): string => {
  // Converte a string "dd/MM/yyyy" para um objeto DateTime
  const dateTime = DateTime.fromFormat(dateStr, "dd/MM/yyyy");

  // Verifica se a conversão foi bem-sucedida
  if (!dateTime.isValid) {
    throw new Error("Formato de data inválido. Use dd/MM/yyyy.");
  }

  // Retorna no formato "yyyy-MM-dd"
  return dateTime.toFormat("yyyy-MM-dd");
};

export const formatarData = (data: Date) => {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
};
