import React from 'react';

const Templates: React.FC = () => {
    return (
         <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-8">
             <div className="max-w-[1200px] mx-auto">
                <h1 className="text-slate-900 dark:text-white text-3xl font-black mb-2">Şablonlar</h1>
                <p className="text-slate-500 dark:text-gray-400 mb-8">Hazır şablonlarla hızlıca başlayın.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     <div className="group flex flex-col bg-white dark:bg-surface-dark rounded-xl overflow-hidden border border-slate-200 dark:border-border-dark hover:border-primary/40 transition-all cursor-pointer hover:shadow-lg">
                        <div className="aspect-[3/4] bg-slate-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-gray-700/50 transition-colors">
                            <span className="material-symbols-outlined text-4xl text-slate-300">description</span>
                        </div>
                        <div className="p-4"><h3 className="font-bold text-slate-900 dark:text-white">Modern Özgeçmiş</h3></div>
                     </div>
                     <div className="group flex flex-col bg-white dark:bg-surface-dark rounded-xl overflow-hidden border border-slate-200 dark:border-border-dark hover:border-primary/40 transition-all cursor-pointer hover:shadow-lg">
                        <div className="aspect-[3/4] bg-slate-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-gray-700/50 transition-colors">
                            <span className="material-symbols-outlined text-4xl text-slate-300">article</span>
                        </div>
                        <div className="p-4"><h3 className="font-bold text-slate-900 dark:text-white">Blog Taslağı</h3></div>
                     </div>
                     <div className="group flex flex-col bg-white dark:bg-surface-dark rounded-xl overflow-hidden border border-slate-200 dark:border-border-dark hover:border-primary/40 transition-all cursor-pointer hover:shadow-lg">
                        <div className="aspect-[3/4] bg-slate-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-gray-700/50 transition-colors">
                            <span className="material-symbols-outlined text-4xl text-slate-300">mail</span>
                        </div>
                        <div className="p-4"><h3 className="font-bold text-slate-900 dark:text-white">E-posta Bülteni</h3></div>
                     </div>
                </div>
             </div>
         </div>
    );
};

export default Templates;