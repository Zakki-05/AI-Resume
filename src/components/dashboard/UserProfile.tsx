import React from 'react';
import { Mail, Github, Linkedin, MapPin, Award, Download, Camera } from 'lucide-react';
import { Card, Badge } from '../ui';

const UserProfile: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
                <Card className="w-full md:w-80 shrink-0 text-center p-8">
                    <div className="relative w-32 h-32 mx-auto mb-6">
                        <img
                            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop"
                            alt="Profile"
                            className="w-full h-full object-cover rounded-3xl"
                        />
                        <button className="absolute bottom-[-10px] right-[-10px] p-2 bg-primary-600 text-white rounded-xl shadow-lg hover:bg-primary-700 transition-all">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>
                    <h2 className="text-2xl font-bold font-display">Alex Johnson</h2>
                    <p className="text-slate-500 text-sm mt-1">Aspiring Full Stack Developer</p>

                    <div className="mt-8 space-y-3">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-sm">
                            <Mail className="w-4 h-4 text-slate-400" />
                            alex.j@example.com
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-sm">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            San Francisco, CA
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        <button className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-all">
                            <Github className="w-5 h-5" />
                        </button>
                        <button className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-all">
                            <Linkedin className="w-5 h-5" />
                        </button>
                    </div>
                </Card>

                <div className="flex-1 space-y-6">
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Award className="w-6 h-6 text-primary-500" />
                                Profile Achievements
                            </h3>
                            <Badge variant="info">Bronze Tier</Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: 'Analysis Count', value: '12', desc: 'Total resumes scanned' },
                                { label: 'Top Score', value: '92%', desc: 'Best portfolio audit' },
                                { label: 'Skills Added', value: '+5', desc: 'Identified gap fixes' },
                                { label: 'Member Since', value: 'Feb 2026', desc: 'Joined SmartCareer' },
                            ].map((stat, i) => (
                                <div key={i} className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                    <p className="text-xl font-bold mt-1">{stat.value}</p>
                                    <p className="text-xs text-slate-500 mt-1">{stat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-xl font-bold mb-6">Analysis History & Reports</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Senior React Developer Resume', date: 'Feb 24, 2026', type: 'Resume' },
                                { name: 'Portfolio Review - V2', date: 'Feb 20, 2026', type: 'Portfolio' },
                                { name: 'Backend Engineer Resume', date: 'Feb 15, 2026', type: 'Resume' },
                            ].map((doc, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center">
                                            <Award className="w-5 h-5 text-primary-500" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{doc.name}</p>
                                            <p className="text-xs text-slate-500">{doc.date} • {doc.type}</p>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 px-4 py-2 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all opacity-0 group-hover:opacity-100">
                                        <Download className="w-4 h-4" />
                                        Report
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
