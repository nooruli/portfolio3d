import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative z-10 w-full py-12 bg-slate-950/80 backdrop-blur-lg border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 md:px-24 flex flex-col md:flex-row justify-between items-center gap-6">

                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-2">
                        NOOR UL ISLAM
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Building robust architectures & beautiful interfaces.
                    </p>
                </div>

                <div className="flex gap-6">
                    <a href="https://github.com/nooruli" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform duration-300">
                        <Github size={24} />
                    </a>
                    <a href="https://linkedin.com/in/nooruli" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors hover:scale-110 transform duration-300">
                        <Linkedin size={24} />
                    </a>
                    <a href="mailto:saytonoor@gmail.com" className="text-slate-400 hover:text-emerald-500 transition-colors hover:scale-110 transform duration-300">
                        <Mail size={24} />
                    </a>
                </div>

            </div>
        </footer>
    );
}
