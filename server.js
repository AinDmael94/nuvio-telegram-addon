\const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// ID Utama Siri
const SERIES_ID = "daryz_tj_series";

// Data Meta Siri Utama (Akan terpapar sebagai Poster Movie/Series dalam Nuvio)
const seriesMeta = {
    id: SERIES_ID,
    type: "series",
    name: "Tom & Jerry (1940)",
    poster: "https://i.postimg.cc/Gm5JwFbK/Tom-And-Jerry.jpg",
    background: "https://i.postimg.cc/Gm5JwFbK/Tom-And-Jerry.jpg",
    description: "Koleksi episod klasik Tom & Jerry (1940) daripada DaRyzStream.",
    genres: ["Animation", "Comedy", "Family"]
};

// Map Episod: Key format "SERIES_ID:SEASON:EPISODE"
const streamsData = {
    [`${SERIES_ID}:1:8`]: { title: "Fine Feathered Friend", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4506e979983cdce5ad0" },
    [`${SERIES_ID}:1:16`]: { title: "Puttin' On The Dog", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4876e979983cdce5ad8" },
    [`${SERIES_ID}:1:10`]: { title: "The Lonesome Mouse", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4506e979983cdce5ad2" },
    [`${SERIES_ID}:1:14`]: { title: "The Million Dollar Cat", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc45c6e979983cdce5ad6" },
    [`${SERIES_ID}:1:9`]: { title: "Sufferin' Cats!", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4506e979983cdce5ad1" },
    [`${SERIES_ID}:1:15`]: { title: "The Bodyguard", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc45c6e979983cdce5ad7" },
    [`${SERIES_ID}:1:13`]: { title: "The Zoot Cat", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc45b6e979983cdce5ad5" },
    [`${SERIES_ID}:1:17`]: { title: "Mouse Trouble", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48d6e979983cdce5ad9" },
    [`${SERIES_ID}:1:19`]: { title: "Mouse In Manhattan", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48e6e979983cdce5ada" },
    [`${SERIES_ID}:1:22`]: { title: "Quiet Please!", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4926e979983cdce5ade" },
    [`${SERIES_ID}:1:21`]: { title: "Flirty Birdy", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4926e979983cdce5add" },
    [`${SERIES_ID}:1:23`]: { title: "Springtime For Thomas", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4936e979983cdce5adf" },
    [`${SERIES_ID}:1:18`]: { title: "The Mouse Comes To Dinner", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48f6e979983cdce5adc" },
    [`${SERIES_ID}:1:24`]: { title: "The Milky Waif", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4986e979983cdce5ae0" },
    [`${SERIES_ID}:1:20`]: { title: "Tee For Two", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48f6e979983cdce5adb" },
    [`${SERIES_ID}:1:25`]: { title: "Trap Happy", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4c36e979983cdce5ae1" },
    [`${SERIES_ID}:2:1`]: { title: "Solid Serenade", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4c36e979983cdce5ae2" },
    [`${SERIES_ID}:2:2`]: { title: "Cat Fishin'", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4c86e979983cdce5ae3" },
    [`${SERIES_ID}:2:3`]: { title: "Part Time Pal", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae4" },
    [`${SERIES_ID}:2:4`]: { title: "The Cat Concerto", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae5" },
    [`${SERIES_ID}:2:9`]: { title: "Kitty Foiled", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4d96e979983cdce5aea" },
    [`${SERIES_ID}:2:5`]: { title: "Dr Jekyll and Mr Mouse", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae6" },
    [`${SERIES_ID}:2:6`]: { title: "Salt Water Tabby", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae7" },
    [`${SERIES_ID}:2:7`]: { title: "A Mouse In The House", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cf6e979983cdce5ae8" },
    [`${SERIES_ID}:2:8`]: { title: "The Invisible Mouse", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4d36e979983cdce5ae9" },
    [`${SERIES_ID}:2:11`]: { title: "Old Rockin' Chair Tom", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5036e979983cdce5aec" },
    [`${SERIES_ID}:2:12`]: { title: "Professor Tom", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5056e979983cdce5aed" },
    [`${SERIES_ID}:2:13`]: { title: "Mouse Cleaning", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5056e979983cdce5aee" },
    [`${SERIES_ID}:2:15`]: { title: "The Little Orphan", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5096e979983cdce5af0" },
    [`${SERIES_ID}:2:16`]: { title: "Hatch Up Your Troubles", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc50a6e979983cdce5af1" },
    [`${SERIES_ID}:2:14`]: { title: "Polka Dot Puss", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5056e979983cdce5aef" },
    [`${SERIES_ID}:2:19`]: { title: "Love That Pup", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5136e979983cdce5af4" },
    [`${SERIES_ID}:2:10`]: { title: "The Truce Hurts", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4d96e979983cdce5aeb" },
    [`${SERIES_ID}:2:17`]: { title: "Heavenly Puss", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc50e6e979983cdce5af2" },
    [`${SERIES_ID}:2:20`]: { title: "Jerry's Diary", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5136e979983cdce5af5" }
};

// 1. MANIFEST ENDPOINT
app.get('/manifest.json', (req, res) => {
    res.json({
        id: "org.daryzstream.animeanimation",
        version: "2.0.0",
        name: "Anime & Animation",
        description: "Koleksi Animasi Klasik Tom & Jerry",
        resources: ["catalog", "meta", "stream"],
        types: ["series"],
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
    res.json({
        metas: [
            {
                id: seriesMeta.id,
                type: "series",
                name: seriesMeta.name,
                poster: seriesMeta.poster,
                description: seriesMeta.description
            }
        ]
    });
});

// 3. META ENDPOINT (Membina struktur episod bagi siri)
app.get('/meta/:type/:id.json', (req, res) => {
    const reqId = req.params.id;

    if (reqId === SERIES_ID) {
        const videos = Object.keys(streamsData).map(key => {
            const parts = key.split(':');
            const season = parseInt(parts[1]);
            const episode = parseInt(parts[2]);
            const data = streamsData[key];

            return {
                id: key,
                title: data.title,
                season: season,
                episode: episode,
                released: new Date().toISOString()
            };
        });

        res.json({
            meta: {
                ...seriesMeta,
                videos: videos
            }
        });
    } else {
        res.status(404).json({ error: "Meta not found" });
    }
});

// 4. STREAM ENDPOINT
app.get('/stream/:type/:id.json', (req, res) => {
    const streamKey = req.params.id;
    const stream = streamsData[streamKey];

    if (stream) {
        res.json({
            streams: [
                {
                    name: "DaRyzStream",
                    title: `1080p - ${stream.title}`,
                    url: stream.url
                }
            ]
        });
    } else {
        res.json({ streams: [] });
    }
});

// Fallback Route
app.get('/', (req, res) => {
    res.json({ addon: "Anime & Animation Online", manifest: "/manifest.json" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
