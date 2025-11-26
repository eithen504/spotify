import type React from "react";
import { Drawer, DrawerContent } from "../../../../../components/ui/drawer";
import Header from "./Header";
import NowPlayingSection from "./NowPlayingSection";
import { useQueueStore } from "../../../../../store/useQueueStore";
import NextInQueueCustom from "./NextInQueueCustom";
import NextInQueueEntity from "./NextInQueueEntity";
import BottomActions from "./BottomActions";

type QueueDrawerProps = {
  onClose: () => void;
}

const QueueDrawer: React.FC<QueueDrawerProps> = ({ onClose }) => {
  const { customQueue, activeEntityQueueListNode } = useQueueStore();

  /* ---------- Derived Values ---------- */
  const isCustomQueueEmpty = !customQueue.head.next?.value;
  const hasNextEntityQueueItem = activeEntityQueueListNode?.next?.value;

  return (
    <Drawer open={true} onClose={onClose}>
      <DrawerContent
        className="bg-[#282828] rounded-t-2xl z-1000 w-full"
        style={{ height: "100%" }}
        shouldShowDragHandle={true}
      >
        <div className="overflow-y-auto pb-24">
          {/* Header */}
          <Header onClose={onClose} />

          <div className="flex-1 p-0">
            {/* Now Playing Section */}
            <NowPlayingSection />

            {/* Next In Queue By User */}
            {!isCustomQueueEmpty && <NextInQueueCustom />}

            {/* Next In Queue By Entity */}
            {hasNextEntityQueueItem && <NextInQueueEntity />}
          </div>
        </div>

        {/* Bottom Actions */}
        <BottomActions />

      </DrawerContent>
    </Drawer>

  )
}

export default QueueDrawer