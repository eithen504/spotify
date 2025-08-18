const items = [
    {
        title: "Blinding Lights",
        img: "https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36",
        album: "After Hours",
        dateAdded: "2020-03-20",
        artist: "The Weeknd"
    },
    {
        title: "Shape of You",
        img: "https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png",
        album: "÷ (Divide)",
        dateAdded: "2017-01-06",
        artist: "Ed Sheeran"
    },
    {
        title: "Levitating",
        img: "https://i.scdn.co/image/ab67616d0000b2734bc66095f8a70bc4e6593f4f",
        album: "Future Nostalgia",
        dateAdded: "2020-03-27",
        artist: "Dua Lipa"
    },
    {
        title: "Stay",
        img: "https://upload.wikimedia.org/wikipedia/en/0/0c/The_Kid_Laroi_and_Justin_Bieber_-_Stay.png",
        album: "Stay (Single)",
        dateAdded: "2021-07-09",
        artist: "The Kid LAROI, Justin Bieber"
    },
    {
        title: "Uptown Funk",
        img: "https://images.genius.com/82f198169cce34c7e52880cce45d28de.1000x1000x1.png",
        album: "Uptown Special",
        dateAdded: "2014-11-10",
        artist: "Mark Ronson, Bruno Mars"
    },
    {
        title: "Someone Like You",
        img: "https://i.scdn.co/image/ab67616d0000b273744ea41a7c1ae57024752db9",
        album: "21",
        dateAdded: "2011-01-24",
        artist: "Adele"
    },
    {
        title: "Despacito",
        img: "https://upload.wikimedia.org/wikipedia/en/c/c8/Luis_Fonsi_Feat._Daddy_Yankee_-_Despacito_%28Official_Single_Cover%29.png",
        album: "Vida",
        dateAdded: "2017-01-13",
        artist: "Luis Fonsi, Daddy Yankee"
    },
    {
        title: "Bad Guy",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4qlyaUVhFANIh-drof0fu9wyLf3V4I3sE5A&s",
        album: "When We All Fall Asleep, Where Do We Go?",
        dateAdded: "2019-03-29",
        artist: "Billie Eilish"
    },
    {
        title: "Rolling in the Deep",
        img: "https://images.genius.com/a9fa6bfb946e5ecde0d63fe20073d5c7.1000x1000x1.png",
        album: "21",
        dateAdded: "2010-11-29",
        artist: "Adele"
    },
    {
        title: "Señorita",
        img: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Shawn_Mendes_and_Camila_Cabello_-_Se%C3%B1orita.png",
        album: "Señorita (Single)",
        dateAdded: "2019-06-21",
        artist: "Shawn Mendes, Camila Cabello"
    }
];

const NextInQueueSection = () => {
    return (
        <div className="px-2 pt-4 pb-4">
            <h2 className="text-white text-md font-bold p-2">Next In Queue</h2>

            <div className="space-y-0">
                {items.map((item, idx) => (
                    <div key={idx} className="cursor-pointer flex items-center space-x-3 hover:bg-[#1F1F1F] p-2 rounded-sm">
                        <img
                            src={item.img}
                            alt={item.title}
                            className="w-12 h-12 flex-shrink-0 object-cover rounded-[4px]"
                        />

                        <div className="overflow-hidden">
                            <p className="text-md font-medium truncate">
                                {item.title}
                            </p>
                            <p className="text-sm text-white/70 truncate">
                                {item.artist}
                            </p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NextInQueueSection