import classNames from "classnames";
import { useEffect, useState } from "react";

interface IAnimateEmojiProps {
  children?: React.ReactNode;
  emoji: string;
  tempo: number;
}
const AnimateEmoji = (props: IAnimateEmojiProps): JSX.Element => {
  const { children, emoji, tempo } = props;
  let x = new Array(2).fill(emoji);
  //   const [isFalse, setIsFalse] = useState<boolean>(false);
  //   const j = setInterval(() => setIsFalse((x: boolean) => !x), 1000);
  console.log(x);
  //   return <></>;
  return (
    <div className="flex flex-col ">
      <div
        style={{
          animationDuration: `${(1 / (tempo / 60)) * 2}s`,
        }}
        className="w-full animate-tempo flex-1 text-4xl"
      >
        {emoji}
      </div>
    </div>
  );
};
export default AnimateEmoji;
