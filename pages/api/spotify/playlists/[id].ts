import { getToken, JWT } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import { ITrack } from '../../../../models/playlist';

const fetchPlaylistTracks = async (playlistId: string, token: string) => {
  try {
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const body = await res.json();

    return body.items.map((item: any) => {
      const artists = item.track.artists.map((artist: any) => artist.name);
      const { id } = item.track;
      const { name } = item.track;
      const { album } = item.track;
      return {
        id,
        name,
        artists,
        album,
      };
    });
  } catch (error) {
    return error;
  }
};
const fetchITrackFeatures = async (tracks: Array<ITrack>, token: string) => {
  const ids = tracks.map((track) => track.id).join(',');
  try {
    const res = await fetch(`https://api.spotify.com/v1/audio-features/?ids=${ids}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await res.json();
    // console.log(body);
    const tracksWithData = tracks.map((track) => ({
      ...track,
      ...body.audio_features.find((analysis: any) => analysis.id === track.id),
    }));

    return tracksWithData;
  } catch (error) {
    return error;
  }
};

const secret = process.env.SECRET as string;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = (await getToken({ req, secret })) as JWT;

  const {
    query: { id },
  } = req;

  if (token && token.accessToken && typeof id === 'string') {
    const tracks = await fetchPlaylistTracks(id, token.accessToken);
    const tracksWithData = await fetchITrackFeatures(tracks, token.accessToken);

    res.send(tracksWithData);
  } else res.send([]);
}
