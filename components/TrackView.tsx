import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IPlaylist, ITrack } from "../models/playlist";
import PlaylistSelector from "./PlaylistSelector";
import SignInButton from "./SignInButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import Image from "next/image";
import TrackSection from "./TrackSection";

interface INextTrackButtonProps {
  direction: "right" | "left";
  onClick: () => void;
}
const NextTrackButton = (props: INextTrackButtonProps) => {
  const { direction, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="min-w-1/12  flex align-middle text-gray-50 hover:text-black hover:bg-gray-200 hover:opacity-50 "
    >
      {direction === "right" ? (
        <ChevronRightIcon className=" opacity-100 " />
      ) : (
        <ChevronLeftIcon />
      )}
    </button>
  );
};

interface ITrackViewProps {
  track: ITrack;
  bgColor: string;
  nextTrack: (direction: "left" | "right") => void;
}
const TrackView = (props: ITrackViewProps) => {
  const { track, bgColor, nextTrack } = props;

  return (
    <div
      className="flex justify-center py-10 rounded-md "
      style={{ backgroundColor: bgColor }}
    >
      <NextTrackButton onClick={() => nextTrack("left")} direction="left" />
      <div className="flex object-fill w-7/12 flex-shrink-0 flex-col ">
        <img
          className="object-fill"
          alt="Album Cover"
          src={track.album.images[0].url}
        />
        <div className="flex flex-col mt-3 shadow-md">
          <TrackSection className="bg-gray-200 rounded-t p-2" title="Artist">
            {track.artists.reduce(
              (artists, artist) => (artists += `,${artist}`)
            )}
          </TrackSection>
          <TrackSection className="bg-white p-2 " title="Name">
            {track.name}
          </TrackSection>
          <TrackSection className="bg-gray-200 p-2 " title="Album">
            {track.album.name}
          </TrackSection>

          <TrackSection className="bg-white rounded-b p-2" title="Tempo">
            {Math.round(track.tempo)}
          </TrackSection>
        </div>
      </div>
      <NextTrackButton onClick={() => nextTrack("right")} direction="right" />
    </div>
  );
};
export default TrackView;
