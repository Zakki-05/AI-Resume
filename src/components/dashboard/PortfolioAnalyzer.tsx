import React, { useState } from 'react';
import { Globe, Github, Linkedin, ExternalLink, ShieldCheck, Cpu, Palette, BarChart, Zap, Search } from 'lucide-react';
import { Card, Badge } from '../ui';
import { motion, AnimatePresence } from 'framer-motion';

const PortfolioAnalyzer: React.FC = () => {
    const [url, setUrl] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [results, setResults] = useState<any | null>(null);

    const handleAnalyze = async () => {
        if (!url) return;
        setAnalyzing(true);
        // Simulation
        await new Promise(resolve => setTimeout(resolve, 3000));

        setResults({
            strength: 88,
            metrics: [
                { label: 'Project Quality', score: 92, icon: Cpu, color: 'text-blue-500', desc: 'Highly complex projects with clean code structure.' },
                { label: 'UI/UX Design', score: 85, icon: Palette, color: 'text-pink-500', desc: 'Modern aesthetics with good responsive behavior.' },
                { label: 'Tech Stack', score: 80, icon: Zap, color: 'text-amber-500', desc: 'Relevant modern stack (React, Tailwind, Node).' },
                { label: 'Marketability', score: 95, icon: BarChart, color: 'text-emerald-500', desc: 'Excellent presentation for top-tier tech roles.' },
            ],
            suggestions: [
                "Add a 'Live Demo' link for every project listed on GitHub.",
                "Include a detailed 'About Me' section to show personality.",
                "Optimize images for better lighthouse performance scores.",
                "List specific contributions if projects were collaborative."
            ]
        });
        setAnalyzing(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display tracking-tight">Portfolio <span className="gradient-text">AI Auditor</span></h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Enter your GitHub or Personal Website URL for a deep technical audit.
                    </p>
                </div>
            </div>

            <Card className="p-8">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                    <div className="flex items-center gap-4 p-2 pl-6 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-inner focus-within:ring-2 focus-within:ring-primary-500/20 transition-all">
                        <Globe className="w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="https://github.com/username or yourportfolio.com"
                            className="flex-1 bg-transparent border-none outline-none py-3 text-lg"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <button
                            onClick={handleAnalyze}
                            disabled={!url || analyzing}
                            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed hidden sm:flex items-center gap-2"
                        >
                            {analyzing ? <Search className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                            Analyze
                        </button>
                    </div>
                    <button
                        onClick={handleAnalyze}
                        disabled={!url || analyzing}
                        className="btn-primary w-full sm:hidden flex items-center justify-center gap-2"
                    >
                        {analyzing ? "Analyzing..." : "Analyze Portfolio"}
                    </button>

                    <div className="flex items-center justify-center gap-6 text-slate-400">
                        <div className="flex items-center gap-2"><Github className="w-4 h-4" /> <span className="text-xs font-semibold">GitHub</span></div>
                        <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> <span className="text-xs font-semibold">Websites</span></div>
                        <div className="flex items-center gap-2"><Linkedin className="w-4 h-4" /> <span className="text-xs font-semibold">LinkedIn</span></div>
                    </div>
                </div>
            </Card>

            <AnimatePresence>
                {analyzing && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="glass-card p-12 text-center space-y-6"
                    >
                        <div className="flex justify-center">
                            <div className="relative w-20 h-20">
                                <div className="absolute inset-0 rounded-full border-4 border-primary-500/20" />
                                <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Globe className="w-8 h-8 text-primary-500 animate-pulse" />
                                </div>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold font-display">Auditing Portfolio Experience...</h3>
                        <p className="text-slate-500">Checking project complexity and code quality patterns</p>
                    </motion.div>
                )}

                {results && !analyzing && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {results.metrics.map((metric: any, i: number) => (
                                <Card key={i} className="flex flex-col gap-4">
                                    <div className={`p-3 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit ${metric.color}`}>
                                        <metric.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-slate-500">{metric.label}</p>
                                            <span className="font-bold">{metric.score}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${metric.score}%` }}
                                                className="h-full bg-primary-500"
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                            />
                                        </div>
                                        <p className="text-xs text-slate-500 mt-3 leading-relaxed">{metric.desc}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="lg:col-span-1 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-primary-600 to-violet-700 text-white border-none">
                                <ShieldCheck className="w-16 h-16 mb-4 opacity-90" />
                                <h3 className="text-2xl font-bold">Portfolio Strength</h3>
                                <div className="text-6xl font-black my-4">{results.strength}</div>
                                <Badge className="bg-white/20 text-white border-none py-1.5 px-4 mb-6">Expert Level</Badge>
                                <p className="text-sm text-primary-100/80 leading-relaxed">
                                    Your portfolio is in the top 5% of candidate profiles we've analyzed this month.
                                </p>
                            </Card>

                            <Card className="lg:col-span-2">
                                <h3 className="font-bold mb-6 flex items-center gap-2 text-xl">
                                    <Zap className="w-6 h-6 text-primary-500" />
                                    AI Recommendations
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {results.suggestions.map((s: string, i: number) => (
                                        <div key={i} className="flex gap-3 items-start p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-primary-500/30 hover:bg-white dark:hover:bg-slate-800 transition-all">
                                            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{s}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                            <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Industry Verified</p>
                                            <p className="text-xs text-slate-500">Matches modern SaaS expectations</p>
                                        </div>
                                    </div>
                                    <button className="text-primary-600 font-semibold text-sm flex items-center gap-1 hover:underline">
                                        View full report <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </Card>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Dummy component to fix icon import
const CheckCircle2: React.FC<any> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
);

export default PortfolioAnalyzer;
