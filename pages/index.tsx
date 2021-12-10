import PlaylistView from '../components/PlaylistView';
import Protected from '../components/Protected';

export default function Page() {
  return (
    <Protected>
      <PlaylistView />
    </Protected>
  );
}
