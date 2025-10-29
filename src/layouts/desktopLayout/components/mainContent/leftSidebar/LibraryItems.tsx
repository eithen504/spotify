import { SmallScreenLibraryPanelSkelton } from '../../../../../components/Skeletons';
import { VIEW_COMPONENTS, VIEW_SKELETONS } from '../../../../../constants';
import { useGetCurrentUserLibraryItems } from '../../../../../hooks/library';
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore';
import SmallScreenLibraryPanel from './SmallScreenLibraryPanel';

const LibraryItems = () => {
    const { preferences: { leftPanelSize, view, leftSidebarActiveTab } } = useUIPreferencesStore();
    const { isLoading } = useGetCurrentUserLibraryItems(leftSidebarActiveTab);

    if (isLoading) {
        if (leftPanelSize <= 10) {
            return <SmallScreenLibraryPanelSkelton />
        }

        return VIEW_SKELETONS[view];
    }

    if (leftPanelSize <= 10) return <SmallScreenLibraryPanel />

    return (
        VIEW_COMPONENTS[view]
    )
}

export default LibraryItems