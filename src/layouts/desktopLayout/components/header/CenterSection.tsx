import HomeButton from "./HomeButton";
import SearchBar from "./SearchBar";

const CenterSection = () => {
    return (
        <div className="flex items-center flex-1 gap-3 justify-center">
            {/* Home Button */}
            <HomeButton />

            {/* Search Bar */}
            <SearchBar />
        </div>
    )
}

export default CenterSection