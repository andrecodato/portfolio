import { NextResponse } from "next/server";
import {
  getNowPlaying,
  getTopTracks,
  getTopArtists,
  getRecentlyPlayed,
  getUserProfile,
} from "../spotify";

export const revalidate = 30;

export async function GET() {
  try {
    const [nowPlaying, topTracks, topArtists, recentlyPlayed, profile] =
      await Promise.all([
        getNowPlaying().catch(() => null),
        getTopTracks().catch(() => null),
        getTopArtists().catch(() => null),
        getRecentlyPlayed().catch(() => null),
        getUserProfile().catch(() => null),
      ]);

    const isPlaying = nowPlaying?.is_playing ?? false;

    const current = nowPlaying?.item
      ? {
          name: nowPlaying.item.name,
          artist: nowPlaying.item.artists
            ?.map((a: { name: string }) => a.name)
            .join(", "),
          album: nowPlaying.item.album?.name,
          albumArt: nowPlaying.item.album?.images?.[0]?.url,
          trackUrl: nowPlaying.item.external_urls?.spotify,
          duration: nowPlaying.item.duration_ms,
          progress: nowPlaying.progress_ms,
          isPlaying,
        }
      : null;

    const tracks = topTracks?.items?.map(
      (t: {
        name: string;
        artists: { name: string }[];
        album: { name: string; images: { url: string }[] };
        external_urls: { spotify: string };
      }) => ({
        name: t.name,
        artist: t.artists?.map((a) => a.name).join(", "),
        album: t.album?.name,
        albumArt: t.album?.images?.[1]?.url ?? t.album?.images?.[0]?.url,
        trackUrl: t.external_urls?.spotify,
      })
    ) ?? [];

    const artists = topArtists?.items?.map(
      (a: {
        name: string;
        genres: string[];
        images: { url: string }[];
        external_urls: { spotify: string };
        followers: { total: number };
      }) => ({
        name: a.name,
        genres: a.genres?.slice(0, 3),
        image: a.images?.[1]?.url ?? a.images?.[0]?.url,
        url: a.external_urls?.spotify,
        followers: a.followers?.total,
      })
    ) ?? [];

    const recent = recentlyPlayed?.items?.map(
      (item: {
        track: {
          name: string;
          artists: { name: string }[];
          album: { images: { url: string }[] };
          external_urls: { spotify: string };
        };
        played_at: string;
      }) => ({
        name: item.track.name,
        artist: item.track.artists?.map((a) => a.name).join(", "),
        albumArt:
          item.track.album?.images?.[2]?.url ??
          item.track.album?.images?.[0]?.url,
        trackUrl: item.track.external_urls?.spotify,
        playedAt: item.played_at,
      })
    ) ?? [];

    const user = profile
      ? {
          name: profile.display_name,
          image: profile.images?.[0]?.url,
          followers: profile.followers?.total,
          url: profile.external_urls?.spotify,
        }
      : null;

    return NextResponse.json({
      current,
      tracks,
      artists,
      recent,
      user,
      isPlaying,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch Spotify data" },
      { status: 500 }
    );
  }
}
