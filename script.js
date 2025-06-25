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
  const output = document.getElementById("output");

  output.value = "🔄 Analyzing repositories...";

  try {
    const repos = await fetchRepos(username, useToken ? token : null);
    const prompt = generatePrompt(repos);

    if (mode === "prompt") {
      output.value = prompt;
    } else {
      output.value = "🔄 Contacting Gemini API...";
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiKey}`,
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
      output.value = reply;
    }
  } catch (err) {
    output.value = "❌ Error: " + err.message;
  }
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const text = document.getElementById("output").value;
  navigator.clipboard.writeText(text).then(() => {
    alert("Prompt copied to clipboard!");
  });
});
