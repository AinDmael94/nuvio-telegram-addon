const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Data Katalog Media
const mediaCatalog = [
  {
    category: "Dragon Ball Movie",
    items: [
      {
        title: "Mutiara Naga Movie 04: The Path to Power (1996)",
        filename: "Mutiara_Naga_Movie_04_The_Path_to_Power_(1996).mp4",
        size: "262.7 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb1486e979983cdce5a77",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb1486e979983cdce5a77",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb1486e979983cdce5a77",
        poster: "https://i.postimg.cc/mDWZ4mZv/Dragon-Ball-The-Way-to-the-Strongest.jpg"
      },
      {
        title: "Dragon Ball: Sleeping Princess in Devil's Castle",
        filename: "dragon ball sleeping beauty.mkv",
        size: "473.93 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb1486e979983cdce5a78",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb1486e979983cdce5a78",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb1486e979983cdce5a78",
        poster: "https://i.postimg.cc/DzKPXKx0/Dragon-Ball-Sleeping-Princess-in-Devil-s-Castle.jpg"
      },
      {
        title: "Dragon Ball: Legend of Shenron (Malay Dub)",
        filename: "DRAGONBALL LEGEND OF SHENREN_MALAY.mp4",
        size: "468.53 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb1486e979983cdce5a79",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb1486e979983cdce5a79",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb1486e979983cdce5a79",
        poster: "https://i.postimg.cc/q7dx3d1R/Dragon-Ball-The-Way-to-the-Strongest.jpg"
      }
    ]
  },
  {
    category: "Satria Series",
    poster: "https://i.postimg.cc/RZbQgHSb/SATRIA.jpg",
    items: [
      {
        episode: 1,
        filename: "[EP.01] Satria 7 Pahlawan.mkv",
        size: "360.25 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7f",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2bf6e979983cdce5a7f",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2bf6e979983cdce5a7f"
      },
      {
        episode: 2,
        filename: "[EP.02] Satria 7 Pahlawan.mkv",
        size: "580.49 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7d",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2bf6e979983cdce5a7d",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2bf6e979983cdce5a7d"
      },
      {
        episode: 3,
        filename: "[EP.03] Satria 7 Pahlawan.mkv",
        size: "355.89 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7b",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2bf6e979983cdce5a7b",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2bf6e979983cdce5a7b"
      },
      {
        episode: 4,
        filename: "[EP.04] Satria 7 Pahlawan.mkv",
        size: "377.68 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7e",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2bf6e979983cdce5a7e",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2bf6e979983cdce5a7e"
      },
      {
        episode: 5,
        filename: "[EP.05] Satria 7 Pahlawan.mkv",
        size: "352.85 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7a",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2bf6e979983cdce5a7a",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2bf6e979983cdce5a7a"
      },
      {
        episode: 6,
        filename: "[EP.06] Satria 7 Pahlawan.mkv",
        size: "377.13 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7c",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2bf6e979983cdce5a7c",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2bf6e979983cdce5a7c"
      },
      {
        episode: 7,
        filename: "[EP.07] Satria 7 Pahlawan.mkv",
        size: "294.37 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2c76e979983cdce5a80",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2c76e979983cdce5a80",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2c76e979983cdce5a80"
      },
      {
        episode: 8,
        filename: "[EP.08] Satria 7 Pahlawan.mkv",
        size: "391.63 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2c76e979983cdce5a81",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2c76e979983cdce5a81",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2c76e979983cdce5a81"
      },
      {
        episode: 9,
        filename: "[EP.09] Satria 7 Pahlawan.mkv",
        size: "362.82 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2c76e979983cdce5a82",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2c76e979983cdce5a82",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2c76e979983cdce5a82"
      },
      {
        episode: 10,
        filename: "[EP.10] Satria 7 Pahlawan.mkv",
        size: "361.84 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2c76e979983cdce5a83",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2c76e979983cdce5a83",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2c76e979983cdce5a83"
      },
      {
        episode: 11,
        filename: "[EP.11] Satria 7 Pahlawan.mkv",
        size: "354.5 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2cd6e979983cdce5a84",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2cd6e979983cdce5a84",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2cd6e979983cdce5a84"
      },
      {
        episode: 12,
        filename: "[EP.12] Satria 7 Pahlawan.mkv",
        size: "346.85 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2cd6e979983cdce5a85",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2cd6e979983cdce5a85",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2cd6e979983cdce5a85"
      },
      {
        episode: 13,
        filename: "[EP.13] Satria 7 Pahlawan.mkv",
        size: "444.02 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2d26e979983cdce5a86",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2d26e979983cdce5a86",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2d26e979983cdce5a86"
      },
      {
        episode: 14,
        filename: "[EP.14] Satria 7 Pahlawan.mkv",
        size: "227.87 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2d26e979983cdce5a87",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2d26e979983cdce5a87",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2d26e979983cdce5a87"
      },
      {
        episode: 15,
        filename: "[EP.15] Satria 7 Pahlawan.mkv",
        size: "313.37 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2fe6e979983cdce5a88",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2fe6e979983cdce5a88",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2fe6e979983cdce5a88"
      },
      {
        episode: 16,
        filename: "[EP.16] Satria 7 Pahlawan.mkv",
        size: "236.71 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2fe6e979983cdce5a89",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2fe6e979983cdce5a89",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2fe6e979983cdce5a89"
      },
      {
        episode: 17,
        filename: "[EP.17] Satria 7 Pahlawan.mkv",
        size: "242.13 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2fe6e979983cdce5a8a",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2fe6e979983cdce5a8a",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2fe6e979983cdce5a8a"
      },
      {
        episode: 18,
        filename: "[EP.18] Satria 7 Pahlawan.mkv",
        size: "315.83 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2ff6e979983cdce5a8b",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb2ff6e979983cdce5a8b",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb2ff6e979983cdce5a8b"
      },
      {
        episode: 19,
        filename: "[EP.19] Satria 7 Pahlawan.mkv",
        size: "232.33 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3036e979983cdce5a8c",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3036e979983cdce5a8c",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3036e979983cdce5a8c"
      },
      {
        episode: 20,
        filename: "[EP.20] Satria 7 Pahlawan.mkv",
        size: "256.48 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3036e979983cdce5a8d",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3036e979983cdce5a8d",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3036e979983cdce5a8d"
      },
      {
        episode: 21,
        filename: "[EP.21] Satria 7 Pahlawan.mkv",
        size: "329.47 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3096e979983cdce5a8e",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3096e979983cdce5a8e",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3096e979983cdce5a8e"
      },
      {
        episode: 22,
        filename: "[EP.22] Satria 7 Pahlawan.mkv",
        size: "301.08 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3096e979983cdce5a8f",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3096e979983cdce5a8f",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3096e979983cdce5a8f"
      },
      {
        episode: 23,
        filename: "[EP.23] Satria 7 Pahlawan.mkv",
        size: "328.67 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3096e979983cdce5a90",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3096e979983cdce5a90",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3096e979983cdce5a90"
      },
      {
        episode: 24,
        filename: "[EP.24] Satria 7 Pahlawan.mkv",
        size: "289.97 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb30e6e979983cdce5a91",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb30e6e979983cdce5a91",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb30e6e979983cdce5a91"
      },
      {
        episode: 25,
        filename: "[EP.25] Satria 7 Pahlawan.mkv",
        size: "303.62 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb30e6e979983cdce5a92",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb30e6e979983cdce5a92",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb30e6e979983cdce5a92"
      },
      {
        episode: 26,
        filename: "[EP.26] Satria 7 Pahlawan.mkv",
        size: "307.26 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb33a6e979983cdce5a93",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb33a6e979983cdce5a93",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb33a6e979983cdce5a93"
      }
    ]
  },
  {
    category: "Gundam Build Fighter Series",
    poster: "https://i.postimg.cc/HkP46yYN/Gundam-Build-Fighter.jpg",
    items: [
      {
        episode: 1,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_1_Sei_dan_Renji_Malay_dub_480p.mp4",
        size: "99.75 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a96",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb38a6e979983cdce5a96",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb38a6e979983cdce5a96"
      },
      {
        episode: 2,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_2_Comet_Lembayung_Malay_dub_",
        size: "95.08 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a94",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb38a6e979983cdce5a94",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb38a6e979983cdce5a94"
      },
      {
        episode: 3,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_3_Pakej_Penuh_Malay_dub_480p.mp4",
        size: "90.21 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a95",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb38a6e979983cdce5a95",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb38a6e979983cdce5a95"
      },
      {
        episode: 4,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_4_Gunpla_Pujaan_Kirara☆_Malay.mp4",
        size: "94.97 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a98",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb38a6e979983cdce5a98",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb38a6e979983cdce5a98"
      },
      {
        episode: 5,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_5_Pembina_Kuat_Malay_dub_480p.mp4",
        size: "91.21 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a99",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb38a6e979983cdce5a99",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb38a6e979983cdce5a99"
      },
      {
        episode: 6,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_6_Satu_alasan_pertempuran_Malay_dub.mp4",
        size: "97.58 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a97",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb38a6e979983cdce5a97",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb38a6e979983cdce5a97"
      },
      {
        episode: 7,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_7_keupayaan_Tahap_Dunia_Malay_dub.mp4",
        size: "89.16 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3926e979983cdce5a9a",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3926e979983cdce5a9a",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3926e979983cdce5a9a"
      },
      {
        episode: 8,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_8_Pertemuan_pejuang_Malay_dub_480p.mp4",
        size: "103.4 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3926e979983cdce5a9c",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3926e979983cdce5a9c",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3926e979983cdce5a9c"
      },
      {
        episode: 9,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_9_sayap_imaginasi_Malay_dub_480p.mp4",
        size: "94.19 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3926e979983cdce5a9b",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3926e979983cdce5a9b",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3926e979983cdce5a9b"
      },
      {
        episode: 10,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_10_Permulaan_Kejohanan_Dunia_Malay.mp4",
        size: "92.42 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3926e979983cdce5a9d",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3926e979983cdce5a9d",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3926e979983cdce5a9"
      },
      {
        episode: 11,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_11_Pertempuran_Diraja_Malay_dub_480p.mp4",
        size: "112.83 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3986e979983cdce5a9e",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3986e979983cdce5a9e",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3986e979983cdce5a9e"
      },
      {
        episode: 12,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_12_Pelepasan_Malay_dub_480p.mp4",
        size: "99.99 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3986e979983cdce5a9f",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3986e979983cdce5a9f",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3986e979983cdce5a9f"
      },
      {
        episode: 13,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_13_Senjata_Pertempuran_Malay_dub_480p.mp4",
        size: "100.56 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb39d6e979983cdce5aa0",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb39d6e979983cdce5aa0",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb39d6e979983cdce5aa0"
      },
      {
        episode: 14,
        filename: "GUNDAM_BUILD_FIGHTERS-Episode_14__Name_Kod__Malay_dub_(480p).mp4",
        size: "106.87 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb39d6e979983cdce5aa1",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb39d6e979983cdce5aa1",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb39d6e979983cdce5aa1"
      },
      {
        episode: 15,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_15_Seri_Pejuang_Malay_dub_480p.mp4",
        size: "99.24 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb39d6e979983cdce5aa2",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb39d6e979983cdce5aa2",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb39d6e979983cdce5aa2"
      },
      {
        episode: 16,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_16_Bapa%2C_kita_berjumpa_lagi_Malay.mp4",
        size: "87.41 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb39d6e979983cdce5aa3",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb39d6e979983cdce5aa3",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb39d6e979983cdce5aa3"
      },
      {
        episode: 17,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_17_Model_Jantung_Malay_dub_480p.mp4",
        size: "104.12 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3c96e979983cdce5aa4",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3c96e979983cdce5aa4",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3c96e979983cdce5aa4"
      },
      {
        episode: 18,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_18_Anjinig_Pemburu_Malay_dub_480p.mp4",
        size: "97.79 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3ce6e979983cdce5aa5",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3ce6e979983cdce5aa5",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3ce6e979983cdce5aa5"
      },
      {
        episode: 19,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_19_Pisau_Astray_Malay_dub_480p.mp4",
        size: "96.85 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3ce6e979983cdce5aa6",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3ce6e979983cdce5aa6",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3ce6e979983cdce5aa6"
      },
      {
        episode: 20,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_20_Pengkhianatan_Aila_Malay_dub_480p.mp4",
        size: "106.36 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3ce6e979983cdce5aa7",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3ce6e979983cdce5aa7",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3ce6e979983cdce5aa7"
      },
      {
        episode: 21,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_21_Di_Tengah_Tengah_Glittering_Zarah.mp4",
        size: "95.29 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3d46e979983cdce5aa8",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3d46e979983cdce5aa8",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3d46e979983cdce5aa8"
      },
      {
        episode: 22,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_22_Meijin_bertanding_Meijin_Malay.mp4",
        size: "91.31 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3d46e979983cdce5aa9",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3d46e979983cdce5aa9",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3d46e979983cdce5aa9"
      },
      {
        episode: 23,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_23_Gunpla_Malam_Malay_dub_480p.mp4",
        size: "96.18 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3d46e979983cdce5aaa",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3d46e979983cdce5aaa",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3d46e979983cdce5aaa"
      },
      {
        episode: 24,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_24_Perkara_Gelap_Malay_dub_480p.mp4",
        size: "115.14 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3d96e979983cdce5aab",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3d96e979983cdce5aab",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3d96e979983cdce5aab"
      },
      {
        episode: 25,
        filename: "GUNDAM_BUILD_FIGHTERS_Episode_25_Perjanjian_Malay_dub_480p.mp4",
        size: "125.43 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3d96e979983cdce5aac",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb3d96e979983cdce5aac",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb3d96e979983cdce5aac"
      }
    ]
  },
  {
    category: "Time Bokan",
    poster: "https://i.postimg.cc/YCyfdWrV/Time-Bokan.jpg",
    items: [
      { episode: 1, filename: "Time Bokan 24 - Episode 01.zip", size: "288.14 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5ab0", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb51a6e979983cdce5ab0" },
      { episode: 2, filename: "Time Bokan 24 - Episode 02.zip", size: "227.0 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5aad", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb51a6e979983cdce5aad" },
      { episode: 3, filename: "Time Bokan 24 - Episode 03.zip", size: "177.35 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5ab1", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb51a6e979983cdce5ab1" },
      { episode: 4, filename: "Time Bokan 24 - Episode 04.zip", size: "215.45 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5aae", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb51a6e979983cdce5aae" },
      { episode: 5, filename: "Time Bokan 24 - Episode 05.zip", size: "181.75 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5ab2", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb51a6e979983cdce5ab2" },
      { episode: 6, filename: "Time Bokan 24 - Episode 06.zip", size: "180.3 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5aaf", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb51a6e979983cdce5aaf" },
      { episode: 7, filename: "Time Bokan 24 - Episode 07.zip", size: "171.04 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5226e979983cdce5ab3", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb5226e979983cdce5ab3" },
      { episode: 8, filename: "Time Bokan 24 - Episode 08.zip", size: "178.3 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5246e979983cdce5ab4", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb5246e979983cdce5ab4" },
      { episode: 9, filename: "Time Bokan 24 - Episode 09.zip", size: "262.95 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5246e979983cdce5ab5", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb5246e979983cdce5ab5" },
      { episode: 10, filename: "Time Bokan 24 - Episode 10.zip", size: "230.41 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5246e979983cdce5ab6", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb5246e979983cdce5ab6" },
      { episode: 12, filename: "Time Bokan 24 - Episode 12.zip", size: "159.79 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5276e979983cdce5ab7", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb5276e979983cdce5ab7" },
      { episode: 13, filename: "Time Bokan 24 - Episode 13.zip", size: "245.07 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5276e979983cdce5ab8", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb5276e979983cdce5ab8" },
      { episode: 14, filename: "Time Bokan 24 - Episode 14.zip", size: "181.69 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb52d6e979983cdce5ab9", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb52d6e979983cdce5ab9" },
      { episode: 15, filename: "Time Bokan 24 - Episode 15.zip", size: "267.15 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb52d6e979983cdce5aba", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb52d6e979983cdce5aba" },
      { episode: 16, filename: "Time Bokan 24 - Episode 16.zip", size: "252.0 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb52d6e979983cdce5abb", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb52d6e979983cdce5abb" },
      { episode: 17, filename: "Time Bokan 24 - Episode 17.zip", size: "226.05 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb52d6e979983cdce5abc", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb52d6e979983cdce5abc" },
      { episode: 18, filename: "Time Bokan 24 - Episode 18.zip", size: "189.58 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb55d6e979983cdce5abd", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb55d6e979983cdce5abd" },
      { episode: 19, filename: "Time Bokan 24 - Episode 19.zip", size: "156.76 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb55d6e979983cdce5abe", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb55d6e979983cdce5abe" },
      { episode: 20, filename: "Time Bokan 24 - Episode 20.zip", size: "172.37 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb55d6e979983cdce5abf", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb55d6e979983cdce5abf" },
      { episode: 21, filename: "Time Bokan 24 - Episode 21.zip", size: "144.89 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb55d6e979983cdce5ac0", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb55d6e979983cdce5ac0" },
      { episode: 22, filename: "Time Bokan 24 - Episode 22.zip", size: "162.93 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5636e979983cdce5ac1", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb5636e979983cdce5ac1" },
      { episode: 23, filename: "Time Bokan 24 - Episode 23.zip", size: "166.16 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5636e979983cdce5ac2", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb5636e979983cdce5ac2" },
      { episode: 24, filename: "Time Bokan 24 - Episode 24 Akhir.zip", size: "186.09 MiB", downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5686e979983cdce5ac3", shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb5686e979983cdce5ac3" }
    ]
  },
  {
    category: "Doraemon Movie",
    items: [
      {
        title: "Doraemon: Nobita and the Secret Gadget Museum (2013)",
        filename: "Doraemon_Nobita_and_the_Secret_Gadget_Museum_2013_720p_MALAY_WEB.mp4",
        size: "1.78 GiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5fa6e979983cdce5ac4",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb5fa6e979983cdce5ac4",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb5fa6e979983cdce5ac4",
        poster: "https://i.postimg.cc/4yfjzS1C/Doraemon-The-Movie-Nobita-and-Secret-Gadget-Museum.jpg"
      },
      {
        title: "Doraemon: Nobita & The Space Heroes (2015)",
        filename: "Doraemon_The_Movie_Nobita_&_The_Space_Heroes_2015_720p_MALAY_WEB.mkv",
        size: "1.71 GiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb6076e979983cdce5ac5",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb6076e979983cdce5ac5",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb6076e979983cdce5ac5",
        poster: "https://i.postimg.cc/j2xBzF4Z/Doraemon-The-Movie-Nobita-The-Space-Heroes.jpg"
      },
      {
        title: "Doraemon: New Record of Nobita's Spaceblazer (2009)",
        filename: "Doraemon_New_Record_of_Nobita's_Spaceblazer_2009_1080p_MALAY_WEB.mkv",
        size: "1.75 GiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb6136e979983cdce5ac6",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb6136e979983cdce5ac6",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb6136e979983cdce5ac6",
        poster: "https://i.postimg.cc/wMqnhGQF/Doraemon-The-Movie-New-Record-of-Nobita-Spaceblazer.jpg"
      },
      {
        title: "Stand by Me Doraemon 2 (2020)",
        filename: "Stand_by_Me_Doraemon_2_2020_720p_MALAY_HDTV_RAW_x264_AAC_alif.mkv",
        size: "1.01 GiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb6196e979983cdce5ac7",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb6196e979983cdce5ac7",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb6196e979983cdce5ac7",
        poster: "https://i.postimg.cc/WzNxMHw8/Doraemon-Stand-By-Me-2.jpg"
      },
      {
        title: "Stand by Me Doraemon (2014)",
        filename: "video-2026-10-12_10-27-46.mp4",
        size: "103.91 MiB",
        downloadUrl: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb6236e979983cdce5ac8",
        watchUrl: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accb6236e979983cdce5ac8",
        shareUrl: "https://t.me/DaRyzS_bot?start=file_6accb6236e979983cdce5ac8",
        poster: "https://i.postimg.cc/wMqnhGQV/Doraemon-Stand-By-Me.jpg"
      }
    ]
  }
];

// Endpoint JSON untuk mengambil senarai katalog
app.get('/api/catalog', (req, res) => {
  res.json(mediaCatalog);
});

app.listen(PORT, () => {
  console.log(`Server sedang berjalan di port ${PORT}`);
});
