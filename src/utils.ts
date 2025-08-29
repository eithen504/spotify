
const getScrollThreshold = (leftPanelSize: number) => {
    if (leftPanelSize >= 7 && leftPanelSize <= 10) return 296;
    if (leftPanelSize >= 32 && leftPanelSize <= 38) return 228;
    return 248;
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const formatDate = (date: Date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

export {
  getScrollThreshold,
  formatDuration,
  formatDate
}