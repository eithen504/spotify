import SignupBanner from "../../components/SignupBanner";
import { useCheckAuth } from "../../hooks/auth"
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";
import Header from "./components/header/Header"
import MainContent from "./components/mainContent/MainContent"
import PlaybackController from "./components/playbackController/PlaybackController"

export default function DesktopLayout() {
  /* ---------- Stores ---------- */
  const { rightSidebar } = useUIPreferencesStore();
  const { isNowPlayingViewExpanded } = rightSidebar;

  /* ---------- Custom Hooks ---------- */
  const { data: currentUser } = useCheckAuth();

  return (
    <div className="overflow-hidden bg-[#121212]">
      <div className="flex flex-col h-screen outfit bg-[#000000]">
        {/* Header - Logo, Home, Search Bar, User */}
        {
          !isNowPlayingViewExpanded && <Header />
        }

        {/* Main Content */}
        <MainContent />

        {/* Playback Controller */}
        {
          currentUser ? <PlaybackController /> : <SignupBanner />
        }

      </div>
    </div>
  )
}
