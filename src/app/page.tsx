"use client";

import CanvasBackground from "@/components/CanvasBackground";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import MagneticButton from "@/components/MagneticButton";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import Navbar from "@/components/Navbar";
import SkillsInventory from "@/components/SkillsInventory";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import IconRevealText from "@/components/IconRevealText";
import AIChatbot from "@/components/AIChatbot";
import { Terminal, Code2, MapPin, Mail, ExternalLink, Clock, Copy, Check } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' LOCAL');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("namanlad28@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main id="home" className="min-h-screen bg-black text-neutral-200 p-4 pt-24 md:p-8 md:pt-32 font-sans overflow-hidden relative">
      <CustomCursor />
      <Navbar />
      <NoiseOverlay />
      <CanvasBackground />

      {/* Faint blueprint grid background */}
      <div className="fixed inset-0 pointer-events-none z-[-2] opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Full Screen Hero Section */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 -mt-24">
        <div className="flex flex-col items-center gap-6">
          <p className="text-neutral-400 text-xl tracking-widest uppercase font-mono animate-fade-in">Hello, I'm</p>
          <IconRevealText text="NAMAN LAD" />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="text-neutral-500 text-sm md:text-lg tracking-[0.2em] uppercase mt-4"
          >
            Full Stack Developer
          </motion.p>
          
          <motion.a
            href="/resume.pdf"
            download="Naman_Lad_Resume.pdf"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="mt-6 px-8 py-3 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-sm tracking-widest hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] flex items-center gap-2 group cursor-pointer z-50"
          >
            <ExternalLink size={16} className="group-hover:-translate-y-1 transition-transform" />
            Download CV
          </motion.a>
        </div>
      </section>

      <div className="max-w-6xl mx-auto z-10 relative pt-4 md:pt-12">
        <header className="mb-12 flex justify-between items-center text-neutral-500 font-mono text-xs md:text-sm tracking-widest px-4 md:px-0">
          <div className="flex items-center gap-2 text-primary">
            <Terminal size={16} />
            <span>~/SYSTEM/INIT</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Clock size={14} />
            {time}
          </div>
        </header>

        <BentoGrid>

          {/* Photo Card */}
          <div className="md:col-span-2 md:row-span-2">
            <BentoCard className="h-full p-0">
              <div className="w-full h-full relative group">
                <div className="absolute inset-0">
                  <img src="/profile.png" alt="Naman Lad" className="w-full h-full object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Location / Status Card */}
          <div data-cursor-color="text-green-500" className="md:col-span-1 md:row-span-1">
            <BentoCard className="h-full justify-center items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 mx-auto relative">
                <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping opacity-20" />
                <MapPin className="text-primary w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl mb-1">Bhilwara, RJ</h3>
              <p className="text-xs text-neutral-500 font-mono mt-1">25.3478° N, 74.6408° E</p>
            </BentoCard>
          </div>

          {/* Contact Card */}
          <div id="contact" className="md:col-span-1 md:row-span-1">
            <BentoCard className="h-full bg-gradient-to-b from-primary/5 to-transparent border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h2 className="text-xs font-mono text-primary mb-1 tracking-widest uppercase">// Network</h2>
                  <h3 className="font-bold text-2xl mb-4 tracking-tight">Let's Talk</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={copyEmail} className="flex items-center justify-between w-full p-3 bg-neutral-950 rounded-xl hover:bg-neutral-900 transition-colors border border-white/5 hover:border-primary/30 group">
                    <div className="flex items-center gap-2 text-sm font-mono text-neutral-300">
                      <Mail size={16} className="text-primary" />
                      namanlad28@gmail.com
                    </div>
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-neutral-500 group-hover:text-white transition-colors" />}
                  </button>
                  <div className="flex gap-3 h-full">
                    <MagneticButton className="flex-1 border border-white/5 hover:border-primary/30 hover:bg-neutral-900 transition-colors p-0 rounded-xl overflow-hidden min-h-[64px]">
                      <a href="https://github.com/naman2812" target="_blank" rel="noopener noreferrer" className="w-full h-full bg-neutral-950 flex flex-col items-center justify-center gap-2 p-3">
                        <FaGithub size={24} className="text-neutral-300 group-hover:text-white transition-colors" />
                      </a>
                    </MagneticButton>
                    <MagneticButton className="flex-1 border border-white/5 hover:border-primary/30 hover:bg-neutral-900 transition-colors p-0 rounded-xl overflow-hidden min-h-[64px]">
                      <a href="https://www.linkedin.com/in/naman-lad-44bb1a35a/" target="_blank" rel="noopener noreferrer" className="w-full h-full bg-neutral-950 flex flex-col items-center justify-center gap-2 p-3">
                        <FaLinkedin size={24} className="text-[#0077B5] group-hover:text-white transition-colors" />
                      </a>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </BentoCard>
          </div>



          {/* Project Card */}
          <div id="projects" data-cursor-label="View Project" className="md:col-span-2 md:row-span-1">
            <BentoCard className="h-full p-0">
              <div 
                className="w-full h-full relative group/project overflow-hidden rounded-3xl cursor-pointer" 
                onClick={() => window.open('https://github.com/naman2812/NeuroFlow-HiDevs', '_blank')}
              >
                <img src="/images/projects/neuroflow.jpg" alt="NeuroFlow Project" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover/project:opacity-60 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-primary font-mono text-sm mb-2 opacity-0 group-hover/project:opacity-100 transition-opacity translate-y-4 group-hover/project:translate-y-0 duration-500">// Featured Project</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover/project:-translate-y-2 transition-transform duration-500">NeuroFlow</h3>
                      <p className="text-neutral-300 text-sm md:text-base max-w-sm group-hover/project:-translate-y-2 transition-transform duration-500 delay-75">Advanced deep learning framework and AI data pipeline architecture.</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover/project:bg-primary group-hover/project:border-primary group-hover/project:scale-110 transition-all duration-500">
                      <ExternalLink className="text-white w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* About Card */}
          <div id="about" data-cursor-label="About" className="md:col-span-3 lg:col-span-4 md:row-span-1">
            <BentoCard className="h-full flex items-center justify-center p-8 md:p-12 text-center bg-gradient-to-br from-neutral-900/40 to-neutral-950/80">
              <h2 className="text-2xl md:text-4xl font-medium leading-relaxed tracking-tight text-neutral-300">
                <span className="text-white">Hello! I'm Naman Lad</span> — a Full Stack Developer specializing in <span className="text-primary">GenAI</span>, <span className="text-[#61DAFB]">React</span>, and <span className="text-[#339933]">Node.js</span>. I turn complex ideas into reliable, high-performance scalable systems.
              </h2>
            </BentoCard>
          </div>

          {/* Experience Card */}
          <div id="experience" data-cursor-label="Experience" className="md:col-span-3 lg:col-span-4 md:row-span-1">
            <BentoCard className="h-full bg-gradient-to-br from-neutral-900/40 to-neutral-950/80">
              <div className="flex flex-col justify-center h-full">
                <h2 className="text-xs font-mono text-primary mb-6 tracking-widest uppercase">// Experience</h2>
                <div className="flex flex-col gap-2 relative pl-4 border-l-2 border-primary/20">
                  <div className="absolute w-2 h-2 rounded-full bg-primary -left-[5px] top-2" />
                  <h3 className="font-bold text-xl text-white">Full Stack Generative AI Intern</h3>
                  <div className="text-neutral-400 font-mono text-sm">
                    <span className="text-primary">@</span> HiDevs
                  </div>
                  <div className="text-neutral-500 text-sm mt-1 flex items-center gap-2">
                    <MapPin size={14} /> San Francisco, CA (Remote)
                  </div>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Education Card */}
          <div id="education" data-cursor-label="Education" className="md:col-span-3 lg:col-span-4 md:row-span-1">
            <BentoCard className="h-full">
              <div className="flex flex-col justify-center h-full">
                <h2 className="text-xs font-mono text-primary mb-6 tracking-widest uppercase">// Education</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* B.Tech */}
                  <div className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
                    <h3 className="font-bold text-lg text-white mb-2 group-hover:text-primary transition-colors">B.Tech in Computer Science & Eng. (IOT)</h3>
                    <p className="text-sm text-neutral-400 font-mono mb-3">M. L. V. Textile And Engineering College</p>
                    <p className="text-xs text-neutral-500 flex items-center gap-1"><MapPin size={12} /> Bhilwara, Rajasthan</p>
                  </div>
                  {/* XII */}
                  <div className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
                    <h3 className="font-bold text-lg text-white mb-2 group-hover:text-primary transition-colors">Higher Secondary (XII) - Science</h3>
                    <p className="text-sm text-neutral-400 font-mono mb-2">St. Anselm's Sr. Sec. School</p>
                    <p className="text-xs text-neutral-500 mb-3">Physics, Chemistry, Maths, Computer Science</p>
                    <p className="text-xs text-neutral-500 flex items-center gap-1"><MapPin size={12} /> Bhilwara, Rajasthan</p>
                  </div>
                </div>
              </div>
            </BentoCard>
          </div>
        </BentoGrid>

        {/* Projects Showcase */}
        <ProjectsShowcase />

        <SkillsInventory />

        <footer className="mt-12 pb-12 text-center text-xs font-mono text-neutral-600 tracking-widest">
          [ PRESS ⌘ + K ] OR [ TERMINAL ]
        </footer>
      </div>

      <AIChatbot />
    </main>
  );
}
