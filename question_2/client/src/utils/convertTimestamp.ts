export default function convertTimestamp(timestamp: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = new Date(timestamp);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
