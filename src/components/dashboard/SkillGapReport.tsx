import { Target, CheckCircle2, AlertCircle, ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import { Card, Badge } from '../ui';
import { analyzeSkillGap, generateLearningRoadmap } from '../../utils/aiService';
import { useState, useEffect } from 'react';

interface SkillGapReportProps {
    skills: string[];
    jobTitle: string;
}

const SkillGapReport: React.FC<SkillGapReportProps> = ({ skills, jobTitle }) => {
    const [missingSkills, setMissingSkills] = useState<string[]>([]);
    const [roadmap, setRoadmap] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGap = async () => {
            if (skills.length === 0 || !jobTitle) return;
            setLoading(true);
            try {
                const gaps = await analyzeSkillGap(skills, jobTitle);
                setMissingSkills(gaps);

                // Fetch dynamic roadmap
                const aiRoadmap = await generateLearningRoadmap(jobTitle, gaps);
                setRoadmap(aiRoadmap);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchGap();
    }, [skills, jobTitle]);

    const categories = [
        {
            role: jobTitle || 'Target Role',
            match: skills.length > 0 ? Math.min(Math.round((skills.length / (skills.length + missingSkills.length)) * 100), 100) : 0,
            skills: [
                ...skills.map(s => ({ name: s, status: 'mastered' })),
                ...missingSkills.map(s => ({ name: s, status: 'missing' }))
            ].slice(0, 10) // Limit to 10 for UI
        }
    ];



    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-display tracking-tight">Career Gap <span className="gradient-text">Analysis</span></h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Detailed breakdown of your current skills vs industry-specific requirements.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {loading && (
                    <div className="flex items-center justify-center p-12">
                        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                        <span className="ml-3 text-lg font-medium">Analyzing skill gaps...</span>
                    </div>
                )}
                {!loading && categories.map((cat, i) => (
                    <Card key={i} className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 blur-3xl -mr-16 -mt-16 rounded-full" />
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-bold">{cat.role}</h3>
                                <p className="text-sm text-slate-500">Industry Relevance</p>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-black text-primary-600 dark:text-primary-400">{cat.match}%</span>
                                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Match</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {cat.skills.map((skill, si) => (
                                <div key={si} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                    {skill.status === 'mastered' ? (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    ) : skill.status === 'learning' ? (
                                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse mx-1" />
                                    ) : (
                                        <AlertCircle className="w-4 h-4 text-rose-500" />
                                    )}
                                    <span className="text-sm font-medium">{skill.name}</span>
                                    <Badge variant={skill.status === 'mastered' ? 'success' : skill.status === 'learning' ? 'warning' : 'danger'} className="ml-auto text-[10px]">
                                        {skill.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-6 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold text-sm hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-all">
                            Learn Missing Skills <ArrowRight className="w-4 h-4" />
                        </button>
                    </Card>
                ))}
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Target className="w-6 h-6 text-primary-500" />
                    Recommended Learning Roadmap
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {roadmap.map((item, i) => (
                        <Card key={i} className="group hover:border-primary-500/50 transition-all">
                            <div className={`w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 ${i === 0 ? 'text-rose-500' : i === 1 ? 'text-indigo-500' : 'text-emerald-500'
                                }`}>
                                <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </div>
                            <h4 className="font-bold text-lg leading-tight">{item.title}</h4>
                            <p className="text-xs font-semibold text-primary-500 mt-2 uppercase tracking-wider">{item.status}</p>
                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                                {item.modules || 5} modules • {item.hours || 10} hours
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillGapReport;
