import { useEffect, useState, Fragment } from "react";
import { signOut } from "next-auth/react";
import { IPlaylist } from "../models/playlist";
import { MusicNoteIcon } from "@heroicons/react/outline";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

import TracksList from "./TracksList";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Playlist = () => {
  const [playlists, setPlaylists] = useState<Array<IPlaylist>>([]);

  const [selected, setSelected] = useState<IPlaylist>();
  const fetchPlaylists = async () => {
    fetch("/api/spotify/playlists")
      .then((res) => {
        if (res.status === 401) throw Error("Unauthorized");
        return res.json();
      })

      .then((json) => setPlaylists(json))
      .catch((error) => {
        signOut();
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchPlaylists();
      setSelected(playlists[0]);
    };
    fetchData();
  }, []);
  return (
    <>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              Select Playlist
            </Listbox.Label>
            <div className="mt-1 relative">
              <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="flex items-center">
                  {(selected?.image && (
                    <img
                      src={selected?.image}
                      alt=""
                      className="flex-shrink-0 h-6 w-6 rounded-full"
                    />
                  )) || <MusicNoteIcon className="w-6 h-6" />}
                  <span className="ml-3 block truncate">{selected?.name}</span>
                </span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {playlists.map((playlist) => (
                    <Listbox.Option
                      key={playlist.id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-indigo-600" : "text-gray-900",
                          "cursor-default select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={playlist}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <img
                              src={playlist?.image}
                              alt=""
                              className="flex-shrink-0 h-6 w-6 rounded-full"
                            />
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {playlist.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      {false && (
        <iframe
          className="w-full sticky"
          src={`https://open.spotify.com/embed/playlist/${selected.id}`}
          frameBorder="0"
          allowTransparency={true}
          allow="encrypted-media"
        ></iframe>
      )}

      {selected && <TracksList playlistId={selected.id} />}
    </>
  );
};
export default Playlist;
