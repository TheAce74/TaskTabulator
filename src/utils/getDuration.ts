const getDuration = (time: number) => {
  const hours = Math.floor(time / 3600);
  const mins = Math.floor((time - hours * 3600) / 60);
  const secs = time - hours * 3600 - mins * 60;

  const hoursString = hours === 1 ? `${hours} hr ` : `${hours} hrs `;
  const minsString = mins === 1 ? `${mins} min ` : `${mins} mins `;
  const secsString = secs === 1 ? `${secs} sec` : `${secs} secs`;
  let timeString: string;

  if (hours !== 0 && mins === 0 && secs === 0) {
    timeString = hoursString;
  } else if (hours !== 0 && mins !== 0 && secs === 0) {
    timeString = hoursString + minsString;
  } else if (hours !== 0 && mins === 0 && secs !== 0) {
    timeString = hoursString + secsString;
  } else if (hours === 0 && mins !== 0 && secs !== 0) {
    timeString = minsString + secsString;
  } else if (hours === 0 && mins !== 0 && secs === 0) {
    timeString = minsString;
  } else if (hours === 0 && mins === 0 && secs !== 0) {
    timeString = secsString;
  } else if (hours === 0 && mins === 0 && secs === 0) {
    timeString = secsString;
  } else {
    timeString = hoursString + minsString + secsString;
  }

  return timeString.trim();
};

export { getDuration };
