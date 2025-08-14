import { useScrollStore } from '../../store/useScrollStore';
import TabsSection from './_components/TabsSection';
import RecentItems from './_components/RecentItems';
import PlaylistSectionHeader from './_components/PlaylistSectionHeader';
import PlaylistSectionItems from './_components/PlaylistSectionItems';
import Footer from '../../components/ui/footer';

const HomePage = () => {
    const { isScrolled } = useScrollStore();

    return (
        <div className="relative text-white min-h-screen">
            <div
                className="w-full absolute inset-0 z-0 h-[700px]"
                style={{
                    height: '250px',
                    opacity: 1,
                    backgroundImage: `linear-gradient(to bottom, #2D2453, #121212)`
                }}
            />

            {/* Tabs Section */}
            <TabsSection isScrolled={isScrolled} />

            {/* Recent Items */}
            <RecentItems />

            {
                [1, 2, 3].map((_) => (
                    <div className="pt-7 md:pt-10 relative max-w-[90rem] mx-auto">
                        {/* PlaylistSection Header */}
                        <PlaylistSectionHeader title="Good Morning" />

                        {/* PlaylistSection Items */}
                        <PlaylistSectionItems />
                    </div>
                ))
            }

            <Footer/>
        </div>
    )
}

export default HomePage