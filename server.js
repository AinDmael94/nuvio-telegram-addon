const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());

// ==========================================
// HELPER FUNCTION UNTUK TAJUK EPISOD/CERAMAH
// ==========================================
function createEpisodes(list) {
    return list.map((item, idx) => {
        if (typeof item === 'string') {
            return { episode: idx + 1, title: `Episod ${idx + 1}`, url: item };
        }
        return {
            episode: idx + 1,
            title: item.title || `Episod ${idx + 1}`,
            url: item.url
        };
    });
}

// ==========================================
// 1. MANIFEST ADDON
// ==========================================
const manifest = {
    id: "org.aindmael.hagemaru.addon",
    version: "3.7.0",
    name: "DaRyz Collection Addon",
    description: "Addon Stremio/Nuvio dengan katalog tersusun mengikut tajuk siri dan filem.",
    resources: ["catalog", "stream", "meta"],
    types: ["series"],
    idPrefixes: [
        "running_man_series", "mm_", "mahsyar_series", "filem_dakwah_sengketa_series", "hagemaru_series", "ninja_boy_series", 
        "doraemon_series", "pokemon_journeys_series", "midori_days_series", "anak_anak_sidek_series", 
        "ueki_series", "ginban_series", "black_cat_series", "digimon_savers_series", 
        "digimon_01_series", "shin_chan_series", "akhir_zaman_series", "kd_malay_series", "kd_eng_series"
    ],
    catalogs: [
        { type: "series", id: "running_man_catalog", name: "Running Man" },
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
    "running_man_catalog": {
        id: "running_man_series",
        catalogId: "running_man_catalog",
        name: "Running Man",
        poster: "https://i.postimg.cc/wMYXFx0G/RM-2.jpg",
        description: "Koleksi Episod Running Man (Episod 1 - 100).",
        episodes: createEpisodes([
            "https://filestreambot-production-bef2.up.railway.app/dl/6acbff846e979983cdce555e",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce5561",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce555f",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce5562",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc001a6e979983cdce5563",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce5560",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc001a6e979983cdce5564",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc001c6e979983cdce5565",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc001c6e979983cdce5566",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc001d6e979983cdce5567",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00216e979983cdce5569",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00216e979983cdce5568",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00266e979983cdce556a",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00266e979983cdce556b",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc002c6e979983cdce556c",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc002c6e979983cdce556d",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00586e979983cdce556e",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00596e979983cdce556f",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00596e979983cdce5570",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc005d6e979983cdce5571",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc005d6e979983cdce5572",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc005e6e979983cdce5573",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00636e979983cdce5574",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00686e979983cdce5575",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00696e979983cdce5576",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00696e979983cdce5577",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00696e979983cdce5578",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00946e979983cdce5579",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00946e979983cdce557a",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00996e979983cdce557b",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc009a6e979983cdce557c",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc009f6e979983cdce557d",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a06e979983cdce557e",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a46e979983cdce557f",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a46e979983cdce5580",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a56e979983cdce5581",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a56e979983cdce5582",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00d06e979983cdce5583",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00d56e979983cdce5584",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00d66e979983cdce5585",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00da6e979983cdce5586",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00db6e979983cdce5587",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00dc6e979983cdce5588",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00e06e979983cdce5589",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00e06e979983cdce558a",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00e06e979983cdce558b",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc00e66e979983cdce558c",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc010d6e979983cdce558d",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01116e979983cdce558e",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01136e979983cdce558f",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01136e979983cdce5590",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01176e979983cdce5591",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01176e979983cdce5592",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01186e979983cdce5593",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc011d6e979983cdce5594",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01226e979983cdce5595",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01486e979983cdce5596",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01496e979983cdce5597",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc014d6e979983cdce5598",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01526e979983cdce5599",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01546e979983cdce559a",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01556e979983cdce559b",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01586e979983cdce559c",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01586e979983cdce559f",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01586e979983cdce559e",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01586e979983cdce559d",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc015d6e979983cdce55a0",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc015e6e979983cdce55a1",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01896e979983cdce55a2",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01896e979983cdce55a3",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01896e979983cdce55a4",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc018f6e979983cdce55a5",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01946e979983cdce55a6",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01956e979983cdce55a7",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01956e979983cdce55a8",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01956e979983cdce55a9",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc019b6e979983cdce55aa",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01c56e979983cdce55ab",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01c56e979983cdce55ac",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01c76e979983cdce55ad",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01c76e979983cdce55ae",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01ca6e979983cdce55af",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01cb6e979983cdce55b0",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01cb6e979983cdce55b1",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01d06e979983cdce55b3",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01d06e979983cdce55b2",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01d66e979983cdce55b4",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01d66e979983cdce55b5",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01fd6e979983cdce55b6",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01fd6e979983cdce55b7",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc01fe6e979983cdce55b8",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc02036e979983cdce55b9",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc02036e979983cdce55ba",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc02036e979983cdce55bb",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc02096e979983cdce55bd",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc02096e979983cdce55bc",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc020e6e979983cdce55be",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc020e6e979983cdce55bf",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc02396e979983cdce55c0",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc023e6e979983cdce55c1"
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
            { id: "mm_paya_hitam", name: "Paya Hitam", poster: "https://i.postimg.cc/d3fC7qgt/payahitam.jpg", description: "Filem Paya Hitam", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc074d6e979983cdce55cd" }
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
// 3. ROUTING SERVER & SAVE PREFERENCES API
// ==========================================
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
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

    // Semak katalog pelbagai item (filem individual)
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

    // Semak siri individu biasa
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
// STREAM ENDPOINT (DENGAN BINGEGROUP UNTUK AUTO-PLAY)
// ==========================================
app.get('/stremio/:user/stream/:type/:id.json', (req, res) => {
    const parts = req.params.id.split(':');
    const targetId = parts[0];
    const episodeNum = parseInt(parts[2], 10) || 1;

    // Semak filem dalam katalog pelbagai item
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

    // Semak siri biasa
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
// 4. CONFIGURATOR UI WEB INTERFACE
// ==========================================
app.get('/', (req, res) => {
    const catalogListHtml = manifest.catalogs.map((c) => `
        <div class="catalog-item" data-id="${c.id}" style="display: flex; justify-content: space-between; align-items: center; background: #2a2a32; padding: 12px 16px; margin-bottom: 8px; border-radius: 8px; border: 1px solid #3a3a46;">
            <span style="font-weight: 600; color: #fff;">👁️ ${c.name} <small style="color: #888;">(series)</small></span>
            <div>
                <button onclick="moveUp(this)" style="background: #383844; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; margin-right: 4px;">▲</button>
                <button onclick="moveDown(this)" style="background: #383844; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">▼</button>
            </div>
        </div>
    `).join('');

    let html = `
    <!DOCTYPE html>
    <html lang="ms">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DaRyz Nuvio / Stremio Addon Config</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #18181c; color: #e1e1e6; margin: 0; padding: 40px 20px; display: flex; justify-content: center; }
            .container { display: flex; gap: 20px; max-width: 900px; width: 100%; }
            .card { background: #202026; border-radius: 16px; padding: 24px; flex: 1; border: 1px solid #2d2d36; }
            h2 { font-size: 18px; margin-top: 0; color: #fff; display: flex; align-items: center; gap: 8px; }
            .btn-install { background: #ffcc00; color: #000; font-weight: bold; width: 100%; border: none; padding: 14px; border-radius: 8px; font-size: 15px; cursor: pointer; margin: 15px 0; text-align: center; text-decoration: none; display: block; box-sizing: border-box; }
            .input-box { background: #121215; border: 1px solid #333; padding: 10px; border-radius: 6px; color: #aaa; font-family: monospace; font-size: 12px; margin-top: 10px; word-break: break-all; }
            .btn-save { background: #ffcc00; color: #000; font-weight: bold; width: 100%; border: none; padding: 12px; border-radius: 8px; font-size: 14px; cursor: pointer; margin-top: 15px; }
            .status-badge { background: #28a745; color: #fff; padding: 2px 8px; border-radius: 12px; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Left Card -->
            <div class="card">
                <h2>🎬 DaRyz Nuvio / Stremio Addon</h2>
                <p style="font-size: 13px; color: #888;">User: <span style="color: #fff; font-weight: bold;">DaRyz</span></p>
                <p style="font-size: 13px; color: #888;">Status: <span class="status-badge">Active</span></p>
                <p style="font-size: 13px; color: #888; margin-bottom: 20px;">Expires: <span style="color: #ffcc00; font-weight: bold;">Lifetime</span></p>

                <a href="stremio://nuvio-telegram-addon.onrender.com/stremio/user123/manifest.json" class="btn-install">Install / update in Nuvio Stremio</a>

                <p style="font-size: 12px; color: #888; margin-top: 20px; line-height: 1.5;">
                    <strong>Prefer to do it manually?</strong><br>
                    1. Open Stremio/Nuvio and go to the Add-ons tab<br>
                    2. Click the Search / URL field<br>
                    3. Paste the URL below and press Enter
                </p>

                <div class="input-box">https://nuvio-telegram-addon.onrender.com/stremio/user123/manifest.json</div>
            </div>

            <!-- Right Card -->
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
                    item.parentNode.insertBefore(item.nextElementSibling, item);
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
