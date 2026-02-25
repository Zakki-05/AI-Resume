import React, { useState, useCallback } from 'react';
import { Upload, CheckCircle2, AlertCircle, Search, Zap } from 'lucide-react';
import { Card, Badge } from '../ui';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeAnalyzer: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisStep, setAnalysisStep] = useState(0);
    const [results, setResults] = useState<any | null>(null);

    const steps = [
        "Parsing resume sections...",
        "Extracting keywords and skills...",
        "Matching with industry standards...",
        "Analyzing readability and structure...",
        "Generating personalized suggestions..."
    ];

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    }, []);

    const startAnalysis = async () => {
        setAnalyzing(true);
        setAnalysisStep(0);

        // Simulate multi-step analysis
        for (let i = 0; i < steps.length; i++) {
            setAnalysisStep(i);
            await new Promise(resolve => setTimeout(resolve, 1500));
        }

        setResults({
            score: 82,
            skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GraphQL'],
            missingSkills: ['Docker', 'AWS', 'Unit Testing', 'CI/CD'],
            readability: 'Excellent',
            atsMatch: 'High',
            suggestions: [
                "Include more quantifiable achievements in your Experience section.",
                "Add a professional summary at the top to highlight your core strengths.",
                "Include links to your key GitHub projects for technical validation.",
                "Mention 'Agile Methodology' to improve relevance for project-based roles."
            ]
        });
        setAnalyzing(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display tracking-tight">Resume <span className="gradient-text">Analyzer AI</span></h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Upload your resume and get instant visual insights and suggestions.
                    </p>
                </div>
                {file && !analyzing && !results && (
                    <button onClick={startAnalysis} className="btn-primary flex items-center gap-2">
                        <Zap className="w-4 h-4 fill-current" />
                        Analyze Now
                    </button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {!analyzing && !results ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={`
                relative h-80 rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-8 text-center
                ${isDragging ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/10' : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50'}
                ${file ? 'border-emerald-500 bg-emerald-50/10' : ''}
              `}
                        >
                            <div className={`p-6 rounded-full mb-4 transition-transform duration-500 ${isDragging ? 'scale-110 bg-primary-100 dark:bg-primary-900/30' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                {file ? <CheckCircle2 className="w-10 h-10 text-emerald-500" /> : <Upload className={`w-10 h-10 ${isDragging ? 'text-primary-600' : 'text-slate-400'}`} />}
                            </div>

                            <h3 className="text-xl font-bold mb-2">
                                {file ? file.name : "Drag and drop your resume"}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                                {file ? `Size: ${(file.size / 1024).toFixed(1)} KB` : "Supports PDF, DOCX, and PNG formats (Max 5MB)"}
                            </p>

                            {!file && (
                                <label className="mt-6 cursor-pointer group">
                                    <span className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-medium group-hover:bg-primary-700 transition-all">
                                        Browse Files
                                    </span>
                                    <input type="file" className="hidden" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
                                </label>
                            )}

                            {file && (
                                <button onClick={() => setFile(null)} className="mt-4 text-sm font-semibold text-rose-500 hover:underline">
                                    Remove and try another
                                </button>
                            )}
                        </div>
                    </motion.div>
                ) : analyzing ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-8"
                    >
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full border-4 border-slate-100 dark:border-slate-800" />
                            <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-primary-500 border-t-transparent animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Search className="w-8 h-8 text-primary-500 animate-pulse" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold font-display">Analyzing Your Career Profile</h2>
                            <p className="text-slate-500 animate-pulse">{steps[analysisStep]}</p>
                        </div>

                        <div className="w-full max-w-md h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${((analysisStep + 1) / steps.length) * 100}%` }}
                            />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* Results Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="flex flex-col items-center justify-center text-center p-6 sm:p-10">
                                <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                                        <motion.circle
                                            cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent"
                                            className="text-primary-500"
                                            strokeDasharray={364}
                                            initial={{ strokeDashoffset: 364 }}
                                            animate={{ strokeDashoffset: 364 - (364 * results.score) / 100 }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                    </svg>
                                    <span className="absolute text-4xl font-bold">{results.score}</span>
                                </div>
                                <h3 className="text-xl font-bold">Resume Score</h3>
                                <p className="text-slate-500 mt-2">Overall strength compared to industry standards</p>
                                <button onClick={() => setResults(null)} className="mt-8 text-sm font-semibold text-primary-600 hover:underline">
                                    Analyze Another Resume
                                </button>
                            </Card>

                            <div className="lg:col-span-2 space-y-6">
                                <Card>
                                    <h3 className="font-bold mb-4 flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-amber-500" />
                                        Detected Skills
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {results.skills.map((skill: string) => (
                                            <Badge key={skill} variant="success" className="px-4 py-1.5 text-sm">{skill}</Badge>
                                        ))}
                                    </div>

                                    <h3 className="font-bold mt-8 mb-4 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-rose-500" />
                                        Missing Critical Skills
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {results.missingSkills.map((skill: string) => (
                                            <Badge key={skill} variant="danger" className="px-4 py-1.5 text-sm">{skill}</Badge>
                                        ))}
                                    </div>
                                </Card>

                                <Card>
                                    <h3 className="font-bold mb-4">Improvement Suggestions</h3>
                                    <div className="space-y-3">
                                        {results.suggestions.map((s: string, i: number) => (
                                            <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                                <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0 mt-0.5">
                                                    <span className="text-xs font-bold text-primary-600">{i + 1}</span>
                                                </div>
                                                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{s}</p>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResumeAnalyzer;
