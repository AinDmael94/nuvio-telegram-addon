const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Enable CORS (Wajib untuk Nuvio/Stremio)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Data Senarai 35 Episod (Menggunakan pautan direct /dl/ untuk streaming)
const episodes = [
    {
        id: "daryz_tj_s01e08",
        title: "Tom & Jerry - S01E08 (Fine Feathered Friend)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4506e979983cdce5ad0"
    },
    {
        id: "daryz_tj_s01e16",
        title: "Tom & Jerry - S01E16 (Puttin' On The Dog)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4876e979983cdce5ad8"
    },
    {
        id: "daryz_tj_s01e10",
        title: "Tom & Jerry - S01E10 (The Lonesome Mouse)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4506e979983cdce5ad2"
    },
    {
        id: "daryz_tj_s01e14",
        title: "Tom & Jerry - S01E14 (The Million Dollar Cat)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc45c6e979983cdce5ad6"
    },
    {
        id: "daryz_tj_s01e09",
        title: "Tom & Jerry - S01E09 (Sufferin' Cats!)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4506e979983cdce5ad1"
    },
    {
        id: "daryz_tj_s01e15",
        title: "Tom & Jerry - S01E15 (The Bodyguard)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc45c6e979983cdce5ad7"
    },
    {
        id: "daryz_tj_s01e13",
        title: "Tom & Jerry - S01E13 (The Zoot Cat)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc45b6e979983cdce5ad5"
    },
    {
        id: "daryz_tj_s01e17",
        title: "Tom & Jerry - S01E17 (Mouse Trouble)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48d6e979983cdce5ad9"
    },
    {
        id: "daryz_tj_s01e19",
        title: "Tom & Jerry - S01E19 (Mouse In Manhattan)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48e6e979983cdce5ada"
    },
    {
        id: "daryz_tj_s01e22",
        title: "Tom & Jerry - S01E22 (Quiet Please!)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4926e979983cdce5ade"
    },
    {
        id: "daryz_tj_s01e21",
        title: "Tom & Jerry - S01E21 (Flirty Birdy)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4926e979983cdce5add"
    },
    {
        id: "daryz_tj_s01e23",
        title: "Tom & Jerry - S01E23 (Springtime For Thomas)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4936e979983cdce5adf"
    },
    {
        id: "daryz_tj_s01e18",
        title: "Tom & Jerry - S01E18 (The Mouse Comes To Dinner)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48f6e979983cdce5adc"
    },
    {
        id: "daryz_tj_s01e24",
        title: "Tom & Jerry - S01E24 (The Milky Waif)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4986e979983cdce5ae0"
    },
    {
        id: "daryz_tj_s01e20",
        title: "Tom & Jerry - S01E20 (Tee For Two)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48f6e979983cdce5adb"
    },
    {
        id: "daryz_tj_s01e25",
        title: "Tom & Jerry - S01E25 (Trap Happy)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4c36e979983cdce5ae1"
    },
    {
        id: "daryz_tj_s02e01",
        title: "Tom & Jerry - S02E01 (Solid Serenade)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4c36e979983cdce5ae2"
    },
    {
        id: "daryz_tj_s02e02",
        title: "Tom & Jerry - S02E02 (Cat Fishin')",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4c86e979983cdce5ae3"
    },
    {
        id: "daryz_tj_s02e03",
        title: "Tom & Jerry - S02E03 (Part Time Pal)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae4"
    },
    {
        id: "daryz_tj_s02e04",
        title: "Tom & Jerry - S02E04 (The Cat Concerto)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae5"
    },
    {
        id: "daryz_tj_s02e09",
        title: "Tom & Jerry - S02E09 (Kitty Foiled)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4d96e979983cdce5aea"
    },
    {
        id: "daryz_tj_s02e05",
        title: "Tom & Jerry - S02E05 (Dr Jekyll and Mr Mouse)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae6"
    },
    {
        id: "daryz_tj_s02e06",
        title: "Tom & Jerry - S02E06 (Salt Water Tabby)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae7"
    },
    {
        id: "daryz_tj_s02e07",
        title: "Tom & Jerry - S02E07 (A Mouse In The House)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cf6e979983cdce5ae8"
    },
    {
        id: "daryz_tj_s02e08",
        title: "Tom & Jerry - S02E08 (The Invisible Mouse)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4d36e979983cdce5ae9"
    },
    {
        id: "daryz_tj_s02e11",
        title: "Tom & Jerry - S02E11 (Old Rockin' Chair Tom)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5036e979983cdce5aec"
    },
    {
        id: "daryz_tj_s02e12",
        title: "Tom & Jerry - S02E12 (Professor Tom)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5056e979983cdce5aed"
    },
    {
        id: "daryz_tj_s02e13",
        title: "Tom & Jerry - S02E13 (Mouse Cleaning)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5056e979983cdce5aee"
    },
    {
        id: "daryz_tj_s02e15",
        title: "Tom & Jerry - S02E15 (The Little Orphan)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5096e979983cdce5af0"
    },
    {
        id: "daryz_tj_s02e16",
        title: "Tom & Jerry - S02E16 (Hatch Up Your Troubles)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc50a6e979983cdce5af1"
    },
    {
        id: "daryz_tj_s02e14",
        title: "Tom & Jerry - S02E14 (Polka Dot Puss)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5056e979983cdce5aef"
    },
    {
        id: "daryz_tj_s02e19",
        title: "Tom & Jerry - S02E19 (Love That Pup)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5136e979983cdce5af4"
    },
    {
        id: "daryz_tj_s02e10",
        title: "Tom & Jerry - S02E10 (The Truce Hurts)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4d96e979983cdce5aeb"
    },
    {
        id: "daryz_tj_s02e17",
        title: "Tom & Jerry - S02E17 (Heavenly Puss)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc50e6e979983cdce5af2"
    },
    {
        id: "daryz_tj_s02e20",
        title: "Tom & Jerry - S02E20 (Jerry's Diary)",
        streamUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5136e979983cdce5af5"
    }
];

// 1. MANIFEST ENDPOINT
app.get('/manifest.json', (req, res) => {
    res.json({
        id: "org.daryzstream.animeanimation",
        version: "1.0.2",
        name: "Anime & Animation",
        description: "Koleksi Animasi Klasik Tom & Jerry melalui DaRyzStream",
        resources: ["catalog", "meta", "stream"],
        types: ["series", "movie", "anime"],
        catalogs: [
            {
                type: "series",
                id: "anime_animation_catalog",
                name: "Anime & Animation"
            }
        ],
        idPrefixes: ["daryz_"]
    });
});

// 2. CATALOG ENDPOINT
app.get('/catalog/:type/:id.json', (req, res) => {
    const metas = episodes.map(ep => ({
        id: ep.id,
        type: req.params.type || "series",
        name: ep.title,
        poster: "https://i.postimg.cc/Gm5JwFbK/Tom-And-Jerry.jpg",
        description: `Stream ${ep.title} di Nuvio`
    }));

    res.json({ metas });
});

// 3. META ENDPOINT
app.get('/meta/:type/:id.json', (req, res) => {
    const epId = req.params.id;
    const episode = episodes.find(e => e.id === epId);

    if (episode) {
        res.json({
            meta: {
                id: episode.id,
                type: req.params.type || "series",
                name: episode.title,
                poster: "https://i.postimg.cc/Gm5JwFbK/Tom-And-Jerry.jpg",
                description: `Koleksi Tom & Jerry - ${episode.title}`,
                genres: ["Animation", "Classic"]
            }
        });
    } else {
        res.status(404).json({ error: "Not found" });
    }
});

// 4. STREAM ENDPOINT (Menggunakan pautan direct /dl/ dengan maklumat fail)
app.get('/stream/:type/:id.json', (req, res) => {
    const epId = req.params.id;
    const episode = episodes.find(e => e.id === epId);

    if (episode) {
        res.json({
            streams: [
                {
                    name: "DaRyzStream",
                    title: `1080p - ${episode.title}`,
                    url: episode.streamUrl,
                    behaviorHints: {
                        notResponseLocation: true
                    }
                }
            ]
        });
    } else {
        res.json({ streams: [] });
    }
});

// Fallback Route
app.get('/', (req, res) => {
    res.json({
        addon: "Anime & Animation Nuvio Add-on",
        status: "Online",
        manifest: "/manifest.json"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
