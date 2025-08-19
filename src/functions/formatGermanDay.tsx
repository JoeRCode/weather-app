export function formatDateInGerman(dateString: string): string {
  const germanDays = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];

  let isDateWithTime = false;
  let myDate;
  let myTime;

  if (dateString.includes("T")) {
    const [currentDate, currentTime] = dateString.split("T");
    myDate = new Date(currentDate);
    myTime = currentTime;
    isDateWithTime = true;
  } else {
    myDate = new Date(dateString);
  }

  if (isNaN(myDate.getTime())) {
    return "Ungültiges Datum";
  }
  const dayName = germanDays[myDate.getDay()];
  const dateFormatter = new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedDate = dateFormatter
    .format(myDate)
    .replace(/(\d+)(?=\s)/, "$1.");

  return isDateWithTime
    ? `${dayName}, ${formattedDate} - ${myTime}`
    : `${dayName}, ${formattedDate}`;
}
