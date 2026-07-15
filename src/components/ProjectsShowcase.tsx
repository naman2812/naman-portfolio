"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "NeuroFlow",
    description: "An advanced deep learning framework and scalable data pipeline architecture designed to optimize neural network training, stream processing, and real-time AI model deployment.",
    tech: ["Python", "Deep Learning", "Neural Networks", "Data Engineering"],
    github: "https://github.com/naman2812/NeuroFlow-HiDevs",
    image: "/images/projects/neuroflow.jpg",
    featured: true
  },
  {
    title: "Complete Recommendation System",
    description: "A fully-featured recommendation engine complete with a robust API for seamless integration and real-time personalized suggestions.",
    tech: ["Python", "APIs", "Data Science"],
    github: "https://github.com/naman2812/Complete-Recommendation-System-with-API_HiDevs",
    image: "/images/projects/recommendation_v2.jpg",
    featured: false
  },
  {
    title: "Multi-Source Feedback Intelligence",
    description: "A comprehensive feedback system consolidating multi-source inputs with sentiment analysis and automated reporting via interactive Streamlit dashboards.",
    tech: ["Python", "Streamlit", "NLP", "Analytics"],
    github: "https://github.com/naman2812/Multi-Source-Feedback-Intelligence-System_HiDevs",
    image: "/images/projects/feedback_v2.jpg",
    featured: false
  }
];

export default function ProjectsShowcase() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-4" id="projects-showcase">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Featured Projects</h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
          A selection of my recent AI and machine learning engineering work, focusing on automation and intelligence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative flex flex-col justify-between bg-neutral-900/40 rounded-3xl border border-white/5 hover:border-primary/30 hover:bg-neutral-900/60 transition-all duration-500 overflow-hidden h-full"
          >
            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 flex flex-col flex-grow">
              {project.featured && (
                <div className="text-xs font-mono text-primary mb-3 uppercase tracking-widest">// Spotlight</div>
              )}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 bg-neutral-950/50 border border-white/5 rounded-full text-xs font-mono text-neutral-300">
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                  Code
                </a>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:text-blue-400 transition-colors ml-auto"
                >
                  View <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
