const generateLatex = (resume) => {
  const { summary, skills, experience, projects, education } = resume;

  let latex = `
\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}
\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape ResumeAI Optimized} \\\\ \\vspace{1pt}
    \\small 123-456-7890 $|$ \\href{mailto:email@example.com}{\\underline{email@example.com}} $|$ 
    \\href{https://linkedin.com/in/...}{\\underline{linkedin.com/in/...}} $|$
    \\href{https://github.com/...}{\\underline{github.com/...}}
\\end{center}

%-----------SUMMARY-----------
\\section{Summary}
  \\small{${summary}}

%-----------SKILLS-----------
\\section{Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Technologies}{: ${skills.join(', ')}}
    }}
 \\end{itemize}

%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
    ${experience.map(exp => `
    \\resumeSubheading{${exp.role}}{${exp.duration}}{${exp.company}}{Location}
      \\resumeItemListStart
        ${exp.bulletPoints.map(point => `\\resumeItem{${point}}`).join('\n        ')}
      \\resumeItemListEnd
    `).join('\n')}
  \\resumeSubHeadingListEnd

%-----------PROJECTS-----------
\\section{Projects}
    \\resumeSubHeadingListStart
      ${projects.map(proj => `
      \\resumeProjectHeading{\\textbf{${proj.name}} $|$ \\emph{Stack}}{${proj.link}}
          \\resumeItemListStart
            \\resumeItem{${proj.description}}
          \\resumeItemListEnd
      `).join('\n')}
    \\resumeSubHeadingListEnd

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    ${education.map(edu => `
    \\resumeSubheading{${edu.institution}}{${edu.year}}{${edu.degree}}{Location}
    `).join('\n')}
  \\resumeSubHeadingListEnd

\\end{document}
  `;

  return latex;
};

module.exports = { generateLatex };
