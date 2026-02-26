import { Bell, Search, Moon, Sun, ChevronDown, Menu, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';


interface NavbarProps {
    darkMode: boolean;
    setDarkMode: (dark: boolean) => void;
    user: any;
    setMobileMenuOpen: (open: boolean) => void;
    onSignIn: () => void;
    onSignOut: () => void;
    session: any;
}
const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, setMobileMenuOpen, onSignIn, session }) => {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const notificationsRef = useRef<HTMLDivElement>(null);

    // Close notifications when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const notifications = [
        { id: 1, title: 'Resume Analysis Complete', desc: 'Your latest resume scored 85/100.', time: '2m ago', read: false, type: 'success' },
        { id: 2, title: 'New Skill Tag Detected', desc: 'We found "Project Management" in your portfolio.', time: '1h ago', read: false, type: 'info' },
        { id: 3, title: 'Missing ATS Keyword', desc: 'Consider adding "Agile" to your work experience.', time: '3h ago', read: true, type: 'warning' },
    ];
    return (
        <header className="h-20 glass-card sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 lg:hidden"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Search Bar */}
            <div className="relative w-96 hidden lg:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search reports, skills, or help..."
                    className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500/20 transition-all text-sm outline-none"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <div className="relative" ref={notificationsRef}>
                    <button
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        className={`relative p-2.5 rounded-xl transition-colors ${isNotificationsOpen ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                    </button>

                    <AnimatePresence>
                        {isNotificationsOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 origin-top-right"
                            >
                                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                                    <span className="text-xs font-semibold text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded-md">2 New</span>
                                </div>
                                <div className="max-h-[320px] overflow-y-auto">
                                    {notifications.map((notif) => (
                                        <div key={notif.id} className={`p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer flex gap-3 ${!notif.read ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''}`}>
                                            <div className="shrink-0 mt-1">
                                                {notif.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                                                {notif.type === 'info' && <MessageSquare className="w-5 h-5 text-blue-500" />}
                                                {notif.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-500" />}
                                            </div>
                                            <div>
                                                <div className="flex justify-between items-start gap-2">
                                                    <h4 className={`text-sm font-semibold ${!notif.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>{notif.title}</h4>
                                                </div>
                                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{notif.desc}</p>
                                                <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">{notif.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                                    <button className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors">
                                        Mark all as read
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>

                {/* User Profile / Auth */}
                {session ? (
                    <button className="flex items-center gap-3 p-1.5 pl-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold leading-none">{session.user.email?.split('@')[0]}</p>
                            <p className="text-xs text-slate-500 mt-1">Free Tier</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-primary-100 ring-2 ring-primary-500/10 flex items-center justify-center text-primary-600 font-bold">
                            {session.user.email?.charAt(0).toUpperCase()}
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>
                ) : (
                    <button
                        onClick={onSignIn}
                        className="btn-primary py-2 px-6 rounded-xl font-bold flex items-center gap-2"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
};

export default Navbar;
