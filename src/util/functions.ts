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
