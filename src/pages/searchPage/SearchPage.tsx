import Footer from '../../components/Footer'
import GenreGrid from './component/GenreGrid'
import SearchBar from './component/SearchBar'

const SearchPage = () => {
    return (
        <div className="min-h-screen text-white max-w-[90rem] mx-auto">
            {/* Search Bar */}
            <SearchBar />

            {/* Genre Grid */}
            <GenreGrid />

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default SearchPage