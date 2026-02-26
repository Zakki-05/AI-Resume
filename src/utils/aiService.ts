const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export const improveBulletPoint = async (text: string): Promise<string> => {
    if (!GEMINI_API_KEY) return text;

    const prompt = `
    You are a professional resume writer. Rewrite the following resume bullet point to be more impactful, 
    achievement-oriented, and professional. Use action verbs and include metrics if possible (even if you have to suggest where they should go).
    
    Bullet point: "${text}"
    
    Return ONLY the improved bullet point string. No explanations or conversational filler.
  `;

    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        return data.candidates[0].content.parts[0].text.trim();
    } catch (error) {
        console.error('AI Improvement Error:', error);
        return text;
    }
};

export const analyzeATS = async (resumeText: string): Promise<any> => {
    if (!GEMINI_API_KEY) return {
        score: 85,
        skills: ['Project Management', 'Team Leadership', 'Strategic Planning'],
        missingSkills: ['Advanced Analytics', 'Budgeting'],
        suggestions: ['Quantify your achievements with more metrics.', 'Add a professional certification section.'],
        radarData: [
            { subject: 'Leadership', A: 90, fullMark: 100 },
            { subject: 'Communication', A: 85, fullMark: 100 },
            { subject: 'Technical', A: 70, fullMark: 100 },
            { subject: 'Strategy', A: 95, fullMark: 100 },
            { subject: 'Problem Solving', A: 80, fullMark: 100 },
            { subject: 'Teamwork', A: 85, fullMark: 100 },
        ]
    };

    const prompt = `
      Analyze this resume text and provide a professional ATS feedback report.
      
      Return ONLY a JSON object with the following structure:
      {
        "score": number (0-100),
        "skills": ["skill1", "skill2"],
        "missingSkills": ["missing1", "missing2"],
        "suggestions": ["suggestion1", "suggestion2"],
        "radarData": [
            { "subject": "Leadership", "A": number, "fullMark": 100 },
            { "subject": "Communication", "A": number, "fullMark": 100 },
            { "subject": "Technical", "A": number, "fullMark": 100 },
            { "subject": "Strategy", "A": number, "fullMark": 100 },
            { "subject": "Problem Solving", "A": number, "fullMark": 100 },
            { "subject": "Teamwork", "A": number, "fullMark": 100 }
        ]
      }
      
      Resume text: ${resumeText}
    `;

    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        const resultText = data.candidates[0].content.parts[0].text.trim();
        // Simple regex to extract JSON if LLM adds markdown backticks
        const jsonMatch = resultText.match(/\{[\s\S]*\}/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (error) {
        console.error('ATS Analysis Error:', error);
        return null;
    }
};

export const generateSummary = async (jobTitle: string, skills: string[]): Promise<string> => {
    if (!GEMINI_API_KEY) return "Professional summary focused on key achievements and value delivery.";

    const prompt = `
    You are a professional career coach. Write a compelling 2nd-person professional summary for a resume 
    based on the following Job Title and Skills.
    
    Job Title: ${jobTitle}
    Skills: ${skills.join(', ')}
    
    The summary should be around 3-4 sentences long, impactful, and SEO-friendly for ATS.
    Return ONLY the summary text.
  `;

    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        return data.candidates[0].content.parts[0].text.trim();
    } catch (error) {
        console.error('Summary Generation Error:', error);
        return "Professional summary focused on key achievements and value delivery.";
    }
};

export const analyzeSkillGap = async (skills: string[], targetRole: string): Promise<string[]> => {
    if (!GEMINI_API_KEY) return ['Advanced Communication', 'Project Management', 'Data Analysis'];

    const prompt = `
      Compare the following list of skills with current industry standard requirements for a "${targetRole}" role.
      Identify the top 5 missing skills or certifications that would make a candidate in this field more competitive.
      
      Candidate Skills: ${skills.join(', ')}
      
      Return ONLY a JSON array of strings. Example: ["Skill1", "Skill2"]
    `;

    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        const resultText = data.candidates[0].content.parts[0].text.trim();
        const jsonMatch = resultText.match(/\[.*\]/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch (error) {
        console.error('Skill Gap Error:', error);
        return [];
    }
};
export const generateLearningRoadmap = async (jobTitle: string, missingSkills: string[]): Promise<any[]> => {
    if (!GEMINI_API_KEY) return [
        { title: 'Strategic Communication', status: 'Highly Recommended' },
        { title: 'Project Coordination', status: 'Professional Growth' },
        { title: 'Advanced Industry Tools', status: 'Essential Skill' },
    ];

    const prompt = `
      Based on the job title "${jobTitle}" and the missing skills ${missingSkills.join(', ')}, 
      generate 3 highly relevant learning roadmap items.
      
      Return ONLY a JSON array of objects with this structure matches lucide-react icons loosely:
      [
        { "title": "Course/Skill Name", "status": "Recommended/Essential", "modules": 5, "hours": 10 }
      ]
    `;

    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        const resultText = data.candidates[0].content.parts[0].text.trim();
        const jsonMatch = resultText.match(/\[.*\]/s);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch (error) {
        console.error('Roadmap Error:', error);
        return [];
    }
};
