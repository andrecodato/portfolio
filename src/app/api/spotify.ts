const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

let cachedToken: string | null = null;
let tokenExpiry = 0;

export async function getSpotifyAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) throw new Error("Failed to refresh Spotify token");

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken!;
}

async function spotifyFetch(endpoint: string) {
  const token = await getSpotifyAccessToken();
  const res = await fetch(`${SPOTIFY_API_URL}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 30 },
  });
  if (res.status === 204) return null;
  if (!res.ok) return null;
  return res.json();
}

export async function getNowPlaying() {
  return spotifyFetch("/me/player/currently-playing");
}

export async function getTopTracks() {
  return spotifyFetch("/me/top/tracks?time_range=short_term&limit=10");
}

export async function getTopArtists() {
  return spotifyFetch("/me/top/artists?time_range=short_term&limit=10");
}

export async function getRecentlyPlayed() {
  return spotifyFetch("/me/player/recently-played?limit=10");
}

export async function getUserProfile() {
  return spotifyFetch("/me");
}