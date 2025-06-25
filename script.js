let latestMarkdown = "";

document.getElementById("useToken").addEventListener("change", (e) => {
  document.getElementById("token").style.display = e.target.checked
    ? "block"
    : "none";
});

document.querySelectorAll('input[name="mode"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const show =
      document.querySelector('input[name="mode"]:checked').value === "api";
    document.getElementById("geminiKey").style.display = show
      ? "block"
      : "none";
  });
});

document.getElementById("analyzeBtn").addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const useToken = document.getElementById("useToken").checked;
  const token = document.getElementById("token").value.trim();
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const geminiKey = document.getElementById("geminiKey").value.trim();
  const outputDiv = document.getElementById("output");

  outputDiv.innerHTML = "🔄 Analyzing repositories...";

  try {
    const repos = await fetchRepos(username, useToken ? token : null);
    const prompt = generatePrompt(repos);

    if (mode === "prompt") {
      latestMarkdown = prompt;
      outputDiv.textContent = prompt; // Show prompt as plain text
    } else {
      outputDiv.innerHTML = "🔄 Contacting Gemini API...";
      // Replace with your preferred Gemini call (manual fetch or client)
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );
      const data = await res.json();
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "No reply.";

      latestMarkdown = reply;
      outputDiv.innerHTML = marked.parse(reply);
    }
  } catch (err) {
    outputDiv.textContent = "❌ Error: " + err.message;
  }
});

document.getElementById("copyBtn").addEventListener("click", () => {
  if (!latestMarkdown) return alert("Nothing to copy!");
  navigator.clipboard.writeText(latestMarkdown).then(() => {
    alert("Markdown copied to clipboard!");
  });
});
