// Minimal types + loader for Spotify's official iFrame API.
// https://developer.spotify.com/documentation/embeds/references/iframe-api

export type SpotifyPlaybackUpdate = {
  data: { isPaused: boolean; isBuffering: boolean; duration: number; position: number };
};

export type SpotifyController = {
  togglePlay: () => void;
  destroy: () => void;
  addListener: {
    (event: "ready", cb: () => void): void;
    (event: "playback_update", cb: (e: SpotifyPlaybackUpdate) => void): void;
  };
};

export type SpotifyIFrameAPI = {
  createController: (
    el: HTMLElement,
    options: { uri: string; width?: number | string; height?: number },
    cb: (controller: SpotifyController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
  }
}

let spotifyApi: Promise<SpotifyIFrameAPI> | null = null;

/** Loads Spotify's iFrame API script once and resolves with the API object. */
export function loadSpotifyApi() {
  spotifyApi ??= new Promise((resolve) => {
    window.onSpotifyIframeApiReady = resolve;
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);
  });
  return spotifyApi;
}

/** 83000 -> "1:23" */
export function formatTime(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
