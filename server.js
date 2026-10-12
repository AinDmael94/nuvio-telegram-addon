const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ==========================================
// USER TRACKER & ANALYTICS STORAGE
// ==========================================
const uniqueUsers = new Set();
const userActivity = {};

// ==========================================
// HELPER FUNCTION UNTUK TAJUK & EPISOD
// ==========================================
function createEpisodes(list) {
    return list.map((item, idx) => {
        if (typeof item === 'string') {
            return { episode: idx + 1, title: `Episod ${idx + 1}`, overview: '', url: item };
        }
        return {
            episode: idx + 1,
            title: item.title || `Episod ${idx + 1}`,
            overview: item.description || item.overview || '',
            url: item.url
        };
    });
}

// ==========================================
// 1. MANIFEST ADDON
// ==========================================
const manifest = {
    id: "org.aindmael.hagemaru.addon",
    version: "4.4.0",
    name: "DaRyz Collection Addon",
    description: "Addon Stremio/Nuvio dengan katalog siri, ceramah, anime dan filem tersusun.",
    resources: ["catalog", "stream", "meta"],
    types: ["series"],
    idPrefixes: [
        "dragon_ball_movie", "satria_series", "gundam_build_fighter_series", "time_bokan_series", "doraemon_movie_series",
        "kisah_sahabat_series", "running_man_series", "naruto_series", "mm_", "mahsyar_series", "filem_dakwah_sengketa_series", "hagemaru_series", "ninja_boy_series", 
        "doraemon_series", "pokemon_journeys_series", "midori_days_series", "anak_anak_sidek_series", 
        "ueki_series", "ginban_series", "black_cat_series", "digimon_savers_series", 
        "digimon_01_series", "shin_chan_series", "akhir_zaman_series", "kd_malay_series", "kd_eng_series",
        "demon_slayer_series", "jjk_series", "boruto_series", "hagemaru_full_series", "naruto_movie_series", "chibi_maruko_series"
    ],
    catalogs: [
        { type: "series", id: "dragon_ball_movie_catalog", name: "Dragon Ball Movie" },
        { type: "series", id: "satria_catalog", name: "Satria Series" },
        { type: "series", id: "gundam_build_fighter_catalog", name: "Gundam Build Fighter Series" },
        { type: "series", id: "time_bokan_catalog", name: "Time Bokan" },
        { type: "series", id: "naruto_catalog", name: "Naruto (Full Episod)" },
        { type: "series", id: "running_man_catalog", name: "Runningman" },
        { type: "series", id: "demon_slayer_catalog", name: "Demon Slayer (Ep 1-26)" },
        { type: "series", id: "jjk_catalog", name: "Jujutsu Kaisen (Ep 1-24)" },
        { type: "series", id: "boruto_catalog", name: "Boruto Collection" },
        { type: "series", id: "hagemaru_full_catalog", name: "Hagemaru Collection" },
        { type: "series", id: "doraemon_movie_catalog", name: "Doraemon Movie" },
        { type: "series", id: "naruto_movie_catalog", name: "Naruto Movie" },
        { type: "series", id: "chibi_maruko_catalog", name: "Chibi Maruko Chan Movie" },
        { type: "series", id: "kisah_sahabat_catalog", name: "Kisah Para Sahabat Nabi" },
        { type: "series", id: "malaysian_movies_catalog", name: "Malaysian Movies" },
        { type: "series", id: "mahsyar_catalog", name: "Mahsyar" },
        { type: "series", id: "filem_dakwah_sengketa_catalog", name: "Filem Dakwah - Sengketa" },
        { type: "series", id: "hagemaru_catalog", name: "Hagemaru" },
        { type: "series", id: "ninja_boy_catalog", name: "Ninja Boy" },
        { type: "series", id: "doraemon_catalog", name: "Doraemon" },
        { type: "series", id: "pokemon_catalog", name: "Pokemon Journeys" },
        { type: "series", id: "midori_days_catalog", name: "Midori Days" },
        { type: "series", id: "anak_sidek_catalog", name: "Anak-Anak Sidek" },
        { type: "series", id: "ueki_catalog", name: "The Law of Ueki" },
        { type: "series", id: "ginban_catalog", name: "Ginban Kaleidoscope" },
        { type: "series", id: "black_cat_catalog", name: "Black Cat" },
        { type: "series", id: "digimon_savers_catalog", name: "Digimon Savers" },
        { type: "series", id: "digimon_01_catalog", name: "Digimon Adventure 01" },
        { type: "series", id: "shin_chan_catalog", name: "Crayon Shin Chan" },
        { type: "series", id: "akhir_zaman_catalog", name: "Kisah Hidup Akhir Zaman" },
        { type: "series", id: "kd_malay_catalog", name: "Kids Delights (Malay)" },
        { type: "series", id: "kd_eng_catalog", name: "Kids Delights (Eng)" }
    ]
};

// ==========================================
// 2. DATABASE SENARAI SIRI & FILEM
// ==========================================
const seriesDatabase = {
    "dragon_ball_movie_catalog": {
        id: "dragon_ball_movie",
        isMulti: true,
        items: [
            { id: "db_path_to_power", name: "Mutiara Naga Movie 04: The Path to Power (1996)", poster: "https://i.postimg.cc/mDWZ4mZv/Dragon-Ball-The-Way-to-the-Strongest.jpg", description: "Dragon Ball Movie 1996", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb1486e979983cdce5a77" },
            { id: "db_sleeping_princess", name: "Dragon Ball: Sleeping Princess in Devil's Castle", poster: "https://i.postimg.cc/DzKPXKx0/Dragon-Ball-Sleeping-Princess-in-Devil-s-Castle.jpg", description: "Dragon Ball Movie", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb1486e979983cdce5a78" },
            { id: "db_legend_shenron", name: "Dragon Ball: Legend of Shenron (Malay Dub)", poster: "https://i.postimg.cc/q7dx3d1R/Dragon-Ball-The-Way-to-the-Strongest.jpg", description: "Dragon Ball Malay Dub", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb1486e979983cdce5a79" }
        ]
    },
    "satria_catalog": {
        id: "satria_series",
        catalogId: "satria_catalog",
        name: "Satria Series",
        poster: "https://i.postimg.cc/RZbQgHSb/SATRIA.jpg",
        description: "Koleksi Satria 7 Pahlawan.",
        episodes: createEpisodes([
            { title: "[EP.01] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2bf6e979983cdce5a7f" },
            { title: "[EP.02] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2bf6e979983cdce5a7d" },
            { title: "[EP.03] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2bf6e979983cdce5a7b" },
            { title: "[EP.04] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2bf6e979983cdce5a7e" },
            { title: "[EP.05] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2bf6e979983cdce5a7a" },
            { title: "[EP.06] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2bf6e979983cdce5a7c" },
            { title: "[EP.07] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2c76e979983cdce5a80" },
            { title: "[EP.08] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2c76e979983cdce5a81" },
            { title: "[EP.09] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2c76e979983cdce5a82" },
            { title: "[EP.10] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2c76e979983cdce5a83" },
            { title: "[EP.11] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2cd6e979983cdce5a84" },
            { title: "[EP.12] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2cd6e979983cdce5a85" },
            { title: "[EP.13] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2d26e979983cdce5a86" },
            { title: "[EP.14] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2d26e979983cdce5a87" },
            { title: "[EP.15] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2fe6e979983cdce5a88" },
            { title: "[EP.16] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2fe6e979983cdce5a89" },
            { title: "[EP.17] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2fe6e979983cdce5a8a" },
            { title: "[EP.18] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb2ff6e979983cdce5a8b" },
            { title: "[EP.19] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3036e979983cdce5a8c" },
            { title: "[EP.20] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3036e979983cdce5a8d" },
            { title: "[EP.21] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3096e979983cdce5a8e" },
            { title: "[EP.22] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3096e979983cdce5a8f" },
            { title: "[EP.23] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3096e979983cdce5a90" },
            { title: "[EP.24] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb30e6e979983cdce5a91" },
            { title: "[EP.25] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb30e6e979983cdce5a92" },
            { title: "[EP.26] Satria 7 Pahlawan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb33a6e979983cdce5a93" }
        ])
    },
    "gundam_build_fighter_catalog": {
        id: "gundam_build_fighter_series",
        catalogId: "gundam_build_fighter_catalog",
        name: "Gundam Build Fighter Series",
        poster: "https://i.postimg.cc/HkP46yYN/Gundam-Build-Fighter.jpg",
        description: "Koleksi Gundam Build Fighters Malay Dub.",
        episodes: createEpisodes([
            { title: "Episode 1: Sei dan Renji", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb38a6e979983cdce5a96" },
            { title: "Episode 2: Comet Lembayung", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb38a6e979983cdce5a94" },
            { title: "Episode 3: Pakej Penuh", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb38a6e979983cdce5a95" },
            { title: "Episode 4: Gunpla Pujaan Kirara", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb38a6e979983cdce5a98" },
            { title: "Episode 5: Pembina Kuat", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb38a6e979983cdce5a99" },
            { title: "Episode 6: Satu Alasan Pertempuran", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb38a6e979983cdce5a97" },
            { title: "Episode 7: Keupayaan Tahap Dunia", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3926e979983cdce5a9a" },
            { title: "Episode 8: Pertemuan Pejuang", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3926e979983cdce5a9c" },
            { title: "Episode 9: Sayap Imaginasi", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3926e979983cdce5a9b" },
            { title: "Episode 10: Permulaan Kejohanan Dunia", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3926e979983cdce5a9d" },
            { title: "Episode 11: Pertempuran Diraja", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3986e979983cdce5a9e" },
            { title: "Episode 12: Pelepasan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3986e979983cdce5a9f" },
            { title: "Episode 13: Senjata Pertempuran", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb39d6e979983cdce5aa0" },
            { title: "Episode 14: Name Kod", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb39d6e979983cdce5aa1" },
            { title: "Episode 15: Seri Pejuang", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb39d6e979983cdce5aa2" },
            { title: "Episode 16: Bapa, Kita Berjumpa Lagi", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb39d6e979983cdce5aa3" },
            { title: "Episode 17: Model Jantung", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3c96e979983cdce5aa4" },
            { title: "Episode 18: Anjing Pemburu", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3ce6e979983cdce5aa5" },
            { title: "Episode 19: Pisau Astray", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3ce6e979983cdce5aa6" },
            { title: "Episode 20: Pengkhianatan Aila", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3ce6e979983cdce5aa7" },
            { title: "Episode 21: Di Tengah Zarah", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3d46e979983cdce5aa8" },
            { title: "Episode 22: Meijin Bertanding", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3d46e979983cdce5aa9" },
            { title: "Episode 23: Gunpla Malam", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3d46e979983cdce5aaa" },
            { title: "Episode 24: Perkara Gelap", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3d96e979983cdce5aab" },
            { title: "Episode 25: Perjanjian", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb3d96e979983cdce5aac" }
        ])
    },
    "time_bokan_catalog": {
        id: "time_bokan_series",
        catalogId: "time_bokan_catalog",
        name: "Time Bokan",
        poster: "https://i.postimg.cc/YCyfdWrV/Time-Bokan.jpg",
        description: "Koleksi Time Bokan 24.",
        episodes: createEpisodes([
            { title: "Time Bokan 24 - Episode 01", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb51a6e979983cdce5ab0" },
            { title: "Time Bokan 24 - Episode 02", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb51a6e979983cdce5aad" },
            { title: "Time Bokan 24 - Episode 03", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb51a6e979983cdce5ab1" },
            { title: "Time Bokan 24 - Episode 04", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb51a6e979983cdce5aae" },
            { title: "Time Bokan 24 - Episode 05", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb51a6e979983cdce5ab2" },
            { title: "Time Bokan 24 - Episode 06", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb51a6e979983cdce5aaf" },
            { title: "Time Bokan 24 - Episode 07", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb5226e979983cdce5ab3" },
            { title: "Time Bokan 24 - Episode 08", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb5246e979983cdce5ab4" },
            { title: "Time Bokan 24 - Episode 09", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb5246e979983cdce5ab5" },
            { title: "Time Bokan 24 - Episode 10", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb5246e979983cdce5ab6" },
            { title: "Time Bokan 24 - Episode 12", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb5276e979983cdce5ab7" },
            { title: "Time Bokan 24 - Episode 13", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb5276e979983cdce5ab8" },
            { title: "Time Bokan 24 - Episode 14", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb52d6e979983cdce5ab9" },
            { title: "Time Bokan 24 - Episode 15", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb52d6e979983cdce5aba" },
            { title: "Time Bokan 24 - Episode 16", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb52d6e979983cdce5abb" },
            { title: "Time Bokan 24 - Episode 17", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb52d6e979983cdce5abc" },
            { title: "Time Bokan 24 - Episode 18", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb55d6e979983cdce5abd" },
            { title: "Time Bokan 24 - Episode 19", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb55d6e979983cdce5abe" },
            { title: "Time Bokan 24 - Episode 20", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb55d6e979983cdce5abf" },
            { title: "Time Bokan 24 - Episode 21", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb55d6e979983cdce5ac0" },
            { title: "Time Bokan 24 - Episode 22", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb5636e979983cdce5ac1" },
            { title: "Time Bokan 24 - Episode 23", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb5636e979983cdce5ac2" },
            { title: "Time Bokan 24 - Episode 24 Akhir", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb5686e979983cdce5ac3" }
        ])
    },
    "naruto_catalog": {
        id: "naruto_series",
        catalogId: "naruto_catalog",
        name: "Naruto (Full Episod)",
        poster: "https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg",
        description: "Koleksi penuh episod Naruto.",
        episodes: createEpisodes([
            { title: "Nt Episod 001.mp4", url: "https://files.catbox.moe/6acc97d56e979983cdce58b1.mp4" },
            { title: "Nt Episod 002.mp4", url: "https://files.catbox.moe/6acc97d56e979983cdce58af.mp4" },
            { title: "Nt Episod 003.mp4", url: "https://files.catbox.moe/6acc97d56e979983cdce58b0.mp4" },
            { title: "Nt Episod 004.mp4", url: "https://files.catbox.moe/6acc97d56e979983cdce58ad.mp4" },
            { title: "Nt Episod 005.mp4", url: "https://files.catbox.moe/6acc97d56e979983cdce58ae.mp4" },
            { title: "Nt Episod 006.mp4", url: "https://files.catbox.moe/6acc97d56e979983cdce58ac.mp4" },
            { title: "Nt Episod 007.mp4", url: "https://files.catbox.moe/6acc97de6e979983cdce58b2.mp4" },
            { title: "Nt Episod 008.mp4", url: "https://files.catbox.moe/6acc97de6e979983cdce58b4.mp4" },
            { title: "Nt Episod 009.mp4", url: "https://files.catbox.moe/6acc97de6e979983cdce58b3.mp4" },
            { title: "Nt Episod 010.mp4", url: "https://files.catbox.moe/6acc97de6e979983cdce58b5.mp4" },
            { title: "Nt Episod 011.mp4", url: "https://files.catbox.moe/6acc97e46e979983cdce58b6.mp4" },
            { title: "Nt Episod 012.mp4", url: "https://files.catbox.moe/6acc97e96e979983cdce58b7.mp4" },
            { title: "Nt Episod 013.mp4", url: "https://files.catbox.moe/6acc97e96e979983cdce58b8.mp4" },
            { title: "Nt Episod 014.mp4", url: "https://files.catbox.moe/6acc97e96e979983cdce58b9.mp4" },
            { title: "Nt Episod 015.mp4", url: "https://files.catbox.moe/6acc97e96e979983cdce58ba.mp4" },
            { title: "Nt Episod 016.mp4", url: "https://files.catbox.moe/6acc97e96e979983cdce58bb.mp4" },
            { title: "Nt Episod 017.mp4", url: "https://files.catbox.moe/6acc981a6e979983cdce58bc.mp4" },
            { title: "Nt Episod 018.mp4", url: "https://files.catbox.moe/6acc981a6e979983cdce58bd.mp4" },
            { title: "Nt Episod 019.mp4", url: "https://files.catbox.moe/6acc981a6e979983cdce58be.mp4" },
            { title: "Nt Episod 020.mp4", url: "https://files.catbox.moe/6acc981a6e979983cdce58bf.mp4" },
            { title: "Nt Episod 021.mp4", url: "https://files.catbox.moe/6acc981f6e979983cdce58c0.mp4" },
            { title: "Nt Episod 022.mp4", url: "https://files.catbox.moe/6acc981f6e979983cdce58c1.mp4" },
            { title: "Nt Episod 023.mp4", url: "https://files.catbox.moe/6acc98246e979983cdce58c2.mp4" },
            { title: "Nt Episod 024.mp4", url: "https://files.catbox.moe/6acc98256e979983cdce58c3.mp4" },
            { title: "Nt Episod 025.mp4", url: "https://files.catbox.moe/6acc98266e979983cdce58c4.mp4" },
            { title: "Nt Episod 026.mp4", url: "https://files.catbox.moe/6acc98516e979983cdce58c5.mp4" },
            { title: "Nt Episod 027.mp4", url: "https://files.catbox.moe/6acc98576e979983cdce58c6.mp4" },
            { title: "Nt Episod 028.mp4", url: "https://files.catbox.moe/6acc98576e979983cdce58c7.mp4" },
            { title: "Nt Episod 029.mp4", url: "https://files.catbox.moe/6acc98586e979983cdce58c8.mp4" },
            { title: "Nt Episod 030.mp4", url: "https://files.catbox.moe/6acc985c6e979983cdce58c9.mp4" },
            { title: "Nt Episod 031.mp4", url: "https://files.catbox.moe/6acc985d6e979983cdce58ca.mp4" },
            { title: "Nt Episod 032.mp4", url: "https://files.catbox.moe/6acc985d6e979983cdce58cb.mp4" },
            { title: "Nt Episod 033.mp4", url: "https://files.catbox.moe/6acc98626e979983cdce58cc.mp4" },
            { title: "Nt Episod 034.mp4", url: "https://files.catbox.moe/6acc98626e979983cdce58cd.mp4" },
            { title: "Nt Episod 035.mp4", url: "https://files.catbox.moe/6acc988d6e979983cdce58ce.mp4" },
            { title: "Nt Episod 036.mp4", url: "https://files.catbox.moe/6acc988d6e979983cdce58cf.mp4" },
            { title: "Nt Episod 037.mp4", url: "https://files.catbox.moe/6acc98916e979983cdce58d0.mp4" },
            { title: "Nt Episod 038.mp4", url: "https://files.catbox.moe/6acc98936e979983cdce58d1.mp4" },
            { title: "Nt Episod 039.mp4", url: "https://files.catbox.moe/6acc98966e979983cdce58d2.mp4" },
            { title: "Nt Episod 040.mp4", url: "https://files.catbox.moe/6acc98966e979983cdce58d3.mp4" },
            { title: "Nt Episod 041.mp4", url: "https://files.catbox.moe/6acc98976e979983cdce58d4.mp4" },
            { title: "Nt Episod 042.mp4", url: "https://files.catbox.moe/6acc989c6e979983cdce58d5.mp4" },
            { title: "Nt Episod 043.mp4", url: "https://files.catbox.moe/6acc989c6e979983cdce58d6.mp4" },
            { title: "Nt Episod 044.mp4", url: "https://files.catbox.moe/6acc98a26e979983cdce58d8.mp4" },
            { title: "Nt Episod 045.mp4", url: "https://files.catbox.moe/6acc98a26e979983cdce58d7.mp4" },
            { title: "Nt Episod 046.mp4", url: "https://files.catbox.moe/6acc98c96e979983cdce58d9.mp4" },
            { title: "Nt Episod 047.mp4", url: "https://files.catbox.moe/6acc98c96e979983cdce58da.mp4" },
            { title: "Nt Episod 048.mp4", url: "https://files.catbox.moe/6acc98ca6e979983cdce58db.mp4" },
            { title: "Nt Episod 049.mp4", url: "https://files.catbox.moe/6acc98ce6e979983cdce58dc.mp4" },
            { title: "Nt Episod 050.mp4", url: "https://files.catbox.moe/6acc98cf6e979983cdce58dd.mp4" },
            { title: "Nt Episod 051.mp4", url: "https://files.catbox.moe/6acc98d46e979983cdce58de.mp4" },
            { title: "Nt Episod 052.mp4", url: "https://files.catbox.moe/6acc98d56e979983cdce58df.mp4" },
            { title: "Nt Episod 053.mp4", url: "https://files.catbox.moe/6acc98d96e979983cdce58e0.mp4" },
            { title: "Nt Episod 054.mp4", url: "https://files.catbox.moe/6acc98da6e979983cdce58e1.mp4" },
            { title: "Nt Episod 055.mp4", url: "https://files.catbox.moe/6acc98da6e979983cdce58e2.mp4" },
            { title: "Nt Episod 056.mp4", url: "https://files.catbox.moe/6acc99056e979983cdce58e3.mp4" },
            { title: "Nt Episod 057.mp4", url: "https://files.catbox.moe/6acc99066e979983cdce58e4.mp4" },
            { title: "Nt Episod 058.mp4", url: "https://files.catbox.moe/6acc990c6e979983cdce58e5.mp4" },
            { title: "Nt Episod 059.mp4", url: "https://files.catbox.moe/6acc990c6e979983cdce58e6.mp4" },
            { title: "Nt Episod 060.mp4", url: "https://files.catbox.moe/6acc990d6e979983cdce58e7.mp4" },
            { title: "Nt Episod 061.mp4", url: "https://files.catbox.moe/6acc99116e979983cdce58e8.mp4" },
            { title: "Nt Episod 062.mp4", url: "https://files.catbox.moe/6acc99116e979983cdce58e9.mp4" },
            { title: "Nt Episod 063.mp4", url: "https://files.catbox.moe/6acc99116e979983cdce58ea.mp4" },
            { title: "Nt Episod 064.mp4", url: "https://files.catbox.moe/6acc99186e979983cdce58eb.mp4" },
            { title: "Nt Episod 065.mp4", url: "https://files.catbox.moe/6acc99186e979983cdce58ec.mp4" },
            { title: "Nt Episod 066.mp4", url: "https://files.catbox.moe/6acc99476e979983cdce58ed.mp4" },
            { title: "Nt Episod 067.mp4", url: "https://files.catbox.moe/6acc994c6e979983cdce58ee.mp4" },
            { title: "Nt Episod 068.mp4", url: "https://files.catbox.moe/6acc994c6e979983cdce58ef.mp4" },
            { title: "Nt Episod 069.mp4", url: "https://files.catbox.moe/6acc994c6e979983cdce58f0.mp4" },
            { title: "Nt Episod 070.mp4", url: "https://files.catbox.moe/6acc994c6e979983cdce58f1.mp4" },
            { title: "Nt Episod 071.mp4", url: "https://files.catbox.moe/6acc994d6e979983cdce58f2.mp4" },
            { title: "Nt Episod 072.mp4", url: "https://files.catbox.moe/6acc99516e979983cdce58f3.mp4" },
            { title: "Nt Episod 073.mp4", url: "https://files.catbox.moe/6acc99566e979983cdce58f4.mp4" },
            { title: "Nt Episod 074.mp4", url: "https://files.catbox.moe/6acc99566e979983cdce58f5.mp4" },
            { title: "Nt Episod 075.mp4", url: "https://files.catbox.moe/6acc99566e979983cdce58f6.mp4" },
            { title: "Nt Episod 076.mp4", url: "https://files.catbox.moe/6acc99576e979983cdce58f7.mp4" },
            { title: "Nt Episod 078.mp4", url: "https://files.catbox.moe/6acc998b6e979983cdce58fa.mp4" },
            { title: "Nt Episod 079.mp4", url: "https://files.catbox.moe/6acc998b6e979983cdce58f9.mp4" }
        ])
    },
    "running_man_catalog": {
        id: "running_man_series",
        catalogId: "running_man_catalog",
        name: "Runningman",
        poster: "https://i.postimg.cc/wMYXFx0G/RM-2.jpg",
        description: "Koleksi Episod Running Man Lengkap.",
        episodes: createEpisodes([
            { title: "Episod 1: Times Square", description: "Lee Hyori and Hwang Jung Eum join the casts for their first run.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbff846e979983cdce555e" },
            { title: "Episod 2: Suwon World Cup Stadium, Part 1", description: "Lee Chun Hee and Goo Hara join in.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce5561" },
            { title: "Episod 3: Suwon World Cup Stadium, Part 2", description: "Continuing on from Episode 2.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce555f" },
            { title: "Episod 4: Gwacheon National Science Museum, Part 1", description: "Nichkhun and Jessica guest star.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce5562" },
            { title: "Episod 5: Gwacheon National Science Museum, Part 2", description: "Continuing from episode 4.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc001a6e979983cdce5563" },
            { title: "Episod 6: Namsan Tower", description: "Se7en, Son Dam Bi, and Kim Shin Young join.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce5560" },
            { title: "Episod 7: Sejong Center For The Performing Arts", description: "Jo Kwon, Jung Yong Hwa and Eun Jeong.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc001a6e979983cdce5564" },
            { title: "Episod 8: Seoul Museum of History", description: "Victoria, Lee Joon, and Park Jun Gyu.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc001c6e979983cdce5565" },
            { title: "Episod 9: Lotte World", description: "Shin Bong Sun and Kim Jong Kook.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc001c6e979983cdce5566" },
            { title: "Episod 10: National Museum of Contemporary Art", description: "Cha Tae Hyun and Yoon Se Ah.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc001d6e979983cdce5567" },
            { title: "Episod 11: Seoul Central Post Office", description: "Individually earn Running Balls.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00216e979983cdce5569" },
            { title: "Episod 12: Seoul Design Fair", description: "The Ultimate Design Race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00216e979983cdce5568" },
            { title: "Episod 13: SBS Broadcasting Center", description: "All-Night Broadcast Battle.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00266e979983cdce556a" },
            { title: "Episod 14: Boramae Safety Experience Center", description: "Lizzy returns.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00266e979983cdce556b" },
            { title: "Episod 15: Seoul Metro Train Depot", description: "Subway Chase.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc002c6e979983cdce556c" },
            { title: "Episod 16: I'Park Mall", description: "Earn running balls with receipts.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc002c6e979983cdce556d" },
            { title: "Episod 17: Hanyang Women's University", description: "Find the 4 bells hidden in the school.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00586e979983cdce556e" },
            { title: "Episod 18: Busan International Cruise Ship", description: "Find the 6 map pieces.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00596e979983cdce556f" },
            { title: "Episod 19: Namsangol Hanok Village", description: "Symbols of Longevity.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00596e979983cdce5570" },
            { title: "Episod 20: Korea Meteorological Administration", description: "Find the umbrellas.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc005d6e979983cdce5571" },
            { title: "Episod 21: Gwangmyeong Station", description: "Find the 5 train tickets.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc005d6e979983cdce5572" },
            { title: "Episod 22: Lotte Mart", description: "Decorate the tree.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc005e6e979983cdce5573" },
            { title: "Episod 23: Alpensia Ski Resort", description: "Find the 5 gold medals.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00636e979983cdce5574" },
            { title: "Episod 24: Xi Wi City", description: "Running Man at Xi Wi City.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00686e979983cdce5575" },
            { title: "Episod 25: Museum Comics Information Center", description: "Bucheon race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00696e979983cdce5576" },
            { title: "Episod 26: Nakwon Instruments Shopping Center", description: "Insadong race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00696e979983cdce5577" },
            { title: "Episod 27: Seoul Arts Center", description: "Chang-min Shim, Jung Yunho.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00696e979983cdce5578" },
            { title: "Episod 28: Ansung Natural Resort", description: "Ansung Natural Resort.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00946e979983cdce5579" },
            { title: "Episod 29: COEX Aquarium", description: "Gangnam COEX Aquarium.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00946e979983cdce557a" },
            { title: "Episod 30: National Center for Korean Traditional Performing Arts", description: "Choo Shin Soo, Ryu Hyun Jin, Jin Sae Yeon.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00996e979983cdce557b" },
            { title: "Episod 31: Alpensia Ocean 700 Water Park", description: "Ocean 700 Water Park.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc009a6e979983cdce557c" },
            { title: "Episod 32: Woongjin Think Big Office", description: "Paju Woongjin Office.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc009f6e979983cdce557d" },
            { title: "Episod 33: Incheon International Airport", description: "Incheon Airport special.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a06e979983cdce557e" },
            { title: "Episod 34: Hongdae Area", description: "Hongdae Mapo-gu.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a46e979983cdce557f" },
            { title: "Episod 35: Nanji Camp, Part 1", description: "Nanji Camp Sangam-dong.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a46e979983cdce5580" },
            { title: "Episod 36: Nanji Camp, Part 2", description: "Nanji Camp continuation.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a56e979983cdce5581" },
            { title: "Episod 37: Metapolis", description: "Hwaseong Metapolis.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a56e979983cdce5582" },
            { title: "Episod 38: Seoul Medical Center", description: "Seoul Medical Center.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00d06e979983cdce5583" },
            { title: "Episod 39: Seoul Folk Flea Market", description: "Flea Market special.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00d56e979983cdce5584" },
            { title: "Episod 40: Petite France", description: "Gapyeong Petite France.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00d66e979983cdce5585" },
            { title: "Episod 41: National Digital Library of Korea", description: "Guest: Lee Sun-kyun.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00da6e979983cdce5586" },
            { title: "Episod 42: SBS Tanhyeon-dong Production Center", description: "SBS Production Center.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00db6e979983cdce5587" },
            { title: "Episod 43: Daegu Stadium", description: "Guest: IU.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00dc6e979983cdce5588" },
            { title: "Episod 44: Cheil Worldwide Building, Part 1", description: "Itaewon race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00e06e979983cdce5589" },
            { title: "Episod 45: Cheil Worldwide Building, Part 2", description: "Continuing race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00e06e979983cdce558a" },
            { title: "Episod 46: Kyobo Book Center, Part 1", description: "Kyobo Book Center.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00e06e979983cdce558b" },
            { title: "Episod 47: Kyobo Book Center, Part 2", description: "Kyobo Book Center continuation.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00e66e979983cdce558c" },
            { title: "Episod 48: National Museum of Korea", description: "National Museum.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc010d6e979983cdce558d" },
            { title: "Episod 49: Dream Forest", description: "Dream Forest Gangbuk-gu.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01116e979983cdce558e" },
            { title: "Episod 50: Bangkok, Thailand", description: "Bangkok Overseas Special.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01136e979983cdce558f" },
            { title: "Episod 51: Pattaya, Thailand", description: "Pattaya Overseas Special.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01136e979983cdce5590" },
            { title: "Episod 52: Gyeongju World", description: "Gyeongju World.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01176e979983cdce5591" },
            { title: "Episod 53: Blue One Resort", description: "Gyeongju Blue One Resort.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01176e979983cdce5592" },
            { title: "Episod 54: 63 Building", description: "Protect the Boss Challenge.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01186e979983cdce5593" },
            { title: "Episod 55: Wootdali Culture Village, Part 1", description: "Pyeongtaek Culture Village.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc011d6e979983cdce5594" },
            { title: "Episod 56: Wootdali Culture Village, Part 2", description: "Culture Village continuation.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01226e979983cdce5595" },
            { title: "Episod 57: Jeju-do, Part 1", description: "Jeju Island Special.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01486e979983cdce5596" },
            { title: "Episod 58: Jeju-do, Part 2", description: "Jeju Island continuation.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01496e979983cdce5597" },
            { title: "Episod 59: Old Seoul Station", description: "Old Seoul Station.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc014d6e979983cdce5598" },
            { title: "Episod 60: D-Cube City", description: "Sindorim D-Cube City.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01526e979983cdce5599" },
            { title: "Episod 61: Beijing, China, Part 1", description: "Beijing Overseas Special.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01546e979983cdce559a" },
            { title: "Episod 62: Beijing, China, Part 2", description: "Beijing Overseas continuation.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01556e979983cdce559b" },
            { title: "Episod 63: Goyang, Gyeonggi-do", description: "Goyang race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01586e979983cdce559c" },
            { title: "Episod 64: Paju English Village", description: "English Village race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01586e979983cdce559f" },
            { title: "Episod 65: Baekje Military Museum", description: "Nonsan museum race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01586e979983cdce559e" },
            { title: "Episod 66: Hangang Park", description: "Yeouido Hangang Park.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01586e979983cdce559d" },
            { title: "Episod 67: Gungpyeong Village", description: "Hwaseong village.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc015d6e979983cdce55a0" },
            { title: "Episod 68: Canal Walk, Songdo", description: "Incheon Canal Walk.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc015e6e979983cdce55a1" },
            { title: "Episod 69: Incheon Culture & Arts Center", description: "Incheon Arts Center.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01896e979983cdce55a2" },
            { title: "Episod 70: KT Building, Bundang", description: "Son Ye-jin, Lee Min-ki.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01896e979983cdce55a3" },
            { title: "Episod 71: Gyeonghui Palace", description: "Gyeonghui Palace.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01896e979983cdce55a4" },
            { title: "Episod 72: Hongkong, China, Part 1", description: "Hong Kong Special Part 1.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc018f6e979983cdce55a5" },
            { title: "Episod 73: Hongkong, China, Part 2", description: "Hong Kong Special Part 2.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01946e979983cdce55a6" },
            { title: "Episod 74: Running Man Survival", description: "Superpower Battle 1.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01956e979983cdce55a7" },
            { title: "Episod 75: Paris Park, Mokdong", description: "New Year Special Race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01956e979983cdce55a8" },
            { title: "Episod 76: Yeosu City Hall", description: "Guest: Joo Sang-uk.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01956e979983cdce55a9" },
            { title: "Episod 77: Hahwa Island", description: "Yeosu Hahwa Island.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc019b6e979983cdce55aa" },
            { title: "Episod 78: Lotte Mall, Gangseo-gu", description: "Lotte Mall race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01c56e979983cdce55ab" },
            { title: "Episod 79: Club Harmony Cruise Ship", description: "Busan Cruise Ship.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01c56e979983cdce55ac" },
            { title: "Episod 80: Paradise Spa Dogo", description: "Asan Spa Dogo.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01c76e979983cdce55ad" },
            { title: "Episod 81: Songdo Convensia", description: "Gary Kang special.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01c76e979983cdce55ae" },
            { title: "Episod 82: Shinsegae Department Store", description: "Centum City Busan.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01ca6e979983cdce55af" },
            { title: "Episod 83: Nurimaru APEC House", description: "Haeundae Busan.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01cb6e979983cdce55b0" },
            { title: "Episod 84: Seodaemun Museum of Natural History", description: "Guest: T.O.P BIGBANG.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01cb6e979983cdce55b1" },
            { title: "Episod 85: Cheil Industries Fashion Division Head Office", description: "Running Man vs Big Bang.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01d06e979983cdce55b3" },
            { title: "Episod 86: SBS Broadcasting Center", description: "Guest: Ha Ji-Won.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01d06e979983cdce55b2" },
            { title: "Episod 87: Korea Job World", description: "Bundang Job World.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01d66e979983cdce55b4" },
            { title: "Episod 88: The Shilla Jeju", description: "Jeju-do special.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01d66e979983cdce55b5" },
            { title: "Episod 89: Ilchul Land", description: "Jeju-do Ilchul Land.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01fd6e979983cdce55b6" },
            { title: "Episod 90: Cheorwon-gun, Gangwon-do", description: "Guest: Lee Deok-hwa.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01fd6e979983cdce55b7" },
            { title: "Episod 91: SUNY Korea, Songdo", description: "Yoomes Bond Returns.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00fe6e979983cdce55b8" },
            { title: "Episod 92: Somuui Island", description: "Somuui Island Incheon.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02036e979983cdce55b9" },
            { title: "Episod 93: Seoul Land", description: "Non-stop Voting Race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02036e979983cdce55ba" },
            { title: "Episod 94: Mokdong Wedding Palace", description: "Guests: Haha, Kim Jong-kook, Bae Suzy.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02036e979983cdce55bb" },
            { title: "Episod 95: Pantech Building", description: "Mapo-gu Pantech Building.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02096e979983cdce55bd" },
            { title: "Episod 96: University of Incheon Songdo Campus", description: "Asian Dream Cup Special.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02096e979983cdce55bc" },
            { title: "Episod 97: POSCO Global R&D Center", description: "Asian Dream Cup Part 2.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc020e6e979983cdce55be" },
            { title: "Episod 98: Tesco Home Plus Academy", description: "Zombie Race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc020e6e979983cdce55bf" },
            { title: "Episod 99: Xi Gallery, Mapo-gu", description: "Lee Kwang-soo Kingdom Race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02396e979983cdce55c0" },
            { title: "Episod 100: Mecenatpolis", description: "War of the Gods.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc023e6e979983cdce55c1" }
        ])
    },
    "demon_slayer_catalog": {
        id: "demon_slayer_series",
        catalogId: "demon_slayer_catalog",
        name: "Demon Slayer Episode 1-26",
        poster: "https://i.postimg.cc/DyLm8nhJ/DS-DP.jpg",
        description: "Demon Slayer Episode 1 hingga 26.",
        episodes: createEpisodes([
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca07b6e979983cdce598b",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca07b6e979983cdce5989",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca07b6e979983cdce598d",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca07b6e979983cdce5988",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca07b6e979983cdce598c",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca07b6e979983cdce598a",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca0836e979983cdce598e",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca0856e979983cdce598f",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca0856e979983cdce5990",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca0856e979983cdce5991",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca0886e979983cdce5992",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca0886e979983cdce5993",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca08d6e979983cdce5994",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca08d6e979983cdce5995",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca08e6e979983cdce5996",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca08e6e979983cdce5997",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca0c06e979983cdce5998",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca0c56e979983cdce5999",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca0c56e979983cdce599b",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca0c56e979983cdce599a",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca0c66e979983cdce599c",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca0cb6e979983cdce599d",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca0cc6e979983cdce599e",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca0d16e979983cdce599f",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca0d16e979983cdce59a0",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca0f66e979983cdce59a1"
        ])
    },
    "jjk_catalog": {
        id: "jjk_series",
        catalogId: "jjk_catalog",
        name: "Jujutsu Kaisen Episode 1-24",
        poster: "https://i.postimg.cc/dtrDLwFL/JJK-DP.jpg",
        description: "Jujutsu Kaisen Episode 1 hingga 24.",
        episodes: createEpisodes([
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca8136e979983cdce5a4d",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca8136e979983cdce5a4e",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca8136e979983cdce5a4f",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca8136e979983cdce5a50",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca8136e979983cdce5a51",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca8136e979983cdce5a52",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca81b6e979983cdce5a53",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca81d6e979983cdce5a54",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca81d6e979983cdce5a55",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca81d6e979983cdce5a56",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca8206e979983cdce5a57",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca8206e979983cdce5a58",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca8256e979983cdce5a59",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca8256e979983cdce5a5a",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca83a6e979983cdce5a5b",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca83b6e979983cdce5a5c",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca83b6e979983cdce5a5d",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca83b6e979983cdce5a5e",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca8406e979983cdce5a5f",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca8406e979983cdce5a60",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca8406e979983cdce5a61",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca8466e979983cdce5a62",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca8466e979983cdce5a63",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca8466e979983cdce5a64"
        ])
    },
    "boruto_catalog": {
        id: "boruto_series",
        catalogId: "boruto_catalog",
        name: "Boruto Collection",
        poster: "https://i.postimg.cc/BZdkmGKm/Boruto-1.jpg",
        description: "Koleksi Boruto Episod terpilih.",
        episodes: createEpisodes([
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca26e6e979983cdce59d3",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca26e6e979983cdce59d4",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca26e6e979983cdce59d5",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2736e979983cdce59d6",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca27a6e979983cdce59d7",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2a06e979983cdce59d8",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2a06e979983cdce59d9",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2a06e979983cdce59da",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2a66e979983cdce59db",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2a66e979983cdce59dc",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2aa6e979983cdce59dd",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2ab6e979983cdce59de",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2ab6e979983cdce59df",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2b16e979983cdce59e0",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2b16e979983cdce59e1",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2dc6e979983cdce59e2",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2e06e979983cdce59e3",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2e06e979983cdce59e4",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2e16e979983cdce59e6",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2e16e979983cdce59e5",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2e66e979983cdce59e7",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2e66e979983cdce59e8",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2eb6e979983cdce59e9",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2ec6e979983cdce59ea",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2ec6e979983cdce59eb",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2f26e979983cdce59ec",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3186e979983cdce59ed",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca31e6e979983cdce59ee",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca31e6e979983cdce59ef",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3246e979983cdce59f0",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3246e979983cdce59f1",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3256e979983cdce59f2",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3296e979983cdce59f3",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3296e979983cdce59f4",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3296e979983cdce59f5",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca32f6e979983cdce59f6",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca32f6e979983cdce59f7",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3546e979983cdce59f8",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca35a6e979983cdce59f9",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca35c6e979983cdce59fa",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca35f6e979983cdce59fb",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca35f6e979983cdce59fc",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3606e979983cdce59fd",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3606e979983cdce59fe",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3656e979983cdce59ff",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3906e979983cdce5a00",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3906e979983cdce5a01",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3906e979983cdce5a02",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3956e979983cdce5a03",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca39b6e979983cdce5a04",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca39b6e979983cdce5a05",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca39b6e979983cdce5a06",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3a06e979983cdce5a07",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3a06e979983cdce5a08",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3a06e979983cdce5a09",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3a56e979983cdce5a0a",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3cd6e979983cdce5a0b",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3cd6e979983cdce5a0c",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3cd6e979983cdce5a0d",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3d26e979983cdce5a0e",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3d76e979983cdce5a0f",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3d76e979983cdce5a10",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3d76e979983cdce5a11",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3d76e979983cdce5a12",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3dc6e979983cdce5a13",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca3dd6e979983cdce5a14",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6056e979983cdce5a15",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6056e979983cdce5a16",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6056e979983cdce5a17",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6056e979983cdce5a18",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6056e979983cdce5a19",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6056e979983cdce5a1a",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca60d6e979983cdce5a1b",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca60d6e979983cdce5a1c",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca60d6e979983cdce5a1d",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca60d6e979983cdce5a1e",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6136e979983cdce5a1f",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6136e979983cdce5a20",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6196e979983cdce5a21",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca77e6e979983cdce5a3d",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca77e6e979983cdce5a3c",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca77e6e979983cdce5a39",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca77e6e979983cdce5a3a",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca77e6e979983cdce5a3b",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca77e6e979983cdce5a38",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca7866e979983cdce5a40",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca7866e979983cdce5a3f",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca7866e979983cdce5a3e",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca7866e979983cdce5a41",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca78c6e979983cdce5a42",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca78c6e979983cdce5a43",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca7916e979983cdce5a45",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca7916e979983cdce5a44",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca7916e979983cdce5a46",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca7bd6e979983cdce5a47",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca7bd6e979983cdce5a48",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca7bd6e979983cdce5a49",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca7c26e979983cdce5a4a",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca7c26e979983cdce5a4c",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca7c26e979983cdce5a4b",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1706e979983cdce59a6",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1706e979983cdce59a5",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1706e979983cdce59a3",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1706e979983cdce59a4",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1706e979983cdce59a2",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1706e979983cdce59a7",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1786e979983cdce59a8",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1786e979983cdce59a9",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1786e979983cdce59aa",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1786e979983cdce59ab",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca17e6e979983cdce59ac",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca17e6e979983cdce59ad",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1836e979983cdce59ae",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1836e979983cdce59af",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1836e979983cdce59b0",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1836e979983cdce59b1",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1af6e979983cdce59b2",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1af6e979983cdce59b3",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1b46e979983cdce59b4",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1b46e979983cdce59b5",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1ba6e979983cdce59b6",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1ba6e979983cdce59b7",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1ba6e979983cdce59b8",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1bf6e979983cdce59b9",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1bf6e979983cdce59ba",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1eb6e979983cdce59bb",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1eb6e979983cdce59bc",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1ec6e979983cdce59bd",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1f06e979983cdce59be",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1f06e979983cdce59bf",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1f06e979983cdce59c0",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1f66e979983cdce59c1",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1f66e979983cdce59c2",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1fa6e979983cdce59c3",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca1fb6e979983cdce59c4",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2276e979983cdce59c5",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2276e979983cdce59c6",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca22d6e979983cdce59c7",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca22d6e979983cdce59c8",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca22d6e979983cdce59c9",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2336e979983cdce59ca",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2336e979983cdce59cb",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2386e979983cdce59cc",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2386e979983cdce59cd",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2396e979983cdce59ce",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2636e979983cdce59cf",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2636e979983cdce59d0",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2686e979983cdce59d1",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca2686e979983cdce59d2"
        ])
    },
    "hagemaru_full_catalog": {
        id: "hagemaru_full_series",
        catalogId: "hagemaru_full_catalog",
        name: "Hagemaru Collection",
        poster: "https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg",
        description: "Koleksi Episod Hagemaru.",
        episodes: createEpisodes([
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6a96e979983cdce5a26",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6a96e979983cdce5a24",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6a96e979983cdce5a22",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6a96e979983cdce5a23",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6a96e979983cdce5a25",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6a96e979983cdce5a27",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6b16e979983cdce5a28",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6b36e979983cdce5a2b",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6b36e979983cdce5a29",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6b36e979983cdce5a2a",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6b66e979983cdce5a2c",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6b66e979983cdce5a2d",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6bc6e979983cdce5a2e",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6bc6e979983cdce5a2f",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6bc6e979983cdce5a30",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6bc6e979983cdce5a31",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6ef6e979983cdce5a32",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6ef6e979983cdce5a33",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6ef6e979983cdce5a34",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6ef6e979983cdce5a35",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6f66e979983cdce5a36",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acca6fa6e979983cdce5a37"
        ])
    },
    "doraemon_movie_catalog": {
        id: "doraemon_movie_catalog",
        isMulti: true,
        items: [
            { id: "dm_parallel_visit", name: "Doraemon: The Record of Nobita's Parallel Visit to the West (1988)", poster: "https://i.postimg.cc/K8McK6Wz/D1.jpg", description: "Doraemon Movie 1988", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accab1d6e979983cdce5a66" },
            { id: "dm_treasure_island", name: "Doraemon: Nobita's Treasure Island (2018)", poster: "https://i.postimg.cc/cJGxfDqT/D2.jpg", description: "Doraemon Movie 2018 Malay Dubbed", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accab1d6e979983cdce5a68" },
            { id: "dm_kachi_kochi", name: "Doraemon: Great Adventure in The Antarctic Kachi Kochi (2017)", poster: "https://i.postimg.cc/L814qcbG/D3.jpg", description: "Doraemon Movie 2017", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accab1d6e979983cdce5a67" },
            { id: "dm_2003_nobita", name: "Doraemon 2003 Nobita", poster: "https://i.postimg.cc/SKLydWkb/D4.jpg", description: "Doraemon Movie 2003", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accab1d6e979983cdce5a65" },
            { id: "dm_stand_by_me", name: "Doraemon Stand By Me (2014)", poster: "https://i.postimg.cc/tCfC4q2W/D5.jpg", description: "Doraemon Stand By Me Malay Dubbed", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accab1d6e979983cdce5a69" },
            { id: "dm_antartika_2017", name: "Doraemon 2017 - Benua Antartika", poster: "https://i.postimg.cc/9FSFQmJy/D6.jpg", description: "Doraemon 2017 Malay Dub", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accab1d6e979983cdce5a6a" },
            { id: "dm_steel_troops", name: "Doraemon Nobita and the Steel Troops (1986)", poster: "https://i.postimg.cc/QxVdD9kK/D7.jpg", description: "Doraemon Movie 1986", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accab256e979983cdce5a6c" },
            { id: "dm_robot_kingdom", name: "Doraemon Nobita in the Robot Kingdom (2002)", poster: "https://i.postimg.cc/YqjC7Gfh/D8.jpg", description: "Doraemon Movie 2002", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accab256e979983cdce5a6d" },
            { id: "dm_haunts_of_evil", name: "Doraemon Nobita and the Haunts of Evil (1982)", poster: "https://i.postimg.cc/yYW8KgXX/D9.jpg", description: "Doraemon Movie 1982", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accab256e979983cdce5a6b" },
            { id: "dm_undersea_devil", name: "Doraemon Nobita and the Castle of the Undersea Devil (1983)", poster: "https://i.postimg.cc/3wjK1g71/D10.jpg", description: "Doraemon Movie 1983", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accab256e979983cdce5a6e" },
            { id: "dm_birth_of_japan", name: "Doraemon Nobita and the Birth of Japan (2016)", poster: "https://i.postimg.cc/8kZzxBWS/D11.jpg", description: "Doraemon Movie 2016", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accab2b6e979983cdce5a70" },
            { id: "dm_spacetime_odyssey", name: "Doraemon Nobita in the Wan Nyan Spacetime Odyssey (2004)", poster: "https://i.postimg.cc/FFTHwgSq/D12.jpg", description: "Doraemon Movie 2004", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accab2a6e979983cdce5a6f" },
            { id: "dm_movie_extra_1", name: "Doraemon Movie Special 1", poster: "https://i.postimg.cc/Bb7ZD43r/D13.png", description: "Doraemon Special Movie", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accab306e979983cdce5a71" },
            { id: "dm_dinosaur_2006", name: "Doraemon Nobita's Dinosaur (2006)", poster: "https://i.postimg.cc/90gXTCVq/D14.webp", description: "Doraemon Movie 2006", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accab306e979983cdce5a72" },
            { id: "dm_museum_2013", name: "Doraemon: Nobita and the Secret Gadget Museum (2013)", poster: "https://i.postimg.cc/4yfjzS1C/Doraemon-The-Movie-Nobita-and-Secret-Gadget-Museum.jpg", description: "Doraemon Museum 2013", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb5fa6e979983cdce5ac4" },
            { id: "dm_space_heroes_2015", name: "Doraemon: Nobita & The Space Heroes (2015)", poster: "https://i.postimg.cc/j2xBzF4Z/Doraemon-The-Movie-Nobita-The-Space-Heroes.jpg", description: "Doraemon Space Heroes 2015", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb6076e979983cdce5ac5" },
            { id: "dm_spaceblazer_2009", name: "Doraemon: New Record of Nobita's Spaceblazer (2009)", poster: "https://i.postimg.cc/wMqnhGQF/Doraemon-The-Movie-New-Record-of-Nobita-Spaceblazer.jpg", description: "Doraemon Spaceblazer 2009", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb6136e979983cdce5ac6" },
            { id: "dm_stand_by_me_2", name: "Stand by Me Doraemon 2 (2020)", poster: "https://i.postimg.cc/WzNxMHw8/Doraemon-Stand-By-Me-2.jpg", description: "Stand by Me Doraemon 2", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb6196e979983cdce5ac7" },
            { id: "dm_stand_by_me_1", name: "Stand by Me Doraemon (2014)", poster: "https://i.postimg.cc/wMqnhGQV/Doraemon-Stand-By-Me.jpg", description: "Stand by Me Doraemon 1", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb6236e979983cdce5ac8" }
        ]
    },
    "naruto_movie_catalog": {
        id: "naruto_movie_catalog",
        isMulti: true,
        items: [
            { id: "nm_3", name: "Naruto The Movie 3: Guardians of the Crescent Moon Kingdom", poster: "https://i.postimg.cc/qvRm0kWy/Naruto-The-Movie-3-Guardians-of-the-Crescent-Moon-Kingdom-(Malay-Dub).jpg", description: "Naruto Movie 3 Malay Dub", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accaf986e979983cdce5a74" },
            { id: "nm_stone_of_gelel", name: "Naruto The Movie: Legend of the Stone of Gelel", poster: "https://i.postimg.cc/7Z6BDxj2/Naruto-the-Movie-Legend-of-the-Stone-of-Gelel.jpg", description: "Naruto Movie Legend of the Stone of Gelel", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accaf986e979983cdce5a75" },
            { id: "nm_land_of_snow", name: "Naruto The Movie: Ninja Clash in the Land of Snow", poster: "https://i.postimg.cc/SxsZqyH8/Naruto-the-Movie-Ninja-Clash-in-the-Land-of-Snow.jpg", description: "Naruto Movie Ninja Clash in the Land of Snow", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accaf986e979983cdce5a73" }
        ]
    },
    "chibi_maruko_catalog": {
        id: "chibi_maruko_catalog",
        isMulti: true,
        items: [
            { id: "cm_ono_sugiyama", name: "Chibi Maruko Chan: Ono and Sugiyama (1990)", poster: "https://i.postimg.cc/ZnmB5THS/c1.jpg", description: "Chibi Maruko Chan Movie Remastered", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accafdb6e979983cdce5a76" }
        ]
    },
    "kisah_sahabat_catalog": {
        id: "kisah_sahabat_series",
        catalogId: "kisah_sahabat_catalog",
        name: "Kisah Para Sahabat Nabi",
        poster: "https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg",
        description: "Koleksi Kisah Para Sahabat Nabi Muhammad SAW.",
        episodes: createEpisodes([
            { title: "Nyawa Sebanyak Helaian Rambutnya Untuk Syahid (Bahagian 1)", url: "https://files.catbox.moe/wcvfir.mp4" },
            { title: "Nyawa Sebanyak Helaian Rambutnya Untuk Syahid (Bahagian 2)", url: "https://files.catbox.moe/zcfs7v.mp4" },
            { title: "Penjaga Rahsia Rasulullah (Bahagian 1)", url: "https://files.catbox.moe/zfu53u.mp4" },
            { title: "Penjaga Rahsia Rasulullah (Bahagian 2)", url: "https://files.catbox.moe/sf21kq.mp4" },
            { title: "Pernah Dihalal Darah Akhirnya Menjadi Pejuang Islam (Bahagian 1)", url: "https://files.catbox.moe/1mt5rk.mp4" },
            { title: "Pernah Dihalal Darah Akhirnya Menjadi Pejuang Islam (Bahagian 2)", url: "https://files.catbox.moe/25jmvh.mp4" },
            { title: "Saidina Anas, Pembantu Rasulullah (Bahagian 1)", url: "https://files.catbox.moe/4wkmwq.mp4" },
            { title: "Saidina Anas, Pembantu Rasulullah (Bahagian 2)", url: "https://files.catbox.moe/bedd23.mp4" },
            { title: "Sehinggakan Rasulullah ﷺ Menggelarkannya Kebajikan (Bahagian 1)", url: "https://files.catbox.moe/sannr9.mp4" },
            { title: "Sehinggakan Rasulullah ﷺ Menggelarkannya Kebajikan (Bahagian 2)", url: "https://files.catbox.moe/nripoi.mp4" },
            { title: "Seribu Dinar Habis Di Sedekah Sebelum Sampai Ke Rumah (Bahagian 1)", url: "https://files.catbox.moe/1nn3qk.mp4" },
            { title: "Seribu Dinar Habis Di Sedekah Sebelum Sampai Ke Rumah (Bahagian 2)", url: "https://files.catbox.moe/7logen.mp4" },
            { title: "Beliau Khalifah Pertama Islam Andai Tiada Abu Bakar (Bahagian 1)", url: "https://files.catbox.moe/tk0k2f.mp4" },
            { title: "Beliau Khalifah Pertama Islam Andai Tiada Abu Bakar (Bahagian 2)", url: "https://files.catbox.moe/c1hj32.mp4" },
            { title: "Dulu Seorang Raja Yang Pernah Ditawan Tentera Islam (Bahagian 1)", url: "https://files.catbox.moe/bog9y2.mp4" },
            { title: "Dulu Seorang Raja Yang Pernah Ditawan Tentera Islam (Bahagian 2)", url: "https://files.catbox.moe/cptiao.mp4" },
            { title: "JANGAN Lantik Beliau Panglima Perang.. Terlalu BERANI! (Bahagian 1)", url: "https://files.catbox.moe/8w4fx1.mp4" },
            { title: "JANGAN Lantik Beliau Panglima Perang.. Terlalu BERANI! (Bahagian 2)", url: "https://files.catbox.moe/d38404.mp4" },
            { title: "Membunuh 100 Musyrikin Dalam Pertarungan 1 Lawan 1 (Bahagian 1)", url: "https://files.catbox.moe/beiqu0.mp4" },
            { title: "Membunuh 100 Musyrikin Dalam Pertarungan 1 Lawan 1 (Bahagian 2)", url: "https://files.catbox.moe/g3sk9m.mp4" },
            { title: "Seorang Yang Buta Tetapi Merupakan Pemegang Panji Perang", url: "https://files.catbox.moe/hwp5xc.mp4" },
            { title: "Andai Iman Ini Di Bintang Suraya, Nescaya Dicapai Pemuda Ini", url: "https://files.catbox.moe/d7f7gs.mp4" },
            { title: "Ayah & Anak Syahid Di Medan Yang Sama", url: "https://files.catbox.moe/sdzl00.mp4" },
            { title: "Beliau Adalah Panglima Pertama Misi Ketenteraan", url: "https://files.catbox.moe/m0zape.mp4" },
            { title: "Dialah Yang Pertama Memberi Salam Kepada Rasulullah ﷺ", url: "https://files.catbox.moe/ekaiht.mp4" },
            { title: "Meminta Simpan Jenazah Di Pintu Gerbang Utama Konstantinopel", url: "https://files.catbox.moe/ewxgop.mp4" },
            { title: "Si Pembunuh Tertunduk Malu Di Hadapan Rasulullah ﷺ", url: "https://files.catbox.moe/i9sqq7.mp4" },
            { title: "Mempunyai Suara Bacaan Al-Quran Yang Merdu", url: "https://files.catbox.moe/gze5xs.mp4" }
        ])
    },
    "malaysian_movies_catalog": {
        id: "malaysian_movies_catalog",
        isMulti: true,
        items: [
            { id: "mm_congkak", name: "Congkak", poster: "https://i.postimg.cc/PxxN1gWN/congkak.jpg", description: "Filem Congkak", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbf8f16e979983cdce554e" },
            { id: "mm_damping_malam", name: "Damping Malam", poster: "https://i.postimg.cc/rsn7tvjT/Damping-Malam.jpg", description: "Filem Damping Malam", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbf8f36e979983cdce5550" },
            { id: "mm_dorm_melati", name: "Dorm Melati", poster: "https://i.postimg.cc/7hh7YCsm/dormmelati.jpg", description: "Filem Dorm Melati", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbf8f26e979983cdce554f" },
            { id: "mm_flat_3a", name: "Flat 3A", poster: "https://i.postimg.cc/qqqnMtbZ/flat3a.jpg", description: "Filem Flat 3A", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbfc716e979983cdce5551" },
            { id: "mm_gudang_kubur", name: "Gudang Kubur", poster: "https://i.postimg.cc/wMMJTtf4/gudangkubur.jpg", description: "Filem Gudang Kubur", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbfc716e979983cdce5552" },
            { id: "mm_ia_wujud", name: "Ia Wujud", poster: "https://i.postimg.cc/yxx9YJQt/iawujud.jpg", description: "Filem Ia Wujud", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbfc736e979983cdce5554" },
            { id: "mm_highland_tower", name: "Highland Tower", poster: "https://i.postimg.cc/tJJPC1Sf/highlandtower.jpg", description: "Filem Highland Tower", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbfc736e979983cdce5553" },
            { id: "mm_jangan_pandang_belakang", name: "Jangan Pandang Belakang", poster: "https://i.postimg.cc/8ccWPFK2/janganpandangbelakang.gif", description: "Filem Jangan Pandang Belakang", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbfc746e979983cdce5557" },
            { id: "mm_hantu_kak_limah_balik_rumah", name: "Hantu Kak Limah Balik Rumah", poster: "https://i.postimg.cc/BbbDQ8YV/hantukaklimahbalikrumah.jpg", description: "Filem Hantu Kak Limah Balik Rumah", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbfc736e979983cdce5555" },
            { id: "mm_jalan_puncak_alam", name: "Jalan Puncak Alam", poster: "https://i.postimg.cc/WzzrbDWx/jalanpuncakalam.jpg", description: "Filem Jalan Puncak Alam", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbfc736e979983cdce5556" },
            { id: "mm_jangan_tegur", name: "Jangan Tegur", poster: "https://i.postimg.cc/3NNpJyfM/jangantegur.jpg", description: "Filem Jangan Tegur", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbfc756e979983cdce5558" },
            { id: "mm_jerit_malam", name: "Jerit Malam", poster: "https://i.postimg.cc/6qPZ79gM/jeritmalam.jpg", description: "Filem Jerit Malam", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbfc766e979983cdce5559" },
            { id: "mm_keranda_tok_wan_terbang", name: "Keranda Tok Wan Terbang", poster: "https://i.postimg.cc/wMrNt6ZP/kerandatokwanterbang.jpg", description: "Filem Keranda Tok Wan Terbang", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbfc806e979983cdce555c" },
            { id: "mm_karak", name: "Karak", poster: "https://i.postimg.cc/D00syWpk/karak.jpg", description: "Filem Karak", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbfc7b6e979983cdce555a" },
            { id: "mm_kelibat", name: "Kelibat", poster: "https://i.postimg.cc/kGHSVnzj/kelibat.jpg", description: "Filem Kelibat", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbfc7b6e979983cdce555b" },
            { id: "mm_malam_tahlil_suhaila_balik", name: "Malam Tahlil Suhaila Balik", poster: "https://i.postimg.cc/yxGRJVtp/malamtahlilsuhailabalik.jpg", description: "Filem Malam Tahlil Suhaila Balik", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbfdfc6e979983cdce555d" },
            { id: "mm_mami_jarum_the_movie", name: "Mami Jarum The Movie", poster: "https://i.postimg.cc/rsH4d83v/mamijarumthemovie.jpg", description: "Filem Mami Jarum The Movie", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc05d16e979983cdce55c2" },
            { id: "mm_misteri_jalan_lama", name: "Misteri Jalan Lama", poster: "https://i.postimg.cc/HnNMJpFC/misterijalanlama.jpg", description: "Filem Misteri Jalan Lama", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc05d16e979983cdce55c3" },
            { id: "mm_mami_jarum_junior", name: "Mami Jarum Junior", poster: "https://i.postimg.cc/6qPZ79gP/mamijarumjunior.jpg", description: "Filem Mami Jarum Junior", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc05d16e979983cdce55c5" },
            { id: "mm_momok_2", name: "Momok 2", poster: "https://i.postimg.cc/gj7hwY1b/momok2.jpg", description: "Filem Momok 2", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc05d16e979983cdce55c4" },
            { id: "mm_minyak_dagu", name: "Minyak Dagu", poster: "https://i.postimg.cc/qqFKtkWV/minyakdagu-jpg.jpg", description: "Filem Minyak Dagu", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc05d36e979983cdce55c7" },
            { id: "mm_mantra", name: "Mantra", poster: "https://i.postimg.cc/J0FXy1Sw/mantra.jpg", description: "Filem Mantra", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc05d26e979983cdce55c6" },
            { id: "mm_momok_3", name: "Momok 3", poster: "https://i.postimg.cc/gj7hwY1W/momok3.jpg", description: "Filem Momok 3", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc05d56e979983cdce55c8" },
            { id: "mm_momok_the_movie", name: "Momok The Movie", poster: "https://i.postimg.cc/8cYvF1xT/momokthemovie.jpg", description: "Filem Momok The Movie", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc05da6e979983cdce55c9" },
            { id: "mm_nasi_tangas", name: "Nasi Tangas", poster: "https://i.postimg.cc/qqFKtkW4/nasitangas.jpg", description: "Filem Nasi Tangas", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc06936e979983cdce55ca" },
            { id: "mm_munafik", name: "Munafik", poster: "https://i.postimg.cc/d3fC7qgF/munafik.jpg", description: "Filem Munafik", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc06936e979983cdce55cb" },
            { id: "mm_paku", name: "Paku", poster: "https://i.postimg.cc/WzyZD2xN/paku.jpg", description: "Filem Paku", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc074d6e979983cdce55cc" },
            { id: "mm_paya_hitam", name: "Paya Hitam", poster: "https://i.postimg.cc/d3fC7qgt/payahitam.jpg", description: "Filem Paya Hitam", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc074d6e979983cdce55cd" },
            { id: "mm_siapa_tak_sayang_bini", name: "Siapa Tak Sayang Bini", poster: "https://i.postimg.cc/XqP5ZVtZ/siapataksayangbini.jpg", description: "Filem Siapa Tak Sayang Bini", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc13f16e979983cdce55ce" },
            { id: "mm_siapa_tak_sayang_bini_2", name: "Siapa Tak Sayang Bini 2", poster: "https://i.postimg.cc/nVSBSkrT/siapataksayangbini2.jpg", description: "Filem Siapa Tak Sayang Bini 2", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc13f16e979983cdce55d1" },
            { id: "mm_santau", name: "Santau", poster: "https://i.postimg.cc/KjWTKZCj/santau.jpg", description: "Filem Santau", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc13f16e979983cdce55d0" },
            { id: "mm_pelepas_saka", name: "Pelepas Saka", poster: "https://i.postimg.cc/Y0PF4pTC/pelepassaka.jpg", description: "Filem Pelepas Saka", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc13f16e979983cdce55cf" },
            { id: "mm_polong", name: "Polong", poster: "https://i.postimg.cc/C528ZF9K/polong.jpg", description: "Filem Polong", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc13f16e979983cdce55d2" }
        ]
    },
    "mahsyar_catalog": {
        id: "mahsyar_series",
        catalogId: "mahsyar_catalog",
        name: "Mahsyar",
        poster: "https://i.postimg.cc/nVR03TYz/Mahsyar.jpg",
        description: "Koleksi Siri Mahsyar (Episod 1 - 7).",
        episodes: createEpisodes([
            { title: "Mahsyar 1 - Kalau Binatang Sahaja Pun Dah Sesak", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbf4e66e979983cdce554a" },
            { title: "Mahsyar 2 - Berselisih Dengan Ahli Keluarga, Tidak Bertegur", url: "https://files.catbox.moe/5mgrcm.mp4" },
            { title: "Mahsyar 3 - Berapa Kumpulan Manusia Di Mahsyar", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbf4f36e979983cdce554b" },
            { title: "Mahsyar 4 - Beliau Empunya Syafaat Teragung", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbf4fe6e979983cdce554c" },
            { title: "Mahsyar 5 - Mizan, Mesti Canggih Alat Timbangan Amal", url: "https://files.catbox.moe/x9i1ns.mp4" },
            { title: "Mahsyar 6 - Tak Terbayang 1000 Tahun Di Dalam Api", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbf5076e979983cdce554d" },
            { title: "Mahsyar 7 - Syurga Atau Neraka Semuanya Pilihan Diri", url: "https://files.catbox.moe/oxfje5.mp4" }
        ])
    },
    "filem_dakwah_sengketa_catalog": {
        id: "filem_dakwah_sengketa_series",
        catalogId: "filem_dakwah_sengketa_catalog",
        name: "Filem Dakwah - Sengketa",
        poster: "https://i.postimg.cc/SQTDgV7K/Sengketa.jpg",
        description: "Koleksi Filem Dakwah - Sengketa.",
        episodes: createEpisodes([
            { title: "Sengketa 1", url: "https://files.catbox.moe/6qk9eh.mp4" },
            { title: "Sengketa 2", url: "https://files.catbox.moe/4uiyst.mp4" }
        ])
    },
    "hagemaru_catalog": {
        id: "hagemaru_series",
        catalogId: "hagemaru_catalog",
        name: "Hagemaru",
        poster: "https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg",
        description: "Koleksi Episod Hagemaru Bahasa Melayu.",
        episodes: createEpisodes([
            { title: "Pasukan Bola Lisut Muda", url: "https://files.catbox.moe/05qmoa.mp4" }
        ])
    },
    "ninja_boy_catalog": {
        id: "ninja_boy_series",
        catalogId: "ninja_boy_catalog",
        name: "Ninja Boy",
        poster: "https://i.postimg.cc/NjchPqKZ/Ninja_Boy.jpg",
        description: "Koleksi Episod Ninja Boy Bahasa Melayu.",
        episodes: createEpisodes([
            "https://files.catbox.moe/eufzjd.mp4", "https://files.catbox.moe/gujt6g.mp4",
            "https://files.catbox.moe/tlvkbp.mp4", "https://files.catbox.moe/fzsduj.mp4",
            "https://files.catbox.moe/zmbbmq.mp4", "https://files.catbox.moe/o7bhaf.mp4",
            "https://files.catbox.moe/jmwdz9.mp4"
        ])
    },
    "doraemon_catalog": {
        id: "doraemon_series",
        catalogId: "doraemon_catalog",
        name: "Doraemon",
        poster: "https://i.postimg.cc/XYbMDSrm/Doraemon.jpg",
        description: "Koleksi Episod Doraemon Bahasa Melayu.",
        episodes: createEpisodes([
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
        ])
    },
    "pokemon_catalog": {
        id: "pokemon_journeys_series",
        catalogId: "pokemon_catalog",
        name: "Pokemon Journeys The Series",
        poster: "https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg",
        description: "Koleksi Episod Pokemon Journeys Bahasa Melayu.",
        episodes: createEpisodes([
            "https://files.catbox.moe/9l6811.mp4", "https://files.catbox.moe/f2adj4.mp4", "https://files.catbox.moe/bnoev9.mp4", "https://files.catbox.moe/64ntqo.mp4", "https://files.catbox.moe/83f07d.mp4",
            "https://files.catbox.moe/17e2tr.mp4", "https://files.catbox.moe/5y14uj.mp4", "https://files.catbox.moe/poz7od.mp4", "https://files.catbox.moe/y46f9t.mp4", "https://files.catbox.moe/grq2iu.mp4",
            "https://files.catbox.moe/k773ev.mp4", "https://files.catbox.moe/r5rda8.mp4", "https://files.catbox.moe/8idngm.mp4", "https://files.catbox.moe/8fz354.mp4", "https://files.catbox.moe/tzcx7q.mp4",
            "https://files.catbox.moe/o1beae.mp4", "https://files.catbox.moe/uyhug0.mp4", "https://files.catbox.moe/5f9hjn.mp4", "https://files.catbox.moe/ou8sgf.mp4", "https://files.catbox.moe/63xw8p.mp4",
            "https://files.catbox.moe/r69vzr.mp4", "https://files.catbox.moe/29y1ey.mp4", "https://files.catbox.moe/q258dj.mp4", "https://files.catbox.moe/7lyrdj.mp4", "https://files.catbox.moe/eiy4gx.mp4",
            "https://files.catbox.moe/utrujc.mp4", "https://files.catbox.moe/f40v16.mp4", "https://files.catbox.moe/9p1oo4.mp4", "https://files.catbox.moe/vw842q.mp4", "https://files.catbox.moe/43p2fg.mp4",
            "https://files.catbox.moe/odqedh.mp4", "https://files.catbox.moe/iaxi6v.mp4", "https://files.catbox.moe/k27hgg.mp4", "https://files.catbox.moe/umbpcj.mp4", "https://files.catbox.moe/6gn6ci.mp4",
            "https://files.catbox.moe/brro9o.mp4", "https://files.catbox.moe/0pn8a9.mp4", "https://files.catbox.moe/6qs7l7.mp4", "https://files.catbox.moe/iljl67.mp4", "https://files.catbox.moe/o1welq.mp4",
            "https://files.catbox.moe/1qf2bs.mp4", "https://files.catbox.moe/6432zl.mp4"
        ])
    },
    "midori_days_catalog": {
        id: "midori_days_series",
        catalogId: "midori_days_catalog",
        name: "Midori Days",
        poster: "https://i.postimg.cc/P5zgg3D9/Midori-Days.jpg",
        description: "Koleksi Episod Midori Days Bahasa Melayu.",
        episodes: createEpisodes([
            "https://files.catbox.moe/17w3pa.mp4", "https://files.catbox.moe/k27qz0.mp4", "https://files.catbox.moe/17jqa4.mp4", "https://files.catbox.moe/yezp6w.mp4", "https://files.catbox.moe/a5bwab.mp4",
            "https://files.catbox.moe/l6no0r.mp4", "https://files.catbox.moe/lelg7u.mp4", "https://files.catbox.moe/au9rr9.mp4", "https://files.catbox.moe/kfta82.mp4", "https://files.catbox.moe/7iisgo.mp4",
            "https://files.catbox.moe/7c9042.mp4", "https://files.catbox.moe/o2mmz3.mp4", "https://files.catbox.moe/8wepsr.mp4"
        ])
    },
    "anak_sidek_catalog": {
        id: "anak_anak_sidek_series",
        catalogId: "anak_sidek_catalog",
        name: "Anak-Anak Sidek",
        poster: "https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg",
        description: "Koleksi Episod Anak-Anak Sidek.",
        episodes: createEpisodes([
            "https://files.catbox.moe/0ts7am.mp4", "https://files.catbox.moe/lpswls.mp4", "https://files.catbox.moe/lbmnel.mp4", "https://files.catbox.moe/eligd9.mp4", "https://files.catbox.moe/khs41p.mp4",
            "https://files.catbox.moe/26c3re.mp4", "https://files.catbox.moe/b16149.mp4", "https://files.catbox.moe/mxe2nn.mp4", "https://files.catbox.moe/s1ayej.mp4", "https://files.catbox.moe/32z6i6.mp4",
            "https://files.catbox.moe/f8pnpd.mp4", "https://files.catbox.moe/86iy1e.mp4", "https://files.catbox.moe/ttqlp9.mp4", "https://files.catbox.moe/q9dr60.mp4", "https://files.catbox.moe/of0qnd.mp4",
            "https://files.catbox.moe/cedu56.mp4", "https://files.catbox.moe/xdskm8.mp4", "https://files.catbox.moe/9mzf1z.mp4", "https://files.catbox.moe/lsz3p9.mp4", "https://files.catbox.moe/3mxx6i.mp4",
            "https://files.catbox.moe/jkjj9o.mp4", "https://files.catbox.moe/wdgv93.mp4", "https://files.catbox.moe/qf2fvl.mp4", "https://files.catbox.moe/jvfta3.mp4", "https://files.catbox.moe/q40kmo.mp4",
            "https://files.catbox.moe/t6tkl7.mp4", "https://files.catbox.moe/7hj0pp.mp4", "https://files.catbox.moe/2cvkol.mp4", "https://files.catbox.moe/x6d6l2.mp4", "https://files.catbox.moe/em16n2.mp4",
            "https://files.catbox.moe/kfx8fa.mp4", "https://files.catbox.moe/psqwmg.mp4", "https://files.catbox.moe/qhhlph.mp4", "https://files.catbox.moe/4yre1a.mp4", "https://files.catbox.moe/xmphie.mp4",
            "https://files.catbox.moe/uwyuaa.mp4", "https://files.catbox.moe/xzp99z.mp4", "https://files.catbox.moe/gw2t8k.mp4", "https://files.catbox.moe/farxtu.mp4", "https://files.catbox.moe/ndsb34.mp4",
            "https://files.catbox.moe/8p480z.mp4", "https://files.catbox.moe/2by4hx.mp4", "https://files.catbox.moe/r1443c.mp4"
        ])
    },
    "ueki_catalog": {
        id: "ueki_series",
        catalogId: "ueki_catalog",
        name: "The Law of Ueki",
        poster: "https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg",
        description: "Koleksi Episod The Law of Ueki Bahasa Melayu.",
        episodes: createEpisodes([
            "https://files.catbox.moe/8kj5ks.mp4", "https://files.catbox.moe/z0g9yg.mp4", "https://files.catbox.moe/08sesz.mp4", "https://files.catbox.moe/6md76n.mp4", "https://files.catbox.moe/807ppt.mp4",
            "https://files.catbox.moe/p97pyk.mp4", "https://files.catbox.moe/u4xc7f.mp4", "https://files.catbox.moe/t6cqgz.mp4", "https://files.catbox.moe/ccd8xy.mp4", "https://files.catbox.moe/00umfq.mp4",
            "https://files.catbox.moe/4jqaxr.mp4", "https://files.catbox.moe/f2fu7v.mp4", "https://files.catbox.moe/3hqo5h.mp4", "https://files.catbox.moe/k5rsv8.mp4", "https://files.catbox.moe/a52eaw.mp4",
            "https://files.catbox.moe/92vn6m.mp4", "https://files.catbox.moe/lc4ggf.mp4", "https://files.catbox.moe/g7z0qd.mp4", "https://files.catbox.moe/1cu6nb.mp4", "https://files.catbox.moe/simne6.mp4",
            "https://files.catbox.moe/qsd9d6.mp4", "https://files.catbox.moe/bvqz25.mp4", "https://files.catbox.moe/lz4f81.mp4", "https://files.catbox.moe/cxdp53.mp4", "https://files.catbox.moe/42fp1m.mp4",
            "https://files.catbox.moe/0cct4v.mp4", "https://files.catbox.moe/tq28dt.mp4", "https://files.catbox.moe/4644lf.MP4", "https://files.catbox.moe/220ni1.MP4", "https://files.catbox.moe/yr03al.MP4",
            "https://files.catbox.moe/1owo27.MP4", "https://files.catbox.moe/5p84az.MP4", "https://files.catbox.moe/xwp7g4.MP4", "https://files.catbox.moe/nq68ze.MP4", "https://files.catbox.moe/5iklua.MP4",
            "https://files.catbox.moe/4n3ctq.MP4", "https://files.catbox.moe/82q9a5.MP4", "https://files.catbox.moe/2sl6it.MP4", "https://files.catbox.moe/1o0vhh.MP4", "https://files.catbox.moe/9wxs8p.MP4",
            "https://files.catbox.moe/bwk5nr.MP4", "https://files.catbox.moe/rf1i5n.MP4", "https://files.catbox.moe/a8wyuy.MP4", "https://files.catbox.moe/lwe17r.MP4", "https://files.catbox.moe/kno50g.MP4",
            "https://files.catbox.moe/3x4ddf.MP4", "https://files.catbox.moe/iiksmp.MP4", "https://files.catbox.moe/qa4dc0.MP4", "https://files.catbox.moe/ayw9r7.MP4", "https://files.catbox.moe/z2903v.MP4",
            "https://files.catbox.moe/wb03ng.MP4"
        ])
    },
    "ginban_catalog": {
        id: "ginban_series",
        catalogId: "ginban_catalog",
        name: "Ginban Kaleidoscope",
        poster: "https://i.postimg.cc/x1ywwxmB/Ginban-Kaleidoscope.jpg",
        description: "Koleksi Episod Ginban Kaleidoscope Bahasa Melayu.",
        episodes: createEpisodes([
            "https://files.catbox.moe/5je70q.flv", "https://files.catbox.moe/l4dsxu.flv", "https://files.catbox.moe/0pffen.flv", "https://files.catbox.moe/v67xcz.mp4",
            "https://files.catbox.moe/dth1gm.mp4", "https://files.catbox.moe/tvcszy.mp4", "https://files.catbox.moe/pj6spq.mp4", "https://files.catbox.moe/tta199.mp4",
            "https://files.catbox.moe/dzl7mp.mp4", "https://files.catbox.moe/mzv0e3.mp4", "https://files.catbox.moe/8cxro0.mp4", "https://files.catbox.moe/c33xc2.mp4"
        ])
    },
    "black_cat_catalog": {
        id: "black_cat_series",
        catalogId: "black_cat_catalog",
        name: "Black Cat",
        poster: "https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg",
        description: "Koleksi Episod Black Cat Bahasa Melayu.",
        episodes: createEpisodes([
            "https://files.catbox.moe/xt0a0n.mp4", "https://files.catbox.moe/k1wxy6.mp4", "https://files.catbox.moe/npays5.mp4", "https://files.catbox.moe/vr6t77.mp4", "https://files.catbox.moe/rtp95u.mp4",
            "https://files.catbox.moe/3u3jbh.mp4", "https://files.catbox.moe/6hf6fs.mp4", "https://files.catbox.moe/u9zsug.mp4", "https://files.catbox.moe/tza3td.mp4", "https://files.catbox.moe/s2z3iy.mp4",
            "https://files.catbox.moe/p0nv9h.mp4", "https://files.catbox.moe/3l5rnc.mp4", "https://files.catbox.moe/am14fw.mp4", "https://files.catbox.moe/ip19yx.mp4", "https://files.catbox.moe/ifwh66.mp4",
            "https://files.catbox.moe/jrf7j4.mp4", "https://files.catbox.moe/j5scn9.mp4", "https://files.catbox.moe/hjueai.mp4", "https://files.catbox.moe/3ds9an.mp4", "https://files.catbox.moe/o80p7r.mp4",
            "https://files.catbox.moe/6vtgbq.mp4", "https://files.catbox.moe/58zmb9.mp4", "https://files.catbox.moe/3zrbqp.mp4", "https://files.catbox.moe/jsah3e.mp4"
        ])
    },
    "digimon_savers_catalog": {
        id: "digimon_savers_series",
        catalogId: "digimon_savers_catalog",
        name: "Digimon Savers",
        poster: "https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg",
        description: "Koleksi Episod Digimon Savers Bahasa Melayu.",
        episodes: createEpisodes([
            "https://files.catbox.moe/pjuq4v.mp4", "https://files.catbox.moe/2xj9b9.mp4", "https://files.catbox.moe/qwdfom.mp4", "https://files.catbox.moe/0rcnrs.mp4", "https://files.catbox.moe/dcum9s.mp4",
            "https://files.catbox.moe/m7vixb.mp4", "https://files.catbox.moe/kwgaqq.mp4", "https://files.catbox.moe/odxlwf.mp4", "https://files.catbox.moe/903sr9.mp4", "https://files.catbox.moe/v2vwvm.mp4",
            "https://files.catbox.moe/jnjj2h.mp4", "https://files.catbox.moe/c82q1v.mp4", "https://files.catbox.moe/dc7of9.mp4", "https://files.catbox.moe/j2f9wa.mp4", "https://files.catbox.moe/ogadln.mp4",
            "https://files.catbox.moe/gfctf7.mp4", "https://files.catbox.moe/tus67m.mp4", "https://files.catbox.moe/paodxr.mp4", "https://files.catbox.moe/t8zlhi.mp4", "https://files.catbox.moe/sgg2ih.mp4",
            "https://files.catbox.moe/t2ysv4.mp4", "https://files.catbox.moe/981fj9.mp4", "https://files.catbox.moe/ok19dj.mp4", "https://files.catbox.moe/yn3mcd.mp4", "https://files.catbox.moe/kyn0pe.mp4",
            "https://files.catbox.moe/oyg7fd.mp4", "https://files.catbox.moe/xn5x2v.mp4", "https://files.catbox.moe/bo830d.mp4", "https://files.catbox.moe/0axnec.mp4", "https://files.catbox.moe/k67jwm.mp4",
            "https://files.catbox.moe/2s09wt.mp4", "https://files.catbox.moe/1337zx.mp4", "https://files.catbox.moe/yyj40k.mp4", "https://files.catbox.moe/00iraw.mp4", "https://files.catbox.moe/mu4b9q.mp4",
            "https://files.catbox.moe/ng4uzb.mp4", "https://files.catbox.moe/e0qa9y.mp4", "https://files.catbox.moe/iyxhhs.mp4", "https://files.catbox.moe/ggmem5.mp4", "https://files.catbox.moe/107d1y.mp4",
            "https://files.catbox.moe/ttwtn5.mp4", "https://files.catbox.moe/7skrqk.mp4", "https://files.catbox.moe/sub0gd.mp4", "https://files.catbox.moe/rrkgee.mp4", "https://files.catbox.moe/30u7ag.mp4",
            "https://files.catbox.moe/a1obqr.mp4", "https://files.catbox.moe/8anpz9.mp4", "https://files.catbox.moe/23a3j8.mp4"
        ])
    },
    "digimon_01_catalog": {
        id: "digimon_01_series",
        catalogId: "digimon_01_catalog",
        name: "Digimon Adventure 01",
        poster: "https://i.postimg.cc/T368HMKn/Digimon-01.jpg",
        description: "Koleksi Episod Digimon Adventure 01 Bahasa Melayu.",
        episodes: createEpisodes([
            "https://files.catbox.moe/e0rqpf.mkv", "https://files.catbox.moe/2hou0p.mkv", "https://files.catbox.moe/e9v6wa.mkv", "https://files.catbox.moe/gu2sos.mkv", "https://files.catbox.moe/n6rsk2.mkv",
            "https://files.catbox.moe/tskc12.mkv", "https://files.catbox.moe/fpko2t.mkv", "https://files.catbox.moe/r0bem3.mkv", "https://files.catbox.moe/cdimzv.mkv", "https://files.catbox.moe/0yua59.mkv",
            "https://files.catbox.moe/wofmc1.mkv", "https://files.catbox.moe/zezjha.mkv", "https://files.catbox.moe/jz8h9m.mkv", "https://files.catbox.moe/ttnebg.mkv", "https://files.catbox.moe/j1qgd0.mkv",
            "https://files.catbox.moe/2f5l1i.mkv", "https://files.catbox.moe/9zl6f3.mkv", "https://files.catbox.moe/g5mp05.mkv", "https://files.catbox.moe/9qyu8m.mkv", "https://files.catbox.moe/qi4907.mkv",
            "https://files.catbox.moe/62qm6q.mkv", "https://files.catbox.moe/qd2rp6.mkv", "https://files.catbox.moe/hsirv9.mkv", "https://files.catbox.moe/j9inza.mkv", "https://files.catbox.moe/imdz6v.mkv",
            "https://files.catbox.moe/eavdti.mkv", "https://files.catbox.moe/6bt1jb.mkv", "https://files.catbox.moe/j7y6l5.mkv", "https://files.catbox.moe/k3qi71.mkv", "https://files.catbox.moe/z48p20.mkv",
            "https://files.catbox.moe/0liv2g.mkv", "https://files.catbox.moe/ib93b9.mkv", "https://files.catbox.moe/cmddcq.mkv", "https://files.catbox.moe/hc75qs.mkv", "https://files.catbox.moe/80ihqw.mkv",
            "https://files.catbox.moe/2j4528.mkv", "https://files.catbox.moe/m2vk0x.mkv", "https://files.catbox.moe/bxkjwm.mkv", "https://files.catbox.moe/1b9gwu.mkv", "https://files.catbox.moe/lnxlw4.mkv",
            "https://files.catbox.moe/kffur9.mkv", "https://files.catbox.moe/x39h67.mkv", "https://files.catbox.moe/b5mwsr.mkv", "https://files.catbox.moe/cwq3jd.mkv", "https://files.catbox.moe/gokoql.mkv",
            "https://files.catbox.moe/a88ir0.mkv", "https://files.catbox.moe/e2ocb9.mkv", "https://files.catbox.moe/op51ps.mkv", "https://files.catbox.moe/ynheic.mkv", "https://files.catbox.moe/44nsq7.mkv",
            "https://files.catbox.moe/tvu37m.mkv", "https://files.catbox.moe/dqatyz.mkv", "https://files.catbox.moe/sbex83.mkv", "https://files.catbox.moe/qd2yx9.mkv"
        ])
    },
    "shin_chan_catalog": {
        id: "shin_chan_series",
        catalogId: "shin_chan_catalog",
        name: "Crayon Shin Chan",
        poster: "https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg",
        description: "Koleksi Episod Crayon Shin Chan Bahasa Melayu.",
        episodes: createEpisodes([
            "https://files.catbox.moe/b9vevt.mp4", "https://files.catbox.moe/7rag9o.mp4", "https://files.catbox.moe/m0edfm.mp4", "https://files.catbox.moe/pynt42.mp4", "https://files.catbox.moe/7yvdbd.mp4",
            "https://files.catbox.moe/w8huc2.mkv", "https://files.catbox.moe/nejhuv.mp4", "https://files.catbox.moe/8ca3cr.mp4", "https://files.catbox.moe/02x60l.mkv", "https://files.catbox.moe/8ea559.mp4",
            "https://files.catbox.moe/9t4e7x.webm", "https://files.catbox.moe/kk607w.mkv", "https://files.catbox.moe/tjtmqn.mkv", "https://files.catbox.moe/wy4h99.mkv", "https://files.catbox.moe/wdv2kj.mp4",
            "https://files.catbox.moe/t116gx.mkv", "https://files.catbox.moe/f5vmu3.mkv", "https://files.catbox.moe/vq10zw.mkv", "https://files.catbox.moe/et4g5i.mkv", "https://files.catbox.moe/rtzjgh.mp4",
            "https://files.catbox.moe/c2zjxo.mkv", "https://files.catbox.moe/oqiy2x.mkv", "https://files.catbox.moe/4hawk0.webm", "https://files.catbox.moe/tvef9t.mp4", "https://files.catbox.moe/ikw3wi.mkv"
        ])
    },
    "akhir_zaman_catalog": {
        id: "akhir_zaman_series",
        catalogId: "akhir_zaman_catalog",
        name: "Kisah Hidup Akhir Zaman",
        poster: "https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg",
        description: "Koleksi Episod Kisah Hidup Akhir Zaman.",
        episodes: createEpisodes([
            "https://files.catbox.moe/dmr7ys.mp4", "https://files.catbox.moe/c05jnq.mp4", "https://files.catbox.moe/sakwy1.mp4", "https://files.catbox.moe/8jcm2b.mp4", "https://files.catbox.moe/fcw4me.mp4",
            "https://files.catbox.moe/ve28k8.mp4", "https://files.catbox.moe/cml4j6.mp4", "https://files.catbox.moe/t9ta6d.mp4", "https://files.catbox.moe/991agh.mp4", "https://files.catbox.moe/grbp8x.mp4",
            "https://files.catbox.moe/38soe6.mp4", "https://files.catbox.moe/ler4ag.mp4", "https://files.catbox.moe/ec9jc1.mp4", "https://files.catbox.moe/e9ckzj.mp4", "https://files.catbox.moe/rwzqqg.mp4",
            "https://files.catbox.moe/lfr6y0.mp4", "https://files.catbox.moe/5lod2l.mp4", "https://files.catbox.moe/2u6jeq.mp4", "https://files.catbox.moe/y4dfdt.mp4", "https://files.catbox.moe/cupuua.mp4",
            "https://files.catbox.moe/xlfvy0.mp4", "https://files.catbox.moe/svf1ld.mp4", "https://files.catbox.moe/6dmnwt.mp4", "https://files.catbox.moe/xz9p55.mp4", "https://files.catbox.moe/1oeizf.mp4",
            "https://files.catbox.moe/1dpc4q.mp4", "https://files.catbox.moe/wkk250.mp4", "https://files.catbox.moe/ns7oqa.mp4", "https://files.catbox.moe/rikryy.mp4", "https://files.catbox.moe/v6lwxq.mp4",
            "https://files.catbox.moe/qoyb9l.mp4", "https://files.catbox.moe/fa0z2q.mp4", "https://files.catbox.moe/rb6n12.mp4", "https://files.catbox.moe/p5a2ds.mp4", "https://files.catbox.moe/n4ro3i.mp4",
            "https://files.catbox.moe/f926el.mp4", "https://files.catbox.moe/sa6gq8.mp4", "https://files.catbox.moe/edzksm.mp4", "https://files.catbox.moe/g6gx07.mp4",
            "https://files.catbox.moe/h3rt2t.mp4", "https://files.catbox.moe/7zgjio.mp4", "https://files.catbox.moe/nianl8.mp4", "https://files.catbox.moe/pk2ija.mp4", "https://files.catbox.moe/g6vzed.mp4",
            "https://files.catbox.moe/2xr42f.mp4", "https://files.catbox.moe/i636mu.mp4", "https://files.catbox.moe/2dh0kw.mp4", "https://files.catbox.moe/osqos3.mp4", "https://files.catbox.moe/clraet.mp4",
            "https://files.catbox.moe/02vue5.mp4", "https://files.catbox.moe/oih2ce.mp4", "https://files.catbox.moe/opbp3x.mp4", "https://files.catbox.moe/47lmkc.mp4", "https://files.catbox.moe/gh1des.mp4",
            "https://files.catbox.moe/ny4qqj.mp4", "https://files.catbox.moe/v3yvoh.mp4", "https://files.catbox.moe/2bmvek.mp4", "https://files.catbox.moe/rnkq3v.mp4", "https://files.catbox.moe/a6i9oa.mp4",
            "https://files.catbox.moe/wj13np.mp4", "https://files.catbox.moe/2uk8a3.mp4"
        ])
    },
    "kd_malay_catalog": {
        id: "kd_malay_series",
        catalogId: "kd_malay_catalog",
        name: "Kids Delights (Malay Vers)",
        poster: "https://i.postimg.cc/FsKg8hfM/KD.jpg",
        description: "Koleksi Episod Kids Delights Bahasa Melayu.",
        episodes: createEpisodes([
            "https://files.catbox.moe/e1j98o.mp4", "https://files.catbox.moe/86iqng.mp4", "https://files.catbox.moe/2v49e1.mp4",
            "https://files.catbox.moe/nm6i4w.mp4", "https://files.catbox.moe/gkpikb.mp4", "https://files.catbox.moe/2bob72.mp4",
            "https://files.catbox.moe/rsobpn.mp4"
        ])
    },
    "kd_eng_catalog": {
        id: "kd_eng_series",
        catalogId: "kd_eng_catalog",
        name: "Kids Delights (Eng Vers)",
        poster: "https://i.postimg.cc/FsKg8hfM/KD.jpg",
        description: "Koleksi Episod Kids Delights English Version.",
        episodes: createEpisodes([
            "https://files.catbox.moe/6uzimm.mp4", "https://files.catbox.moe/14zl0x.mp4", "https://files.catbox.moe/3u4p9f.mp4",
            "https://files.catbox.moe/a1qpn5.mp4", "https://files.catbox.moe/c23e8f.mp4", "https://files.catbox.moe/vmpp8r.mp4",
            "https://files.catbox.moe/izkdg9.mp4"
        ])
    }
};

// ==========================================
// 3. ROUTING SERVER & MIDDLEWARE
// ==========================================
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

// MIDDLEWARE DETECT AKTIVITI PENGGUNA
app.use('/stremio/:user', (req, res, next) => {
    const userId = req.params.user || req.ip;
    uniqueUsers.add(userId);
    userActivity[userId] = new Date().toLocaleString('ms-MY', { timeZone: 'Asia/Kuala_Lumpur' });
    next();
});

app.post('/api/save-preferences', (req, res) => {
    const { catalogOrder } = req.body;
    if (Array.isArray(catalogOrder)) {
        const newCatalogs = [];
        catalogOrder.forEach(id => {
            const cat = manifest.catalogs.find(c => c.id === id);
            if (cat) newCatalogs.push(cat);
        });
        manifest.catalogs = newCatalogs;
        return res.json({ success: true, message: "Susunan berjaya disimpan!" });
    }
    res.status(400).json({ success: false, message: "Data tak sah!" });
});

app.get('/stremio/:user/manifest.json', (req, res) => {
    res.json(manifest);
});

app.get('/stremio/:user/catalog/:type/:id.json', (req, res) => {
    const catalogId = req.params.id;
    const series = seriesDatabase[catalogId];

    if (series) {
        if (series.isMulti) {
            res.json({
                metas: series.items.map(item => ({
                    id: item.id,
                    type: "series",
                    name: item.name,
                    poster: item.poster,
                    description: item.description
                }))
            });
        } else {
            res.json({
                metas: [{
                    id: series.id,
                    type: "series",
                    name: series.name,
                    poster: series.poster,
                    description: series.description
                }]
            });
        }
    } else {
        res.json({ metas: [] });
    }
});

app.get('/stremio/:user/meta/:type/:id.json', (req, res) => {
    const targetId = req.params.id.split(':')[0];

    for (const cat of Object.values(seriesDatabase)) {
        if (cat.isMulti) {
            const item = cat.items.find(i => i.id === targetId);
            if (item) {
                return res.json({
                    meta: {
                        id: item.id,
                        type: "series",
                        name: item.name,
                        poster: item.poster,
                        description: item.description,
                        videos: [{
                            id: `${item.id}:1:1`,
                            title: item.name,
                            season: 1,
                            episode: 1,
                            released: new Date().toISOString()
                        }]
                    }
                });
            }
        }
    }

    const series = Object.values(seriesDatabase).find(s => s.id === targetId);

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

// ==========================================
// STREAM ENDPOINT
// ==========================================
app.get('/stremio/:user/stream/:type/:id.json', (req, res) => {
    const parts = req.params.id.split(':');
    const targetId = parts[0];
    const episodeNum = parseInt(parts[2], 10) || 1;

    for (const cat of Object.values(seriesDatabase)) {
        if (cat.isMulti) {
            const item = cat.items.find(i => i.id === targetId);
            if (item) {
                return res.json({
                    streams: [{
                        title: `Direct HD (${item.name})`,
                        url: item.url,
                        behaviorHints: {
                            bingeGroup: `${item.id}-hd`
                        }
                    }]
                });
            }
        }
    }

    const series = Object.values(seriesDatabase).find(s => s.id === targetId);
    if (series) {
        const ep = series.episodes.find(e => e.episode === episodeNum);
        if (ep) {
            return res.json({
                streams: [{
                    title: `Direct HD (${ep.title})`,
                    url: ep.url,
                    behaviorHints: {
                        bingeGroup: `${series.id}-hd`
                    }
                }]
            });
        }
    }
    res.json({ streams: [] });
});

// ==========================================
// 4. CONFIGURATOR UI WEB INTERFACE (DYNAMIC URL FIX)
// ==========================================
app.get('/', (req, res) => {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');
    const dynamicBaseUrl = `${protocol}://${host}`;
    const manifestUrl = `${dynamicBaseUrl}/stremio/user123/manifest.json`;

    const catalogListHtml = manifest.catalogs.map((c) => `
        <div class="catalog-item" data-id="${c.id}" style="display: flex; justify-content: space-between; align-items: center; background: #2a2a32; padding: 12px 16px; margin-bottom: 8px; border-radius: 8px; border: 1px solid #3a3a46;">
            <span style="font-weight: 600; color: #fff;">👁️ ${c.name} <small style="color: #888;">(series)</small></span>
            <div>
                <button onclick="moveUp(this)" style="background: #383844; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; margin-right: 4px;">▲</button>
                <button onclick="moveDown(this)" style="background: #383844; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">▼</button>
            </div>
        </div>
    `).join('');

    const userListHtml = Array.from(uniqueUsers).length > 0
        ? Array.from(uniqueUsers).map(u => `
            <li style="margin-bottom: 6px; display: flex; justify-content: space-between; border-bottom: 1px dashed #2a2a32; padding-bottom: 4px;">
                <span>👤 User ID: <strong style="color: #ffcc00;">${u}</strong></span>
                <span style="color: #888; font-size: 11px;">Aktif: ${userActivity[u] || 'N/A'}</span>
            </li>
        `).join('')
        : '<li style="color: #888;">Belum ada pengguna aktif.</li>';

    let html = `
    <!DOCTYPE html>
    <html lang="ms">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DaRyz Nuvio / Stremio Addon Config</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #18181c; color: #e1e1e6; margin: 0; padding: 40px 20px; display: flex; justify-content: center; }
            .container { display: flex; flex-direction: column; gap: 20px; max-width: 900px; width: 100%; }
            .row { display: flex; gap: 20px; width: 100%; }
            .card { background: #202026; border-radius: 16px; padding: 24px; flex: 1; border: 1px solid #2d2d36; }
            h2 { font-size: 18px; margin-top: 0; color: #fff; display: flex; align-items: center; gap: 8px; }
            .btn-install { background: #ffcc00; color: #000; font-weight: bold; width: 100%; border: none; padding: 14px; border-radius: 8px; font-size: 15px; cursor: pointer; margin: 15px 0; text-align: center; text-decoration: none; display: block; box-sizing: border-box; }
            .input-box { background: #121215; border: 1px solid #333; padding: 10px; border-radius: 6px; color: #aaa; font-family: monospace; font-size: 12px; margin-top: 10px; word-break: break-all; }
            .btn-save { background: #ffcc00; color: #000; font-weight: bold; width: 100%; border: none; padding: 12px; border-radius: 8px; font-size: 14px; cursor: pointer; margin-top: 15px; }
            .status-badge { background: #28a745; color: #fff; padding: 2px 8px; border-radius: 12px; font-size: 12px; }
            .stat-box { background: #121215; border-radius: 8px; padding: 15px; text-align: center; margin-bottom: 15px; border: 1px solid #2d2d36; }
            .stat-number { font-size: 28px; font-weight: bold; color: #ffcc00; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <h2>📊 Live Analytics & User Tracker</h2>
                <div class="stat-box">
                    <div class="stat-number">${uniqueUsers.size}</div>
                    <div style="font-size: 13px; color: #888; margin-top: 4px;">Jumlah Pengguna Unik Aktif</div>
                </div>
                <p style="font-size: 12px; font-weight: bold; color: #aaa; margin-bottom: 10px;">SENARAI PENGGUNA TERAKHIR:</p>
                <ul style="list-style: none; padding: 0; margin: 0; font-size: 12px; max-height: 150px; overflow-y: auto;">
                    ${userListHtml}
                </ul>
            </div>

            <div class="row">
                <div class="card">
                    <h2>🎬 DaRyz Nuvio / Stremio Addon</h2>
                    <p style="font-size: 13px; color: #888;">User: <span style="color: #fff; font-weight: bold;">DaRyz</span></p>
                    <p style="font-size: 13px; color: #888;">Status: <span class="status-badge">Active</span></p>
                    <p style="font-size: 13px; color: #888; margin-bottom: 20px;">Expires: <span style="color: #ffcc00; font-weight: bold;">Lifetime</span></p>

                    <a href="stremio://${host}/stremio/user123/manifest.json" class="btn-install">Install / update in Nuvio Stremio</a>

                    <p style="font-size: 12px; color: #888; margin-top: 20px; line-height: 1.5;">
                        <strong>Prefer to do it manually?</strong><br>
                        1. Open Stremio/Nuvio and go to the Add-ons tab<br>
                        2. Click the Search / URL field<br>
                        3. Paste the URL below and press Enter
                    </p>

                    <div class="input-box">${manifestUrl}</div>
                </div>

                <div class="card">
                    <h2>⚙️ Personalize</h2>
                    <p style="font-size: 12px; color: #888; margin-bottom: 15px;">Tune quality and catalogs for your install.</p>
                    <p style="font-size: 12px; font-weight: bold; color: #aaa; margin-bottom: 10px;">CATALOGS</p>

                    <div id="catalog-list">
                        ${catalogListHtml}
                    </div>

                    <button class="btn-save" onclick="savePreferences()">Save Preferences</button>
                </div>
            </div>
        </div>

        <script>
            function moveUp(button) {
                const item = button.closest('.catalog-item');
                if (item.previousElementSibling) {
                    item.parentNode.insertBefore(item, item.previousElementSibling);
                }
            }

            function moveDown(button) {
                const item = button.closest('.catalog-item');
                if (item.nextElementSibling) {
                    item.parentNode.insertBefore(item, item.nextElementSibling);
                }
            }

            async function savePreferences() {
                const items = document.querySelectorAll('.catalog-item');
                const catalogOrder = Array.from(items).map(item => item.getAttribute('data-id'));

                try {
                    const response = await fetch('/api/save-preferences', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ catalogOrder })
                    });
                    const resData = await response.json();
                    if (resData.success) {
                        alert('Preferences Saved! Susunan katalog kau telah disimpan.');
                    } else {
                        alert('Gagal menyimpan preferences.');
                    }
                } catch (e) {
                    alert('Ralat sambungan server!');
                }
            }
        </script>
    </body>
    </html>
    `;
    res.send(html);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
