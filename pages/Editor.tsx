import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

interface Message {
    role: 'user' | 'model';
    text: string;
}

const Editor: React.FC = () => {
    const [showAI, setShowAI] = useState(false);
    const [showInsertMenu, setShowInsertMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [showVersionHistory, setShowVersionHistory] = useState(false);
    
    // AI State
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: 'Merhaba! Belgen üzerinde çalışıyorsun. Sana nasıl yardımcı olabilirim?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, showAI]);

    const handleSendMessage = async (customPrompt?: string) => {
        const textToSend = customPrompt || prompt;
        if (!textToSend.trim()) return;

        // Add user message
        const newMessages = [...messages, { role: 'user', text: textToSend } as Message];
        setMessages(newMessages);
        setPrompt('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const docContext = editorRef.current?.innerText || "";
            
            // Construct context-aware prompt
            const systemInstruction = "You are a helpful and professional AI writing assistant. You help the user edit, improve, summarize, and generate text based on their document context. Keep your answers concise and helpful.";
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [
                    { 
                        role: 'user', 
                        parts: [{ text: `Current Document Content:\n"""${docContext}"""\n\nUser Request: ${textToSend}` }] 
                    }
                ],
                config: {
                    systemInstruction: systemInstruction,
                }
            });

            const responseText = response.text || "Bir hata oluştu veya cevap üretilemedi.";
            
            setMessages(prev => [...prev, { role: 'model', text: responseText }]);

        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Üzgünüm, şu anda AI servisine bağlanamıyorum. Lütfen API anahtarınızı kontrol edin." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickAction = (action: 'summary' | 'grammar') => {
        if (!showAI) setShowAI(true);
        if (action === 'summary') {
            handleSendMessage("Bu belgenin kısa bir özetini çıkar.");
        } else if (action === 'grammar') {
            handleSendMessage("Bu belgedeki yazım ve dil bilgisi hatalarını kontrol et ve düzeltmeleri öner.");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark relative">
             {/* --- Modals --- */}
             {showSettings && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in-up">
                    <div className="relative w-full max-w-[640px] bg-white dark:bg-[#1c2127] rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                         <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-[#283039]">
                            <h2 className="text-slate-900 dark:text-white text-xl font-bold">Belge Ayarları</h2>
                            <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:bg-gray-100 dark:hover:bg-[#283039] p-2 rounded-full transition-colors"><span className="material-symbols-outlined">close</span></button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <h3 className="text-slate-900 dark:text-white font-semibold mb-4">Sayfa Yapısı</h3>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                 <label className="block"><span className="text-xs text-slate-500 uppercase">Boyut</span><select className="w-full mt-1 bg-gray-50 dark:bg-[#111418] border border-gray-200 dark:border-[#3b4754] rounded-lg text-sm dark:text-white"><option>A4</option><option>Letter</option></select></label>
                                 <label className="block"><span className="text-xs text-slate-500 uppercase">Yön</span><select className="w-full mt-1 bg-gray-50 dark:bg-[#111418] border border-gray-200 dark:border-[#3b4754] rounded-lg text-sm dark:text-white"><option>Dikey</option><option>Yatay</option></select></label>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t dark:border-[#283039]">
                                <button onClick={() => setShowSettings(false)} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-[#283039] rounded-lg">İptal</button>
                                <button onClick={() => setShowSettings(false)} className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">Uygula</button>
                            </div>
                        </div>
                    </div>
                 </div>
             )}

             {showShare && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in-up">
                    <div className="w-full max-w-2xl bg-white dark:bg-surface-dark rounded-xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50">
                        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-700/50">
                            <h3 className="text-gray-900 dark:text-white text-xl font-bold">Dosyayı Paylaş</h3>
                            <button onClick={() => setShowShare(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"><span className="material-symbols-outlined">close</span></button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex gap-3">
                                <input className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white h-12 px-4" placeholder="E-posta girin..."/>
                                <button className="bg-primary text-white font-medium rounded-lg h-12 px-6 shadow-lg shadow-blue-500/20">Gönder</button>
                            </div>
                            <div>
                                <h4 className="text-gray-900 dark:text-white font-bold mb-2">Erişimi Olanlar</h4>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="size-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">MK</div>
                                    <div className="flex-1 text-sm"><p className="dark:text-white font-medium">Mehmet Kaya</p><p className="text-gray-500">m.kaya@example.com</p></div>
                                    <span className="text-xs text-gray-500">Görüntüleyen</span>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
             )}

             {showInsertMenu && (
                <div className="absolute inset-0 z-30 flex items-start justify-center pt-20 pointer-events-none">
                    <div className="pointer-events-auto w-full max-w-[520px] bg-[#1c2229] border border-border-dark rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-fade-in-up">
                        <div className="p-3 border-b border-border-dark bg-[#1c2229]">
                            <label className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg bg-[#111418] border border-transparent focus-within:border-primary/50 transition-all">
                                <span className="material-symbols-outlined text-gray-400">search</span>
                                <input autoFocus className="w-full bg-transparent border-none p-0 text-white placeholder:text-gray-500 focus:ring-0 text-sm" placeholder="Ekle menüsünde ara..." />
                                <button onClick={() => setShowInsertMenu(false)} className="text-xs font-medium text-gray-500 border border-gray-700 rounded px-1.5 py-0.5">ESC</button>
                            </label>
                        </div>
                        <div className="overflow-y-auto p-2">
                            <div className="mb-2">
                                <h3 className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-gray-500">Medya</h3>
                                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#283039] transition-colors text-left group">
                                    <div className="size-8 flex items-center justify-center rounded bg-[#283039] text-gray-300 group-hover:text-white"><span className="material-symbols-outlined">image</span></div>
                                    <span className="text-white text-sm font-medium">Resim</span>
                                </button>
                                 <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#283039] transition-colors text-left group">
                                    <div className="size-8 flex items-center justify-center rounded bg-[#283039] text-gray-300 group-hover:text-white"><span className="material-symbols-outlined">table_chart</span></div>
                                    <span className="text-white text-sm font-medium">Tablo</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Click outside to close */}
                    <div className="absolute inset-0 -z-10 bg-transparent" onClick={() => setShowInsertMenu(false)}></div>
                </div>
            )}

            {/* --- Editor Header --- */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-border-dark px-6 py-3 bg-white dark:bg-background-dark z-20">
                <div className="flex items-center gap-4">
                    <Link to="/" className="size-8 flex items-center justify-center bg-primary rounded-lg text-white hover:bg-blue-600 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <div>
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Q3 Pazarlama Raporu</h2>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            <span className="hover:text-primary cursor-pointer">Dosya</span>
                            <span className="hover:text-primary cursor-pointer">Düzen</span>
                            <span className="hover:text-primary cursor-pointer" onClick={() => setShowInsertMenu(!showInsertMenu)}>Ekle</span>
                            <span className="hover:text-primary cursor-pointer" onClick={() => setShowSettings(true)}>Ayarlar</span>
                            <span className="text-xs text-slate-600 dark:text-slate-500 ml-2">Kaydedildi</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                     <button onClick={() => setShowVersionHistory(!showVersionHistory)} className={`flex size-9 items-center justify-center rounded-lg ${showVersionHistory ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-border-dark text-slate-600 dark:text-slate-300'} hover:text-primary transition-colors`} title="Geçmiş">
                        <span className="material-symbols-outlined text-[20px]">history</span>
                    </button>
                    <button onClick={() => setShowShare(true)} className="flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20">
                        <span className="material-symbols-outlined text-[20px]">ios_share</span>
                        <span className="hidden sm:inline">Paylaş</span>
                    </button>
                    <button onClick={() => setShowAI(!showAI)} className={`flex size-9 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform ${showAI ? 'ring-2 ring-purple-300' : ''}`}>
                        <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                    </button>
                </div>
            </header>

            {/* --- Toolbar --- */}
            <div className="flex items-center justify-between gap-2 px-6 py-2 border-b border-slate-200 dark:border-border-dark bg-white dark:bg-background-dark z-10 shadow-sm overflow-x-auto no-scrollbar">
                 <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"><span className="material-symbols-outlined text-[20px]">undo</span></button>
                    <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"><span className="material-symbols-outlined text-[20px]">redo</span></button>
                    <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                    <select className="bg-transparent border-none text-sm text-slate-900 dark:text-white font-medium focus:ring-0 cursor-pointer py-1 w-20"><option>Inter</option></select>
                    <select className="bg-transparent border-none text-sm text-slate-900 dark:text-white font-medium focus:ring-0 cursor-pointer py-1 w-14"><option>11</option><option>12</option></select>
                    <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                    <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">B</button>
                    <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 italic">I</button>
                    <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 underline">U</button>
                    <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"><span className="material-symbols-outlined text-[20px]">format_align_left</span></button>
                 </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* --- Main Canvas --- */}
                <div className="flex-1 overflow-y-auto bg-slate-100 dark:bg-[#0b1219] p-4 md:p-8 flex justify-center relative">
                    {!showVersionHistory ? (
                        <div className="w-full max-w-[850px] min-h-[1100px] bg-white dark:bg-[#1c2128] shadow-sm dark:shadow-2xl border border-slate-200 dark:border-none p-12 md:p-16 mb-20 transition-colors cursor-text focus-within:ring-1 focus-within:ring-primary/20 outline-none">
                            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6 focus:outline-none" contentEditable="true">Q3 Pazarlama Stratejisi</h1>
                            <div ref={editorRef} className="editor-content text-lg leading-relaxed text-slate-700 dark:text-slate-300 space-y-6" contentEditable="true">
                                <p>Bu çeyrekte, dijital pazarlama kanallarımızdaki etkileşimi artırmaya odaklanıyoruz. Temel performans göstergelerimiz (KPI'lar), geçen çeyreğe göre <strong className="text-slate-900 dark:text-white">%15'lik bir artış</strong> hedeflediğimizi gösteriyor.</p>
                                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">Pazar Analizi</h2>
                                <p>Rakip firmaların son dönemdeki hamleleri incelendiğinde, video içeriklerine ağırlık verdikleri görülmektedir. Bizim de YouTube ve Instagram Reels stratejilerimizi bu doğrultuda güncellememiz kritik önem taşıyor.</p>
                                <ul>
                                    <li>- Organik trafik büyümesi</li>
                                    <li>- Sosyal medya etkileşimi</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        // Version History View
                        <div className="w-full max-w-[850px] min-h-[1100px] bg-white dark:bg-[#1c2128] shadow-sm dark:shadow-2xl border border-slate-200 dark:border-none p-12 md:p-16 mb-20 transition-colors">
                            <div className="w-full bg-blue-50 dark:bg-blue-900/10 border-b border-blue-100 dark:border-blue-900/30 py-2 px-4 flex items-center justify-center text-sm text-slate-800 dark:text-blue-100 mb-6 rounded">
                                <span className="material-symbols-outlined text-primary mr-2" style={{fontSize: '18px'}}>info</span>
                                <span>Şu anda <span className="font-semibold text-primary dark:text-blue-400">Dün, 09:15</span> tarihli versiyonu görüntülüyorsunuz.</span>
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">Q3 Pazarlama Stratejisi</h1>
                            <div className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 space-y-6">
                                <p>Bu çeyrekte, <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 line-through px-1">eski yöntemleri bırakıp</span> <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-1">dijital pazarlama kanallarına</span> odaklanıyoruz.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* --- AI Sidebar --- */}
                {showAI && (
                    <aside className="w-80 md:w-96 flex flex-col border-l border-slate-200 dark:border-border-dark bg-white dark:bg-background-dark shrink-0 z-20 shadow-xl absolute md:relative right-0 h-full animate-fade-in-up">
                        <div className="p-4 border-b border-slate-200 dark:border-border-dark flex justify-between items-center">
                            <div className="flex items-center gap-2 text-primary"><span className="material-symbols-outlined">auto_awesome</span><h3 className="font-bold text-slate-900 dark:text-white">AI Asistanı</h3></div>
                            <button onClick={() => setShowAI(false)}><span className="material-symbols-outlined text-slate-500">close</span></button>
                        </div>
                        
                        {/* Chat History */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`size-8 rounded-full flex items-center justify-center text-white shrink-0 mt-1 ${msg.role === 'model' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-slate-400'}`}>
                                        <span className="material-symbols-outlined text-[18px]">{msg.role === 'model' ? 'smart_toy' : 'person'}</span>
                                    </div>
                                    <div className={`p-3 rounded-2xl text-sm ${
                                        msg.role === 'model' 
                                            ? 'bg-slate-100 dark:bg-surface-dark text-slate-700 dark:text-slate-300 rounded-tl-none' 
                                            : 'bg-primary text-white rounded-tr-none'
                                    }`}>
                                        <p className="whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            
                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shrink-0 mt-1">
                                        <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                                    </div>
                                    <div className="p-3 bg-slate-100 dark:bg-surface-dark rounded-2xl rounded-tl-none text-sm">
                                        <div className="typing-indicator flex gap-1">
                                            <span className="size-2 bg-slate-400 rounded-full"></span>
                                            <span className="size-2 bg-slate-400 rounded-full"></span>
                                            <span className="size-2 bg-slate-400 rounded-full"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions (only show if no messages or just welcome message) */}
                        {messages.length < 3 && (
                            <div className="px-4 pb-2">
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Hızlı İşlemler</h4>
                                <div className="grid grid-cols-1 gap-2">
                                    <button onClick={() => handleQuickAction('summary')} className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:border-primary/50 text-left transition-colors">
                                        <div className="size-8 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">short_text</span></div>
                                        <div><p className="text-sm font-medium text-slate-900 dark:text-white">Özet Çıkar</p></div>
                                    </button>
                                    <button onClick={() => handleQuickAction('grammar')} className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:border-primary/50 text-left transition-colors">
                                        <div className="size-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">spellcheck</span></div>
                                        <div><p className="text-sm font-medium text-slate-900 dark:text-white">Dil Bilgisi</p></div>
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="p-4 border-t border-slate-200 dark:border-border-dark">
                            <div className="relative">
                                <textarea 
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg pl-3 pr-10 py-3 text-sm resize-none h-12 dark:text-white focus:ring-1 focus:ring-primary outline-none" 
                                    placeholder="AI'ya komut ver..."
                                    disabled={isLoading}
                                ></textarea>
                                <button 
                                    onClick={() => handleSendMessage()} 
                                    disabled={isLoading || !prompt.trim()}
                                    className="absolute right-2 top-2 p-1.5 text-primary hover:text-blue-600 disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-[20px]">send</span>
                                </button>
                            </div>
                        </div>
                    </aside>
                )}

                {/* --- Version History Sidebar --- */}
                {showVersionHistory && (
                     <aside className="w-64 border-l border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark flex flex-col z-10 shrink-0">
                        <div className="p-4 border-b border-slate-200 dark:border-border-dark bg-slate-50/50 dark:bg-slate-800/50">
                            <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400" style={{fontSize: '18px'}}>history</span> Zaman Çizelgesi
                            </h2>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <div className="relative py-4">
                                <div className="absolute left-[27px] top-0 bottom-0 w-[1.5px] bg-slate-200 dark:bg-slate-700 z-0"></div>
                                <div className="relative z-10 group cursor-pointer bg-blue-50 dark:bg-blue-500/10 border-l-[3px] border-primary">
                                    <div className="flex gap-3 p-4 pl-[13px]">
                                        <div className="flex flex-col items-center pt-1"><div className="size-3 rounded-full bg-primary shadow-[0_0_0_3px_rgba(59,130,246,0.3)]"></div></div>
                                        <div className="flex flex-col gap-1 w-full">
                                            <div className="flex justify-between items-start"><span className="text-sm font-bold text-primary dark:text-blue-400">Dün, 09:15</span></div>
                                            <p className="text-xs text-slate-800 dark:text-slate-300 font-medium">Ahmet Y. - Düzenleme</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative z-10 group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className="flex gap-3 p-4">
                                        <div className="flex flex-col items-center pt-1"><div className="size-3 rounded-full border-2 border-slate-300 dark:border-slate-500 bg-white dark:bg-surface-dark"></div></div>
                                        <div className="flex flex-col gap-1 w-full">
                                            <div className="flex justify-between items-start"><span className="text-sm font-medium text-slate-900 dark:text-slate-100">21 Ekim</span></div>
                                            <p className="text-xs text-slate-500">Orijinal</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </aside>
                )}
            </div>
        </div>
    );
};

export default Editor;