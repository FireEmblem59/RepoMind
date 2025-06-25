function generatePrompt(repos) {
  const langs = [...new Set(repos.map((r) => r.language).filter(Boolean))];
  const descs = repos
    .map((r) => `- ${r.name}: ${r.description || "No description"}`)
    .join("\n");

  return `
You are an expert software mentor and project ideator.

A developer has worked on the following GitHub repositories:

Languages used: ${langs.join(", ")}

Projects:
${descs}

Based on their past work, suggest 5 unique and thoughtful project ideas tailored to their skill set. Each idea should:
- Be clearly described in 2–3 sentences
- Include the core technologies or tools involved
- Be progressively challenging or introduce new concepts
- Have practical or portfolio-building value

Optional: If any of their repos seem outdated or too basic, recommend more ambitious or modern alternatives.

Format your output like:
1. **Project Title**  
   Description...  
   _Technologies: XYZ_
`;
}
