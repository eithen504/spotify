import { LIBRARY_TABS, LIBRARY_VIEWS, SEARCH_ITEM_TYPES } from "./constants";

function isValidSearchItem(obj: any) {
    return (
        obj &&
        typeof obj === "object" &&
        SEARCH_ITEM_TYPES.includes(obj.type) &&
        typeof obj._id === "string" &&
        typeof obj.title === "string" &&
        (typeof obj.artist === "string" || obj.artist === undefined) &&
        (typeof obj.coverImageUrl === "string" || obj.coverImageUrl === undefined)
    );
}

function validateAlbumTableColumns(obj: any) {
    return (
        obj &&
        typeof obj === "object" &&

        obj.INDEX &&
        typeof obj.INDEX === "object" &&
        typeof obj.INDEX.visible === "boolean" &&

        obj.TITLE &&
        typeof obj.TITLE === "object" &&
        typeof obj.TITLE.visible === "boolean" &&

        obj.ARTIST &&
        typeof obj.ARTIST === "object" &&
        typeof obj.ARTIST.visible === "boolean" &&

        obj.DURATION &&
        typeof obj.DURATION === "object" &&
        typeof obj.DURATION.visible === "boolean"
    );
}

function validatePlaylistTableColumns(obj: any) {
    return (
        obj &&
        typeof obj === "object" &&

        obj.INDEX &&
        typeof obj.INDEX === "object" &&
        typeof obj.INDEX.visible === "boolean" &&

        obj.TITLE &&
        typeof obj.TITLE === "object" &&
        typeof obj.TITLE.visible === "boolean" &&

        obj.ARTIST &&
        typeof obj.ARTIST === "object" &&
        typeof obj.ARTIST.visible === "boolean" &&

        obj.ALBUM &&
        typeof obj.ALBUM === "object" &&
        typeof obj.ALBUM.visible === "boolean" &&

        obj["DATE ADDED"] &&
        typeof obj["DATE ADDED"] === "object" &&
        typeof obj["DATE ADDED"].visible === "boolean" &&

        obj.DURATION &&
        typeof obj.DURATION === "object" &&
        typeof obj.DURATION.visible === "boolean"
    );
}

function validateOpenedFolder(obj: any) {
    return (
        obj &&
        typeof obj === "object" &&

        typeof obj.id === "string" &&

        typeof obj.name === "string"
    );
}

function validateLeftSidebar(obj: any) {
    return (
        obj &&
        typeof obj === "object" &&

        typeof obj.panelSize === "number" &&

        typeof obj.isExpanded === "boolean"
    );
}

function validateLibrary(obj: any) {
    return (
        obj &&
        typeof obj === "object" &&

        typeof obj.activeTab === "string" &&
        LIBRARY_TABS.includes(obj.activeTab) &&

        typeof obj.sort === "string" &&
        LIBRARY_VIEWS.includes(obj.sort) &&

        typeof obj.view === "string" &&
        LIBRARY_VIEWS.includes(obj.view)
    );
}

function validateRightSidebar(obj: any) {
    return (
        obj &&
        typeof obj === "object" &&

        typeof obj.panelSize === "number" &&

        typeof obj.showNowPlayingView === "boolean" &&

        typeof obj.showQueueView === "boolean" &&

        typeof obj.isNowPlayingViewExpanded === "boolean" &&

        typeof obj.isNowPlayingViewFullScreen === "boolean"
    );
}

function validateSystemVolume(obj: any) {
    return (
        obj && 
        Array.isArray(obj) && 

        obj.length == 1 && 
        typeof obj[0] == "number"
    )
}

export {
    isValidSearchItem,
    validateAlbumTableColumns,
    validatePlaylistTableColumns,
    validateOpenedFolder,
    validateLeftSidebar,
    validateLibrary,
    validateRightSidebar,
    validateSystemVolume
}