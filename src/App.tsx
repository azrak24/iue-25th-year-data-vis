import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  Globe, BookOpen, Monitor, MapPin, 
  ArrowUpRight, Info, Search, Menu, LayoutDashboard, BarChart3, Square
} from 'lucide-react';
import { cn } from './lib/utils';
import { 
  studentGrowthData, alumniDataMap, departmentStatsMap, publicationData, campusStatsMap,
  researchGrants, internationalStudentsMap, socialProjectsMap, sustainabilityDataMap
} from './data';
import { translations, Language } from './translations';

const IUE_ORANGE = '#FF7F00';

// LOGO PATH: The user uploaded a logo. We assume it is available or needs to be placed at this path.
const LOGO_URL = 'https://i.ibb.co/Xf7T8S0/logo-iue.png'; // Placeholder, user will replace or I will find

const SplashIntro = ({ onComplete, lang }: { onComplete: () => void, lang: Language }) => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#f5f0e8]"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onAnimationComplete={() => setTimeout(onComplete, 1200)}
        className="flex flex-col items-center"
      >
        <img 
          src={lang === 'en' ? "https://www.ieu.edu.tr/assets/img/ieu-logo-en.png" : "https://www.ieu.edu.tr/assets/img/ieu-logo-tr.png"}
          alt="IUE 25th Anniversary"
          className="w-64 h-auto"
        />
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col items-center"
        >
          <span className="font-display text-4xl md:text-6xl font-black tracking-tighter text-[#000]">
            {lang === 'en' ? 'IZMIR UNIVERSITY OF ECONOMICS' : 'İZMİR EKONOMİ ÜNİVERSİTESİ'}
          </span>
          <span className="font-display text-xl font-bold tracking-[0.5em] text-[#FF7F00] mt-4 opacity-80">
            {lang === 'en' ? '25TH YEAR' : '25. YIL'}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const InfographicsView = ({ t, alumniData, departmentStats, studentGrowthData, internationalStudents, socialProjects, researchGrants, sustainabilityData, campusStats, axisColor, gridColor, mutedText }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-16 pb-24"
    >
      {/* 1. Enrollment & Growth */}
      <section className="bg-white/50 p-8 rounded-[40px] border border-zinc-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black tracking-tighter mb-4 text-black uppercase">{t.cards.enrollment.expandedTitle}</h2>
            <p className="text-zinc-500 leading-relaxed font-medium">{t.cards.enrollment.info}</p>
          </div>
          <div className="text-right">
             <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7F00]">{t.cards.alumniCount.growth}</span>
             <div className="text-6xl font-mono font-bold">11,000</div>
          </div>
        </div>
        <div className="h-[500px] w-full bg-[#f5f0e8] rounded-3xl p-8 border border-zinc-200 shadow-inner">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={studentGrowthData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorStudentsInfog" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={IUE_ORANGE} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={IUE_ORANGE} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="year" stroke={axisColor} fontSize={14} axisLine={false} tickLine={false} dy={10} />
              <YAxis stroke={axisColor} fontSize={14} axisLine={false} tickLine={false} tickFormatter={(value) => `${value/1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#f5f0e8', border: '1px solid #ccc', borderRadius: '12px', fontSize: '14px' }}
                itemStyle={{ color: IUE_ORANGE }}
              />
              <Area type="monotone" dataKey="students" stroke={IUE_ORANGE} strokeWidth={4} fillOpacity={1} fill="url(#colorStudentsInfog)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 2. Global Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="bg-black text-white p-10 rounded-[40px]">
          <h2 className="text-3xl font-black tracking-tight mb-8 text-[#FF7F00] uppercase">{t.cards.globalReach.expandedTitle}</h2>
          <div className="space-y-8">
            {alumniData.map((item: any) => (
              <div key={item.name} className="space-y-4">
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-lg uppercase font-bold text-zinc-400">{item.name}</span>
                  <span className="text-3xl font-bold text-white">{item.value.toLocaleString()} {t.cards.globalReach.graduates}</span>
                </div>
                <div className="h-4 w-full rounded-full bg-zinc-900 overflow-hidden">
                   <motion.div initial={{ width: 0 }} animate={{ width: `${(item.value / 20000) * 100}%` }} transition={{ duration: 1.5 }} className="h-full bg-white" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 pt-10 border-t border-zinc-800 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#FF7F00] flex items-center justify-center text-black">
                   <MapPin className="w-8 h-8" />
                </div>
                <div>
                   <div className="text-4xl font-mono font-bold leading-none">115</div>
                   <div className="text-[10px] uppercase font-black text-zinc-500 tracking-widest mt-1">{t.cards.alumniNetwork.subtext}</div>
                </div>
             </div>
             <Globe className="w-20 h-20 text-zinc-800" />
          </div>
        </section>

        <section className="bg-zinc-100 p-10 rounded-[40px] border border-zinc-200">
          <h2 className="text-3xl font-black tracking-tight mb-8 text-black uppercase">{t.cards.faculty.expandedTitle}</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={departmentStats} margin={{ left: 40, right: 40 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="group" type="category" stroke={axisColor} fontSize={12} width={180} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#f5f0e8', border: '1px solid #ccc', borderRadius: '8px' }} />
                <Bar dataKey="count" fill={IUE_ORANGE} radius={[0, 8, 8, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-zinc-200">
             {departmentStats.map((d: any, i: number) => (
               <div key={i} className="flex flex-col">
                  <span className="text-[10px] uppercase font-black text-zinc-400 tracking-wider mb-1 leading-tight">{d.group}</span>
                  <span className="text-2xl font-mono font-bold text-black">{d.count}</span>
               </div>
             ))}
          </div>
        </section>
      </div>

      {/* 3. Research & Energy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-[#f5f0e8] p-10 rounded-[40px] border border-zinc-300">
           <h2 className="text-2xl font-black tracking-tight mb-8 text-black uppercase">{t.cards.research.expandedTitle}</h2>
           <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={researchGrants} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
                  <XAxis dataKey="year" stroke={axisColor} fontSize={14} axisLine={false} tickLine={false} dy={10} />
                  <YAxis stroke={axisColor} fontSize={14} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '12px' }} />
                  <Bar dataKey="amount" fill={IUE_ORANGE} radius={[12, 12, 0, 0]} barSize={80} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </section>

        <section className="bg-white p-10 rounded-[40px] border border-zinc-200 flex flex-col justify-between">
           <div>
             <h2 className="text-2xl font-black tracking-tight mb-4 text-[#FF7F00] uppercase leading-tight">{t.cards.sustainability.expandedTitle}</h2>
             <p className="text-zinc-500 text-sm leading-relaxed mb-8">{t.cards.sustainability.info}</p>
           </div>
           
           <div className="h-[250px] w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sustainabilityData}>
                  <Area type="monotone" dataKey="energy" stroke={IUE_ORANGE} strokeWidth={4} fill={IUE_ORANGE} fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
           </div>
           <div className="flex items-end justify-between">
              <div>
                 <div className="text-5xl font-mono font-bold text-black">950</div>
                 <div className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Max kWh / Month</div>
              </div>
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#FF7F00] animate-pulse" />
              </div>
           </div>
        </section>
      </div>

      {/* 4. Social & Diversity */}
      <section className="bg-zinc-900 text-white p-12 rounded-[50px]">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-black tracking-tighter mb-10 text-[#FF7F00] uppercase">{t.cards.social.expandedTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {socialProjects.map((p: any, i: number) => (
                 <div key={i} className="p-8 bg-zinc-800 rounded-3xl border border-zinc-700 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FF7F00] flex items-center justify-center text-black font-bold text-xl">
                      {p.count}
                    </div>
                    <div>
                       <h4 className="font-display text-lg font-bold uppercase tracking-wider text-white">{p.category}</h4>
                       <p className="text-xs mt-2 text-zinc-400 leading-relaxed">{t.cards.social.description.replace('{category}', p.category)}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-black tracking-tighter mb-10 text-white uppercase">{t.cards.diversity.expandedTitle}</h2>
            <div className="space-y-8">
               {internationalStudents.map((item: any) => (
                  <div key={item.region} className="group">
                     <div className="flex justify-between items-baseline mb-3">
                        <span className="text-sm uppercase font-bold tracking-widest text-zinc-400">{item.region}</span>
                        <span className="text-3xl font-mono font-bold text-[#FF7F00]">{item.students}</span>
                     </div>
                     <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(item.students / 500) * 100}%` }} transition={{ duration: 1 }} className="h-full bg-white opacity-80" />
                     </div>
                  </div>
               ))}
            </div>
            <div className="mt-12 p-8 bg-zinc-800 rounded-3xl flex items-center justify-between border border-zinc-700">
               <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black text-zinc-500 mb-2 tracking-widest">{t.cards.diversity.label}</span>
                  <span className="text-6xl font-mono font-bold text-white tracking-tighter">1,400+</span>
               </div>
               <Globe className="w-24 h-24 text-zinc-700" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Campus & Library */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
         <section className="p-10 bg-white rounded-[40px] border border-zinc-200">
            <h2 className="text-3xl font-black mb-10 text-black uppercase tracking-tight">{t.cards.campus.expandedTitle}</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
               {campusStats.map((stat: any, i: number) => (
                  <div key={i} className="flex flex-col border-l-4 border-black pl-6 py-2">
                     <span className="text-[11px] uppercase font-black text-zinc-400 mb-2 tracking-widest">{stat.label}</span>
                     <span className="text-3xl font-mono font-bold text-[#FF7F00]">{stat.value}</span>
                  </div>
               ))}
            </div>
         </section>

         <section className="p-10 bg-[#f5f0e8] rounded-[40px] border border-zinc-300 relative overflow-hidden flex flex-col justify-center text-center">
            <BookOpen className="w-40 h-40 text-black/5 absolute -right-10 -bottom-10" />
            <div className="relative z-10">
               <div className="text-7xl font-mono font-bold text-black tracking-tighter mb-4">45.2M</div>
               <div className="text-xl uppercase font-black tracking-[0.4em] text-[#FF7F00]">{t.cards.library.metric}</div>
               <p className="mt-8 text-zinc-500 max-w-md mx-auto leading-relaxed">{t.cards.library.subtext}</p>
            </div>
         </section>
      </div>
    </motion.div>
  );
};

const StatCard = ({ title, children, className, onExpand, infoText }: { title: string, children: React.ReactNode, className?: string, onExpand?: () => void, infoText?: string }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn("border rounded-2xl relative p-4 overflow-hidden group transition-all duration-300 ease-in-out", className)}
    >
      <div className="flex justify-between items-start mb-4 relative z-20">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-[12px] font-black uppercase tracking-[0.2em] text-zinc-500">{title}</h3>
          <div className="h-[1px] w-8 bg-[#FF7F00] opacity-50" />
        </div>
        <div className="flex gap-1 items-center">
          <button 
            onClick={onExpand} 
            className="p-1.5 hover:bg-[#FF7F00] hover:text-black rounded-lg transition-all cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <div className="relative">
            <button 
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className={cn(
                "p-1.5 rounded-full transition-all cursor-pointer",
                showTooltip ? "bg-black text-white" : "text-zinc-400 hover:text-white"
              )}
            >
              <Info className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {showTooltip && infoText && (
                <motion.div
                  initial={{ opacity: 0, y: -5, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                  className="absolute top-full right-[-8px] mt-3 w-72 p-5 bg-[#000] text-[#f3e8d2] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] z-50 rounded-lg border border-zinc-800"
                  style={{ pointerEvents: 'none' }}
                >
                  {/* Arrow pin */}
                  <div className="absolute top-[-5px] right-[14px] w-2.5 h-2.5 bg-black border-t border-l border-zinc-800 rotate-45" />
                  
                  <div className="relative z-10 font-sans text-[11px] leading-[1.6]">
                    {infoText.split('. ').map((sentence, i) => (
                      <p key={i} className={cn(i === 0 ? "font-bold text-white mb-2" : "opacity-90")}>
                        {sentence}{i < infoText.split('. ').length - 1 ? '.' : ''}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="h-full relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<'dashboard' | 'infographics'>('dashboard');
  const [expandedCard, setExpandedCard] = useState<{ title: string, content: React.ReactNode } | null>(null);

  const t = translations[lang];

  // Language specific data
  const alumniData = alumniDataMap[lang];
  const departmentStats = departmentStatsMap[lang];
  const internationalStudents = internationalStudentsMap[lang];
  const socialProjects = socialProjectsMap[lang];
  const campusStats = campusStatsMap[lang];
  const sustainabilityData = sustainabilityDataMap[lang];

  const themeClasses = "bg-[#f5f0e8] text-zinc-900";

  const cardClasses = "bg-[#f5f0e8] border-zinc-300 shadow-xs";

  const borderClass = "border-zinc-200";
  const mutedText = "text-zinc-400";
  const axisColor = "#888";
  const gridColor = "#eee";

  return (
    <div className={cn("min-h-screen font-sans selection:bg-[#FF7F00] selection:text-white transition-all duration-300 ease-in-out", themeClasses)}>
      <AnimatePresence>
        {loading && <SplashIntro onComplete={() => setLoading(false)} lang={lang} />}
        
        {/* Expansion Modal */}
        {expandedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setExpandedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={cn("w-full max-w-4xl h-[80vh] rounded-3xl p-8 overflow-hidden relative", cardClasses)}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setExpandedCard(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 flex items-center justify-center text-zinc-400">✕</div>
              </button>
              <h2 className="font-display text-3xl font-black mb-8 text-[#FF7F00] tracking-tight">{expandedCard.title}</h2>
              <div className="h-[80%] pb-10">
                {expandedCard.content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="max-w-[1920px] mx-auto p-4 lg:p-6 pb-20">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl overflow-hidden bg-black">
                 <img src="https://www.ieu.edu.tr/assets/img/ieu-logo-white-en.png" alt="IUE" className="w-10 h-auto" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-black tracking-tight leading-none mb-1">{t.universityName}</h1>
                <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-widest">
                  <span className="text-[#FF7F00]">{t.specialDashboard}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                  <span>2001 - 2026</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-2 px-4 py-2 border rounded-xl flex-1 md:flex-none bg-[#f5f0e8] border-zinc-300">
                <Search className="w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder} 
                  className="bg-transparent border-none text-xs focus:ring-0 w-full outline-hidden"
                />
              </div>
              <div className="flex gap-2 items-center">
                 {Object.entries(t.tags).map(([key, value]) => (
                   <button key={key} className="px-3 py-1 border rounded-lg text-[10px] uppercase font-bold tracking-tighter hover:bg-[#FF7F00] hover:text-black transition-colors bg-[#f5f0e8] border-zinc-300">
                     {value}
                   </button>
                 ))}
                 
                 {/* Language Toggle Button */}
                 <button 
                  onClick={() => setLang(prev => prev === 'en' ? 'tr' : 'en')}
                  className="px-3 py-1 border rounded-lg text-[10px] uppercase font-bold tracking-tighter hover:bg-[#FF7F00] hover:text-black transition-colors bg-zinc-800 text-white border-zinc-800 ml-2"
                 >
                   {lang === 'en' ? 'TR' : 'EN'}
                 </button>

                 {/* View Toggle Button */}
                 <button 
                  onClick={() => setView(prev => prev === 'dashboard' ? 'infographics' : 'dashboard')}
                  className="flex items-center justify-center hover:opacity-80 transition-opacity p-2"
                  title={view === 'dashboard' ? t.nav.infographics : t.nav.dashboard}
                 >
                   {view === 'dashboard' ? (
                     <Square className="w-5 h-5 md:w-6 md:h-6 text-[#FF7F00]" />
                   ) : (
                     <LayoutDashboard className="w-5 h-5 md:w-6 md:h-6 text-[#FF7F00]" />
                   )}
                 </button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          {view === 'dashboard' ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px]"
            >
              
              {/* Main Growth Chart */}
              <StatCard 
                title={t.cards.enrollment.title} 
                className={cn("md:col-span-2 lg:col-span-2 lg:row-span-2", cardClasses)}
                infoText={t.cards.enrollment.info}
                onExpand={() => setExpandedCard({
                  title: t.cards.enrollment.expandedTitle,
                  content: (
                    <div className="h-full w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={studentGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorStudentsExp" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={IUE_ORANGE} stopOpacity={0.3}/>
                              <stop offset="95%" stopColor={IUE_ORANGE} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                          <XAxis dataKey="year" stroke={axisColor} fontSize={12} axisLine={false} tickLine={false} dy={10} />
                          <YAxis stroke={axisColor} fontSize={12} axisLine={false} tickLine={false} tickFormatter={(value) => `${value/1000}k`} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#f5f0e8', border: '1px solid #ccc', borderRadius: '8px', fontSize: '14px' }}
                            itemStyle={{ color: IUE_ORANGE }}
                          />
                          <Area type="monotone" dataKey="students" name={t.cards.enrollment.label} stroke={IUE_ORANGE} strokeWidth={3} fillOpacity={1} fill="url(#colorStudentsExp)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )
                })}
              >
                <div className="h-[380px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={studentGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={IUE_ORANGE} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={IUE_ORANGE} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                      <XAxis 
                        dataKey="year" 
                        stroke={axisColor} 
                        fontSize={10} 
                        axisLine={false} 
                        tickLine={false} 
                        dy={10}
                      />
                      <YAxis 
                        stroke={axisColor} 
                        fontSize={10} 
                        axisLine={false} 
                        tickLine={false} 
                        tickFormatter={(value) => `${value/1000}k`}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#f5f0e8', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px' }}
                        itemStyle={{ color: IUE_ORANGE }}
                        cursor={{ stroke: '#ddd', strokeWidth: 1 }}
                      />
                      <Area type="monotone" dataKey="students" name={t.cards.enrollment.label} stroke={IUE_ORANGE} strokeWidth={2} fillOpacity={1} fill="url(#colorStudents)" animationDuration={2000} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </StatCard>

              {/* Quick Metrics */}
              <StatCard 
                title={t.cards.alumniCount.title} 
                className={cn("lg:row-span-1", cardClasses)}
                infoText={t.cards.alumniCount.info}
                onExpand={() => setExpandedCard({
                  title: t.cards.alumniCount.expandedTitle,
                  content: (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="text-[120px] font-mono font-bold tracking-tighter text-black">
                        25,835
                      </div>
                      <p className={cn("max-w-md text-lg mt-4", mutedText)}>
                        {t.cards.alumniCount.description}
                      </p>
                    </div>
                  )
                })}
              >
                <div className="flex flex-col justify-center h-full">
                    <div className="text-5xl font-mono font-bold tracking-tighter text-black">
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>25,835</motion.span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-full h-1 bg-zinc-100">
                        <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-[#FF7F00]" />
                      </div>
                      <span className={cn("text-[9px] font-bold uppercase", mutedText)}>{t.cards.alumniCount.growth}</span>
                    </div>
                </div>
              </StatCard>

              <StatCard 
                title={t.cards.ranking.title} 
                className={cn("lg:row-span-1", cardClasses)}
                infoText={t.cards.ranking.info}
                onExpand={() => setExpandedCard({
                  title: t.cards.ranking.expandedTitle,
                  content: (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex items-baseline gap-4 mb-10">
                        <span className="text-9xl font-mono font-bold text-black">#501</span>
                        <span className="text-4xl font-mono font-bold text-zinc-500">-600</span>
                      </div>
                      <div className="w-full max-w-2xl bg-zinc-900 h-2 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} className="h-full bg-[#FF7F00]" />
                      </div>
                      <p className={cn("mt-6 text-sm uppercase tracking-widest font-bold", mutedText)}>{t.cards.ranking.subtext}</p>
                    </div>
                  )
                })}
              >
                <div className="flex flex-col justify-center h-full">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-mono font-bold text-black">#501-600</span>
                      <span className={cn("text-[10px] uppercase font-bold", mutedText)}>THE Ranking</span>
                    </div>
                    <div className="mt-4 flex gap-1 text-black">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className={cn("w-full h-1", i <= 4 ? "bg-[#FF7F00]" : "bg-zinc-100")} />
                      ))}
                    </div>
                </div>
              </StatCard>

              {/* Dept Distribution */}
              <StatCard 
                title={t.cards.faculty.title} 
                className={cn("md:col-span-2 lg:col-span-2 lg:row-span-2", cardClasses)}
                infoText={t.cards.faculty.info}
                onExpand={() => setExpandedCard({
                  title: t.cards.faculty.expandedTitle,
                  content: (
                    <div className="h-full flex flex-col md:flex-row items-center p-4">
                      <div className="w-full md:w-3/5 h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart layout="vertical" data={departmentStats} margin={{ left: 40, right: 40 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="group" type="category" stroke={axisColor} fontSize={12} width={180} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#f5f0e8', border: '1px solid #ccc', borderRadius: '8px' }} />
                            <Bar dataKey="count" name={t.cards.faculty.count} fill={IUE_ORANGE} radius={[0, 8, 8, 0]} barSize={30} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="w-full md:w-2/5 h-full flex flex-col justify-center items-center">
                        <div className="relative w-64 h-64">
                          <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie data={departmentStats} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="count">
                                  {departmentStats.map((entry, index) => <Cell key={index} fill={index % 2 === 0 ? IUE_ORANGE : '#ddd'} />)}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-4 w-full px-10">
                          {departmentStats.slice(0,4).map((d, i) => (
                            <div key={i} className="flex flex-col">
                                <span className={cn("text-[10px] uppercase font-bold", mutedText)}>{d.group}</span>
                                <span className="text-xl font-mono font-bold">{d.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              >
                <div className="h-[350px] flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/2 h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={departmentStats} margin={{ left: 20 }}>
                          <XAxis type="number" hide />
                          <YAxis dataKey="group" type="category" stroke={axisColor} fontSize={10} width={120} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#f5f0e8', border: '1px solid #ccc' }} />
                          <Bar dataKey="count" name={t.cards.faculty.count} fill={IUE_ORANGE} radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                  </div>
                  <div className="w-full md:w-1/2 h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={departmentStats}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="count"
                          >
                            {departmentStats.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? IUE_ORANGE : '#ddd'} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                  </div>
                </div>
              </StatCard>

              {/* Global Reach */}
              <StatCard 
                title={t.cards.globalReach.title} 
                className={cardClasses}
                infoText={t.cards.globalReach.info}
                onExpand={() => setExpandedCard({
                  title: t.cards.globalReach.expandedTitle,
                  content: (
                    <div className="flex flex-col h-full justify-center space-y-8 p-6">
                      {alumniData.map((item) => (
                        <div key={item.name} className="space-y-3">
                          <div className="flex justify-between items-baseline font-mono">
                            <span className="text-xl uppercase font-bold text-zinc-700">{item.name}</span>
                            <span className="text-3xl font-bold text-[#FF7F00]">{item.value.toLocaleString()} {t.cards.globalReach.graduates}</span>
                          </div>
                          <div className="h-3 w-full rounded-full bg-zinc-100">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${(item.value / 20000) * 100}%` }} transition={{ duration: 1.2 }} className="h-full bg-[#FF7F00]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })}
              >
                <div className="flex flex-col gap-3 py-2">
                  {alumniData.map((item, idx) => (
                    <div key={item.name} className="flex flex-col gap-1">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        <span>{item.name}</span>
                        <span>{item.value.toLocaleString()}</span>
                      </div>
                      <div className="h-1 w-full bg-zinc-100">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${(item.value / 20000) * 100}%` }}
                          className="bg-zinc-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </StatCard>

              {/* Campus Info */}
              <StatCard 
                title={t.cards.campus.title} 
                className={cardClasses}
                infoText={t.cards.campus.info}
                onExpand={() => setExpandedCard({
                  title: t.cards.campus.expandedTitle,
                  content: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full p-6">
                      {campusStats.map((stat, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="border-l-4 border-[#FF7F00] p-6 rounded-r-xl bg-zinc-50"
                        >
                          <div className="text-sm uppercase font-black tracking-[0.2em] mb-2 text-zinc-400">{stat.label}</div>
                          <div className="text-5xl font-mono font-bold text-[#FF7F00]">{stat.value}</div>
                        </motion.div>
                      ))}
                    </div>
                  )
                })}
              >
                <div className="grid grid-cols-2 gap-4 h-full mt-2">
                    {campusStats.map((stat, i) => (
                      <div key={i} className={cn("border-l pl-3 py-2", borderClass)}>
                        <div className={cn("text-[10px] uppercase font-black", mutedText)}>{stat.label}</div>
                        <div className="text-lg font-mono font-bold text-[#FF7F00]">{stat.value}</div>
                      </div>
                    ))}
                </div>
              </StatCard>

              {/* Research Grants */}
              <StatCard 
                title={t.cards.research.title} 
                className={cn("lg:row-span-1", cardClasses)}
                infoText={t.cards.research.info}
                onExpand={() => setExpandedCard({
                  title: t.cards.research.expandedTitle,
                  content: (
                    <div className="h-full w-full pt-10">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={researchGrants} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
                          <XAxis dataKey="year" stroke={axisColor} fontSize={14} axisLine={false} tickLine={false} dy={10} />
                          <YAxis stroke={axisColor} fontSize={14} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
                          <Tooltip contentStyle={{ backgroundColor: '#f5f0e8', border: '1px solid #ccc', borderRadius: '12px' }} />
                          <Bar dataKey="amount" name={t.cards.research.amount} fill={IUE_ORANGE} radius={[10, 10, 0, 0]} barSize={60} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )
                })}
              >
                <div className="h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={researchGrants}>
                      <Bar dataKey="amount" name={t.cards.research.amount} fill="#ddd" />
                      <Tooltip contentStyle={{ backgroundColor: '#f5f0e8', border: '1px solid #ccc' }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </StatCard>

              {/* International Presence */}
              <StatCard 
                title={t.cards.diversity.title} 
                className={cn("md:col-span-2 lg:col-span-2", cardClasses)}
                infoText={t.cards.diversity.info}
                onExpand={() => setExpandedCard({
                  title: t.cards.diversity.expandedTitle,
                  content: (
                    <div className="flex flex-col h-full p-6">
                      <div className="flex items-center gap-10 mb-10">
                        <Globe className="w-32 h-32 text-zinc-100" />
                        <div>
                            <div className="text-6xl font-mono font-bold text-[#FF7F00]">1,400+</div>
                            <div className="text-lg uppercase tracking-widest font-black mt-2 text-zinc-400">{t.cards.diversity.label}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        {internationalStudents.map((item) => (
                            <div key={item.region} className="group">
                              <div className="flex justify-between items-baseline mb-2">
                                  <span className="text-sm uppercase font-bold tracking-wider text-zinc-600">{item.region}</span>
                                  <span className="text-2xl font-mono font-bold text-[#FF7F00]">{item.students}</span>
                              </div>
                              <div className="h-2 w-full rounded-full overflow-hidden bg-zinc-100">
                                  <motion.div initial={{ width: 0 }} animate={{ width: `${(item.students / 500) * 100}%` }} transition={{ duration: 1 }} className="h-full bg-[#FF7F00]" />
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              >
                <div className="flex items-center h-full gap-8">
                    <div className="flex-1 space-y-2">
                      {internationalStudents.map((item) => (
                        <div key={item.region} className="flex flex-col gap-1">
                          <div className="flex justify-between text-[8px] uppercase font-bold text-zinc-400">
                            <span>{item.region}</span>
                            <span>{item.students}</span>
                          </div>
                          <div className="h-1 w-full bg-zinc-100">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${(item.students / 500) * 100}%` }} className="h-full bg-[#FF7F00]" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="w-32 h-32 flex items-center justify-center">
                      <Globe className="w-16 h-16 text-zinc-100" />
                    </div>
                </div>
              </StatCard>

              {/* Social Impact */}
              <StatCard 
                title={t.cards.social.title} 
                className={cn("lg:row-span-1", cardClasses)}
                infoText={t.cards.social.info}
                onExpand={() => setExpandedCard({
                  title: t.cards.social.expandedTitle,
                  content: (
                    <div className="grid grid-cols-1 gap-6 p-6 h-full overflow-y-auto">
                      {socialProjects.map((p, i) => (
                        <div key={i} className={cn("p-6 border rounded-2xl flex items-center gap-6", borderClass)}>
                          <div className="w-16 h-16 rounded-full bg-[#FF7F00] flex items-center justify-center text-black font-bold text-2xl">
                            {p.count}
                          </div>
                          <div>
                              <h4 className="font-display text-xl font-bold uppercase tracking-wider">{p.category} {t.cards.social.projectLabel}</h4>
                              <p className={cn("text-sm mt-1", mutedText)}>{t.cards.social.description.replace('{category}', p.category)}</p>
                          </div>
                          <ArrowUpRight className="ml-auto w-6 h-6 text-[#FF7F00]" />
                        </div>
                      ))}
                    </div>
                  )
                })}
              >
                <div className="flex flex-col h-full justify-around py-2">
                    {socialProjects.map((p) => (
                      <div key={p.category} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#FF7F00]" />
                        <span className="text-[10px] uppercase font-bold text-zinc-400">{p.category}</span>
                        <span className="ml-auto font-mono text-black">{p.count}</span>
                      </div>
                    ))}
                </div>
              </StatCard>

              {/* Sustainability */}
              <StatCard 
                title={t.cards.sustainability.title} 
                className={cn("md:col-span-2 lg:col-span-2 lg:row-span-1", cardClasses)}
                infoText={t.cards.sustainability.info}
                onExpand={() => setExpandedCard({
                  title: t.cards.sustainability.expandedTitle,
                  content: (
                    <div className="h-full w-full pt-10">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sustainabilityData} margin={{ left: 40, right: 40, bottom: 40 }}>
                          <defs>
                            <linearGradient id="colorEnergyExp" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={IUE_ORANGE} stopOpacity={0.4}/>
                              <stop offset="95%" stopColor={IUE_ORANGE} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" stroke={axisColor} fontSize={14} axisLine={false} tickLine={false} dy={10} />
                          <YAxis stroke={axisColor} fontSize={14} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#f5f0e8', border: '1px solid #ccc', borderRadius: '12px' }} />
                          <Area type="monotone" dataKey="energy" name={t.cards.sustainability.energy} stroke={IUE_ORANGE} fill="url(#colorEnergyExp)" strokeWidth={4} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )
                })}
              >
                <div className="h-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sustainabilityData}>
                        <XAxis dataKey="month" hide />
                        <Tooltip contentStyle={{ backgroundColor: '#f5f0e8', border: '1px solid #ccc' }} />
                        <Area type="monotone" dataKey="energy" name={t.cards.sustainability.energy} stroke="#FF7F00" fill="#FF7F00" fillOpacity={0.1} strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                </div>
              </StatCard>

              <StatCard 
                title={t.cards.library.title} 
                className={cardClasses}
                infoText={t.cards.library.info}
                onExpand={() => setExpandedCard({
                  title: t.cards.library.expandedTitle,
                  content: (
                    <div className="flex flex-col items-center justify-center h-full text-center p-10">
                      <BookOpen className="w-24 h-24 text-[#FF7F00] mb-10" />
                      <div className="text-8xl font-mono font-bold leading-none tracking-tighter text-black">45.2M</div>
                      <div className="text-2xl uppercase tracking-[0.3em] font-black mt-6 text-zinc-400">{t.cards.library.metric}</div>
                      <p className="mt-10 max-w-2xl text-lg text-zinc-400">{t.cards.library.subtext}</p>
                    </div>
                  )
                })}
              >
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-4xl font-mono font-bold text-black">45.2M</div>
                    <div className="text-[9px] uppercase mt-2 font-bold text-zinc-400">{t.cards.library.label}</div>
                </div>
              </StatCard>

              <StatCard 
                title={t.cards.alumniNetwork.title} 
                className={cardClasses}
                infoText={t.cards.alumniNetwork.info}
                onExpand={() => setExpandedCard({
                  title: t.cards.alumniNetwork.expandedTitle,
                  content: (
                    <div className="flex flex-col h-full items-center justify-center space-y-12">
                      <div className="flex items-center gap-6">
                          <MapPin className="w-24 h-24 text-[#FF7F00]" />
                          <div className="text-[140px] font-mono font-bold leading-none text-[#FF7F00]">115</div>
                      </div>
                      <div className="text-2xl uppercase tracking-widest font-black text-center text-zinc-700">
                          {t.cards.alumniNetwork.subtext}
                      </div>
                    </div>
                  )
                })}
              >
                <div className="flex flex-col justify-center h-full -mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-[#FF7F00]" />
                      <span className="text-2xl font-mono font-bold text-black">115</span>
                    </div>
                    <span className="text-[9px] uppercase font-black text-zinc-400">{t.cards.alumniNetwork.label}</span>
                </div>
              </StatCard>

            </motion.div>
          ) : (
            <InfographicsView 
              t={t}
              alumniData={alumniData}
              departmentStats={departmentStats}
              studentGrowthData={studentGrowthData}
              internationalStudents={internationalStudents}
              socialProjects={socialProjects}
              researchGrants={researchGrants}
              sustainabilityData={sustainabilityData}
              campusStats={campusStats}
              axisColor={axisColor}
              gridColor={gridColor}
              mutedText={mutedText}
            />
          )}
        </div>
      )}

      {/* Footer Navigation (Mobile Style like reference) */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 border-t flex items-center justify-around z-40 px-4 md:hidden bg-[#f5f0e8] border-zinc-300">
         <button 
           onClick={() => setView('dashboard')}
           className={cn("flex flex-col items-center", view === 'dashboard' ? "text-[#FF7F00]" : "text-zinc-400")}
         >
           <LayoutDashboard className="w-5 h-5" />
           <span className="text-[8px] mt-1 font-bold">{t.nav.dashboard}</span>
         </button>
         <button 
           onClick={() => setView('infographics')}
           className={cn("flex flex-col items-center", view === 'infographics' ? "text-[#FF7F00]" : "text-zinc-400")}
         >
           <BarChart3 className="w-5 h-5" />
           <span className="text-[8px] mt-1 font-bold">{t.nav.infographics}</span>
         </button>
         <div className="flex flex-col items-center text-zinc-400">
           <Globe className="w-5 h-5" />
           <span className="text-[8px] mt-1 font-bold">{t.nav.alumni}</span>
         </div>
         <div className="flex flex-col items-center text-zinc-400">
           <BookOpen className="w-5 h-5" />
           <span className="text-[8px] mt-1 font-bold">{t.nav.academic}</span>
         </div>
         <div className="flex flex-col items-center text-zinc-400">
           <Menu className="w-5 h-5" />
           <span className="text-[8px] mt-1 font-bold">{t.nav.more}</span>
         </div>
      </nav>
    </div>
  );
}
