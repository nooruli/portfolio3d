import React, { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Download, Eye } from 'lucide-react';

import { CursorCompanion } from './components/CursorCompanion';
import { ParticleBackground } from './components/ParticleBackground';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Tools from './components/Tools';
import Projects from './components/Projects';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

/* ─── Bridge: Connect Lenis → ScrollTrigger ─── */
function ScrollTriggerBridge() {
  useLenis(({ scroll }) => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Refresh ScrollTrigger after everything has mounted
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timeout);
  }, []);

  return null;
}

/* ─── Typewriter Hook ─── */
function useTypewriter(words, speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setText(current.substring(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, pause]);

  return text;
}

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const triggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          let start = 0;
          const end = parseFloat(target);
          const increment = end / (duration * 60);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setValue(end);
              clearInterval(timer);
            } else {
              setValue(Math.floor(start * 10) / 10);
            }
          }, 1000 / 60);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-black text-white">
      {Number.isInteger(target) ? Math.floor(value) : value.toFixed(1)}{suffix}
    </span>
  );
}

/* ─── Main App ─── */
function App() {
  const typedText = useTypewriter(
    [
      'Banking API Expert', 'Healthcare Lead', 'EDI Expert',
      'Synthetic Data Expert', 'AWS Expert', 'Cloud Engineer',
      'Microservice Developer', 'Database Expert',
      'Application Integration Expert', 'CI/CD Professional'
    ],
    70,
    1800
  );

  /* Scroll Progress */
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const bar = document.getElementById('scroll-progress');
      if (bar) bar.style.width = progress + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  /* Hero entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 })
        .from('.hero-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from('.hero-typewriter', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from('.hero-desc', { y: 15, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from('.hero-buttons', { y: 15, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from('.hero-stats', { y: 15, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .from('.hero-code', { x: 40, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
        .from('.scroll-indicator', { opacity: 0, duration: 0.8 }, '-=0.3');
    });
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 7, suffix: '+', label: 'Years Exp.' },
    { value: 400, suffix: '+', label: 'APIs Built' },
    { value: 99.9, suffix: '%', label: 'Uptime SLA' },
  ];

  const handleDownloadCV = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/resume/resume.pdf', { method: 'HEAD' });
      if (response.ok) {
        const link = document.createElement('a');
        link.href = '/resume/resume.pdf';
        link.download = 'Noor_CV_Full_Stack.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("Resume folder is empty, please contact directly");
      }
    } catch (err) {
      alert("Resume folder is empty, please contact directly");
    }
  };

  return (
    <ReactLenis root options={{ smoothTouch: true, lerp: 0.07 }}>
      <ScrollTriggerBridge />
      <div id="scroll-progress" style={{ width: '0%' }}></div>

      <main className="relative w-full min-h-screen font-sans selection:bg-purple-500/30 selection:text-white bg-[#0a0118]">
        <div className="webgl-container">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
            <ambientLight intensity={0.15} />
            <ParticleBackground count={800} />
            <CursorCompanion />
            <Preload all />
          </Canvas>
        </div>

        <div className="relative z-10 w-full overflow-x-hidden">

          {/* ═══ HERO ═══ */}
          <section className="min-h-[100svh] flex flex-col lg:flex-row items-center justify-center px-4 md:px-16 lg:px-24 gap-8 lg:gap-16 relative w-full">
            <div className="flex-1 max-w-2xl flex flex-col items-center lg:items-start text-center lg:text-left pt-20 lg:pt-0">

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="hero-badge relative group flex items-center gap-2 cursor-pointer mb-8 mt-4 xl:mt-0"
              >
                {/* Tight fire-flare smoke halos — close to pill edges only */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500 opacity-30 smoky-bg mix-blend-screen blur-sm pointer-events-none"></div>
                <div className="absolute -inset-2 rounded-full bg-gradient-to-l from-fuchsia-500 to-purple-700 opacity-20 smoky-bg-delayed mix-blend-screen blur-md pointer-events-none"></div>

                {/* Neon pill */}
                <div className="relative px-5 py-2.5 rounded-full border border-purple-400/60 bg-purple-950/60 backdrop-blur-md overflow-visible flex items-center gap-2.5 shadow-[0_0_12px_rgba(168,85,247,0.35),inset_0_0_8px_rgba(168,85,247,0.1)]">

                  {/* Pulsing green LED dot */}
                  <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_10px_#34d399,0_0_18px_#34d399]"></span>
                  </span>

                  {/* Sparkle dots */}
                  <span className="explore-sparkle-1 absolute -top-0.5 left-10 w-1 h-1 rounded-full bg-violet-300 pointer-events-none"></span>
                  <span className="explore-sparkle-2 absolute -bottom-0.5 right-10 w-1 h-1 rounded-full bg-purple-200 pointer-events-none"></span>
                  <span className="explore-sparkle-3 absolute -top-0.5 right-14 w-1 h-1 rounded-full bg-fuchsia-300 pointer-events-none"></span>

                  {/* Fully visible text */}
                  <span className="font-bold font-mono text-xs sm:text-sm tracking-widest uppercase text-white drop-shadow-[0_0_6px_rgba(168,85,247,0.9)]">Available for Hire</span>
                </div>
              </button>

              <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tighter text-white leading-[0.95]">
                <span className="glitch-text text-white relative inline-block before:bg-transparent after:bg-transparent" data-text="NOOR UL">NOOR UL</span>
                <br />
                <span className="text-gradient-purple">ISLAM</span>
              </h1>

              <div className="hero-roles mb-6 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#4ade80] drop-shadow-[0_0_15px_rgba(74,222,128,0.6)] mb-2">
                  Full Stack Developer
                </h2>
                <div className="hero-typewriter text-xl sm:text-2xl md:text-3xl font-bold text-purple-300 h-[40px] flex items-center justify-center lg:justify-start w-full">
                  [{typedText}]<span className="typewriter-cursor"></span>
                </div>
              </div>

              <p className="hero-desc text-base sm:text-lg text-slate-300 max-w-xl mb-8 leading-relaxed px-2 lg:px-0">
                Crafting robust digital experiences with clean code and pixel-perfect precision. Specializing in Fortune 500 solutions across Banking, Medical, AI &amp; Telecom sectors.
              </p>

              <div className="hero-buttons flex flex-wrap gap-4 justify-center lg:justify-start mb-10 w-full">
                <a href="#projects" className="magnetic-btn bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 transition-all">
                  <span className="flex items-center gap-2"><Eye size={18} /> View My Work</span>
                </a>
                <a href="#" onClick={handleDownloadCV} className="magnetic-btn border border-purple-500/40 text-purple-300 hover:text-white hover:border-purple-400 rounded-xl backdrop-blur-sm">
                  <span className="flex items-center gap-2"><Download size={18} /> Download CV</span>
                </a>
              </div>

              <div className="hero-stats flex gap-5 sm:gap-8 flex-wrap justify-center lg:justify-start">
                {stats.map((s, i) => (
                  <div key={i} className="flex flex-col items-center lg:items-start">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                    <span className="text-xs sm:text-sm text-slate-400 mt-1 tracking-wide">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Code Window */}
            <div className="hero-code flex-1 max-w-lg w-full hidden md:block">
              <div className="code-window">
                <div className="code-window-bar">
                  <div className="code-dot bg-red-500"></div>
                  <div className="code-dot bg-yellow-500"></div>
                  <div className="code-dot bg-green-500"></div>
                  <span className="text-xs text-slate-500 ml-3 font-mono">portfolio.config.js</span>
                </div>
                <pre className="p-5 text-sm font-mono leading-relaxed overflow-hidden">
                  <code>
                    <span className="text-purple-400">const</span> <span className="text-blue-300">developer</span> = {'{'}{'\n'}
                    {'  '}<span className="text-emerald-400">name</span>: <span className="text-amber-300">"Noor Ul Islam"</span>,{'\n'}
                    {'  '}<span className="text-emerald-400">role</span>: <span className="text-amber-300">"Sr. Full Stack Dev"</span>,{'\n'}
                    {'  '}<span className="text-emerald-400">experience</span>: <span className="text-amber-300">"7+ years"</span>,{'\n'}
                    {'  '}<span className="text-emerald-400">stack</span>: [<span className="text-amber-300">"Java"</span>, <span className="text-amber-300">"React"</span>, <span className="text-amber-300">"Microservies"</span>,{'\n'}
                    {'    '}<span className="text-amber-300">"AWS"</span>, <span className="text-amber-300">"Spring Boot"</span>, <span className="text-amber-300">"Grails"</span>, <span className="text-amber-300">"Groovy"</span>],{'\n'}
                    {'  '}<span className="text-emerald-400">domains</span>: [<span className="text-amber-300">"Banking"</span>,{'\n'}
                    {'    '}<span className="text-amber-300">"Healthcare"</span>, <span className="text-amber-300">"Synthetic Data Generation"</span>,{'\n'}
                    {'    '}<span className="text-amber-300">"Telecom"</span>, <span className="text-amber-300">"AI"</span>],{'\n'}
                    {'  '}<span className="text-emerald-400">status</span>: <span className="text-amber-300">"Available 🚀"</span>{'\n'}
                    {'}'};<span className="terminal-cursor"></span>
                  </code>
                </pre>
              </div>
            </div>

            <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="flex flex-col items-center gap-2 text-slate-500">
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <ArrowDown size={16} className="text-purple-400" />
              </div>
            </div>
          </section>

          <About />
          <Skills />
          <Experience />
          <Tools />
          <Projects />
          <Contact />
        </div>
      </main>
    </ReactLenis>
  );
}

export default App;
