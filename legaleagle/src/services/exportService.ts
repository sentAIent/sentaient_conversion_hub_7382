import { Document, Packer, Paragraph, TextRun, UnderlineType } from 'docx';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { Recommendation } from '@/types';
import { tokenize, findFuzzyMatch } from '@/utils/textMatching';

export const exportToWord = async (documentText: string, recommendations: Recommendation[], documentName: string) => {
    // We will build a list of paragraphs
    const paragraphs: Paragraph[] = [];
    
    // Sort highlights
    const highlights: Array<{
        start: number;
        end: number;
        proposedText: string;
    }> = [];

    const docTokens = tokenize(documentText);

    recommendations.forEach(rec => {
        if (!rec.currentText || !rec.proposedText) return;
        const match = findFuzzyMatch(docTokens, rec.currentText);
        if (match) {
            highlights.push({
                start: match.start,
                end: match.end,
                proposedText: rec.proposedText
            });
        }
    });

    highlights.sort((a, b) => a.start - b.start);

    // Split document into lines to preserve newlines
    const lines = documentText.split('\n');
    let currentIndex = 0;

    for (const line of lines) {
        const lineStart = currentIndex;
        const lineEnd = currentIndex + line.length;
        
        // Find highlights that intersect with this line
        const lineHighlights = highlights.filter(h => h.end > lineStart && h.start < lineEnd);
        
        const runs: TextRun[] = [];
        let currentLineIndex = lineStart;
        
        for (const h of lineHighlights) {
            // Add normal text before highlight
            if (h.start > currentLineIndex) {
                runs.push(new TextRun({ text: documentText.slice(currentLineIndex, h.start) }));
            }
            
            // Add struck-through original text
            const highlightEnd = Math.min(h.end, lineEnd);
            const originalChunk = documentText.slice(Math.max(currentLineIndex, h.start), highlightEnd);
            
            if (originalChunk) {
                runs.push(new TextRun({
                    text: originalChunk,
                    strike: true,
                    color: "FF0000" // Red for deleted
                }));
            }
            
            // Add proposed text (only if we're at the end of the highlight so we don't duplicate it across lines)
            if (h.end <= lineEnd) {
                runs.push(new TextRun({
                    text: h.proposedText,
                    underline: { type: UnderlineType.SINGLE, color: "0000FF" },
                    color: "0000FF" // Blue for inserted
                }));
            }
            
            currentLineIndex = highlightEnd;
        }
        
        // Add remaining normal text in the line
        if (currentLineIndex < lineEnd) {
            runs.push(new TextRun({ text: documentText.slice(currentLineIndex, lineEnd) }));
        }

        // Add empty run for blank lines to preserve spacing
        if (runs.length === 0) {
            runs.push(new TextRun({ text: "" }));
        }

        paragraphs.push(new Paragraph({ children: runs }));
        currentIndex += line.length + 1; // +1 for the newline character
    }

    const doc = new Document({
        sections: [{
            properties: {},
            children: paragraphs
        }]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, (documentName || 'Document').replace('.txt', '') + '_Redline.docx');
};

export const exportToPdf = async (documentText: string, documentName: string) => {
    const doc = new jsPDF();
    const splitText = doc.splitTextToSize(documentText, 180);
    
    let y = 20;
    for (let i = 0; i < splitText.length; i++) {
        if (y > 280) {
            doc.addPage();
            y = 20;
        }
        doc.text(splitText[i], 15, y);
        y += 7;
    }
    
    doc.save(`${(documentName || 'Document').replace('.txt', '')}_Redline.pdf`);
};
