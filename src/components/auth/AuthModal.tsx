import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../utils/supabaseClient';
import { X, Copy, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const copyToClipboard = (text: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
            setCopiedKey(text);
            setTimeout(() => setCopiedKey(null), 2000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 overflow-hidden"
                    >
                        {/* Decorative background element */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl" />

                        <div className="flex justify-between items-center mb-6 relative">
                            <div>
                                <h2 className="text-2xl font-bold font-display tracking-tight">Welcome Back</h2>
                                <p className="text-sm text-slate-500 mt-1">Sign in to sync your resumes to the cloud</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        <div className="relative min-h-[300px] flex flex-col items-center justify-center">
                            {supabase ? (
                                <Auth
                                    supabaseClient={supabase}
                                    appearance={{
                                        theme: ThemeSupa,
                                        variables: {
                                            default: {
                                                colors: {
                                                    brand: '#8b5cf6',
                                                    brandAccent: '#7c3aed',
                                                    brandButtonText: 'white',
                                                    defaultButtonBackground: 'transparent',
                                                    defaultButtonBackgroundHover: '#f8fafc',
                                                    inputBackground: 'transparent',
                                                    inputBorder: '#e2e8f0',
                                                    inputBorderFocus: '#8b5cf6',
                                                    inputBorderHover: '#cbd5e1',
                                                },
                                                radii: {
                                                    borderRadiusButton: '12px',
                                                }
                                            },
                                        },
                                    }}
                                    providers={['google', 'github']}
                                    theme="dark"
                                    redirectTo={window.location.origin}
                                />
                            ) : (
                                <div className="text-center space-y-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                                    <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Supabase Configuration Required</h3>
                                    <div className="space-y-3 text-left bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Add to your .env file:</p>

                                        {[
                                            'VITE_SUPABASE_URL',
                                            'VITE_SUPABASE_ANON_KEY'
                                        ].map((key) => (
                                            <div key={key} className="flex items-center justify-between gap-2 p-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 font-mono text-xs">
                                                <span className="text-primary-600 dark:text-primary-400 font-bold">{key}</span>
                                                <button
                                                    onClick={() => copyToClipboard(key)}
                                                    className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-400 hover:text-primary-600"
                                                >
                                                    {copiedKey === key ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        Check the <code className="font-bold">.env.example</code> file for guidance.
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
