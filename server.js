const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Data lengkap Tom & Jerry (35 Episod)
const DaRyzStreamData = {
    title: "Tom & Jerry",
    banner: "https://i.postimg.cc/Gm5JwFbK/Tom-And-Jerry.jpg",
    episodes: [
        {
            filename: "Tom_&_Jerry_1940_S01E08_Fine_Feathered_Friend_1080p_BluRay_x265.mkv",
            size: "152.54 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4506e979983cdce5ad0",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4506e979983cdce5ad0",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4506e979983cdce5ad0"
        },
        {
            filename: "Tom_&_Jerry_1940_S01E16_Puttin'_On_The_Dog_1080p_BluRay_x265_Ghost.mkv",
            size: "136.81 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4876e979983cdce5ad8",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4876e979983cdce5ad8",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4876e979983cdce5ad8"
        },
        {
            filename: "Tom_&_Jerry_1940_S01E10_The_Lonesome_Mouse_1080p_BluRay_x265_Ghost.mkv",
            size: "157.51 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4506e979983cdce5ad2",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4506e979983cdce5ad2",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4506e979983cdce5ad2"
        },
        {
            filename: "Tom_&_Jerry_1940_S01E14_The_Million_Dollar_Cat_1080p_BluRay_x265.mkv",
            size: "139.33 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc45c6e979983cdce5ad6",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc45c6e979983cdce5ad6",
            share: "https://t.me/DaRyzS_bot?start=file_6accc45c6e979983cdce5ad6"
        },
        {
            filename: "Tom_&_Jerry_1940_S01E09_Sufferin'_Cats!_1080p_BluRay_x265_Ghost.mkv",
            size: "153.22 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4506e979983cdce5ad1",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4506e979983cdce5ad1",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4506e979983cdce5ad1"
        },
        {
            filename: "Tom_&_Jerry_1940_S01E15_The_Bodyguard_1080p_BluRay_x265_Ghost.mkv",
            size: "143.89 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc45c6e979983cdce5ad7",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc45c6e979983cdce5ad7",
            share: "https://t.me/DaRyzS_bot?start=file_6accc45c6e979983cdce5ad7"
        },
        {
            filename: "Tom_&_Jerry_1940_S01E13_The_Zoot_Cat_1080p_BluRay_x265_Ghost.mkv",
            size: "148.29 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc45b6e979983cdce5ad5",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc45b6e979983cdce5ad5",
            share: "https://t.me/DaRyzS_bot?start=file_6accc45b6e979983cdce5ad5"
        },
        {
            filename: "Tom_&_Jerry_1940_S01E17_Mouse_Trouble_1080p_BluRay_x265_Ghost.mkv",
            size: "154.56 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48d6e979983cdce5ad9",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc48d6e979983cdce5ad9",
            share: "https://t.me/DaRyzS_bot?start=file_6accc48d6e979983cdce5ad9"
        },
        {
            filename: "Tom_&_Jerry_1940_S01E19_Mouse_In_Manhattan_1080p_BluRay_x265_Ghost.mkv",
            size: "158.7 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48e6e979983cdce5ada",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc48e6e979983cdce5ada",
            share: "https://t.me/DaRyzS_bot?start=file_6accc48e6e979983cdce5ada"
        },
        {
            filename: "Tom_&_Jerry_1940_S01E22_Quiet_Please!_1080p_BluRay_x265_Ghost.mkv",
            size: "158.88 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4926e979983cdce5ade",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4926e979983cdce5ade",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4926e979983cdce5ade"
        },
        {
            filename: "Tom_&_Jerry_1940_S01E21_Flirty_Birdy_1080p_BluRay_x265_Ghost.mkv",
            size: "142.31 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4926e979983cdce5add",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4926e979983cdce5add",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4926e979983cdce5add"
        },
        {
            filename: "Tom_&_Jerry_1940_S01E23_Springtime_For_Thomas_1080p_BluRay_x265.mkv",
            size: "150.33 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4936e979983cdce5adf",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4936e979983cdce5adf",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4936e979983cdce5adf"
        },
        {
            filename: "Tom_&_Jerry_1940_S01E18_The_Mouse_Comes_To_Dinner_1080p_BluRay_x265.mkv",
            size: "143.8 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48f6e979983cdce5adc",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc48f6e979983cdce5adc",
            share: "https://t.me/DaRyzS_bot?start=file_6accc48f6e979983cdce5adc"
        },
        {
            filename: "Tom_&_Jerry_1940_S01E24_The_Milky_Waif_1080p_BluRay_x265_Ghost.mkv",
            size: "144.27 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4986e979983cdce5ae0",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4986e979983cdce5ae0",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4986e979983cdce5ae0"
        },
        {
            filename: "Tom_&_Jerry_1940_S01E20_Tee_For_Two_1080p_BluRay_x265_Ghost.mkv",
            size: "137.36 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48f6e979983cdce5adb",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc48f6e979983cdce5adb",
            share: "https://t.me/DaRyzS_bot?start=file_6accc48f6e979983cdce5adb"
        },
        {
            filename: "Tom_&_Jerry_1940_S01E25_Trap_Happy_1080p_BluRay_x265_Ghost.mkv",
            size: "139.38 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4c36e979983cdce5ae1",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4c36e979983cdce5ae1",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4c36e979983cdce5ae1"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E01_Solid_Serenade_1080p_BluRay_x265_Ghost.mkv",
            size: "144.23 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4c36e979983cdce5ae2",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4c36e979983cdce5ae2",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4c36e979983cdce5ae2"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E02_Cat_Fishin'_1080p_BluRay_x265_Ghost.mkv",
            size: "149.78 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4c86e979983cdce5ae3",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4c86e979983cdce5ae3",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4c86e979983cdce5ae3"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E03_Part_Time_Pal_1080p_BluRay_x265_Ghost.mkv",
            size: "153.99 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae4",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4cd6e979983cdce5ae4",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4cd6e979983cdce5ae4"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E04_The_Cat_Concerto_1080p_BluRay_x265_Ghost.mkv",
            size: "156.0 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae5",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4cd6e979983cdce5ae5",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4cd6e979983cdce5ae5"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E09_Kitty_Foiled_1080p_BluRay_x265_Ghost.mkv",
            size: "154.2 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4d96e979983cdce5aea",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4d96e979983cdce5aea",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4d96e979983cdce5aea"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E05_Dr_Jekyll_and_Mr_Mouse_1080p_BluRay_x265.mkv",
            size: "164.79 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae6",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4cd6e979983cdce5ae6",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4cd6e979983cdce5ae6"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E06_Salt_Water_Tabby_1080p_BluRay_x265_Ghost.mkv",
            size: "142.35 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae7",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4cd6e979983cdce5ae7",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4cd6e979983cdce5ae7"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E07_A_Mouse_In_The_House_1080p_BluRay_x265_Ghost.mkv",
            size: "154.15 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cf6e979983cdce5ae8",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4cf6e979983cdce5ae8",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4cf6e979983cdce5ae8"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E08_The_Invisible_Mouse_1080p_BluRay_x265_Ghost.mkv",
            size: "142.72 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4d36e979983cdce5ae9",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4d36e979983cdce5ae9",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4d36e979983cdce5ae9"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E11_Old_Rockin'_Chair_Tom_1080p_BluRay_x265.mkv",
            size: "147.01 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5036e979983cdce5aec",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc5036e979983cdce5aec",
            share: "https://t.me/DaRyzS_bot?start=file_6accc5036e979983cdce5aec"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E12_Professor_Tom_1080p_BluRay_x265_Ghost.mkv",
            size: "147.1 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5056e979983cdce5aed",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc5056e979983cdce5aed",
            share: "https://t.me/DaRyzS_bot?start=file_6accc5056e979983cdce5aed"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E13_Mouse_Cleaning_576p_DVD_x265_Ghost.mkv",
            size: "76.37 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5056e979983cdce5aee",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc5056e979983cdce5aee",
            share: "https://t.me/DaRyzS_bot?start=file_6accc5056e979983cdce5aee"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E15_The_Little_Orphan_1080p_AMZN_WEB_DL_x265.mkv",
            size: "146.79 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5096e979983cdce5af0",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc5096e979983cdce5af0",
            share: "https://t.me/DaRyzS_bot?start=file_6accc5096e979983cdce5af0"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E16_Hatch_Up_Your_Troubles_1080p_AMZN_WEB_DL.mkv",
            size: "149.34 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc50a6e979983cdce5af1",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc50a6e979983cdce5af1",
            share: "https://t.me/DaRyzS_bot?start=file_6accc50a6e979983cdce5af1"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E14_Polka_Dot_Puss_1080p_AMZN_WEB_DL_x265_Ghost.mkv",
            size: "150.15 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5056e979983cdce5aef",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc5056e979983cdce5aef",
            share: "https://t.me/DaRyzS_bot?start=file_6accc5056e979983cdce5aef"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E19_Love_That_Pup_1080p_AMZN_WEB_DL_x265_Ghost.mkv",
            size: "147.79 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5136e979983cdce5af4",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc5136e979983cdce5af4",
            share: "https://t.me/DaRyzS_bot?start=file_6accc5136e979983cdce5af4"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E10_The_Truce_Hurts_1080p_BluRay_x265_Ghost.mkv",
            size: "155.5 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4d96e979983cdce5aeb",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc4d96e979983cdce5aeb",
            share: "https://t.me/DaRyzS_bot?start=file_6accc4d96e979983cdce5aeb"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E17_Heavenly_Puss_1080p_AMZN_WEB_DL_x265_Ghost.mkv",
            size: "151.93 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc50e6e979983cdce5af2",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc50e6e979983cdce5af2",
            share: "https://t.me/DaRyzS_bot?start=file_6accc50e6e979983cdce5af2"
        },
        {
            filename: "Tom_&_Jerry_1940_S02E20_Jerry's_Diary_1080p_AMZN_WEB_DL_x265_Ghost.mkv",
            size: "129.48 MiB",
            download: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5136e979983cdce5af5",
            watch: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6accc5136e979983cdce5af5",
            share: "https://t.me/DaRyzS_bot?start=file_6accc5136e979983cdce5af5"
        }
    ]
};

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// CORS Setup (supaya Nuvio/frontend lain boleh fetch data tanpa kena blocked)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Endpoint JSON API untuk Nuvio
app.get('/api/tom-and-jerry', (req, res) => {
    res.json(DaRyzStreamData);
});

// Endpoint fallback / Health check
app.get('/', (req, res) => {
    res.json({
        message: "Server is running!",
        endpoint: "/api/DaRyzStream"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
