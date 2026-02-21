import React from 'react';
import {
    Server, Globe, Cloud, Database, Shield, Box,
    Cpu, Terminal, Code, Zap, Search, Workflow
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Tools() {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

    const tools = [
        { title: 'Backend', items: 'Java, Spring Boot, Groovy, Node.js', icon: <Server size={22} />, color: 'text-purple-400' },
        { title: 'Frontend', items: 'React, Next.js, Tailwind, GSAP', icon: <Code size={22} />, color: 'text-blue-400' },
        { title: 'Cloud', items: 'AWS EKS, EC2, S3, SQS, Lambda', icon: <Cloud size={22} />, color: 'text-sky-400' },
        { title: 'Databases', items: 'MongoDB, PostgreSQL, Aurora, Redis', icon: <Database size={22} />, color: 'text-emerald-400' },
        { title: 'DevOps', items: 'Docker, Kubernetes, Helm, Terraform', icon: <Box size={22} />, color: 'text-orange-400' },
        { title: 'CI/CD', items: 'Jenkins, GitHub Actions, GitLab CI', icon: <Workflow size={22} />, color: 'text-pink-400' },
        { title: 'Workflows & AI', items: 'Camunda BPM, GitLab Actions, GitHub Actions, OpenAI API', icon: <Cpu size={22} />, color: 'text-violet-400' },
        { title: 'Messaging', items: 'Kafka, IBM MQ, RabbitMQ', icon: <Zap size={22} />, color: 'text-yellow-400' },
        { title: 'API Design', items: 'REST, GraphQL, gRPC, WebSockets', icon: <Globe size={22} />, color: 'text-teal-400' },
        { title: 'Security', items: 'OAuth2, JWT, Spring Security', icon: <Shield size={22} />, color: 'text-red-400' },
        { title: 'Observability', items: 'CloudWatch, NewRelic, Splunk', icon: <Search size={22} />, color: 'text-amber-400' },
        { title: 'Scripting', items: 'Bash, Python, Gradle, Maven', icon: <Terminal size={22} />, color: 'text-lime-400' },
    ];

    return (
        <section ref={ref} className={`py-24 md:py-32 px-4 md:px-16 lg:px-24 mx-auto max-w-7xl relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>

            <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
                    <span className="text-gradient-purple">Toolset &amp; Architecture</span>
                </h2>
                <p className="text-slate-400 text-base sm:text-lg">
                    Libraries, platforms, and methodologies I use daily.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {tools.map((tool, idx) => (
                    <div key={idx} className="glass-card p-5 rounded-2xl group cursor-default mix-blend-normal">
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-xl bg-[#1a0a2e] border border-purple-500/20 flex items-center justify-center group-hover:border-purple-500/50 transition-colors ${tool.color}`}>
                                {tool.icon}
                            </div>
                            <h3 className="text-base font-bold text-slate-100 group-hover:text-white transition-colors">{tool.title}</h3>
                        </div>
                        <p className="text-sm text-slate-400 font-mono leading-relaxed">{tool.items}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
