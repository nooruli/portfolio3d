import React, { useRef, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

function SkillRing({ name, percent, color = '#a855f7' }) {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.5 });
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const offset = isVisible ? circumference - (percent / 100) * circumference : circumference;
    const uniqueId = name.replace(/\s+/g, '-').toLowerCase();

    return (
        <div ref={ref} className="flex flex-col items-center group cursor-default">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-4 group-hover:-translate-y-2 transition-transform duration-300">

                {/* Smooth Glass Shell with Deep Blur */}
                <div className="absolute inset-[3px] rounded-full backdrop-blur-[12px] border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),0_0_15px_rgba(0,0,0,0.5)] pointer-events-none"></div>

                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90 relative z-10 overflow-visible">
                    <defs>
                        {/* Outer Neon Aura Filter */}
                        <filter id={`neon-aura-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.4 0" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Inner Liquid Glow */}
                        <filter id={`liquid-glow-${uniqueId}`} x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="2.5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>

                        {/* Liquid Refraction */}
                        <filter id={`refract-${uniqueId}`}>
                            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="1" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                    </defs>
                    {/* Base Track (Subtle Glass) */}
                    <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />

                    {/* Neon Liquid Aura (The wide glow) */}
                    <circle
                        cx="60" cy="60" r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        filter={`url(#neon-aura-${uniqueId})`}
                        style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)', opacity: 0.15 }}
                    />

                    {/* Primary Neon Liquid (High Saturation, Semi-Transparent) */}
                    <circle
                        cx="60" cy="60" r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="7.5"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        filter={`url(#refract-${uniqueId})`}
                        style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)', opacity: 0.6 }}
                    />

                    {/* Inner Core Glow */}
                    <circle
                        cx="60" cy="60" r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        filter={`url(#liquid-glow-${uniqueId})`}
                        style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)', opacity: 0.8 }}
                    />

                    {/* Glass Surface Specular Reflection */}
                    <circle
                        cx="60" cy="60" r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset + 4}
                        className="opacity-50"
                        style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />
                </svg>

                {/* Info Text with Clean Neon Shadow */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <span className="text-xl md:text-2xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">{percent}%</span>
                </div>
            </div>
            <h3 className="text-[10px] sm:text-[11px] font-black text-slate-400 group-hover:text-white transition-all text-center leading-tight tracking-[0.15em] uppercase">{name}</h3>
        </div >
    );
}

function SkillBar({ name, percent, color = '#a855f7' }) {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.8 });

    return (
        <div ref={ref} className="group">
            <div className="flex justify-between mb-2">
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-black group-hover:text-white transition-all tracking-[0.2em] uppercase">{name}</span>
                <span className="text-sm font-black font-mono opacity-80 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all" style={{ color }}>{percent}%</span>
            </div>

            {/* Ultra-Smooth Glass Tube with Deep Backdrop Blur */}
            <div className="w-full h-4.5 bg-white/5 backdrop-blur-[15px] rounded-full relative overflow-visible border border-white/10 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.05)]">

                {/* High-Vibrancy Neon Liquid Fill */}
                <div
                    className="h-full rounded-full transition-all duration-1000 ease-out relative"
                    style={{
                        width: isVisible ? percent + '%' : '0%',
                        background: `linear-gradient(to bottom, ${color}66 0%, ${color}EE 50%, ${color}66 100%)`, // High-saturation neon core
                        boxShadow: `0 0 25px ${color}40, 0 0 50px ${color}20` // Powerful neon emission glow
                    }}
                >
                    {/* Interior Shimmer & Depth */}
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                        {/* Specular White Glare (The Glass Shine) */}
                        <div className="absolute top-[1.5px] left-0 right-0 h-[1.5px] bg-white/40 rounded-full mx-1.5 opacity-80"></div>
                        <div className="absolute top-[4.5px] left-0 right-0 h-[0.5px] bg-white/20 rounded-full mx-3"></div>

                        {/* High-Contrast Shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-25deg] animate-shimmer opacity-50"></div>
                    </div>

                    {/* Glossy Cap Reflection at Edge */}
                    <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-white/10 to-transparent"></div>
                </div>

                {/* Outer Glass Shell Reflection & Fresnel Edge */}
                <div className="absolute inset-0 pointer-events-none rounded-full border-t border-white/20 opacity-40 shadow-[inset_0_4px_12px_rgba(255,255,255,0.1)]"></div>
            </div>
        </div>
    );
}

export default function Skills() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

    const ringSkills = [
        { name: 'Java / Spring Boot', percent: 96, color: '#a855f7' },
        { name: 'React.js', percent: 94, color: '#38bdf8' },
        { name: 'REST APIs', percent: 98, color: '#a3e635' },
        { name: 'AWS Cloud', percent: 93, color: '#fb923c' },
        { name: 'Databases', percent: 95, color: '#f43f5e' },
        { name: 'Microservices', percent: 97, color: '#2dd4bf' },
    ];

    const categories = [
        {
            title: 'Backend',
            skills: [
                { name: 'Java / Spring Boot', percent: 97, color: '#a855f7' },
                { name: 'Groovy / Grails', percent: 94, color: '#6366f1' },
                { name: 'Microservices', percent: 96, color: '#2dd4bf' },
                { name: 'Hibernate / JPA', percent: 92, color: '#f43f5e' },
                { name: 'REST APIs', percent: 98, color: '#a3e635' },
            ]
        },
        {
            title: 'Frontend',
            skills: [
                { name: 'React.js', percent: 94, color: '#38bdf8' },
                { name: 'TypeScript', percent: 92, color: '#fbbf24' },
                { name: 'JavaScript (ES6+)', percent: 96, color: '#fde047' },
                { name: 'HTML5 / CSS3', percent: 95, color: '#fb923c' },
                { name: 'Angular', percent: 91, color: '#ef4444' },
            ]
        },
        {
            title: 'Database',
            skills: [
                { name: 'MySQL / PostgreSQL', percent: 95, color: '#3b82f6' },
                { name: 'MongoDB', percent: 93, color: '#10b981' },
                { name: 'Aurora DB', percent: 92, color: '#6366f1' },
                { name: 'Redis', percent: 90, color: '#ef4444' },
            ]
        },
        {
            title: 'Cloud / DevOps',
            skills: [
                { name: 'AWS (EKS, S3, SQS)', percent: 93, color: '#fb923c' },
                { name: 'Docker', percent: 91, color: '#38bdf8' },
                { name: 'Kubernetes', percent: 90, color: '#3b82f6' },
                { name: 'CI/CD (Jenkins)', percent: 94, color: '#f43f5e' },
            ]
        },
    ];

    return (
        <section ref={ref} className={`py-24 md:py-32 px-4 md:px-16 lg:px-24 mx-auto max-w-7xl relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>

            <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
                    <span className="text-gradient-purple">Skills &amp; Proficiency</span>
                </h2>
                <p className="text-slate-400 text-base sm:text-lg">
                    Proficiency levels from 7+ years of production deployments.
                </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 justify-items-center max-w-4xl mx-auto mb-20">
                {ringSkills.map((s, i) => (
                    <SkillRing key={i} {...s} />
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categories.map((cat, i) => (
                    <div key={i} className="glass-card p-6 rounded-2xl">
                        <h3 className="text-lg font-bold text-purple-300 mb-5 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            {cat.title}
                        </h3>
                        <div className="space-y-4">
                            {cat.skills.map((s, j) => (
                                <SkillBar key={j} name={s.name} percent={s.percent} color={s.color} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
