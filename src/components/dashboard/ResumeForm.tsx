import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Briefcase, GraduationCap, Code, Rocket,
    ArrowRight, ArrowLeft, Plus, Trash2, Save,
    Sparkles, Wand2
} from 'lucide-react';
import type { ResumeData } from '../../types/resume';
import { Card } from '../ui';
import { improveBulletPoint, generateSummary } from '../../utils/aiService';

interface ResumeFormProps {
    data: ResumeData;
    updateData: (newData: Partial<ResumeData>) => void;
    onSave: () => void;
}

const steps = [
    { id: 'personal', title: 'Personal Info', icon: User },
    { id: 'experience', title: 'Experience', icon: Briefcase },
    { id: 'education', title: 'Education', icon: GraduationCap },
    { id: 'skills', title: 'Skills', icon: Code },
    { id: 'projects', title: 'Projects', icon: Rocket },
];

const ResumeForm: React.FC<ResumeFormProps> = ({ data, updateData, onSave }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [loadingAI, setLoadingAI] = useState<number | null>(null);

    const handleAIImprove = async (index: number) => {
        const exp = data.experiences[index];
        if (!exp.role || !exp.company) {
            alert('Please enter a role and company first for better AI context.');
            return;
        }

        setLoadingAI(index);
        try {
            // Join descriptions if multiple, or just take first
            const currentText = exp.description[0] || '';
            const improved = await improveBulletPoint(currentText);

            const newExperiences = [...data.experiences];
            newExperiences[index] = { ...newExperiences[index], description: [improved] };
            updateData({ experiences: newExperiences });
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingAI(null);
        }
    };

    const handleGenerateSummary = async () => {
        if (!data.personalInfo.jobTitle) {
            alert('Please enter a job title first so AI can tailor your summary.');
            return;
        }
        setLoadingAI(-1); // Use -1 for summary loading
        try {
            const summary = await generateSummary(data.personalInfo.jobTitle, data.skills);
            updateData({
                personalInfo: { ...data.personalInfo, summary }
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingAI(null);
        }
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        updateData({
            personalInfo: { ...data.personalInfo, [name]: value }
        });
    };

    const addExperience = () => {
        updateData({
            experiences: [...data.experiences, { company: '', role: '', location: '', period: '', description: [''] }]
        });
    };

    const updateExperience = (index: number, updated: any) => {
        const newExperiences = [...data.experiences];
        newExperiences[index] = { ...newExperiences[index], ...updated };
        updateData({ experiences: newExperiences });
    };

    const removeExperience = (index: number) => {
        updateData({
            experiences: data.experiences.filter((_, i) => i !== index)
        });
    };

    return (
        <Card className="p-6 space-y-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-xl no-print">
            {/* Template Selector */}
            <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-primary-500" />
                    Select Design Template
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {(['executive', 'minimalist', 'creative'] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => updateData({ template: t })}
                            className={`p-2 py-3 rounded-xl border-2 transition-all font-bold text-xs uppercase tracking-tighter ${data.template === t ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 text-slate-400'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Step Progress Indicators */}
            <div className="flex justify-between items-center mb-8 px-4">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center relative z-10">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-primary-600 text-white scale-110 shadow-lg' :
                                    isCompleted ? 'bg-emerald-500 text-white' :
                                        'bg-slate-200 dark:bg-slate-800 text-slate-400'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                            </div>
                            <span className={`text-[10px] mt-2 font-semibold uppercase tracking-wider ${isActive ? 'text-primary-600' : 'text-slate-400'}`}>
                                {step.title}
                            </span>
                            {index < steps.length - 1 && (
                                <div className={`absolute left-full top-5 w-[calc(100vw/5)] max-w-[80px] h-[2px] -z-10 ${index < currentStep ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
                            )}
                        </div>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {currentStep === 0 && (
                        <Card className="p-6 space-y-4">
                            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={data.personalInfo.fullName}
                                        onChange={handlePersonalInfoChange}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Job Title</label>
                                    <input
                                        type="text"
                                        name="jobTitle"
                                        value={data.personalInfo.jobTitle}
                                        onChange={handlePersonalInfoChange}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        placeholder="e.g. Project Manager"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.personalInfo.email}
                                        onChange={handlePersonalInfoChange}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={data.personalInfo.phone}
                                        onChange={handlePersonalInfoChange}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        placeholder="+1 234 567 890"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-medium">Professional Summary</label>
                                        <button
                                            onClick={handleGenerateSummary}
                                            disabled={loadingAI === -1}
                                            className="flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700 disabled:opacity-50 transition-colors"
                                        >
                                            <Wand2 className={`w-3.5 h-3.5 ${loadingAI === -1 ? 'animate-spin' : ''}`} />
                                            {loadingAI === -1 ? 'Generating...' : 'Generate with AI'}
                                        </button>
                                    </div>
                                    <textarea
                                        name="summary"
                                        value={data.personalInfo.summary}
                                        onChange={handlePersonalInfoChange}
                                        rows={4}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none"
                                        placeholder="Briefly describe your career goals and key achievements..."
                                    />
                                </div>
                            </div>
                        </Card>
                    )}

                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold">Work Experience</h2>
                                <button onClick={addExperience} className="btn-secondary flex items-center gap-2 py-2">
                                    <Plus className="w-4 h-4" /> Add Experience
                                </button>
                            </div>
                            {data.experiences.map((exp, index) => (
                                <Card key={index} className="p-6 relative group">
                                    <button
                                        onClick={() => removeExperience(index)}
                                        className="absolute top-4 right-4 p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Company</label>
                                            <input
                                                type="text"
                                                value={exp.company}
                                                onChange={(e) => updateExperience(index, { company: e.target.value })}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Role</label>
                                            <input
                                                type="text"
                                                value={exp.role}
                                                onChange={(e) => updateExperience(index, { role: e.target.value })}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Period</label>
                                            <input
                                                type="text"
                                                value={exp.period}
                                                onChange={(e) => updateExperience(index, { period: e.target.value })}
                                                placeholder="Jan 2022 - Present"
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm font-medium">Description / Achievements</label>
                                                <button
                                                    onClick={() => handleAIImprove(index)}
                                                    disabled={loadingAI === index}
                                                    className="flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700 disabled:opacity-50 transition-colors"
                                                >
                                                    <Sparkles className={`w-3.5 h-3.5 ${loadingAI === index ? 'animate-spin' : ''}`} />
                                                    {loadingAI === index ? 'Improving...' : 'Improve with AI'}
                                                </button>
                                            </div>
                                            <textarea
                                                value={exp.description[0]}
                                                onChange={(e) => {
                                                    const newExp = [...data.experiences];
                                                    newExp[index].description = [e.target.value];
                                                    updateData({ experiences: newExp });
                                                }}
                                                rows={4}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                                                placeholder="Describe your key achievements..."
                                            />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold">Education</h2>
                                <button onClick={() => updateData({ education: [...data.education, { school: '', degree: '', location: '', period: '' }] })} className="btn-secondary flex items-center gap-2 py-2">
                                    <Plus className="w-4 h-4" /> Add Education
                                </button>
                            </div>
                            {data.education.map((edu, index) => (
                                <Card key={index} className="p-6 relative">
                                    <button
                                        onClick={() => updateData({ education: data.education.filter((_, i) => i !== index) })}
                                        className="absolute top-4 right-4 p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">School / University</label>
                                            <input
                                                type="text"
                                                value={edu.school}
                                                onChange={(e) => {
                                                    const newEdu = [...data.education];
                                                    newEdu[index] = { ...newEdu[index], school: e.target.value };
                                                    updateData({ education: newEdu });
                                                }}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Degree</label>
                                            <input
                                                type="text"
                                                value={edu.degree}
                                                onChange={(e) => {
                                                    const newEdu = [...data.education];
                                                    newEdu[index] = { ...newEdu[index], degree: e.target.value };
                                                    updateData({ education: newEdu });
                                                }}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Period</label>
                                            <input
                                                type="text"
                                                value={edu.period}
                                                onChange={(e) => {
                                                    const newEdu = [...data.education];
                                                    newEdu[index] = { ...newEdu[index], period: e.target.value };
                                                    updateData({ education: newEdu });
                                                }}
                                                placeholder="2018 - 2022"
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {currentStep === 3 && (
                        <Card className="p-6 space-y-4">
                            <h2 className="text-xl font-bold">Skills</h2>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    id="skill-input"
                                    className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="e.g. React"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const input = e.currentTarget;
                                            if (input.value) {
                                                updateData({ skills: [...data.skills, input.value] });
                                                input.value = '';
                                            }
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        const input = document.getElementById('skill-input') as HTMLInputElement;
                                        if (input.value) {
                                            updateData({ skills: [...data.skills, input.value] });
                                            input.value = '';
                                        }
                                    }}
                                    className="btn-primary"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {data.skills.map((skill, i) => (
                                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-lg text-sm font-semibold">
                                        {skill}
                                        <button onClick={() => updateData({ skills: data.skills.filter((_, idx) => idx !== i) })}>
                                            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold">Projects</h2>
                                <button onClick={() => updateData({ projects: [...data.projects, { title: '', description: '' }] })} className="btn-secondary flex items-center gap-2 py-2">
                                    <Plus className="w-4 h-4" /> Add Project
                                </button>
                            </div>
                            {data.projects.map((proj, index) => (
                                <Card key={index} className="p-6 relative">
                                    <button
                                        onClick={() => updateData({ projects: data.projects.filter((_, i) => i !== index) })}
                                        className="absolute top-4 right-4 p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Project Title</label>
                                            <input
                                                type="text"
                                                value={proj.title}
                                                onChange={(e) => {
                                                    const newProj = [...data.projects];
                                                    newProj[index] = { ...newProj[index], title: e.target.value };
                                                    updateData({ projects: newProj });
                                                }}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Description</label>
                                            <textarea
                                                value={proj.description}
                                                onChange={(e) => {
                                                    const newProj = [...data.projects];
                                                    newProj[index] = { ...newProj[index], description: e.target.value };
                                                    updateData({ projects: newProj });
                                                }}
                                                rows={3}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                                            />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-800">
                <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <ArrowLeft className="w-4 h-4" /> Previous
                </button>

                {currentStep === steps.length - 1 ? (
                    <button onClick={onSave} className="btn-primary flex items-center gap-2 px-8">
                        <Save className="w-4 h-4" /> Save Resume
                    </button>
                ) : (
                    <button onClick={nextStep} className="btn-primary flex items-center gap-2 px-8">
                        Next Section <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </div>
        </Card>
    );
};

export default ResumeForm;
