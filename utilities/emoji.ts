const tempoEmojis = ['🐌', '🦥', '🐕', '🧍', '🏃', '🐎', '🚴', '🐆', '🦅', '🛫', '🚀'];
const danceEmojis = ['🛌', '🕺', '💃'];
export const getTempoEmoji = (tempo: number) => {
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
      return 'no tempo';
      break;
  }
};
export const getDanceEmoji = (dancebility: number) => {
  const num = Math.round(dancebility * 10);

  // eslint-disable-next-line no-nested-ternary
  return new Array(num).fill(num < 4 ? danceEmojis[0] : num < 7 ? danceEmojis[1] : danceEmojis[2]).join('');
};
export const getAcousticEmoji = (acousticness: number) => {
  return Math.round(acousticness) === 1 ? '🎻' : '🎸';
};
