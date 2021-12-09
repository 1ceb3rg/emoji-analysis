import FastAverageColor from "fast-average-color";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { IPlaylist, ITrack } from "../models/playlist";
import PlaylistSelector from "./PlaylistSelector";
import SignInButton from "./SignInButton";
import TrackView from "./TrackView";
const fac = new FastAverageColor();
const SongViewer = () => {
  const { status } = useSession();
  const [selected, setSelected] = useState<IPlaylist>();
  const [tracks, setTracks] = useState<Array<ITrack>>();
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [bgColor, setBgColor] = useState<string>("#191414");
  const changeTrack = (direction: "left" | "right") => {
    if (!tracks) return;
    if (direction === "right") {
      if (currentTrack !== tracks.length - 1)
        setCurrentTrack((currentTrack) => currentTrack + 1);
      else setCurrentTrack(0);
    } else if (direction === "left") {
      if (currentTrack !== 0)
        setCurrentTrack((currentTrack) => currentTrack - 1);
      else setCurrentTrack(tracks.length - 1);
    }
  };
  const fetchTracks = async (playlistId: string) => {
    const res = await fetch(`/api/spotify/playlists/${playlistId}`);
    const json = await res.json();
    setTracks(json);
    console.log(json);
  };
  const getColor = async (image: string) => {
    console.log(image);
    return (await fac.getColorAsync(image)).hex;
  };

  useEffect(() => {
    selected && fetchTracks(selected.id);
  }, [selected]);
  useEffect(() => {
    if (!tracks) return;
    const getLocalColor = async (image: string) => {
      const color = await getColor(image);
      setBgColor(color);
    };
    tracks && getLocalColor(tracks[currentTrack]?.album.images[1].url);
  }, [currentTrack]);

  return (
    <>
      <PlaylistSelector onChange={setSelected} selected={selected} />
      {tracks && (
        <TrackView
          nextTrack={changeTrack}
          bgColor={bgColor}
          track={tracks[currentTrack]}
        />
      )}
    </>
  );
};
export default SongViewer;
