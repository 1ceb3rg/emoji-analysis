import { useState } from 'react';
import { IPlaylist } from '../models/playlist';
import PlaylistSelector from './PlaylistSelector';
import TracksList from './TracksList';

function PlayslistView() {
  const [selected, setSelected] = useState<IPlaylist>();
  return (
    <>
      <PlaylistSelector selected={selected} onChange={setSelected} />
      <TracksList playlistId={selected?.id} />
    </>
  );
}
export default PlayslistView;
