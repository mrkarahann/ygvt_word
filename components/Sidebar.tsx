import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const navLinkClass = (path: string) => `
        flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors 
        ${isActive(path) 
            ? 'bg-primary/10 text-primary' 
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'}
    `;

    return (
        <aside className="w-64 hidden md:flex flex-col border-r border-slate-200 dark:border-border-dark bg-white dark:bg-[#111418] shrink-0 z-20 h-full">
            <div className="p-5 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
                <div className="size-8 text-primary flex items-center justify-center bg-primary/10 rounded-lg">
                    <span className="material-symbols-outlined">auto_awesome_mosaic</span>
                </div>
                <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">AI Writer</h1>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
                {/* Profile */}
                <div className="flex items-center gap-3 px-3">
                    <img 
                        src="https://picsum.photos/40/40" 
                        alt="Profile" 
                        className="rounded-full size-10 ring-2 ring-slate-100 dark:ring-slate-800 object-cover"
                    />
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-medium truncate dark:text-white">Ahmet Yılmaz</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 truncate">Pro Plan</span>
                    </div>
                </div>

                {/* Main Nav */}
                <nav className="flex flex-col gap-1">
                    <div className="px-3 pb-2">
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Çalışma Alanı</span>
                    </div>
                    <Link to="/" className={navLinkClass('/')}>
                        <span className="material-symbols-outlined text-[20px]">grid_view</span>
                        <span className="text-sm font-medium">Panel</span>
                    </Link>
                     <Link to="/documents" className={navLinkClass('/documents')}>
                        <span className="material-symbols-outlined text-[20px]">folder_open</span>
                        <span className="text-sm font-medium">Dosyalarım</span>
                    </Link>
                     <Link to="/templates" className={navLinkClass('/templates')}>
                        <span className="material-symbols-outlined text-[20px]">dashboard</span>
                        <span className="text-sm font-medium">Şablonlar</span>
                    </Link>
                     <Link to="/marketplace" className={navLinkClass('/marketplace')}>
                        <span className="material-symbols-outlined text-[20px]">storefront</span>
                        <span className="text-sm font-medium">Marketplace</span>
                    </Link>
                </nav>

                {/* Tools Nav */}
                <nav className="flex flex-col gap-1">
                    <div className="px-3 pb-2">
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Araçlar</span>
                    </div>
                     <Link to="/search" className={navLinkClass('/search')}>
                        <span className="material-symbols-outlined text-[20px]">search</span>
                        <span className="text-sm font-medium">Gelişmiş Arama</span>
                    </Link>
                    <Link to="/settings" className={navLinkClass('/settings')}>
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                        <span className="text-sm font-medium">Ayarlar</span>
                    </Link>
                    <Link to="/shortcuts" className={navLinkClass('/shortcuts')}>
                         <span className="material-symbols-outlined text-[20px]">keyboard</span>
                        <span className="text-sm font-medium">Kısayollar</span>
                    </Link>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;