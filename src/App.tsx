import { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import StatCard from './components/dashboard/StatCard';
import { SkillRadar, ScoreDoughnut } from './components/dashboard/DashboardCharts';
import ResumeAnalyzer from './components/dashboard/ResumeAnalyzer';
import ResumeForm from './components/dashboard/ResumeForm';
import ResumePreview from './components/dashboard/ResumePreview';
import PortfolioAnalyzer from './components/dashboard/PortfolioAnalyzer';
import SkillGapReport from './components/dashboard/SkillGapReport';
import UserProfile from './components/dashboard/UserProfile';
import ExportManager from './components/dashboard/ExportManager';
import { Card, Badge } from './components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSearch, Sparkles, Briefcase, BarChart3, ChevronRight, PenTool, Plus } from 'lucide-react';
import type { ResumeData } from './types/resume';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock User Data
  const user = {
    name: 'mohammed zakki adnaan p',
    role: 'Aspiring Full Stack Developer',
    avatar: '/avatar.jpg'
  };

  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);

  const activeResume = resumes.find(r => r.id === activeResumeId) || null;

  const createNewResume = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newResume: ResumeData = {
      id: newId,
      updatedAt: new Date().toISOString(),
      personalInfo: {
        fullName: '', email: '', phone: '', location: '', jobTitle: '', summary: ''
      },
      experiences: [],
      education: [],
      skills: [],
      projects: []
    };
    setResumes(prev => [...prev, newResume]);
    setActiveResumeId(newId);
    setActiveTab('resume-builder');
  };

  const updateActiveResume = (newData: Partial<ResumeData>) => {
    setResumes(prev => prev.map(r =>
      r.id === activeResumeId
        ? { ...r, ...newData, updatedAt: new Date().toISOString() }
        : r
    ));
  };

  useEffect(() => {
    const saved = localStorage.getItem('resumes_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setResumes(parsed);
        if (parsed.length > 0) setActiveResumeId(parsed[0].id);
      } catch (e) {
        console.error('Failed to load resumes', e);
      }
    } else {
      // Create initial if none
      createNewResume();
    }
  }, []);

  useEffect(() => {
    if (resumes.length > 0) {
      localStorage.setItem('resumes_v2', JSON.stringify(resumes));
    }
  }, [resumes]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setMobileMenuOpen(false); // Close mobile menu on tab change
        }}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main
        className={`transition-all duration-500 min-h-screen ${collapsed ? 'lg:pl-20' : 'lg:pl-64'
          } pl-0`}
      >
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user={user}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold font-display tracking-tight">
                        Welcome back, <span className="gradient-text">{user.name.split(' ')[0]}</span>!
                      </h1>
                      <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Here's what's happening with your career progress today.
                      </p>
                    </div>
                    <button onClick={() => setActiveTab('resume-analyzer')} className="btn-primary flex items-center gap-2 w-fit">
                      <FileSearch className="w-5 h-5" />
                      New Analysis
                    </button>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                      title="Resume Score"
                      value={activeResume?.personalInfo.fullName ? '85 / 100' : '45 / 100'}
                      icon={FileSearch}
                      color="primary"
                      trend={{ value: 'Real-time', isUp: true }}
                    />
                    <StatCard
                      title="Total Resumes"
                      value={resumes.length.toString()}
                      icon={Sparkles}
                      color="emerald"
                    />
                    <StatCard
                      title="Exp. Items"
                      value={activeResume?.experiences.length.toString() || '0'}
                      icon={Briefcase}
                      color="amber"
                    />
                    <StatCard
                      title="Status"
                      value={activeResume?.personalInfo.summary ? 'Ready' : 'Draft'}
                      icon={BarChart3}
                      color="rose"
                    />
                  </div>

                  {/* Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <SkillRadar />
                    </div>
                    <div>
                      <ScoreDoughnut />
                    </div>
                  </div>

                  {/* Recent Activity List */}
                  <Card className="mt-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary-500" />
                        Analysis History
                      </h3>
                      <button className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                        View all
                      </button>
                    </div>
                    <div className="space-y-4">
                      {resumes.map((res) => (
                        <div key={res.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${activeResumeId === res.id ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500/50' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:border-primary-500/30'}`} onClick={() => setActiveResumeId(res.id)}>
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm ${activeResumeId === res.id ? 'bg-primary-500 text-white' : 'bg-white dark:bg-slate-800 text-primary-600'}`}>
                              <PenTool className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-semibold">{res.personalInfo.fullName || 'Draft Resume'} - {res.personalInfo.jobTitle || 'New'}</p>
                              <p className="text-xs text-slate-500">Updated: {new Date(res.updatedAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                            {activeResumeId === res.id && <Badge variant="success">Active</Badge>}
                            <button onClick={(e) => { e.stopPropagation(); setActiveResumeId(res.id); setActiveTab('resume-builder'); }} className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={createNewResume}
                        className="w-full p-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 hover:border-primary-500 hover:text-primary-500 transition-all font-bold flex items-center justify-center gap-2"
                      >
                        <Plus className="w-5 h-5" /> Create New Resume version
                      </button>
                    </div>
                  </Card>
                </div>
              )}

              {activeTab === 'resume-builder' && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold font-display tracking-tight">AI Resume <span className="gradient-text">Builder</span></h1>
                      <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Craft your professional story with AI-powered suggestions.
                      </p>
                    </div>
                    <ResumeForm
                      data={activeResume || resumes[0]}
                      updateData={updateActiveResume}
                      onSave={() => alert('Resume data saved to local storage!')}
                    />
                  </div>
                  <div className="sticky top-24 hidden xl:block space-y-6">
                    <ExportManager onExportPDF={() => window.print()} />
                    {activeResume && <ResumePreview data={activeResume} />}
                  </div>

                  {/* Mobile Preview Modal/Button could go here */}
                </div>
              )}

              {activeTab === 'resume-analyzer' && (
                <ResumeAnalyzer />
              )}

              {activeTab === 'portfolio-analyzer' && (
                <PortfolioAnalyzer />
              )}

              {activeTab === 'reports' && activeResume && (
                <SkillGapReport
                  skills={activeResume.skills}
                  jobTitle={activeResume.personalInfo.jobTitle}
                />
              )}

              {activeTab === 'profile' && (
                <UserProfile />
              )}

              {activeTab !== 'dashboard' &&
                activeTab !== 'resume-analyzer' &&
                activeTab !== 'portfolio-analyzer' &&
                activeTab !== 'reports' &&
                activeTab !== 'profile' && (
                  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                      <h2 className="text-3xl">⚒️</h2>
                    </div>
                    <h3 className="text-2xl font-bold font-display">{activeTab.replace('-', ' ').toUpperCase()}</h3>
                    <p className="text-slate-500 mt-2 max-w-md">
                      We are currently building this module. It will be ready in the next few minutes!
                    </p>
                  </div>
                )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default App;
