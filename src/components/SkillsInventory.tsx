"use client";

import { motion } from "framer-motion";
import { 
  SiReact, SiNextdotjs, SiHtml5, SiTailwindcss, SiRedux,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiMysql, SiFirebase, SiSupabase,
  SiPython, SiOpenai, SiPandas, 
  SiJavascript, SiTypescript, SiCplusplus,
  SiGit, SiGithub, SiDocker, SiLinux, SiPostman
} from "react-icons/si";
import { FaAws, FaCss3Alt } from "react-icons/fa";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <SiReact className="text-blue-400" />,
    skills: [
      { name: "React.js", icon: <SiReact className="text-[#61DAFB]" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
      { name: "HTML5", icon: <SiHtml5 className="text-[#E34F26]" /> },
      { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
      { name: "Redux", icon: <SiRedux className="text-[#764ABC]" /> }
    ]
  },
  {
    title: "Backend Development",
    icon: <SiNodedotjs className="text-green-500" />,
    skills: [
      { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
      { name: "Express.js", icon: <SiExpress className="text-white" /> },
      { name: "REST APIs", icon: <div className="w-4 h-4 rounded-full border-2 border-green-500" /> },
      { name: "GraphQL", icon: <div className="w-4 h-4 rounded-full border-2 border-pink-500" /> },
      { name: "WebSockets", icon: <div className="w-4 h-4 rounded-full border-2 border-blue-400" /> }
    ]
  },
  {
    title: "Generative AI & Data",
    icon: <SiOpenai className="text-white" />,
    skills: [
      { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
      { name: "OpenAI API", icon: <SiOpenai className="text-white" /> },
      { name: "LangChain", icon: <div className="w-4 h-4 rounded-full border-2 border-green-400" /> },
      { name: "Hugging Face", icon: <div className="w-4 h-4 rounded-full border-2 border-yellow-400" /> },
      { name: "Pandas", icon: <SiPandas className="text-[#150458]" /> }
    ]
  },
  {
    title: "Storage & Databases",
    icon: <SiPostgresql className="text-blue-500" />,
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
      { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
      { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
      { name: "Supabase", icon: <SiSupabase className="text-[#3ECF8E]" /> }
    ]
  },
  {
    title: "Programming Languages",
    icon: <SiTypescript className="text-blue-600" />,
    skills: [
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "C++", icon: <SiCplusplus className="text-[#00599C]" /> },
      { name: "Python", icon: <SiPython className="text-[#3776AB]" /> }
    ]
  },
  {
    title: "Tools & Practices",
    icon: <SiGit className="text-orange-500" />,
    skills: [
      { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
      { name: "GitHub", icon: <SiGithub className="text-white" /> },
      { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
      { name: "AWS", icon: <FaAws className="text-[#FF9900]" /> },
      { name: "Linux", icon: <SiLinux className="text-[#FCC624]" /> },
      { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> }
    ]
  }
];

export default function SkillsInventory() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-4" id="skills">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Skills & Technologies</h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
          A comprehensive overview of my technical skills and the technologies I work with to create exceptional digital experiences.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-6 md:p-8 rounded-3xl bg-neutral-900/40 border border-white/5 hover:border-white/10 transition-colors backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-neutral-800/50 rounded-xl border border-white/5">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{category.title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <div 
                  key={skill.name} 
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-950/50 hover:bg-neutral-800 transition-colors border border-white/5 rounded-full text-sm font-mono text-neutral-300"
                >
                  {skill.icon}
                  {skill.name}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
