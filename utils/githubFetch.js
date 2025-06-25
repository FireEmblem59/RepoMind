async function fetchRepos(username, token = null) {
  const headers = token ? { Authorization: `token ${token}` } : {};

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    {
      headers,
    }
  );

  if (!res.ok) throw new Error("GitHub user not found or invalid token");
  return await res.json();
}
