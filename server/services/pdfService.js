import PDFDocument from 'pdfkit';

const formatSectionLine = (line) => line.replace(/\*\*/g, '').trim();
const isHeading = (line) => /^\*\*[A-Z\s]+\*\*$/.test(line.trim()) || /^[A-Z\s]{4,}$/.test(line.trim());

export const pdfService = {
  async generateContractPdf({ type, title, jurisdiction, parties, content }) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margins: { top: 72, bottom: 72, left: 72, right: 72 }, bufferPages: true });
      const chunks = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const displayTitle = (title || `${type} Contract`).trim();
      doc.font('Helvetica-Bold').fontSize(20).text(displayTitle, { align: 'center' });
      doc.moveDown(0.3);
      doc
        .font('Helvetica')
        .fontSize(11)
        .fillColor('#6b7280')
        .text(`Date: [DATE]    Jurisdiction: ${jurisdiction || '[CITY, STATE]'}`, { align: 'center' });
      doc.fillColor('#111827');
      doc.moveDown(0.6);
      const lineY = doc.y;
      doc.moveTo(doc.page.margins.left, lineY).lineTo(doc.page.width - doc.page.margins.right, lineY).stroke('#d1d5db');

      doc.moveDown(1);
      doc.font('Helvetica-Bold').fontSize(13).text('PARTIES');
      doc.moveDown(0.4);
      doc.font('Helvetica').fontSize(11);
      doc.text(`Party A: ${parties?.partyA || '_____________________'}`);
      doc.text(`Party B: ${parties?.partyB || '_____________________'}`);

      doc.moveDown(0.8);
      const lines = (content || '').split('\n').map((line) => line.trim()).filter(Boolean);

      for (const rawLine of lines) {
        const line = formatSectionLine(rawLine);
        if (!line) continue;

        if (isHeading(rawLine)) {
          doc.moveDown(0.4);
          doc.font('Helvetica-Bold').fontSize(12).text(line.toUpperCase());
          doc.moveDown(0.2);
        } else {
          doc.font('Helvetica').fontSize(11).text(line, {
            align: 'left',
            indent: /^\d/.test(line) ? 8 : 0,
            lineGap: 3,
          });
        }
      }

      doc.moveDown(1.5);
      doc.font('Helvetica-Bold').fontSize(12).text('SIGNATURES');
      doc.moveDown(0.6);

      const startX = doc.page.margins.left;
      const colWidth = (doc.page.width - doc.page.margins.left - doc.page.margins.right - 24) / 2;
      const y = doc.y;

      doc.font('Helvetica').fontSize(11);
      doc.text('Party A: ___________________', startX, y, { width: colWidth });
      doc.text('Party B: ___________________', startX + colWidth + 24, y, { width: colWidth });
      doc.text('Name: ', startX, y + 28, { width: colWidth });
      doc.text('Name: ', startX + colWidth + 24, y + 28, { width: colWidth });
      doc.text('Date: ', startX, y + 56, { width: colWidth });
      doc.text('Date: ', startX + colWidth + 24, y + 56, { width: colWidth });

      const pageCount = doc.bufferedPageRange().count;
      for (let i = 0; i < pageCount; i += 1) {
        doc.switchToPage(i);
        doc.font('Helvetica').fontSize(10).fillColor('#6b7280').text(`Page ${i + 1} of ${pageCount}`, 0, doc.page.height - 50, {
          align: 'center',
        });
      }

      doc.end();
    });
  },
};
