import FastAverageColor from 'fast-average-color';
import React, { useEffect, useState } from 'react';
import { IPlaylist, ITrack } from '../models/playlist';
import PlaylistSelector from './PlaylistSelector';
import TrackView from './TrackView';

const fac = new FastAverageColor();
function SongViewer() {
  const [selected, setSelected] = useState<IPlaylist>();
  const [tracks, setTracks] = useState<Array<ITrack>>();
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [bgColor, setBgColor] = useState<string>('#191414');
  const [showTrackView, setShowTrackView] = useState<boolean>(false);
  const changeTrack = (direction: 'left' | 'right') => {
    if (!tracks) return;
    if (direction === 'right') {
      if (currentTrack !== tracks.length - 1) setCurrentTrack((prevTrack) => prevTrack + 1);
      else setCurrentTrack(0);
    } else if (direction === 'left') {
      if (currentTrack !== 0) setCurrentTrack((prevTrack) => prevTrack - 1);
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
    selected && fetchTracks(selected.id) && setShowTrackView(true);
    setCurrentTrack(0);
  }, [selected]);
  useEffect(() => {
    if (!tracks) return;
    const getLocalColor = async (image: string) => {
      const color = await getColor(image);
      setBgColor(color);
    };
    tracks && getLocalColor(tracks[currentTrack]?.album.images[1].url);
  }, [currentTrack, tracks]);

  return (
    <>
      <PlaylistSelector onChange={setSelected} selected={selected} />

      {tracks && (
        <TrackView
          isShowing={showTrackView}
          onClose={() => setShowTrackView(false)}
          nextTrack={changeTrack}
          bgColor={bgColor}
          track={tracks[currentTrack]}
        />
      )}
    </>
  );
}
export default SongViewer;
