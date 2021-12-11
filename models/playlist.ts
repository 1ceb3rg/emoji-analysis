export interface IPlaylist {
  name: string;
  id: string;
  description: string;
  images: Array<any>;
  image: string;
}

export interface IPlaylistTracks {
  items: [ITrack];
}

export interface ITrack {
  name: string;
  id: string;
  artists: [string];
  tempo: number;
  key: number;
  mode: number;
  image: string;
  time_signature: number;
  album: { name: string; images: Array<{ url: string }> };
  acousticness: number;
  danceability: number;
}
