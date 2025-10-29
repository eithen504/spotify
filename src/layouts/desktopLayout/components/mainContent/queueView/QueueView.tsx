import React, { useEffect, useRef, useState } from 'react'
import Header from './Header';
import NowPlayingSection from './NowPlayingSection';
import { useQueueStore } from '../../../../../store/useQueueStore';
import NextInQueueCustom from './NextInQueueCustom';
import NextInQueueEntity from './NextInQueueEntity';
import { NotFoundQueueItems } from '../../../../../components/NotFounds';
import { useTrackDetailsStore } from '../../../../../store/useTrackDetailsStore';

interface QueueViewProps {
    rightPanelSize: number;
}

const QueueView: React.FC<QueueViewProps> = ({ rightPanelSize }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const { customQueue, entityQueue, activeEntityQueueListNode } = useQueueStore();

    const { trackDetails } = useTrackDetailsStore();

    const isCustomQueueEmpty = !customQueue.head.next?.value;
    const isEntityQueueEmpty = !entityQueue.head.next?.value
    const hasNextEntityQueueItem = activeEntityQueueListNode?.next?.value;
    const isQueueEmpty = isCustomQueueEmpty && isEntityQueueEmpty;

    useEffect(() => {
        const sidebarEl = sidebarRef.current
        if (!sidebarEl) return

        const handleScroll = () => {
            if (sidebarEl.scrollTop > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        sidebarEl.addEventListener('scroll', handleScroll)

        return () => {
            sidebarEl.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <aside
            className="hidden lg:flex bg-[#121212] text-[#ffffff] relative h-full flex-col overflow-y-auto hide-scrollbar"
            style={{ width: `${rightPanelSize}%` }}
            ref={sidebarRef}
        >
            {/* Fixed header section */}
            <Header isScrolled={isScrolled} />

            {
                isQueueEmpty ? (
                    <NotFoundQueueItems />
                ) : (
                    <div className="flex-1 p-0">
                        {/* Now Playing Section */}
                        {
                            trackDetails._id && <NowPlayingSection />
                        }

                        {/* Next In Queue By User */}
                        {
                            !isCustomQueueEmpty && <NextInQueueCustom />
                        }

                        {/* Next In Queue By Entity */}
                        {
                            hasNextEntityQueueItem && <NextInQueueEntity />
                        }
                    </div>
                )
            }
        </aside>
    )
}

export default QueueView 