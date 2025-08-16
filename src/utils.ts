export const getScrollThreshold = (leftPanelSize: number) => {
    if (leftPanelSize >= 7 && leftPanelSize <= 10) return 296;
    if (leftPanelSize >= 32 && leftPanelSize <= 38) return 228;
    return 248;
};
