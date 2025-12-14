import React from 'react';
import { Link } from 'react-router-dom';

const Documents: React.FC = () => {
     return (
        <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-8 md:p-12">
            <div className="max-w-5xl mx-auto flex flex-col gap-8">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                     <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dosyalarım</h2>
                     <input className="block w-full md:w-96 pl-4 pr-3 py-2.5 border-none rounded-lg bg-white dark:bg-surface-dark text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary shadow-sm" placeholder="Belgelerde ara..." type="text"/>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     {/* Quick Actions */}
                    <button className="relative overflow-hidden group p-5 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all text-left">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4"><span className="material-symbols-outlined">add</span></div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Boş Belge</h3>
                    </button>
                     <button className="relative overflow-hidden group p-5 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all text-left">
                        <div className="size-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4"><span className="material-symbols-outlined">auto_awesome</span></div>
                        <h3 className="font-bold text-slate-900 dark:text-white">AI Taslağı</h3>
                    </button>
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">Son Kullanılanlar</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link to="/editor" className="group flex flex-col bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-lg transition-all">
                        <div className="h-32 w-full bg-slate-100 dark:bg-[#11161d] relative flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-blue-500">description</span>
                        </div>
                        <div className="p-4 flex flex-col gap-1">
                            <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate">Proje_Raporu.docx</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">2 saat önce</p>
                        </div>
                    </Link>
                    <Link to="/editor" className="group flex flex-col bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-lg transition-all">
                        <div className="h-32 w-full bg-slate-100 dark:bg-[#11161d] relative flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-purple-500">auto_awesome</span>
                        </div>
                        <div className="p-4 flex flex-col gap-1">
                            <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate">Pazarlama_Q3.docx</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Dün</p>
                        </div>
                    </Link>
                 </div>
            </div>
        </div>
     );
};

export default Documents;