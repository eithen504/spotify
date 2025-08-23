import { useState } from "react";

const DescriptionSection = () => {
    const [showMore, setShowMore] = useState(false);

    const Description = `
     Asli Akhada is your #1 destination for all wrestling (WWE, AEW & other promotions) 
     breaking news, PPV reviews, guest & fan interviews. Wrestle Chatter & Wrestle India (on Yo)
     Asli Akhada is your #1 destination for all wrestling (WWE, AEW & other promotions) 
     breaking news, PPV reviews, guest & fan interviews. Wrestle ChaAsli Akhada is your #1 destination for all wrestling (WWE, AEW & other promotions) 
     breaking news, PPV reviews, guest & fan interviews. Wrestle ChaAsli Akhada is your #1 destination for all wrestling (WWE, AEW & other promotions) 
     breaking news, PPV reviews, guest & fan interviews. Wrestle ChaAsli Akhada is your #1 destination for all wrestling (WWE, AEW & other promotions) 
     breaking news, PPV reviews, guest & fan interviews. Wrestle ChaAsli Akhada is your #1 destination for all wrestling (WWE, AEW & other promotions) 
     breaking news, PPV reviews, guest & fan interviews. Wrestle Cha
    `;

    return (
        <div className="mb-4 px-4 md:px-6 mt-4">
            <h2 className="text-2xl font-bold mb-4">Description</h2>

            <p className={`text-[#d1d5dc] leading-relaxed ${showMore ? "" : "line-clamp-3"}`}>
                {Description}
            </p>
            <button
                onClick={() => setShowMore(!showMore)}
                className="text-[#ffffff] mt-2 cursor-pointer font-bold text-md"
            >
                {showMore ? "Show less" : "... Show more"}
            </button>
        </div>
    )
}

export default DescriptionSection