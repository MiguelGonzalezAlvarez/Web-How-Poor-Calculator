import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculationResult, Country, SearchHistoryItem } from '../types';
import { formatCurrency } from '../services/utils/formatters';

interface PDFExportOptions {
  language: 'es' | 'en';
  includeCharts: boolean;
  includeDetailed: boolean;
  title?: string;
}

const COLORS = {
  primary: [37, 99, 235],
  secondary: [100, 116, 139],
  success: [34, 197, 94],
  warning: [245, 158, 11],
  danger: [239, 68, 68],
  light: [248, 250, 252],
  dark: [15, 23, 42],
};

export const generatePDFReport = async (
  salary: number,
  currency: string,
  originCountry: Country,
  results: CalculationResult[],
  options: PDFExportOptions
): Promise<void> => {
  const { language, includeCharts, includeDetailed } = options;
  const isEs = language === 'es';

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = margin;

  // Header with gradient effect
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(isEs ? 'Informe de Poder Adquisitivo' : 'Purchasing Power Report', margin, 25);

  // Subtitle
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const subtitle = isEs 
    ? `Análisis completo de tu salario en el contexto internacional`
    : `Complete analysis of your salary in international context`;
  doc.text(subtitle, margin, 35);

  yPos = 55;

  // Date
  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(10);
  const dateStr = new Date().toLocaleDateString(isEs ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.text(dateStr, pageWidth - margin, yPos, { align: 'right' });

  yPos += 15;

  // Section 1: Current Situation
  doc.setFillColor(...COLORS.light);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 35, 3, 3, 'F');
  
  yPos += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text(isEs ? 'Tu Situación Actual' : 'Your Current Situation', margin + 5, yPos);
  
  yPos += 10;
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.dark);
  
  const salaryFormatted = formatCurrency(salary, currency);
  const countryName = isEs ? originCountry.nameEs : originCountry.name;
  
  doc.setFont('helvetica', 'bold');
  doc.text(isEs ? 'Salario:' : 'Salary:', margin + 5, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(salaryFormatted, margin + 40, yPos);
  
  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text(isEs ? 'País:' : 'Country:', margin + 5, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(countryName, margin + 40, yPos);

  yPos += 25;

  // Section 2: Top Destinations
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text(isEs ? 'Mejores Destinos para Tu Salario' : 'Best Destinations for Your Salary', margin, yPos);

  yPos += 8;

  const topResults = results.slice(0, 10);
  
  const tableData = topResults.map((result, index) => {
    const destCountry = isEs ? result.country.nameEs : result.country.name;
    const destRegion = isEs ? result.region.nameEs : result.region.name;
    const equivalent = formatCurrency(result.equivalentSalary, result.currency);
    const status = isEs 
      ? result.status === 'better' ? 'Mejor' : result.status === 'worse' ? 'Peor' : 'Similar'
      : result.status.charAt(0).toUpperCase() + result.status.slice(1);
    
    return [index + 1, destCountry, destRegion, equivalent, `${result.purchasingPowerIndex}`, status];
  });

  const tableHeaders = isEs 
    ? ['#', 'País', 'Región', 'Salario Equivalente', 'Índice PP', 'Estado']
    : ['#', 'Country', 'Region', 'Equivalent Salary', 'PP Index', 'Status'];

  autoTable(doc, {
    startY: yPos,
    head: [tableHeaders],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: COLORS.primary,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10,
    },
    bodyStyles: {
      fontSize: 9,
      textColor: COLORS.dark,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 40 },
      2: { cellWidth: 35 },
      3: { cellWidth: 35, halign: 'right' },
      4: { cellWidth: 25, halign: 'center' },
      5: { cellWidth: 30, halign: 'center' },
    },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index === 5) {
        const status = data.cell.raw as string;
        if (status === 'Mejor' || status === 'Better') {
          data.cell.styles.textColor = COLORS.success;
          data.cell.styles.fontStyle = 'bold';
        } else if (status === 'Peor' || status === 'Worse') {
          data.cell.styles.textColor = COLORS.danger;
        }
      }
    },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Section 3: Summary Statistics
  if (yPos < pageHeight - 60) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.primary);
    doc.text(isEs ? 'Resumen Estadístico' : 'Statistical Summary', margin, yPos);
    
    yPos += 10;

    const betterCount = results.filter(r => r.status === 'better').length;
    const similarCount = results.filter(r => r.status === 'similar').length;
    const worseCount = results.filter(r => r.status === 'worse').length;
    const avgSalary = results.reduce((acc, r) => acc + r.equivalentSalary, 0) / results.length;
    const avgPP = results.reduce((acc, r) => acc + r.purchasingPowerIndex, 0) / results.length;

    const statsData = [
      [isEs ? 'Países mejores' : 'Better countries', betterCount.toString()],
      [isEs ? 'Países similares' : 'Similar countries', similarCount.toString()],
      [isEs ? 'Países peores' : 'Worse countries', worseCount.toString()],
      [isEs ? 'Salario promedio equiv.' : 'Avg equivalent salary', formatCurrency(avgSalary, currency)],
      [isEs ? 'Índice PP promedio' : 'Avg PP index', avgPP.toFixed(1)],
    ];

    autoTable(doc, {
      startY: yPos,
      head: [[isEs ? 'Métrica' : 'Metric', isEs ? 'Valor' : 'Value']],
      body: statsData,
      theme: 'plain',
      headStyles: {
        fillColor: COLORS.secondary,
        textColor: [255, 255, 255],
        fontSize: 10,
      },
      bodyStyles: {
        fontSize: 9,
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 30, halign: 'right' },
      },
    });
  }

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.secondary);
    
    const footerText = isEs
      ? 'Generado por How Poor I Am | Los datos son aproximados y no constituyen asesoramiento financiero'
      : 'Generated by How Poor I Am | Data is approximate and does not constitute financial advice';
    
    doc.text(footerText, margin, pageHeight - 10);
    doc.text(`Page ${i} / ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
  }

  // Save the PDF
  const filename = `how-poor-report-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
};

export const generateQuickPDF = async (
  salary: number,
  currency: string,
  originCountry: Country,
  destination: CalculationResult,
  language: 'es' | 'en'
): Promise<void> => {
  const isEs = language === 'es';
  const doc = new jsPDF();
  
  const originName = isEs ? originCountry.nameEs : originCountry.name;
  const destName = isEs ? destination.country.nameEs : destination.country.name;
  const destRegion = isEs ? destination.region.nameEs : destination.region.name;
  
  // Header
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, 210, 30, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text('How Poor I Am', 15, 15);
  doc.setFontSize(10);
  doc.text(isEs ? 'Comparación rápida' : 'Quick comparison', 15, 22);
  
  // Content
  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(12);
  let y = 45;
  
  doc.setFont('helvetica', 'bold');
  doc.text(isEs ? 'De:' : 'From:', 15, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${formatCurrency(salary, currency)} (${originName})`, 50, y);
  
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.text(isEs ? 'A:' : 'To:', 15, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${destName} - ${destRegion}`, 50, y);
  
  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.text(isEs ? 'Salario equivalente:' : 'Equivalent salary:', 15, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.primary);
  doc.setFontSize(16);
  doc.text(formatCurrency(destination.equivalentSalary, destination.currency), 15, y + 8);
  
  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(10);
  y += 25;
  doc.text(isEs 
    ? 'Para mantener tu mismo nivel de vida' 
    : 'To maintain your same standard of living', 15, y);
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    isEs ? 'howpoor.app' : 'howpoor.app', 
    105, 
    280, 
    { align: 'center' }
  );
  
  doc.save(`how-poor-${originCountry.id}-${destination.country.id}.pdf`);
};
