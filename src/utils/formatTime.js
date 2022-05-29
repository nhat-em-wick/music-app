const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const seconds = Math.floor(time % 60);
  const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${returnMinutes}:${returnSeconds}`;
};

export default formatTime