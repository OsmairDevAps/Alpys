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