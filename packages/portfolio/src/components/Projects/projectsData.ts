export type Project = {
  title: string;
  description?: string | null;
  link?: string; // GitHub repo URL
  homepage?: string | null; // Live/demo URL
  language?: string | null;
  topics?: string[];
  stars?: number;
  forks?: number;
  watchers?: number;
  createdAt?: string; // ISO
  updatedAt?: string; // ISO
  defaultBranch?: string | null;
};

// Basit bellek içi cache (gereksiz tekrar çağrıları azaltmak için)
let cachedProjects: Project[] | null = null;
let lastFetchedAt = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 dk

export async function fetchGithubProjects(username: string = 'bugracntp'): Promise<Project[]> {
  const now = Date.now();
  if (cachedProjects && now - lastFetchedAt < CACHE_TTL_MS) {
    return cachedProjects;
  }
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!res.ok) {
      throw new Error(`GitHub API HTTP ${res.status}`);
    }
    const data = await res.json();
    const normalized: Project[] = (Array.isArray(data) ? data : [])
      .filter((r: any) => !r.fork)
      .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .map((r: any) => ({
        title: r.name,
        description: r.description,
        link: r.html_url,
        homepage: r.homepage || null,
        language: r.language || null,
        topics: Array.isArray(r.topics) ? r.topics : [],
        stars: typeof r.stargazers_count === 'number' ? r.stargazers_count : undefined,
        forks: typeof r.forks_count === 'number' ? r.forks_count : undefined,
        watchers: typeof r.watchers_count === 'number' ? r.watchers_count : undefined,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
        defaultBranch: r.default_branch || null,
      }));
    cachedProjects = normalized;
    lastFetchedAt = now;
    return normalized;
  } catch (err) {
    // Hata durumunda boş dizi dön, UI statik fallback'i kullanabilir
    return [];
  }
}

// Statik fallback veri (opsiyonel olarak doldurulabilir)
const projectsData: Project[] = [];

export default projectsData;

