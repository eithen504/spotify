const useShare = () => {
    const isSupported = !!navigator.share;

    const share = async (url: string) => {
        if (!isSupported) {
            alert("Sharing not supported on this browser.");
            return;
        }

        try {
            await navigator.share({
                title: "Check this out!",
                text: "I found something interesting for you.",
                url,
            });
            console.log("Shared successfully");
        } catch (error) {
            console.error("Share failed:", error);
        }
    }

    return { share, isSupported };
};

export {
    useShare
}
