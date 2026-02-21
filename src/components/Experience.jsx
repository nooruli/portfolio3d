import React, { useRef, useEffect } from 'react';
import { Briefcase, Zap, MapPin } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Experience() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

    const experiences = [
        {
            company: 'Optum (UnitedHealth Group)',
            role: 'Senior Full Stack Developer',
            period: 'Jul 2025 – Present',
            location: 'Noida, India',
            current: true,
            achievements: [
                'Leading AI-powered Healthcare application development',
                'Architecting scalable microservices on AWS EKS',
                'Working on mission-critical systems impacting millions',
                'Driving CI/CD pipeline optimization with Jenkins',
            ],
            tech: ['Java', 'Spring Boot', 'React', 'AWS EKS', 'Docker', 'Kubernetes', 'Jenkins', 'Microservices'],
        },
        {
            company: 'Mindfire Digital LLP',
            role: 'Senior Software Engineer',
            period: 'Apr 2022 – Jun 2025',
            location: 'Noida, India',
            current: false,
            achievements: [
                'Full Stack development for Medical and AI applications',
                'Direct client collaboration for feature roadmap planning',
                'Built 400+ RESTful APIs for core banking integrations',
                'Achieved 99.9% application uptime through robust monitoring',
            ],
            tech: ['Groovy', 'Grails', 'React', 'AWS', 'Java 11', 'Spring Boot', 'Aurora DB', 'TypeScript', 'Docker', 'Kubernetes'],
        },
        {
            company: 'Nexthoughts Technologies',
            role: 'Senior Software Engineer',
            period: 'Dec 2020 – Apr 2022',
            location: 'Noida, India',
            current: false,
            achievements: [
                'Developed Synthetic Data Generation & Automation applications',
                'Gathered client requirements and implemented feedback loops',
                'Built automation platforms reducing manual effort by 60%',
            ],
            tech: ['Hibernate', 'JPA', 'Groovy', 'Grails', 'React', 'AWS', 'Spring Boot', 'Docker'],
        },
        {
            company: 'HCL Technologies',
            role: 'Software Engineer',
            period: 'Sept 2018 – Dec 2020',
            location: 'Pune, India',
            current: false,
            achievements: [
                'Worked on critical Banking and Telecom applications',
                'Completed 3-month rigorous training program',
                'Developed microservices-based enterprise solutions',
            ],
            tech: ['Java', 'Spring Boot', 'Microservices', 'Angular', 'React', 'AWS', 'Jenkins', 'Git'],
        },
    ];

    return (
        <section ref={ref} className={`py-24 md:py-32 px-4 md:px-16 lg:px-24 mx-auto max-w-7xl relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>

            <div className="text-center mb-20">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
                    <span className="text-gradient-purple">Work Experience</span>
                </h2>
                <p className="text-slate-400 text-base sm:text-lg">7+ years of building and shipping at scale.</p>
            </div>

            <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#1a0a2e] transform md:-translate-x-1/2"></div>
                <div
                    className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-indigo-500 to-transparent rounded-full shadow-[0_0_10px_rgba(168,85,247,0.6)] transform md:-translate-x-1/2 transition-all duration-[2000ms] ease-out origin-top"
                    style={{ transform: `translateX(-50%) scaleY(${isVisible ? 1 : 0})` }}
                ></div>

                {experiences.map((exp, idx) => {
                    const isLeft = idx % 2 === 0;
                    return (
                        <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center mb-20 ${isLeft ? 'md:flex-row-reverse' : ''} group`} style={{ transitionDelay: `${idx * 200}ms` }}>

                            <div className="absolute left-5 md:left-1/2 top-6 md:top-1/2 w-10 h-10 rounded-full bg-[#0a0118] border-2 border-purple-500 transform -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-125 transition-transform duration-500">
                                {exp.current ? <Zap size={16} className="text-purple-400 animate-pulse" /> : <Briefcase size={14} className="text-indigo-400" />}
                            </div>

                            <div className={`w-full md:w-1/2 pl-14 md:pl-0 ${isLeft ? 'md:pr-14 text-left md:text-right' : 'md:pl-14 text-left'}`}>
                                <div className="glass-card p-6 sm:p-7 rounded-2xl relative overflow-hidden transition-all duration-700 hover:-translate-y-2">

                                    <div className={`flex flex-col ${isLeft ? 'md:items-end' : 'md:items-start'} mb-3`}>
                                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-3 border ${exp.current ? 'bg-purple-500/10 text-purple-400 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'bg-[#1a0a2e]/50 text-slate-300 border-purple-500/10'}`}>
                                            {exp.current && <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>}
                                            {exp.period}
                                        </span>
                                        <h3 className="text-xl sm:text-2xl font-black text-white mb-1">{exp.role}</h3>
                                        <h4 className="text-base text-purple-300 font-semibold">{exp.company}</h4>
                                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                            <MapPin size={12} /> {exp.location}
                                        </p>
                                    </div>

                                    <ul className={`space-y-2 mb-4 ${isLeft ? 'md:text-right' : ''}`}>
                                        {exp.achievements.map((a, ai) => (
                                            <li key={ai} className="text-sm text-slate-400 flex items-start gap-2">
                                                <span className="text-purple-500 mt-0.5 shrink-0">▸</span>
                                                <span>{a}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
                                        {exp.tech.map((t) => (
                                            <span key={t} className="text-xs px-2 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/15 font-mono">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
