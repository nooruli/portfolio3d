import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, ListChecks, BarChart3, ExternalLink, X, MousePointerClick, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const projectsData = [
    {
        icon: <ShoppingCart size={32} className="text-purple-400" />,
        title: 'E-Commerce Platform',
        desc: 'Full-featured platform with real-time inventory management, payment processing via Stripe, and advanced analytics dashboards. Included custom headless CMS integrations and extremely optimized database queries serving millions of monthly requests.',
        tech: ['React', 'Node.js', 'MongoDB', 'Redis', 'Stripe', 'AWS'],
        color: 'from-purple-600 to-indigo-600',
        bg: '#1a0b2e',
        border: 'border-purple-500/30'
    },
    {
        icon: <Heart size={32} className="text-red-400" />,
        title: 'Healthcare Management',
        desc: 'HIPAA-compliant patient management system with Electronic Health Records (EHR), prescription management, and HL7 FHIR integration. Utilizes advanced encryption and comprehensive audit logging.',
        tech: ['React', 'Spring Boot', 'PostgreSQL', 'AWS', 'HL7 FHIR'],
        color: 'from-red-600 to-pink-600',
        bg: '#2e0b16',
        border: 'border-red-500/30'
    },
    {
        icon: <ListChecks size={32} className="text-emerald-400" />,
        title: 'Task Management Pro',
        desc: 'Enterprise-grade project management with Kanban boards, Gantt charts, real-time notifications via WebSockets, and team collaboration. Multi-tenant architecture supporting thousands of concurrent agile teams.',
        tech: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'MongoDB'],
        color: 'from-emerald-600 to-teal-600',
        bg: '#0b2e1b',
        border: 'border-emerald-500/30'
    },
    {
        icon: <BarChart3 size={32} className="text-blue-400" />,
        title: 'Analytics Dashboard',
        desc: 'Real-time BI dashboard with customizable widgets, automated reporting pipelines, and data visualization using D3.js and Kafka streams. Ingests and processes millions of events per second.',
        tech: ['React', 'D3.js', 'Python', 'Apache Kafka', 'Elasticsearch'],
        color: 'from-blue-600 to-cyan-600',
        bg: '#0b162e',
        border: 'border-blue-500/30'
    },
];

export default function Projects() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });
    const [cards, setCards] = useState(projectsData);
    const [expandedCard, setExpandedCard] = useState(null);

    const cycleCard = () => {
        setCards((prev) => {
            const newCards = [...prev];
            const swipedCard = newCards.splice(newCards.length - 1, 1)[0];
            newCards.unshift(swipedCard);
            return newCards;
        });
    };

    const handleDragEnd = (event, info, index) => {
        const threshold = 80;
        if (Math.abs(info.offset.x) > threshold) {
            cycleCard();
        }
    };

    return (
        <section id="projects" ref={ref} className={`py-24 md:py-32 px-4 md:px-16 lg:px-24 mx-auto w-full max-w-7xl relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>

            <div className="text-center mb-16 px-4">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
                    <span className="text-gradient-purple">Featured Projects</span>
                </h2>
                <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto flex flex-col items-center gap-2">
                    <span>A selection of impactful projects I've architected and delivered.</span>
                    <span className="inline-flex items-center gap-2 text-purple-400 bg-purple-500/10 px-4 py-1.5 rounded-full text-sm font-semibold border border-purple-500/20">
                        Swipe cards <span className="text-lg">↔️</span> or use arrows
                        <MousePointerClick size={16} />
                    </span>
                </p>
            </div>

            {/* Tinder Cards Container with Arrows */}
            <div className="relative w-full max-w-2xl mx-auto h-[520px] sm:h-[480px] flex items-center justify-center">

                {/* Left Arrow Button */}
                <button
                    onClick={cycleCard}
                    className="absolute left-0 lg:-left-24 z-50 p-4 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 hover:text-white transition-all hidden sm:flex items-center justify-center hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.1)] group"
                >
                    <ChevronLeft size={36} className="group-hover:-translate-x-1 transition-transform" />
                </button>

                <div className="relative w-full max-w-sm h-full flex items-center justify-center" style={{ perspective: '1200px', perspectiveOrigin: '50% 40%' }}>
                    <AnimatePresence mode="popLayout">
                        {cards.map((proj, i) => {
                            const isTop = i === cards.length - 1;
                            const indexFromTop = cards.length - 1 - i;

                            return (
                                <motion.div
                                    key={proj.title}
                                    className={`absolute w-full h-full rounded-4xl cursor-grab active:cursor-grabbing border ${proj.border}`}
                                    layer={i}
                                    style={{
                                        backgroundColor: proj.bg,
                                        boxShadow: isTop
                                            ? `0 30px 70px -15px rgba(0,0,0,0.7), 0 0 50px rgba(168,85,247,0.25), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.4)`
                                            : `0 10px 30px -10px rgba(0,0,0,0.4)`,
                                        zIndex: i,
                                        borderRadius: '2rem',
                                        transformOrigin: 'bottom center',
                                        border: `1px solid rgba(255,255,255,${isTop ? 0.1 : 0.04})`,
                                    }}
                                    initial={{ scale: 0.8, y: 100, opacity: 0 }}
                                    animate={{
                                        scale: 1 - indexFromTop * 0.05,
                                        y: indexFromTop * -25,
                                        opacity: 1 - indexFromTop * 0.2,
                                        rotateZ: indexFromTop === 0 ? 0 : (indexFromTop % 2 === 0 ? 2 : -2)
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    drag={isTop ? 'x' : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.9}
                                    onDragEnd={(e, info) => handleDragEnd(e, info, i)}
                                    whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
                                    onClick={() => isTop && setExpandedCard(proj)}
                                >
                                    {/* 3D Curved Card Content */}
                                    <div className="h-full flex flex-col items-center justify-center text-center pointer-events-none relative" style={{ borderRadius: '2rem' }}>

                                        {/* ── CYLINDER FACE EFFECT ── */}
                                        {/* Dark vignette on left+right edges — simulates curved cylinder surface */}
                                        <div className="absolute inset-0 pointer-events-none" style={{
                                            borderRadius: '2rem',
                                            background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 28%, transparent 50%, rgba(0,0,0,0.1) 72%, rgba(0,0,0,0.65) 100%)',
                                        }}></div>

                                        {/* Vertical specular highlight stripe — the 'shine' on the curved face */}
                                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[40%] pointer-events-none" style={{
                                            background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 60%, transparent 100%)',
                                            borderRadius: '50%',
                                        }}></div>

                                        {/* Top gloss catch-light */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-16 pointer-events-none" style={{
                                            background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 70%)',
                                        }}></div>

                                        {/* Bottom ambient colour glow */}
                                        <div className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t ${proj.color} opacity-15 pointer-events-none`} style={{ borderRadius: '0 0 2rem 2rem' }}></div>

                                        {/* Color glow blobs */}
                                        <div className={`absolute -top-16 -right-16 w-48 h-48 blur-[80px] rounded-full bg-gradient-to-br ${proj.color} opacity-50 mix-blend-screen`}></div>
                                        <div className={`absolute -bottom-16 -left-16 w-48 h-48 blur-[80px] rounded-full bg-gradient-to-br ${proj.color} opacity-50 mix-blend-screen`}></div>

                                        <div className="w-24 h-24 rounded-2xl bg-[#0a0118]/80 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] relative z-10 backdrop-blur-sm">
                                            {proj.icon}
                                        </div>
                                        <h3 className="text-3xl sm:text-4xl font-black text-white mb-4 relative z-10 leading-tight tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">{proj.title}</h3>

                                        <div className="mt-6 relative z-10">
                                            <div className="explore-btn relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-black text-sm sm:text-base tracking-widest overflow-hidden cursor-pointer">
                                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-80 explore-liquid"></div>
                                                <div className="absolute inset-[2px] rounded-full bg-[#0f0520]"></div>
                                                <span className="explore-sparkle-1 absolute top-1 left-4 w-1 h-1 rounded-full bg-white"></span>
                                                <span className="explore-sparkle-2 absolute bottom-1 right-6 w-1.5 h-1.5 rounded-full bg-pink-300"></span>
                                                <span className="explore-sparkle-3 absolute top-2 right-8 w-1 h-1 rounded-full bg-purple-300"></span>
                                                <span className="relative z-10 flex items-center gap-2 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                                                    <MousePointerClick size={16} className="text-pink-300" />
                                                    TAP TO EXPLORE
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Right Arrow Button */}
                <button
                    onClick={cycleCard}
                    className="absolute right-0 lg:-right-24 z-50 p-4 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 hover:text-white transition-all hidden sm:flex items-center justify-center hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.1)] group"
                >
                    <ChevronRight size={36} className="group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Mobile Navigation Bar */}
                <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-12 sm:hidden px-4 z-50">
                    <button
                        onClick={cycleCard}
                        className="p-5 rounded-full bg-purple-500/10 border-2 border-purple-500/20 text-purple-400 active:bg-purple-500/30 active:scale-90 transition-all shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        onClick={cycleCard}
                        className="p-5 rounded-full bg-purple-500/10 border-2 border-purple-500/20 text-purple-400 active:bg-purple-500/30 active:scale-90 transition-all shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>
            </div>

            {/* Expanded Content Modal */}
            <AnimatePresence>
                {expandedCard && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                            onClick={() => setExpandedCard(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            transition={{ type: 'spring', bounce: 0.3 }}
                            className="bg-[#0f051a] border border-purple-500/30 rounded-[2.5rem] max-w-xl w-full relative z-10 overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.25)]"
                        >
                            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${expandedCard.color}`}></div>

                            <button
                                onClick={() => setExpandedCard(null)}
                                className="absolute top-6 right-6 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-20 border border-white/10"
                            >
                                <X size={24} />
                            </button>

                            <div className="p-8 sm:p-12">
                                <div className="w-20 h-20 rounded-3xl bg-[#0a0118] border border-white/10 flex items-center justify-center mb-8 shadow-2xl">
                                    {expandedCard.icon}
                                </div>

                                <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight tracking-tight">{expandedCard.title}</h3>

                                <p className="text-slate-300 text-lg leading-relaxed mb-10 font-medium">
                                    {expandedCard.desc}
                                </p>

                                <div className="mb-10">
                                    <h4 className="text-sm font-black text-purple-400 uppercase tracking-widest mb-4">Development Stack</h4>
                                    <div className="flex flex-wrap gap-2.5">
                                        {expandedCard.tech.map((t) => (
                                            <span key={t} className="text-sm px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 font-bold">{t}</span>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </section>
    );
}
