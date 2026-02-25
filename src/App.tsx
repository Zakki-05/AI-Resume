import { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import StatCard from './components/dashboard/StatCard';
import { SkillRadar, ScoreDoughnut } from './components/dashboard/DashboardCharts';
import ResumeAnalyzer from './components/dashboard/ResumeAnalyzer';
import PortfolioAnalyzer from './components/dashboard/PortfolioAnalyzer';
import SkillGapReport from './components/dashboard/SkillGapReport';
import UserProfile from './components/dashboard/UserProfile';
import { Card, Badge } from './components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSearch, Sparkles, Briefcase, BarChart3, ChevronRight } from 'lucide-react';

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
                      value="78 / 100"
                      icon={FileSearch}
                      color="primary"
                      trend={{ value: '12% up', isUp: true }}
                    />
                    <StatCard
                      title="Skill Match"
                      value="85%"
                      icon={Sparkles}
                      color="emerald"
                      trend={{ value: '5% up', isUp: true }}
                    />
                    <StatCard
                      title="Portfolio Power"
                      value="Strong"
                      icon={Briefcase}
                      color="amber"
                    />
                    <StatCard
                      title="Rank"
                      value="Top 15%"
                      icon={BarChart3}
                      color="rose"
                      trend={{ value: '2% down', isUp: false }}
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
                      {[
                        { title: 'Frontend Developer Resume', date: '2 hours ago', score: 78, type: 'Resume' },
                        { title: 'Personal Portfolio Alpha', date: 'Yesterday', score: 92, type: 'Portfolio' },
                        { title: 'Fullstack React Resume', date: '3 days ago', score: 65, type: 'Resume' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group hover:border-primary-500/30 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                              {item.type === 'Resume' ? <FileSearch className="w-5 h-5 text-blue-500" /> : <Briefcase className="w-5 h-5 text-amber-500" />}
                            </div>
                            <div>
                              <p className="font-semibold">{item.title}</p>
                              <p className="text-xs text-slate-500">{item.date} • {item.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant={item.score > 70 ? 'success' : 'warning'}>
                              {item.score}% Score
                            </Badge>
                            <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {activeTab === 'resume-analyzer' && (
                <ResumeAnalyzer />
              )}

              {activeTab === 'portfolio-analyzer' && (
                <PortfolioAnalyzer />
              )}

              {activeTab === 'reports' && (
                <SkillGapReport />
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
