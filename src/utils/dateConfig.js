export const days = Array.from({ length: 31 }, (_, i) => i + 1);
export const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];
const currentYear = new Date().getFullYear();
export const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

export const getTodayFormatted = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); 
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const convertToDayMonthYear = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};