const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const Version = require('../models/Version');
const { optimizeResume } = require('../utils/aiEngine');
const { calculateAtsScore } = require('../utils/atsScorer');

// Optimize Resume
router.post('/optimize', async (req, res) => {
  try {
    const { userId, resumeText, jobDescription } = req.body;
    
    // 1. Optimize using AI
    const optimizedContent = await optimizeResume(resumeText, jobDescription);
    
    // 2. Calculate ATS Score
    const scoreData = calculateAtsScore(optimizedContent, jobDescription);
    
    // 3. Save to database
    const newResume = new Resume({
      userId,
      originalContent: resumeText,
      jobDescription,
      optimizedContent,
      atsScore: scoreData.score
    });
    
    await newResume.save();

    // 4. Save as version 1
    const newVersion = new Version({
      resumeId: newResume._id,
      content: optimizedContent,
      atsScore: scoreData.score,
      jobDescription
    });
    await newVersion.save();

    res.status(201).json({
      resumeId: newResume._id,
      optimizedContent,
      scoreData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Resumes for User
router.get('/resumes/:userId', async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Specific Resume
router.get('/resume/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    const versions = await Version.find({ resumeId: req.params.id }).sort({ timestamp: -1 });
    res.json({ resume, versions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const { generateLatex } = require('../utils/latexGenerator');

// Optimize Resume (existing code...)
// ...

// Get LaTeX Source
router.get('/latex/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    
    const latexSource = generateLatex(resume.optimizedContent);
    res.type('text/plain').send(latexSource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
