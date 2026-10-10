const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// Manifest configuration
const manifest = {
    id: "org.aindmael.hagemaru.addon",
    version: "1.0.0",
    name: "Koleksi Anime & Cartoons Addon",
    description: "Addon Stremio/Nuvio khas untuk streaming Hagemaru, Ninja Boy, dan Doraemon.",
    resources: ["catalog", "stream", "meta"],
    types: ["movie", "series"],
    catalogs: [
        {
            type: "series",
            id: "my_anime_catalog",
            name: "Koleksi Anime / Kartun"
        }
    ]
};

// Database senarai tajuk & episod
const moviesDatabase = [
    {
        id: "hagemaru_collection",
        type: "series",
        name: "Hagemaru",
        poster: "https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg",
        description: "Koleksi Episod Hagemaru Bahasa Melayu.",
        streams: [
            { title: "Episod 1 - Pasukan Bola Lisut Muda", url: "https://files.catbox.moe/05qmoa.mp4" }
        ]
    },
    {
        id: "ninja_boy_collection",
        type: "series",
        name: "Ninja Boy",
        poster: "https://i.postimg.cc/NjchPqKZ/Ninja_Boy.jpg",
        description: "Koleksi Episod Ninja Boy (Nintama Rantarou) Bahasa Melayu.",
        streams: [
            { title: "Ninja Boy - Episod 01", url: "https://files.catbox.moe/eufzjd.mp4" },
            { title: "Ninja Boy - Episod 02", url: "https://files.catbox.moe/gujt6g.mp4" },
            { title: "Ninja Boy - Episod 03", url: "https://files.catbox.moe/tlvkbp.mp4" },
            { title: "Ninja Boy - Episod 04", url: "https://files.catbox.moe/fzsduj.mp4" },
            { title: "Ninja Boy - Episod 05", url: "https://files.catbox.moe/zmbbmq.mp4" },
            { title: "Ninja Boy - Episod 06", url: "https://files.catbox.moe/o7bhaf.mp4" },
            { title: "Ninja Boy - Episod 07", url: "https://files.catbox.moe/jmwdz9.mp4" }
        ]
    },
    {
        id: "doraemon_collection",
        type: "series",
        name: "Doraemon",
        poster: "https://i.postimg.cc/XYbMDSrm/Doraemon.jpg",
        description: "Koleksi Episod Doraemon Bahasa Melayu.",
        streams: [
            { title: "Doraemon - Episod 01", url: "https://files.catbox.moe/oycp0l.mp4" },
            { title: "Doraemon - Episod 02", url: "https://files.catbox.moe/y2jnzp.mp4" },
            { title: "Doraemon - Episod 03", url: "https://files.catbox.moe/0rhjn1.mp4" },
            { title: "Doraemon - Episod 04", url: "https://files.catbox.moe/j5bb72.mp4" },
            { title: "Doraemon - Episod 05", url: "https://files.catbox.moe/tx56z3.mp4" },
            { title: "Doraemon - Episod 06", url: "https://files.catbox.moe/d999bc.mp4" },
            { title: "Doraemon - Episod 07", url: "https://files.catbox.moe/9oagow.mp4" },
            { title: "Doraemon - Episod 08", url: "https://files.catbox.moe/c88t2y.mp4" },
            { title: "Doraemon - Episod 09", url: "https://files.catbox.moe/s0w4l2.mp4" },
            { title: "Doraemon - Episod 10", url: "https://files.catbox.moe/9z3g6p.mp4" },
            { title: "Doraemon - Episod 11", url: "https://files.catbox.moe/w2rqxc.mp4" },
            { title: "Doraemon - Episod 12", url: "https://files.catbox.moe/0ye5xj.mp4" },
            { title: "Doraemon - Episod 13", url: "https://files.catbox.moe/p43ryb.mp4" },
            { title: "Doraemon - Episod 14", url: "https://files.catbox.moe/4v3zun.mp4" },
            { title: "Doraemon - Episod 15", url: "https://files.catbox.moe/k6jxyt.mp4" },
            { title: "Doraemon - Episod 16", url: "https://files.catbox.moe/8rbre5.mp4" },
            { title: "Doraemon - Episod 17", url: "https://files.catbox.moe/mhs0nv.mp4" },
            { title: "Doraemon - Episod 18", url: "https://files.catbox.moe/5h1ezm.mp4" },
            { title: "Doraemon - Episod 19", url: "https://files.catbox.moe/htqy6e.mp4" },
            { title: "Doraemon - Episod 20", url: "https://files.catbox.moe/lea2x8.mp4" },
            { title: "Doraemon - Episod 21", url: "https://files.catbox.moe/r42hc2.mp4" },
            { title: "Doraemon - Episod 22", url: "https://files.catbox.moe/vkeb1q.mp4" },
            { title: "Doraemon - Episod 23", url: "https://files.catbox.moe/4mcmx3.mp4" },
            { title: "Doraemon - Episod 24", url: "https://files.catbox.moe/cunbqt.mp4" },
            { title: "Doraemon - Episod 25", url: "https://files.catbox.moe/qxylix.mp4" },
            { title: "Doraemon - Episod 26", url: "https://files.catbox.moe/re0c0z.mp4" },
            { title: "Doraemon - Episod 27", url: "https://files.catbox.moe/ks1u8n.mp4" },
            { title: "Doraemon - Episod 28", url: "https://files.catbox.moe/79zs6n.mp4" },
            { title: "Doraemon - Episod 29", url: "https://files.catbox.moe/c6zn2u.mp4" },
            { title: "Doraemon - Episod 30", url: "https://files.catbox.moe/ytnekv.mp4" },
            { title: "Doraemon - Episod 31", url: "https://files.catbox.moe/vatbmf.mp4" },
            { title: "Doraemon - Episod 32", url: "https://files.catbox.moe/5ot9pd.mp4" },
            { title: "Doraemon - Episod 33", url: "https://files.catbox.moe/8hetcy.mp4" },
            { title: "Doraemon - Episod 34", url: "https://files.catbox.moe/zl3nzc.mp4" },
            { title: "Doraemon - Episod 35", url: "https://files.catbox.moe/7bhl4b.mp4" },
            { title: "Doraemon - Episod 36", url: "https://files.catbox.moe/336km9.mp4" },
            { title: "Doraemon - Episod 37", url: "https://files.catbox.moe/gz6zd1.mp4" },
            { title: "Doraemon - Episod 38", url: "https://files.catbox.moe/ti97x3.mp4" },
            { title: "Doraemon - Episod 39", url: "https://files.catbox.moe/gz9nzk.mp4" },
            { title: "Doraemon - Episod 40", url: "https://files.catbox.moe/7as2xt.mp4" },
            { title: "Doraemon - Episod 41", url: "https://files.catbox.moe/lur6di.mp4" },
            { title: "Doraemon - Episod 42", url: "https://files.catbox.moe/y6cidm.mp4" },
            { title: "Doraemon - Episod 43", url: "https://files.catbox.moe/40q9mb.mp4" },
            { title: "Doraemon - Episod 44", url: "https://files.catbox.moe/14uoer.mp4" },
            { title: "Doraemon - Episod 45", url: "https://files.catbox.moe/tnu1yq.mp4" },
            { title: "Doraemon - Episod 46", url: "https://files.catbox.moe/jqn9l7.mp4" },
            { title: "Doraemon - Episod 47", url: "https://files.catbox.moe/75bfy0.mp4" },
            { title: "Doraemon - Episod 48", url: "https://files.catbox.moe/mpwbnh.mp4" },
            { title: "Doraemon - Episod 49", url: "https://files.catbox.moe/2sjant.mp4" },
            { title: "Doraemon - Episod 50", url: "https://files.catbox.moe/khkto1.mp4" },
            { title: "Doraemon - Episod 51", url: "https://files.catbox.moe/r0w4yb.mp4" },
            { title: "Doraemon - Episod 52", url: "https://files.catbox.moe/25qjxr.mp4" },
            { title: "Doraemon - Episod 53", url: "https://files.catbox.moe/z81zu8.mp4" },
            { title: "Doraemon - Episod 54", url: "https://files.catbox.moe/22zj5h.mp4" },
            { title: "Doraemon - Episod 55", url: "https://files.catbox.moe/prdrno.mp4" },
            { title: "Doraemon - Episod 56", url: "https://files.catbox.moe/c81md0.mp4" },
            { title: "Doraemon - Episod 57", url: "https://files.catbox.moe/hkiu08.mp4" },
            { title: "Doraemon - Episod 58", url: "https://files.catbox.moe/f0uzr4.mp4" },
            { title: "Doraemon - Episod 59", url: "https://files.catbox.moe/a1cqxl.mp4" }
        ]
    }
];

// CORS configuration
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
    const metas = moviesDatabase.map(m => ({
        id: m.id,
        type: m.type,
        name: m.name,
        poster: m.poster,
        description: m.description
    }));
    res.json({ metas });
});

// Endpoint Meta
app.get('/stremio/:user/meta/:type/:id.json', (req, res) => {
    const movie = moviesDatabase.find(m => m.id === req.params.id);
    if (movie) {
        res.json({
            meta: {
                id: movie.id,
                type: movie.type,
                name: movie.name,
                poster: movie.poster,
                description: movie.description
            }
        });
    } else {
        res.status(404).json({ error: "Movie/Series not found" });
    }
});

// Endpoint Stream
app.get('/stremio/:user/stream/:type/:id.json', (req, res) => {
    const movie = moviesDatabase.find(m => m.id === req.params.id);
    if (movie) {
        res.json({
            streams: movie.streams
        });
    } else {
        res.json({ streams: [] });
    }
});

// Base Route
app.get('/', (req, res) => {
    res.send("Nuvio / Stremio Addon Server is Running Live!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
