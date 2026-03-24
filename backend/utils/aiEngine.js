const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // or "gpt-3.5-turbo"
      messages: [{ role: "system", content: "You are a professional resume optimizer." }, { role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('AI Optimization Error:', error);
    throw new Error('Failed to optimize resume');
  }
};

module.exports = { optimizeResume };
