import { useEffect, useState } from "react";
import { Track } from "../models/playlist";

const tempoEmojis = [
  "🐌",
  "🦥",
  "🐕",
  "🧍",
  "🚣",
  "🚢",
  "🚴",
  "🚗",
  "🏎️",
  "🚆",
  "🛫",
  "🚀",
];
const getTempoEmoji = (tempo: number) => {
  switch (true) {
    case tempo < 50:
      return tempoEmojis[0];
      break;
    case tempo < 60:
      return tempoEmojis[1];
      break;
    case tempo < 80:
      return tempoEmojis[3];
      break;
    case tempo < 100:
      return tempoEmojis[4];
      break;
    case tempo < 120:
      return tempoEmojis[5];
      break;
    case tempo < 160:
      return tempoEmojis[6];
      break;
    case tempo < 200:
      return tempoEmojis[7];
      break;
    case tempo < 280:
      return tempoEmojis[8];
      break;
    case tempo < 360:
      return tempoEmojis[9];
      break;
    case tempo >= 360:
      return tempoEmojis[10];
      break;
    default:
      return "no tempo";
      break;
  }
};

interface ITracksProp {
  playlistId: string;
}

const Tracks = (props: ITracksProp) => {
  const { playlistId } = props;

  const [tracks, setTracks] = useState<Array<Track>>([]);
  const fetchTracks = async (playlistId: string) => {
    fetch(`/api/spotify/playlists/${playlistId}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const fewerValues = json.map((track: Track) => {
          const { tempo, name, mode, id, artists, album } = track;
          const image = album.images[album.images.length - 1].url;
          return { tempo, name, mode, id, artists, image };
        });

        setTracks(fewerValues);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      playlistId && (await fetchTracks(playlistId));
    };
    fetchData();
  }, [playlistId]);

  return (
    <>
      {/* <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Applicant Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Margot Foster
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Application for
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Backend Developer
              </dd>
            </div>
          </dl>
        </div>
      </div> */}

      <table className="table-auto  divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Tempo
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Key
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Artist
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tracks.map((track) => (
            <tr key={track.id}>
              <td className="px-6 py-4 ">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={track.image}
                      alt="Album Cover"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm  font-medium text-gray-900">
                      {track.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 ">
                <div className="text-4xl text-gray-900">
                  {getTempoEmoji(track.tempo)}
                </div>
                <div className="text-sm text-gray-500"></div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 inline-flex leading-5  text-4xl font-semibold rounded-full bg-green-100 text-green-800">
                  {track.mode == 1 ? "😀" : "😔"}
                </span>
              </td>
              <td className="px-6 py-4  text-sm text-gray-500">
                {track.artists.reduce(
                  (artists, artist) => (artists += ", " + artist)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {tracks &&
        tracks.map((track: Track) => (
          <div key={playlistId + track.id}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>Title: {track.name}</div>
              <div> Tempo: {getTempoEmoji(track.tempo)} </div>
              <div>Key:{track.mode == 1 ? "😀" : "😔"} </div>
              <div>
                Artist:
                {track.artists.reduce(
                  (artists, artist) => (artists += ", " + artist)
                )}
              </div>
            </div>
          </div>
        ))} */}
    </>
  );
};
export default Tracks;
