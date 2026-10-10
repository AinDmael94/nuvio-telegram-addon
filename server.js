const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(express.json());

// ==========================================
// PANGKALAN DATA FILEM (TELEGRAM STREAM LINKS)
// ==========================================
const moviesDatabase = [
    // ------------------------------------------
    // KATALOG 1: KISAH NABI & RASUL
    // ------------------------------------------
    {
        id: "nabi_yunus",
        type: "movie",
        name: "Doa Nabi Yunus AS - Keajaiban Di Dalam Perut Ikan Nun",
        poster: "https://i.ibb.co/3sX8M8r/yunus.jpg", // Gantikan dengan link poster online/Telegram
        description: "Kisah keajaiban dan doa Nabi Yunus AS.",
        category: "kisah_nabi",
        streamUrl: "PASTE_LINK_TELEGRAM_YUNUS_DI_SINI"
    },

    // ------------------------------------------
    // KATALOG 2: MOVIE MELAYU (TELEGRAM CLOUD)
    // ------------------------------------------
    {
        id: "anak_mami_kembali",
        type: "movie",
        name: "Anak Mami Kembali",
        poster: "https://i.ibb.co/3sX8M8r/anakmamikembali.jpg",
        description: "Filem Komedi Melayu dari Telegram Cloud.",
        category: "movie_melayu",
        streamUrl: "PASTE_LINK_TELEGRAM_ANAK_MAMI_DI_SINI"
    },
    {
        id: "badi",
        type: "movie",
        name: "Badi",
        poster: "https://i.ibb.co/qN2YkKm/badi.jpg",
        description: "Filem Seram Melayu dari Telegram Cloud.",
        category: "movie_melayu",
        streamUrl: "PASTE_LINK_TELEGRAM_BADI_DI_SINI"
    },
    {
        id: "bangkitnya_mayit",
        type: "movie",
        name: "Bangkitnya Mayit",
        poster: "https://i.ibb.co/qN2YkKm/bangkitnamayit.jpg",
        description: "Filem Seram Melayu dari Telegram Cloud.",
        category: "movie_melayu",
        streamUrl: "PASTE_LINK_TELEGRAM_BANGKITNYA_MAYIT_DI_SINI"
    },
    {
        id: "banglo_berkunci",
        type: "movie",
        name: "Banglo Berkunci",
        poster: "https://i.ibb.co/qN2YkKm/bangloberkunci.jpg",
        description: "Filem Seram Melayu dari Telegram Cloud.",
        category: "movie_melayu",
        streamUrl: "PASTE_LINK_TELEGRAM_BANGLO_BERKUNCI_DI_SINI"
    },
    {
        id: "hantu_kak_limah_balik_rumah",
        type: "movie",
        name: "Hantu Kak Limah Balik Rumah",
        poster: "https://i.ibb.co/qN2YkKm/hantukaklimah.jpg",
        description: "Filem Mamat Khalid dari Telegram Cloud.",
        category: "movie_melayu",
        streamUrl: "PASTE_LINK_TELEGRAM_KAK_LIMAH_DI_SINI"
    },
    {
        id: "munafik",
        type: "movie",
        name: "Munafik",
        poster: "https://i.ibb.co/qN2YkKm/munafik.jpg",
        description: "Filem Seram Syamsul Yusof dari Telegram Cloud.",
        category: "movie_melayu",
        streamUrl: "PASTE_LINK_TELEGRAM_MUNAFIK_DI_SINI"
    }
];

// ==========================================
// 1. MANIFEST ENDPOINT
// ==========================================
app.get('/stremio/:userId/manifest.json', (req, res) => {
    const userId = req.params.userId;
    res.json({
        id: `org.tgstremio.cloud.${userId}`,
        version: "1.0.0",
        name: "TG Stremio - Telegram Cloud 24/7",
        description: "Personal Cloud Media Server (24/7 Tanpa Buka PC)",
        resources: ["catalog", "meta", "stream"],
        types: ["movie"],
        catalogs: [
            { type: "movie", id: "kisah_nabi", name: "KISAH NABI & RASUL" },
            { type: "movie", id: "movie_melayu", name: "MOVIE MELAYU (24/7 CLOUD)" }
        ]
    });
});

// ==========================================
// 2. CATALOG ENDPOINT
// ==========================================
app.get('/stremio/:userId/catalog/:type/:id.json', (req, res) => {
    const { type, id } = req.params;
    const filtered = moviesDatabase.filter(m => m.category === id && m.type === type);
    const metas = filtered.map(m => ({
        id: m.id,
        type: m.type,
        name: m.name,
        poster: m.poster,
        description: m.description
    }));
    res.json({ metas });
});

// ==========================================
// 3. META ENDPOINT
// ==========================================
app.get('/stremio/:userId/meta/:type/:id.json', (req, res) => {
    const { id } = req.params;
    const movie = moviesDatabase.find(m => m.id === id);
    if (!movie) return res.json({ meta: {} });

    res.json({
        meta: {
            id: movie.id,
            type: movie.type,
            name: movie.name,
            poster: movie.poster,
            description: movie.description
        }
    });
});

// ==========================================
// 4. STREAM ENDPOINT
// ==========================================
app.get('/stremio/:userId/stream/:type/:id.json', (req, res) => {
    const { id } = req.params;
    const movie = moviesDatabase.find(m => m.id === id);

    if (!movie) return res.json({ streams: [] });

    res.json({
        streams: [
            {
                title: "Telegram Fast Cloud Stream (24/7)",
                url: movie.streamUrl
            }
        ]
    });
});

// Port dinamik khusus untuk Render.com
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server cloud berjalan di port ${PORT}`));