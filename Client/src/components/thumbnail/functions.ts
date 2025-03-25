export const formatDuration = (seconds: number) => {
  const wholeSeconds = Math.floor(seconds);

  const hours = Math.floor(wholeSeconds / 3600);
  const minutes = Math.floor((wholeSeconds % 3600) / 60);
  const remainingSeconds = wholeSeconds % 60;
  const isPaddingNeededForSeconds = remainingSeconds < 10;
  const isPaddingNeededForMinutes = minutes < 10;

  const durationWithoutHours = `${minutes}:${isPaddingNeededForSeconds ? "0" : ""}${remainingSeconds}`;

  return hours
    ? `${hours}:${isPaddingNeededForMinutes ? "0" : ""}${durationWithoutHours}`
    : durationWithoutHours;
};
