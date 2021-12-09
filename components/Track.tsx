import classNames from "classnames";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { ITrack } from "../models/playlist";
import AnimateEmoji from "./AnimateEmoji";
import TrackSection from "./TrackSection";
interface ITrackProps {
  track?: ITrack;
  index: number;
  numTracks?: number;
  bgColor: Promise<string>;
}
const tempoEmojis = [
  "🐌",
  "🦥",
  "🐕",
  "🧍",
  "🏃",
  "🐎",
  "🚴",
  "🐆",
  "🦅",
  "🛫",
  "🚀",
];
const getTempoEmoji = (tempo: number) => {
  switch (true) {
    case tempo < 60:
      return tempoEmojis[0];
      break;
    case tempo < 80:
      return tempoEmojis[1];
      break;
    case tempo < 100:
      return tempoEmojis[3];
      break;
    case tempo < 120:
      return tempoEmojis[4];
      break;
    case tempo < 180:
      return tempoEmojis[5];
      break;
    case tempo < 200:
      return tempoEmojis[7];
      break;
    case tempo < 300:
      return tempoEmojis[8];
      break;
    case tempo < 360:
      return tempoEmojis[9];
      break;
    case tempo >= 360:
      return tempoEmojis[10];
      break;
    default:
      return "no tempo";
      break;
  }
};

const Track = (props: ITrackProps) => {
  const { track, index, numTracks, bgColor } = props;
  const imageRef = useRef<HTMLImageElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [bgColorm, setbgColorm] = useState<string>("#191414");
  useEffect(() => {
    const fetchColor = async (bgColor: Promise<string>) => {
      const color = await bgColor;
      setbgColorm(color);
    };
    fetchColor(bgColor);
  }, []);

  return (
    <div key={track?.id ?? index?.toString()}>
      <div
        ref={divRef}
        style={{ backgroundColor: bgColorm }}
        className={classNames(
          `grid md:grid-cols-6 rounded-xl shadow-md border border-gray-300 relative md:bg-fixed   md:shadow-none   md:rounded-none md:border-b    `
        )}
      >
        <div className="flex p-4 visible justify-center md:hidden md:justify-start">
          <img
            crossOrigin="anonymous"
            ref={imageRef}
            alt={track?.name}
            className="w-2/3"
            src={track?.image}
          />
        </div>
        <TrackSection
          // style={{ backgroundImage: `url(${track.image})` }}
          className={classNames("bg-gray-200   md:col-span-2 rounded-none    ")}
          index={index}
          title="Name"
        >
          <div className="flex">
            <div className="hidden md:flex md:justify-start">
              <img
                crossOrigin="anonymous"
                ref={imageRef}
                alt={track?.name}
                className="h-20 w-20"
                src={track?.image}
              />
            </div>
            {track?.name}
          </div>
        </TrackSection>

        <TrackSection
          className={classNames("bg-gray-50    ")}
          index={index}
          title="Tempo"
        >
          {track?.tempo && (
            <AnimateEmoji
              time_signature={track.time_signature}
              tempo={track?.tempo}
              emoji={getTempoEmoji(track?.tempo)}
            />
          )}
        </TrackSection>
        <TrackSection
          className={classNames("bg-gray-200 md:px-5   ")}
          index={index}
          title="Key"
        >
          <span className="text-3xl">{track?.mode === 1 ? "😀" : "😔"}</span>
        </TrackSection>
        <TrackSection
          className={classNames(
            "bg-gray-50 md:col-span-2 md:px-5 rounded-b-xl md:rounded-none"
          )}
          index={index}
          title="Artist"
        >
          {track?.artists.reduce(
            (artists, artist) => (artists += ", " + artist)
          )}
        </TrackSection>
      </div>
    </div>
  );
};

export default Track;
