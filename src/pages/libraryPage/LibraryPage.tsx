import { useUIPreferencesStore } from '../../store/useUIPreferenceStore'
import Header from './components/Header';
import LibraryToolbar from './components/LibraryToolbar';
import LibraryItems from './components/LibraryItems';
import TabsSection from './components/TabsSection';
import { useScrollStore } from '../../store/useScrollStore';
import { useBreakPoint } from '../../hooks/breakPoint';
import { NotFoundPage } from '../../components/NotFounds';
import { useState } from 'react';
import SearchBar from './components/SearchBar';

const LibraryPage = () => {
  /* ---------- Local States ---------- */
  const [isSearchLibraryActive, setIsSearchLibraryActive] = useState(false);

  /* ---------- Stores ---------- */
  const { openedFolder } = useUIPreferencesStore();
  const { id: openedFolderId } = openedFolder;
  const { isScrolled } = useScrollStore();

  /* ---------- Custom Hooks ---------- */
  const { breakPoint } = useBreakPoint();

  if (breakPoint != "sm") return <NotFoundPage title="Unsupported browser" description="Spotify is unavailable on this browser. For the best listening experience update your browser or download the Spotify app." />;

  return (
    <div className="bg-[#121212] text-[#ffffff] rounded-md flex flex-col h-full overflow-y-auto hide-scrollbar group/header">
      <div className={`${isScrolled ? "shadow-[0_4px_5px_rgba(0,0,0,0.8)]" : ""} fixed md:sticky w-full top-0 bg-[#121212] z-100`}>
        {/* Conditionally render SearchBar or Header */}
        {isSearchLibraryActive ? (
          <SearchBar setIsSearchLibraryActive={setIsSearchLibraryActive} />
        ) : (
          <Header setIsSearchLibraryActive={setIsSearchLibraryActive} />
        )}

        {/* Tabs Section */}
        {
          !openedFolderId && <TabsSection />
        }
      </div>
      {/* Library Toolbar :- Sort & View */}
      <LibraryToolbar />

      {/* Library Items */}
      <LibraryItems />
    </div>
  )
}

export default LibraryPage 