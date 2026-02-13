import { create } from "zustand";
import type { Track } from "../types";

type EntityType = "Playlist" | "Album";

class ListNode {
    value: Track | null; // null for dummy nodes
    next: ListNode | null;
    prev: ListNode | null;

    constructor(value: Track | null = null) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    head: ListNode;
    tail: ListNode;
    length: number;

    constructor() {
        // Create dummy head and tail
        this.head = new ListNode(null);
        this.tail = new ListNode(null);

        // Link them together
        this.head.next = this.tail;
        this.tail.prev = this.head;

        this.length = 0;
    }

    append(item: Track, entityType: EntityType, entityId: string) {
        const id = `${entityType}-${entityId}-${item._id}`;
        const newListNode = new ListNode({ ...item, _id: id });

        const prevListNode = this.tail.prev!; // always exists (head at least)
        prevListNode.next = newListNode;
        newListNode.prev = prevListNode;

        newListNode.next = this.tail;
        this.tail.prev = newListNode;

        this.length++;
    }
}

interface QueueStore {
    customQueue: DoublyLinkedList;
    entityQueue: DoublyLinkedList;
    queueMap: Record<string, ListNode>;
    activeEntityQueueListNode: ListNode | null;
    entityId: string;
    entityName: string;
    initializeEntityQueue: (items: Track[], entityType: EntityType, entityId: string, entityName: string) => void;
    addItemsToCustomQueue: (item: Track[], entityType: EntityType, entityId: string) => void;
    insertAfterActiveEntityListNode: (listNode: ListNode) => void;
    removeItemFromQueue: (entityType: EntityType, entityId: string, trackId: string) => void;
    setActiveEntityQueueListNode: (entityType: EntityType, entityId: string, trackId: string) => void;
    clearCustomQueue: () => void;
}

export const useQueueStore = create<QueueStore>((set, get) => ({
    customQueue: new DoublyLinkedList(),
    entityQueue: new DoublyLinkedList(),
    queueMap: {},
    activeEntityQueueListNode: null,
    entityId: "",
    entityName: "",
    initializeEntityQueue: (items, entityType, entityId, entityName) => {
        const { customQueue } = get();
        const newEntityQueue = new DoublyLinkedList();
        let newQueueMap: Record<string, ListNode> = {};

        for (const item of items) {
            newEntityQueue.append(item, entityType, entityId);
            const id = `${entityType}-${entityId}-${item._id}`;
            newQueueMap = {
                ...newQueueMap,
                [id]: newEntityQueue.tail.prev!
            }
        }

        // for custom queue
        let current = customQueue.head.next; // h -> 1 -> 2 -> t
        while (current != null) {
            const nextNode = current.next;
            const prevNode = current.prev;

            if (current.value) {
                if (!newQueueMap[current.value._id]) {
                    newQueueMap = {
                        ...newQueueMap,
                        [current.value._id]: current
                    }
                } else {
                    prevNode!.next = nextNode;
                    nextNode!.prev = prevNode;

                    current.next = null;
                    current.prev = null;
                }
            }
            current = nextNode;
        }

        set((state) => ({
            ...state,
            entityQueue: newEntityQueue,
            queueMap: newQueueMap,
            activeEntityQueueListNode: newEntityQueue.head.next,
            entityId,
            entityName
        }));
    },

    addItemsToCustomQueue: (items, entityType, entityId) => {
        const { customQueue, queueMap } = get();
        let newQueueMap = queueMap;

        for (const item of items) {
            const id = `${entityType}-${entityId}-${item._id}`;
            const existItem = queueMap[id];
            if (!existItem) {
                customQueue.append(item, entityType, entityId);
                newQueueMap = {
                    ...newQueueMap,
                    [id]: customQueue.tail.prev!
                }
            }
        }

        set((state) => ({
            ...state,
            queueMap: newQueueMap
        }));
    },

    insertAfterActiveEntityListNode: (listNode) => {
        // [h] -><- [1] -><- [2] -><- [t]
        // [h] -><- [1] -><- [2] -><- [t]
        const { customQueue, entityQueue, activeEntityQueueListNode } = get();

        if (!activeEntityQueueListNode) return;

        const temp = listNode.next;

        const nextListNode = activeEntityQueueListNode.next;
        activeEntityQueueListNode.next = listNode;
        listNode.prev = activeEntityQueueListNode;
        listNode.next = nextListNode;
        nextListNode!.prev = listNode;

        // removing the refernce 
        customQueue.head.next = temp;
        temp!.prev = customQueue.head;

        customQueue.length--;
        entityQueue.length++;

        set((state) => {
            return {
                ...state,
            };
        });
    },

    removeItemFromQueue: (entityType, entityId, trackId) => {
        const { entityQueue, queueMap } = get();
        const id = `${entityType}-${entityId}-${trackId}`;

        const listNodeToDelete = queueMap[id];
        if (!listNodeToDelete) return;

        const prevNode = listNodeToDelete.prev;
        const nextNode = listNodeToDelete.next;

        if (prevNode) prevNode.next = nextNode;
        if (nextNode) nextNode.prev = prevNode;

        listNodeToDelete.next = null;
        listNodeToDelete.prev = null;

        entityQueue.length--;

        const newQueueMap = { ...queueMap };
        delete newQueueMap[id];

        set((state) => ({
            ...state,
            queueMap: newQueueMap,
        }));
    },

    setActiveEntityQueueListNode: (entityType, entityId, trackId) => {
        const { queueMap, entityQueue } = get();
        const id = `${entityType}-${entityId}-${trackId}`;

        const newActiveListNode = queueMap[id];

        console.log(
            "new", entityQueue
        );

        if (!newActiveListNode) return;

        set((state) => ({
            ...state,
            activeEntityQueueListNode: newActiveListNode
        }))
    },

    clearCustomQueue: () => {
        const newQueue = new DoublyLinkedList();

        set((state) => ({
            ...state,
            customQueue: newQueue
        }));
    }

}));

