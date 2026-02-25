import React from 'react';
import { Bell, Search, Moon, Sun, ChevronDown } from 'lucide-react';


interface NavbarProps {
    darkMode: boolean;
    setDarkMode: (dark: boolean) => void;
    user: {
        name: string;
        avatar: string;
        role: string;
    };
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, user }) => {
    return (
        <header className="h-20 glass-card sticky top-0 z-40 px-8 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
            {/* Search Bar */}
            <div className="relative w-96 hidden md:block">
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

                <button className="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                </button>

                <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>

                {/* User Profile */}
                <button className="flex items-center gap-3 p-1.5 pl-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold leading-none">{user.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{user.role}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-primary-100 ring-2 ring-primary-500/10">
                        <img src={user.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
            </div>
        </header>
    );
};

export default Navbar;
