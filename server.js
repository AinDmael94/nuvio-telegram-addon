const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Database Senarai Episod
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
  { episode: 10, title: "Nt Episod 010.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97de6e979983cdce58b5" }
];

const blackCloverEpisodes = [
  { episode: 1, title: "Black Clover Episode 1", url: "https://teraboxshare.com/s/1MnkiGCWy207764ewaAUeFw" },
  { episode: 2, title: "Black Clover Episode 2", url: "https://teraboxshare.com/s/1MnkiGCWy207764ewaAUeFw" },
  { episode: 3, title: "Black Clover Episode 3", url: "https://teraboxshare.com/s/15_tVldY5cV2ZHnPaKU4gEA" }
];

const malaysianMoviesEpisodes = [];
const animeAnimationEpisodes = [];
const ustazWadiEpisodes = [];
const kidsDelightEpisodes = [];
const runningManEpisodes = [];

// Manifest Endpoint
app.get('/:userId/manifest.json', (req, res) => {
  res.json({
    id: 'org.ryzstream.allinone',
    version: '1.0.0',
    name: 'DaRyz Ultimate Collection',
    description: 'Stream Naruto, Black Clover, Malaysian Movies, Anime, Ustaz Wadi, Kids Delight & Running Man',
    types: ['series'],
    catalogs: [
      { type: 'series', id: 'naruto_catalog', name: 'Naruto' },
      { type: 'series', id: 'blackclover_catalog', name: 'Black Clover' },
      { type: 'series', id: 'malaysianmovies_catalog', name: 'Malaysian Movies' },
      { type: 'series', id: 'animeanimation_catalog', name: 'Anime & Animation' },
      { type: 'series', id: 'ustazwadi_catalog', name: 'Ustaz Wadi' },
      { type: 'series', id: 'kidsdelight_catalog', name: 'Kids Delight' },
      { type: 'series', id: 'runningman_catalog', name: 'Running Man' }
    ],
    resources: ['catalog', 'meta', 'stream']
  });
});

app.get('/manifest.json', (req, res) => {
  res.redirect('/user123/manifest.json');
});

// Meta Endpoint
app.get('/:userId/meta/:type/:id.json', (req, res) => {
  const metaDatabase = {
    'naruto_catalog': {
      id: 'naruto_catalog',
      type: 'series',
      name: 'Naruto',
      poster: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
      background: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
      description: 'Naruto Uzumaki is an adolescent ninja who searches for recognition and dreams of becoming the Hokage.',
      genres: ['Anime', 'Action', 'Adventure']
    },
    'blackclover_catalog': {
      id: 'blackclover_catalog',
      type: 'series',
      name: 'Black Clover',
      poster: 'https://i.postimg.cc/FRX3YtV9/BC.webp',
      background: 'https://i.postimg.cc/FRX3YtV9/BC.webp',
      description: 'Asta and Yuno were abandoned at the same church and raised together.',
      genres: ['Anime', 'Action', 'Fantasy']
    },
    'malaysianmovies_catalog': {
      id: 'malaysianmovies_catalog',
      type: 'series',
      name: 'Malaysian Movies',
      poster: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
      background: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
      description: 'Koleksi filem-filem Melayu dan drama pilihan.',
      genres: ['Local', 'Movies']
    },
    'animeanimation_catalog': {
      id: 'animeanimation_catalog',
      type: 'series',
      name: 'Anime & Animation',
      poster: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
      background: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
      description: 'Doraemon, Shin Chan, Anak Anak Sidek, Hagemaru & banyak lagi.',
      genres: ['Animation', 'Kids', 'Anime']
    },
    'ustazwadi_catalog': {
      id: 'ustazwadi_catalog',
      type: 'series',
      name: 'Ustaz Wadi',
      poster: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
      background: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
      description: 'Koleksi ceramah bersama Ustaz Wadi Anuar.',
      genres: ['Religion', 'Ceramah']
    },
    'kidsdelight_catalog': {
      id: 'kidsdelight_catalog',
      type: 'series',
      name: 'Kids Delight',
      poster: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
      background: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
      description: 'Hiburan khas untuk kanak-kanak.',
      genres: ['Kids', 'Family']
    },
    'runningman_catalog': {
      id: 'runningman_catalog',
      type: 'series',
      name: 'Running Man',
      poster: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
      background: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
      description: 'Variety show popular Running Man.',
      genres: ['Variety', 'Comedy']
    }
  };

  const requestedMeta = metaDatabase[req.params.id];
  if (requestedMeta) {
    res.json({ meta: requestedMeta });
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

// Stream Endpoint
app.get('/:userId/stream/:type/:id.json', (req, res) => {
  const parts = req.params.id.split(':');
  const catalogId = parts[0];
  const episodeNum = parseInt(parts[2]);

  let found = null;

  if (catalogId === 'naruto_catalog') {
    found = narutoEpisodes.find(e => e.episode === episodeNum);
  } else if (catalogId === 'blackclover_catalog') {
    found = blackCloverEpisodes.find(e => e.episode === episodeNum);
  } else if (catalogId === 'malaysianmovies_catalog') {
    found = malaysianMoviesEpisodes.find(e => e.episode === episodeNum);
  } else if (catalogId === 'animeanimation_catalog') {
    found = animeAnimationEpisodes.find(e => e.episode === episodeNum);
  } else if (catalogId === 'ustazwadi_catalog') {
    found = ustazWadiEpisodes.find(e => e.episode === episodeNum);
  } else if (catalogId === 'kidsdelight_catalog') {
    found = kidsDelightEpisodes.find(e => e.episode === episodeNum);
  } else if (catalogId === 'runningman_catalog') {
    found = runningManEpisodes.find(e => e.episode === episodeNum);
  }

  if (found) {
    return res.json({
      streams: [
        {
          title: `[DaRyzStream] ${found.title}`,
          url: found.url
        }
      ]
    });
  }

  res.json({ streams: [] });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
