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
    if (!GEMINI_API_KEY) return null;

    const prompt = `
    Analyze the following resume text for ATS (Applicant Tracking System) compatibility.
    Calculate a score (0-100), identify detected skills, missing critical skills for a general tech role, 
    and provide 3-5 specific improvement suggestions.
    
    Resume Text:
    ${resumeText}
    
    Return ONLY a valid JSON object with the following structure:
    {
      "score": number,
      "detectedSkills": string[],
      "missingSkills": string[],
      "suggestions": string[]
    }
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
    if (!GEMINI_API_KEY) return "Professional summary focused on technologies and value delivery.";

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
        return "Professional summary focused on technologies and value delivery.";
    }
};

export const analyzeSkillGap = async (skills: string[], targetRole: string): Promise<string[]> => {
    if (!GEMINI_API_KEY) return ['Docker', 'AWS', 'Kubernetes'];

    const prompt = `
      Compare the following list of skills with industry standard requirements for a ${targetRole} role.
      Identify the top 5 missing skills that would make this candidate more competitive.
      
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
