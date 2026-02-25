import {
    LayoutDashboard,
    FileSearch,
    Briefcase,
    BarChart3,
    User,
    Settings,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for Tailwind class merging */
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, collapsed, setCollapsed, mobileMenuOpen, setMobileMenuOpen }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'resume-analyzer', label: 'Resume Analyzer', icon: FileSearch },
        { id: 'portfolio-analyzer', label: 'Portfolio AI', icon: Briefcase },
        { id: 'reports', label: 'Career Reports', icon: BarChart3 },
        { id: 'profile', label: 'My Profile', icon: User },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300",
                    mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setMobileMenuOpen(false)}
            />

            <aside
                className={cn(
                    "fixed left-0 top-0 h-screen glass-card border-r border-slate-200 dark:border-slate-800 transition-all duration-500 z-50 flex flex-col",
                    collapsed ? "w-20" : "w-64",
                    mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Logo Section */}
                <div className="p-6 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/30">
                            <Sparkles className="text-white w-6 h-6" />
                        </div>
                        {(!collapsed || mobileMenuOpen) && (
                            <span className="font-display font-bold text-xl tracking-tight gradient-text">
                                SmartCareer
                            </span>
                        )}
                    </div>

                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 lg:hidden text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 mt-4 px-3 space-y-2 sidebar-scrollbar overflow-y-auto">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "nav-link w-full group",
                                activeTab === item.id && "nav-link-active"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                                activeTab === item.id ? "text-primary-600 dark:text-primary-400" : "text-slate-500 dark:text-slate-400"
                            )} />
                            {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
                            {collapsed && (
                                <div className="absolute left-full ml-4 px-2 py-1 rounded bg-slate-900 text-white text-xs invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all">
                                    {item.label}
                                </div>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Footer Section */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <button className="nav-link w-full group">
                        <Settings className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:rotate-45 transition-transform" />
                        {!collapsed && <span>Settings</span>}
                    </button>

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="nav-link w-full text-slate-500 dark:text-slate-400"
                    >
                        {collapsed ? <ChevronRight className="w-5 h-5" /> : (
                            <div className="flex items-center gap-3">
                                <ChevronLeft className="w-5 h-5" />
                                <span>Collapse View</span>
                            </div>
                        )}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
