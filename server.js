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
// HELPER FUNCTION UNTUK TAJUK & DESCRIPTION EPISOD
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
    version: "4.2.0",
    name: "DaRyz Collection Addon",
    description: "Addon Stremio/Nuvio dengan katalog siri, ceramah, dan filem tersusun.",
    resources: ["catalog", "stream", "meta"],
    types: ["series"],
    idPrefixes: [
        "kisah_sahabat_series", "running_man_series", "mm_", "mahsyar_series", "filem_dakwah_sengketa_series", "hagemaru_series", "ninja_boy_series", 
        "doraemon_series", "pokemon_journeys_series", "midori_days_series", "anak_anak_sidek_series", 
        "ueki_series", "ginban_series", "black_cat_series", "digimon_savers_series", 
        "digimon_01_series", "shin_chan_series", "akhir_zaman_series", "kd_malay_series", "kd_eng_series"
    ],
    catalogs: [
        { type: "series", id: "running_man_catalog", name: "Runningman" },
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
            { title: "Episod 100: Mecenatpolis", description: "War of the Gods.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc023e6e979983cdce55c1" },
            { title: "Episod 101: Korea Institute of Science and Technology", description: "CSI vs Criminals Special.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55dd" },
            { title: "Episod 102: SBS Tanhyeon-dong Production Center", description: "Drama Special Gold Turtle Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55da" },
            { title: "Episod 103: S-Oil Building", description: "Shin Se Kyung, Yoo Joon Sang, No Sa Yeon.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55dc" },
            { title: "Episod 104: Hanseong Baekje Museum", description: "Idol Olympics Special.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55d9" },
            { title: "Episod 105: Aqua Planet Jeju", description: "Money Backpack Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55d8" },
            { title: "Episod 106: Daum Communications Office", description: "Love Compatibility Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55db" },
            { title: "Episod 107: Yonsei University International Campus", description: "Running Man Gold Statue Search.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ad6e979983cdce55de" },
            { title: "Episod 108: NS Home Shopping Building", description: "All Star Battle: Park Tae-hwan and Son Yeon-jae.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ad6e979983cdce55df" },
            { title: "Episod 109: Herb Island, Pocheon", description: "Olympic Stars Special Part 1.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ad6e979983cdce55e0" },
            { title: "Episod 110: Daejin University", description: "Olympic Stars Special Part 2.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ad6e979983cdce55e1" },
            { title: "Episod 111: National Maritime Museum", description: "Busan Special.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b36e979983cdce55e2" },
            { title: "Episod 112: Moorim P&P Paper Mill", description: "Paper Mill Target Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b86e979983cdce55e3" },
            { title: "Episod 113: Samcheonggak", description: "Absolute Taste Chuseok Special.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b86e979983cdce55e5" },
            { title: "Episod 114: Culture Park, Yeonsu-gu", description: "X-Man Special Revenge Match.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b86e979983cdce55e4" },
            { title: "Episod 115: Coast Guard Main Station", description: "Coast Guard Training with TVXQ.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b96e979983cdce55e7" },
            { title: "Episod 116: Suncheon Open Set", description: "The Great Seer Time Travel Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b96e979983cdce55e6" },
            { title: "Episod 117: Asian Culture Complex", description: "Riddle Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68e46e979983cdce55e8" },
            { title: "Episod 118: Jungnang Camp Ground", description: "Choi Min-soo Sniper Returns.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68e96e979983cdce55e9" },
            { title: "Episod 119: Gongrung Youth Baseball Park", description: "Superpower Baseball Special.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68e96e979983cdce55eb" },
            { title: "Episod 120: Poeun Art Hall", description: "Secret Agent Mission with Lee Seung-gi.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68e96e979983cdce55ea" },
            { title: "Episod 121: SBS Prism Tower", description: "007 Water Virus Special.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ef6e979983cdce55ed" },
            { title: "Episod 122: Rockcamp", description: "80s 90s Legendary Singers Special.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ef6e979983cdce55ec" },
            { title: "Episod 123: Song Cham Bong Joseon Village", description: "Kim Soo-ro and Han Hyo-joo Kimchi Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ef6e979983cdce55ee" },
            { title: "Episod 124: Jeonju University", description: "King of Kings Gold Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68f46e979983cdce55ef" },
            { title: "Episod 125: Busan Christmas Special", description: "Choi Ji-woo Christmas Special.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68f56e979983cdce55f0" },
            { title: "Episod 126: Choi Ji-woo vs Running Man", description: "Cheongju Spy Game.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68f56e979983cdce55f1" },
            { title: "Episod 127: Jangsado Sea Park", description: "Snake Year Special.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc691f6e979983cdce55f2" },
            { title: "Episod 128: SBS Broadcasting Center", description: "Boy Scouts vs Girl Scouts Battle.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69256e979983cdce55f4" },
            { title: "Episod 129: National Institute of Biological Resources", description: "Idol Winter Olympics.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69256e979983cdce55f3" },
            { title: "Episod 130: New Seoul City Hall", description: "Reincarnation Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc692a6e979983cdce55f5" },
            { title: "Episod 131: Yongyu Train Depot", description: "Bounty Hunters Ddakji.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc692b6e979983cdce55f6" },
            { title: "Episod 132: Asiana Town", description: "Actors vs Singers.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc692f6e979983cdce55f7" },
            { title: "Episod 133: Macau", description: "Asia Race Part I in Macau.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc692f6e979983cdce55f8" },
            { title: "Episod 134: Keangnam Hanoi Landmark Tower", description: "Asia Race Part II in Vietnam.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69306e979983cdce55f9" },
            { title: "Episod 135: Kwanghee Fashion Mall", description: "Jackie Chan joins as treasure hunter.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69356e979983cdce55fa" },
            { title: "Episod 136: Hoa Lu", description: "Asia Race Part III in Vietnam.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69606e979983cdce55fb" },
            { title: "Episod 137: Jo in Joo Boxing Club", description: "Princesses and On Dals.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69606e979983cdce55fd" },
            { title: "Episod 138: Haewon High School", description: "School race with Kim Woo-bin.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69606e979983cdce55fc" },
            { title: "Episod 139: The MVL Hotel Kintex", description: "That Winter, the Typhoon Blows.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69666e979983cdce55fe" },
            { title: "Episod 140: Ecoplex", description: "Rage Virus outbreak.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69666e979983cdce55ff" },
            { title: "Episod 141: Animal Kingdom", description: "King of the Animals at Everland.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc696b6e979983cdce5600" },
            { title: "Episod 142: Gwangnaru Safety Experience Center", description: "Best Couple Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc696b6e979983cdce5601" },
            { title: "Episod 143: Seoul City Hall", description: "Superpower Karaoke Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc696c6e979983cdce5602" },
            { title: "Episod 144: Namsan Elementary School", description: "Children's Day Special Ddakji.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc696c6e979983cdce5603" },
            { title: "Episod 145: Gyeonggi English Village Paju Camp", description: "Running Men vs Laws of the Jungle.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69716e979983cdce5604" },
            { title: "Episod 146: Wolseong Nuclear Energy Information Center", description: "Betrayer Club Arrest.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc699c6e979983cdce5605" },
            { title: "Episod 147: Sogang University", description: "Flower Boy Athletic Tournament.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc699c6e979983cdce5606" },
            { title: "Episod 148: Gapyeong Gymnasium", description: "Eating Board of Jumanji.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a26e979983cdce5607" },
            { title: "Episod 149: National Folk Museum of Korea", description: "My love, Gumiho.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a26e979983cdce5608" },
            { title: "Episod 150: Square1", description: "Avengers Superhero Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a36e979983cdce5609" },
            { title: "Episod 151: SBS Broadcasting Center", description: "King of the Killers.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a86e979983cdce560b" },
            { title: "Episod 152: Baekje Cultural Complex", description: "Vacances Special.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a86e979983cdce560a" },
            { title: "Episod 153: Korea Polar Research Institute", description: "Return of the Captain.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a86e979983cdce560c" },
            { title: "Episod 154: Hongkou Football Stadium", description: "Shanghai Dream Cup 2013.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a86e979983cdce560d" },
            { title: "Episod 155: Incheon National University", description: "Destiny's Pairs ghost story.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69ad6e979983cdce560e" },
            { title: "Episod 156: Hangang Park", description: "Alien Invasion water collection.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69d46e979983cdce560f" },
            { title: "Episod 157: Tangeum Lake International Rowing Stadium", description: "Courtroom Parody.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69d46e979983cdce5610" },
            { title: "Episod 158: Goyang Aqua Studio", description: "Number Hide and Seek.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69d46e979983cdce5611" },
            { title: "Episod 159: Yangju, Gyeonggi-do", description: "Strongest Couple Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69d96e979983cdce5612" },
            { title: "Episod 160: Daeijak Island", description: "Ranking Organization vs Pirates.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69da6e979983cdce5613" },
            { title: "Episod 161: Seungbong Island", description: "Curse of the Gold Pirate.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69da6e979983cdce5614" },
            { title: "Episod 162: Old Cheongju Tobacco Factory", description: "Idol King Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69df6e979983cdce5616" },
            { title: "Episod 163: Icheon Art Hall", description: "Stealing Princess Ji-hyo's Heart.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69df6e979983cdce5615" },
            { title: "Episod 164: Great Inheritance", description: "Madame Go family race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69e46e979983cdce5617" },
            { title: "Episod 165: Wabu Middle School", description: "In Search for the Little Girl.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69e56e979983cdce5618" },
            { title: "Episod 166: SBS Broadcasting Center II", description: "The Heirs company shares.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a106e979983cdce5619" },
            { title: "Episod 167: National Museum of Korean Contemporary History", description: "Legend of the Troublemakers.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a116e979983cdce561a" },
            { title: "Episod 168: Suwon World Cup Stadium Swimming Pool", description: "IU and Park Myung-soo.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a156e979983cdce561b" },
            { title: "Episod 169: Mayhills Resort", description: "Find the Key of Freedom.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a156e979983cdce561c" },
            { title: "Episod 170: Samtan Art Mine", description: "Fellowship of Running Men Oz.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a166e979983cdce561d" },
            { title: "Episod 171: Lotte Outlets Buyeo Store", description: "Ryu Hyun-jin's Choice vs EXO.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a1b6e979983cdce561e" },
            { title: "Episod 172: Korean Folk Village", description: "Autumn Overnight Secret Spy Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a1b6e979983cdce561f" },
            { title: "Episod 173: Namyangju Little Baseball Park", description: "Superpower Baseball.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a1b6e979983cdce5620" },
            { title: "Episod 174: 'R' Warehouse", description: "The Number 14375.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a206e979983cdce5621" },
            { title: "Episod 175: POSCO Green Building", description: "Suspect Target Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a216e979983cdce5622" },
            { title: "Episod 176: SBS Broadcasting Center", description: "Men's Popularity Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a516e979983cdce5623" },
            { title: "Episod 177: Christmas Nightmare", description: "Gil Christmas Nightmare Special.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a526e979983cdce5624" },
            { title: "Episod 178: Han River Crossing Battle", description: "Boat Race against production team.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a526e979983cdce5625" },
            { title: "Episod 179: La Cuisine: Part 1", description: "Cooking Battle Part 1.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a526e979983cdce5626" },
            { title: "Episod 180: La Cuisine: Part 2", description: "Cooking Battle Part 2.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a576e979983cdce5627" },
            { title: "Episod 181: Romeo and Juliet", description: "Secret Couple Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a576e979983cdce5628" },
            { title: "Episod 182: SBS Tanhyeon-dong Production Center", description: "Janggi Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a576e979983cdce5629" },
            { title: "Episod 183: SBS Broadcasting Center", description: "Destined Partner.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a5c6e979983cdce562a" },
            { title: "Episod 184: Winter Olympics", description: "Winter Olympics Special.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a5c6e979983cdce562b" },
            { title: "Episod 185: Gwacheon National Science Museum", description: "My Love From a Running Star.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a5d6e979983cdce562c" },
            { title: "Episod 186: The Shilla Duty Free Shop", description: "Faces of Seoul Cultural Representatives.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a626e979983cdce562d" },
            { title: "Episod 187: Han River", description: "University Boat Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a896e979983cdce562e" },
            { title: "Episod 188: Australian Adventure I", description: "Australia Special Part 1.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a8f6e979983cdce562f" },
            { title: "Episod 189: Australian Adventure II", description: "Australia Special Part 2.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a906e979983cdce5631" },
            { title: "Episod 190: Seoul Metropolitan Fire Academy", description: "Entertainment vs Drama Rescue.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a906e979983cdce5630" },
            { title: "Episod 191: Australian Adventure III", description: "Australia Special Part 3 Gold Rush.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a946e979983cdce5632" },
            { title: "Episod 192: Ttangkkeut Auto Camp I", description: "Cross Country Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a956e979983cdce5633" },
            { title: "Episod 193: Ttangkkeut Auto Camp II", description: "Mafia vs Civilian Part 1.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a956e979983cdce5634" },
            { title: "Episod 194: Ttangkkeut Auto Camp III", description: "Mafia vs Civilian Part 2.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a9a6e979983cdce5635" },
            { title: "Episod 195: Seoul Energy Dream Center", description: "MC Yoo Live Showdown Relay.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a9a6e979983cdce5636" },
            { title: "Episod 196: Severance Hospital", description: "Time Travel returning to past iconic episodes.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6ac96e979983cdce5637" },
            { title: "Episod 197: Jamsil Students' Gymnasium", description: "National College Ddakji Tournament.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6aca6e979983cdce5638" },
            { title: "Episod 198: Couple Race", description: "Romancing the Stones.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6acb6e979983cdce5639" },
            { title: "Episod 199: Asian Dream Cup 2014 Special", description: "Training for Dream Cup.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6ace6e979983cdce563b" },
            { title: "Episod 200: Taman Safari Indonesia", description: "Asian Dream Cup Penalty Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6ace6e979983cdce563a" },
            { title: "Episod 346", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7e9b6e979983cdce56d0" },
            { title: "Episod 347", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7e9b6e979983cdce56d2" },
            { title: "Episod 348", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7e9b6e979983cdce56d1" },
            { title: "Episod 349", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7e9b6e979983cdce56cd" },
            { title: "Episod 350", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7e9b6e979983cdce56ce" },
            { title: "Episod 351", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7e9b6e979983cdce56cf" },
            { title: "Episod 352", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ea36e979983cdce56d3" },
            { title: "Episod 353", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ea36e979983cdce56d6" },
            { title: "Episod 354", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ea36e979983cdce56d5" },
            { title: "Episod 355", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ea36e979983cdce56d4" },
            { title: "Episod 356", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ea96e979983cdce56d7" },
            { title: "Episod 357", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ea96e979983cdce56d8" },
            { title: "Episod 358", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7eae6e979983cdce56da" },
            { title: "Episod 359", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7eae6e979983cdce56db" },
            { title: "Episod 360", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7eae6e979983cdce56d9" },
            { title: "Episod 361", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7eda6e979983cdce56dc" },
            { title: "Episod 362", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7edf6e979983cdce56de" },
            { title: "Episod 363", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7edf6e979983cdce56dd" },
            { title: "Episod 364", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ee06e979983cdce56e0" },
            { title: "Episod 365", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ee06e979983cdce56df" },
            { title: "Episod 366", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ee06e979983cdce56e1" },
            { title: "Episod 367", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ee56e979983cdce56e2" },
            { title: "Episod 368", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7eea6e979983cdce56e3" },
            { title: "Episod 369", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7eea6e979983cdce56e4" },
            { title: "Episod 370", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f166e979983cdce56e5" },
            { title: "Episod 371", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f166e979983cdce56e6" },
            { title: "Episod 372", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f166e979983cdce56e7" },
            { title: "Episod 373", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f1c6e979983cdce56e8" },
            { title: "Episod 374", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f1c6e979983cdce56ea" },
            { title: "Episod 375", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f1c6e979983cdce56e9" },
            { title: "Episod 376", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f226e979983cdce56eb" },
            { title: "Episod 377", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f226e979983cdce56ec" },
            { title: "Episod 378", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f286e979983cdce56ee" },
            { title: "Episod 379", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f286e979983cdce56ed" },
            { title: "Episod 380", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f526e979983cdce56ef" },
            { title: "Episod 381", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f536e979983cdce56f0" },
            { title: "Episod 382", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f536e979983cdce56f1" },
            { title: "Episod 383", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f596e979983cdce56f3" },
            { title: "Episod 384", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f596e979983cdce56f2" },
            { title: "Episod 385", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f5e6e979983cdce56f4" },
            { title: "Episod 386", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f5f6e979983cdce56f5" },
            { title: "Episod 387", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f5f6e979983cdce56f6" },
            { title: "Episod 388", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f646e979983cdce56f7" },
            { title: "Episod 389", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f646e979983cdce56f8" },
            { title: "Episod 390", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f646e979983cdce56f9" },
            { title: "Episod 391", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f646e979983cdce56fa" },
            { title: "Episod 392", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f936e979983cdce56fb" },
            { title: "Episod 393", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f936e979983cdce56fc" },
            { title: "Episod 394", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f946e979983cdce56fd" },
            { title: "Episod 395", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f986e979983cdce56fe" },
            { title: "Episod 396", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f996e979983cdce56ff" },
            { title: "Episod 397", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f9d6e979983cdce5700" },
            { title: "Episod 398", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f9e6e979983cdce5702" },
            { title: "Episod 399", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f9e6e979983cdce5701" },
            { title: "Episod 400", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fa36e979983cdce5703" },
            { title: "Episod 401", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fa36e979983cdce5704" },
            { title: "Episod 402", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fcf6e979983cdce5705" },
            { title: "Episod 403", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fcf6e979983cdce5706" },
            { title: "Episod 404", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fcf6e979983cdce5707" },
            { title: "Episod 405", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fcf6e979983cdce5708" },
            { title: "Episod 406", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fd56e979983cdce5709" },
            { title: "Episod 407", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fd56e979983cdce570a" },
            { title: "Episod 408", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fda6e979983cdce570b" },
            { title: "Episod 409", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fdb6e979983cdce570c" },
            { title: "Episod 410", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fdb6e979983cdce570d" },
            { title: "Episod 411", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc800c6e979983cdce570e" },
            { title: "Episod 412", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc800d6e979983cdce570f" },
            { title: "Episod 413", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80116e979983cdce5710" },
            { title: "Episod 414", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80116e979983cdce5711" },
            { title: "Episod 415", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80116e979983cdce5712" },
            { title: "Episod 416", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80116e979983cdce5713" },
            { title: "Episod 417", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80166e979983cdce5714" },
            { title: "Episod 418", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80176e979983cdce5715" },
            { title: "Episod 419", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc801c6e979983cdce5716" },
            { title: "Episod 420", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc801c6e979983cdce5717" },
            { title: "Episod 421", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80486e979983cdce5719" },
            { title: "Episod 422", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80486e979983cdce5718" },
            { title: "Episod 423", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc804d6e979983cdce571a" },
            { title: "Episod 424", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc804d6e979983cdce571b" },
            { title: "Episod 425", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc804e6e979983cdce571c" },
            { title: "Episod 426", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc804e6e979983cdce571d" },
            { title: "Episod 427", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80536e979983cdce571f" },
            { title: "Episod 428", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80536e979983cdce571e" },
            { title: "Episod 429", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80586e979983cdce5720" },
            { title: "Episod 430", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80586e979983cdce5721" },
            { title: "Episod 431", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80586e979983cdce5722" },
            { title: "Episod 432", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80846e979983cdce5724" },
            { title: "Episod 433", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80846e979983cdce5723" },
            { title: "Episod 434", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80896e979983cdce5726" },
            { title: "Episod 435", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80896e979983cdce5725" },
            { title: "Episod 436", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc808a6e979983cdce5727" },
            { title: "Episod 437", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc808f6e979983cdce5729" },
            { title: "Episod 438", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc808f6e979983cdce5728" },
            { title: "Episod 439", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80946e979983cdce572a" },
            { title: "Episod 440", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80946e979983cdce572b" },
            { title: "Episod 441", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80946e979983cdce572c" },
            { title: "Episod 442", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80c66e979983cdce572d" },
            { title: "Episod 443", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80c66e979983cdce572e" },
            { title: "Episod 444", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80c66e979983cdce572f" },
            { title: "Episod 445", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80c66e979983cdce5730" },
            { title: "Episod 446", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80c86e979983cdce5731" },
            { title: "Episod 447", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80cb6e979983cdce5732" },
            { title: "Episod 448", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80cc6e979983cdce5733" },
            { title: "Episod 449", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80d06e979983cdce5734" },
            { title: "Episod 450", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80d06e979983cdce5735" },
            { title: "Episod 451", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80fc6e979983cdce5736" },
            { title: "Episod 452", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80fc6e979983cdce5737" },
            { title: "Episod 453", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81036e979983cdce5739" },
            { title: "Episod 454", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81036e979983cdce5738" },
            { title: "Episod 455", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81046e979983cdce573a" },
            { title: "Episod 456", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81086e979983cdce573b" },
            { title: "Episod 457", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81086e979983cdce573c" },
            { title: "Episod 458", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81086e979983cdce573d" },
            { title: "Episod 459", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc810e6e979983cdce573e" },
            { title: "Episod 460", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81386e979983cdce573f" },
            { title: "Episod 461", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81386e979983cdce5740" },
            { title: "Episod 462", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc813d6e979983cdce5741" },
            { title: "Episod 463", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc813e6e979983cdce5742" },
            { title: "Episod 464", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81436e979983cdce5743" },
            { title: "Episod 465", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81436e979983cdce5744" },
            { title: "Episod 466", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81436e979983cdce5745" },
            { title: "Episod 467", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81486e979983cdce5746" },
            { title: "Episod 468", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81496e979983cdce5747" },
            { title: "Episod 469", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc814d6e979983cdce5748" },
            { title: "Episod 470", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc814d6e979983cdce5749" },
            { title: "Episod 471", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81756e979983cdce574a" },
            { title: "Episod 472", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81756e979983cdce574b" },
            { title: "Episod 473", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc817a6e979983cdce574c" },
            { title: "Episod 474", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc817b6e979983cdce574d" },
            { title: "Episod 475", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc817b6e979983cdce574e" },
            { title: "Episod 476", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc817f6e979983cdce574f" },
            { title: "Episod 477", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81806e979983cdce5750" },
            { title: "Episod 478", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81806e979983cdce5751" },
            { title: "Episod 479", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81866e979983cdce5752" },
            { title: "Episod 480", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81866e979983cdce5753" },
            { title: "Episod 481", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81b06e979983cdce5754" },
            { title: "Episod 482", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81b56e979983cdce5755" },
            { title: "Episod 483", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81b56e979983cdce5757" },
            { title: "Episod 484", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81b56e979983cdce5756" },
            { title: "Episod 485", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81b56e979983cdce5758" },
            { title: "Episod 486", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81bb6e979983cdce5759" },
            { title: "Episod 487", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81bb6e979983cdce575a" },
            { title: "Episod 488", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81c06e979983cdce575b" },
            { title: "Episod 489", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81c16e979983cdce575c" },
            { title: "Episod 490", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81c56e979983cdce575d" },
            { title: "Episod 491", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81f26e979983cdce575e" },
            { title: "Episod 492", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81f36e979983cdce575f" },
            { title: "Episod 493", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81f76e979983cdce5760" },
            { title: "Episod 494", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81f76e979983cdce5761" },
            { title: "Episod 495", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81f76e979983cdce5762" },
            { title: "Episod 496", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81f86e979983cdce5763" },
            { title: "Episod 497", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81fc6e979983cdce5764" },
            { title: "Episod 498", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81fc6e979983cdce5765" },
            { title: "Episod 499", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82026e979983cdce5766" },
            { title: "Episod 500", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82026e979983cdce5767" },
            { title: "Episod 501", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82026e979983cdce5768" },
            { title: "Episod 502", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc822d6e979983cdce5769" },
            { title: "Episod 503", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82fc6e979983cdce578e" },
            { title: "Episod 504", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc822e6e979983cdce576a" },
            { title: "Episod 505", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc822f6e979983cdce576b" },
            { title: "Episod 506", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82336e979983cdce576d" },
            { title: "Episod 507", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82336e979983cdce576c" },
            { title: "Episod 508", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82386e979983cdce576e" },
            { title: "Episod 509", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82386e979983cdce576f" },
            { title: "Episod 510", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc823d6e979983cdce5770" },
            { title: "Episod 511", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc823d6e979983cdce5771" },
            { title: "Episod 512", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc826b6e979983cdce5772" },
            { title: "Episod 513", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc826b6e979983cdce5773" },
            { title: "Episod 514", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82716e979983cdce5774" },
            { title: "Episod 515", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82716e979983cdce5775" },
            { title: "Episod 516", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82766e979983cdce5776" },
            { title: "Episod 517", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82766e979983cdce5778" },
            { title: "Episod 518", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82766e979983cdce5777" },
            { title: "Episod 519", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82766e979983cdce5779" },
            { title: "Episod 520", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc827b6e979983cdce577a" },
            { title: "Episod 521", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc827b6e979983cdce577b" },
            { title: "Episod 522", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82ac6e979983cdce577c" },
            { title: "Episod 523", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82b26e979983cdce577d" },
            { title: "Episod 524", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82b36e979983cdce577e" },
            { title: "Episod 525", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82b36e979983cdce577f" },
            { title: "Episod 526", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82b36e979983cdce5780" },
            { title: "Episod 527", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82b86e979983cdce5782" },
            { title: "Episod 528", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82b86e979983cdce5781" },
            { title: "Episod 529", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82b86e979983cdce5783" },
            { title: "Episod 530", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82be6e979983cdce5784" },
            { title: "Episod 531", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82ec6e979983cdce5785" },
            { title: "Episod 532", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82ee6e979983cdce5787" },
            { title: "Episod 533", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82ee6e979983cdce5786" },
            { title: "Episod 534", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82f16e979983cdce5788" },
            { title: "Episod 535", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82f16e979983cdce5789" },
            { title: "Episod 536", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82f16e979983cdce578a" },
            { title: "Episod 537", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82f36e979983cdce578b" },
            { title: "Episod 538", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82fc6e979983cdce578c" },
            { title: "Episod 539", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82fc6e979983cdce578d" },
            { title: "Episod 540", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82fc6e979983cdce578f" },
            { title: "Episod 541", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc832d6e979983cdce5790" },
            { title: "Episod 542", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc832e6e979983cdce5791" },
            { title: "Episod 543", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc832e6e979983cdce5792" },
            { title: "Episod 544", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83306e979983cdce5793" },
            { title: "Episod 545", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83336e979983cdce5795" },
            { title: "Episod 546", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83336e979983cdce5794" },
            { title: "Episod 547", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83346e979983cdce5797" },
            { title: "Episod 548", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83346e979983cdce5796" },
            { title: "Episod 549", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83396e979983cdce5798" },
            { title: "Episod 550", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83396e979983cdce5799" },
            { title: "Episod 551", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83646e979983cdce579a" },
            { title: "Episod 552", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83656e979983cdce579b" },
            { title: "Episod 553", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83696e979983cdce579c" },
            { title: "Episod 554", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc836b6e979983cdce579d" },
            { title: "Episod 555", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc836f6e979983cdce579e" },
            { title: "Episod 556", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83706e979983cdce579f" },
            { title: "Episod 557", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83706e979983cdce57a0" },
            { title: "Episod 558", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83746e979983cdce57a1" },
            { title: "Episod 559", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83756e979983cdce57a2" },
            { title: "Episod 560", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88716e979983cdce57a8" },
            { title: "Episod 561", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88716e979983cdce57a7" },
            { title: "Episod 562", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88716e979983cdce57a4" },
            { title: "Episod 563", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88716e979983cdce57a6" },
            { title: "Episod 564", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88716e979983cdce57a5" },
            { title: "Episod 565", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88716e979983cdce57a3" },
            { title: "Episod 566", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88796e979983cdce57a9" },
            { title: "Episod 567", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc887b6e979983cdce57ab" },
            { title: "Episod 568", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc887b6e979983cdce57aa" },
            { title: "Episod 569", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc887b6e979983cdce57ac" },
            { title: "Episod 570", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc887e6e979983cdce57ad" },
            { title: "Episod 571", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc887e6e979983cdce57ae" },
            { title: "Episod 572", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88846e979983cdce57af" },
            { title: "Episod 573", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88846e979983cdce57b0" },
            { title: "Episod 574", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88846e979983cdce57b1" },
            { title: "Episod 575", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88846e979983cdce57b2" },
            { title: "Episod 576", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88b46e979983cdce57b4" },
            { title: "Episod 577", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88b46e979983cdce57b3" },
            { title: "Episod 578", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88b46e979983cdce57b5" },
            { title: "Episod 579", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88b46e979983cdce57b6" },
            { title: "Episod 580", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88ba6e979983cdce57b7" },
            { title: "Episod 581", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88ba6e979983cdce57b8" },
            { title: "Episod 582", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88bf6e979983cdce57b9" },
            { title: "Episod 583", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88bf6e979983cdce57ba" },
            { title: "Episod 584", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88bf6e979983cdce57bb" },
            { title: "Episod 585", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88ec6e979983cdce57bd" },
            { title: "Episod 586", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88ec6e979983cdce57bc" },
            { title: "Episod 587", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88ed6e979983cdce57be" },
            { title: "Episod 588", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88f16e979983cdce57bf" },
            { title: "Episod 589", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88f36e979983cdce57c0" },
            { title: "Episod 590", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88f66e979983cdce57c1" },
            { title: "Episod 591", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88f86e979983cdce57c2" },
            { title: "Episod 592", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88fb6e979983cdce57c3" },
            { title: "Episod 593", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88fc6e979983cdce57c4" },
            { title: "Episod 594", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88fd6e979983cdce57c5" },
            { title: "Episod 595", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89296e979983cdce57c7" },
            { title: "Episod 596", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89296e979983cdce57c6" },
            { title: "Episod 597", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc892f6e979983cdce57c8" },
            { title: "Episod 598", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc892f6e979983cdce57c9" },
            { title: "Episod 599", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89306e979983cdce57ca" },
            { title: "Episod 600", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89356e979983cdce57cb" },
            { title: "Episod 601", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89356e979983cdce57cc" },
            { title: "Episod 602", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc893a6e979983cdce57cd" },
            { title: "Episod 603", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc893a6e979983cdce57ce" },
            { title: "Episod 604", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc893a6e979983cdce57cf" },
            { title: "Episod 605", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc893b6e979983cdce57d0" },
            { title: "Episod 606", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc896b6e979983cdce57d2" },
            { title: "Episod 607", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc896b6e979983cdce57d1" },
            { title: "Episod 608", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc896c6e979983cdce57d3" },
            { title: "Episod 609", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89716e979983cdce57d4" },
            { title: "Episod 610", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89716e979983cdce57d5" },
            { title: "Episod 611", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89766e979983cdce57d6" },
            { title: "Episod 612", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89766e979983cdce57d7" },
            { title: "Episod 613", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89766e979983cdce57d8" },
            { title: "Episod 614", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89776e979983cdce57d9" },
            { title: "Episod 615", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89a66e979983cdce57da" },
            { title: "Episod 616", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89a66e979983cdce57db" },
            { title: "Episod 617", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89a66e979983cdce57dc" },
            { title: "Episod 618", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89ab6e979983cdce57dd" },
            { title: "Episod 619", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89ab6e979983cdce57de" },
            { title: "Episod 620", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89ab6e979983cdce57df" },
            { title: "Episod 621", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89b16e979983cdce57e0" },
            { title: "Episod 622", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89b16e979983cdce57e1" },
            { title: "Episod 623", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89b66e979983cdce57e2" },
            { title: "Episod 624", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89b66e979983cdce57e3" },
            { title: "Episod 625", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89e26e979983cdce57e4" },
            { title: "Episod 626", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89e36e979983cdce57e5" },
            { title: "Episod 627", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89e36e979983cdce57e6" },
            { title: "Episod 628", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89e76e979983cdce57e7" },
            { title: "Episod 629", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89e76e979983cdce57e8" },
            { title: "Episod 630", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89e96e979983cdce57e9" },
            { title: "Episod 631", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89ed6e979983cdce57ea" },
            { title: "Episod 632", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89f26e979983cdce57eb" },
            { title: "Episod 633", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89f26e979983cdce57ec" },
            { title: "Episod 634", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89f36e979983cdce57ed" },
            { title: "Episod 635", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a1e6e979983cdce57ee" },
            { title: "Episod 636", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a236e979983cdce57ef" },
            { title: "Episod 637", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a236e979983cdce57f0" },
            { title: "Episod 638", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a296e979983cdce57f1" },
            { title: "Episod 639", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a296e979983cdce57f2" },
            { title: "Episod 640", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a296e979983cdce57f3" },
            { title: "Episod 641", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a2f6e979983cdce57f4" },
            { title: "Episod 642", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a2f6e979983cdce57f5" },
            { title: "Episod 643", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a2f6e979983cdce57f6" },
            { title: "Episod 644", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a356e979983cdce57f7" },
            { title: "Episod 645", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a5f6e979983cdce57f8" },
            { title: "Episod 646", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a5f6e979983cdce57f9" },
            { title: "Episod 647", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a616e979983cdce57fa" },
            { title: "Episod 648", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a616e979983cdce57fb" },
            { title: "Episod 649", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a666e979983cdce57fc" },
            { title: "Episod 650", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a666e979983cdce57fd" },
            { title: "Episod 651", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a666e979983cdce57fe" },
            { title: "Episod 652", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a6b6e979983cdce57ff" },
            { title: "Episod 653", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a6c6e979983cdce5800" },
            { title: "Episod 654", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a706e979983cdce5801" },
            { title: "Episod 655", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a706e979983cdce5802" },
            { title: "Episod 656", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a9b6e979983cdce5803" },
            { title: "Episod 657", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aa06e979983cdce5804" },
            { title: "Episod 658", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aa06e979983cdce5805" },
            { title: "Episod 659", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aa06e979983cdce5806" },
            { title: "Episod 660", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aa56e979983cdce5807" },
            { title: "Episod 661", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aa56e979983cdce5808" },
            { title: "Episod 662", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aa66e979983cdce5809" },
            { title: "Episod 663", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aaa6e979983cdce580a" },
            { title: "Episod 664", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aab6e979983cdce580b" },
            { title: "Episod 665", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aab6e979983cdce580c" },
            { title: "Episod 666", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8ad76e979983cdce580d" },
            { title: "Episod 667", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8adc6e979983cdce580e" },
            { title: "Episod 668", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8adc6e979983cdce580f" },
            { title: "Episod 669", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8ade6e979983cdce5810" },
            { title: "Episod 670", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8ae26e979983cdce5811" },
            { title: "Episod 671", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8ae26e979983cdce5812" },
            { title: "Episod 672", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8ae86e979983cdce5813" },
            { title: "Episod 673", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8ae96e979983cdce5814" },
            { title: "Episod 674", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8ae96e979983cdce5815" },
            { title: "Episod 675", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8b136e979983cdce5816" },
            { title: "Episod 676", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8b136e979983cdce5817" },
            { title: "Episod 677", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8b1a6e979983cdce5818" },
            { title: "Episod 678", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8b1a6e979983cdce5819" },
            { title: "Episod 679", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8b1b6e979983cdce581a" },
            { title: "Episod 680", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8c8c6e979983cdce581c" },
            { title: "Episod 681", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8c8c6e979983cdce581d" },
            { title: "Episod 682", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8c8c6e979983cdce581b" },
            { title: "Episod 683", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8c8c6e979983cdce5820" },
            { title: "Episod 684", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8c8c6e979983cdce581f" },
            { title: "Episod 685", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8c8c6e979983cdce581e" },
            { title: "Episod 686", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f246e979983cdce5823" },
            { title: "Episod 708", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f6e6e979983cdce5839" },
            { title: "Episod 709", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f746e979983cdce583a" },
            { title: "Episod 710", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f9f6e979983cdce583c" },
            { title: "Episod 711", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f9f6e979983cdce583b" },
            { title: "Episod 712", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f9f6e979983cdce583d" },
            { title: "Episod 713", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8fa56e979983cdce583e" },
            { title: "Episod 714", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8faa6e979983cdce583f" },
            { title: "Episod 715", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8faa6e979983cdce5840" },
            { title: "Episod 716", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8fab6e979983cdce5841" },
            { title: "Episod 717", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8fab6e979983cdce5842" },
            { title: "Episod 718", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8fab6e979983cdce5843" },
            { title: "Episod 719", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8fe06e979983cdce5844" },
            { title: "Episod 720", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90566e979983cdce5845" },
            { title: "Episod 721", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90566e979983cdce5849" },
            { title: "Episod 722", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90566e979983cdce5848" },
            { title: "Episod 723", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90566e979983cdce584a" },
            { title: "Episod 724", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90566e979983cdce5847" },
            { title: "Episod 725", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90566e979983cdce5846" },
            { title: "Episod 726", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc905e6e979983cdce584b" },
            { title: "Episod 727", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc905e6e979983cdce584c" },
            { title: "Episod 728", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc905f6e979983cdce584e" },
            { title: "Episod 729", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc905e6e979983cdce584d" },
            { title: "Episod 730", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90646e979983cdce584f" },
            { title: "Episod 731", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90656e979983cdce5850" },
            { title: "Episod 732", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90696e979983cdce5851" },
            { title: "Episod 733", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc92146e979983cdce5852" },
            { title: "Episod 734", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc92146e979983cdce5855" },
            { title: "Episod 735", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc92146e979983cdce5853" },
            { title: "Episod 736", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc92146e979983cdce5856" },
            { title: "Episod 737", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc92146e979983cdce5854" },
            { title: "Episod 738", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc92146e979983cdce5857" },
            { title: "Episod 739", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc921c6e979983cdce5858" },
            { title: "Episod 740", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc921c6e979983cdce5859" },
            { title: "Episod 741", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc921e6e979983cdce585a" },
            { title: "Episod 742", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc921e6e979983cdce585b" },
            { title: "Episod 743", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc92216e979983cdce585c" },
            { title: "Episod 744", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93796e979983cdce5862" },
            { title: "Episod 745", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93796e979983cdce5861" },
            { title: "Episod 746", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93796e979983cdce585f" },
            { title: "Episod 747", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93796e979983cdce585e" },
            { title: "Episod 748", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93796e979983cdce5860" },
            { title: "Episod 749", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93796e979983cdce585d" },
            { title: "Episod 750", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93826e979983cdce5863" },
            { title: "Episod 751", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93826e979983cdce5865" },
            { title: "Episod 752", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93826e979983cdce5867" },
            { title: "Episod 754", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93826e979983cdce5866" },
            { title: "Episod 757", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc938c6e979983cdce5869" },
            { title: "Episod 758", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc938c6e979983cdce586b" },
            { title: "Episod 771", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93fa6e979983cdce5878" },
            { title: "Episod 783", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94386e979983cdce5884" },
            { title: "Episod 798", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94816e979983cdce5893" },
            { title: "Episod 814", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f46e979983cdce58a3" }
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
            { id: "mm_dorm_melati", name: "Dorm Melati", poster: "https://i.postimg.cc/7hh7YCsm/dormmelati.jpg", description: "Filem Dorm Melati", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbf8f26e979983cdce54f" },
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
            { id: "mm_kelibat", name: "Kelibat", poster: "https://i.postimg.cc/kGHSVnzj/kelibat.jpg", description: "Filem Kelibat", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbfc7b6e979983cdce55bb" },
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
            { id: "mm_polong", name: "Polong", poster: "https://i.postimg.cc/C528ZF9K/polong.jpg", description: "Filem Polong", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc13f16e979983cdce55d2" },
            { id: "mm_senario_the_movie", name: "Senario The Movie", poster: "https://i.postimg.cc/90k94Wsr/senariothemovie.jpg", description: "Filem Senario The Movie", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc66136e979983cdce55d6" },
            { id: "mm_titisan_setan", name: "Titisan Setan", poster: "https://i.postimg.cc/59KLK3yS/titisansetan.jpg", description: "Filem Titisan Setan", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc66136e979983cdce55d7" },
            { id: "mm_sumpahan_kum_kum", name: "Sumpahan Kum-Kum", poster: "https://i.postimg.cc/jq3P3X2Q/sumpahankumkum.jpg", description: "Filem Sumpahan Kum-Kum", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc66136e979983cdce55d3" },
            { id: "mm_volkswagen_kuning", name: "Volkswagen Kuning", poster: "https://i.postimg.cc/KcpBpNjJ/volkswagenkuning.jpg", description: "Filem Volkswagen Kuning", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc66136e979983cdce55d4" },
            { id: "mm_senario_beach_boy", name: "Senario Beach Boy", poster: "https://i.postimg.cc/WzyZD2xt/senariobeachboy.jpg", description: "Filem Senario Beach Boy", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc66136e979983cdce55d5" }
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
                            overview: item.description,
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
        const videos = series.episodes.map((e, idx) => ({
            id: `${series.id}:1:${idx + 1}`,
            title: e.title,
            overview: e.overview || e.description || '',
            season: 1,
            episode: idx + 1,
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
        const ep = series.episodes[episodeNum - 1];
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
