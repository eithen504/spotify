import { SmallScreenLibraryPanelSkelton } from '../../../../../components/Skeletons';
import { VIEW_COMPONENTS, VIEW_SKELETONS } from '../../../../../constants';
import { useGetCurrentUserLibraryItems } from '../../../../../hooks/library';
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore';
import SmallScreenLibraryPanel from './SmallScreenLibraryPanel';

const LibraryItems = () => {
    const { leftSidebar, library } = useUIPreferencesStore();
    const { panelSize: leftPanelSize } = leftSidebar;
    const { activeTab: libraryActiveTab, view: libraryView } = library;

    const { isLoading } = useGetCurrentUserLibraryItems(libraryActiveTab);

    if (true) {
        if (leftPanelSize <= 10) {
            return <SmallScreenLibraryPanelSkelton />
        }
 
        return VIEW_SKELETONS[libraryView];
    }

    if (leftPanelSize <= 10) return <SmallScreenLibraryPanel />;

    return (
        VIEW_COMPONENTS[libraryView]
    )
}

export default LibraryItems