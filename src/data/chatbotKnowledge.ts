export interface IntentMatch {
  keywords: RegExp[];
  response: string;
}

export const chatbotKnowledge: IntentMatch[] = [
  {
    keywords: [/who is naman/i, /about naman/i, /tell me about naman/i],
    response: "Naman Lad is a Full Stack Developer specializing in Generative AI, React, and Node.js. He is passionate about turning complex ideas into reliable, scalable systems. He is currently working as a GenAI Intern at HiDevs."
  },
  {
    keywords: [/stack/i, /technolog/i, /tools/i, /languages/i, /skills/i],
    response: "Naman specializes in Full Stack and Generative AI. His core stack includes React.js, Next.js, Node.js, Python, PostgreSQL, and AI tools like OpenAI API and LangChain. He's also highly proficient with TailwindCSS, TypeScript, AWS, and Docker."
  },
  {
    keywords: [/experience/i, /work/i, /intern/i, /job/i, /hidevs/i],
    response: "Naman is currently working as a Full Stack Generative AI Intern at HiDevs (Remote from San Francisco, CA), where he applies advanced AI models to solve real-world system challenges."
  },
  {
    keywords: [/education/i, /college/i, /university/i, /school/i, /degree/i],
    response: "Naman is pursuing a B.Tech in Computer Science & Engineering (IOT) from M. L. V. Textile And Engineering College in Bhilwara, Rajasthan. Prior to that, he completed his Higher Secondary in Science (Physics, Chemistry, Maths, CS) at St. Anselm's Sr. Sec. School."
  },
  {
    keywords: [/projects/i, /portfolio/i, /build/i, /made/i],
    response: "One of Naman's featured projects is a robust 'System Design Tool'—an AI-powered architecture tool built with Next.js and Go. You can find more details in the Projects section above!"
  },
  {
    keywords: [/contact/i, /email/i, /hire/i, /reach/i, /linkedin/i, /github/i],
    response: "You can reach Naman directly at namanlad28@gmail.com! You can also connect with him on LinkedIn or check out his code on GitHub using the links in the Network tile."
  },
  {
    keywords: [/location/i, /where/i, /live/i, /based/i, /city/i],
    response: "Naman is based in Bhilwara, Rajasthan, India, but he is highly experienced with remote collaboration, currently working remotely for a San Francisco-based company."
  },
  {
    keywords: [/hello/i, /hi/i, /hey/i, /greetings/i],
    response: "Hello! I'm Naman's AI assistant. You can ask me about his tech stack, work experience, education, or how to contact him. What would you like to know?"
  },
  {
    keywords: [/who are you/i, /are you real/i, /are you ai/i, /are you naman/i],
    response: "I am a custom-built AI interface designed by Naman to answer questions about his professional background! I simulate an LLM to give you quick, accurate answers without any API latency."
  }
];

export function getChatbotResponse(input: string): string {
  const normalizedInput = input.toLowerCase();
  
  // Find the first matching intent
  for (const intent of chatbotKnowledge) {
    if (intent.keywords.some(regex => regex.test(normalizedInput))) {
      return intent.response;
    }
  }

  // Fallback response
  return "That's a great question! I'm currently focused on answering questions about Naman's tech stack, experience, education, and projects. Feel free to ask about any of those!";
}
