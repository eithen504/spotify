import { useCheckAuth } from "../../hooks/auth";
import Header from "./_components/_header/Header";
import MainContent from "./_components/_mainContent/MainContent";
import PlaybackController from "./_components/_playbackController/PlaybackController";
import SignupBanner from "./_components/_signupBanner/SignupBanner";

export default function DesktopMainLayout() {
  const { data: currentUser } = useCheckAuth();

  return (
    <div className="flex flex-col h-screen outfit">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <MainContent />

      {/* Conditional - Playback Controller Or Signup Banner */}
      {currentUser ? <PlaybackController /> : <SignupBanner />}
    </div>
  );
}