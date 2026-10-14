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
        { type: "series", id: "running_man_catalog", name: "Runningman 1-200" },
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
        name: "Runningman 1-200",
        poster: "https://i.postimg.cc/wMYXFx0G/RM-2.jpg",
        description: "Koleksi Episod Running Man (Episod 1 - 200).",
        episodes: createEpisodes([
            { title: "Episod 1: Times Square", description: "Lee Hyori and Hwang Jung Eum join the casts for their first run. 2 teams are created 'Expensive' and 'Cheap' teams.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbff846e979983cdce555e" },
            { title: "Episod 2: Suwon World Cup Stadium, Part 1", description: "Lee Chun Hee and Goo Hara join in with the cast as they venture through Suwon stadium.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce5561" },
            { title: "Episod 3: Suwon World Cup Stadium, Part 2", description: "Continuing on from Episode 2. More fierce games pursue and only 1 team will come out victorious!", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce555f" },
            { title: "Episod 4: Gwacheon National Science Museum, Part 1", description: "An exciting day at Gwacheon National Science Museum. Guest appearances from Nichkhun and Jessica.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce5562" },
            { title: "Episod 5: Gwacheon National Science Museum, Part 2", description: "Continuing from episode 4, the 2 teams battle for the rights to leave.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc001a6e979983cdce5563" },
            { title: "Episod 6: Namsan Tower", description: "YG's prince Se7en, song queen Son Dam Bi, and Kim Shin Young join the cast in Seoul Tower.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce5560" },
            { title: "Episod 7: Sejong Center For The Performing Arts", description: "Taking place in Sejong Center of Performing Arts with Jo Kwon, Jung Yong Hwa and Eun Jeong.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc001a6e979983cdce5564" },
            { title: "Episod 8: Seoul Museum of History, Gyeonghui Palace", description: "Special guests Victoria, Lee Joon, and Park Jun Gyu.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc001c6e979983cdce5565" },
            { title: "Episod 9: Lotte World", description: "Hilarious episode starring Shin Bong Sun and Kim Jong Kook in Seoul's famous Lotte World.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc001c6e979983cdce5566" },
            { title: "Episod 10: National Museum of Contemporary Art", description: "Cha Tae Hyun and Yoon Se Ah join the cast at National Museum of Contemporary Art.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc001d6e979983cdce5567" },
            { title: "Episod 11: Seoul Central Post Office", description: "Individually earn Running Balls at Seoul Central Post Office.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00216e979983cdce5569" },
            { title: "Episod 12: Seoul Design Fair @ Seoul Olympic Stadium", description: "The Ultimate Design Race. The Running Man team dives into the world of design.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00216e979983cdce5568" },
            { title: "Episod 13: SBS Broadcasting Center", description: "All-Night Broadcast Battle. Special guests Jang Dong-min and Lizzy (After School).", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00266e979983cdce556a" },
            { title: "Episod 14: Boramae Safety Experience Center", description: "Lizzy returns for another exciting trip taking place in Boramae Safety Experience Center.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00266e979983cdce556b" },
            { title: "Episod 15: Seoul Metro Train Depot", description: "Subway Chase and Ji-hyo's Heart. Guests: Tony An, Kim Kwang-gyu.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc002c6e979983cdce556c" },
            { title: "Episod 16: I'Park Mall (Yongsan-gu, Seoul)", description: "Individually earn running balls and get 200,000 won in receipts and trade it for a running ball.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc002c6e979983cdce556d" },
            { title: "Episod 17: Hanyang Women's University", description: "Individually earn running balls and find the 4 bells hidden in the school and ring them.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00586e979983cdce556e" },
            { title: "Episod 18: Busan International Cruise Ship", description: "Individually earn Running Balls and find the 6 map pieces.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00596e979983cdce556f" },
            { title: "Episod 19: Namsangol Hanok Village", description: "Earn the Running Balls & Complete the ten traditional Symbols of Longevity.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00596e979983cdce5570" },
            { title: "Episod 20: Korea Meteorological Administration", description: "Earn the Running Balls and find the 4 Running Man umbrellas.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc005d6e979983cdce5571" },
            { title: "Episod 21: Gwangmyeong Station", description: "Earn the running balls and find the 5 train tickets.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc005d6e979983cdce5572" },
            { title: "Episod 22: Lotte Mart (Gwangjin-gu, Seoul)", description: "Earn the Running Balls and find the 4 ornaments and decorate the tree.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc005e6e979983cdce5573" },
            { title: "Episod 23: Alpensia Ski Resort", description: "Earn the running balls and find the 5 gold medals.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00636e979983cdce5574" },
            { title: "Episod 24: Xi Wi City", description: "Running Man episode at Xi Wi City.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00686e979983cdce5575" },
            { title: "Episod 25: Museum Comics Information Center", description: "Running Man episode at Museum Comics Information Center, Bucheon.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00696e979983cdce5576" },
            { title: "Episod 26: Nakwon Instruments Shopping Center", description: "Running Man episode at Nakwon Instruments Shopping Center, Insadong.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00696e979983cdce5577" },
            { title: "Episod 27: Seoul Arts Center", description: "Guests: Chang-min Shim, Jung Yunho.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00696e979983cdce5578" },
            { title: "Episod 28: Ansung Natural Resort", description: "Running Man episode at Ansung Natural Resort.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00946e979983cdce5579" },
            { title: "Episod 29: COEX Aquarium", description: "Running Man episode at COEX Aquarium, Gangnam.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00946e979983cdce557a" },
            { title: "Episod 30: National Center for Korean Traditional Performing Arts", description: "Guests: Choo Shin Soo, Ryu Hyun Jin, Jin Sae Yeon.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00996e979983cdce557b" },
            { title: "Episod 31: Alpensia Ocean 700 Water Park", description: "Running Man episode at Ocean 700 Water Park.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc009a6e979983cdce557c" },
            { title: "Episod 32: Woongjin Think Big Office", description: "Running Man episode at Woongjin Think Big Office, Paju.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc009f6e979983cdce557d" },
            { title: "Episod 33: Incheon International Airport", description: "Running Man episode at Incheon International Airport.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a06e979983cdce557e" },
            { title: "Episod 34: Hongdae Area", description: "Running Man episode at Hongdae Area, Mapo-gu.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a46e979983cdce557f" },
            { title: "Episod 35: Nanji Camp, Part 1", description: "Running Man episode at Nanji Camp, Sangam-dong.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a46e979983cdce5580" },
            { title: "Episod 36: Nanji Camp, Part 2", description: "Running Man episode continuing at Nanji Camp.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a56e979983cdce5581" },
            { title: "Episod 37: Metapolis", description: "Running Man episode at Metapolis, Hwaseong.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a56e979983cdce5582" },
            { title: "Episod 38: Seoul Medical Center", description: "Running Man episode at Seoul Medical Center.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00d06e979983cdce5583" },
            { title: "Episod 39: Seoul Folk Flea Market", description: "Running Man episode at Seoul Folk Flea Market.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00d56e979983cdce5584" },
            { title: "Episod 40: Petite France", description: "Running Man episode at Petite France, Gapyeong.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00d66e979983cdce5585" },
            { title: "Episod 41: National Digital Library of Korea", description: "Guest: Lee Sun-kyun.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00da6e979983cdce5586" },
            { title: "Episod 42: SBS Tanhyeon-dong Production Center", description: "Running Man episode at SBS Production Center.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00db6e979983cdce5587" },
            { title: "Episod 43: Daegu Stadium", description: "Guest: IU.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00dc6e979983cdce5588" },
            { title: "Episod 44: Cheil Worldwide Building, Part 1", description: "Running Man episode at Cheil Worldwide Building, Itaewon.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00e06e979983cdce5589" },
            { title: "Episod 45: Cheil Worldwide Building, Part 2", description: "Continuing race at Cheil Worldwide Building.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00e06e979983cdce558a" },
            { title: "Episod 46: Kyobo Book Center, Part 1", description: "Running Man episode at Kyobo Book Center.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00e06e979983cdce558b" },
            { title: "Episod 47: Kyobo Book Center, Part 2", description: "Continuing race at Kyobo Book Center.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00e66e979983cdce558c" },
            { title: "Episod 48: National Museum of Korea", description: "Running Man episode at National Museum of Korea.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc010d6e979983cdce558d" },
            { title: "Episod 49: Dream Forest", description: "Running Man episode at Dream Forest, Gangbuk-gu.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01116e979983cdce558e" },
            { title: "Episod 50: Bangkok, Thailand", description: "Special Overseas episode in Bangkok, Thailand.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01136e979983cdce558f" },
            { title: "Episod 51: Pattaya, Thailand", description: "Special Overseas episode in Pattaya, Thailand.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01136e979983cdce5590" },
            { title: "Episod 52: Gyeongju World", description: "Running Man episode at Gyeongju World.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01176e979983cdce5591" },
            { title: "Episod 53: Blue One Resort", description: "Running Man episode at Blue One Resort, Gyeongju.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01176e979983cdce5592" },
            { title: "Episod 54: 63 Building", description: "Protect the Boss Challenge at 63 Building, Yeouido.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01186e979983cdce5593" },
            { title: "Episod 55: Wootdali Culture Village, Part 1", description: "Running Man episode at Wootdali Culture Village, Pyeongtaek.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc011d6e979983cdce5594" },
            { title: "Episod 56: Wootdali Culture Village, Part 2", description: "Continuing at Wootdali Culture Village.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01226e979983cdce5595" },
            { title: "Episod 57: Jeju-do, Part 1", description: "Special Race in Jeju Island.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01486e979983cdce5596" },
            { title: "Episod 58: Jeju-do, Part 2", description: "Continuing Special Race in Jeju Island.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01496e979983cdce5597" },
            { title: "Episod 59: Old Seoul Station", description: "Running Man episode at Old Seoul Station.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc014d6e979983cdce5598" },
            { title: "Episod 60: D-Cube City", description: "Running Man episode at D-Cube City, Sindorim.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01526e979983cdce5599" },
            { title: "Episod 61: Beijing, China, Part 1", description: "Special Overseas episode in Beijing, China.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01546e979983cdce559a" },
            { title: "Episod 62: Beijing, China, Part 2", description: "Continuing Overseas episode in Beijing, China.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01556e979983cdce559b" },
            { title: "Episod 63: Goyang, Gyeonggi-do", description: "Running Man episode at Goyang.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01586e979983cdce559c" },
            { title: "Episod 64: Paju English Village", description: "Running Man episode at Paju English Village.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01586e979983cdce559f" },
            { title: "Episod 65: Baekje Military Museum", description: "Running Man episode at Baekje Military Museum, Nonsan.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01586e979983cdce559e" },
            { title: "Episod 66: Hangang Park", description: "Running Man episode at Hangang Park, Yeouido.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01586e979983cdce559d" },
            { title: "Episod 67: Gungpyeong Village", description: "Running Man episode at Gungpyeong Village, Hwaseong.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc015d6e979983cdce55a0" },
            { title: "Episod 68: Canal Walk, Songdo", description: "Running Man episode at Canal Walk, Incheon.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc015e6e979983cdce55a1" },
            { title: "Episod 69: Incheon Culture & Arts Center", description: "Running Man episode at Incheon Culture & Arts Center.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01896e979983cdce55a2" },
            { title: "Episod 70: KT Building, Bundang", description: "Guests: Son Ye-jin, Lee Min-ki.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01896e979983cdce55a3" },
            { title: "Episod 71: Gyeonghui Palace", description: "Running Man episode at Gyeonghui Palace, Seoul.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01896e979983cdce55a4" },
            { title: "Episod 72: Hongkong, China, Part 1", description: "Special Overseas episode in Hongkong.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc018f6e979983cdce55a5" },
            { title: "Episod 73: Hongkong, China, Part 2", description: "Continuing Special Overseas episode in Hongkong.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01946e979983cdce55a6" },
            { title: "Episod 74: Running Man Survival", description: "Superpower Battle 1.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01956e979983cdce55a7" },
            { title: "Episod 75: Paris Park, Mokdong", description: "New Year Special Race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01956e979983cdce55a8" },
            { title: "Episod 76: Yeosu City Hall", description: "Guest: Joo Sang-uk.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01956e979983cdce55a9" },
            { title: "Episod 77: Hahwa Island", description: "Running Man episode at Hahwa Island, Yeosu.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc019b6e979983cdce55aa" },
            { title: "Episod 78: Lotte Mall, Gangseo-gu", description: "Running Man episode at Lotte Mall.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01c56e979983cdce55ab" },
            { title: "Episod 79: Club Harmony Cruise Ship", description: "Running Man episode on Club Harmony Cruise Ship, Busan.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01c56e979983cdce55ac" },
            { title: "Episod 80: Paradise Spa Dogo", description: "Running Man episode at Paradise Spa Dogo, Asan.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01c76e979983cdce55ad" },
            { title: "Episod 81: Songdo Convensia", description: "Gary Kang episode at Songdo Convensia.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01c76e979983cdce55ae" },
            { title: "Episod 82: Shinsegae Department Store", description: "Running Man episode at Centum City, Busan.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01ca6e979983cdce55af" },
            { title: "Episod 83: Nurimaru APEC House", description: "Running Man episode at Haeundae, Busan.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01cb6e979983cdce55b0" },
            { title: "Episod 84: Seodaemun Museum of Natural History", description: "Guest: Choi Seung-hyun (T.O.P BIGBANG).", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01cb6e979983cdce55b1" },
            { title: "Episod 85: Cheil Industries Fashion Division Head Office", description: "Running Man vs Big Bang Battle.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01d06e979983cdce55b3" },
            { title: "Episod 86: SBS Broadcasting Center", description: "Guest: Ha Ji-Won.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01d06e979983cdce55b2" },
            { title: "Episod 87: Korea Job World", description: "Running Man episode at Korea Job World, Bundang.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01d66e979983cdce55b4" },
            { title: "Episod 88: The Shilla Jeju", description: "Running Man episode at Jeju-do.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01d66e979983cdce55b5" },
            { title: "Episod 89: Ilchul Land", description: "Running Man episode at Ilchul Land, Jeju-do.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01fd6e979983cdce55b6" },
            { title: "Episod 90: Cheorwon-gun, Gangwon-do", description: "Guest: Lee Deok-hwa.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc01fd6e979983cdce55b7" },
            { title: "Episod 91: SUNY Korea, Songdo", description: "Yoo Jae-suk Yoomes Bond Returns episode.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00fe6e979983cdce55b8" },
            { title: "Episod 92: Somuui Island", description: "Running Man episode at Somuui Island, Incheon.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02036e979983cdce55b9" },
            { title: "Episod 93: Seoul Land", description: "Non-stop Voting Race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02036e979983cdce55ba" },
            { title: "Episod 94: Mokdong Wedding Palace", description: "Guests: Haha, Kim Jong-kook, Bae Suzy.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02036e979983cdce55bb" },
            { title: "Episod 95: Pantech Building", description: "Running Man episode at Pantech Building, Mapo-gu.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02096e979983cdce55bd" },
            { title: "Episod 96: University of Incheon Songdo Campus", description: "Asian Dream Cup Special.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02096e979983cdce55bc" },
            { title: "Episod 97: POSCO Global R&D Center", description: "Asian Dream Cup Special Part 2.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc020e6e979983cdce55be" },
            { title: "Episod 98: Tesco Home Plus Academy", description: "Zombie Race at Muui Island.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc020e6e979983cdce55bf" },
            { title: "Episod 99: Xi Gallery, Mapo-gu", description: "Lee Kwang-soo Kingdom Race.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc02396e979983cdce55c0" },
            { title: "Episod 100: Mecenatpolis", description: "Special 100th Episode War of the Gods.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc023e6e979983cdce55c1" },
            { title: "Episod 101: Korea Institute of Science and Technology", description: "CSI vs Criminals Special Race at KIST.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55dd" },
            { title: "Episod 102: SBS Tanhyeon-dong Production Center", description: "Drama Special Gold Turtle Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55da" },
            { title: "Episod 103: S-Oil Building", description: "Shin Se Kyung, Yoo Joon Sang, and No Sa Yeon join the Running Man cast today.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55dc" },
            { title: "Episod 104: Hanseong Baekje Museum", description: "Idol Olympics Special starring 7 K-pop idols.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55d9" },
            { title: "Episod 105: Aqua Planet Jeju", description: "Money Backpack Race in Jeju Island.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55d8" },
            { title: "Episod 106: Daum Communications Office, Jeju City", description: "Love Compatibility Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55db" },
            { title: "Episod 107: Yonsei University International Campus", description: "Running Man Gold Statue Search.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ad6e979983cdce55de" },
            { title: "Episod 108: NS Home Shopping Building", description: "All Star Battle: Park Tae-hwan and Son Yeon-jae.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ad6e979983cdce55df" },
            { title: "Episod 109: Herb Island, Pocheon", description: "Olympic Stars Special Part 1.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ad6e979983cdce55e0" },
            { title: "Episod 110: Daejin University", description: "We continue on from last week with Park Tae Hwan and Son Yeon Jae.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ad6e979983cdce55e1" },
            { title: "Episod 111: National Maritime Museum", description: "Busan Special with Im Chang-jung, Lee Jong-won, Son Byung-ho.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b36e979983cdce55e2" },
            { title: "Episod 112: Moorim P&P Paper Mill", description: "Paper Mill Target Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b86e979983cdce55e3" },
            { title: "Episod 113: Samcheonggak", description: "Guest: Yoo Hai Jin. Absolute Taste Chuseok Special.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b86e979983cdce55e5" },
            { title: "Episod 114: Culture Park, Yeonsu-gu", description: "X-Man Special Revenge Match.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b86e979983cdce55e4" },
            { title: "Episod 115: Coast Guard Main Station", description: "Coast Guard Training Special with TVXQ.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b96e979983cdce55e7" },
            { title: "Episod 116: Suncheon Open Set", description: "Guest: Ji Sung. The Great Seer Time Travel Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b96e979983cdce55e6" },
            { title: "Episod 117: Asian Culture Complex", description: "Guests: Ji Sung, Song Ji-hyo, Bae Suzy. Riddle Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68e46e979983cdce55e8" },
            { title: "Episod 118: Jungnang Camp Ground", description: "Choi Min-soo Sniper Returns Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68e96e979983cdce55e9" },
            { title: "Episod 119: Gongrung Youth Baseball Park", description: "Superpower Baseball Special with Ryu Hyun-jin & Choo Shin-soo.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68e96e979983cdce55eb" },
            { title: "Episod 120: Poeun Art Hall", description: "Secret Agent Mission with Lee Seung-gi & Park Shin-hye.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68e96e979983cdce55ea" },
            { title: "Episod 121: SBS Prism Tower", description: "007 Water Virus Special with Lee Seung-gi.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ef6e979983cdce55ed" },
            { title: "Episod 122: Rockcamp", description: "80s 90s Legendary Singers Special.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ef6e979983cdce55ec" },
            { title: "Episod 123: Song Cham Bong Joseon Village", description: "Kim Soo-ro and Han Hyo-joo Kimchi Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ef6e979983cdce55ee" },
            { title: "Episod 124: Jeonju University", description: "King of Kings Gold Race with Han Hyo-joo.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68f46e979983cdce55ef" },
            { title: "Episod 125: Busan Christmas Special", description: "Choi Ji-woo Christmas Special in Busan.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68f56e979983cdce55f0" },
            { title: "Episod 126: Choi Ji-woo vs Running Man", description: "Cheongju Spy Game featuring CNBLUE & Lee Ki-kwang.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68f56e979983cdce55f1" },
            { title: "Episod 127: Jangsado Sea Park", description: "Snake Year Special with Choi Ji-woo, Jung Yong-hwa, Lee Jong-hyun.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc691f6e979983cdce55f2" },
            { title: "Episod 128: SBS Broadcasting Center", description: "Boy Scouts vs Girl Scouts Battle.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69256e979983cdce55f4" },
            { title: "Episod 129: National Institute of Biological Resources", description: "Idol Winter Olympics with SHINee, INFINITE, CNBLUE, MBLAQ.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69256e979983cdce55f3" },
            { title: "Episod 130: New Seoul City Hall", description: "No guests. 1938 to 2013, Running Men gets reincarnated.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc692a6e979983cdce55f5" },
            { title: "Episod 131: Yongyu Train Depot", description: "Guests: Choo Sung-hoon, Lee Si-young Bounty Hunters, challenging to for ddakji.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc692b6e979983cdce55f6" },
            { title: "Episod 132: Asiana Town", description: "Guests: Hwang Jung-min, Hyuna, Park Sung-woong. Actors vs Singers.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc692f6e979983cdce55f7" },
            { title: "Episod 133: Macau", description: "Guests: Han Hye-jin, Lee Dong-wook. Asia Race Part I in Macau.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc692f6e979983cdce55f8" },
            { title: "Episod 134: Keangnam Hanoi Landmark Tower", description: "Guests: Han Hye-jin, Lee Dong-wook. Asia Race Part II, continues in Vietnam.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69306e979983cdce55f9" },
            { title: "Episod 135: Kwanghee Fashion Mall", description: "Guests: Jackie Chan, Choi Si-won. Jackie Chan joins as a treasure hunter.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69356e979983cdce55fa" },
            { title: "Episod 136: Hoa Lu", description: "Guests: Han Hye-jin, Lee Dong-wook. Asia Race Part III in Vietnam.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69606e979983cdce55fb" },
            { title: "Episod 137: Jo in Joo Boxing Club", description: "Noh Sa-yeon and Uee join for a race between the three princesses and their On Dals.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69606e979983cdce55fd" },
            { title: "Episod 138: Haewon High School", description: "Guests: Kim Su-ro, Kim Woo-bin, Lee Jong-hyun, Lee Jong-suk, Min Hyo-rin.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69606e979983cdce55fc" },
            { title: "Episod 139: The MVL Hotel Kintex", description: "Guests: Go Ara, Lee Yeon-hee. That Winter, the Typhoon Blows mini-series.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69666e979983cdce55fe" },
            { title: "Episod 140: Ecoplex", description: "No guests. Running Men must find the vaccine for the Rage Virus outbreak.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69666e979983cdce55ff" },
            { title: "Episod 141: Animal Kingdom", description: "King of the Animals special at Everland.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc696b6e979983cdce5600" },
            { title: "Episod 142: Gwangnaru Safety Experience Center", description: "Best Couple Race with Lee Bo-young & Lee Sang-yoon.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc696b6e979983cdce5601" },
            { title: "Episod 143: Seoul City Hall", description: "Superpower Karaoke Race with Kim In-kwon, Lee Kyung-kyu.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc696c6e979983cdce5602" },
            { title: "Episod 144: Namsan Elementary School", description: "Children's Day Special Legendary Ddakji Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc696c6e979983cdce5603" },
            { title: "Episod 145: Gyeonggi English Village Paju Camp", description: "Guests: Jeon Hye-bin, Jeong Jinwoon, Kim Byung-man. Running Men vs Laws of the Jungle.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69716e979983cdce5604" },
            { title: "Episod 146: Wolseong Nuclear Energy Information Center", description: "Guests: Kim Sang-kyung, Uhm Jung-hwa. Betrayer Club Arrest Operation.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc699c6e979983cdce5605" },
            { title: "Episod 147: Sogang University", description: "Guests: Kim Soo-hyun, Lee Hyun-woo. Flower Boy Athletic Tournament.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc699c6e979983cdce5606" },
            { title: "Episod 148: Gapyeong Gymnasium", description: "Guests: Jeong Jun-ha, So Yi-hyun. Eating Board of Jumanji.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a26e979983cdce5607" },
            { title: "Episod 149: National Folk Museum of Korea", description: "Guests: Kim Soo-mi, Kim Sook, Kwon Ri-se. The race is My love, Gumiho.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a26e979983cdce5608" },
            { title: "Episod 150: Square1", description: "Guests: Choo Sung-hoon, Taecyeon, Chansung. Running Man Avengers Superhero Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a36e979983cdce5609" },
            { title: "Episod 151: SBS Broadcasting Center", description: "Guests: Han Hyo-joo, Jung Woo-sung, Lee Jun-ho. King of the Killers.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a86e979983cdce560b" },
            { title: "Episod 152: Baekje Cultural Complex", description: "Guests: Han Hyo-joo, Jung Woo-sung, Lee Jun-ho. Vacances Special.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a86e979983cdce560a" },
            { title: "Episod 153: Korea Polar Research Institute", description: "Guests: Koo Ja-cheol, Park Ji-sung, Sulli. Return of the Captain.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a86e979983cdce560c" },
            { title: "Episod 154: Hongkou Football Stadium", description: "Guests: Park Ji-sung, Patrice Evra, Sulli. Shanghai Dream Cup 2013.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a86e979983cdce560d" },
            { title: "Episod 155: Incheon National University", description: "Guest: Bae Suzy. Destiny's Pairs high school ghost story.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69ad6e979983cdce560e" },
            { title: "Episod 156: Hangang Park", description: "Guests: 2NE1, Taeyang. Alien Invasion collect 21 liters of water.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69d46e979983cdce560f" },
            { title: "Episod 157: Tangeum Lake International Rowing Stadium", description: "Guests: Ahn Gil-kang, Jung Woong-in. I Hear Your Voice Courtroom Parody.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69d46e979983cdce5610" },
            { title: "Episod 158: Goyang Aqua Studio", description: "Guests: Son Hyun-joo, Jeon Mi-seon. Number Hide and Seek.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69d46e979983cdce5611" },
            { title: "Episod 159: Yangju, Gyeonggi-do", description: "Guests: John Park, Lim Kim, Sayuri. Strongest Couple Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69d96e979983cdce5612" },
            { title: "Episod 160: Daeijak Island", description: "Guests: Shinhwa. Ranking Organization vs Pirates.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69da6e979983cdce5613" },
            { title: "Episod 161: Seungbong Island", description: "Guests: Shinhwa. Curse of the Gold Pirate Battle.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69da6e979983cdce5614" },
            { title: "Episod 162: Old Cheongju Tobacco Factory", description: "Guests: 2PM, Apink, Beast, Girl's Day, Infinite, MBLAQ, Sistar. Idol King Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69df6e979983cdce5616" },
            { title: "Episod 163: Icheon Art Hall", description: "Guests: Big Bang: Daesung, G-Dragon, Seungri. Stealing Princess Ji-hyo's Heart.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69df6e979983cdce5615" },
            { title: "Episod 164: Great Inheritance", description: "Guests: Kim Hae-sook, Yoo Ah-in. Great Inheritance Madame Go family race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69e46e979983cdce5617" },
            { title: "Episod 165: Wabu Middle School", description: "No guests. In Search for the Little Girl mysterious book.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69e56e979983cdce5618" },
            { title: "Episod 166: SBS Broadcasting Center II", description: "Guests: Choi Jin-hyuk, Kim Woo-bin, Park Shin-hye. The Heirs company shares.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a106e979983cdce5619" },
            { title: "Episod 167: National Museum of Korean Contemporary History", description: "Guests: Chun Jung-myung, Kim Min-jung. Legend of the Troublemakers.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a116e979983cdce561a" },
            { title: "Episod 168: Suwon World Cup Stadium Swimming Pool", description: "IU and Park Myung-soo wolf and sheep card game.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a156e979983cdce561b" },
            { title: "Episod 169: Mayhills Resort", description: "Guests: Joo Sang-wook, Yang Dong-geun. Find the Key of Freedom.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a156e979983cdce561c" },
            { title: "Episod 170: Samtan Art Mine", description: "Guests: Kim Yoo-jung, T.O.P, Yoon Je-moon. Fellowship of Running Men Oz.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a166e979983cdce561d" },
            { title: "Episod 171: Lotte Outlets Buyeo Store", description: "Guests: Ryu Hyun-jin, EXO. Ryu Hyun-jin's Choice vs EXO.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a1b6e979983cdce561e" },
            { title: "Episod 172: Korean Folk Village", description: "Guests: Ryu Hyun-jin, Bae Suzy. Autumn Overnight Secret Spy Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a1b6e979983cdce561f" },
            { title: "Episod 173: Namyangju Little Baseball Park", description: "Guests: Ryu Hyun-jin, Suzy, Kim Hyun-soo. Superpower Baseball.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a1b6e979983cdce5620" },
            { title: "Episod 174: 'R' Warehouse", description: "Guests: Han Hye-jin, Lee Seung-gi, Yoon Bo-ra. The Number 14375.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a206e979983cdce5621" },
            { title: "Episod 175: POSCO Green Building", description: "Guests: Gong Yoo, Park Hee-soon. Suspect Target Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a216e979983cdce5622" },
            { title: "Episod 176: SBS Broadcasting Center", description: "Guests: Chang Kiha, Jun Hyun-moo. Men's Popularity Race with Ji-hyo.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a516e979983cdce5623" },
            { title: "Episod 177: Christmas Nightmare", description: "Gil (Leessang) Christmas Nightmare Special.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a526e979983cdce5624" },
            { title: "Episod 178: Han River Crossing Battle", description: "Running Man members vs Production Team Han River Boat Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a526e979983cdce5625" },
            { title: "Episod 179: La Cuisine: Part 1", description: "Guests: Lee Dong-wook, John Park, Sungkyu. Cooking Battle Part 1.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a526e979983cdce5626" },
            { title: "Episod 180: La Cuisine: Part 2", description: "Cooking Battle Part 2 with top Korean chefs judging.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a576e979983cdce5627" },
            { title: "Episod 181: Romeo and Juliet", description: "Guests: Lee Jong-suk, Park Bo-young, Lee Se-young. Secret Couple Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a576e979983cdce5628" },
            { title: "Episod 182: SBS Tanhyeon-dong Production Center", description: "Guests: Yeo Jin-goo, Yim Si-wan, Dohee. Janggi Race designed by Hong Kong fan.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a576e979983cdce5629" },
            { title: "Episod 183: SBS Broadcasting Center", description: "Guests: Jo Min-su, Moon So-ri, Uhm Jung-hwa. Destined Partner.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a5c6e979983cdce562a" },
            { title: "Episod 184: Winter Olympics", description: "Guests: Park Seo-joon, Baro, Son Ho-jun, Seo In-guk. Winter Olympics Special.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a5c6e979983cdce562b" },
            { title: "Episod 185: Gwacheon National Science Museum", description: "Guest: Kim Hyun-soo. My Love From a Running Star parody.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a5d6e979983cdce562c" },
            { title: "Episod 186: The Shilla Duty Free Shop", description: "Guests: Shim Eun-kyung, CNBLUE. Faces of Seoul Cultural Representatives.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a626e979983cdce562d" },
            { title: "Episod 187: Han River", description: "No guests. 2014 University Boat Race crossing the Han River.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a896e979983cdce562e" },
            { title: "Episod 188: Australian Adventure I", description: "Guests: Kim Woo-bin, Rain. Australia Special Part 1 Shipwreck Treasure.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a8f6e979983cdce562f" },
            { title: "Episod 189: Australian Adventure II", description: "Guests: Kim Woo-bin, Rain. Australia Special Part 2 Seaplanes & Parasails.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a906e979983cdce5631" },
            { title: "Episod 190: Seoul Metropolitan Fire Academy", description: "Guests: Kang Ha-neul, Kim Ji-seok, Seungri. Entertainment vs Drama Rescue Team.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a906e979983cdce5630" },
            { title: "Episod 191: Australian Adventure III", description: "Guests: Kim Woo-bin, Rain. Australia Special Part 3 1854 Gold Rush Sheriffs.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a946e979983cdce5632" },
            { title: "Episod 192: Ttangkkeut Auto Camp I", description: "Cross Country Race. Team up with guests traveling across Korea for tents.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a956e979983cdce5633" },
            { title: "Episod 193: Ttangkkeut Auto Camp II", description: "Mafia vs Civilian Part 1. High stakes psychological voting game.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a956e979983cdce5634" },
            { title: "Episod 194: Ttangkkeut Auto Camp III", description: "Mafia vs Civilian Part 2. Final scramble to find the hidden Mafia.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a9a6e979983cdce5635" },
            { title: "Episod 195: Seoul Energy Dream Center", description: "Guests: 2NE1, 2PM, Mystic89. MC Yoo Live Showdown Relay.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a9a6e979983cdce5636" },
            { title: "Episod 196: Severance Hospital", description: "No guests. Time Travel returning to past iconic episodes.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6ac96e979983cdce5637" },
            { title: "Episod 197: Jamsil Students' Gymnasium", description: "National College Ddakji Tournament with Apink & university students.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6aca6e979983cdce5638" },
            { title: "Episod 198: Couple Race: Romancing the Stones", description: "Guests: Minah, Park Seo-joon, Ha Yeon-soo. Absolute Love Couple Race.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6acb6e979983cdce5639" },
            { title: "Episod 199: Asian Dream Cup 2014 Special", description: "Guests: Park Ji-sung, Cha Bum-kun, idol soccer stars. Training for Dream Cup.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6ace6e979983cdce563b" },
            { title: "Episod 200: Taman Safari Indonesia", description: "Guests: Park Ji-sung, Cha Bum-kun. Asian Dream Cup Penalty Race in Indonesia.", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6ace6e979983cdce563a" }
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
        const videos = series.episodes.map(e => ({
            id: `${series.id}:1:${e.episode}`,
            title: e.title,
            overview: e.overview || e.description || '',
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
