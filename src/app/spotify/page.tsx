"use client";

import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import SpotifyVisualizer from "@/components/three/SpotifyVisualizer";
import { Music, Disc3, Clock, Users, ExternalLink, Headphones } from "lucide-react";

interface CurrentTrack {
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  trackUrl: string;
  duration: number;
  progress: number;
  isPlaying: boolean;
}

interface Track {
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  trackUrl: string;
}

interface Artist {
  name: string;
  genres: string[];
  image: string;
  url: string;
  followers: number;
}

interface RecentTrack {
  name: string;
  artist: string;
  albumArt: string;
  trackUrl: string;
  playedAt: string;
}

interface UserProfile {
  name: string;
  image: string;
  followers: number;
  url: string;
}

interface SpotifyData {
  current: CurrentTrack | null;
  tracks: Track[];
  artists: Artist[];
  recent: RecentTrack[];
  user: UserProfile | null;
  isPlaying: boolean;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}min atrás`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h atrás`;
  return `${Math.floor(hrs / 24)}d atrás`;
}

function msToTime(ms: number) {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function formatFollowers(n: number | undefined) {
  if (n == null) return "";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function ProgressBar({ progress, duration }: { progress: number; duration: number }) {
  const pct = Math.min((progress / duration) * 100, 100);
  return (
    <div className="w-full mt-3">
      <div className="flex justify-between text-[10px] text-[#a0aec0] font-mono mb-1">
        <span>{msToTime(progress)}</span>
        <span>{msToTime(duration)}</span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-linear-to-r from-[#1DB954] to-[#1ed760] transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function PulsingDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DB954] opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1DB954]" />
    </span>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`backdrop-blur-xl bg-white/3 border border-white/6 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] ${className}`}>
      {children}
    </div>
  );
}

function SkeletonCard() {
  return (
    <GlassCard>
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-white/10 rounded w-1/3" />
        <div className="h-3 bg-white/5 rounded w-2/3" />
        <div className="h-3 bg-white/5 rounded w-1/2" />
      </div>
    </GlassCard>
  );
}

export default function SpotifyPage() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) throw new Error();
        const json = await res.json();
        setData(json);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const isPlaying = data?.isPlaying ?? false;

  return (
    <main className="min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Headphones className="w-6 h-6 text-[#1DB954]" />
        <h1 className="font-mono text-2xl sm:text-3xl font-bold text-white">
          // <span className="text-[#1DB954]">Spotify</span>
        </h1>
      </div>
      <p className="text-sm text-[#a0aec0] mb-10 font-mono">
        O que eu ando ouvindo ultimamente
      </p>

      {/* Three.js Visualizer */}
      <div className="relative w-full h-80 sm:h-100 mb-10 rounded-3xl overflow-hidden border border-white/4">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#0a0a0a]/90 z-10 pointer-events-none" />
        <Canvas
          dpr={[1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2)]}
          camera={{ position: [0, 2.5, 5], fov: 50 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <SpotifyVisualizer isPlaying={isPlaying} />
          </Suspense>
        </Canvas>

        {/* Now Playing overlay on the visualizer */}
        {data?.current && (
          <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-8">
            <div className="flex items-end gap-4">
              {data.current.albumArt && (
                <img
                  src={data.current.albumArt}
                  alt={data.current.album}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl shadow-2xl ring-1 ring-white/10"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {isPlaying ? <PulsingDot /> : <Disc3 className="w-3 h-3 text-[#a0aec0]" />}
                  <span className="text-[10px] uppercase tracking-widest text-[#1DB954] font-mono font-semibold">
                    {isPlaying ? "Tocando agora" : "Pausado"}
                  </span>
                </div>
                <a
                  href={data.current.trackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <h2 className="text-white font-bold text-lg sm:text-xl truncate group-hover:text-[#1DB954] transition-colors">
                    {data.current.name}
                  </h2>
                </a>
                <p className="text-[#a0aec0] text-sm truncate">
                  {data.current.artist} — {data.current.album}
                </p>
                <ProgressBar progress={data.current.progress} duration={data.current.duration} />
              </div>
            </div>
          </div>
        )}

        {!data?.current && !loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center">
              <Disc3 className="w-10 h-10 text-[#a0aec0]/40 mx-auto mb-3" />
              <p className="text-[#a0aec0] text-sm font-mono">Nada tocando agora</p>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <GlassCard className="text-center py-12">
          <p className="text-[#a0aec0] font-mono text-sm">
            Falha ao carregar dados do Spotify. Verifique as variáveis de ambiente.
          </p>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Top Tracks */}
          <GlassCard className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <Music className="w-4 h-4 text-[#1DB954]" />
              <h3 className="font-mono text-sm font-semibold text-white uppercase tracking-wider">
                Top Músicas
              </h3>
              <span className="text-[10px] text-[#a0aec0] font-mono ml-auto">último ano</span>
            </div>
            <div className="space-y-1">
              {data?.tracks.map((track, i) => (
                <a
                  key={i}
                  href={track.trackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/4 transition-colors group"
                >
                  <span className="text-[#a0aec0]/40 font-mono text-xs w-5 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {track.albumArt && (
                    <img
                      src={track.albumArt}
                      alt={track.album}
                      className="w-10 h-10 rounded-lg shadow-md"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate group-hover:text-[#1DB954] transition-colors">
                      {track.name}
                    </p>
                    <p className="text-[#a0aec0] text-xs truncate">{track.artist}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#a0aec0]/0 group-hover:text-[#a0aec0]/60 transition-all" />
                </a>
              ))}
            </div>
          </GlassCard>

          {/* Top Artists */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-5">
              <Users className="w-4 h-4 text-[#1DB954]" />
              <h3 className="font-mono text-sm font-semibold text-white uppercase tracking-wider">
                Top Artistas
              </h3>
            </div>
            <div className="space-y-3">
              {data?.artists.slice(0, 8).map((artist, i) => (
                <a
                  key={i}
                  href={artist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  {artist.image ? (
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10 group-hover:ring-[#1DB954]/40 transition-all"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#a0aec0]" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate group-hover:text-[#1DB954] transition-colors">
                      {artist.name}
                    </p>
                    <p className="text-[#a0aec0] text-[10px] truncate">
                      {artist.genres?.join(", ") || `${formatFollowers(artist.followers)} seguidores`}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </GlassCard>

          {/* Recently Played */}
          <GlassCard className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-5">
              <Clock className="w-4 h-4 text-[#1DB954]" />
              <h3 className="font-mono text-sm font-semibold text-white uppercase tracking-wider">
                Ouvidas Recentemente
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {data?.recent.map((track, i) => (
                <a
                  key={i}
                  href={track.trackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/4 transition-colors group"
                >
                  {track.albumArt && (
                    <img
                      src={track.albumArt}
                      alt={track.name}
                      className="w-9 h-9 rounded-lg shadow-md"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate group-hover:text-[#1DB954] transition-colors">
                      {track.name}
                    </p>
                    <p className="text-[#a0aec0] text-[10px] truncate">
                      {track.artist} · {timeAgo(track.playedAt)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </main>
  );
}
