const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'MOCK_KEY');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const mockData = {
  summary: "Highly skilled software engineer with a strong foundation in full-stack development. (MOCK DATA - AI Services Unavailable)",
  skills: ["JavaScript", "React", "Node.js", "MongoDB", "Tailwind CSS"],
  experience: [{
    role: "Senior Developer",
    company: "Tech Solutions",
    duration: "2021 - Present",
    bulletPoints: [
      "Optimized application performance by 40% using modern techniques.",
      "Led a team of 5 developers to deliver high-quality software."
    ]
  }],
  projects: [{
    name: "ResumeAI Pro",
    description: ["An AI-powered resume optimization platform."],
    link: "https://github.com/example/resume-ai"
  }],
  education: [{
    degree: "Bachelor of Science in Computer Science",
    institution: "State University",
    year: "2020"
  }]
};

const optimizeResume = async (resumeText, jobDescription) => {
  const prompt = `
    You are an expert ATS (Applicant Tracking System) resume writer. 
    Your goal is to optimize the provided resume for the given job description.
    
    Guidelines:
    - Use strong action verbs (e.g., "Led", "Developed", "Optimized").
    - Include quantifiable metrics and achievements (e.g., "Increased sales by 20%").
    - Align keywords with the job description naturally.
    - Improve grammar and formatting.
    - Output ONLY a structured JSON with the following sections:
      - summary (string)
      - skills (array of strings)
      - experience (array of objects with role, company, duration, and bulletPoints)
      - projects (array of objects with name, description, and link)
      - education (array of objects with degree, institution, and year)

    Job Description:
    ${jobDescription}

    Resume Text:
    ${resumeText}
  `;

  // Try Gemini First (Free/Generous)
  if (process.env.GEMINI_API_KEY) {
    try {
      console.log('Using Google Gemini for optimization...');
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      // Handle the case where Gemini returns markdown-wrapped JSON
      if (text.startsWith('```json')) {
        text = text.replace(/```json\n?/, '').replace(/```\n?$/, '');
      }
      
      return JSON.parse(text);
    } catch (error) {
      console.error('Gemini Optimization Error:', error);
      // Fallback to OpenAI...
    }
  }

  // Try OpenAI
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-proj-...') {
    try {
      console.log('Using OpenAI for optimization...');
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "system", content: "You are a professional resume optimizer." }, { role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      if (error.code === 'insufficient_quota' || error.status === 429) {
        console.warn('OpenAI Quota reached. Using Mock Data for demonstration.');
        return mockData;
      }
      console.error('OpenAI Optimization Error:', error);
    }
  }

  // Final Fallback
  console.warn('No active AI service (OpenAI/Gemini). Using Mock Data.');
  return mockData;
};

module.exports = { optimizeResume };
