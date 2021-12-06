import React, { useEffect, useState } from "react";
import { ITrack } from "../models/playlist";
import Track from "./Track";

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

const TracksList = (props: ITracksProp) => {
  const { playlistId } = props;

  const [tracks, setTracks] = useState<Array<ITrack>>([]);
  const fetchTracks = async (playlistId: string) => {
    fetch(`/api/spotify/playlists/${playlistId}`)
      .then((res) => res.json())
      .then((json) => {
        const fewerValues = json.map((track: ITrack) => {
          const { tempo, name, mode, id, artists, album } = track;
          const image = album.images[album.images.length - 2].url;
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
    <div className="bg-gray-100 mt-4 md:mt-2 overflow-hidden   md:rounded-lg  md:border ">
      <div className="hidden  md:grid grid-cols-6 px-2 py-2 border-b ">
        <div className="px-5 py-5 text-xl col-span-2  font-medium   ">Name</div>
        <div className="pl-4 py-5 text-xl font-medium   ">Tempo</div>
        <div className="px-5 py-5 text-xl font-medium   ">Key</div>
        <div className="pl-6 py-5 text-xl col-span-2 font-medium  ">Artist</div>
      </div>
      <dl className="flex flex-col gap-y-4 md:gap-0 md:px-0">
        {tracks.map((track, index) => (
          <Track key={track.id} index={index} track={track} />
        ))}
      </dl>
    </div>
  );
};
export default TracksList;
