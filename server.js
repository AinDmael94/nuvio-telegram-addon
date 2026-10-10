const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// ==========================================
// 1. MANIFEST ADDON
// ==========================================
const manifest = {
    id: "org.aindmael.hagemaru.addon",
    version: "1.0.0",
    name: "Koleksi Anime & Cartoons Addon",
    description: "Addon Stremio/Nuvio khas dengan pilihan episod tersusun.",
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

// ==========================================
// 2. SENARAI SIRI / ANIME (DIPECAHKAN SATU PER SATU)
// ==========================================

// --- SIRI 1: HAGEMARU ---
const hagemaru = {
    id: "hagemaru_series",
    name: "Hagemaru",
    poster: "https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg",
    description: "Koleksi Episod Hagemaru Bahasa Melayu.",
    episodes: [
        { episode: 1, title: "Pasukan Bola Lisut Muda", url: "https://files.catbox.moe/05qmoa.mp4" }
    ]
};

// --- SIRI 2: NINJA BOY ---
const ninjaBoy = {
    id: "ninja_boy_series",
    name: "Ninja Boy",
    poster: "https://i.postimg.cc/NjchPqKZ/Ninja_Boy.jpg",
    description: "Koleksi Episod Ninja Boy Bahasa Melayu.",
    episodes: [
        { episode: 1, title: "Episod 1", url: "https://files.catbox.moe/eufzjd.mp4" },
        { episode: 2, title: "Episod 2", url: "https://files.catbox.moe/gujt6g.mp4" },
        { episode: 3, title: "Episod 3", url: "https://files.catbox.moe/tlvkbp.mp4" },
        { episode: 4, title: "Episod 4", url: "https://files.catbox.moe/fzsduj.mp4" },
        { episode: 5, title: "Episod 5", url: "https://files.catbox.moe/zmbbmq.mp4" },
        { episode: 6, title: "Episod 6", url: "https://files.catbox.moe/o7bhaf.mp4" },
        { episode: 7, title: "Episod 7", url: "https://files.catbox.moe/jmwdz9.mp4" }
    ]
};

// --- SIRI 3: DORAEMON ---
const doraemon = {
    id: "doraemon_series",
    name: "Doraemon",
    poster: "https://i.postimg.cc/XYbMDSrm/Doraemon.jpg",
    description: "Koleksi Episod Doraemon Bahasa Melayu.",
    episodes: [
        { episode: 1, title: "Episod 1", url: "https://files.catbox.moe/oycp0l.mp4" },
        { episode: 2, title: "Episod 2", url: "https://files.catbox.moe/y2jnzp.mp4" },
        { episode: 3, title: "Episod 3", url: "https://files.catbox.moe/0rhjn1.mp4" },
        { episode: 4, title: "Episod 4", url: "https://files.catbox.moe/j5bb72.mp4" },
        { episode: 5, title: "Episod 5", url: "https://files.catbox.moe/tx56z3.mp4" },
        { episode: 6, title: "Episod 6", url: "https://files.catbox.moe/d999bc.mp4" },
        { episode: 7, title: "Episod 7", url: "https://files.catbox.moe/9oagow.mp4" },
        { episode: 8, title: "Episod 8", url: "https://files.catbox.moe/c88t2y.mp4" },
        { episode: 9, title: "Episod 9", url: "https://files.catbox.moe/s0w4l2.mp4" },
        { episode: 10, title: "Episod 10", url: "https://files.catbox.moe/9z3g6p.mp4" },
        { episode: 11, title: "Episod 11", url: "https://files.catbox.moe/w2rqxc.mp4" },
        { episode: 12, title: "Episod 12", url: "https://files.catbox.moe/0ye5xj.mp4" },
        { episode: 13, title: "Episod 13", url: "https://files.catbox.moe/p43ryb.mp4" },
        { episode: 14, title: "Episod 14", url: "https://files.catbox.moe/4v3zun.mp4" },
        { episode: 15, title: "Episod 15", url: "https://files.catbox.moe/k6jxyt.mp4" },
        { episode: 16, title: "Episod 16", url: "https://files.catbox.moe/8rbre5.mp4" },
        { episode: 17, title: "Episod 17", url: "https://files.catbox.moe/mhs0nv.mp4" },
        { episode: 18, title: "Episod 18", url: "https://files.catbox.moe/5h1ezm.mp4" },
        { episode: 19, title: "Episod 19", url: "https://files.catbox.moe/htqy6e.mp4" },
        { episode: 20, title: "Episod 20", url: "https://files.catbox.moe/lea2x8.mp4" },
        { episode: 21, title: "Episod 21", url: "https://files.catbox.moe/r42hc2.mp4" },
        { episode: 22, title: "Episod 22", url: "https://files.catbox.moe/vkeb1q.mp4" },
        { episode: 23, title: "Episod 23", url: "https://files.catbox.moe/4mcmx3.mp4" },
        { episode: 24, title: "Episod 24", url: "https://files.catbox.moe/cunbqt.mp4" },
        { episode: 25, title: "Episod 25", url: "https://files.catbox.moe/qxylix.mp4" },
        { episode: 26, title: "Episod 26", url: "https://files.catbox.moe/re0c0z.mp4" },
        { episode: 27, title: "Episod 27", url: "https://files.catbox.moe/ks1u8n.mp4" },
        { episode: 28, title: "Episod 28", url: "https://files.catbox.moe/79zs6n.mp4" },
        { episode: 29, title: "Episod 29", url: "https://files.catbox.moe/c6zn2u.mp4" },
        { episode: 30, title: "Episod 30", url: "https://files.catbox.moe/ytnekv.mp4" },
        { episode: 31, title: "Episod 31", url: "https://files.catbox.moe/vatbmf.mp4" },
        { episode: 32, title: "Episod 32", url: "https://files.catbox.moe/5ot9pd.mp4" },
        { episode: 33, title: "Episod 33", url: "https://files.catbox.moe/8hetcy.mp4" },
        { episode: 34, title: "Episod 34", url: "https://files.catbox.moe/zl3nzc.mp4" },
        { episode: 35, title: "Episod 35", url: "https://files.catbox.moe/7bhl4b.mp4" },
        { episode: 36, title: "Episod 36", url: "https://files.catbox.moe/336km9.mp4" },
        { episode: 37, title: "Episod 37", url: "https://files.catbox.moe/gz6zd1.mp4" },
        { episode: 38, title: "Episod 38", url: "https://files.catbox.moe/ti97x3.mp4" },
        { episode: 39, title: "Episod 39", url: "https://files.catbox.moe/gz9nzk.mp4" },
        { episode: 40, title: "Episod 40", url: "https://files.catbox.moe/7as2xt.mp4" },
        { episode: 41, title: "Episod 41", url: "https://files.catbox.moe/lur6di.mp4" },
        { episode: 42, title: "Episod 42", url: "https://files.catbox.moe/y6cidm.mp4" },
        { episode: 43, title: "Episod 43", url: "https://files.catbox.moe/40q9mb.mp4" },
        { episode: 44, title: "Episod 44", url: "https://files.catbox.moe/14uoer.mp4" },
        { episode: 45, title: "Episod 45", url: "https://files.catbox.moe/tnu1yq.mp4" },
        { episode: 46, title: "Episod 46", url: "https://files.catbox.moe/jqn9l7.mp4" },
        { episode: 47, title: "Episod 47", url: "https://files.catbox.moe/75bfy0.mp4" },
        { episode: 48, title: "Episod 48", url: "https://files.catbox.moe/mpwbnh.mp4" },
        { episode: 49, title: "Episod 49", url: "https://files.catbox.moe/2sjant.mp4" },
        { episode: 50, title: "Episod 50", url: "https://files.catbox.moe/khkto1.mp4" },
        { episode: 51, title: "Episod 51", url: "https://files.catbox.moe/r0w4yb.mp4" },
        { episode: 52, title: "Episod 52", url: "https://files.catbox.moe/25qjxr.mp4" },
        { episode: 53, title: "Episod 53", url: "https://files.catbox.moe/z81zu8.mp4" },
        { episode: 54, title: "Episod 54", url: "https://files.catbox.moe/22zj5h.mp4" },
        { episode: 55, title: "Episod 55", url: "https://files.catbox.moe/prdrno.mp4" },
        { episode: 56, title: "Episod 56", url: "https://files.catbox.moe/c81md0.mp4" },
        { episode: 57, title: "Episod 57", url: "https://files.catbox.moe/hkiu08.mp4" },
        { episode: 58, title: "Episod 58", url: "https://files.catbox.moe/f0uzr4.mp4" },
        { episode: 59, title: "Episod 59", url: "https://files.catbox.moe/a1cqxl.mp4" }
    ]
};

// Nanti kalau nak tambah SIRI 4 (CONTOH: KARTUN ISLAMIC):
/*
const kartunIslamic = {
    id: "kartun_islamic_series",
    name: "Koleksi Kartun Islamic",
    poster: "LINK_POSTER_KAT SINI",
    description: "Koleksi Kisah Nabi & Kartun Islamic.",
    episodes: [
        { episode: 1, title: "Episod 1", url: "LINK_CATBOX" }
    ]
};
*/

// ==========================================
// 3. GABUNGKAN SEMUA SIRI DALAM KATALOG
// ==========================================
const seriesDatabase = {
    [hagemaru.id]: hagemaru,
    [ninjaBoy.id]: ninjaBoy,
    [doraemon.id]: doraemon
    // [kartunIslamic.id]: kartunIslamic <--- Masukkan di sini bila dah buat nanti
};

// ==========================================
// 4. ROUTING & LOGIK SERVER (JANGAN USIK)
// ==========================================
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.get('/stremio/:user/manifest.json', (req, res) => {
    res.json(manifest);
});

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

app.get('/stremio/:user/meta/:type/:id.json', (req, res) => {
    const seriesKey = req.params.id.split(':')[0];
    const series = seriesDatabase[seriesKey];

    if (series) {
        const videos = series.episodes.map(e => ({
            id: `${series.id}:1:${e.episode}`,
            title: e.title,
            season: 1,
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

app.get('/stremio/:user/stream/:type/:id.json', (req, res) => {
    const parts = req.params.id.split(':');
    const seriesId = parts[0];
    const episodeNum = parseInt(parts[2], 10) || 1;

    const series = seriesDatabase[seriesId];
    if (series) {
        const ep = series.episodes.find(e => e.episode === episodeNum);
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

app.get('/', (req, res) => {
    res.send("Nuvio / Stremio Addon Server is Running Live!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
