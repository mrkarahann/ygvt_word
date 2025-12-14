import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-1 flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 z-10">
                <div className="flex md:hidden items-center mr-4">
                    <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">menu</span>
                </div>
                <label className="flex flex-col min-w-40 h-10 max-w-96 flex-1 mr-4">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-surface-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                        <div className="text-slate-400 flex items-center justify-center pl-3">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </div>
                        <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-transparent border-none text-slate-900 dark:text-white focus:outline-0 focus:ring-0 h-full placeholder:text-slate-400 px-3 text-sm" placeholder="Belgelerde ara..."/>
                    </div>
                </label>
                <div className="flex items-center gap-4">
                     <Link to="/editor" className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md shadow-blue-500/20 transition-all">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        Yeni Belge
                    </Link>
                </div>
            </header>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                 <div className="max-w-7xl mx-auto flex flex-col gap-8">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight">Hoş geldin, Ahmet 👋</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-base">Bugün ne üzerinde çalışmak istersin?</p>
                    </div>

                    {/* Templates Shortcuts */}
                    <section>
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">Yeni bir şeyler oluşturun</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link to="/editor" className="group flex flex-col gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark hover:border-primary/50 hover:shadow-lg transition-all text-left">
                                <div className="w-full aspect-[2/1] rounded-lg overflow-hidden relative bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-primary/70">post_add</span>
                                </div>
                                <div>
                                    <p className="text-slate-900 dark:text-white font-semibold group-hover:text-primary">Boş Belge</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">Sıfırdan başla</p>
                                </div>
                            </Link>
                            <button className="group flex flex-col gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark hover:border-purple-500/50 hover:shadow-lg transition-all text-left">
                                <div className="w-full aspect-[2/1] rounded-lg overflow-hidden relative bg-gradient-to-br from-purple-100 to-fuchsia-100 dark:from-purple-900/40 dark:to-fuchsia-900/40 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-purple-500/70">auto_awesome</span>
                                     <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-purple-500 text-white text-[10px] font-bold rounded shadow-sm">AI</div>
                                </div>
                                <div>
                                    <p className="text-slate-900 dark:text-white font-semibold group-hover:text-purple-500">Blog Gönderisi</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">SEO uyumlu makale</p>
                                </div>
                            </button>
                             <button className="group flex flex-col gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark hover:border-emerald-500/50 hover:shadow-lg transition-all text-left">
                                <div className="w-full aspect-[2/1] rounded-lg overflow-hidden relative bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-emerald-500/70">mail</span>
                                     <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded shadow-sm">AI</div>
                                </div>
                                <div>
                                    <p className="text-slate-900 dark:text-white font-semibold group-hover:text-emerald-500">E-posta Taslağı</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">Profesyonel iletişim</p>
                                </div>
                            </button>
                        </div>
                    </section>

                     {/* Recent Docs */}
                    <section>
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">Son Belgeler</h3>
                        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark overflow-hidden">
                             <div onClick={() => navigate('/editor')} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                                <div className="col-span-6 md:col-span-5 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <span className="material-symbols-outlined">description</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary">Yapay Zeka ve Gelecek</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">2 saat önce</span>
                                    </div>
                                </div>
                                <div className="col-span-3 md:col-span-2 hidden md:flex items-center">
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">Yayında</span>
                                </div>
                                <div className="col-span-6 md:col-span-5 flex items-center justify-end">
                                     <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1"><span className="material-symbols-outlined">more_vert</span></button>
                                </div>
                            </div>
                            <div onClick={() => navigate('/editor')} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                                <div className="col-span-6 md:col-span-5 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                        <span className="material-symbols-outlined">auto_awesome</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary">Q3 Pazarlama Stratejisi</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">Dün</span>
                                    </div>
                                </div>
                                 <div className="col-span-3 md:col-span-2 hidden md:flex items-center">
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">Taslak</span>
                                </div>
                                <div className="col-span-6 md:col-span-5 flex items-center justify-end">
                                     <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1"><span className="material-symbols-outlined">more_vert</span></button>
                                </div>
                            </div>
                        </div>
                    </section>
                 </div>
            </div>
        </div>
    );
};

export default Dashboard;