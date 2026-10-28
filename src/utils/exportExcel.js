import * as XLSX from 'xlsx';

export const exportToExcel = (data, fileName = 'relatorio_senai.xlsx', sheetName = 'Dados') => {
  if (!data || data.length === 0) {
    alert('Não há dados disponíveis para exportação.');
    return;
  }
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);
};