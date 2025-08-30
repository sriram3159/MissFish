export default function getTimeDuration(inputTime) {
  const date = new Date(inputTime);
  const now = new Date();

  // Format date check (ignoring time)
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  // Base time
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const twelveHour = hours % 12 || 12;

  // Extra time (+30 min)
  const extraTime = new Date(date.getTime() + 30 * 60000);
  let extraHours = extraTime.getHours();
  const extraMinutes = extraTime.getMinutes().toString().padStart(2, '0');
  const extraAmpm = extraHours >= 12 ? 'PM' : 'AM';
  const extraTwelveHour = extraHours % 12 || 12;

  // if (isToday) {
  if (true) {
    return {
      current: `${twelveHour}:${minutes} ${ampm}`,
      extra: `${extraTwelveHour}:${extraMinutes} ${extraAmpm}`,
    };
  } else {
    const formattedDate = date.toLocaleDateString('en-GB'); // dd/mm/yyyy
    const formattedExtraDate = extraTime.toLocaleDateString('en-GB');

    return {
      current: `${formattedDate} ${twelveHour}:${minutes} ${ampm}`,
      extra: `${formattedExtraDate} ${extraTwelveHour}:${extraMinutes} ${extraAmpm}`,
    };
  }
}
