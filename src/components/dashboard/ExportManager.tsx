import React from 'react';
import { Download, FileText, Printer } from 'lucide-react';
import { Card } from '../ui';

interface ExportManagerProps {
    onExportPDF: () => void;
    onExportDOCX?: () => void;
}

const ExportManager: React.FC<ExportManagerProps> = ({ onExportPDF, onExportDOCX }) => {
    return (
        <Card className="no-print">
            <div className="flex flex-col gap-4">
                <div>
                    <h3 className="text-lg font-bold">Export Options</h3>
                    <p className="text-sm text-slate-500">Download your resume in professional formats.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        onClick={onExportPDF}
                        className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md group"
                    >
                        <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Download PDF
                    </button>

                    <button
                        onClick={() => onExportDOCX ? onExportDOCX() : alert('DOCX Export coming soon! Using PDF is recommended for best formatting.')}
                        className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all group"
                    >
                        <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Export DOCX
                    </button>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300">
                        <Printer className="w-5 h-5 mt-0.5" />
                        <div className="text-xs space-y-1">
                            <p className="font-bold">Pro Tip for PDF:</p>
                            <p className="opacity-80">When the print window opens, set 'Destination' to 'Save as PDF' and disable 'Headers and Footers' for a cleaner look.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ExportManager;
