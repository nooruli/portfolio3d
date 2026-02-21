import React from 'react';
import { Mail, Linkedin, Github, FileText, Phone, Heart } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Contact() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

    const contacts = [
        { icon: <Mail size={28} />, label: 'Email', value: 'saytonoor@gmail.com', href: 'mailto:saytonoor@gmail.com', color: 'text-purple-400' },
        { icon: <Phone size={28} />, label: 'Phone', value: '+91 9634361579', href: 'tel:+919634361579', color: 'text-emerald-400' },
        { icon: <Linkedin size={28} />, label: 'LinkedIn', value: 'linkedin.com/in/nooruli', href: 'https://linkedin.com/in/nooruli', color: 'text-blue-400' },
        { icon: <Github size={28} />, label: 'GitHub', value: 'github.com/nooruli', href: 'https://github.com/nooruli', color: 'text-slate-300' },
        { icon: <FileText size={28} />, label: 'Resume', value: 'Download PDF', href: '/resume/resume.pdf', color: 'text-amber-400' },
    ];

    return (
        <section id="contact" ref={ref} className={`py-24 md:py-32 px-4 md:px-16 lg:px-24 mx-auto max-w-7xl relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>

            <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
                    <span className="text-gradient-purple">Get In Touch</span>
                </h2>
                <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
                    Interested in working together? Let's connect and build something amazing.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-5xl mx-auto">
                {contacts.map((c, i) => (
                    <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                        className="glass-card p-6 rounded-2xl flex flex-col items-center text-center group cursor-pointer no-underline transition-all duration-700 hover:-translate-y-2" style={{ transitionDelay: `${i * 100}ms` }}>
                        <div className={`mb-4 w-14 h-14 rounded-xl bg-[#1a0a2e] border border-purple-500/20 flex items-center justify-center group-hover:border-purple-500/50 group-hover:scale-110 transition-all ${c.color}`}>
                            {c.icon}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">{c.label}</h3>
                        <p className="text-xs text-slate-400 break-all">{c.value}</p>
                    </a>
                ))}
            </div>

            <div className="mt-20 pt-8 border-t border-purple-500/10 text-center">
                <h3 className="text-2xl font-bold text-gradient-purple mb-2">NOOR UL ISLAM</h3>
                <p className="text-sm text-slate-500 mb-4">
                    Building robust architectures &amp; beautiful interfaces.
                </p>
                <p className="text-xs text-slate-600 flex justify-center items-center gap-1">
                    &copy; {new Date().getFullYear()} Noor Ul Islam. Crafted with my developer <Heart size={14} className="text-red-500 fill-red-500 inline" />
                </p>
            </div>
        </section>
    );
}
