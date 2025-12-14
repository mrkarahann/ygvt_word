import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Documents from './pages/Documents';
import Templates from './pages/Templates';
import Marketplace from './pages/Marketplace';
import Settings from './pages/Settings';

const AppLayout: React.FC = () => {
    const location = useLocation();
    
    // Hide sidebar on the Editor page for more space, or keep it depending on UX preference.
    // The prototype keeps sidebar on dashboard pages but hides it partially or fully in editor flow.
    // However, the prototype code shows Sidebar is rendered at the root level.
    // Let's keep it consistent: Sidebar is always there unless we are in a fullscreen mode,
    // but typically Editors take full width.
    // Based on the prototype `Editor` component, it has its own back button to dashboard.
    // So we usually hide the main Sidebar when in Editor to maximize writing space.
    
    const isEditor = location.pathname === '/editor';

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
            {!isEditor && <Sidebar />}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/editor" element={<Editor />} />
                    <Route path="/documents" element={<Documents />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/search" element={<div className="flex-1 p-8 text-center text-slate-500">Gelişmiş Arama Ekranı (Yapım Aşamasında)</div>} />
                    <Route path="/shortcuts" element={<div className="flex-1 p-8 text-center text-slate-500">Kısayollar Ekranı (Yapım Aşamasında)</div>} />
                </Routes>
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <HashRouter>
            <AppLayout />
        </HashRouter>
    );
};

export default App;