const calculateAtsScore = (optimizedResume, jobDescription) => {
  const jdKeywords = jobDescription.toLowerCase().match(/\b(\w+)\b/g) || [];
  const resumeText = JSON.stringify(optimizedResume).toLowerCase();
  
  const uniqueJdKeywords = [...new Set(jdKeywords)].filter(kw => kw.length > 3);
  let matchedCount = 0;
  const missingKeywords = [];

  uniqueJdKeywords.forEach(kw => {
    if (resumeText.includes(kw)) {
      matchedCount++;
    } else {
      missingKeywords.push(kw);
    }
  });

  const matchPercentage = Math.round((matchedCount / uniqueJdKeywords.length) * 100);
  
  return {
    score: matchPercentage,
    missingKeywords: missingKeywords.slice(0, 10), // Return top 10 missing
    suggestions: [
      "Add more quantifiable metrics to your experience bullets.",
      "Ensure all relevant technical skills from the JD are mentioned.",
      "Use more industry-specific action verbs."
    ]
  };
};

module.exports = { calculateAtsScore };
