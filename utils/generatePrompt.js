function generatePrompt(repos) {
  const langs = [...new Set(repos.map((r) => r.language).filter(Boolean))];
  const descs = repos
    .map((r, i) => `${i + 1}. ${r.name}: ${r.description || "No description"}`)
    .join("\n");

  return `
You are an expert software mentor and project ideator.

A developer has the following GitHub repositories and programming languages:

Languages: ${langs.join(", ")}

Repositories:
${descs}

Based on this information, suggest 5 unique and practical project ideas tailored to the developer’s skills. Each idea should include:
- A clear project title
- A short description (2-3 sentences)
- The main technologies or tools involved

Format your suggestions as a numbered list.
`;
}
