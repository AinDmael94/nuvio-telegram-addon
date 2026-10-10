const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000;

// Manifest configuration for Stremio / Nuvio
const manifest = {
    id: "org.aindmael.hagemaru.addon",
    version: "1.0.0",
    name: "Hagemaru Stream Addon",
    description: "Addon Stremio/Nuvio khas untuk streaming Hagemaru secara terus.",
    resources: ["catalog", "stream"],
    types: ["movie", "series"],
    idPrefixes: ["tt"],
    catalogs: [
        {
            type: "movie",
            id: "hagemaru_catalog",
            name: "Hagemaru Collection"
        }
    ]
};

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
    res.json({
        metas: [
            {
                id: "tt0000001",
                type: "movie",
                name: "Hagemaru - Pasukan Bola Lisut Muda",
                poster: "https://files.catbox.moe/05qmoa.mp4",
                description: "Hagemaru Episod Pasukan Bola Lisut Muda."
            }
        ]
    });
});

// Endpoint Stream
app.get('/stremio/:user/stream/:type/:id.json', (req, res) => {
    res.json({
        streams: [
            {
                title: "Catbox Direct MP4 (360p)",
                url: "https://files.catbox.moe/05qmoa.mp4"
            }
        ]
    });
});

// Base Route
app.get('/', (req, res) => {
    res.send("Nuvio / Stremio Addon Server is Running Live!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.listen(PORT, () => console.log(`Server cloud berjalan di port ${PORT}`));
