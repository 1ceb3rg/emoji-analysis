import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import PlaylistSelector from "../components/PlaylistSelector";
import PlaylistView from "../components/PlaylistView";
import SpotifyLogo from "../public/Spotify_Icon_CMYK_Green.png";
import SignInButton from "../components/SignInButton";
import Protected from "../components/Protected";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export default function Page() {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const fetchPlaylists = async () => {
    fetch("/api/spotify/playlists")
      .then((res) => res.json())
      .then((json) => setPlaylists(json));
  };
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [user, setUser] = useState(session?.user);

  const fetchTracks = async (playlistId: string) => {
    fetch(`/api/spotify/playlists/${playlistId}`)
      .then((res) => res.json())
      .then((json) => setTracks((oldtracks) => json));
  };

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (status === "authenticated") await fetchPlaylists();
    };
    fetchPlaylist();
    if (status === "authenticated") setUser(session?.user);
  }, [status]);
  //   useEffect(async()=>{
  // if(activePlaylist)

  // await fetchTracks(activePlaylist);

  //   },[activePlaylist])
  return (
    <>
      <Protected>
        <PlaylistView />
      </Protected>
    </>
  );
}
