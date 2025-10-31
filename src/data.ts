import type { SearchDictionary, SearchItemIDMap } from "./types";

const SEARCH_DICTIONARY: SearchDictionary = {
    'A': [
        {
            type: "Album",
            _id: "6902fcf475f6e284ad75380d",
            title: "Alibi",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ee35e37bc21fe929a4d3605"
        },
        {
            type: "Track",
            _id: "6902fdc275f6e284ad753810",
            title: "Alibi",
            artist: "Sevdaliza",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ee35e37bc21fe929a4d3605"
        },
        {
            type: "Album",
            _id: "6903010b75f6e284ad75384b",
            title: "AM",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163"
        },
    ],
    'B': [
        {
            type: "Album",
            _id: "6901b6693a7eaaf084cc5445",
            title: "Bella Ciao",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273f3c7e4934b8dd9eedf69e6e5"
        },
        {
            type: "Track",
            _id: "6901b7c23a7eaaf084cc5466",
            title: "Bella Ciao",
            artist: "Manu Pilas",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273f3c7e4934b8dd9eedf69e6e5"
        },
        {
            type: "Album",
            _id: "6902f6ee75f6e284ad7537e9",
            title: "Bilionera",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273286e9f11e562c399bf2f9abc"
        },
        {
            type: "Track",
            _id: "6902f9f475f6e284ad7537f6",
            title: "Bilionera",
            artist: "Otilia",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273286e9f11e562c399bf2f9abc"
        },
        {
            type: "Album",
            _id: "6903086275f6e284ad7538ea",
            title: "Blue",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273373c63a4666fb7193febc167"
        },
        {
            type: "Track",
            _id: "690309fa75f6e284ad7538f7",
            title: "Blue",
            artist: "Yung Kai",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273373c63a4666fb7193febc167"
        },
    ],
    'C': [
        {
            type: "Track",
            _id: "6901b5743a7eaaf084cc5438",
            title: "Come Vorrei",
            artist: "Ricchi E Poveri",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273190c74ba8e7c58042301029f"
        }
    ],
    'D': [
        {
            type: "Track",
            _id: "6900b04e6a73d0f167c9e021",
            title: "Dernière danse",
            artist: "Indila",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ae8ff731c49965bf2083405"
        },
        {
            type: "Album",
            _id: "6901c1363a7eaaf084cc54d5",
            title: "Drive Forever",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b27395b1157b71c2916bf2d10968"
        },
        {
            type: "Track",
            _id: "6901c1cc3a7eaaf084cc54d8",
            title: "Drive Forever",
            artist: "T3NZU",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b27395b1157b71c2916bf2d10968"
        }
    ],
    'E': [
        {
            type: "Album",
            _id: "6901b3b23a7eaaf084cc541e",
            title: "...E Penso A Te",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273190c74ba8e7c58042301029f"
        },
    ],
    'F': [],
    'G': [],
    'H': [],
    'I': [
        {
            type: "Album",
            _id: "6901e0784ce8ee780a08fdeb",
            title: "Ievan Polkka",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b27367f831e320f57748d557399e"
        },
        {
            type: "Track",
            _id: "6901e510dab119c8545b4314",
            title: "Ievan Polkka",
            artist: "Riikka",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b27367f831e320f57748d557399e"
        },
        {
            type: "Track",
            _id: "6903032075f6e284ad75388b",
            title: "I Wanna Be Yours",
            artist: "Arctic Monkeys",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163"
        },
    ],
    'J': [],
    'K': [
        {
            type: "Album",
            _id: "6901bc733a7eaaf084cc54a7",
            title: "Kамин",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273870c1c64b1d77eb4456e4283"
        },
        {
            type: "Track",
            _id: "6901bd663a7eaaf084cc54b4",
            title: "Kамин",
            artist: "Emin, Jony",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273870c1c64b1d77eb4456e4283"
        }
    ],
    'L': [
        {
            type: "Track",
            _id: "6900c0ce438abe2747b0b7c1",
            title: "Love Story",
            artist: "Indila",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ae8ff731c49965bf2083405"
        }
    ],
    'M': [
        {
            type: "Album",
            _id: "6900abbf3b6cc7c828bbb1fd",
            title: "Mini World",
            artist: "Ricchi E Poveri",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273190c74ba8e7c58042301029f"
        },
        {
            type: "Album",
            _id: "6901db684ce8ee780a08fdc7",
            title: "Mатушка",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b27366d1cde681f3dc3b8fea37e1"
        },
        {
            type: "Track",
            _id: "6901dd7e4ce8ee780a08fdd4",
            title: "Mатушка",
            artist: "Татьяна Куртукова",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b27366d1cde681f3dc3b8fea37e1"
        },
        {
            type: "Album",
            _id: "690303af75f6e284ad753898",
            title: "METAMORPHOSIS",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273b852a616ae3a49a1f6b0f16e"
        },
        {
            type: "Track",
            _id: "6903047675f6e284ad7538a5",
            title: "METAMORPHOSIS",
            artist: "Interworld",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273b852a616ae3a49a1f6b0f16e"
        },
    ],
    'N': [],
    'O': [],
    'P': [
        {
            type: "Album",
            _id: "6902ff5375f6e284ad75381d",
            title: "PASSO BEM SOLTO",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273c9f7eb9e832dfd6c00dbac8b"
        },
        {
            type: "Track",
            _id: "6903001d75f6e284ad753834",
            title: "PASSO BEM SOLTO",
            artist: "ATLXS",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273c9f7eb9e832dfd6c00dbac8b"
        },
        {
            type: "Album",
            _id: "690305e475f6e284ad7538bc",
            title: "Parano (feat. DDB)",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ed8d5518d5c094dd1256381"
        },
        {
            type: "Track",
            _id: "6903074775f6e284ad7538dd",
            title: "Parano (feat. DDB)",
            artist: "фрози, DDB",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ed8d5518d5c094dd1256381"
        },
    ],
    'Q': [],
    'R': [],
    'S': [
        {
            type: "Track",
            _id: "6901b4a33a7eaaf084cc5421",
            title: "Sarà Perché Ti Amo",
            artist: "Ricchi E Poveri ",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273190c74ba8e7c58042301029f"
        }
    ],
    'T': [
        {
            type: "Track",
            _id: "6900b90f438abe2747b0b7a0",
            title: "Tourner Dans Le Vide",
            artist: "Indila",
            coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ae8ff731c49965bf2083405"
        }
    ],
    'U': [],
    'V': [],
    'W': [],
    'X': [],
    'Y': [],
    'Z': []
};

const SEARCH_ITEM_ID_MAP: SearchItemIDMap = {
    "6902fcf475f6e284ad75380d": {
        type: "Album",
        _id: "6902fcf475f6e284ad75380d",
        title: "Alibi",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ee35e37bc21fe929a4d3605"
    },
    "6902fdc275f6e284ad753810": {
        type: "Track",
        _id: "6902fdc275f6e284ad753810",
        title: "Alibi",
        artist: "Sevdaliza",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ee35e37bc21fe929a4d3605"
    },
    "6903010b75f6e284ad75384b": {
        type: "Album",
        _id: "6903010b75f6e284ad75384b",
        title: "AM",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163"
    },
    "6901b6693a7eaaf084cc5445": {
        type: "Album",
        _id: "6901b6693a7eaaf084cc5445",
        title: "Bella Ciao",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273f3c7e4934b8dd9eedf69e6e5"
    },
    "6901b7c23a7eaaf084cc5466": {
        type: "Track",
        _id: "6901b7c23a7eaaf084cc5466",
        title: "Bella Ciao",
        artist: "Manu Pilas",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273f3c7e4934b8dd9eedf69e6e5"
    },
    "6902f6ee75f6e284ad7537e9": {
        type: "Album",
        _id: "6902f6ee75f6e284ad7537e9",
        title: "Bilionera",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273286e9f11e562c399bf2f9abc"
    },
    "6902f9f475f6e284ad7537f6": {
        type: "Track",
        _id: "6902f9f475f6e284ad7537f6",
        title: "Bilionera",
        artist: "Otilia",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273286e9f11e562c399bf2f9abc"
    },
    "6903086275f6e284ad7538ea": {
        type: "Album",
        _id: "6903086275f6e284ad7538ea",
        title: "Blue",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273373c63a4666fb7193febc167"
    },
    "690309fa75f6e284ad7538f7": {
        type: "Track",
        _id: "690309fa75f6e284ad7538f7",
        title: "Blue",
        artist: "Yung Kai",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273373c63a4666fb7193febc167"
    },
    "6901b5743a7eaaf084cc5438": {
        type: "Track",
        _id: "6901b5743a7eaaf084cc5438",
        title: "Come Vorrei",
        artist: "Ricchi E Poveri",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273190c74ba8e7c58042301029f"
    },
    "6900b04e6a73d0f167c9e021": {
        type: "Track",
        _id: "6900b04e6a73d0f167c9e021",
        title: "Dernière danse",
        artist: "Indila",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ae8ff731c49965bf2083405"
    },
    "6901c1363a7eaaf084cc54d5": {
        type: "Album",
        _id: "6901c1363a7eaaf084cc54d5",
        title: "Drive Forever",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b27395b1157b71c2916bf2d10968"
    },
    "6901c1cc3a7eaaf084cc54d8": {
        type: "Track",
        _id: "6901c1cc3a7eaaf084cc54d8",
        title: "Drive Forever",
        artist: "T3NZU",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b27395b1157b71c2916bf2d10968"
    },
    "6901b3b23a7eaaf084cc541e": {
        type: "Album",
        _id: "6901b3b23a7eaaf084cc541e",
        title: "...E Penso A Te",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273190c74ba8e7c58042301029f"
    },
    "6901e0784ce8ee780a08fdeb": {
        type: "Album",
        _id: "6901e0784ce8ee780a08fdeb",
        title: "Ievan Polkka",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b27367f831e320f57748d557399e"
    },
    "6901e510dab119c8545b4314": {
        type: "Track",
        _id: "6901e510dab119c8545b4314",
        title: "Ievan Polkka",
        artist: "Riikka",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b27367f831e320f57748d557399e"
    },
    "6903032075f6e284ad75388b": {
        type: "Track",
        _id: "6903032075f6e284ad75388b",
        title: "I Wanna Be Yours",
        artist: "Arctic Monkeys",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163"
    },
    "6901bc733a7eaaf084cc54a7": {
        type: "Album",
        _id: "6901bc733a7eaaf084cc54a7",
        title: "Kамин",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273870c1c64b1d77eb4456e4283"
    },
    "6901bd663a7eaaf084cc54b4": {
        type: "Track",
        _id: "6901bd663a7eaaf084cc54b4",
        title: "Kамин",
        artist: "Emin, Jony",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273870c1c64b1d77eb4456e4283"
    },
    "6900c0ce438abe2747b0b7c1": {
        type: "Track",
        _id: "6900c0ce438abe2747b0b7c1",
        title: "Love Story",
        artist: "Indila",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ae8ff731c49965bf2083405"
    },
    "6900abbf3b6cc7c828bbb1fd": {
        type: "Album",
        _id: "6900abbf3b6cc7c828bbb1fd",
        title: "Mini World",
        artist: "Ricchi E Poveri",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273190c74ba8e7c58042301029f"
    },
    "6901db684ce8ee780a08fdc7": {
        type: "Album",
        _id: "6901db684ce8ee780a08fdc7",
        title: "Mатушка",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b27366d1cde681f3dc3b8fea37e1"
    },
    "6901dd7e4ce8ee780a08fdd4": {
        type: "Track",
        _id: "6901dd7e4ce8ee780a08fdd4",
        title: "Mатушка",
        artist: "Татьяна Куртукова",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b27366d1cde681f3dc3b8fea37e1"
    },
    "690303af75f6e284ad753898": {
        type: "Album",
        _id: "690303af75f6e284ad753898",
        title: "METAMORPHOSIS",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273b852a616ae3a49a1f6b0f16e"
    },
    "6903047675f6e284ad7538a5": {
        type: "Track",
        _id: "6903047675f6e284ad7538a5",
        title: "METAMORPHOSIS",
        artist: "Interworld",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273b852a616ae3a49a1f6b0f16e"
    },
    "6902ff5375f6e284ad75381d": {
        type: "Album",
        _id: "6902ff5375f6e284ad75381d",
        title: "PASSO BEM SOLTO",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273c9f7eb9e832dfd6c00dbac8b"
    },
    "6903001d75f6e284ad753834": {
        type: "Track",
        _id: "6903001d75f6e284ad753834",
        title: "PASSO BEM SOLTO",
        artist: "ATLXS",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273c9f7eb9e832dfd6c00dbac8b"
    },
    "690305e475f6e284ad7538bc": {
        type: "Album",
        _id: "690305e475f6e284ad7538bc",
        title: "Parano (feat. DDB)",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ed8d5518d5c094dd1256381"
    },
    "6903074775f6e284ad7538dd": {
        type: "Track",
        _id: "6903074775f6e284ad7538dd",
        title: "Parano (feat. DDB)",
        artist: "фрози, DDB",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ed8d5518d5c094dd1256381"
    },
    "6901b4a33a7eaaf084cc5421": {
        type: "Track",
        _id: "6901b4a33a7eaaf084cc5421",
        title: "Sarà Perché Ti Amo",
        artist: "Ricchi E Poveri ",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b273190c74ba8e7c58042301029f"
    },
    "6900b90f438abe2747b0b7a0": {
        type: "Track",
        _id: "6900b90f438abe2747b0b7a0",
        title: "Tourner Dans Le Vide",
        artist: "Indila",
        coverImageUrl: "https://i.scdn.co/image/ab67616d0000b2734ae8ff731c49965bf2083405"
    }

}

export {
    SEARCH_DICTIONARY,
    SEARCH_ITEM_ID_MAP
}