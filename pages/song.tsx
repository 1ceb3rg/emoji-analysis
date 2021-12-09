import { useRouter } from "next/router";
import Protected from "../components/Protected";
import SongViewer from "../components/SongViewer";

const Song = () => {
  const router = useRouter();
  return (
    <Protected>
      <SongViewer />
    </Protected>
  );
};
export default Song;
