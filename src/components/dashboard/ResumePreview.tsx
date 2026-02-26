import React from 'react';
import type { ResumeData } from '../../types/resume';
import { Card } from '../ui';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ResumePreviewProps {
    data: ResumeData;
}

const ExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, experiences, education, skills, projects } = data;
    return (
        <div className="p-8 sm:p-12 space-y-8">
            <header className="border-b-2 border-slate-900 pb-8">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">{personalInfo.fullName || 'YOUR NAME'}</h1>
                <p className="text-xl font-bold text-primary-600 mb-4">{personalInfo.jobTitle || 'PROFESSIONAL TITLE'}</p>
                <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
                    {personalInfo.email && <div className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {personalInfo.email}</div>}
                    {personalInfo.phone && <div className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {personalInfo.phone}</div>}
                    {personalInfo.location && <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {personalInfo.location}</div>}
                </div>
            </header>

            {personalInfo.summary && (
                <section className="space-y-3">
                    <h2 className="text-lg font-black uppercase tracking-wider text-slate-800">Professional Summary</h2>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">{personalInfo.summary}</p>
                </section>
            )}

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
                    )) : <p className="text-slate-400 text-sm italic">Add experience to see it here.</p>}
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-lg font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {skills.length > 0 ? skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded uppercase">
                            {skill}
                        </span>
                    )) : <p className="text-slate-400 text-sm italic">Add skills to see them here.</p>}
                </div>
            </section>

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
                    )) : <p className="text-slate-400 text-sm italic">Add education to see it here.</p>}
                </div>
            </section>

            {projects.length > 0 && (
                <section className="space-y-4">
                    <h2 className="text-lg font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-2">Projects</h2>
                    <div className="space-y-4">
                        {projects.map((proj, i) => (
                            <div key={i} className="space-y-1">
                                <h3 className="font-bold text-slate-900">{proj.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

const MinimalistTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, experiences, education, skills, projects } = data;
    return (
        <div className="p-12 space-y-10 font-serif">
            <div className="text-center space-y-4 pb-10 border-b border-slate-100">
                <h1 className="text-5xl font-light tracking-tight text-slate-900">{personalInfo.fullName || 'YOUR NAME'}</h1>
                <p className="text-lg tracking-[0.2em] uppercase text-slate-500 font-medium">{personalInfo.jobTitle || 'PROFESSIONAL TITLE'}</p>
                <div className="flex justify-center gap-6 text-sm text-slate-400">
                    <span>{personalInfo.email}</span>
                    <span>{personalInfo.phone}</span>
                    <span>{personalInfo.location}</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-12">
                <div className="col-span-1 space-y-8">
                    <section className="space-y-3">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-primary-600">Skills</h2>
                        <div className="space-y-1">
                            {skills.map((s, i) => <p key={i} className="text-sm text-slate-600">{s}</p>)}
                        </div>
                    </section>
                    <section className="space-y-3">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-primary-600">Education</h2>
                        {education.map((edu, i) => (
                            <div key={i} className="space-y-1">
                                <p className="text-sm font-bold text-slate-800">{edu.degree}</p>
                                <p className="text-xs text-slate-500">{edu.school}</p>
                            </div>
                        ))}
                    </section>
                    {projects.length > 0 && (
                        <section className="space-y-3">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-primary-600">Projects</h2>
                            {projects.map((p, i) => (
                                <div key={i} className="space-y-1">
                                    <p className="text-sm font-bold text-slate-800">{p.title}</p>
                                    <p className="text-xs text-slate-500 leading-relaxed">{p.description}</p>
                                </div>
                            ))}
                        </section>
                    )}
                </div>

                <div className="col-span-2 space-y-8">
                    <section className="space-y-3">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-primary-600">Profile</h2>
                        <p className="text-sm text-slate-600 leading-relaxed italic">"{personalInfo.summary}"</p>
                    </section>
                    <section className="space-y-6">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-primary-600">Experience</h2>
                        {experiences.map((exp, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-base font-bold text-slate-800">{exp.role}</h3>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{exp.period}</span>
                                </div>
                                <p className="text-sm text-primary-600 font-medium">{exp.company}</p>
                                <div className="space-y-1 mt-2">
                                    {exp.description.map((d, id) => (
                                        <p key={id} className="text-xs text-slate-500 leading-relaxed">• {d}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
};

const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, experiences, education, skills, projects } = data;
    return (
        <div className="flex min-h-[1100px]">
            {/* Sidebar */}
            <div className="w-1/3 bg-slate-900 text-white p-10 space-y-10">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold leading-tight">{personalInfo.fullName || 'YOUR NAME'}</h1>
                    <p className="text-primary-400 font-medium uppercase tracking-wider text-xs">{personalInfo.jobTitle}</p>
                </div>

                <section className="space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-slate-700 pb-2">Contact</h2>
                    <div className="space-y-3 text-sm text-slate-300">
                        <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary-400" /> {personalInfo.email}</div>
                        <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary-400" /> {personalInfo.phone}</div>
                        <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-400" /> {personalInfo.location}</div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-slate-700 pb-2">Expertise</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((s, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-800 text-[10px] font-bold rounded uppercase tracking-tighter border border-slate-700">{s}</span>
                        ))}
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-slate-700 pb-2">Education</h2>
                    {education.map((edu, i) => (
                        <div key={i} className="space-y-1">
                            <p className="text-sm font-bold">{edu.degree}</p>
                            <p className="text-[10px] text-slate-400 uppercase">{edu.school} • {edu.period}</p>
                        </div>
                    ))}
                </section>
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-12 bg-white space-y-10 text-slate-800">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <span className="w-8 h-1 bg-primary-500 rounded-full" />
                        About Me
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-sm">{personalInfo.summary}</p>
                </section>

                <section className="space-y-8">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <span className="w-8 h-1 bg-primary-500 rounded-full" />
                        Experience
                    </h2>
                    <div className="space-y-8 relative before:absolute before:left-0 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-100">
                        {experiences.map((exp, i) => (
                            <div key={i} className="pl-6 relative">
                                <span className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-primary-500 ring-4 ring-white" />
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                                    <div className="flex justify-between items-center text-xs font-bold uppercase text-primary-600">
                                        <span>{exp.company}</span>
                                        <span className="text-slate-400">{exp.period}</span>
                                    </div>
                                    <div className="mt-3 space-y-2">
                                        {exp.description.map((d, id) => (
                                            <p key={id} className="text-sm text-slate-600 leading-relaxed">{d}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {projects.length > 0 && (
                    <section className="space-y-8">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <span className="w-8 h-1 bg-primary-500 rounded-full" />
                            Projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projects.map((proj, i) => (
                                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 hover:border-primary-500/30 transition-all">
                                    <h3 className="font-bold text-slate-900">{proj.title}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
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

                {data.template === 'executive' && <ExecutiveTemplate data={data} />}
                {data.template === 'minimalist' && <MinimalistTemplate data={data} />}
                {data.template === 'creative' && <CreativeTemplate data={data} />}
            </Card>
        </div>
    );
};

export default ResumePreview;
