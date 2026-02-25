import { Target, CheckCircle2, AlertCircle, ArrowRight, Layout, BookOpen, GitBranch } from 'lucide-react';
import { Card, Badge } from '../ui';

const SkillGapReport: React.FC = () => {
    const categories = [
        {
            role: 'Full Stack Developer',
            match: 75,
            skills: [
                { name: 'React', status: 'mastered' },
                { name: 'Node.js', status: 'mastered' },
                { name: 'TypeScript', status: 'mastered' },
                { name: 'Next.js', status: 'learning' },
                { name: 'PostgreSQL', status: 'missing' },
                { name: 'Redis', status: 'missing' },
            ]
        },
        {
            role: 'Frontend Architect',
            match: 85,
            skills: [
                { name: 'React', status: 'mastered' },
                { name: 'Tailwind CSS', status: 'mastered' },
                { name: 'Design Systems', status: 'learning' },
                { name: 'PWA', status: 'mastered' },
                { name: 'Cypress', status: 'missing' },
            ]
        }
    ];

    const roadmap = [
        { title: 'Data Structures & Algorithms', status: 'Highly Recommended', icon: GitBranch, color: 'text-rose-500' },
        { title: 'System Design Fundamentals', status: 'Professional Growth', icon: Layout, color: 'text-indigo-500' },
        { title: 'Cloud Deployment (AWS/Vercel)', status: 'Essential Skill', icon: BookOpen, color: 'text-emerald-500' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-display tracking-tight">Career Gap <span className="gradient-text">Analysis</span></h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Detailed breakdown of your current skills vs industry-specific requirements.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {categories.map((cat, i) => (
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
                            <div className={`w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 ${item.color}`}>
                                <item.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </div>
                            <h4 className="font-bold text-lg leading-tight">{item.title}</h4>
                            <p className="text-xs font-semibold text-primary-500 mt-2 uppercase tracking-wider">{item.status}</p>
                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                                8 modules • 15 hours
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillGapReport;
