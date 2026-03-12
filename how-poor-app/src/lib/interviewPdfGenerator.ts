import jsPDF from 'jspdf';
import { CalculationResult } from '../types';
import { formatCurrency } from '../services/utils/formatters';

export interface InterviewPDFOptions {
  salary: number;
  currency: string;
  originCountry: string;
  originRegion: string;
  results: CalculationResult[];
  language: 'es' | 'en';
}

export const generateInterviewPDF = (options: InterviewPDFOptions): void => {
  const { salary, currency, originCountry, originRegion, results, language } = options;
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = margin;

  const isEs = language === 'es';

  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pageWidth, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(isEs ? '💼 Comparativa Salarial' : '💼 Salary Comparison', margin, 18);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('How Poor I Am - Purchasing Power Calculator', margin, 26);

  yPos = 50;

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(isEs ? 'Situación Actual' : 'Current Situation', margin, yPos);
  yPos += 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`${isEs ? 'Salario / Salary:' : 'Salary:'} ${formatCurrency(salary, currency)}`, margin, yPos);
  yPos += 7;
  doc.text(`${isEs ? 'País / Country:' : 'Country:'} ${originCountry}`, margin, yPos);
  yPos += 7;
  doc.text(`${isEs ? 'Región / Region:' : 'Region:'} ${originRegion}`, margin, yPos);
  yPos += 15;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(isEs ? 'Top 5 Destinos / Top 5 Destinations' : 'Salary Comparison for Interview', margin, yPos);
  yPos += 10;

  const top5 = results.slice(0, 5);
  
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, yPos - 5, pageWidth - margin * 2, 8, 'F');
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('#', margin + 2, yPos);
  doc.text(isEs ? 'País' : 'Country', margin + 10, yPos);
  doc.text(isEs ? 'Salario Equiv.' : 'Equiv. Salary', margin + 80, yPos);
  doc.text(isEs ? 'Diferencia' : 'Difference', margin + 135, yPos);
  yPos += 10;

  doc.setFont('helvetica', 'normal');
  top5.forEach((result, index) => {
    const diff = ((result.equivalentSalary - salary) / salary * 100).toFixed(0);
    const diffText = `${diff > 0 ? '+' : ''}${diff}%`;
    
    doc.setFontSize(10);
    doc.text(`${index + 1}`, margin + 2, yPos);
    doc.text(`${result.country.flag} ${result.region?.name || result.country.name}`, margin + 10, yPos);
    doc.text(formatCurrency(result.equivalentSalary, result.currency), margin + 80, yPos);
    doc.text(diffText, margin + 135, yPos);
    yPos += 8;
  });

  yPos += 10;

  doc.setDrawColor(226, 232, 240);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(isEs ? 'Nota / Note' : 'Note', margin, yPos);
  yPos += 7;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const noteText = isEs 
    ? 'Esta comparativa muestra el salario equivalente para mantener el mismo poder adquisitivo. Los cálculos son aproximados y pueden variar según situación personal.'
    : 'This comparison shows equivalent salary to maintain same purchasing power. Calculations are approximate and may vary based on personal situation.';
  
  const splitNote = doc.splitTextToSize(noteText, pageWidth - margin * 2);
  doc.text(splitNote, margin, yPos);
  yPos += 20;

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  const footerText = isEs 
    ? 'Generado con How Poor I Am | Datos de World Bank, Numbeo, OECD'
    : 'Generated with How Poor I Am | Data from World Bank, Numbeo, OECD';
  doc.text(footerText, margin, yPos);

  const fileName = `salary-comparison-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
