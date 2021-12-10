interface IAnimateEmojiProps {
  emoji: string;
  tempo: number;
  timeSignature: number;
}
function AnimateEmoji(props: IAnimateEmojiProps): JSX.Element {
  const { emoji, tempo, timeSignature } = props;

  const x = new Array(timeSignature).fill(emoji);
  //   const [isFalse, setIsFalse] = useState<boolean>(false);
  //   const j = setInterval(() => setIsFalse((x: boolean) => !x), 1000);
  // console.log(x);
  //   return <></>;
  return (
    <div className="flex  ">
      {Math.round(tempo)}
      BPM
      <div className="flex pl-2 ">
        {x.map((char, index) => {
          const duration = (1 / (tempo / 60)) * timeSignature;
          const styles = {
            animationDuration: `${duration}s`,
            animationDelay: `${(duration * (x.length - index)) / timeSignature}s`,
          };

          return (
            <div key={index.toString()} className="flex   ">
              <style>
                {`
            @keyframes tempo {
                 0% { opacity:20%  }
                ${100 / timeSignature}% {opacity:100%; transform: scale(110%) }
                ${100 - 100 / timeSignature}% {tranform:scale(1)}
                 100% { opacity:20%,  }
            }
        `}
              </style>
              <div style={styles} className=" animate-tempo opacity-20 flex-1  inline-grid text-xl">
                {char}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default AnimateEmoji;
