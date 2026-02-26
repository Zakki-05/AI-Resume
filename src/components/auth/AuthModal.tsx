import React from 'react';
import { Github, Mail, Lock, Loader2 } from 'lucide-react';
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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

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
                                <h2 className="text-2xl font-bold font-display tracking-tight">{isSignUp ? 'Create an Account' : 'Welcome Back'}</h2>
                                <p className="text-sm text-slate-500 mt-1">{isSignUp ? 'Sign up to start saving your active resumes' : 'Sign in to sync your resumes to the cloud'}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        <div className="relative flex flex-col items-center justify-center">
                            {supabase ? (
                                <div className="space-y-4 w-full">
                                    {errorMsg && (
                                        <div className="p-3 text-sm text-rose-600 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 rounded-xl">
                                            {errorMsg}
                                        </div>
                                    )}

                                    <form onSubmit={async (e) => {
                                        e.preventDefault();
                                        setErrorMsg('');
                                        setIsLoading(true);
                                        const { error } = isSignUp
                                            ? await supabase.auth.signUp({ email, password })
                                            : await supabase.auth.signInWithPassword({ email, password });

                                        if (error) {
                                            setErrorMsg(error.message);
                                        } else {
                                            if (isSignUp) {
                                                setErrorMsg('Check your email for the confirmation link! (Or disable email confirmations in Supabase settings)');
                                            } else {
                                                onClose();
                                            }
                                        }
                                        setIsLoading(false);
                                    }} className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    placeholder="you@example.com"
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="password"
                                                    required
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    placeholder="••••••••"
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                            {isSignUp ? 'Create Account' : 'Sign In'}
                                        </button>
                                    </form>

                                    <div className="text-center mt-4">
                                        <button type="button" onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(''); }} className="text-sm font-semibold text-primary-600 hover:underline">
                                            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                                        </button>
                                    </div>

                                    <div className="relative py-4">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 text-xs font-bold uppercase tracking-widest">Or continue with</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } })}
                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200 font-medium text-sm"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                <path d="M1 1h22v22H1z" fill="none" />
                                            </svg>
                                            Google
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: window.location.origin } })}
                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#24292e] hover:bg-[#2f363d] text-white rounded-xl transition-colors font-medium border border-transparent text-sm"
                                        >
                                            <Github className="w-4 h-4" />
                                            GitHub
                                        </button>
                                    </div>
                                </div>
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
                                    <p className="text-xs text-slate-500 mb-4">
                                        Check the <code className="font-bold">.env</code> file (or <code className="font-bold">.env.example</code>) for guidance.
                                    </p>

                                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                                        <button
                                            onClick={onClose}
                                            className="w-full py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity"
                                        >
                                            Continue in Local Mode
                                        </button>
                                        <p className="text-[10px] text-slate-500 mt-2 text-center uppercase tracking-widest font-bold">
                                            (Resumes will only be saved in this browser)
                                        </p>
                                    </div>
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
