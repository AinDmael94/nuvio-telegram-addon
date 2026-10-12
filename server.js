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
        "demon_slayer_series", "jjk_series", "boruto_series", "hagemaru_full_series", "naruto_movie_series", "chibi_maruko_series", "tom_and_jerry_series"
    ],
    catalogs: [
        { type: "series", id: "tom_and_jerry_catalog", name: "Tom & Jerry Collection" },
        { type: "series", id: "dragon_ball_movie_catalog", name: "Dragon Ball Movie" },
        { type: "series", id: "satria_catalog", name: "Satria Series" },
        { type: "series", id: "gundam_build_fighter_catalog", name: "Gundam Build Fighter Series" },
        { type: "series", id: "time_bokan_catalog", name: "Time Bokan" },
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
    "tom_and_jerry_catalog": {
        id: "tom_and_jerry_series",
        catalogId: "tom_and_jerry_catalog",
        name: "Tom & Jerry Collection",
        poster: "https://i.postimg.cc/Gm5JwFbK/Tom-And-Jerry.jpg",
        description: "Koleksi lengkap episod klasik Tom & Jerry[cite: 4].",
        episodes: createEpisodes([
            { title: "Tom_&_Jerry_1940_S01E08_Fine_Feathered_Friend_1080p_BluRay_x265.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4506e979983cdce5ad0" },
            { title: "Tom_&_Jerry_1940_S01E16_Puttin'_On_The_Dog_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4876e979983cdce5ad8" },
            { title: "Tom_&_Jerry_1940_S01E10_The_Lonesome_Mouse_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4506e979983cdce5ad2" },
            { title: "Tom_&_Jerry_1940_S01E14_The_Million_Dollar_Cat_1080p_BluRay_x265.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc45c6e979983cdce5ad6" },
            { title: "Tom_&_Jerry_1940_S01E09_Sufferin'_Cats!_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4506e979983cdce5ad1" },
            { title: "Tom_&_Jerry_1940_S01E15_The_Bodyguard_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc45c6e979983cdce5ad7" },
            { title: "Tom_&_Jerry_1940_S01E13_The_Zoot_Cat_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc45b6e979983cdce5ad5" },
            { title: "Tom_&_Jerry_1940_S01E17_Mouse_Trouble_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48d6e979983cdce5ad9" },
            { title: "Tom_&_Jerry_1940_S01E19_Mouse_In_Manhattan_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48e6e979983cdce5ada" },
            { title: "Tom_&_Jerry_1940_S01E22_Quiet_Please!_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4926e979983cdce5ade" },
            { title: "Tom_&_Jerry_1940_S01E21_Flirty_Birdy_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4926e979983cdce5add" },
            { title: "Tom_&_Jerry_1940_S01E23_Springtime_For_Thomas_1080p_BluRay_x265.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4936e979983cdce5adf" },
            { title: "Tom_&_Jerry_1940_S01E18_The_Mouse_Comes_To_Dinner_1080p_BluRay_x265.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48f6e979983cdce5adc" },
            { title: "Tom_&_Jerry_1940_S01E24_The_Milky_Waif_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4986e979983cdce5ae0" },
            { title: "Tom_&_Jerry_1940_S01E20_Tee_For_Two_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48f6e979983cdce5adb" },
            { title: "Tom_&_Jerry_1940_S01E25_Trap_Happy_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4c36e979983cdce5ae1" },
            { title: "Tom_&_Jerry_1940_S02E01_Solid_Serenade_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4c36e979983cdce5ae2" },
            { title: "Tom_&_Jerry_1940_S02E02_Cat_Fishin'_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4c86e979983cdce5ae3" },
            { title: "Tom_&_Jerry_1940_S02E03_Part_Time_Pal_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae4" },
            { title: "Tom_&_Jerry_1940_S02E04_The_Cat_Concerto_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae5" },
            { title: "Tom_&_Jerry_1940_S02E09_Kitty_Foiled_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4d96e979983cdce5aea" },
            { title: "Tom_&_Jerry_1940_S02E05_Dr_Jekyll_and_Mr_Mouse_1080p_BluRay_x265.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae6" },
            { title: "Tom_&_Jerry_1940_S02E06_Salt_Water_Tabby_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae7" },
            { title: "Tom_&_Jerry_1940_S02E07_A_Mouse_In_The_House_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cf6e979983cdce5ae8" },
            { title: "Tom_&_Jerry_1940_S02E08_The_Invisible_Mouse_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4d36e979983cdce5ae9" },
            { title: "Tom_&_Jerry_1940_S02E11_Old_Rockin'_Chair_Tom_1080p_BluRay_x265.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5036e979983cdce5aec" },
            { title: "Tom_&_Jerry_1940_S02E12_Professor_Tom_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5056e979983cdce5aed" },
            { title: "Tom_&_Jerry_1940_S02E13_Mouse_Cleaning_576p_DVD_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5056e979983cdce5aee" },
            { title: "Tom_&_Jerry_1940_S02E15_The_Little_Orphan_1080p_AMZN_WEB_DL_x265.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5096e979983cdce5af0" },
            { title: "Tom_&_Jerry_1940_S02E16_Hatch_Up_Your_Troubles_1080p_AMZN_WEB_DL.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc50a6e979983cdce5af1" },
            { title: "Tom_&_Jerry_1940_S02E14_Polka_Dot_Puss_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5056e979983cdce5aef" },
            { title: "Tom_&_Jerry_1940_S02E19_Love_That_Pup_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5136e979983cdce5af4" },
            { title: "Tom_&_Jerry_1940_S02E10_The_Truce_Hurts_1080p_BluRay_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4d96e979983cdce5aeb" },
            { title: "Tom_&_Jerry_1940_S02E17_Heavenly_Puss_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc50e6e979983cdce5af2" },
            { title: "Tom_&_Jerry_1940_S02E20_Jerry's_Diary_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5136e979983cdce5af5" },
            { title: "Tom_&_Jerry_1940_S02E21_Tennis_Chumps_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc53b6e979983cdce5af6" },
            { title: "Tom_&_Jerry_1940_S02E22_Little_Quacker_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc53c6e979983cdce5af7" },
            { title: "Tom_&_Jerry_1940_S02E23_Saturday_Evening_Puss_1080p_AMZN_WEB_DL.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5406e979983cdce5af8" },
            { title: "Tom_&_Jerry_1940_S02E26_Safety_Second_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5416e979983cdce5afa" },
            { title: "Tom_&_Jerry_1940_S02E24_Texas_Tom_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5406e979983cdce5af9" },
            { title: "Tom_&_Jerry_1940_S02E25_Jerry_And_The_Lion_1080p_AMZN_WEB_DL_x265.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5416e979983cdce5afb" },
            { title: "Tom_&_Jerry_1940_S02E18_The_Cat_And_The_Mermouse_1080p_AMZN_WEB.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc50e6e979983cdce5af3" },
            { title: "Tom_&_Jerry_1940_S03E02_The_Framed_Cat_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5466e979983cdce5afd" },
            { title: "Tom_&_Jerry_1940_S03E01_The_Hollywood_Bowl_1080p_AMZN_WEB_DL_x265.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5466e979983cdce5afc" },
            { title: "Tom_&_Jerry_1940_S03E04_Casanova_Cat_576p_DVD_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc54c6e979983cdce5aff" },
            { title: "Tom_&_Jerry_1940_S03E05_Jerry_And_The_Goldfish_1080p_AMZN_WEB_DL.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5776e979983cdce5b00" },
            { title: "Tom_&_Jerry_1940_S03E06_Jerry's_Cousin_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5776e979983cdce5b01" },
            { title: "Tom_&_Jerry_1940_S03E08_His_Mouse_Friday_1080p_AMZN_WEB_DL_x265.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc57c6e979983cdce5b02" },
            { title: "Tom_&_Jerry_1940_S03E07_Sleepy_Time_Tom_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc57c6e979983cdce5b03" },
            { title: "Tom_&_Jerry_1940_S03E03_Cue_Ball_Cat_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc54b6e979983cdce5afe" },
            { title: "Tom_&_Jerry_1940_S03E09_Slicked_Up_Pup_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc57c6e979983cdce5b04" },
            { title: "Tom_&_Jerry_1940_S03E12_The_Flying_Cat_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5876e979983cdce5b07" },
            { title: "Tom_&_Jerry_1940_S03E10_Nit_Witty_Kitty_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5826e979983cdce5b05" },
            { title: "Tom_&_Jerry_1940_S03E13_The_Duck_Doctor_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5876e979983cdce5b08" },
            { title: "Tom_&_Jerry_1940_S03E14_The_Two_Mouseketeers_1080p_AMZN_WEB_DL_x265.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5876e979983cdce5b09" },
            { title: "Tom_&_Jerry_1940_S03E15_Smitten_Kitten_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5876e979983cdce5b0a" },
            { title: "Tom_&_Jerry_1940_S03E11_Cat_Napping_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5826e979983cdce5b06" },
            { title: "Tom_&_Jerry_1940_S03E17_Little_Runaway_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5b96e979983cdce5b0c" },
            { title: "Tom_&_Jerry_1940_S03E16_Triplet_Trouble_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5b86e979983cdce5b0b" },
            { title: "Tom_&_Jerry_1940_S03E18_Fit_To_Be_Tied_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5b96e979983cdce5b0d" },
            { title: "Tom_&_Jerry_1940_S03E20_Cruise_Cat_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5be6e979983cdce5b0f" },
            { title: "Tom_&_Jerry_1940_S03E22_The_Missing_Mouse_1080p_AMZN_WEB_DL_x265.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5c36e979983cdce5b11" },
            { title: "Tom_&_Jerry_1940_S03E24_Johann_Mouse_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5c86e979983cdce5b13" },
            { title: "Tom_&_Jerry_1940_S03E19_Push_Button_Kitty_1080p_AMZN_WEB_DL_x265.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5b96e979983cdce5b0e" },
            { title: "Tom_&_Jerry_1940_S03E23_Jerry_And_Jumbo_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5c46e979983cdce5b12" },
            { title: "Tom_&_Jerry_1940_S03E21_The_Dog_House_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5be6e979983cdce5b10" },
            { title: "Tom_&_Jerry_1940_S04E02_Life_With_Tom_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5fa6e979983cdce5b17" },
            { title: "Tom_&_Jerry_1940_S04E01_Two_Little_Indians_1080p_AMZN_WEB_DL_x265.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5fa6e979983cdce5b16" },
            { title: "Tom_&_Jerry_1940_S03E26_Just_Ducky_1080p_AMZN_WEB_DL_x265_Ghost.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5f66e979983cdce5b15" }
        ])
    },
    "dragon_ball_movie_catalog": {
        id: "dragon_ball_movie",
        isMulti: true,
        items: [
            { id: "db_path_to_power", name: "Mutiara Naga Movie 04: The Path to Power (1996)", poster: "https://i.postimg.cc/mDWZ4mZv/Dragon-Ball-The-Way-to-the-Strongest.jpg", description: "Dragon Ball Movie 1996", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb1486e979983cdce5a77" },
            { id: "db_sleeping_princess", name: "Dragon Ball: Sleeping Princess in Devil's Castle", poster: "https://i.postimg.cc/DzKPXKx0/Dragon-Ball-Sleeping-Princess-in-Devil-s-Castle.jpg", description: "Dragon Ball Movie", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb1486e979983cdce5a78" },
            { id: "db_legend_shenron", name: "Dragon Ball: Legend of Shenron (Malay Dub)", poster: "https://i.postimg.cc/q7dx3d1R/Dragon-Ball-The-Way-to-the-Strongest.jpg", description: "Dragon Ball Malay Dub", url: "https://filestreambot-production-bef2.up.railway.app/dl/6accb1486e979983cdce5a79" }
        ]
    },
    "naruto_catalog": {
        id: "naruto_series",
        catalogId: "naruto_catalog",
        name: "Naruto (220 Episod)",
        poster: "https://i.postimg.cc/8c8qP2Xb/Naruto.jpg",
        description: "Koleksi Penuh 220 Episod Naruto Bahasa Melayu[cite: 5].",
        episodes: createEpisodes([
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55c8",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55c9",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ca",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55cb",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55cc",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55cd",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ce",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55cf",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d0",
            "https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d1"
            // (Nota: Anda boleh sambung baki pautan Naruto penuh anda di sini dengan format yang sama)
        ])
    },
    "running_man_catalog": {
        id: "running_man_series",
        catalogId: "running_man_catalog",
        name: "Runningman",
        poster: "https://i.postimg.cc/wMYXFx0G/RM-2.jpg",
        description: "Koleksi Episod Running Man Lengkap[cite: 5].",
        episodes: createEpisodes([
            { title: "Episod 1: Times Square", description: "Lee Hyori and Hwang Jung Eum join the casts for their first run.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acbff846e979983cdce555e" },
            { title: "Episod 2: Suwon World Cup Stadium, Part 1", description: "Lee Chun Hee and Goo Hara join in.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce5561" },
            { title: "Episod 3: Suwon World Cup Stadium, Part 2", description: "Continuing on from Episode 2.", url: "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce555f" }
        ])
    },
    "demon_slayer_catalog": {
        id: "demon_slayer_series",
        catalogId: "demon_slayer_catalog",
        name: "Demon Slayer Episode 1-26",
        poster: "https://i.postimg.cc/DyLm8nhJ/DS-DP.jpg",
        description: "Demon Slayer Episode 1 hingga 26[cite: 5].",
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
        description: "Jujutsu Kaisen Episode 1 hingga 24[cite: 5].",
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

app.use('/stremio/:user', (req, res, next) => {
    const userId = req.params.user || req.ip;
    uniqueUsers.add(userId);
    userActivity[userId] = new Date().toLocaleString('ms-MY', { timeZone: 'Asia/Kuala_Lumpur' });
    next();
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
                        behaviorHints: { bingeGroup: `${item.id}-hd` }
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
                    behaviorHints: { bingeGroup: `${series.id}-hd` }
                }]
            });
        }
    }
    res.json({ streams: [] });
});

app.get('/', (req, res) => {
    res.send('Server DaRyz Stremio Addon Aktif!');
});

// Mulakan Pelayan
app.listen(PORT, () => {
    console.log(`Server sedang berjalan di port ${PORT}`);
});
