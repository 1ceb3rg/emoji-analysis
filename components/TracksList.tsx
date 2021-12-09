import classNames from "classnames";
import FastAverageColor from "fast-average-color";
import React, { useEffect, useState } from "react";
import { ITrack } from "../models/playlist";
import Track from "./Track";

interface ITracksProp {
  playlistId?: string;
}
const fac = new FastAverageColor();

const TracksList = (props: ITracksProp) => {
  const { playlistId } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [tracks, setTracks] = useState<Array<ITrack>>([]);
  const fetchTracks = async (playlistId: string) => {
    const res = await fetch(`/api/spotify/playlists/${playlistId}`);
    const json = await res.json();
    const fewerValues = json.map((track: ITrack) => {
      const { tempo, name, mode, id, artists, album, time_signature } = track;
      const image = album.images[album.images.length - 2].url;
      return { tempo, name, mode, id, artists, image, time_signature };
    });

    setTracks(fewerValues);
    setLoading(false);
  };
  const getColor = async (image: string) => {
    return (await fac.getColorAsync(image)).hex;
  };

  useEffect(() => {
    const fetchData = async () => {
      playlistId && (await fetchTracks(playlistId));
    };

    if (playlistId) {
      setLoading(true);

      fetchData();
    }
  }, [playlistId]);
  return (
    <div className="bg-gray-100 mt-4 md:mt-2 overflow-hidden   md:rounded-lg  md:border ">
      <div className="hidden  md:grid grid-cols-6 px-2 py-2 border-b ">
        <div className="px-5 py-5 text-xl col-span-2  font-medium   ">Name</div>
        <div className="pl-4 py-5 text-xl font-medium   ">Tempo</div>
        <div className="px-5 py-5 text-xl font-medium   ">Key</div>
        <div className="pl-6 py-5 text-xl col-span-2 font-medium  ">Artist</div>
      </div>
      <dl
        className={classNames("flex flex-col  gap-y-4 md:gap-0 md:px-0", {
          "blur-sm animate-pulse": loading,
        })}
      >
        {tracks.map((track, index) => (
          <Track
            bgColor={getColor(track.image)}
            key={track.id}
            numTracks={tracks.length}
            index={index}
            track={track}
          />
        ))}
        {/* {tracks.length < 5 &&
          [1, 2, 3, 4, 5, 6].map((num, index) => (
            <Track index={index} key={index.toString()} />
          ))} */}
      </dl>
    </div>
  );
};
export default TracksList;
