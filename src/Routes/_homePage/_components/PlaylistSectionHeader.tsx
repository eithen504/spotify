import React from 'react'

interface PlaylistSectionHeaderProps {
    title: string
}

const PlaylistSectionHeader: React.FC<PlaylistSectionHeaderProps> = ({title}) => {
    return (
        <div className={`px-4 md:px-10 flex justify-between items-center pb-2`}>
            <h2 className="text-xl font-bold">{title}</h2>
            <button className="cursor-pointer text-sm text-gray-400 dynamic-text-hover hover:underline flex items-center gap-1 font-bold"
            >
                Show all
            </button>
        </div>
    )
}

export default PlaylistSectionHeader