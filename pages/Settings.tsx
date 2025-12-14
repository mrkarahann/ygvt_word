import React, { useEffect, useState } from 'react';

const Settings: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        // Check initial theme from html class
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    return (
        <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-8 pb-24">
            <div className="max-w-[800px] mx-auto">
                <h2 className="text-slate-900 dark:text-white text-3xl font-bold mb-6">Ayarlar</h2>
                
                <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-border-dark p-6 mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Görünüm</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button 
                            onClick={() => setTheme('light')}
                            className={`rounded-lg border p-4 text-center transition-all ${theme === 'light' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-200 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                        >
                            <span className={`material-symbols-outlined ${theme === 'light' ? 'text-primary' : 'dark:text-white'}`}>light_mode</span>
                            <p className={`text-sm mt-2 ${theme === 'light' ? 'font-bold text-primary' : 'dark:text-white'}`}>Açık</p>
                        </button>
                        <button 
                            onClick={() => setTheme('dark')}
                            className={`rounded-lg border p-4 text-center transition-all ${theme === 'dark' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-200 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                        >
                            <span className={`material-symbols-outlined ${theme === 'dark' ? 'text-primary' : 'dark:text-white'}`}>dark_mode</span>
                            <p className={`text-sm mt-2 ${theme === 'dark' ? 'font-bold text-primary' : 'dark:text-white'}`}>Koyu</p>
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-border-dark p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">AI Tercihleri</h3>
                    <label className="block mb-4">
                        <span className="text-sm text-slate-500 dark:text-gray-400 block mb-1">Varsayılan Model</span>
                        <select className="w-full rounded-lg bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-border-dark dark:text-white focus:ring-primary focus:border-primary">
                            <option>GPT-4</option>
                            <option>Claude 3</option>
                            <option>Gemini Pro</option>
                        </select>
                    </label>
                     <label className="block mb-4">
                        <span className="text-sm text-slate-500 dark:text-gray-400 block mb-1">Yaratıcılık Seviyesi</span>
                        <input type="range" className="w-full accent-primary" />
                         <div className="flex justify-between text-xs text-slate-400 mt-1">
                            <span>Daha Tutarlı</span>
                            <span>Daha Yaratıcı</span>
                         </div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Settings;