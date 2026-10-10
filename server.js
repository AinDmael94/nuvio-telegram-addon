const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// Manifest configuration
const manifest = {
    id: "org.aindmael.hagemaru.addon",
    version: "1.0.0",
    name: "Koleksi Anime & Cartoons Addon",
    description: "Addon Stremio/Nuvio khas dengan pilihan Episod tersusun.",
    resources: ["catalog", "stream", "meta"],
    types: ["series"],
    catalogs: [
        {
            type: "series",
            id: "my_anime_catalog",
            name: "Koleksi Anime / Kartun"
        }
    ]
};

// Data Episod Ninja Boy
const ninjaBoyLinks = [
    "https://files.catbox.moe/eufzjd.mp4",
    "https://files.catbox.moe/gujt6g.mp4",
    "https://files.catbox.moe/tlvkbp.mp4",
    "https://files.catbox.moe/fzsduj.mp4",
    "https://files.catbox.moe/zmbbmq.mp4",
    "https://files.catbox.moe/o7bhaf.mp4",
    "https://files.catbox.moe/jmwdz9.mp4"
];

// Data Episod Doraemon
const doraemonLinks = [
    "https://files.catbox.moe/oycp0l.mp4", "https://files.catbox.moe/y2jnzp.mp4", "https://files.catbox.moe/0rhjn1.mp4", "https://files.catbox.moe/j5bb72.mp4", "https://files.catbox.moe/tx56z3.mp4",
    "https://files.catbox.moe/d999bc.mp4", "https://files.catbox.moe/9oagow.mp4", "https://files.catbox.moe/c88t2y.mp4", "https://files.catbox.moe/s0w4l2.mp4", "https://files.catbox.moe/9z3g6p.mp4",
    "https://files.catbox.moe/w2rqxc.mp4", "https://files.catbox.moe/0ye5xj.mp4", "https://files.catbox.moe/p43ryb.mp4", "https://files.catbox.moe/4v3zun.mp4", "https://files.catbox.moe/k6jxyt.mp4",
    "https://files.catbox.moe/8rbre5.mp4", "https://files.catbox.moe/mhs0nv.mp4", "https://files.catbox.moe/5h1ezm.mp4", "https://files.catbox.moe/htqy6e.mp4", "https://files.catbox.moe/lea2x8.mp4",
    "https://files.catbox.moe/r42hc2.mp4", "https://files.catbox.moe/vkeb1q.mp4", "https://files.catbox.moe/4mcmx3.mp4", "https://files.catbox.moe/cunbqt.mp4", "https://files.catbox.moe/qxylix.mp4",
    "https://files.catbox.moe/re0c0z.mp4", "https://files.catbox.moe/ks1u8n.mp4", "https://files.catbox.moe/79zs6n.mp4", "https://files.catbox.moe/c6zn2u.mp4", "https://files.catbox.moe/ytnekv.mp4",
    "https://files.catbox.moe/vatbmf.mp4", "https://files.catbox.moe/5ot9pd.mp4", "https://files.catbox.moe/8hetcy.mp4", "https://files.catbox.moe/zl3nzc.mp4", "https://files.catbox.moe/7bhl4b.mp4",
    "https://files.catbox.moe/336km9.mp4", "https://files.catbox.moe/gz6zd1.mp4", "https://files.catbox.moe/ti97x3.mp4", "https://files.catbox.moe/gz9nzk.mp4", "https://files.catbox.moe/7as2xt.mp4",
    "https://files.catbox.moe/lur6di.mp4", "https://files.catbox.moe/y6cidm.mp4", "https://files.catbox.moe/40q9mb.mp4", "https://files.catbox.moe/14uoer.mp4", "https://files.catbox.moe/tnu1yq.mp4",
    "https://files.catbox.moe/jqn9l7.mp4", "https://files.catbox.moe/75bfy0.mp4", "https://files.catbox.moe/mpwbnh.mp4", "https://files.catbox.moe/2sjant.mp4", "https://files.catbox.moe/khkto1.mp4",
    "https://files.catbox.moe/r0w4yb.mp4", "https://files.catbox.moe/25qjxr.mp4", "https://files.catbox.moe/z81zu8.mp4", "https://files.catbox.moe/22zj5h.mp4", "https://files.catbox.moe/prdrno.mp4",
    "https://files.catbox.moe/c81md0.mp4", "https://files.catbox.moe/hkiu08.mp4", "https://files.catbox.moe/f0uzr4.mp4", "https://files.catbox.moe/a1cqxl.mp4"
];

// Pangkalan data siri utama
const seriesDatabase = {
    "hagemaru_series": {
        id: "hagemaru_series",
        name: "Hagemaru",
        poster: "https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg",
        description: "Koleksi Episod Hagemaru Bahasa Melayu.",
        episodes: [
            { season: 1, episode: 1, title: "Pasukan Bola Lisut Muda", url: "https://files.catbox.moe/05qmoa.mp4" }
        ]
    },
    "ninja_boy_series": {
        id: "ninja_boy_series",
        name: "Ninja Boy",
        poster: "https://i.postimg.cc/NjchPqKZ/Ninja_Boy.jpg",
        description: "Koleksi Episod Ninja Boy Bahasa Melayu.",
        episodes: ninjaBoyLinks.map((url, idx) => ({
            season: 1,
            episode: idx + 1,
            title: `Episod ${idx + 1}`,
            url: url
        }))
    },
    "doraemon_series": {
        id: "doraemon_series",
        name: "Doraemon",
        poster: "https://i.postimg.cc/XYbMDSrm/Doraemon.jpg",
        description: "Koleksi Episod Doraemon Bahasa Melayu.",
        episodes: doraemonLinks.map((url, idx) => ({
            season: 1,
            episode: idx + 1,
            title: `Episod ${idx + 1}`,
            url: url
        }))
    }
};

// CORS Header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

// Endpoint Manifest
app.get('/stremio/:user/manifest.json', (req, res) => {
    res.json(manifest);
});

// Endpoint Catalog
app.get('/stremio/:user/catalog/:type/:id.json', (req, res) => {
    const metas = Object.values(seriesDatabase).map(s => ({
        id: s.id,
        type: "series",
        name: s.name,
        poster: s.poster,
        description: s.description
    }));
    res.json({ metas });
});

// Endpoint Meta (Ganti struktur jadi Season & Episodes)
app.get('/stremio/:user/meta/:type/:id.json', (req, res) => {
    const seriesKey = req.params.id.split(':')[0];
    const series = seriesDatabase[seriesKey];

    if (series) {
        const videos = series.episodes.map(e => ({
            id: `${series.id}:${e.season}:${e.episode}`,
            title: e.title,
            season: e.season,
            episode: e.episode,
            released: new Date().toISOString()
        }));

        res.json({
            meta: {
                id: series.id,
                type: "series",
                name: series.name,
                poster: series.poster,
                description: series.description,
                videos: videos
            }
        });
    } else {
        res.status(404).json({ error: "Series not found" });
    }
});

// Endpoint Stream (Ganti padanan id berdasarkan ID Episod Spesifik)
app.get('/stremio/:user/stream/:type/:id.json', (req, res) => {
    const parts = req.params.id.split(':');
    const seriesId = parts[0];
    const season = parseInt(parts[1], 10) || 1;
    const episode = parseInt(parts[2], 10) || 1;

    const series = seriesDatabase[seriesId];
    if (series) {
        const ep = series.episodes.find(e => e.season === season && e.episode === episode);
        if (ep) {
            return res.json({
                streams: [
                    {
                        title: `Catbox Direct HD (${series.name} - E${ep.episode})`,
                        url: ep.url
                    }
                ]
            });
        }
    }
    res.json({ streams: [] });
});

// Base Route
app.get('/', (req, res) => {
    res.send("Nuvio / Stremio Addon Server is Running Live!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
