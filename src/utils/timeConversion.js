export default getTime = timeDuration => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + timeDuration);

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const twelveHour = hours % 12 || 12;

  const extraTime = new Date();
  extraTime.setMinutes(extraTime.getMinutes() + timeDuration + 30);
  let extraHours = extraTime.getHours();
  const extraMinutes = extraTime.getMinutes().toString().padStart(2, '0');
  const extraAmpm = extraHours >= 12 ? 'PM' : 'AM';
  const extraTwelveHour = extraHours % 12 || 12;

  return {
    current: `${twelveHour}:${minutes} ${ampm}`,
    extra: `${extraTwelveHour}:${extraMinutes} ${extraAmpm}`,
  };
};
