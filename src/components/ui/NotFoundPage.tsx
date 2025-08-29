import type React from "react"
import { AlertIcon } from "../../Svgs"

interface NotFoundPageProps {
    title: string
    subtitle?: string
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ title, subtitle }) => {
    return (
        <div className="flex items-center justify-center h-screen md:h-full">
            <div className="text-center space-y-4">
                {/* Icon */}
                <div className="flex items-center justify-center mx-auto text-white">
                    <AlertIcon width="70" height="70" />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold">{title}</h1>

                {/* Subtitle */}
                <p className="text-gray-200">{subtitle || "Search for something else?"}</p>
            </div>
        </div>
    )
}

export default NotFoundPage