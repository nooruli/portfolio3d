import React from 'react';
import { Rocket, Lightbulb, Users, GraduationCap, Award, Trophy } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

    const missions = [
        { icon: <Rocket className="text-purple-400" size={28} />, title: 'Innovation-Driven', desc: 'Pushing boundaries with AI-powered architectures and cutting-edge full stack solutions for Fortune 500 companies.' },
        { icon: <Lightbulb className="text-amber-400" size={28} />, title: 'Problem Solver', desc: 'Transforming complex challenges across Banking, Medical, Automation, Data Generation, Telecom, and AI sectors.' },
        { icon: <Users className="text-blue-400" size={28} />, title: 'Client-Focused Leader', desc: 'Collaborating directly with clients for feature roadmaps, mentoring teams, and delivering aggressive timelines.' },
    ];

    const techStack = [
        'React', 'Node.js', 'TypeScript', 'Java', 'Spring Boot',
        'AWS', 'Docker', 'Kubernetes', 'Microservices', 'GraphQL',
        'PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'Jenkins',
        'Terraform', 'Camunda', 'AI/ML',
    ];

    const statPanels = [
        { label: 'Projects Delivered', value: '50+', bar: 90 },
        { label: 'Client Satisfaction', value: '98%', bar: 98 },
        { label: 'Code Reviews', value: '1000+', bar: 85 },
        { label: 'Team Members Led', value: '15+', bar: 75 },
    ];

    const education = [
        { icon: <GraduationCap size={20} className="text-purple-400" />, title: 'B.Tech Computer Science', place: 'Uttaranchal University (2014–2018)', detail: '83% | CGPA 9/10' },
        { icon: <Award size={20} className="text-blue-400" />, title: 'Oracle Database Certification', place: 'University-sponsored', detail: 'Certified Database Professional' },
        { icon: <Award size={20} className="text-emerald-400" />, title: 'IoT Certification', place: 'Collaboration with IIT-Delhi', detail: 'Internet of Things Specialization' },
        { icon: <Trophy size={20} className="text-amber-400" />, title: 'McMillian Math Competition', place: 'University of South Wales', detail: 'Distinction + Cleared JEE Main' },
    ];

    return (
        <section ref={ref} className={`py-24 md:py-32 px-4 md:px-16 lg:px-24 mx-auto max-w-7xl relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>

            <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
                    <span className="text-gradient-purple">About Me</span>
                </h2>
                <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
                    Inventive Full Stack Developer specializing in state-of-the-art solutions for Fortune 500 clients. Strong focus on continuous learning, clean architecture, and client collaboration.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {missions.map((m, i) => (
                    <div key={i} className="glass-card p-7 rounded-2xl group cursor-default" style={{ transitionDelay: `${i * 100}ms` }}>
                        <div className="mb-5 w-14 h-14 rounded-xl bg-[#1a0a2e] border border-purple-500/20 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
                            {m.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">{m.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mb-16">
                <h3 className="text-lg font-bold text-slate-300 mb-5 text-center">Core Tech Stack</h3>
                <div className="flex flex-wrap justify-center gap-3">
                    {techStack.map((tag, i) => (
                        <span key={tag} className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#1a0a2e]/80 text-slate-200 border border-purple-500/20 hover:border-purple-400 hover:text-purple-300 hover:shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all cursor-default transform hover:-translate-y-1">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                {statPanels.map((s, i) => (
                    <div key={i} className="glass-card p-5 rounded-2xl text-center group">
                        <div className="text-3xl sm:text-4xl font-black text-white mb-2 group-hover:text-purple-300 transition-colors">{s.value}</div>
                        <p className="text-xs sm:text-sm text-slate-400 mb-3">{s.label}</p>
                        <div className="w-full h-2 bg-[#1a0a2e] rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 transition-all duration-1000 delay-300" style={{ width: isVisible ? s.bar + '%' : '0%' }}></div>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <h3 className="text-lg font-bold text-slate-300 mb-5 text-center">Education &amp; Certifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {education.map((edu, i) => (
                        <div key={i} className="glass-card p-5 rounded-2xl group cursor-default">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-[#1a0a2e] border border-purple-500/20 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
                                    {edu.icon}
                                </div>
                                <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors leading-tight">{edu.title}</h4>
                            </div>
                            <p className="text-xs text-slate-400">{edu.place}</p>
                            <p className="text-xs text-purple-400 mt-1 font-mono">{edu.detail}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
