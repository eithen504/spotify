import { HighVolumeIcon, LowVolumeIcon, MediumVolumeIcon, MuteVolumeIcon } from "./Svgs";

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

const formatTotalAsHMS = (secondsArray: number[]): string => {
  const totalSeconds = secondsArray.reduce((acc, s) => acc + Math.floor(s), 0);

  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hrs > 0) {
    return `${hrs} hour ${mins} min ${secs} second`;
  } else if (mins > 0) {
    return `${mins} min ${secs} second`;
  } else {
    return `${secs} second`;
  }
};

const formatDate = (date: Date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const getVolumeIcon = (volume: number) => {
  if (volume === 0) return MuteVolumeIcon;
  if (volume <= 30) return LowVolumeIcon;
  if (volume <= 70) return MediumVolumeIcon;
  return HighVolumeIcon;
};

export {
  getScrollThreshold,
  formatDuration,
  formatTotalAsHMS,
  formatDate,
  getVolumeIcon
}