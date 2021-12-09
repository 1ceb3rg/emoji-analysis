import classNames from "classnames";
import { useEffect, useState } from "react";

interface IAnimateEmojiProps {
  children?: React.ReactNode;
  emoji: string;
  tempo: number;
  time_signature: number;
}
const AnimateEmoji = (props: IAnimateEmojiProps): JSX.Element => {
  const { children, emoji, tempo, time_signature } = props;

  let x = new Array(time_signature).fill(emoji);
  //   const [isFalse, setIsFalse] = useState<boolean>(false);
  //   const j = setInterval(() => setIsFalse((x: boolean) => !x), 1000);
  // console.log(x);
  //   return <></>;
  return (
    <div className="flex  ">
      {Math.round(tempo)}BPM
      <div className="flex pl-2 ">
        {x.map((emoji, index) => {
          const duration = (1 / (tempo / 60)) * time_signature;
          let styles = {
            animationDuration: `${duration}s`,
            animationDelay: `${
              (duration * (x.length - index)) / time_signature
            }s`,
          };

          return (
            <div key={index.toString()} className="flex   ">
              <style>{`
            @keyframes tempo {
                 0% { opacity:20%  }
                ${100 / time_signature}% {opacity:100%; transform: scale(110%) }
                ${100 - 100 / time_signature}% {tranform:scale(1)}
                 100% { opacity:20%,  }
            }
        `}</style>
              <div
                style={styles}
                className=" animate-tempo opacity-20 flex-1  inline-grid text-xl"
              >
                {emoji}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AnimateEmoji;
