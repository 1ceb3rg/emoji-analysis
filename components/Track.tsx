import classNames from "classnames";
import { CSSProperties } from "react";
import { ITrack } from "../models/playlist";

interface ITrackProps {
  track: ITrack;
  index: number;
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

interface ITrackSectionProps {
  title: string;
  children: React.ReactNode;
  index: number;
  className: string;
  style?: CSSProperties;
}

const TrackSection = (props: ITrackSectionProps) => {
  const { title, children, className, style } = props;
  return (
    <div
      style={style}
      className={classNames(
        "px-6 py-5 grid grid-cols-2  justify-between opacity-90 md:opacity-80   ",
        className
      )}
    >
      <dt className="text-sm font-medium text-gray-500 md:hidden ">{title}</dt>
      <dd className="md:col-span-2  mt-1 text-sm text-gray-900 justify-center text-center md:text-left ">
        {children}
      </dd>
    </div>
  );
};

const Track = (props: ITrackProps) => {
  const { track, index } = props;

  return (
    <div
      key={track.id}
      className={classNames(
        `grid md:grid-cols-6 rounded-xl shadow-md border border-gray-300  relative md:bg-fixed   bg-center bg-no-repeat bg-gray-50 md:shadow-none   md:rounded-none md:border-b    `,
        { "md:bg-left": index % 3 === 0 },
        { "md:bg-center": index % 3 === 1 },
        { "md:bg-right": index % 3 === 2 }
      )}
    >
      <div
        style={{ backgroundImage: `url(${track.image})`, zIndex: "2" }}
        className={classNames(
          "absolute p-10  w-full h-full bg-clip-padding  bg-center bg-no-repeat opacity-10  bg-fixed   ",
          { "md:bg-left": index % 3 === 0 },
          { "md:bg-center": index % 3 === 1 },
          { "md:bg-right": index % 3 === 2 }
        )}
      >
        te
      </div>
      <TrackSection
        // style={{ backgroundImage: `url(${track.image})` }}
        className={classNames(
          "bg-gray-200   md:col-span-2    rounded-t-xl md:rounded-none    ",
          { "md:bg-gray-200": index % 2 !== 0 },
          { "md:bg-gray-50": index % 2 === 0 }
        )}
        index={index}
        title="Name"
      >
        {track.name}
      </TrackSection>

      <TrackSection
        className={classNames(
          "bg-gray-50   ",
          { "md:bg-gray-200": index % 2 !== 0 },
          { "md:bg-gray-50": index % 2 === 0 }
        )}
        index={index}
        title="Tempo"
      >
        <span className="text-3xl"> {getTempoEmoji(track.tempo)}</span>
      </TrackSection>
      <TrackSection
        className={classNames(
          "bg-gray-200",
          { "md:bg-gray-200": index % 2 !== 0 },
          { "md:bg-gray-50": index % 2 === 0 }
        )}
        index={index}
        title="Key"
      >
        <span className="text-3xl">{track.mode == 1 ? "😀" : "😔"}</span>
      </TrackSection>
      <TrackSection
        className={classNames(
          "bg-gray-50 md:col-span-2 rounded-b-xl md:rounded-none",
          { "md:bg-gray-200": index % 2 !== 0 },
          { "md:bg-gray-50": index % 2 === 0 }
        )}
        index={index}
        title="Artist"
      >
        {track.artists.reduce((artists, artist) => (artists += ", " + artist))}{" "}
      </TrackSection>
    </div>
  );
};

export default Track;
