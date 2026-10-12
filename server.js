const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());

// ==========================================
// USER TRACKER & ANALYTICS STORAGE
// ==========================================
const uniqueUsers = new Set();
const userActivity = {};

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
            description: item.description || '',
            url: item.url
        };
    });
}

// ==========================================
// 1. MANIFEST ADDON
// ==========================================
const manifest = {
    id: "org.aindmael.hagemaru.addon",
    version: "4.3.0",
    name: "DaRyz Collection Addon",
    description: "Addon Stremio/Nuvio dengan katalog tersusun mengikut tajuk siri, ceramah dan filem.",
    resources: ["catalog", "stream", "meta"],
    types: ["series"],
    idPrefixes: [
        "kisah_sahabat_series", "running_man_series", "naruto_series", "mm_", "mahsyar_series", "filem_dakwah_sengketa_series", "hagemaru_series", "ninja_boy_series", 
        "doraemon_series", "pokemon_journeys_series", "midori_days_series", "anak_anak_sidek_series", 
        "ueki_series", "ginban_series", "black_cat_series", "digimon_savers_series", 
        "digimon_01_series", "shin_chan_series", "akhir_zaman_series", "kd_malay_series", "kd_eng_series",
        "demon_slayer_series", "jjk_series", "boruto_series", "hagemaru_full_series", "doraemon_movie_series", "naruto_movie_series", "chibi_maruko_series"
    ],
    catalogs: [
        { type: "series", id: "naruto_catalog", name: "Naruto (220 Episod)" },
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
    "naruto_catalog": {
        id: "naruto_series",
        catalogId: "naruto_catalog",
        name: "Naruto (220 Episod)",
        poster: "https://i.postimg.cc/8c8qP2Xb/Naruto.jpg",
        description: "Koleksi Penuh 220 Episod Naruto Bahasa Melayu.",
        episodes: createEpisodes([
            { title: "Episod 1: Masuk! Uzumaki Naruto!", description: "Naruto Uzumaki is a ninja in training who is mischievous and makes trouble.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55c8" },
            { title: "Episod 2: Nama Saya Konohamaru!", description: "Naruto meets Konohamaru, the Third Hokage's grandson.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55c9" },
            { title: "Episod 3: Musuh Ketat! Sasuke dan Sakura", description: "Team 7 is formed with Naruto, Sasuke, and Sakura.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ca" },
            { title: "Episod 4: Lulus atau Gagal! Ujian Survival", description: "Kakashi tests Team 7 with the bell test.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55cb" },
            { title: "Episod 5: Gagal? Keputusan Akhir Kakashi", description: "Team 7 passes the survival test.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55cc" },
            { title: "Episod 6: Misi Berbahaya! Perjalanan ke Negeri Ombak", description: "Team 7 embarks on a C-rank escort mission.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55cd" },
            { title: "Episod 7: Pembunuh Bayaran Pakar!", description: "Zabuza Momochi attacks the bridge builder Tazuna.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ce" },
            { title: "Episod 8: Sumpahan Kesatriaan", description: "Naruto vows to never run away again.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55cf" },
            { title: "Episod 9: Kakashi: Pahlawan Bermata Sharingan", description: "Kakashi uses his Sharingan against Zabuza.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d0" },
            { title: "Episod 10: Hutan Chakra", description: "Team 7 learns tree climbing with chakra control.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d1" },
            { title: "Episod 11: Negeri Tempat Munculnya Wira", description: "The battle on the Great Naruto Bridge begins.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d2" },
            { title: "Episod 12: Pertempuran di Jambatan! Zabuza Kembali!", description: "Zabuza and Haku face Team 7 once more.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d3" },
            { title: "Episod 13: Seni Rahsia Haku: Cermin Kristal Ais Demonic", description: "Sasuke gets trapped in Haku's Demonic Mirror Ice Crystals.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d4" },
            { title: "Episod 14: Naruto Nombor Satu Masuk Medan", description: "Naruto arrives to join the battle against Haku.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d5" },
            { title: "Episod 15: Pertempuran Tanpa Penglihatan: Sharingan Musnah", description: "Sasuke awakens his Sharingan.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d6" },
            { title: "Episod 16: Musnahnya Kunci Yang Dimeteraikan", description: "Naruto taps into the Nine-Tails' chakra.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d7" },
            { title: "Episod 17: Masa Lalu Putih: Salji Tersembunyi", description: "Haku's backstory is revealed.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d8" },
            { title: "Episod 18: Senjata Bernama Shinobi", description: "The fate of Zabuza and Haku.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d9" },
            { title: "Episod 19: Zabuza Salji Darah", description: "Gato and his thugs are defeated.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55da" },
            { title: "Episod 20: Bermulanya Musim Baru: Ujian Chunin!", description: "Announcements for the Chunin Exams.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55db" },
            { title: "Episod 21: Kenalkan Mereka! Pesaing Baru Yang Hebat", description: "Meeting Rock Lee and other rookies.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55dc" },
            { title: "Episod 22: Cabaran Baru: 100 Calon Chunin", description: "The Chunin Exam proctors introduce themselves.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55dd" },
            { title: "Episod 23: Pertarungan Pertama: Temui Pasukan 9", description: "Meeting Neji, Tenten, and Rock Lee.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55de" },
            { title: "Episod 24: Kelayakan Ujian Pertama: Ujian Bertulis", description: "The written exam begins with Ibiki Morino.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55df" },
            { title: "Episod 25: Soalan Kesepuluh: Pertaruhan Nyawa", description: "Naruto passes the first test with his determination.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e0" },
            { title: "Episod 26: Laporan Khas: Masuk Ke Hutan Kematian", description: "Anko Mitarashi introduces the Forest of Death.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e1" },
            { title: "Episod 27: Ujian Kedua Bermula: Semua Musuh Adalah Sasaran", description: "Team 7 enters the Forest of Death.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e2" },
            { title: "Episod 28: Jangan Mengalah! Temui Naruto", description: "Orochimaru attacks Sasuke and Naruto.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e3" },
            { title: "Episod 29: Naruto Bangkit! Kuasa Sembilan Ekor", description: "Naruto unleashes Nine-Tails power against Orochimaru's snake.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e4" },
            { title: "Episod 30: Cinta Sakura: Keputusan Berani", description: "Sakura fights to protect unconscious Sasuke and Naruto.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e5" },
            { title: "Episod 31: Shoryu Tensei: Cinta dan Keberanian Lee", description: "Rock Lee steps in to help Sakura.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e6" },
            { title: "Episod 32: Bunga Sakura Mekar: Kebenaran Terbongkar", description: "Team 10 helps Team 7.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e7" },
            { title: "Episod 33: Formasi Terkuat: Pasukan Ino-Shika-Cho!", description: "Ino-Shika-Cho team shows their coordination.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e8" },
            { title: "Episod 34: Akatsuki Menyerang: Gaara Menunjuk Belang", description: "Gaara demonstrates his terrifying power.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e9" },
            { title: "Episod 35: Gulungan Rahsia: Siapa Yang Dapat Dulu?", description: "Team 7 successfully obtains both scrolls.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ea" },
            { title: "Episod 36: Pertembungan Pasangan: Klon Melawan Klon", description: "Preliminaries for the third round begin.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55eb" },
            { title: "Episod 37: Amaran Kedua: Hayate Ditemui Mati", description: "Hayate discovers a plot by Orochimaru and Kabuto.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ec" },
            { title: "Episod 38: Pusingan Kelayakan Ketiga Bermula", description: "Preliminary matches start.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ed" },
            { title: "Episod 39: Kuasa Kipas Temari vs Tenten", description: "Temari defeats Tenten.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ee" },
            { title: "Episod 40: Pertarungan Sengit Shikamaru", description: "Shikamaru uses his shadow imitation technique.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ef" },
            { title: "Episod 41: Kiba vs Naruto: Pertarungan Anjing Liar", description: "Naruto faces Kiba and Akamaru.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f0" },
            { title: "Episod 42: Taktik Bijak Naruto: Pertarungan Tipu Daya", description: "Naruto defeats Kiba using a clever trick.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f1" },
            { title: "Episod 43: Hinata Menentang Neji: Tradisi Keluarga Hyuga", description: "Hinata fights her cousin Neji.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f2" },
            { title: "Episod 44: Tekad Merah Hinata", description: "Hinata refuses to give up.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f3" },
            { title: "Episod 45: Perlawanan Seterusnya: Lee Melawan Gaara", description: "Rock Lee removes his weights.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f4" },
            { title: "Episod 46: Pukulan Maut! Rahsia Teknik Pintu Terbuka", description: "Lee opens the inner gates.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f5" },
            { title: "Episod 47: Pertembungan Hebat: Usaha Melawan Takdir", description: "Gaara defeats Lee in an intense battle.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f6" },
            { title: "Episod 48: Kehebatan Tersembunyi Sasuke", description: "Sasuke learns Kakashi's Chidori.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f7" },
            { title: "Episod 49: Chidori vs Pasir Gaara", description: "Sasuke uses Chidori in the preliminaries.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f8" },
            { title: "Episod 50: Kisah Disebalik Garisan Takdir", description: "Preliminaries conclude.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f9" },
            { title: "Episod 51: Pertemuan Semula Dengan Jiraiya", description: "Naruto meets the legendary Sannin Jiraiya.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55fa" },
            { title: "Episod 52: Latihan Rasengan Bersama Pertapa Genit", description: "Naruto begins training the Rasengan.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55fb" },
            { title: "Episod 53: Pusingan Akhir Ujian Chunin Bermula", description: "The final exam matches are set.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55fc" },
            { title: "Episod 54: Permulaan Perlawanan Akhir Sasuke", description: "Sasuke arrives just in time.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55fd" },
            { title: "Episod 55: Munculnya Juruhebah Berita Konoha", description: "Excitement builds for the finals.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55fe" },
            { title: "Episod 56: Pertarungan Penuh Kejutan: Shikamaru Menyerah?", description: "Shikamaru vs Temari match.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ff" },
            { title: "Episod 57: Keputusan Pusingan Penyingkiran Ketiga", description: "Shikamaru wins praise for his intellect.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5600" },
            { title: "Episod 58: Serangan Musuh Di Kampung Daun", description: "The Sound and Sand invasion begins.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5601" },
            { title: "Episod 59: Pertempuran Kemuncak: Hokage Ketiga", description: "The Third Hokage faces Orochimaru.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5602" },
            { title: "Episod 60: Pertarungan Dua Legenda: Warisan Hokage", description: "Orochimaru summons the First and Second Hokage.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5603" },
            { title: "Episod 61: Keputusan Pertempuran Terakhir", description: "The battle reaches its climax.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5604" },
            { title: "Episod 62: Kebangkitan Kuasa Sepuluh Jari", description: "Naruto confronts Gaara.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5605" },
            { title: "Episod 63: Penamat Yang Menyayat Hati", description: "The Third Hokage's ultimate sacrifice.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5606" },
            { title: "Episod 64: Awan Merah Menghampiri Konoha", description: "Itachi Uchiha and Kisame Hoshigaki arrive.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5607" },
            { title: "Episod 65: Itachi Uchiha Kembali!", description: "Kakashi and Sasuke confront Itachi.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5608" },
            { title: "Episod 66: Pertembungan Mata Sharingan Di Kedai Kopi", description: "Itachi seeks Naruto.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5609" },
            { title: "Episod 67: Misi Mencari Tsunade Bermula", description: "Naruto and Jiraiya set out to find Tsunade.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce560a" },
            { title: "Episod 68: Perjalanan Bersama Ahli Perubatan Legendaris", description: "Jiraiya teaches Naruto advanced Rasengan.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce560b" },
            { title: "Episod 69: Pertembungan Tiga Sannin Hebat", description: "The Sannin gather.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce560c" },
            { title: "Episod 70: Rasengan Sempurna Naruto", description: "Naruto masters the Rasengan.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce560d" },
            { title: "Episod 71: Pertarungan Panggil Binata Besar", description: "Summoning battle between Jiraiya, Orochimaru, and Tsunade.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce560e" },
            { title: "Episod 72: Kembalinya Hokage Kelima", description: "Tsunade accepts the title of Fifth Hokage.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce560f" },
            { title: "Episod 73: Pertarungan Sasuke Melawan Itachi", description: "Sasuke confronts his brother Itachi.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5610" },
            { title: "Episod 74: Keputusan Ke-100: Beban Nama Baik Klan Uchiha", description: "Sasuke falls victim to Tsukuyomi.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5611" },
            { title: "Episod 75: Impian Sasuke Yang Hilang", description: "Sasuke recuperates in Konoha hospital.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5612" },
            { title: "Episod 76: Misi Menjejaki Sasuke Bermula", description: "Sasuke decides to leave Konoha for power.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5613" },
            { title: "Episod 77: Pembentukan Pasukan Penyelamat Sasuke", description: "Shikamaru leads the rescue team.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5614" },
            { title: "Episod 78: Pertempuran Bermula: Penyelamat Melawan Empat Orang Bunian", description: "The Sound Four ambush the rescue team.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5615" },
            { title: "Episod 79: Kehebatan Pasukan Khas Lembah Akhir", description: "Tactical battles against Sound ninja.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5616" },
            { title: "Episod 80: Pertarungan Choji: Pengorbanan Sahabat Sejati", description: "Choji fights Jirobo.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5617" },
            { title: "Episod 81: Neji Terperangkap Dalam Perangkap Maut", description: "Neji battles Kidomaru.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5618" },
            { title: "Episod 82: Bantuan Tiba: Sekutu Dari Pasukan Pasir", description: "Gaara, Temari, and Kankuro arrive to help.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5619" },
            { title: "Episod 83: Pertarungan Puncak Lembah Akhir", description: "Naruto catches up to Sasuke.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce561a" },
            { title: "Episod 84: Rasengan Bertemu Chidori!", description: "Naruto and Sasuke clash with their signature techniques.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce561b" },
            { title: "Episod 85: Janji Yang Tidak Tertunai", description: "Sasuke leaves for Orochimaru.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce561c" },
            { title: "Episod 86: Kepulangan Yang Menyayat Hati", description: "The rescue team returns injured.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce561d" },
            { title: "Episod 87: Misi Baru Di Bawah Pimpinan Hokage Kelima", description: "New missions and training preparations.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce561e" },
            { title: "Episod 88: Muslihat Di Sebalik Kelihatan", description: "Filler adventures begin.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce561f" },
            { title: "Episod 89: Misteri Harta Karun Negeri Laut", description: "The Land of the Sea arc starts.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5620" },
            { title: "Episod 90: Penjaga Hati Dan Semangat Ninja", description: "Naruto helps Anko remember her past.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5621" },
            { title: "Episod 91: Munculnya Juruhebah Rahsia", description: "Continuing the mission in the Land of the Sea.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5622" },
            { title: "Episod 92: Pengembaraan Bersama Jiraiya Bermula", description: "Naruto trains with Jiraiya.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5623" },
            { title: "Episod 93: Latihan Khas Rasengan Jarak Jauh", description: "Improving the Rasengan.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5624" },
            { title: "Episod 94: Kehebatan Benteng Pertahanan Mutlak", description: "Fuma clan conflict.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5625" },
            { title: "Episod 95: Pertarungan Menentang Klan Fuma", description: "Battling rogue ninja.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5626" },
            { title: "Episod 96: Kesilapan Masa Lalu Yang Menghantui", description: "Kurosuki family arc begins.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5627" },
            { title: "Episod 97: Cabaran Kumpulan Siasatan Khas", description: "Team Guy joins the mission.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5628" },
            { title: "Episod 98: Tugas Paling Sukar Hokage Kelima", description: "Medical ninja duties.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5629" },
            { title: "Episod 99: Sumpahan Raksasaki: Air Terjun Darah", description: "Confronting Raiga.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce562a" },
            { title: "Episod 100: Impian Seorang Ninja Sejati", description: "Lee and Naruto face challenges.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce562b" },
            { title: "Episod 101: Wajah Sebenar Kakashi Sensei Terbongkar!", description: "The classic mask-removal episode.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce562c" },
            { title: "Episod 102: Misi Menyelamatkan Negeri Teh", description: "The Land of Tea escort mission.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce562d" },
            { title: "Episod 103: Perlumbaan Kapal Di Lautan Lepas", description: "The Todoroki race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce562e" },
            { title: "Episod 104: Aksi Berani Di Lautan Bergelora", description: "Overcoming obstacles in the race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce562f" },
            { title: "Episod 105: Pertembungan Akhir Lumba Kapal", description: "Finishing the race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5630" },
            { title: "Episod 106: Pertarungan Sengit Di Pelabuhan", description: "Defeating the cheating competitors.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5631" },
            { title: "Episod 107: Pilihan Sukar Sasuke Uchiha", description: "Sasuke struggles with his weakness.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5632" },
            { title: "Episod 108: Pintu Gerbang Kegelapan Dibuka", description: "Sasuke challenges Naruto on the hospital roof.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5633" },
            { title: "Episod 109: Bunyi Bunyian Angin Malam", description: "The Sound Four arrive to take Sasuke.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5634" },
            { title: "Episod 110: Pasukan Pemburu Beraksi", description: "Forming the Sasuke Retrieval Squad.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5635" },
            { title: "Episod 111: Pertempuran Antara Bunian Dan Ninja", description: "Chasing the Sound Four.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5636" },
            { title: "Episod 112: Kegagalan Misi Mengukir Luka", description: "Tactical setbacks.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5637" },
            { title: "Episod 113: Kekuatan Penuh Pasukan Bantuan Konoha", description: "Reinforcements join the fight.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5638" },
            { title: "Episod 114: Pertarungan Kiba Melawan Sakon", description: "Kiba and Akamaru vs Sakon and Ukon.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5639" },
            { title: "Episod 115: Strategi Hebat Shikamaru Diuji", description: "Shikamaru's brilliant tactics.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce563a" },
            { title: "Episod 116: Bantuan Dari Negeri Pasir Muncul", description: "Sand siblings arrive as allies.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce563b" },
            { title: "Episod 117: Pertarungan Kimimaro: Tulang Maut", description: "Kimimaro's bone kekkei genkai.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7e9b6e979983cdce56d0" },
            { title: "Episod 118: Pertolongan Di Saat Akhir", description: "Rock Lee joins the battle against Kimimaro.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7e9b6e979983cdce56d1" },
            { title: "Episod 119: Kesilapan Strategi Pertarungan Terakhir", description: "Continuing the fierce battle.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7e9b6e979983cdce56d2" },
            { title: "Episod 120: Pertarungan Hidup Mati Rock Lee", description: "Lee uses Drunken Fist.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7e9b6e979983cdce56cd" },
            { title: "Episod 121: Kehebatan Teknik Mabuk Drunken Fist", description: "Lee surprises Kimimaro.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7e9b6e979983cdce56ce" },
            { title: "Episod 122: Kuasa Tersembunyi Gaara Diuji", description: "Gaara steps in against Kimimaro.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7e9b6e979983cdce56cf" },
            { title: "Episod 123: Pertembungan Dua Sahabat Karib", description: "Naruto confronts Sasuke at the Valley of the End.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7ea36e979983cdce56d3" },
            { title: "Episod 124: Pilihan Antara Cahaya Dan Kegelapan", description: "Sasuke explains his motives.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7ea36e979983cdce56d4" },
            { title: "Episod 125: Kawan Sejati Sepanjang Zaman", description: "Flashbacks of their childhood.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7ea36e979983cdce56d5" },
            { title: "Episod 126: Pertembungan Puncak Di Lembah Kematian", description: "The fight escalates with cursed seals.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7ea36e979983cdce56d6" },
            { title: "Episod 127: Keputusan Di Hujung Takdir", description: "Intense clash of ideals.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7ea96e979983cdce56d7" },
            { title: "Episod 128: Gema Penyesalan Yang Mendalam", description: "Reflecting on bonds.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7ea96e979983cdce56d8" },
            { title: "Episod 129: Ikatan Persahabatan Yang Berdarah", description: "Naruto fights to bring Sasuke back.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7eae6e979983cdce56d9" },
            { title: "Episod 130: Pertarungan Mata Sharingan Ketiga", description: "Sasuke unlocks three-tomoe Sharingan.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7eae6e979983cdce56da" },
            { title: "Episod 131: Air Mata Di Hujung Ikatan", description: "Emotional turning point.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7eae6e979983cdce56db" },
            { title: "Episod 132: Rahsia Gelap Di Sebalik Garisan Takdir", description: "The final showdown begins.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7eda6e979983cdce56dc" },
            { title: "Episod 133: Jeritan Hati Seorang Sahabat", description: "Rasengan vs Chidori final clash.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7edf6e979983cdce56dd" },
            { title: "Episod 134: Akhir Sebuah Pengembaraan Di Lembah", description: "Sasuke leaves for Orochimaru's hideout.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7edf6e979983cdce56de" },
            { title: "Episod 135: Janji Yang Belum Tertunai", description: "Naruto wakes up in the hospital.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7ee06e979983cdce56df" },
            { title: "Episod 136: Misi Menembus Benteng Musuh", description: "New filler arcs begin.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7ee06e979983cdce56e0" },
            { title: "Episod 137: Perangkap Misteri Di Markas Musuh", description: "Investigating the Land of Rice Fields.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7ee06e979983cdce56e1" },
            { title: "Episod 138: Pengkhianatan Di Tengah Kegelapan", description: "Traps and deception.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7ee56e979983cdce56e2" },
            { title: "Episod 139: Pertarungan Sengit Di Markas Orochimaru", description: "Searching for clues.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7eea6e979983cdce56e3" },
            { title: "Episod 140: Skim Pemusnahan Penjara Suci", description: "Infiltrating a stronghold.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7eea6e979983cdce56e4" },
            { title: "Episod 141: Keyakinan Diri Yang Teruji", description: "Team missions.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f166e979983cdce56e5" },
            { title: "Episod 142: Pertarungan Penjara Berapi", description: "Battling Mizuki's allies.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f166e979983cdce56e6" },
            { title: "Episod 143: Cabaran Misi Menyelamatkan Harta", description: "Protecting valuables.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f166e979983cdce56e7" },
            { title: "Episod 144: Kebangkitan Semangat Pasukan Ketiga", description: "Teamwork exercises.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f1c6e979983cdce56e8" },
            { title: "Episod 145: Formasi Baharu Diuji", description: "New formations.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f1c6e979983cdce56e9" },
            { title: "Episod 146: Munculnya Musuh Berwajah Seribu", description: "Encountering shape-shifters.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f1c6e979983cdce56ea" },
            { title: "Episod 147: Pertarungan Di Pinggir Hutan Larangan", description: "Forest skirmish.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f226e979983cdce56eb" },
            { title: "Episod 148: Misi Mencari Biksu Misterius", description: "Biksu tracking mission.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f226e979983cdce56ec" },
            { title: "Episod 149: Misteri Di Sebalik Kuasa Bayangan", description: "Shadow technique investigations.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f286e979983cdce56ed" },
            { title: "Episod 150: Pertarungan Menentang Klan Mizuki", description: "Mizuki's plot uncovered.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f286e979983cdce56ee" },
            { title: "Episod 151: Keputusan Di Markas Mizuki", description: "Defeating Mizuki.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f526e979983cdce56ef" },
            { title: "Episod 152: Penjejakan Biksu Yang Hilang", description: "Biksu rescue.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f536e979983cdce56f0" },
            { title: "Episod 153: Serangan Berani Di Kubu Musuh", description: "Fortress assault.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f536e979983cdce56f1" },
            { title: "Episod 154: Muslihat Di Sebalik Kabus Tebal", description: "Foggy battlefield tactics.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f596e979983cdce56f2" },
            { title: "Episod 155: Perlumbaan Menentang Masa", description: "Timed missions.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f596e979983cdce56f3" },
            { title: "Episod 156: Misteri Di Padang Pasir Luas", description: "Desert tracking.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f5e6e979983cdce56f4" },
            { title: "Episod 157: Pertarungan Di Kubu Misteri", description: "Stronghold battle.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f5f6e979983cdce56f5" },
            { title: "Episod 158: Keputusan Misi Menyelamat", description: "Mission accomplished.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f5f6e979983cdce56f6" },
            { title: "Episod 159: Misi Mengawal Kumpulan Penjenayah", description: "Bounty hunters arc.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f646e979983cdce56f7" },
            { title: "Episod 160: Pertarungan Di Kuil Kuno", description: "Ancient temple battle.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f646e979983cdce56f8" },
            { title: "Episod 161: Munculnya Binatang Buas Legenda", description: "Legendary beast encounters.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f646e979983cdce56f9" },
            { title: "Episod 162: Kuasa Mistik Binatang Berekor Tiga", description: "Three-tails monster lore.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f646e979983cdce56fa" },
            { title: "Episod 163: Strategi Menumpaskan Raksasa Laut", description: "Sea monster strategy.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f936e979983cdce56fb" },
            { title: "Episod 164: Pertarungan Di Permukaan Air", description: "Water surface fighting.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f936e979983cdce56fc" },
            { title: "Episod 165: Misteri Di Pulau Terpencil", description: "Remote island mysteries.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f946e979983cdce56fd" },
            { title: "Episod 166: Penyelidikan Di Makam Kuno", description: "Ancient tomb exploration.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f986e979983cdce56fe" },
            { title: "Episod 167: Perangkap Maut Di Dalam Tanah", description: "Underground traps.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f996e979983cdce56ff" },
            { title: "Episod 168: Latihan Istimewa Di Kampung Daun", description: "Special training arc.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f9d6e979983cdce5700" },
            { title: "Episod 169: Kenangan Bersama Pasukan Lama", description: "Team memories.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f9e6e979983cdce5701" },
            { title: "Episod 170: Pertarungan Sengit Di Lorong Sunyi", description: "Quiet alley showdown.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7f9e6e979983cdce5702" },
            { title: "Episod 171: Misteri Jejak Kaki Di Salji", description: "Snowy footprints tracking.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7fa36e979983cdce5703" },
            { title: "Episod 172: Pertarungan Di Puncak Gunung Ais", description: "Ice mountain battle.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7fa36e979983cdce5704" },
            { title: "Episod 173: Misi Menyelamatkan Puteri Negeri", description: "Princess rescue mission.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7fcf6e979983cdce5705" },
            { title: "Episod 174: Serangan Ghaib Di Istana Lama", description: "Haunted palace attack.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7fcf6e979983cdce5706" },
            { title: "Episod 175: Seni Pertahanan Diri Yang Hilang", description: "Lost martial arts.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7fcf6e979983cdce5707" },
            { title: "Episod 176: Keputusan Di Dewan Perjuangan", description: "Arena showdown.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7fcf6e979983cdce5708" },
            { title: "Episod 177: Misi Mengawal Pedang Legenda", description: "Legendary sword escort.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7fd56e979983cdce5709" },
            { title: "Episod 178: Pertarungan Menentang Pencuri Pedang", description: "Sword thieves battle.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7fd56e979983cdce570a" },
            { title: "Episod 179: Penjejakan Di Hutan Berkabus", description: "Misty forest tracking.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7fda6e979983cdce570b" },
            { title: "Episod 180: Keputusan Di Markas Penjenayah", description: "Criminal hideout raid.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7fdb6e979983cdce570c" },
            { title: "Episod 181: Misi Rahsia Di Kampung Bintang", description: "Star village secret mission.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc7fdb6e979983cdce570d" },
            { title: "Episod 182: Misteri Di Sebalik Tabir Bintang", description: "Star village mysteries.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc800c6e979983cdce570e" },
            { title: "Episod 183: Kuasa Misteri Batu Meteorit", description: "Meteorite power arc.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc800d6e979983cdce570f" },
            { title: "Episod 184: Pengorbanan Demi Kampung Bintang", description: "Sacrifices for the village.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80116e979983cdce5710" },
            { title: "Episod 185: Pertarungan Terakhir Di Lembah Meteor", description: "Final battle at the meteorite valley.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80116e979983cdce5711" },
            { title: "Episod 186: Kenangan Zaman Kanak-Kanak Kiba", description: "Kiba's childhood memories.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80116e979983cdce5712" },
            { title: "Episod 187: Misi Mengawal Lori Barang Misteri", description: "Mysterious cargo truck escort.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80116e979983cdce5713" },
            { title: "Episod 188: Serangan Penyamun Di Jalan Raya", description: "Highway bandits attack.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80166e979983cdce5714" },
            { title: "Episod 189: Wajah Disebalik Topeng Penyamun", description: "Unmasking the bandits.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80176e979983cdce5715" },
            { title: "Episod 190: Misteri Di Rumah Berhantu", description: "Haunted house investigation.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc801c6e979983cdce5716" },
            { title: "Episod 191: Pertarungan Di Lorong Gelap", description: "Dark alley confrontation.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc801c6e979983cdce5717" },
            { title: "Episod 192: Kisah Latihan Genin Di Konoha", description: "Genin training tales.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80486e979983cdce5718" },
            { title: "Episod 193: Cabaran Memasak Makanan Ninja", description: "Ninja cooking challenge.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80486e979983cdce5719" },
            { title: "Episod 194: Misteri Pesanan Terakhir Pelanggan", description: "Client's final order mystery.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc804d6e979983cdce571a" },
            { title: "Episod 195: Pertarungan Di Kubu Sepi", description: "Deserted fort battle.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc804d6e979983cdce571b" },
            { title: "Episod 196: Pertembungan Pasukan Istimewa Anbu", description: "ANBU special squad clash.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc804e6e979983cdce571c" },
            { title: "Episod 197: Misi Mengawal Penjara Keselamatan Tinggi", description: "High-security prison guard.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc804e6e979983cdce571d" },
            { title: "Episod 198: Pemberontakan Di Dalam Penjara", description: "Prison riot.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80536e979983cdce571e" },
            { title: "Episod 199: Keputusan Di Pintu Gerbang Penjara", description: "Resolution at the prison gates.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80536e979983cdce571f" },
            { title: "Episod 200: Perlawanan Penuh Ketawa Di Konoha", description: "Comedy battle in Konoha.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80586e979983cdce5720" },
            { title: "Episod 201: Misi Menyelamatkan Pelajar Akademi", description: "Academy students rescue.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80586e979983cdce5721" },
            { title: "Episod 202: Pertarungan Di Hutan Pengganti", description: "Substitute forest battle.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80586e979983cdce5722" },
            { title: "Episod 203: Keputusan Misi Menyelamat Pelajar", description: "Students saved safely.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80846e979983cdce5723" },
            { title: "Episod 204: Misteri KLAN Kurama Yang Hilang", description: "Kurama clan mystery arc.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80846e979983cdce5724" },
            { title: "Episod 205: Ilusi Maut Di Rumah Keluarga Kurama", description: "Deadly genjutsu in Kurama estate.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80896e979983cdce5725" },
            { title: "Episod 206: Penyelamatan Di Alam Ilusi", description: "Rescue inside genjutsu world.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80896e979983cdce5726" },
            { title: "Episod 207: Pertarungan Menentang Bayangan Diri", description: "Fighting inner shadows.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc808a6e979983cdce5727" },
            { title: "Episod 208: Keputusan Di Alam Ilusi Sempurna", description: "Genjutsu realm resolved.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc808f6e979983cdce5728" },
            { title: "Episod 209: Misi Mengawal Bekalan Istimewa", description: "Special supplies escort.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc808f6e979983cdce5729" },
            { title: "Episod 210: Tipu Daya Di Padang Pasir Luas", description: "Desert deceptions.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80946e979983cdce572a" },
            { title: "Episod 211: Pertarungan Menentang Pahlawan Bayangan", description: "Shadow warriors battle.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80946e979983cdce572b" },
            { title: "Episod 212: Keputusan Pertarungan Di Padang Pasir", description: "Desert battle conclusion.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80946e979983cdce572c" },
            { title: "Episod 213: Misteri Kenangan Yang Hilang", description: "Lost memories mystery.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80c66e979983cdce572d" },
            { title: "Episod 214: Penjejakan Di Kampung Asal", description: "Hometown tracking.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80c66e979983cdce572e" },
            { title: "Episod 215: Wajah Disebalik Ingatan Yang Pulih", description: "Memories restored.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80c66e979983cdce572f" },
            { title: "Episod 216: Pertarungan Menentang Pelajar Pelarian", description: "Rogue student battle.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80c66e979983cdce5730" },
            { title: "Episod 217: Keputusan Di Jambatan Takdir", description: "Bridge of destiny showdown.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80c86e979983cdce5731" },
            { title: "Episod 218: Misi Menyelamatkan Karyawan Pelarian", description: "Rescuing artisans.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80cb6e979983cdce5732" },
            { title: "Episod 219: Pertarungan Di Kuil Penjagaan Purba", description: "Ancient guardian temple fight.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80cc6e979983cdce5733" },
            { title: "Episod 220: Perpisahan Dan Permulaan Baharu", description: "Naruto leaves Konoha with Jiraiya for training.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc80d06e979983cdce5734" }
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
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca07b6e979983cdce598b",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca07b6e979983cdce5989",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca07b6e979983cdce598d",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca07b6e979983cdce5988",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca07b6e979983cdce598c",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca07b6e979983cdce598a",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0836e979983cdce598e",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0856e979983cdce598f",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0856e979983cdce5990",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0856e979983cdce5991",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0886e979983cdce5992",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0886e979983cdce5993",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca08d6e979983cdce5994",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca08d6e979983cdce5995",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca08e6e979983cdce5996",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca08e6e979983cdce5997",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0c06e979983cdce5998",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0c56e979983cdce5999",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0c56e979983cdce599b",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0c56e979983cdce599a",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0c66e979983cdce599c",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0cb6e979983cdce599d",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0cc6e979983cdce599e",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0d16e979983cdce599f",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0d16e979983cdce59a0",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca0f66e979983cdce59a1"
        ])
    },
    "jjk_catalog": {
        id: "jjk_series",
        catalogId: "jjk_catalog",
        name: "Jujutsu Kaisen Episode 1-24",
        poster: "https://i.postimg.cc/dtrDLwFL/JJK-DP.jpg",
        description: "Jujutsu Kaisen Episode 1 hingga 24.",
        episodes: createEpisodes([
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a4d",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a4e",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a4f",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a50",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a51",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a52",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca81b6e979983cdce5a53",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca81d6e979983cdce5a54",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca81d6e979983cdce5a55",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca81d6e979983cdce5a56",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8206e979983cdce5a57",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8206e979983cdce5a58",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8256e979983cdce5a59",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8256e979983cdce5a5a",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca83a6e979983cdce5a5b",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca83b6e979983cdce5a5c",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca83b6e979983cdce5a5d",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca83b6e979983cdce5a5e",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8406e979983cdce5a5f",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8406e979983cdce5a60",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8406e979983cdce5a61",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8466e979983cdce5a62",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8466e979983cdce5a63",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8466e979983cdce5a64"
        ])
    },
    "boruto_catalog": {
        id: "boruto_series",
        catalogId: "boruto_catalog",
        name: "Boruto Collection",
        poster: "https://i.postimg.cc/BZdkmGKm/Boruto-1.jpg",
        description: "Koleksi Boruto Episod terpilih.",
        episodes: createEpisodes([
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca26e6e979983cdce59d3",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca26e6e979983cdce59d4",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca26e6e979983cdce59d5",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2736e979983cdce59d6",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca27a6e979983cdce59d7",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2a06e979983cdce59d8",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2a06e979983cdce59d9",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2a06e979983cdce59da",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2a66e979983cdce59db",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2a66e979983cdce59dc",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2aa6e979983cdce59dd",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2ab6e979983cdce59de",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2ab6e979983cdce59df",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2b16e979983cdce59e0",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2b16e979983cdce59e1",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2dc6e979983cdce59e2",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e06e979983cdce59e3",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e06e979983cdce59e4",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e16e979983cdce59e6",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e16e979983cdce59e5",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e66e979983cdce59e7",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e66e979983cdce59e8",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2eb6e979983cdce59e9",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2ec6e979983cdce59ea",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2ec6e979983cdce59eb",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2f26e979983cdce59ec",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3186e979983cdce59ed",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca31e6e979983cdce59ee",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca31e6e979983cdce59ef",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3246e979983cdce59f0",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3246e979983cdce59f1",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3256e979983cdce59f2",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3296e979983cdce59f3",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3296e979983cdce59f4",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3296e979983cdce59f5",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca32f6e979983cdce59f6",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca32f6e979983cdce59f7",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3546e979983cdce59f8",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca35a6e979983cdce59f9",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca35c6e979983cdce59fa",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca35f6e979983cdce59fb",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca35f6e979983cdce59fc",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3606e979983cdce59fd",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3606e979983cdce59fe",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3656e979983cdce59ff",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3906e979983cdce5a00",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3906e979983cdce5a01",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3906e979983cdce5a02",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3956e979983cdce5a03",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca39b6e979983cdce5a04",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca39b6e979983cdce5a05",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca39b6e979983cdce5a06",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3a06e979983cdce5a07",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3a06e979983cdce5a08",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3a06e979983cdce5a09",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3a56e979983cdce5a0a",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3cd6e979983cdce5a0b",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3cd6e979983cdce5a0c",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3cd6e979983cdce5a0d",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3d26e979983cdce5a0e",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3d76e979983cdce5a0f",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3d76e979983cdce5a10",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3d76e979983cdce5a11",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3d76e979983cdce5a12",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3dc6e979983cdce5a13",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3dd6e979983cdce5a14",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a15",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a16",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a17",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a18",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a19",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a1a",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca60d6e979983cdce5a1b",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca60d6e979983cdce5a1c",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca60d6e979983cdce5a1d",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca60d6e979983cdce5a1e",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6136e979983cdce5a1f",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6136e979983cdce5a20",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6196e979983cdce5a21",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a3d",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a3c",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a39",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a3a",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a3b",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a38",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7866e979983cdce5a40",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7866e979983cdce5a3f",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7866e979983cdce5a3e",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7866e979983cdce5a41",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca78c6e979983cdce5a42",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca78c6e979983cdce5a43",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7916e979983cdce5a45",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7916e979983cdce5a44",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7916e979983cdce5a46",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7bd6e979983cdce5a47",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7bd6e979983cdce5a48",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7bd6e979983cdce5a49",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7c26e979983cdce5a4a",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7c26e979983cdce5a4c",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7c26e979983cdce5a4b",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1706e979983cdce59a6",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1706e979983cdce59a5",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1706e979983cdce59a3",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1706e979983cdce59a4",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1706e979983cdce59a2",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1706e979983cdce59a7",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1786e979983cdce59a8",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1786e979983cdce59a9",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1786e979983cdce59aa",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1786e979983cdce59ab",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca17e6e979983cdce59ac",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca17e6e979983cdce59ad",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1836e979983cdce59ae",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1836e979983cdce59af",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1836e979983cdce59b0",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1836e979983cdce59b1",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1af6e979983cdce59b2",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1af6e979983cdce59b3",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1b46e979983cdce59b4",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1b46e979983cdce59b5",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1ba6e979983cdce59b6",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1ba6e979983cdce59b7",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1ba6e979983cdce59b8",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1bf6e979983cdce59b9",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1bf6e979983cdce59ba",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1eb6e979983cdce59bb",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1eb6e979983cdce59bc",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1ec6e979983cdce59bd",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1f06e979983cdce59be",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1f06e979983cdce59bf",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1f06e979983cdce59c0",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1f66e979983cdce59c1",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1f66e979983cdce59c2",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1fa6e979983cdce59c3",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1fb6e979983cdce59c4",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2276e979983cdce59c5",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2276e979983cdce59c6",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca22d6e979983cdce59c7",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca22d6e979983cdce59c8",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca22d6e979983cdce59c9",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2336e979983cdce59ca",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2336e979983cdce59cb",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2386e979983cdce59cc",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2386e979983cdce59cd",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2396e979983cdce59ce",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2636e979983cdce59cf",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2636e979983cdce59d0",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2686e979983cdce59d1",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2686e979983cdce59d2"
        ])
    },
    "hagemaru_full_catalog": {
        id: "hagemaru_full_series",
        catalogId: "hagemaru_full_catalog",
        name: "Hagemaru Collection",
        poster: "https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg",
        description: "Koleksi Episod Hagemaru.",
        episodes: createEpisodes([
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a26",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a24",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a22",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a23",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a25",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a27",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6b16e979983cdce5a28",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6b36e979983cdce5a2b",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6b36e979983cdce5a29",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6b36e979983cdce5a2a",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6b66e979983cdce5a2c",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6b66e979983cdce5a2d",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6bc6e979983cdce5a2e",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6bc6e979983cdce5a2f",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6bc6e979983cdce5a30",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6bc6e979983cdce5a31",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6ef6e979983cdce5a32",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6ef6e979983cdce5a33",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6ef6e979983cdce5a34",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6ef6e979983cdce5a35",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6f66e979983cdce5a36",
            "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6fa6e979983cdce5a37"
        ])
    },
    "doraemon_movie_catalog": {
        id: "doraemon_movie_catalog",
        isMulti: true,
        items: [
            { id: "dm_parallel_visit", name: "Doraemon: The Record of Nobita's Parallel Visit to the West (1988)", poster: "https://i.postimg.cc/K8McK6Wz/D1.jpg", description: "Doraemon Movie 1988", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a66" },
            { id: "dm_treasure_island", name: "Doraemon: Nobita's Treasure Island (2018)", poster: "https://i.postimg.cc/cJGxfDqT/D2.jpg", description: "Doraemon Movie 2018 Malay Dubbed", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a68" },
            { id: "dm_kachi_kochi", name: "Doraemon: Great Adventure in The Antarctic Kachi Kochi (2017)", poster: "https://i.postimg.cc/L814qcbG/D3.jpg", description: "Doraemon Movie 2017", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a67" },
            { id: "dm_2003_nobita", name: "Doraemon 2003 Nobita", poster: "https://i.postimg.cc/SKLydWkb/D4.jpg", description: "Doraemon Movie 2003", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a65" },
            { id: "dm_stand_by_me", name: "Doraemon Stand By Me (2014)", poster: "https://i.postimg.cc/tCfC4q2W/D5.jpg", description: "Doraemon Stand By Me Malay Dubbed", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a69" },
            { id: "dm_antartika_2017", name: "Doraemon 2017 - Benua Antartika", poster: "https://i.postimg.cc/9FSFQmJy/D6.jpg", description: "Doraemon 2017 Malay Dub", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a6a" },
            { id: "dm_steel_troops", name: "Doraemon Nobita and the Steel Troops (1986)", poster: "https://i.postimg.cc/QxVdD9kK/D7.jpg", description: "Doraemon Movie 1986", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab256e979983cdce5a6c" },
            { id: "dm_robot_kingdom", name: "Doraemon Nobita in the Robot Kingdom (2002)", poster: "https://i.postimg.cc/YqjC7Gfh/D8.jpg", description: "Doraemon Movie 2002", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab256e979983cdce5a6d" },
            { id: "dm_haunts_of_evil", name: "Doraemon Nobita and the Haunts of Evil (1982)", poster: "https://i.postimg.cc/yYW8KgXX/D9.jpg", description: "Doraemon Movie 1982", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab256e979983cdce5a6b" },
            { id: "dm_undersea_devil", name: "Doraemon Nobita and the Castle of the Undersea Devil (1983)", poster: "https://i.postimg.cc/3wjK1g71/D10.jpg", description: "Doraemon Movie 1983", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab256e979983cdce5a6e" },
            { id: "dm_birth_of_japan", name: "Doraemon Nobita and the Birth of Japan (2016)", poster: "https://i.postimg.cc/8kZzxBWS/D11.jpg", description: "Doraemon Movie 2016", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab2b6e979983cdce5a70" },
            { id: "dm_spacetime_odyssey", name: "Doraemon Nobita in the Wan Nyan Spacetime Odyssey (2004)", poster: "https://i.postimg.cc/FFTHwgSq/D12.jpg", description: "Doraemon Movie 2004", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab2a6e979983cdce5a6f" },
            { id: "dm_movie_extra_1", name: "Doraemon Movie Special 1", poster: "https://i.postimg.cc/Bb7ZD43r/D13.png", description: "Doraemon Special Movie", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab306e979983cdce5a71" },
            { id: "dm_dinosaur_2006", name: "Doraemon Nobita's Dinosaur (2006)", poster: "https://i.postimg.cc/90gXTCVq/D14.webp", description: "Doraemon Movie 2006", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab306e979983cdce5a72" }
        ]
    },
    "naruto_movie_catalog": {
        id: "naruto_movie_catalog",
        isMulti: true,
        items: [
            { id: "nm_3", name: "Naruto The Movie 3: Guardians of the Crescent Moon Kingdom", poster: "https://i.postimg.cc/qvRm0kWy/Naruto-The-Movie-3-Guardians-of-the-Crescent-Moon-Kingdom-(Malay-Dub).jpg", description: "Naruto Movie 3 Malay Dub", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accaf986e979983cdce5a74" },
            { id: "nm_stone_of_gelel", name: "Naruto The Movie: Legend of the Stone of Gelel", poster: "https://i.postimg.cc/7Z6BDxj2/Naruto-the-Movie-Legend-of-the-Stone-of-Gelel.jpg", description: "Naruto Movie Legend of the Stone of Gelel", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accaf986e979983cdce5a75" },
            { id: "nm_land_of_snow", name: "Naruto The Movie: Ninja Clash in the Land of Snow", poster: "https://i.postimg.cc/SxsZqyH8/Naruto-the-Movie-Ninja-Clash-in-the-Land-of-Snow.jpg", description: "Naruto Movie Ninja Clash in the Land of Snow", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accaf986e979983cdce5a73" }
        ]
    },
    "chibi_maruko_catalog": {
        id: "chibi_maruko_catalog",
        isMulti: true,
        items: [
            { id: "cm_ono_sugiyama", name: "Chibi Maruko Chan: Ono and Sugiyama (1990)", poster: "https://i.postimg.cc/ZnmB5THS/c1.jpg", description: "Chibi Maruko Chan Movie Remastered", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accafdb6e979983cdce5a76" }
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
// 4. CONFIGURATOR UI WEB INTERFACE (WITH ANALYTICS)
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
            <!-- Analytics Row -->
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

            <!-- Configuration Row -->
            <div class="row">
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
