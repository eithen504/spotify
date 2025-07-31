import Header from "./_components/_header/Header";
import MainContent from "./_components/_mainContent/MainContent";
import PlaybackController from "./_components/_playbackController/PlaybackController";

export default function DesktopMainLayout() {
  return (
    <div className="flex flex-col h-screen outfit">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <MainContent />

      {/* Playback Controller */}
      <PlaybackController />
    </div>
  );
}