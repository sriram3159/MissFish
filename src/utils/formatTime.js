function formatTime(date) {
  const d = new Date(date);
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12
  return `${hours}:${minutes} ${ampm}`; // Example: "4:45 PM"
}

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // 'Jul'
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

export { formatDate, formatTime };
