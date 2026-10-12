// ==========================================
// CONFIG & SERVER INITIALIZATION
// ==========================================
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// ==========================================
// USER TRACKER & ANALYTICS STORAGE
// ==========================================
const uniqueUsers = new Set();
const userActivity = {};

// Helper Function untuk tajuk & deskripsi episod
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
// MEDIA LIBRARY DATA
// ==========================================
const mediaLibrary = {
  animeSeries: {
    demonSlayer: {
      title: "Demon Slayer Episode 1-26",
      poster: "https://i.postimg.cc/DyLm8nhJ/DS-DP.jpg",
      episodes: [
        { ep: 1, name: "Ep01 - Demon Slayer [Cfire].mkv", size: "169.26 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca07b6e979983cdce598b", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca07b6e979983cdce598b", share: "https://t.me/DaRyzS_bot?start=file_6acca07b6e979983cdce598b" },
        { ep: 2, name: "Ep02 - Demon Slayer [Cfire].mkv", size: "121.02 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca07b6e979983cdce5989", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca07b6e979983cdce5989", share: "https://t.me/DaRyzS_bot?start=file_6acca07b6e979983cdce5989" },
        { ep: 3, name: "Ep03 - Demon Slayer [Cfire].mkv", size: "150.8 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca07b6e979983cdce598d", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca07b6e979983cdce598d", share: "https://t.me/DaRyzS_bot?start=file_6acca07b6e979983cdce598d" },
        { ep: 4, name: "Ep04 - Demon Slayer [Cfire].mkv", size: "126.65 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca07b6e979983cdce5988", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca07b6e979983cdce5988", share: "https://t.me/DaRyzS_bot?start=file_6acca07b6e979983cdce5988" },
        { ep: 5, name: "Ep05 - Demon Slayer [Cfire].mkv", size: "112.07 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca07b6e979983cdce598c", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca07b6e979983cdce598c", share: "https://t.me/DaRyzS_bot?start=file_6acca07b6e979983cdce598c" },
        { ep: 6, name: "Ep06 - Demon Slayer [Cfire].mkv", size: "114.82 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca07b6e979983cdce598a", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca07b6e979983cdce598a", share: "https://t.me/DaRyzS_bot?start=file_6acca07b6e979983cdce598a" },
        { ep: 7, name: "Ep07 - Demon Slayer [Cfire].mkv", size: "135.39 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0836e979983cdce598e", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca0836e979983cdce598e", share: "https://t.me/DaRyzS_bot?start=file_6acca0836e979983cdce598e" },
        { ep: 8, name: "Ep08 - Demon Slayer [Cfire].mkv", size: "138.16 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0856e979983cdce598f", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca0856e979983cdce598f", share: "https://t.me/DaRyzS_bot?start=file_6acca0856e979983cdce598f" },
        { ep: 9, name: "Ep09 - Demon Slayer [Cfire].mkv", size: "154.78 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0856e979983cdce5990", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca0856e979983cdce5990", share: "https://t.me/DaRyzS_bot?start=file_6acca0856e979983cdce5990" },
        { ep: 10, name: "Ep10 - Demon Slayer [Cfire].mkv", size: "141.22 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0856e979983cdce5991", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca0856e979983cdce5991", share: "https://t.me/DaRyzS_bot?start=file_6acca0856e979983cdce5991" },
        { ep: 11, name: "Ep11 - Demon Slayer [Cfire].mkv", size: "143.43 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0886e979983cdce5992", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca0886e979983cdce5992", share: "https://t.me/DaRyzS_bot?start=file_6acca0886e979983cdce5992" },
        { ep: 12, name: "Ep12 - Demon Slayer [Cfire].mkv", size: "120.89 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0886e979983cdce5993", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca0886e979983cdce5993", share: "https://t.me/DaRyzS_bot?start=file_6acca0886e979983cdce5993" },
        { ep: 13, name: "Ep13 - Demon Slayer [Cfire].mkv", size: "146.92 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca08d6e979983cdce5994", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca08d6e979983cdce5994", share: "https://t.me/DaRyzS_bot?start=file_6acca08d6e979983cdce5994" },
        { ep: 14, name: "Ep14 - Demon Slayer [Cfire].mkv", size: "116.02 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca08d6e979983cdce5995", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca08d6e979983cdce5995", share: "https://t.me/DaRyzS_bot?start=file_6acca08d6e979983cdce5995" },
        { ep: 15, name: "Ep15 - Demon Slayer [Cfire].mkv", size: "109.38 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca08e6e979983cdce5996", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca08e6e979983cdce5996", share: "https://t.me/DaRyzS_bot?start=file_6acca08e6e979983cdce5996" },
        { ep: 16, name: "Ep16 - Demon Slayer [Cfire].mkv", size: "132.9 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca08e6e979983cdce5997", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca08e6e979983cdce5997", share: "https://t.me/DaRyzS_bot?start=file_6acca08e6e979983cdce5997" },
        { ep: 17, name: "Ep17 - Demon Slayer [Cfire].mkv", size: "140.01 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0c06e979983cdce5998", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca0c06e979983cdce5998", share: "https://t.me/DaRyzS_bot?start=file_6acca0c06e979983cdce5998" },
        { ep: 18, name: "Ep18 - Demon Slayer [Cfire].mkv", size: "133.39 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0c56e979983cdce5999", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca0c56e979983cdce5999", share: "https://t.me/DaRyzS_bot?start=file_6acca0c56e979983cdce5999" },
        { ep: 19, name: "Ep19 - Demon Slayer [Cfire].mkv", size: "150.2 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0c56e979983cdce599b", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca0c56e979983cdce599b", share: "https://t.me/DaRyzS_bot?start=file_6acca0c56e979983cdce599b" },
        { ep: 20, name: "Ep20 - Demon Slayer [Cfire].mkv", size: "122.24 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0c56e979983cdce599a", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca0c56e979983cdce599a", share: "https://t.me/DaRyzS_bot?start=file_6acca0c56e979983cdce599a" },
        { ep: 21, name: "Ep21 - Demon Slayer [Cfire].mkv", size: "157.56 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0c66e979983cdce599c", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca0c66e979983cdce599c", share: "https://t.me/DaRyzS_bot?start=file_6acca0c66e979983cdce599c" },
        { ep: 22, name: "Ep22 - Demon Slayer [Cfire].mkv", size: "108.44 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0cb6e979983cdce599d", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca0cb6e979983cdce599d", share: "https://t.me/DaRyzS_bot?start=file_6acca0cb6e979983cdce599d" },
        { ep: 23, name: "Ep23 - Demon Slayer [Cfire].mkv", size: "102.14 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0cc6e979983cdce599e", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca0cc6e979983cdce599e", share: "https://t.me/DaRyzS_bot?start=file_6acca0cc6e979983cdce599e" },
        { ep: 24, name: "Ep24 - Demon Slayer [Cfire].mp4", size: "140.25 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0d16e979983cdce599f", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca0d16e979983cdce599f", share: "https://t.me/DaRyzS_bot?start=file_6acca0d16e979983cdce599f" },
        { ep: 25, name: "Ep25 - Demon Slayer [Cfire].mkv", size: "134.41 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0d16e979983cdce59a0", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca0d16e979983cdce59a0", share: "https://t.me/DaRyzS_bot?start=file_6acca0d16e979983cdce59a0" },
        { ep: 26, name: "Ep26 Akhir - Demon Slayer [Cfire].mkv", size: "141.5 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0f66e979983cdce59a1", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca0f66e979983cdce59a1", share: "https://t.me/DaRyzS_bot?start=file_6acca0f66e979983cdce59a1" }
      ]
    },
    jujutsuKaisen: {
      title: "Jujutsu Kaisen Episode 1-24",
      poster: "https://i.postimg.cc/dtrDLwFL/JJK-DP.jpg",
      episodes: [
        { ep: 1, name: "video-2026-10-12_09-27-46.mp4", size: "76.88 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a4d", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca8136e979983cdce5a4d", share: "https://t.me/DaRyzS_bot?start=file_6acca8136e979983cdce5a4d" },
        { ep: 2, name: "video-2026-10-12_09-27-46.mp4", size: "76.77 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a4e", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca8136e979983cdce5a4e", share: "https://t.me/DaRyzS_bot?start=file_6acca8136e979983cdce5a4e" },
        { ep: 3, name: "video-2026-10-12_09-27-46.mp4", size: "76.95 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a4f", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca8136e979983cdce5a4f", share: "https://t.me/DaRyzS_bot?start=file_6acca8136e979983cdce5a4f" },
        { ep: 4, name: "video-2026-10-12_09-27-46.mp4", size: "76.97 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a50", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca8136e979983cdce5a50", share: "https://t.me/DaRyzS_bot?start=file_6acca8136e979983cdce5a50" },
        { ep: 5, name: "video-2026-10-12_09-27-46.mp4", size: "76.95 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a51", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca8136e979983cdce5a51", share: "https://t.me/DaRyzS_bot?start=file_6acca8136e979983cdce5a51" },
        { ep: 6, name: "video-2026-10-12_09-27-46.mp4", size: "76.88 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a52", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca8136e979983cdce5a52", share: "https://t.me/DaRyzS_bot?start=file_6acca8136e979983cdce5a52" },
        { ep: 7, name: "video-2026-10-12_09-27-54.mp4", size: "76.93 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca81b6e979983cdce5a53", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca81b6e979983cdce5a53", share: "https://t.me/DaRyzS_bot?start=file_6acca81b6e979983cdce5a53" },
        { ep: 8, name: "video-2026-10-12_09-27-57.mp4", size: "54.36 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca81d6e979983cdce5a54", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca81d6e979983cdce5a54", share: "https://t.me/DaRyzS_bot?start=file_6acca81d6e979983cdce5a54" },
        { ep: 9, name: "video-2026-10-12_09-27-57.mp4", size: "51.56 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca81d6e979983cdce5a55", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca81d6e979983cdce5a55", share: "https://t.me/DaRyzS_bot?start=file_6acca81d6e979983cdce5a55" },
        { ep: 10, name: "video-2026-10-12_09-27-57.mp4", size: "64.68 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca81d6e979983cdce5a56", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca81d6e979983cdce5a56", share: "https://t.me/DaRyzS_bot?start=file_6acca81d6e979983cdce5a56" },
        { ep: 11, name: "video-2026-10-12_09-28-00.mp4", size: "58.95 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8206e979983cdce5a57", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca8206e979983cdce5a57", share: "https://t.me/DaRyzS_bot?start=file_6acca8206e979983cdce5a57" },
        { ep: 12, name: "video-2026-10-12_09-28-00.mp4", size: "48.22 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8206e979983cdce5a58", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca8206e979983cdce5a58", share: "https://t.me/DaRyzS_bot?start=file_6acca8206e979983cdce5a58" },
        { ep: 13, name: "video-2026-10-12_09-28-05.mp4", size: "53.39 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8256e979983cdce5a59", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca8256e979983cdce5a59", share: "https://t.me/DaRyzS_bot?start=file_6acca8256e979983cdce5a59" },
        { ep: 14, name: "video-2026-10-12_09-28-05.mp4", size: "77.35 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8256e979983cdce5a5a", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca8256e979983cdce5a5a", share: "https://t.me/DaRyzS_bot?start=file_6acca8256e979983cdce5a5a" },
        { ep: 15, name: "video-2026-10-12_09-28-26.mp4", size: "77.29 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca83a6e979983cdce5a5b", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca83a6e979983cdce5a5b", share: "https://t.me/DaRyzS_bot?start=file_6acca83a6e979983cdce5a5b" },
        { ep: 16, name: "video-2026-10-12_09-28-27.mp4", size: "77.29 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca83b6e979983cdce5a5c", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca83b6e979983cdce5a5c", share: "https://t.me/DaRyzS_bot?start=file_6acca83b6e979983cdce5a5c" },
        { ep: 17, name: "video-2026-10-12_09-28-27.mp4", size: "77.28 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca83b6e979983cdce5a5d", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca83b6e979983cdce5a5d", share: "https://t.me/DaRyzS_bot?start=file_6acca83b6e979983cdce5a5d" },
        { ep: 18, name: "video-2026-10-12_09-28-27.mp4", size: "77.3 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca83b6e979983cdce5a5e", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca83b6e979983cdce5a5e", share: "https://t.me/DaRyzS_bot?start=file_6acca83b6e979983cdce5a5e" },
        { ep: 19, name: "video-2026-10-12_09-28-32.mp4", size: "134.26 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8406e979983cdce5a5f", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca8406e979983cdce5a5f", share: "https://t.me/DaRyzS_bot?start=file_6acca8406e979983cdce5a5f" },
        { ep: 20, name: "video-2026-10-12_09-28-32.mp4", size: "76.51 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8406e979983cdce5a60", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca8406e979983cdce5a60", share: "https://t.me/DaRyzS_bot?start=file_6acca8406e979983cdce5a60" },
        { ep: 21, name: "video-2026-10-12_09-28-32.mp4", size: "76.51 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8406e979983cdce5a61", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca8406e979983cdce5a61", share: "https://t.me/DaRyzS_bot?start=file_6acca8406e979983cdce5a61" },
        { ep: 22, name: "video-2026-10-12_09-28-37.mp4", size: "150.93 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8466e979983cdce5a62", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca8466e979983cdce5a62", share: "https://t.me/DaRyzS_bot?start=file_6acca8466e979983cdce5a62" },
        { ep: 23, name: "video-2026-10-12_09-28-37.mp4", size: "91.35 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8466e979983cdce5a63", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca8466e979983cdce5a63", share: "https://t.me/DaRyzS_bot?start=file_6acca8466e979983cdce5a63" },
        { ep: 24, name: "video-2026-10-12_09-28-37.mp4", size: "123.49 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8466e979983cdce5a64", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca8466e979983cdce5a64", share: "https://t.me/DaRyzS_bot?start=file_6acca8466e979983cdce5a64" }
      ]
    },
    boruto: {
      title: "Boruto Episode 1-100",
      posters: [
        "https://i.postimg.cc/BZdkmGKm/Boruto-1.jpg",
        "https://i.postimg.cc/h4H62qdZ/Boruto-2.jpg",
        "https://i.postimg.cc/ZY12whdc/Boruto-3.jpg",
        "https://i.postimg.cc/gcfQgPh9/Boruto-4.jpg",
        "https://i.postimg.cc/8kq9ZV6q/Boruto-5.jpg",
        "https://i.postimg.cc/W139j2xZ/Boruto-6.jpg"
      ],
      episodes: [
        { ep: 1, name: "Boruto Episode 1 Malay Sub 720p.mkv", size: "87.5 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca26e6e979983cdce59d3", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca26e6e979983cdce59d3", share: "https://t.me/DaRyzS_bot?start=file_6acca26e6e979983cdce59d3" },
        { ep: 2, name: "Boruto Episode 2 Malay Sub 720p.mkv", size: "73.33 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca26e6e979983cdce59d4", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca26e6e979983cdce59d4", share: "https://t.me/DaRyzS_bot?start=file_6acca26e6e979983cdce59d4" },
        { ep: 3, name: "Boruto Episode 3 Malay Sub 720p.mkv", size: "81.12 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca26e6e979983cdce59d5", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca26e6e979983cdce59d5", share: "https://t.me/DaRyzS_bot?start=file_6acca26e6e979983cdce59d5" },
        { ep: 4, name: "Boruto Episode 4 Malay Sub 720p.mkv", size: "84.63 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2736e979983cdce59d6", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2736e979983cdce59d6", share: "https://t.me/DaRyzS_bot?start=file_6acca2736e979983cdce59d6" },
        { ep: 5, name: "Boruto Episode 5 Malay Sub 720p.mkv", size: "77.98 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca27a6e979983cdce59d7", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca27a6e979983cdce59d7", share: "https://t.me/DaRyzS_bot?start=file_6acca27a6e979983cdce59d7" },
        { ep: 6, name: "Boruto Episode 6 Malay Sub 720p.mkv", size: "114.44 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2a06e979983cdce59d8", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2a06e979983cdce59d8", share: "https://t.me/DaRyzS_bot?start=file_6acca2a06e979983cdce59d8" },
        { ep: 7, name: "Boruto Episode 7 Malay Sub 720p.mkv", size: "55.34 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2a06e979983cdce59d9", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2a06e979983cdce59d9", share: "https://t.me/DaRyzS_bot?start=file_6acca2a06e979983cdce59d9" },
        { ep: 8, name: "Boruto Episode 8 Malay Sub 720p.mkv", size: "94.03 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2a06e979983cdce59da", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2a06e979983cdce59da", share: "https://t.me/DaRyzS_bot?start=file_6acca2a06e979983cdce59da" },
        { ep: 9, name: "Boruto Episode 9 Malay Sub 720p.mkv", size: "65.97 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2a66e979983cdce59db", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2a66e979983cdce59db", share: "https://t.me/DaRyzS_bot?start=file_6acca2a66e979983cdce59db" },
        { ep: 10, name: "Boruto Episode 10 Malay Sub 720p.mkv", size: "72.22 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2a66e979983cdce59dc", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2a66e979983cdce59dc", share: "https://t.me/DaRyzS_bot?start=file_6acca2a66e979983cdce59dc" },
        { ep: 11, name: "Boruto Episode 11 Malay Sub 720p.mkv", size: "84.39 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2aa6e979983cdce59dd", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2aa6e979983cdce59dd", share: "https://t.me/DaRyzS_bot?start=file_6acca2aa6e979983cdce59dd" },
        { ep: 12, name: "Boruto Episode 12 Malay Sub 720p.mkv", size: "71.71 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2ab6e979983cdce59de", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2ab6e979983cdce59de", share: "https://t.me/DaRyzS_bot?start=file_6acca2ab6e979983cdce59de" },
        { ep: 13, name: "Boruto Episode 13 Malay Sub 720p.mkv", size: "71.27 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2ab6e979983cdce59df", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2ab6e979983cdce59df", share: "https://t.me/DaRyzS_bot?start=file_6acca2ab6e979983cdce59df" },
        { ep: 14, name: "Boruto.Epiosde 14 MalaySub.720p.mkv", size: "90.45 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2b16e979983cdce59e0", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2b16e979983cdce59e0", share: "https://t.me/DaRyzS_bot?start=file_6acca2b16e979983cdce59e0" },
        { ep: 15, name: "Boruto Episode 15 Malay Sub 720p.mkv", size: "67.51 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2b16e979983cdce59e1", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2b16e979983cdce59e1", share: "https://t.me/DaRyzS_bot?start=file_6acca2b16e979983cdce59e1" },
        { ep: 16, name: "Boruto Episode 16 MalaySub HDTV.mkv", size: "75.31 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2dc6e979983cdce59e2", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2dc6e979983cdce59e2", share: "https://t.me/DaRyzS_bot?start=file_6acca2dc6e979983cdce59e2" },
        { ep: 17, name: "Boruto Episode 17 HDTV MalaySub.mkv", size: "77.34 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e06e979983cdce59e3", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2e06e979983cdce59e3", share: "https://t.me/DaRyzS_bot?start=file_6acca2e06e979983cdce59e3" },
        { ep: 18, name: "Boruto Ep.18 BM.mkv", size: "64.73 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e06e979983cdce59e4", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2e06e979983cdce59e4", share: "https://t.me/DaRyzS_bot?start=file_6acca2e06e979983cdce59e4" },
        { ep: 19, name: "Boruto Episode 19 MalaySub.mkv", size: "69.96 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e16e979983cdce59e6", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2e16e979983cdce59e6", share: "https://t.me/DaRyzS_bot?start=file_6acca2e16e979983cdce59e6" },
        { ep: 20, name: "Boruto Episode 20 MalaySub @TLGCHANNELMOVIE.mkv", size: "89.28 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e16e979983cdce59e5", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2e16e979983cdce59e5", share: "https://t.me/DaRyzS_bot?start=file_6acca2e16e979983cdce59e5" },
        { ep: 21, name: "Boruto Episod 21 MalaySub.mkv", size: "81.66 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e66e979983cdce59e7", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2e66e979983cdce59e7", share: "https://t.me/DaRyzS_bot?start=file_6acca2e66e979983cdce59e7" },
        { ep: 22, name: "BORUTO Episode 22 Malay Sub@onepieceyour.mkv", size: "74.55 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e66e979983cdce59e8", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2e66e979983cdce59e8", share: "https://t.me/DaRyzS_bot?start=file_6acca2e66e979983cdce59e8" },
        { ep: 23, name: "Boruto_Ep.23_BM@onepieceyour.mkv", size: "94.78 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2eb6e979983cdce59e9", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2eb6e979983cdce59e9", share: "https://t.me/DaRyzS_bot?start=file_6acca2eb6e979983cdce59e9" },
        { ep: 24, name: "Boruto_Ep24_BM@onepieceyour.mkv", size: "71.3 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2ec6e979983cdce59ea", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca2ec6e979983cdce59ea", share: "https://t.me/DaRyzS_bot?start=file_6acca2ec6e979983cdce59ea" },
        { ep: 25, name: "Boruto Episode 25 Malay Sub 720p .mkv", size: "65.86 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2ec6e979983cdce59eb", share: "https://t.me/DaRyzS_bot?start=file_6acca2ec6e979983cdce59eb" },
        { ep: 26, name: "Boruto Episode 26 Malay Sub 720p .mkv", size: "70.27 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2f26e979983cdce59ec", share: "https://t.me/DaRyzS_bot?start=file_6acca2f26e979983cdce59ec" },
        { ep: 27, name: "Boruto Episode 27 Malay Sub 720p .mkv .mkv", size: "86.08 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3186e979983cdce59ed", share: "https://t.me/DaRyzS_bot?start=file_6acca3186e979983cdce59ed" },
        { ep: 28, name: "Boruto Episode 28 Malay Sub 720p.mkv", size: "102.5 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca31e6e979983cdce59ee", share: "https://t.me/DaRyzS_bot?start=file_6acca31e6e979983cdce59ee" },
        { ep: 29, name: "Boruto Episode 29 Malay Sub 720p.mkv", size: "114.26 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca31e6e979983cdce59ef", share: "https://t.me/DaRyzS_bot?start=file_6acca31e6e979983cdce59ef" },
        { ep: 30, name: "Boruto Episode 30 Malay Sub 720p.mkv", size: "135.32 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3246e979983cdce59f0", share: "https://t.me/DaRyzS_bot?start=file_6acca3246e979983cdce59f0" },
        { ep: 31, name: "Boruto Episode 31 Malay Sub 720p.mkv", size: "104.03 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3246e979983cdce59f1", share: "https://t.me/DaRyzS_bot?start=file_6acca3246e979983cdce59f1" },
        { ep: 32, name: "Boruto Episode 32 Malay Sub 720p.mkv", size: "80.53 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3256e979983cdce59f2", share: "https://t.me/DaRyzS_bot?start=file_6acca3256e979983cdce59f2" },
        { ep: 33, name: "Boruto Episode 33 Malay Sub 720p.mkv", size: "84.06 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3296e979983cdce59f3", share: "https://t.me/DaRyzS_bot?start=file_6acca3296e979983cdce59f3" },
        { ep: 34, name: "Boruto Episode 34 Malay Sub 720p.mkv", size: "97.77 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3296e979983cdce59f4", share: "https://t.me/DaRyzS_bot?start=file_6acca3296e979983cdce59f4" },
        { ep: 35, name: "Boruto Episode 35 Malay Sub 720p.mkv", size: "76.88 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3296e979983cdce59f5", share: "https://t.me/DaRyzS_bot?start=file_6acca3296e979983cdce59f5" },
        { ep: 36, name: "Boruto Episode 36 Malay Sub 720p.mkv", size: "94.51 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca32f6e979983cdce59f6", share: "https://t.me/DaRyzS_bot?start=file_6acca32f6e979983cdce59f6" },
        { ep: 37, name: "Boruto Episode 37 Malay Sub 720p.mkv", size: "82.96 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca32f6e979983cdce59f7", share: "https://t.me/DaRyzS_bot?start=file_6acca32f6e979983cdce59f7" },
        { ep: 38, name: "Boruto Episode 38 Malay Sub 720p.mkv", size: "75.08 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3546e979983cdce59f8", share: "https://t.me/DaRyzS_bot?start=file_6acca3546e979983cdce59f8" },
        { ep: 39, name: "Boruto Episode 39 Malay Sub 720p.mkv", size: "85.9 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca35a6e979983cdce59f9", share: "https://t.me/DaRyzS_bot?start=file_6acca35a6e979983cdce59f9" },
        { ep: 40, name: "Boruto Episode 40 Malay Sub 720p.mkv", size: "95.48 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca35c6e979983cdce59fa", share: "https://t.me/DaRyzS_bot?start=file_6acca35c6e979983cdce59fa" },
        { ep: 41, name: "Boruto Episode 41 Malay Sub 720p.mkv", size: "80.67 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca35f6e979983cdce59fb", share: "https://t.me/DaRyzS_bot?start=file_6acca35f6e979983cdce59fb" },
        { ep: 42, name: "Boruto Episode 42 Malay Sub 720p.mkv", size: "67.13 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca35f6e979983cdce59fc", share: "https://t.me/DaRyzS_bot?start=file_6acca35f6e979983cdce59fc" },
        { ep: 43, name: "Boruto Episode 43 Malay Sub 720p .mkv", size: "81.72 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3606e979983cdce59fd", share: "https://t.me/DaRyzS_bot?start=file_6acca3606e979983cdce59fd" },
        { ep: 44, name: "Boruto Episode 44 Malay Sub 720p.mkv", size: "83.53 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3606e979983cdce59fe", share: "https://t.me/DaRyzS_bot?start=file_6acca3606e979983cdce59fe" },
        { ep: 45, name: "Boruto Episode 45 Malay Sub 720p.mkv", size: "73.81 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3656e979983cdce59ff", share: "https://t.me/DaRyzS_bot?start=file_6acca3656e979983cdce59ff" },
        { ep: 46, name: "Boruto Episode 46 Malay Sub 720p .mkv", size: "84.33 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3906e979983cdce5a00", share: "https://t.me/DaRyzS_bot?start=file_6acca3906e979983cdce5a00" },
        { ep: 47, name: "Boruto Episode 47 Malay Sub 720p.mkv", size: "94.86 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3906e979983cdce5a01", share: "https://t.me/DaRyzS_bot?start=file_6acca3906e979983cdce5a01" },
        { ep: 48, name: "Boruto Episode 48 Malay Sub 720p.mkv", size: "68.18 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3906e979983cdce5a02", share: "https://t.me/DaRyzS_bot?start=file_6acca3906e979983cdce5a02" },
        { ep: 49, name: "Boruto Episode 49 Malay Sub 720p.mkv", size: "87.38 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3956e979983cdce5a03", share: "https://t.me/DaRyzS_bot?start=file_6acca3956e979983cdce5a03" },
        { ep: 50, name: "Boruto Episode 50 Malay Sub 720p.mkv", size: "111.06 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca39b6e979983cdce5a04", share: "https://t.me/DaRyzS_bot?start=file_6acca39b6e979983cdce5a04" },
        { ep: 51, name: "Boruto Episode 51 Malay Sub 720p.mkv", size: "72.41 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca39b6e979983cdce5a05", share: "https://t.me/DaRyzS_bot?start=file_6acca39b6e979983cdce5a05" },
        { ep: 52, name: "Boruto Episode 52 Malay Sub 720p.mkv", size: "89.36 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca39b6e979983cdce5a06", share: "https://t.me/DaRyzS_bot?start=file_6acca39b6e979983cdce5a06" },
        { ep: 53, name: "Boruto Episode 53 Malay Sub 720p.mkv", size: "84.7 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3a06e979983cdce5a07", share: "https://t.me/DaRyzS_bot?start=file_6acca3a06e979983cdce5a07" },
        { ep: 54, name: "Boruto Episode 54 Malay Sub 720p.mkv", size: "89.79 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3a06e979983cdce5a08", share: "https://t.me/DaRyzS_bot?start=file_6acca3a06e979983cdce5a08" },
        { ep: 55, name: "Boruto Episode 55 Malay Sub 720p.mkv", size: "75.82 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3a06e979983cdce5a09", share: "https://t.me/DaRyzS_bot?start=file_6acca3a06e979983cdce5a09" },
        { ep: 56, name: "Boruto Episode 56 Malay Sub 720p.mkv", size: "96.46 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3a56e979983cdce5a0a", share: "https://t.me/DaRyzS_bot?start=file_6acca3a56e979983cdce5a0a" },
        { ep: 57, name: "Boruto Episode 57 Malay Sub 720p.mkv", size: "97.49 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3cd6e979983cdce5a0b", share: "https://t.me/DaRyzS_bot?start=file_6acca3cd6e979983cdce5a0b" },
        { ep: 58, name: "Boruto Episode 58 Malay Sub 720p.mkv", size: "106.81 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3cd6e979983cdce5a0c", share: "https://t.me/DaRyzS_bot?start=file_6acca3cd6e979983cdce5a0c" },
        { ep: 59, name: "Boruto Episode 59 Malay Sub 720p.mkv", size: "88.04 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3cd6e979983cdce5a0d", share: "https://t.me/DaRyzS_bot?start=file_6acca3cd6e979983cdce5a0d" },
        { ep: 60, name: "Boruto Episode 60 Malay Sub 720p.mkv", size: "90.82 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3d26e979983cdce5a0e", share: "https://t.me/DaRyzS_bot?start=file_6acca3d26e979983cdce5a0e" },
        { ep: 61, name: "Boruto Episode 61 Malay Sub 720p.mkv", size: "107.55 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3d76e979983cdce5a0f", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca3d76e979983cdce5a0f", share: "https://t.me/DaRyzS_bot?start=file_6acca3d76e979983cdce5a0f" },
        { ep: 62, name: "Boruto Episode 62 Malay Sub 720p.mkv", size: "108.15 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3d76e979983cdce5a10", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca3d76e979983cdce5a10", share: "https://t.me/DaRyzS_bot?start=file_6acca3d76e979983cdce5a10" },
        { ep: 63, name: "Boruto Episode 63 Malay Sub 720p.mkv", size: "68.71 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3d76e979983cdce5a11", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca3d76e979983cdce5a11", share: "https://t.me/DaRyzS_bot?start=file_6acca3d76e979983cdce5a11" },
        { ep: 64, name: "Boruto Episode 64 Malay Sub 720p.mkv", size: "73.97 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3d76e979983cdce5a12", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca3d76e979983cdce5a12", share: "https://t.me/DaRyzS_bot?start=file_6acca3d76e979983cdce5a12" },
        { ep: 65, name: "Boruto Episode 65 Malay Sub 720p.mkv", size: "127.24 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3dc6e979983cdce5a13", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca3dc6e979983cdce5a13", share: "https://t.me/DaRyzS_bot?start=file_6acca3dc6e979983cdce5a13" },
        { ep: 66, name: "Boruto Episode 66 Malay Sub 720p.mkv", size: "83.48 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3dd6e979983cdce5a14", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca3dd6e979983cdce5a14", share: "https://t.me/DaRyzS_bot?start=file_6acca3dd6e979983cdce5a14" },
        { ep: 67, name: "Boruto Episode 67 Malay Sub 720p.mkv", size: "79.83 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a16", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6056e979983cdce5a16", share: "https://t.me/DaRyzS_bot?start=file_6acca6056e979983cdce5a16" },
        { ep: 68, name: "Boruto Episode 68 Malay Sub 720p.mkv", size: "79.04 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a1a", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6056e979983cdce5a1a", share: "https://t.me/DaRyzS_bot?start=file_6acca6056e979983cdce5a1a" },
        { ep: 69, name: "Boruto Episode 69 Malay Sub 720p.mkv", size: "69.38 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a15", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6056e979983cdce5a15", share: "https://t.me/DaRyzS_bot?start=file_6acca6056e979983cdce5a15" },
        { ep: 70, name: "Boruto Episode 70 Malay Sub 720p.mkv", size: "78.41 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a18", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6056e979983cdce5a18", share: "https://t.me/DaRyzS_bot?start=file_6acca6056e979983cdce5a18" },
        { ep: 71, name: "Boruto Episode 71 Malay Sub 720p.mkv", size: "143.4 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a17", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6056e979983cdce5a17", share: "https://t.me/DaRyzS_bot?start=file_6acca6056e979983cdce5a17" },
        { ep: 72, name: "Boruto Episode 72 Malay Sub 720p.mkv", size: "136.45 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a19", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6056e979983cdce5a19", share: "https://t.me/DaRyzS_bot?start=file_6acca6056e979983cdce5a19" },
        { ep: 73, name: "Boruto Episode 73 Malay Sub 720p.mkv", size: "153.6 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca60d6e979983cdce5a1d", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca60d6e979983cdce5a1d", share: "https://t.me/DaRyzS_bot?start=file_6acca60d6e979983cdce5a1d" },
        { ep: 74, name: "Boruto Episode 74 Malay Sub 720p.mkv", size: "85.52 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca60d6e979983cdce5a1b", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca60d6e979983cdce5a1b", share: "https://t.me/DaRyzS_bot?start=file_6acca60d6e979983cdce5a1b" },
        { ep: 75, name: "Boruto Episode 75 Malay Sub 720p MNBFANS.mkv", size: "64.39 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca60d6e979983cdce5a1c", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca60d6e979983cdce5a1c", share: "https://t.me/DaRyzS_bot?start=file_6acca60d6e979983cdce5a1c" },
        { ep: 76, name: "Boruto Episode 76 Malay Sub 720p MNBFANS.mkv", size: "74.98 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca60d6e979983cdce5a1e", share: "https://t.me/DaRyzS_bot?start=file_6acca60d6e979983cdce5a1e" },
        { ep: 77, name: "Boruto Episode 77 Malay Sub 720p MNBFANS.mkv", size: "70.88 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6136e979983cdce5a1f", share: "https://t.me/DaRyzS_bot?start=file_6acca6136e979983cdce5a1f" },
        { ep: 78, name: "Boruto Episode 78 Malay Sub 720p MNBFANS.mkv", size: "149.48 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6136e979983cdce5a20", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6136e979983cdce5a20", share: "https://t.me/DaRyzS_bot?start=file_6acca6136e979983cdce5a20" },
        { ep: 79, name: "Boruto Episode 79 Malay Sub 720p MNBFANS.mkv", size: "115.45 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6196e979983cdce5a21", share: "https://t.me/DaRyzS_bot?start=file_6acca6196e979983cdce5a21" },
        { ep: 80, name: "Boruto Episode 80 Malay Sub 720p MNBFANS.mkv", size: "70.24 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a3d", share: "https://t.me/DaRyzS_bot?start=file_6acca77e6e979983cdce5a3d" },
        { ep: 81, name: "Boruto Episode 81 Malay Sub 720p MNBFANS.mkv", size: "85.46 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a3c", share: "https://t.me/DaRyzS_bot?start=file_6acca77e6e979983cdce5a3c" },
        { ep: 82, name: "Boruto Episode 82 Malay Sub 720p MNBFANS.mkv", size: "128.45 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a39", share: "https://t.me/DaRyzS_bot?start=file_6acca77e6e979983cdce5a39" },
        { ep: 83, name: "Boruto Episode 83 Malay Sub 720p MNBFANS.mkv", size: "74.23 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a3a", share: "https://t.me/DaRyzS_bot?start=file_6acca77e6e979983cdce5a3a" },
        { ep: 84, name: "Boruto Episode 84 Malay Sub 720p MNBFANS.mkv", size: "77.47 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a3b", share: "https://t.me/DaRyzS_bot?start=file_6acca77e6e979983cdce5a3b" },
        { ep: 85, name: "Boruto Episode 85 Malay Sub 720p MNBFANS.mkv", size: "80.0 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a38", share: "https://t.me/DaRyzS_bot?start=file_6acca77e6e979983cdce5a38" },
        { ep: 86, name: "Boruto Episode 86 Malay Sub 720p MNBFANS.mkv", size: "76.68 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7866e979983cdce5a40", share: "https://t.me/DaRyzS_bot?start=file_6acca7866e979983cdce5a40" },
        { ep: 87, name: "Boruto Episode 87 Malay Sub 720p MNBFANS.mkv", size: "108.11 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7866e979983cdce5a3f", share: "https://t.me/DaRyzS_bot?start=file_6acca7866e979983cdce5a3f" },
        { ep: 88, name: "Boruto Episode 88 Malay Sub 720p MNBFANS.mkv", size: "81.67 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7866e979983cdce5a3e", share: "https://t.me/DaRyzS_bot?start=file_6acca7866e979983cdce5a3e" },
        { ep: 89, name: "Boruto Episode 89 Malay Sub 720p MNBFANS.mkv", size: "79.2 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7866e979983cdce5a41", share: "https://t.me/DaRyzS_bot?start=file_6acca7866e979983cdce5a41" },
        { ep: 90, name: "Boruto Episode 90 Malay Sub 720p MNBFANS.mkv", size: "96.37 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca78c6e979983cdce5a42", share: "https://t.me/DaRyzS_bot?start=file_6acca78c6e979983cdce5a42" },
        { ep: 91, name: "Boruto Episode 91 Malay Sub 720p MNBFANS.mkv", size: "96.17 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca78c6e979983cdce5a43", share: "https://t.me/DaRyzS_bot?start=file_6acca78c6e979983cdce5a43" },
        { ep: 92, name: "Boruto Episode 92 Malay Sub 720p MNBFANS.mkv", size: "73.27 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7916e979983cdce5a45", share: "https://t.me/DaRyzS_bot?start=file_6acca7916e979983cdce5a45" },
        { ep: 93, name: "Boruto Episode 93 Malay Sub 720p MNBFANS.mkv", size: "81.3 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7916e979983cdce5a44", share: "https://t.me/DaRyzS_bot?start=file_6acca7916e979983cdce5a44" },
        { ep: 94, name: "Boruto Episode 94 Malay Sub 720p MNBFANS.mkv", size: "84.68 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7916e979983cdce5a46", share: "https://t.me/DaRyzS_bot?start=file_6acca7916e979983cdce5a46" },
        { ep: 95, name: "Boruto eps 95.mkv", size: "80.1 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7bd6e979983cdce5a47", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca7bd6e979983cdce5a47", share: "https://t.me/DaRyzS_bot?start=file_6acca7bd6e979983cdce5a47" },
        { ep: 96, name: "Boruto.Ep96.MalaySub@koleksinaruto.mkv", size: "107.91 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7bd6e979983cdce5a48", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca7bd6e979983cdce5a48", share: "https://t.me/DaRyzS_bot?start=file_6acca7bd6e979983cdce5a48" },
        { ep: 97, name: "Boruto eps 97.mkv", size: "77.02 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7bd6e979983cdce5a49", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca7bd6e979983cdce5a49", share: "https://t.me/DaRyzS_bot?start=file_6acca7bd6e979983cdce5a49" },
        { ep: 98, name: "Boruto Episode 98 Malay Sub 720p MNBFANS.mkv", size: "97.32 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7c26e979983cdce5a4a", share: "https://t.me/DaRyzS_bot?start=file_6acca7c26e979983cdce5a4a" },
        { ep: 99, name: "Boruto.Ep99.MalaySub @koleksinaruto.mkv", size: "95.85 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7c26e979983cdce5a4c", share: "https://t.me/DaRyzS_bot?start=file_6acca7c26e979983cdce5a4c" },
        { ep: 100, name: "Boruto eps 100.mkv", size: "87.1 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7c26e979983cdce5a4b", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca7c26e979983cdce5a4b", share: "https://t.me/DaRyzS_bot?start=file_6acca7c26e979983cdce5a4b" }
      ]
    },
    hagemaru: {
      title: "Hagemaru Episode 1-22",
      poster: "https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg",
      episodes: [
        { ep: 1, name: "Tsurupika Hagemaru Episod 1.mp4", size: "164.33 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a26", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6a96e979983cdce5a26", share: "https://t.me/DaRyzS_bot?start=file_6acca6a96e979983cdce5a26" },
        { ep: 2, name: "Tsurupika Hagemaru Episod 2.mp4", size: "142.44 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a24", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6a96e979983cdce5a24", share: "https://t.me/DaRyzS_bot?start=file_6acca6a96e979983cdce5a24" },
        { ep: 3, name: "Tsurupika Hagemaru Episod 3.mp4", size: "126.19 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a22", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6a96e979983cdce5a22", share: "https://t.me/DaRyzS_bot?start=file_6acca6a96e979983cdce5a22" },
        { ep: 4, name: "Tsurupika Hagemaru Episod 4.mp4", size: "135.71 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a23", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6a96e979983cdce5a23", share: "https://t.me/DaRyzS_bot?start=file_6acca6a96e979983cdce5a23" },
        { ep: 5, name: "Tsurupika Hagemaru Episod 5.mp4", size: "140.36 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a25", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6a96e979983cdce5a25", share: "https://t.me/DaRyzS_bot?start=file_6acca6a96e979983cdce5a25" },
        { ep: 6, name: "HD-L4-BASELINE-HAGEMARU-6-MALAY.mp4", size: "53.27 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a27", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6a96e979983cdce5a27", share: "https://t.me/DaRyzS_bot?start=file_6acca6a96e979983cdce5a27" },
        { ep: 7, name: "Tsurupika Hagemaru - Episod 7 - Hubungi Orang Tersayang.mp4", size: "33.94 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6b16e979983cdce5a28", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6b16e979983cdce5a28", share: "https://t.me/DaRyzS_bot?start=file_6acca6b16e979983cdce5a28" },
        { ep: 8, name: "Tsurupika Hagemaru - Episod 8 - Satu Hari Di Taman Hiburan.mp4", size: "34.68 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6b36e979983cdce5a2b", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6b36e979983cdce5a2b", share: "https://t.me/DaRyzS_bot?start=file_6acca6b36e979983cdce5a2b" },
        { ep: 14, name: "[SHANA]Hagemaru Episod 14.mp4", size: "52.22 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6bc6e979983cdce5a2f", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6bc6e979983cdce5a2f", share: "https://t.me/DaRyzS_bot?start=file_6acca6bc6e979983cdce5a2f" },
        { ep: 15, name: "[SHANA]Hagemaru Episod 15 FIX.mp4", size: "50.43 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6bc6e979983cdce5a30", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6bc6e979983cdce5a30", share: "https://t.me/DaRyzS_bot?start=file_6acca6bc6e979983cdce5a30" },
        { ep: 16, name: "[SHANA]Hagemaru Episod 16.mp4", size: "52.42 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6bc6e979983cdce5a31", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6bc6e979983cdce5a31", share: "https://t.me/DaRyzS_bot?start=file_6acca6bc6e979983cdce5a31" },
        { ep: 17, name: "[SHANA]Hagemaru Episod 17.mp4", size: "52.85 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6ef6e979983cdce5a32", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6ef6e979983cdce5a32", share: "https://t.me/DaRyzS_bot?start=file_6acca6ef6e979983cdce5a32" },
        { ep: 18, name: "[SHANA]Hagemaru Episod 18.mp4", size: "42.36 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6ef6e979983cdce5a33", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6ef6e979983cdce5a33", share: "https://t.me/DaRyzS_bot?start=file_6acca6ef6e979983cdce5a33" },
        { ep: 19, name: "[SHANA]Hagemaru Episod 19.mp4", size: "46.82 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6ef6e979983cdce5a34", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6ef6e979983cdce5a34", share: "https://t.me/DaRyzS_bot?start=file_6acca6ef6e979983cdce5a34" },
        { ep: 20, name: "[SHANA]Hagemaru Episod 20.mp4", size: "47.03 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6ef6e979983cdce5a35", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6ef6e979983cdce5a35", share: "https://t.me/DaRyzS_bot?start=file_6acca6ef6e979983cdce5a35" },
        { ep: 21, name: "[SHANA]Hagemaru Episod 21.mp4", size: "38.91 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6f66e979983cdce5a36", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6f66e979983cdce5a36", share: "https://t.me/DaRyzS_bot?start=file_6acca6f66e979983cdce5a36" },
        { ep: 22, name: "[SHANA]Hagemaru Episod 22.mp4", size: "46.16 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6fa6e979983cdce5a37", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acca6fa6e979983cdce5a37", share: "https://t.me/DaRyzS_bot?start=file_6acca6fa6e979983cdce5a37" }
      ]
    },
    gundamBuildFighters: {
      title: "Gundam Build Fighters",
      poster: "https://i.postimg.cc/HkP46yYN/Gundam-Build-Fighter.jpg",
      episodes: [
        { ep: 1, name: "GUNDAM_BUILD_FIGHTERS_Episode_1_Sei_dan_Renji_Malay_dub_480p.mp4", size: "99.75 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a96", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb38a6e979983cdce5a96", share: "https://t.me/DaRyzS_bot?start=file_6accb38a6e979983cdce5a96" },
        { ep: 2, name: "GUNDAM_BUILD_FIGHTERS_Episode_2_Comet_Lembayung_Malay_dub_480p.mp4", size: "95.08 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a94", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb38a6e979983cdce5a94", share: "https://t.me/DaRyzS_bot?start=file_6accb38a6e979983cdce5a94" },
        { ep: 3, name: "GUNDAM_BUILD_FIGHTERS_Episode_3_Pakej_Penuh_Malay_dub_480p.mp4", size: "90.21 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a95", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb38a6e979983cdce5a95", share: "https://t.me/DaRyzS_bot?start=file_6accb38a6e979983cdce5a95" },
        { ep: 4, name: "GUNDAM_BUILD_FIGHTERS_Episode_4_Gunpla_Pujaan_Kirara☆_Malay.mp4", size: "94.97 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a98", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb38a6e979983cdce5a98", share: "https://t.me/DaRyzS_bot?start=file_6accb38a6e979983cdce5a98" },
        { ep: 5, name: "GUNDAM_BUILD_FIGHTERS_Episode_5_Pembina_Kuat_Malay_dub_480p.mp4", size: "91.21 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a99", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb38a6e979983cdce5a99", share: "https://t.me/DaRyzS_bot?start=file_6accb38a6e979983cdce5a99" },
        { ep: 6, name: "GUNDAM_BUILD_FIGHTERS_Episode_6_Satu_alasan_pertempuran_Malay_dub.mp4", size: "97.58 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a97", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb38a6e979983cdce5a97", share: "https://t.me/DaRyzS_bot?start=file_6accb38a6e979983cdce5a97" },
        { ep: 7, name: "GUNDAM_BUILD_FIGHTERS_Episode_7_keupayaan_Tahap_Dunia_Malay_dub.mp4", size: "89.16 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3926e979983cdce5a9a", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3926e979983cdce5a9a", share: "https://t.me/DaRyzS_bot?start=file_6accb3926e979983cdce5a9a" },
        { ep: 8, name: "GUNDAM_BUILD_FIGHTERS_Episode_8_Pertemuan_pejuang_Malay_dub_480p.mp4", size: "103.4 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3926e979983cdce5a9c", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3926e979983cdce5a9c", share: "https://t.me/DaRyzS_bot?start=file_6accb3926e979983cdce5a9c" },
        { ep: 9, name: "GUNDAM_BUILD_FIGHTERS_Episode_9_sayap_imaginasi_Malay_dub_480p.mp4", size: "94.19 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3926e979983cdce5a9b", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3926e979983cdce5a9b", share: "https://t.me/DaRyzS_bot?start=file_6accb3926e979983cdce5a9b" },
        { ep: 10, name: "GUNDAM_BUILD_FIGHTERS_Episode_10_Permulaan_Kejohanan_Dunia_Malay.mp4", size: "92.42 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3926e979983cdce5a9d", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3926e979983cdce5a9d", share: "https://t.me/DaRyzS_bot?start=file_6accb3926e979983cdce5a9d" },
        { ep: 11, name: "GUNDAM_BUILD_FIGHTERS_Episode_11_Pertempuran_Diraja_Malay_dub_480p.mp4", size: "112.83 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3986e979983cdce5a9e", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3986e979983cdce5a9e", share: "https://t.me/DaRyzS_bot?start=file_6accb3986e979983cdce5a9e" },
        { ep: 12, name: "GUNDAM_BUILD_FIGHTERS_Episode_12_Pelepasan_Malay_dub_480p.mp4", size: "99.99 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3986e979983cdce5a9f", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3986e979983cdce5a9f", share: "https://t.me/DaRyzS_bot?start=file_6accb3986e979983cdce5a9f" },
        { ep: 13, name: "GUNDAM_BUILD_FIGHTERS_Episode_13_Senjata_Pertempuran_Malay_dub_480p.mp4", size: "100.56 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb39d6e979983cdce5aa0", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb39d6e979983cdce5aa0", share: "https://t.me/DaRyzS_bot?start=file_6accb39d6e979983cdce5aa0" },
        { ep: 14, name: "GUNDAM_BUILD_FIGHTERS-Episode_14__Name_Kod__Malay_dub_(480p).mp4", size: "106.87 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb39d6e979983cdce5aa1", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb39d6e979983cdce5aa1", share: "https://t.me/DaRyzS_bot?start=file_6accb39d6e979983cdce5aa1" },
        { ep: 15, name: "GUNDAM_BUILD_FIGHTERS_Episode_15_Seri_Pejuang_Malay_dub_480p.mp4", size: "99.24 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb39d6e979983cdce5aa2", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb39d6e979983cdce5aa2", share: "https://t.me/DaRyzS_bot?start=file_6accb39d6e979983cdce5aa2" },
        { ep: 16, name: "GUNDAM_BUILD_FIGHTERS_Episode_16_Bapa,_kita_berjumpa_lagi_Malay.mp4", size: "87.41 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb39d6e979983cdce5aa3", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb39d6e979983cdce5aa3", share: "https://t.me/DaRyzS_bot?start=file_6accb39d6e979983cdce5aa3" },
        { ep: 17, name: "GUNDAM_BUILD_FIGHTERS_Episode_17_Model_Jantung_Malay_dub_480p.mp4", size: "104.12 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3c96e979983cdce5aa4", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3c96e979983cdce5aa4", share: "https://t.me/DaRyzS_bot?start=file_6accb3c96e979983cdce5aa4" },
        { ep: 18, name: "GUNDAM_BUILD_FIGHTERS_Episode_18_Anjinig_Pemburu_Malay_dub_480p.mp4", size: "97.79 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3ce6e979983cdce5aa5", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3ce6e979983cdce5aa5", share: "https://t.me/DaRyzS_bot?start=file_6accb3ce6e979983cdce5aa5" },
        { ep: 19, name: "GUNDAM_BUILD_FIGHTERS_Episode_19_Pisau_Astray_Malay_dub_480p.mp4", size: "96.85 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3ce6e979983cdce5aa6", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3ce6e979983cdce5aa6", share: "https://t.me/DaRyzS_bot?start=file_6accb3ce6e979983cdce5aa6" },
        { ep: 20, name: "GUNDAM_BUILD_FIGHTERS_Episode_20_Pengkhianatan_Aila_Malay_dub_480p.mp4", size: "106.36 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3ce6e979983cdce5aa7", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3ce6e979983cdce5aa7", share: "https://t.me/DaRyzS_bot?start=file_6accb3ce6e979983cdce5aa7" },
        { ep: 21, name: "GUNDAM_BUILD_FIGHTERS_Episode_21_Di_Tengah_Tengah_Glittering_Zarah.mp4", size: "95.29 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3d46e979983cdce5aa8", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3d46e979983cdce5aa8", share: "https://t.me/DaRyzS_bot?start=file_6accb3d46e979983cdce5aa8" },
        { ep: 22, name: "GUNDAM_BUILD_FIGHTERS_Episode_22_Meijin_bertanding_Meijin_Malay.mp4", size: "91.31 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3d46e979983cdce5aa9", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3d46e979983cdce5aa9", share: "https://t.me/DaRyzS_bot?start=file_6accb3d46e979983cdce5aa9" },
        { ep: 23, name: "GUNDAM_BUILD_FIGHTERS_Episode_23_Gunpla_Malam_Malay_dub_480p.mp4", size: "96.18 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3d46e979983cdce5aaa", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3d46e979983cdce5aaa", share: "https://t.me/DaRyzS_bot?start=file_6accb3d46e979983cdce5aaa" },
        { ep: 24, name: "GUNDAM_BUILD_FIGHTERS_Episode_24_Perkara_Gelap_Malay_dub_480p.mp4", size: "115.14 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3d96e979983cdce5aab", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3d96e979983cdce5aab", share: "https://t.me/DaRyzS_bot?start=file_6accb3d96e979983cdce5aab" },
        { ep: 25, name: "GUNDAM_BUILD_FIGHTERS_Episode_25_Perjanjian_Malay_dub_480p.mp4", size: "125.43 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3d96e979983cdce5aac", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3d96e979983cdce5aac", share: "https://t.me/DaRyzS_bot?start=file_6accb3d96e979983cdce5aac" }
      ]
    }
  },

  malaysianContentAndMovies: {
    satria: {
      title: "Satria 7 Pahlawan",
      poster: "https://i.postimg.cc/RZbQgHSb/SATRIA.jpg",
      episodes: [
        { ep: 1, name: "[EP.01] Satria 7 Pahlawan.mkv", size: "360.25 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7f", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2bf6e979983cdce5a7f", share: "https://t.me/DaRyzS_bot?start=file_6accb2bf6e979983cdce5a7f" },
        { ep: 2, name: "[EP.02] Satria 7 Pahlawan.mkv", size: "580.49 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7d", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2bf6e979983cdce5a7d", share: "https://t.me/DaRyzS_bot?start=file_6accb2bf6e979983cdce5a7d" },
        { ep: 3, name: "[EP.03] Satria 7 Pahlawan.mkv", size: "355.89 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7b", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2bf6e979983cdce5a7b", share: "https://t.me/DaRyzS_bot?start=file_6accb2bf6e979983cdce5a7b" },
        { ep: 4, name: "[EP.04] Satria 7 Pahlawan.mkv", size: "377.68 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7e", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2bf6e979983cdce5a7e", share: "https://t.me/DaRyzS_bot?start=file_6accb2bf6e979983cdce5a7e" },
        { ep: 5, name: "[EP.05] Satria 7 Pahlawan.mkv", size: "352.85 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7a", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2bf6e979983cdce5a7a", share: "https://t.me/DaRyzS_bot?start=file_6accb2bf6e979983cdce5a7a" },
        { ep: 6, name: "[EP.06] Satria 7 Pahlawan.mkv", size: "377.13 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7c", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2bf6e979983cdce5a7c", share: "https://t.me/DaRyzS_bot?start=file_6accb2bf6e979983cdce5a7c" },
        { ep: 7, name: "[EP.07] Satria 7 Pahlawan.mkv", size: "294.37 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2c76e979983cdce5a80", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2c76e979983cdce5a80", share: "https://t.me/DaRyzS_bot?start=file_6accb2c76e979983cdce5a80" },
        { ep: 8, name: "[EP.08] Satria 7 Pahlawan.mkv", size: "391.63 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2c76e979983cdce5a81", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2c76e979983cdce5a81", share: "https://t.me/DaRyzS_bot?start=file_6accb2c76e979983cdce5a81" },
        { ep: 9, name: "[EP.09] Satria 7 Pahlawan.mkv", size: "362.82 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2c76e979983cdce5a82", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2c76e979983cdce5a82", share: "https://t.me/DaRyzS_bot?start=file_6accb2c76e979983cdce5a82" },
        { ep: 10, name: "[EP.10] Satria 7 Pahlawan.mkv", size: "361.84 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2c76e979983cdce5a83", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2c76e979983cdce5a83", share: "https://t.me/DaRyzS_bot?start=file_6accb2c76e979983cdce5a83" },
        { ep: 11, name: "[EP.11] Satria 7 Pahlawan.mkv", size: "354.5 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2cd6e979983cdce5a84", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2cd6e979983cdce5a84", share: "https://t.me/DaRyzS_bot?start=file_6accb2cd6e979983cdce5a84" },
        { ep: 12, name: "[EP.12] Satria 7 Pahlawan.mkv", size: "346.85 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2cd6e979983cdce5a85", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2cd6e979983cdce5a85", share: "https://t.me/DaRyzS_bot?start=file_6accb2cd6e979983cdce5a85" },
        { ep: 13, name: "[EP.13] Satria 7 Pahlawan.mkv", size: "444.02 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2d26e979983cdce5a86", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2d26e979983cdce5a86", share: "https://t.me/DaRyzS_bot?start=file_6accb2d26e979983cdce5a86" },
        { ep: 14, name: "[EP.14] Satria 7 Pahlawan.mkv", size: "227.87 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2d26e979983cdce5a87", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2d26e979983cdce5a87", share: "https://t.me/DaRyzS_bot?start=file_6accb2d26e979983cdce5a87" },
        { ep: 15, name: "[EP.15] Satria 7 Pahlawan.mkv", size: "313.37 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2fe6e979983cdce5a88", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2fe6e979983cdce5a88", share: "https://t.me/DaRyzS_bot?start=file_6accb2fe6e979983cdce5a88" },
        { ep: 16, name: "[EP.16] Satria 7 Pahlawan.mkv", size: "236.71 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2fe6e979983cdce5a89", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2fe6e979983cdce5a89", share: "https://t.me/DaRyzS_bot?start=file_6accb2fe6e979983cdce5a89" },
        { ep: 17, name: "[EP.17] Satria 7 Pahlawan.mkv", size: "242.13 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2fe6e979983cdce5a8a", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2fe6e979983cdce5a8a", share: "https://t.me/DaRyzS_bot?start=file_6accb2fe6e979983cdce5a8a" },
        { ep: 18, name: "[EP.18] Satria 7 Pahlawan.mkv", size: "315.83 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2ff6e979983cdce5a8b", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2ff6e979983cdce5a8b", share: "https://t.me/DaRyzS_bot?start=file_6accb2ff6e979983cdce5a8b" },
        { ep: 19, name: "[EP.19] Satria 7 Pahlawan.mkv", size: "232.33 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3036e979983cdce5a8c", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3036e979983cdce5a8c", share: "https://t.me/DaRyzS_bot?start=file_6accb3036e979983cdce5a8c" },
        { ep: 20, name: "[EP.20] Satria 7 Pahlawan.mkv", size: "256.48 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3036e979983cdce5a8d", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3036e979983cdce5a8d", share: "https://t.me/DaRyzS_bot?start=file_6accb3036e979983cdce5a8d" },
        { ep: 21, name: "[EP.21] Satria 7 Pahlawan.mkv", size: "329.47 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3096e979983cdce5a8e", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3096e979983cdce5a8e", share: "https://t.me/DaRyzS_bot?start=file_6accb3096e979983cdce5a8e" },
        { ep: 22, name: "[EP.22] Satria 7 Pahlawan.mkv", size: "301.08 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3096e979983cdce5a8f", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3096e979983cdce5a8f", share: "https://t.me/DaRyzS_bot?start=file_6accb3096e979983cdce5a8f" },
        { ep: 23, name: "[EP.23] Satria 7 Pahlawan.mkv", size: "328.67 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3096e979983cdce5a90", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3096e979983cdce5a90", share: "https://t.me/DaRyzS_bot?start=file_6accb3096e979983cdce5a90" },
        { ep: 24, name: "[EP.24] Satria 7 Pahlawan.mkv", size: "289.97 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb30e6e979983cdce5a91", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb30e6e979983cdce5a91", share: "https://t.me/DaRyzS_bot?start=file_6accb30e6e979983cdce5a91" },
        { ep: 25, name: "[EP.25] Satria 7 Pahlawan.mkv", size: "303.62 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb30e6e979983cdce5a92", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb30e6e979983cdce5a92", share: "https://t.me/DaRyzS_bot?start=file_6accb30e6e979983cdce5a92" },
        { ep: 26, name: "[EP.26] Satria 7 Pahlawan.mkv", size: "307.26 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb33a6e979983cdce5a93", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb33a6e979983cdce5a93", share: "https://t.me/DaRyzS_bot?start=file_6accb33a6e979983cdce5a93" }
      ]
    }
  },

  movies: {
    doraemonMovies: [
      { name: "Doraemon The Record of Nobita's Parallel Visit to the West (1988)", size: "876.89 MiB", poster: "https://i.postimg.cc/K8McK6Wz/D1.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a66", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accab1d6e979983cdce5a66" },
      { name: "Doraemon The Movie Nobita's Treasure Island (2018) Malay Dubbed", size: "932.35 MiB", poster: "https://i.postimg.cc/cJGxfDqT/D2.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a68", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accab1d6e979983cdce5a68" },
      { name: "Doraemon The Movie Great Adventure in The Antarctic Kachi Kochi (2017)", size: "856.91 MiB", poster: "https://i.postimg.cc/L814qcbG/D3.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a67", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accab1d6e979983cdce5a67" },
      { name: "Doraemon 2003 Nobita", size: "520.27 MiB", poster: "https://i.postimg.cc/SKLydWkb/D4.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a65", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accab1d6e979983cdce5a65" },
      { name: "Doraemon Stand By Me (2014) Malay Dubbed", size: "723.5 MiB", poster: "https://i.postimg.cc/tCfC4q2W/D5.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a69", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accab1d6e979983cdce5a69" },
      { name: "Doraemon 2017 - Malay Dub - Benua Antartika", size: "1.21 GiB", poster: "https://i.postimg.cc/9FSFQmJy/D6.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a6a", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accab1d6e979983cdce5a6a" },
      { name: "Doraemon Nobita and the Steel Troops (1986)", size: "700.17 MiB", poster: "https://i.postimg.cc/QxVdD9kK/D7.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab256e979983cdce5a6c", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accab256e979983cdce5a6c" },
      { name: "Doraemon Nobita in the Robot Kingdom (2002) Malay Dubbed", size: "571.94 MiB", poster: "https://i.postimg.cc/YqjC7Gfh/D8.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab256e979983cdce5a6d", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accab256e979983cdce5a6d" },
      { name: "Doraemon Nobita and the Haunts of Evil (1982) Malay Dubbed", size: "1.36 GiB", poster: "https://i.postimg.cc/yYW8KgXX/D9.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab256e979983cdce5a6b", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accab256e979983cdce5a6b" },
      { name: "Doraemon Nobita and the Castle of the Undersea Devil (1983)", size: "815.36 MiB", poster: "https://i.postimg.cc/3wjK1g71/D10.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab256e979983cdce5a6e", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accab256e979983cdce5a6e" },
      { name: "Doraemon the Movie Nobita and the Birth of Japan (2016)", size: "803.43 MiB", poster: "https://i.postimg.cc/8kZzxBWS/D11.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab2b6e979983cdce5a70", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accab2b6e979983cdce5a70" },
      { name: "Doraemon Nobita in the Wan Nyan Spacetime Odyssey (2004)", size: "719.03 MiB", poster: "https://i.postimg.cc/FFTHwgSq/D12.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab2a6e979983cdce5a6f", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accab2a6e979983cdce5a6f" },
      { name: "Doraemon the Movie Nobita's Dinosaur (2006)", size: "1.82 GiB", poster: "https://i.postimg.cc/90gXTCVq/D14.webp", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab306e979983cdce5a72", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accab306e979983cdce5a72" },
      { name: "Doraemon Nobita and Secret Gadget Museum (2013)", size: "1.78 GiB", poster: "https://i.postimg.cc/4yfjzS1C/Doraemon-The-Movie-Nobita-and-Secret-Gadget-Museum.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5fa6e979983cdce5ac4", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb5fa6e979983cdce5ac4" },
      { name: "Doraemon The Movie Nobita & The Space Heroes (2015)", size: "1.71 GiB", poster: "https://i.postimg.cc/j2xBzF4Z/Doraemon-The-Movie-Nobita-The-Space-Heroes.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb6076e979983cdce5ac5", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb6076e979983cdce5ac5" },
      { name: "Doraemon New Record of Nobita's Spaceblazer (2009)", size: "1.75 GiB", poster: "https://i.postimg.cc/wMqnhGQF/Doraemon-The-Movie-New-Record-of-Nobita-Spaceblazer.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb6136e979983cdce5ac6", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb6136e979983cdce5ac6" },
      { name: "Stand by Me Doraemon 2 (2020)", size: "1.01 GiB", poster: "https://i.postimg.cc/WzNxMHw8/Doraemon-Stand-By-Me-2.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb6196e979983cdce5ac7", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb6196e979983cdce5ac7" }
    ],
    narutoMovies: [
      { name: "Naruto Movie 3 - Guardians of the Crescent Moon Kingdom", size: "429.68 MiB", poster: "https://i.postimg.cc/qvRm0kWy/Naruto-The-Movie-3-Guardians-of-the-Crescent-Moon-Kingdom-(Malay-Dub).jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accaf986e979983cdce5a74", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accaf986e979983cdce5a74" },
      { name: "Naruto the Movie - Legend of the Stone of Gelel", size: "308.59 MiB", poster: "https://i.postimg.cc/7Z6BDxj2/Naruto-the-Movie-Legend-of-the-Stone-of-Gelel.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accaf986e979983cdce5a75", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accaf986e979983cdce5a75" },
      { name: "Naruto the Movie - Ninja Clash in the Land of Snow", size: "189.57 MiB", poster: "https://i.postimg.cc/SxsZqyH8/Naruto-the-Movie-Ninja-Clash-in-the-Land-of-Snow.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accaf986e979983cdce5a73", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accaf986e979983cdce5a73" }
    ],
    dragonBallMovies: [
      { name: "Mutiara Naga Movie 04 - The Path to Power (1996)", size: "262.7 MiB", poster: "https://i.postimg.cc/mDWZ4mZv/Dragon-Ball-The-Way-to-the-Strongest.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb1486e979983cdce5a77", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb1486e979983cdce5a77" },
      { name: "Dragon Ball Sleeping Princess in Devil's Castle", size: "473.93 MiB", poster: "https://i.postimg.cc/DzKPXKx0/Dragon-Ball-Sleeping-Princess-in-Devil-s-Castle.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb1486e979983cdce5a78", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb1486e979983cdce5a78" },
      { name: "Dragon Ball Legend of Shenron (Malay)", size: "468.53 MiB", poster: "https://i.postimg.cc/q7dx3d1R/Dragon-Ball-The-Way-to-the-Strongest.jpg", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb1486e979983cdce5a79", watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb1486e979983cdce5a79" }
    ],
    chibiMarukoChan: {
      name: "Chibi Maruko Chan Ono and Sugiyama (1990)",
      size: "1.06 GiB",
      poster: "https://i.postimg.cc/ZnmB5THS/c1.jpg",
      dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accafdb6e979983cdce5a76",
      watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accafdb6e979983cdce5a76"
    }
  },

  otherShows: {
    timeBokan24: {
      title: "Time Bokan 24",
      poster: "https://i.postimg.cc/YCyfdWrV/Time-Bokan.jpg",
      episodes: [
        { ep: 1, name: "Time Bokan 24 - Episode 01.zip", size: "288.14 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5ab0" },
        { ep: 2, name: "Time Bokan 24 - Episode 02.zip", size: "227.0 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5aad" },
        { ep: 3, name: "Time Bokan 24 - Episode 03.zip", size: "177.35 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5ab1" },
        { ep: 4, name: "Time Bokan 24 - Episode 04.zip", size: "215.45 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5aae" },
        { ep: 5, name: "Time Bokan 24 - Episode 05.zip", size: "181.75 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5ab2" },
        { ep: 6, name: "Time Bokan 24 - Episode 06.zip", size: "180.3 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5aaf" },
        { ep: 7, name: "Time Bokan 24 - Episode 07.zip", size: "171.04 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5226e979983cdce5ab3" },
        { ep: 8, name: "Time Bokan 24 - Episode 08.zip", size: "178.3 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5246e979983cdce5ab4" },
        { ep: 9, name: "Time Bokan 24 - Episode 09.zip", size: "262.95 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5246e979983cdce5ab5" },
        { ep: 10, name: "Time Bokan 24 - Episode 10.zip", size: "230.41 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5246e979983cdce5ab6" },
        { ep: 12, name: "Time Bokan 24 - Episode 12.zip", size: "159.79 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5276e979983cdce5ab7" },
        { ep: 13, name: "Time Bokan 24 - Episode 13.zip", size: "245.07 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5276e979983cdce5ab8" },
        { ep: 14, name: "Time Bokan 24 - Episode 14.zip", size: "181.69 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb52d6e979983cdce5ab9" },
        { ep: 15, name: "Time Bokan 24 - Episode 15.zip", size: "267.15 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb52d6e979983cdce5aba" },
        { ep: 16, name: "Time Bokan 24 - Episode 16.zip", size: "252.0 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb52d6e979983cdce5abb" },
        { ep: 17, name: "Time Bokan 24 - Episode 17.zip", size: "226.05 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb52d6e979983cdce5abc" },
        { ep: 18, name: "Time Bokan 24 - Episode 18.zip", size: "189.58 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb55d6e979983cdce5abd" },
        { ep: 19, name: "Time Bokan 24 - Episode 19.zip", size: "156.76 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb55d6e979983cdce5abe" },
        { ep: 20, name: "Time Bokan 24 - Episode 20.zip", size: "172.37 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb55d6e979983cdce5abf" },
        { ep: 21, name: "Time Bokan 24 - Episode 21.zip", size: "144.89 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb55d6e979983cdce5ac0" },
        { ep: 22, name: "Time Bokan 24 - Episode 22.zip", size: "162.93 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5636e979983cdce5ac1" },
        { ep: 23, name: "Time Bokan 24 - Episode 23.zip", size: "166.16 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5636e979983cdce5ac2" },
        { ep: 24, name: "Time Bokan 24 - Episode 24 Akhir.zip", size: "186.09 MiB", dl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5686e979983cdce5ac3" }
      ]
    },
    runningMan: {
      category: "Variety Show",
      note: "Koleksi Running Man (rujukan siri penuh sehingga episod terkini yang telah anda setkan ke pangkalan data bot Telegram anda)"
    },
    ustazWadi: {
      category: "Ceramah Agama",
      note: "Koleksi ceramah pilihan Ustaz Wadi Annuar"
    }
  }
};

// Naruto Episodes Array (Ep 1 - 220)
const narutoEpisodes = [
  { episode: 1, title: "Naruto_episode1.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97d56e979983cdce58b1" },
  { episode: 2, title: "Nt Episod 002.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97d56e979983cdce58af" },
  { episode: 3, title: "Nt Episod 003.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97d56e979983cdce58b0" },
  { episode: 4, title: "Nt Episod 004.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97d56e979983cdce58ad" },
  { episode: 5, title: "Nt Episod 005.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97d56e979983cdce58ae" },
  { episode: 6, title: "Nt Episod 006.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97d56e979983cdce58ac" },
  { episode: 7, title: "Nt Episod 007.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97de6e979983cdce58b2" },
  { episode: 8, title: "Nt Episod 008.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97de6e979983cdce58b4" },
  { episode: 9, title: "Nt Episod 009.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97de6e979983cdce58b3" },
  { episode: 10, title: "Nt Episod 010.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97de6e979983cdce58b5" },
  { episode: 11, title: "Nt Episod 011.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97e46e979983cdce58b6" },
  { episode: 12, title: "Nt Episod 012.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97e96e979983cdce58b7" },
  { episode: 13, title: "Nt Episod 013.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97e96e979983cdce58b8" },
  { episode: 14, title: "Nt Episod 014.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97e96e979983cdce58b9" },
  { episode: 15, title: "Nt Episod 015.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97e96e979983cdce58ba" },
  { episode: 16, title: "Nt Episod 016.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97e96e979983cdce58bb" },
  { episode: 17, title: "Nt Episod 017.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc981a6e979983cdce58bc" },
  { episode: 18, title: "Nt Episod 018.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc981a6e979983cdce58bd" },
  { episode: 19, title: "Nt Episod 019.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc981a6e979983cdce58be" },
  { episode: 20, title: "Nt Episod 020.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc981a6e979983cdce58bf" },
  { episode: 21, title: "Nt Episod 021.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc981f6e979983cdce58c0" },
  { episode: 22, title: "Nt Episod 022.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc981f6e979983cdce58c1" },
  { episode: 23, title: "Nt Episod 023.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98246e979983cdce58c2" },
  { episode: 24, title: "Nt Episod 024.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98256e979983cdce58c3" },
  { episode: 25, title: "Nt Episod 025.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98266e979983cdce58c4" },
  { episode: 26, title: "Nt Episod 026.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98516e979983cdce58c5" },
  { episode: 27, title: "Nt Episod 027.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98576e979983cdce58c6" },
  { episode: 28, title: "Nt Episod 028.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98576e979983cdce58c7" },
  { episode: 29, title: "Nt Episod 029.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98586e979983cdce58c8" },
  { episode: 30, title: "Nt Episod 030.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc985c6e979983cdce58c9" },
  { episode: 31, title: "Nt Episod 031.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc985d6e979983cdce58ca" },
  { episode: 32, title: "Nt Episod 032.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc985d6e979983cdce58cb" },
  { episode: 33, title: "Nt Episod 033.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98626e979983cdce58cc" },
  { episode: 34, title: "Nt Episod 034.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98626e979983cdce58cd" },
  { episode: 35, title: "Nt Episod 035.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc988d6e979983cdce58ce" },
  { episode: 36, title: "Nt Episod 036.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc988d6e979983cdce58cf" },
  { episode: 37, title: "Nt Episod 037.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98916e979983cdce58d0" },
  { episode: 38, title: "Nt Episod 038.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98936e979983cdce58d1" },
  { episode: 39, title: "Nt Episod 039.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98966e979983cdce58d2" },
  { episode: 40, title: "Nt Episod 040.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98966e979983cdce58d3" },
  { episode: 41, title: "Nt Episod 041.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98976e979983cdce58d4" },
  { episode: 42, title: "Nt Episod 042.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc989c6e979983cdce58d5" },
  { episode: 43, title: "Nt Episod 043.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc989c6e979983cdce58d6" },
  { episode: 44, title: "Nt Episod 044.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98a26e979983cdce58d8" },
  { episode: 45, title: "Nt Episod 045.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98a26e979983cdce58d7" },
  { episode: 46, title: "Nt Episod 046.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98c96e979983cdce58d9" },
  { episode: 47, title: "Nt Episod 047.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98c96e979983cdce58da" },
  { episode: 48, title: "Nt Episod 048.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98ca6e979983cdce58db" },
  { episode: 49, title: "Nt Episod 049.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98ce6e979983cdce58dc" },
  { episode: 50, title: "Nt Episod 050.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98cf6e979983cdce58dd" },
  { episode: 51, title: "Nt Episod 051.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98d46e979983cdce58de" },
  { episode: 52, title: "Nt Episod 052.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98d56e979983cdce58df" },
  { episode: 53, title: "Nt Episod 053.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98d96e979983cdce58e0" },
  { episode: 54, title: "Nt Episod 054.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98da6e979983cdce58e1" },
  { episode: 55, title: "Nt Episod 055.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98da6e979983cdce58e2" },
  { episode: 56, title: "Nt Episod 056.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99056e979983cdce58e3" },
  { episode: 57, title: "Nt Episod 057.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99066e979983cdce58e4" },
  { episode: 58, title: "Nt Episod 058.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc990c6e979983cdce58e5" },
  { episode: 59, title: "Nt Episod 059.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc990c6e979983cdce58e6" },
  { episode: 60, title: "Nt Episod 060.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc990d6e979983cdce58e7" },
  { episode: 61, title: "Nt Episod 061.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99116e979983cdce58e8" },
  { episode: 62, title: "Nt Episod 062.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99116e979983cdce58e9" },
  { episode: 63, title: "Nt Episod 063.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99116e979983cdce58ea" },
  { episode: 64, title: "Nt Episod 064.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99186e979983cdce58eb" },
  { episode: 65, title: "Nt Episod 065.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99186e979983cdce58ec" },
  { episode: 66, title: "Nt Episod 066.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99476e979983cdce58ed" },
  { episode: 67, title: "Nt Episod 067.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc994c6e979983cdce58ee" },
  { episode: 68, title: "Nt Episod 068.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc994c6e979983cdce58ef" },
  { episode: 69, title: "Nt Episod 069.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc994c6e979983cdce58f0" },
  { episode: 70, title: "Nt Episod 070.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc994c6e979983cdce58f1" },
  { episode: 71, title: "Nt Episod 071.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc994d6e979983cdce58f2" },
  { episode: 72, title: "Nt Episod 072.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99516e979983cdce58f3" },
  { episode: 73, title: "Nt Episod 073.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99566e979983cdce58f4" },
  { episode: 74, title: "Nt Episod 074.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99566e979983cdce58f5" },
  { episode: 75, title: "Nt Episod 075.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99566e979983cdce58f6" },
  { episode: 76, title: "Nt Episod 076.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99576e979983cdce58f7" },
  { episode: 77, title: "Nt Episod 077.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc998b6e979983cdce58f8" },
  { episode: 78, title: "Nt Episod 078.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc998b6e979983cdce58fa" },
  { episode: 79, title: "Nt Episod 079.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc998b6e979983cdce58f9" },
  { episode: 80, title: "Nt Episod 080.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc998b6e979983cdce58fb" },
  { episode: 81, title: "Nt Episod 081.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99916e979983cdce58fc" },
  { episode: 82, title: "Nt Episod 082.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99916e979983cdce58fd" },
  { episode: 83, title: "Nt Episod 083.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99966e979983cdce58fe" },
  { episode: 84, title: "Nt Episod 084.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99966e979983cdce58ff" },
  { episode: 85, title: "Nt Episod 085.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99976e979983cdce5900" },
  { episode: 86, title: "Nt Episod 086.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99c46e979983cdce5901" },
  { episode: 87, title: "Nt Episod 087.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99c96e979983cdce5902" },
  { episode: 88, title: "Nt Episod 088.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99c96e979983cdce5903" },
  { episode: 89, title: "Nt Episod 089.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99ca6e979983cdce5904" },
  { episode: 90, title: "Nt Episod 090.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99cb6e979983cdce5905" },
  { episode: 91, title: "Nt Episod 091.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99cf6e979983cdce5906" },
  { episode: 92, title: "Nt Episod 092.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99cf6e979983cdce5907" },
  { episode: 93, title: "Nt Episod 093.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99cf6e979983cdce5908" },
  { episode: 94, title: "Nt Episod 094.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99d46e979983cdce5909" },
  { episode: 95, title: "Nt Episod 095.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99d56e979983cdce590a" },
  { episode: 96, title: "Nt Episod 096.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99d56e979983cdce590b" },
  { episode: 97, title: "Nt Episod 097.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a006e979983cdce590c" },
  { episode: 98, title: "Nt Episod 098.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a056e979983cdce590d" },
  { episode: 99, title: "Nt Episod 099.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a076e979983cdce590e" },
  { episode: 100, title: "Nt Episod 100.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a086e979983cdce590f" },
  { episode: 101, title: "Nt Episod 101.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a0b6e979983cdce5910" },
  { episode: 102, title: "Nt Episod 102.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a0b6e979983cdce5911" },
  { episode: 103, title: "Nt Episod 103.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a106e979983cdce5912" },
  { episode: 104, title: "Nt Episod 104.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a106e979983cdce5913" },
  { episode: 105, title: "Nt Episod 105.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a116e979983cdce5914" },
  { episode: 106, title: "Nt Episod 106.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a3c6e979983cdce5915" },
  { episode: 107, title: "Nt Episod 107.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a3c6e979983cdce5916" },
  { episode: 108, title: "Nt Episod 108.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a416e979983cdce5917" },
  { episode: 109, title: "Nt Episod 109.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a426e979983cdce5918" },
  { episode: 110, title: "Nt Episod 110.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a436e979983cdce5919" },
  { episode: 111, title: "Nt Episod 111.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a486e979983cdce591a" },
  { episode: 112, title: "Nt Episod 112.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a486e979983cdce591b" },
  { episode: 113, title: "Nt Episod 113.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a486e979983cdce591c" },
  { episode: 114, title: "Nt Episod 114.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a4c6e979983cdce591d" },
  { episode: 115, title: "Nt Episod 115.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a4d6e979983cdce591e" },
  { episode: 116, title: "Nt Episod 116.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a4d6e979983cdce591f" },
  { episode: 117, title: "Nt Episod 117.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a7e6e979983cdce5920" },
  { episode: 118, title: "Nt Episod 118.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a836e979983cdce5922" },
  { episode: 119, title: "Nt Episod 119.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a836e979983cdce5921" },
  { episode: 120, title: "Nt Episod 120.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a836e979983cdce5923" },
  { episode: 121, title: "Nt Episod 121.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a846e979983cdce5924" },
  { episode: 122, title: "Nt Episod 122.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a886e979983cdce5925" },
  { episode: 123, title: "Nt Episod 123.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a886e979983cdce5926" },
  { episode: 124, title: "Nt Episod 124.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a8d6e979983cdce5927" },
  { episode: 125, title: "Nt Episod 125.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a8e6e979983cdce5929" },
  { episode: 126, title: "Nt Episod 126.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a8d6e979983cdce5928" },
  { episode: 127, title: "Nt Episod 127.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9aba6e979983cdce592a" },
  { episode: 128, title: "Nt Episod 128.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9aba6e979983cdce592b" },
  { episode: 129, title: "Nt Episod 129.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9abb6e979983cdce592c" },
  { episode: 130, title: "Nt Episod 130.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9abf6e979983cdce592d" },
  { episode: 131, title: "Nt Episod 131.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9abf6e979983cdce592e" },
  { episode: 132, title: "Nt Episod 132.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9abf6e979983cdce592f" },
  { episode: 133, title: "Nt Episod 133.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ac66e979983cdce5930" },
  { episode: 134, title: "Nt Episod 134.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ac66e979983cdce5931" },
  { episode: 135, title: "Nt Episod 135.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9af06e979983cdce5932" },
  { episode: 136, title: "Nt Episod 136.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9af56e979983cdce5933" },
  { episode: 137, title: "Nt Episod 137.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9af56e979983cdce5934" },
  { episode: 138, title: "Nt Episod 138.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9af66e979983cdce5935" },
  { episode: 139, title: "Nt Episod 139.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9afb6e979983cdce5936" },
  { episode: 140, title: "Nt Episod 140.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9afb6e979983cdce5937" },
  { episode: 141, title: "Nt Episod 141.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9afb6e979983cdce5938" },
  { episode: 142, title: "Nt Episod 142.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b016e979983cdce5939" },
  { episode: 143, title: "Nt Episod 143.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b076e979983cdce593a" },
  { episode: 144, title: "Nt Episod 144.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b086e979983cdce593b" },
  { episode: 145, title: "Nt Episod 145.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b2d6e979983cdce593c" },
  { episode: 146, title: "Nt Episod 146.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b2d6e979983cdce593d" },
  { episode: 147, title: "Nt Episod 147.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b2d6e979983cdce593f" },
  { episode: 148, title: "Nt Episod 148.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b2d6e979983cdce593e" },
  { episode: 149, title: "Nt Episod 149.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b336e979983cdce5940" },
  { episode: 150, title: "Nt Episod 150.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b386e979983cdce5941" },
  { episode: 151, title: "Nt Episod 151.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b396e979983cdce5942" },
  { episode: 152, title: "Nt Episod 152.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b3a6e979983cdce5943" },
  { episode: 153, title: "Nt Episod 153.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b3d6e979983cdce5944" },
  { episode: 154, title: "Nt Episod 154.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b3e6e979983cdce5945" },
  { episode: 155, title: "Nt Episod 155.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b3e6e979983cdce5946" },
  { episode: 156, title: "Nt Episod 156.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b696e979983cdce5947" },
  { episode: 157, title: "Nt Episod 157.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b696e979983cdce5948" },
  { episode: 158, title: "Nt Episod 158.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b6f6e979983cdce5949" },
  { episode: 159, title: "Nt Episod 159.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b6f6e979983cdce594a" },
  { episode: 160, title: "Nt Episod 160.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b706e979983cdce594b" },
  { episode: 161, title: "Nt Episod 161.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b746e979983cdce594c" },
  { episode: 162, title: "Nt Episod 162.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b746e979983cdce594d" },
  { episode: 163, title: "Nt Episod 163.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b746e979983cdce594e" },
  { episode: 164, title: "Nt Episod 164.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b7a6e979983cdce594f" },
  { episode: 165, title: "Nt Episod 165.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ba96e979983cdce5950" },
  { episode: 166, title: "Nt Episod 166.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bab6e979983cdce5951" },
  { episode: 167, title: "Nt Episod 167.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bab6e979983cdce5952" },
  { episode: 168, title: "Nt Episod 168.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bab6e979983cdce5953" },
  { episode: 169, title: "Nt Episod 169.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bae6e979983cdce5954" },
  { episode: 170, title: "Nt Episod 170.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9baf6e979983cdce5956" },
  { episode: 171, title: "Nt Episod 171.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9baf6e979983cdce5955" },
  { episode: 172, title: "Nt Episod 172.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bb46e979983cdce5957" },
  { episode: 173, title: "Nt Episod 173.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bb46e979983cdce5959" },
  { episode: 174, title: "Nt Episod 174.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bb46e979983cdce5958" },
  { episode: 175, title: "Nt Episod 175.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bba6e979983cdce595a" },
  { episode: 176, title: "Nt Episod 176.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9be26e979983cdce595c" },
  { episode: 177, title: "Nt Episod 177.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9be16e979983cdce595b" },
  { episode: 178, title: "Nt Episod 178.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9be76e979983cdce595d" },
  { episode: 179, title: "Nt Episod 179.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9be86e979983cdce595e" },
  { episode: 180, title: "Nt Episod 180.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9be86e979983cdce595f" },
  { episode: 181, title: "Nt Episod 181.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bed6e979983cdce5960" },
  { episode: 182, title: "Nt Episod 182.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bed6e979983cdce5961" },
  { episode: 183, title: "Nt Episod 183.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bed6e979983cdce5962" },
  { episode: 184, title: "Nt Episod 184.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bf26e979983cdce5963" },
  { episode: 185, title: "Nt Episod 185.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bf26e979983cdce5964" },
  { episode: 186, title: "Nt Episod 186.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bf36e979983cdce5965" },
  { episode: 187, title: "Nt Episod 187.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c1d6e979983cdce5966" },
  { episode: 188, title: "Nt Episod 188.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c236e979983cdce5967" },
  { episode: 189, title: "Nt Episod 189.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c236e979983cdce5968" },
  { episode: 190, title: "Nt Episod 190.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c236e979983cdce5969" },
  { episode: 191, title: "Nt Episod 191.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c296e979983cdce596a" },
  { episode: 192, title: "Nt Episod 192.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c2f6e979983cdce596b" },
  { episode: 193, title: "Nt Episod 193.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c306e979983cdce596c" },
  { episode: 194, title: "Nt Episod 194.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c346e979983cdce596d" },
  { episode: 195, title: "Nt Episod 195.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c356e979983cdce596e" },
  { episode: 196, title: "Nt Episod 196.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c596e979983cdce596f" },
  { episode: 197, title: "Nt Episod 197.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c5e6e979983cdce5970" },
  { episode: 198, title: "Nt Episod 198.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c5e6e979983cdce5971" },
  { episode: 199, title: "Nt Episod 199.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c5e6e979983cdce5972" },
  { episode: 200, title: "Nt Episod 200.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c5e6e979983cdce5973" },
  { episode: 201, title: "Nt Episod 201.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c646e979983cdce5974" },
  { episode: 202, title: "Nt Episod 202.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c646e979983cdce5975" },
  { episode: 203, title: "Nt Episod 203.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c696e979983cdce5976" },
  { episode: 204, title: "Nt Episod 204.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c696e979983cdce5977" },
  { episode: 205, title: "Nt Episod 205.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c956e979983cdce5978" },
  { episode: 206, title: "Nt Episod 206.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c9c6e979983cdce5979" },
  { episode: 207, title: "Nt Episod 207.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c9c6e979983cdce597a" },
  { episode: 208, title: "Nt Episod 208.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ca16e979983cdce597b" },
  { episode: 209, title: "Nt Episod 209.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ca26e979983cdce597c" },
  { episode: 210, title: "Nt Episod 210.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ca26e979983cdce597d" },
  { episode: 211, title: "Nt Episod 211.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ca66e979983cdce597f" },
  { episode: 212, title: "Nt Episod 212.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ca66e979983cdce597e" },
  { episode: 213, title: "Nt Episod 213.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ca76e979983cdce5980" },
  { episode: 214, title: "Nt Episod 214.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ca76e979983cdce5981" },
  { episode: 215, title: "Nt Episod 215.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9cad6e979983cdce5982" },
  { episode: 216, title: "Nt Episod 216.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9cd66e979983cdce5983" },
  { episode: 217, title: "Nt Episod 217.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9cd66e979983cdce5984" },
  { episode: 218, title: "Nt Episod 218.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9cd76e979983cdce5985" },
  { episode: 219, title: "Nt Episod 219.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9cdb6e979983cdce5986" },
  { episode: 220, title: "Nt Episod 220.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9cdc6e979983cdce5987" }
];

// Black Clover Episodes Array
const blackCloverEpisodes = [
  { episode: 1, title: "Black Clover Episode 1", url: "https://teraboxshare.com/s/1MnkiGCWy207764ewaAUeFw" },
  { episode: 2, title: "Black Clover Episode 2", url: "https://teraboxshare.com/s/1MnkiGCWy207764ewaAUeFw" },
  { episode: 3, title: "Black Clover Episode 3", url: "https://teraboxshare.com/s/15_tVldY5cV2ZHnPaKU4gEA" }
];

// ==========================================
// STREMIO ADDON MANIFEST & DATABASE
// ==========================================
const manifest = {
  id: "org.ryzstream.collection",
  version: "4.2.0",
  name: "DaRyz Collection Addon",
  description: "Addon Stremio/Nuvio dengan katalog siri, ceramah, anime, dan filem tersusun.",
  resources: ["catalog", "stream", "meta"],
  types: ["series"],
  idPrefixes: [
    "naruto_series", "blackclover_series", "kisah_sahabat_series", "running_man_series", 
    "mm_", "mahsyar_series", "filem_dakwah_sengketa_series", "hagemaru_series", 
    "ninja_boy_series", "doraemon_series"
  ],
  catalogs: [
    { type: "series", id: "naruto_catalog", name: "Naruto" },
    { type: "series", id: "blackclover_catalog", name: "Black Clover" },
    { type: "series", id: "running_man_catalog", name: "Runningman" },
    { type: "series", id: "kisah_sahabat_catalog", name: "Kisah Para Sahabat Nabi" },
    { type: "series", id: "malaysian_movies_catalog", name: "Malaysian Movies" },
    { type: "series", id: "mahsyar_catalog", name: "Mahsyar" },
    { type: "series", id: "filem_dakwah_sengketa_catalog", name: "Filem Dakwah - Sengketa" },
    { type: "series", id: "hagemaru_catalog", name: "Hagemaru" },
    { type: "series", id: "ninja_boy_catalog", name: "Ninja Boy" },
    { type: "series", id: "doraemon_catalog", name: "Doraemon" }
  ]
};

const seriesDatabase = {
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
      { title: "Episod 5: Gwacheon National Science Museum, Part 2", description: "Continuing from episode 4.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc001a6e979983cdce5563" }
    ])
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
      { title: "Penjaga Rahsia Rasulullah (Bahagian 2)", url: "https://files.catbox.moe/sf21kq.mp4" }
    ])
  },
  "malaysian_movies_catalog": {
    id: "malaysian_movies_catalog",
    isMulti: true,
    items: [
      { id: "mm_congkak", name: "Congkak", poster: "https://i.postimg.cc/PxxN1gWN/congkak.jpg", description: "Filem Congkak", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbf8f16e979983cdce554e" },
      { id: "mm_damping_malam", name: "Damping Malam", poster: "https://i.postimg.cc/rsn7tvjT/Damping-Malam.jpg", description: "Filem Damping Malam", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbf8f36e979983cdce5550" },
      { id: "mm_dorm_melati", name: "Dorm Melati", poster: "https://i.postimg.cc/7hh7YCsm/dormmelati.jpg", description: "Filem Dorm Melati", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbf8f26e979983cdce54f" },
      { id: "mm_munafik", name: "Munafik", poster: "https://i.postimg.cc/d3fC7qgF/munafik.jpg", description: "Filem Munafik", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc06936e979983cdce55cb" }
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
      { title: "Mahsyar 2 - Berselisih Dengan Ahli Keluarga, Tidak Bertegur", url: "https://files.catbox.moe/5mgrcm.mp4" }
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
      "https://files.catbox.moe/eufzjd.mp4", "https://files.catbox.moe/gujt6g.mp4"
    ])
  },
  "doraemon_catalog": {
    id: "doraemon_series",
    catalogId: "doraemon_catalog",
    name: "Doraemon",
    poster: "https://i.postimg.cc/XYbMDSrm/Doraemon.jpg",
    description: "Koleksi Episod Doraemon Bahasa Melayu.",
    episodes: createEpisodes([
      "https://files.catbox.moe/oycp0l.mp4", "https://files.catbox.moe/y2jnzp.mp4"
    ])
  }
};

// ==========================================
// API ENDPOINTS & ROUTES
// ==========================================

// Endpoint: Root
app.get('/', (req, res) => {
  res.json({ message: "DaRyz Collection API Server is running!", catalog: Object.keys(seriesDatabase) });
});

// Endpoint: Raw Media Library
app.get('/media-library', (req, res) => {
  res.json(mediaLibrary);
});

// Endpoint: Manifest Add-on
app.get('/manifest.json', (req, res) => {
  res.json(manifest);
});

// Endpoint: Catalog
app.get('/catalog/:type/:id.json', (req, res) => {
  const cat = seriesDatabase[req.params.id];
  if (!cat) {
    return res.json({ metas: [] });
  }

  if (cat.isMulti) {
    const metas = cat.items.map(item => ({
      id: item.id,
      type: 'series',
      name: item.name,
      poster: item.poster,
      description: item.description
    }));
    return res.json({ metas });
  } else {
    return res.json({
      metas: [{
        id: cat.id,
        type: 'series',
        name: cat.name,
        poster: cat.poster,
        description: cat.description
      }]
    });
  }
});

// Endpoint: Meta
app.get('/meta/:type/:id.json', (req, res) => {
  const id = req.params.id;

  if (id === 'naruto_series') {
    return res.json({
      meta: {
        id: 'naruto_series',
        type: 'series',
        name: 'Naruto',
        poster: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
        background: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
        description: 'Naruto Uzumaki is an adolescent ninja who searches for recognition and dreams of becoming the Hokage.',
        genres: ['Anime', 'Action', 'Adventure']
      }
    });
  }

  if (id === 'blackclover_series') {
    return res.json({
      meta: {
        id: 'blackclover_series',
        type: 'series',
        name: 'Black Clover',
        poster: 'https://i.postimg.cc/FRX3YtV9/BC.webp',
        background: 'https://i.postimg.cc/FRX3YtV9/BC.webp',
        description: 'Asta and Yuno were abandoned at the same church and raised together, sharing a lifelong rivalry and dream.',
        genres: ['Anime', 'Action', 'Fantasy']
      }
    });
  }

  for (const key in seriesDatabase) {
    const cat = seriesDatabase[key];
    if (cat.isMulti) {
      const item = cat.items.find(i => i.id === id);
      if (item) {
        return res.json({
          meta: {
            id: item.id,
            type: 'series',
            name: item.name,
            poster: item.poster,
            background: item.poster,
            description: item.description
          }
        });
      }
    } else if (cat.id === id) {
      return res.json({
        meta: {
          id: cat.id,
          type: 'series',
          name: cat.name,
          poster: cat.poster,
          background: cat.poster,
          description: cat.description
        }
      });
    }
  }

  return res.status(404).json({ error: 'Meta not found' });
});

// Endpoint: Stream
app.get('/stream/:type/:id.json', (req, res) => {
  const parts = req.params.id.split(':');
  const mainId = parts[0];
  const episodeNum = parseInt(parts[2]) || 1;

  if (mainId === 'naruto_series') {
    const found = narutoEpisodes.find(e => e.episode === episodeNum);
    if (found) {
      return res.json({
        streams: [{ title: `[DaRyzStream] ${found.title}`, url: found.url }]
      });
    }
  }

  if (mainId === 'blackclover_series') {
    const found = blackCloverEpisodes.find(e => e.episode === episodeNum);
    if (found) {
      return res.json({
        streams: [{ title: `[DaRyzStream] ${found.title}`, url: found.url }]
      });
    }
  }

  for (const key in seriesDatabase) {
    const cat = seriesDatabase[key];
    if (cat.isMulti) {
      const item = cat.items.find(i => i.id === mainId);
      if (item) {
        return res.json({
          streams: [{ title: `[DaRyzStream] ${item.name}`, url: item.url }]
        });
      }
    } else if (cat.id === mainId) {
      const ep = cat.episodes.find(e => e.episode === episodeNum);
      if (ep) {
        return res.json({
          streams: [{ title: `[DaRyzStream] ${ep.title}`, url: ep.url }]
        });
      }
    }
  }

  return res.json({ streams: [] });
});

// Export Media Library
module.exports = mediaLibrary;

// Start Server
app.listen(PORT, () => {
  console.log(`DaRyz Collection Server running on port ${PORT}`);
});
