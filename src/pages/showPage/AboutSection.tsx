import { useState } from "react";

const AboutSection = () => {
    const [showMore, setShowMore] = useState(false);
    const maxLength = 220; // characters to show before truncating

    const fullText = `
        Asli Akhada is your #1 destination for all wrestling (WWE, AEW & other promotions) breaking news, 
        PPV reviews, guest & fan interviews. Wrestle Chatter & Wrestle India (on YouTube) have come together 
        to create the first ever podcast for Indian wrestling fans.
    
        Baat hogi aapke favourite superstars jaise Roman Reigns, John Cena, Brock Lesnar, Seth Rollins, 
        Chris Jericho, Jon Moxley etc. ke baare me. Follow Asli Akhada and never miss a new episode.
      `.replace(/\s+/g, ' ').trim(); // normalize spaces

    const shouldTruncate = fullText.length > maxLength;
    const displayedText = showMore || !shouldTruncate ? fullText : fullText.slice(0, maxLength) + '...';

    return (
        <div className="text-white p-4 md:p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">About</h2>
            <p className="text-sm text-gray-300 whitespace-pre-wrap">{displayedText}</p>
            {shouldTruncate && (
                <button
                    className="text-md font-bold text-white mt-2 cursor-pointer"
                    onClick={() => setShowMore(!showMore)}
                >
                    {showMore ? 'Show less' : '...Show more'}
                </button>
            )}
        </div>
    )
}

export default AboutSection