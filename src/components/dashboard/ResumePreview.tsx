import React from 'react';
import type { ResumeData } from '../../types/resume';
import { Card } from '../ui';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ResumePreviewProps {
    data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
    const { personalInfo, experiences, education, skills, projects } = data;

    return (
        <div className="space-y-4">
            <Card className="bg-white text-slate-900 shadow-2xl min-h-[1100px] overflow-hidden resume-print-area">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @media print {
                        body * { visibility: hidden; }
                        .resume-print-area, .resume-print-area * { visibility: visible; }
                        .resume-print-area {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            box-shadow: none !important;
                            padding: 0 !important;
                        }
                        .no-print { display: none !important; }
                    }
                `}} />
                <div className="p-8 sm:p-12 space-y-8">
                    {/* Header */}
                    <header className="border-b-2 border-slate-900 pb-8">
                        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">{personalInfo.fullName || 'YOUR NAME'}</h1>
                        <p className="text-xl font-bold text-primary-600 mb-4">{personalInfo.jobTitle || 'PROFESSIONAL TITLE'}</p>

                        <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
                            {personalInfo.email && <div className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {personalInfo.email}</div>}
                            {personalInfo.phone && <div className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {personalInfo.phone}</div>}
                            {personalInfo.location && <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {personalInfo.location}</div>}
                        </div>
                    </header>

                    {/* Summary */}
                    {personalInfo.summary && (
                        <section className="space-y-3">
                            <h2 className="text-lg font-black uppercase tracking-wider text-slate-800">Professional Summary</h2>
                            <p className="text-slate-600 leading-relaxed">{personalInfo.summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-2">Experience</h2>
                        <div className="space-y-6">
                            {experiences.length > 0 ? experiences.map((exp, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-slate-900">{exp.role}</h3>
                                            <p className="text-sm font-semibold text-primary-600">{exp.company}</p>
                                        </div>
                                        <div className="text-right text-xs font-bold text-slate-500 uppercase">
                                            <p>{exp.period}</p>
                                            <p>{exp.location}</p>
                                        </div>
                                    </div>
                                    {exp.description && exp.description.map((desc, idx) => (
                                        <p key={idx} className="text-sm text-slate-600 pl-4 border-l-2 border-slate-100">{desc}</p>
                                    ))}
                                </div>
                            )) : (
                                <p className="text-slate-400 text-sm italic">Add experience to see it here.</p>
                            )}
                        </div>
                    </section>

                    {/* Skills */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-2">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.length > 0 ? skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded uppercase">
                                    {skill}
                                </span>
                            )) : (
                                <p className="text-slate-400 text-sm italic">Add skills to see them here.</p>
                            )}
                        </div>
                    </section>

                    {/* Education */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-2">Education</h2>
                        <div className="space-y-4">
                            {education.length > 0 ? education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                                        <p className="text-sm font-semibold text-primary-600">{edu.school}</p>
                                    </div>
                                    <div className="text-right text-xs font-bold text-slate-500 uppercase">
                                        <p>{edu.period}</p>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-slate-400 text-sm italic">Add education to see it here.</p>
                            )}
                        </div>
                    </section>

                    {/* Projects */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-2">Projects</h2>
                        <div className="space-y-4">
                            {projects.length > 0 ? projects.map((proj, i) => (
                                <div key={i} className="space-y-1">
                                    <h3 className="font-bold text-slate-900">{proj.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{proj.description}</p>
                                </div>
                            )) : (
                                <p className="text-slate-400 text-sm italic">Add projects to see them here.</p>
                            )}
                        </div>
                    </section>
                </div>
            </Card>
        </div>
    );
};

export default ResumePreview;
