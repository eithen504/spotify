function useIsTouchScreen() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export default useIsTouchScreen;