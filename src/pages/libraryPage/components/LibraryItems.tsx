import { VIEW_COMPONENTS, VIEW_SKELETONS } from "../../../constants";
import { useGetCurrentUserLibraryItems } from "../../../hooks/library";
import { useUIPreferencesStore } from "../../../store/useUIPreferenceStore";

const LibraryItems = () => {
    const { preferences } = useUIPreferencesStore();
    const { library } = preferences;
    const { activeTab: libraryActiveTab, view: libraryView } = library;
    
    const { isLoading } = useGetCurrentUserLibraryItems(libraryActiveTab);

    if (isLoading) {
        return VIEW_SKELETONS[libraryView];
    }

    return (
        VIEW_COMPONENTS[libraryView]
    )
}

export default LibraryItems