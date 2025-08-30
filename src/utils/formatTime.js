function formatTime(date) {
  const d = new Date(date);
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12
  return `${hours}:${minutes} ${ampm}`; // Example: "4:45 PM"
}

function formatDate(date, type = 1) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // 'Jul'
  const year = d.getFullYear();
  if (type == 1) {
    return `${day}-${month}-${year}`;
  } else {
    return `${day}/${month}/${year}`;
  }
}
function formatDateNumeric(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // numeric month (01–12)
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

export { formatDate, formatTime, formatDateNumeric };
