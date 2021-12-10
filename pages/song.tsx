import Protected from '../components/Protected';
import SongViewer from '../components/SongViewer';

function Song() {
  return (
    <Protected>
      <SongViewer />
    </Protected>
  );
}
export default Song;
