import React from 'react';

const Marketplace: React.FC = () => {
    return (
         <div className="flex-1 h-full overflow-y-auto bg-background-light dark:bg-background-dark relative p-8">
             <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
                <h1 className="text-slate-900 dark:text-white text-4xl font-black">Marketplace</h1>
                <p className="text-slate-500 dark:text-gray-400">Eklentiler ve AI modelleri ile editörünüzü güçlendirin.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     <div className="bg-white dark:bg-card-dark rounded-xl p-4 flex flex-col gap-4 border border-slate-200 dark:border-[#283039] hover:border-primary/50 transition-colors">
                        <div className="flex justify-between items-start">
                            <div className="size-12 rounded-lg bg-slate-100 dark:bg-[#283039] flex items-center justify-center p-2"><span className="material-symbols-outlined text-slate-900 dark:text-white text-[28px]">add_to_drive</span></div>
                            <span className="bg-slate-100 dark:bg-[#283039] text-xs font-medium px-2 py-1 rounded dark:text-gray-400">Cloud</span>
                        </div>
                        <div><h4 className="text-slate-900 dark:text-white text-lg font-bold">Google Drive Sync</h4><p className="text-slate-500 dark:text-gray-400 text-sm">Otomatik yedekleme.</p></div>
                        <button className="text-slate-500 hover:text-primary mt-auto pt-2 border-t border-slate-100 dark:border-[#283039] flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">check_circle</span> Installed</button>
                    </div>
                    <div className="bg-white dark:bg-card-dark rounded-xl p-4 flex flex-col gap-4 border border-slate-200 dark:border-[#283039] hover:border-primary/50 transition-colors">
                        <div className="flex justify-between items-start">
                            <div className="size-12 rounded-lg bg-slate-100 dark:bg-[#283039] flex items-center justify-center p-2"><span className="material-symbols-outlined text-slate-900 dark:text-white text-[28px]">spellcheck</span></div>
                            <span className="bg-slate-100 dark:bg-[#283039] text-xs font-medium px-2 py-1 rounded dark:text-gray-400">Writing</span>
                        </div>
                        <div><h4 className="text-slate-900 dark:text-white text-lg font-bold">Grammar Check</h4><p className="text-slate-500 dark:text-gray-400 text-sm">Gelişmiş dil bilgisi kontrolü.</p></div>
                        <button className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded mt-auto w-fit hover:bg-blue-600 transition-colors">Install</button>
                    </div>
                     <div className="bg-white dark:bg-card-dark rounded-xl p-4 flex flex-col gap-4 border border-slate-200 dark:border-[#283039] hover:border-primary/50 transition-colors">
                        <div className="flex justify-between items-start">
                            <div className="size-12 rounded-lg bg-slate-100 dark:bg-[#283039] flex items-center justify-center p-2"><span className="material-symbols-outlined text-slate-900 dark:text-white text-[28px]">translate</span></div>
                            <span className="bg-slate-100 dark:bg-[#283039] text-xs font-medium px-2 py-1 rounded dark:text-gray-400">Tools</span>
                        </div>
                        <div><h4 className="text-slate-900 dark:text-white text-lg font-bold">Pro Translator</h4><p className="text-slate-500 dark:text-gray-400 text-sm">40+ dilde anlık çeviri.</p></div>
                        <button className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded mt-auto w-fit hover:bg-blue-600 transition-colors">Install</button>
                    </div>
                </div>
             </div>
         </div>
    );
};

export default Marketplace;