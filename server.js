const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Senarai Katalog Lengkap untuk Nuvio
const catalogs = [
  {
    id: 'kids_delights_malay',
    type: 'series',
    name: 'Kids Delights (Malay Ver)',
    poster: 'https://i.postimg.cc/FsKg8hfM/KD.jpg',
    description: 'Koleksi kisah teladan nabi dalam Bahasa Melayu',
    videos: [
      { id: 'kd_ms_1', title: 'Nabi Nuh AS - Bahtera Penyelamat', thumbnail: 'https://i.postimg.cc/qMvTZV7c/Kisah-Nabi-Nuh.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace52a16e979983cdce5cf3' },
      { id: 'kd_ms_2', title: 'Nabi Ibrahim AS - Kekasih Allah Yang Taat', thumbnail: 'https://i.postimg.cc/wTTfd9Lp/Kisah-Nabi-Ibrahim.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace52a16e979983cdce5cf1' },
      { id: 'kd_ms_3', title: 'Nabi Ismail AS - Mukjizat Air Zam-Zam & Pengorbanan Besar', thumbnail: 'https://i.postimg.cc/bwMptCpb/Kisah-Nabi-Ismail.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace52a16e979983cdce5cf4' },
      { id: 'kd_ms_4', title: 'Nabi Ishaq AS - Rezeki Anak Di Usia Senja', thumbnail: 'https://i.postimg.cc/xTwz3R04/Kisah-Nabi-Ishaq.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace52a16e979983cdce5cf2' },
      { id: 'kd_ms_5', title: 'Nabo Yaaqub AS - Sifat Sabar Dan Wasiat Tauhid', thumbnail: 'https://i.postimg.cc/Tw30v9WR/Kisah-Nabi-Yaaqub.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace52a26e979983cdce5cf0' },
      { id: 'kd_ms_6', title: 'Nabi Yusuf AS - Dari Perigi Gelap Ke Takhta Mesir', thumbnail: 'https://i.postimg.cc/PqzVjJ3D/Kisah-Nabi-Yusuf.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace52a26e979983cdce5cf5' },
      { id: 'kd_ms_7', title: 'Nabi Yunus AS - Keajaiban Di Dalam Perut Ikan Nun', thumbnail: 'https://i.postimg.cc/bJtg3v77/image-c1cc390e.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace52aa6e979983cdce5cf6' }
    ]
  },
  {
    id: 'kids_delights_eng',
    type: 'series',
    name: 'Kids Delights (Eng Ver)',
    poster: 'https://i.postimg.cc/FsKg8hfM/KD.jpg',
    description: 'Prophet stories collection in English',
    videos: [
      { id: 'kd_en_1', title: 'Prophet Nuh AS - The Ark Of Safety', thumbnail: 'https://i.postimg.cc/qMvTZV7c/Kisah-Nabi-Nuh.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace53996e979983cdce5cf9' },
      { id: 'kd_en_2', title: 'Prophet Ibrahim AS - The Close Friend Of Allah', thumbnail: 'https://i.postimg.cc/wTTfd9Lp/Kisah-Nabi-Ibrahim.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace53996e979983cdce5cf7' },
      { id: 'kd_en_3', title: 'Prophet Ismail AS - The Miracle Of Zam Zam & A Great Sacrifice', thumbnail: 'https://i.postimg.cc/bwMptCpb/Kisah-Nabi-Ismail.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace53996e979983cdce5cfb' },
      { id: 'kd_en_4', title: 'Prophet Ishaq AS - The Miracle Of A Long-Awaited Child', thumbnail: 'https://i.postimg.cc/xTwz3R04/Kisah-Nabi-Ishaq.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace53996e979983cdce5cfa' },
      { id: 'kd_en_5', title: 'Prophet Yaaqub AS - Patience And The Legacy Of Tawhid', thumbnail: 'https://i.postimg.cc/Tw30v9WR/Kisah-Nabi-Yaaqub.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace53996e979983cdce5cf8' },
      { id: 'kd_en_6', title: 'Prophet Yusuf AS - From Dark Well To The Throne Of Egypt', thumbnail: 'https://i.postimg.cc/PqzVjJ3D/Kisah-Nabi-Yusuf.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace53a16e979983cdce5cfd' },
      { id: 'kd_en_7', title: 'Prophet Yunus AS - A Miracle In The Belly Of The Fish', thumbnail: 'https://i.postimg.cc/bJtg3v77/image-c1cc390e.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace53996e979983cdce5cfc' }
    ]
  },
  {
    id: 'filem_dakwah_sengketa',
    type: 'series',
    name: 'Filem Dakwah (Sengketa)',
    poster: 'https://i.postimg.cc/SQTDgV7K/Sengketa.jpg',
    description: 'Filem Dakwah Sengketa',
    videos: [
      { id: 'sengketa_1', title: 'Sengketa 1', thumbnail: 'https://i.postimg.cc/SQTDgV7K/Sengketa.jpg', url: 'https://files.catbox.moe/6qk9eh.mp4' },
      { id: 'sengketa_2', title: 'Sengketa 2', thumbnail: 'https://i.postimg.cc/SQTDgV7K/Sengketa.jpg', url: 'https://files.catbox.moe/4uiyst.mp4' }
    ]
  },
  {
    id: 'kisah_para_sahabat',
    type: 'series',
    name: 'Kisah Para Sahabat',
    poster: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg',
    description: 'Kisah-kisah inspirasi para sahabat Rasulullah SAW',
    videos: [
      { id: 'sahabat_1', title: 'Nyawa Sebanyak Helaian Rambutnya Untuk Syahid (Bahagian 1)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/wcvfir.mp4' },
      { id: 'sahabat_2', title: 'Nyawa Sebanyak Helaian Rambutnya Untuk Syahid (Bahagian 2)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/zcfs7v.mp4' },
      { id: 'sahabat_3', title: 'Penjaga Rahsia Rasulullah (Bahagian 1)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/zfu53u.mp4' },
      { id: 'sahabat_4', title: 'Penjaga Rahsia Rasulullah (Bahagian 2)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/sf21kq.mp4' },
      { id: 'sahabat_5', title: 'Pernah Dihalal Darah Akhirnya Menjadi Pejuang Islam (Bahagian 1)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/1mt5rk.mp4' },
      { id: 'sahabat_6', title: 'Pernah Dihalal Darah Akhirnya Menjadi Pejuang Islam (Bahagian 2)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/25jmvh.mp4' },
      { id: 'sahabat_7', title: 'Saidina Anas, Pembantu Rasulullah (Bahagian 1)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/4wkmwq.mp4' },
      { id: 'sahabat_8', title: 'Saidina Anas, Pembantu Rasulullah (Bahagian 2)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/bedd23.mp4' },
      { id: 'sahabat_9', title: 'Sehinggakan Rasulullah ﷺ Menggelarkannya Kebajikan (Bahagian 1)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/sannr9.mp4' },
      { id: 'sahabat_10', title: 'Sehinggakan Rasulullah ﷺ Menggelarkannya Kebajikan (Bahagian 2)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/nripoi.mp4' },
      { id: 'sahabat_11', title: 'Seribu Dinar Habis Di Sedekah Sebelum Sampai Ke Rumah (Bahagian 1)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/1nn3qk.mp4' },
      { id: 'sahabat_12', title: 'Seribu Dinar Habis Di Sedekah Sebelum Sampai Ke Rumah (Bahagian 2)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/7logen.mp4' },
      { id: 'sahabat_13', title: 'Beliau Khalifah Pertama Islam Andai Tiada Abu Bakar (Bahagian 1)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/tk0k2f.mp4' },
      { id: 'sahabat_14', title: 'Beliau Khalifah Pertama Islam Andai Tiada Abu Bakar (Bahagian 2)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/c1hj32.mp4' },
      { id: 'sahabat_15', title: 'Dulu Seorang Raja Yang Pernah Ditawan Tentera Islam (Bahagian 1)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/bog9y2.mp4' },
      { id: 'sahabat_16', title: 'Dulu Seorang Raja Yang Pernah Ditawan Tentera Islam (Bahagian 2)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/cptiao.mp4' },
      { id: 'sahabat_17', title: 'JANGAN Lantik Beliau Panglima Perang.. Terlalu BERANI! (Bahagian 1)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/8w4fx1.mp4' },
      { id: 'sahabat_18', title: 'JANGAN Lantik Beliau Panglima Perang.. Terlalu BERANI! (Bahagian 2)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/d38404.mp4' },
      { id: 'sahabat_19', title: 'Membunuh 100 Musyrikin Dalam Pertarungan 1 Lawan 1 (Bahagian 1)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/beiqu0.mp4' },
      { id: 'sahabat_20', title: 'Membunuh 100 Musyrikin Dalam Pertarungan 1 Lawan 1 (Bahagian 2)', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/g3sk9m.mp4' },
      { id: 'sahabat_21', title: 'Seorang Yang Buta Tetapi Merupakan Pemegang Panji Perang', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/hwp5xc.mp4' },
      { id: 'sahabat_22', title: 'Andai Iman Ini Di Bintang Suraya, Nescaya Dicapai Pemuda Ini', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/d7f7gs.mp4' },
      { id: 'sahabat_23', title: 'Ayah & Anak Syahid Di Medan Yang Sama', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/sdzl00.mp4' },
      { id: 'sahabat_24', title: 'Beliau Adalah Panglima Pertama Misi Ketenteraan', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/m0zape.mp4' },
      { id: 'sahabat_25', title: 'Dialah Yang Pertama Memberi Salam Kepada Rasulullah ﷺ', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/ekaiht.mp4' },
      { id: 'sahabat_26', title: 'Meminta Simpan Jenazah Di Pintu Gerbang Utama Konstantinopel', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/ewxgop.mp4' },
      { id: 'sahabat_27', title: 'Si Pembunuh Tertunduk Malu Di Hadapan Rasulullah ﷺ', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/i9sqq7.mp4' },
      { id: 'sahabat_28', title: 'Mempunyai Suara Bacaan Al-Quran Yang Merdu', thumbnail: 'https://i.postimg.cc/KjHf4vvH/Kisah-Sahabat.jpg', url: 'https://files.catbox.moe/gze5xs.mp4' }
    ]
  },
  {
    id: 'kisah_hidup_akhir_zaman',
    type: 'series',
    name: 'Kisah Hidup Akhir Zaman (Series)',
    poster: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg',
    description: 'Siri Kisah Hidup Akhir Zaman',
    videos: [
      { id: 'az_1', title: 'Akhir Zaman Episod 1', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/dmr7ys.mp4' },
      { id: 'az_2', title: 'Akhir Zaman Episod 2', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/c05jnq.mp4' },
      { id: 'az_3', title: 'Akhir Zaman Episod 3', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/sakwy1.mp4' },
      { id: 'az_4', title: 'Akhir Zaman Episod 4', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/8jcm2b.mp4' },
      { id: 'az_5', title: 'Akhir Zaman Episod 5', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/fcw4me.mp4' },
      { id: 'az_6', title: 'Akhir Zaman Episod 6', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/ve28k8.mp4' },
      { id: 'az_7', title: 'Akhir Zaman Episod 7', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/cml4j6.mp4' },
      { id: 'az_8', title: 'Akhir Zaman Episod 8', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/t9ta6d.mp4' },
      { id: 'az_9', title: 'Akhir Zaman Episod 9', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/991agh.mp4' },
      { id: 'az_10', title: 'Akhir Zaman Episod 10', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/grbp8x.mp4' },
      { id: 'az_11', title: 'Akhir Zaman Episod 11', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/38soe6.mp4' },
      { id: 'az_12', title: 'Akhir Zaman Episod 12', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/ler4ag.mp4' },
      { id: 'az_13', title: 'Akhir Zaman Episod 13', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/ec9jc1.mp4' },
      { id: 'az_14', title: 'Akhir Zaman Episod 14', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/e9ckzj.mp4' },
      { id: 'az_15', title: 'Akhir Zaman Episod 15', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/rwzqqg.mp4' },
      { id: 'az_16', title: 'Akhir Zaman Episod 16', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/lfr6y0.mp4' },
      { id: 'az_17', title: 'Akhir Zaman Episod 17', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/5lod2l.mp4' },
      { id: 'az_18', title: 'Akhir Zaman Episod 18', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/2u6jeq.mp4' },
      { id: 'az_19', title: 'Akhir Zaman Episod 19', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/y4dfdt.mp4' },
      { id: 'az_20', title: 'Akhir Zaman Episod 20', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/cupuua.mp4' },
      { id: 'az_21', title: 'Akhir Zaman Episod 21', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/xlfvy0.mp4' },
      { id: 'az_22', title: 'Akhir Zaman Episod 22', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/svf1ld.mp4' },
      { id: 'az_23', title: 'Akhir Zaman Episod 23', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/6dmnwt.mp4' },
      { id: 'az_24', title: 'Akhir Zaman Episod 24', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/xz9p55.mp4' },
      { id: 'az_25', title: 'Akhir Zaman Episod 25', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/1oeizf.mp4' },
      { id: 'az_26', title: 'Akhir Zaman Episod 26', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/1dpc4q.mp4' },
      { id: 'az_27', title: 'Akhir Zaman Episod 27', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/wkk250.mp4' },
      { id: 'az_28', title: 'Akhir Zaman Episod 28', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/ns7oqa.mp4' },
      { id: 'az_29', title: 'Akhir Zaman Episod 29', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/rikryy.mp4' },
      { id: 'az_30', title: 'Akhir Zaman Episod 30', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/v6lwxq.mp4' },
      { id: 'az_31', title: 'Akhir Zaman Episod 31', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/qoyb9l.mp4' },
      { id: 'az_32', title: 'Akhir Zaman Episod 32', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/fa0z2q.mp4' },
      { id: 'az_33', title: 'Akhir Zaman Episod 33', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/rb6n12.mp4' },
      { id: 'az_34', title: 'Akhir Zaman Episod 34', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/p5a2ds.mp4' },
      { id: 'az_35', title: 'Akhir Zaman Episod 35', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/n4ro3i.mp4' },
      { id: 'az_36', title: 'Akhir Zaman Episod 36', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/f926el.mp4' },
      { id: 'az_37', title: 'Akhir Zaman Episod 37', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/sa6gq8.mp4' },
      { id: 'az_38', title: 'Akhir Zaman Episod 38', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/55vgoa.mp4' },
      { id: 'az_39', title: 'Akhir Zaman Episod 39', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/edzksm.mp4' },
      { id: 'az_40', title: 'Akhir Zaman Episod 40', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/g6gx07.mp4' },
      { id: 'az_41', title: 'Akhir Zaman Episod 41', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/h3rt2t.mp4' },
      { id: 'az_42', title: 'Akhir Zaman Episod 42', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/7zgjio.mp4' },
      { id: 'az_43', title: 'Akhir Zaman Episod 43', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/nianl8.mp4' },
      { id: 'az_44', title: 'Akhir Zaman Episod 44', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/pk2ija.mp4' },
      { id: 'az_45', title: 'Akhir Zaman Episod 45', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/g6vzed.mp4' },
      { id: 'az_46', title: 'Akhir Zaman Episod 46', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/2xr42f.mp4' },
      { id: 'az_47', title: 'Akhir Zaman Episod 47', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/i636mu.mp4' },
      { id: 'az_48', title: 'Akhir Zaman Episod 48', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/2dh0kw.mp4' },
      { id: 'az_49', title: 'Akhir Zaman Episod 49', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/osqos3.mp4' },
      { id: 'az_50', title: 'Akhir Zaman Episod 50', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/clraet.mp4' },
      { id: 'az_51', title: 'Akhir Zaman Episod 51', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/02vue5.mp4' },
      { id: 'az_52', title: 'Akhir Zaman Episod 52', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/oih2ce.mp4' },
      { id: 'az_53', title: 'Akhir Zaman Episod 53', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/opbp3x.mp4' },
      { id: 'az_54', title: 'Akhir Zaman Episod 54', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/47lmkc.mp4' },
      { id: 'az_55', title: 'Akhir Zaman Episod 55', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/gh1des.mp4' },
      { id: 'az_56', title: 'Akhir Zaman Episod 56', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/ny4qqj.mp4' },
      { id: 'az_57', title: 'Akhir Zaman Episod 57', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/v3yvoh.mp4' },
      { id: 'az_58', title: 'Akhir Zaman Episod 58', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/2bmvek.mp4' },
      { id: 'az_59', title: 'Akhir Zaman Episod 59', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/rnkq3v.mp4' },
      { id: 'az_60', title: 'Akhir Zaman Episod 60', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/a6i9oa.mp4' },
      { id: 'az_61', title: 'Akhir Zaman Episod 61', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/wj13np.mp4' },
      { id: 'az_62', title: 'Akhir Zaman Episod 62', thumbnail: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg', url: 'https://files.catbox.moe/2uk8a3.mp4' }
    ]
  },
  {
    id: 'mahsyar',
    type: 'series',
    name: 'Mahsyar (Series)',
    poster: 'https://i.postimg.cc/nVR03TYz/Mahsyar.jpg',
    description: 'Siri Perjalanan Di Mahsyar',
    videos: [
      { id: 'mahsyar_1', title: 'Mahsyar 1 - Kalau Binatang Sahaja Pun Dah Sesak', thumbnail: 'https://i.postimg.cc/nVR03TYz/Mahsyar.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbf4e66e979983cdce554a' },
      { id: 'mahsyar_2', title: 'Mahsyar 2 - Berselisih Dengan Ahli Keluarga, Tidak Bertegur', thumbnail: 'https://i.postimg.cc/nVR03TYz/Mahsyar.jpg', url: 'https://files.catbox.moe/5mgrcm.mp4' },
      { id: 'mahsyar_3', title: 'Mahsyar 3 - Berapa Kumpulan Manusia Di Mahsyar', thumbnail: 'https://i.postimg.cc/nVR03TYz/Mahsyar.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbf4f36e979983cdce554b' },
      { id: 'mahsyar_4', title: 'Mahsyar 4 - Beliau Empunya Syafaat Teragung', thumbnail: 'https://i.postimg.cc/nVR03TYz/Mahsyar.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbf4fe6e979983cdce554c' },
      { id: 'mahsyar_5', title: 'Mahsyar 5 - Mizan, Mesti Canggih Alat Timbangan Amal', thumbnail: 'https://i.postimg.cc/nVR03TYz/Mahsyar.jpg', url: 'https://files.catbox.moe/x9i1ns.mp4' },
      { id: 'mahsyar_6', title: 'Mahsyar 6 - Tak Terbayang 1000 Tahun Di Dalam Api', thumbnail: 'https://i.postimg.cc/nVR03TYz/Mahsyar.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbf5076e979983cdce554d' },
      { id: 'mahsyar_7', title: 'Mahsyar 7 - Syurga Atau Neraka Semuanya Pilihan Diri', thumbnail: 'https://i.postimg.cc/nVR03TYz/Mahsyar.jpg', url: 'https://files.catbox.moe/oxfje5.mp4' }
    ]
  },
  {
    id: 'crayon_shin_chan',
    type: 'series',
    name: 'Crayon Shin Chan (Series)',
    poster: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg',
    description: 'Crayon Shin Chan Series',
    videos: [
      { id: 'shin_1', title: 'Crayon Shin Chan Episode 1', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/b9vevt.mp4' },
      { id: 'shin_2', title: 'Crayon Shin Chan Episode 2', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/7rag9o.mp4' },
      { id: 'shin_3', title: 'Crayon Shin Chan Episode 3', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/m0edfm.mp4' },
      { id: 'shin_4', title: 'Crayon Shin Chan Episode 4', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/pynt42.mp4' },
      { id: 'shin_5', title: 'Crayon Shin Chan Episode 5', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/7yvdbd.mp4' },
      { id: 'shin_6', title: 'Crayon Shin Chan Episode 6', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/w8huc2.mkv' },
      { id: 'shin_7', title: 'Crayon Shin Chan Episode 7', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/nejhuv.mp4' },
      { id: 'shin_8', title: 'Crayon Shin Chan Episode 8', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/8ca3cr.mp4' },
      { id: 'shin_9', title: 'Crayon Shin Chan Episode 9', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/02x60l.mkv' },
      { id: 'shin_10', title: 'Crayon Shin Chan Episode 10', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/8ea559.mp4' },
      { id: 'shin_11', title: 'Crayon Shin Chan Episode 11', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/9t4e7x.webm' },
      { id: 'shin_12', title: 'Crayon Shin Chan Episode 12', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/kk607w.mkv' },
      { id: 'shin_13', title: 'Crayon Shin Chan Episode 13', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/tjtmqn.mkv' },
      { id: 'shin_14', title: 'Crayon Shin Chan Episode 14', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/wy4h99.mkv' },
      { id: 'shin_15', title: 'Crayon Shin Chan Episode 15', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/wdv2kj.mp4' },
      { id: 'shin_16', title: 'Crayon Shin Chan Episode 16', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/t116gx.mkv' },
      { id: 'shin_17', title: 'Crayon Shin Chan Episode 17', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/f5vmu3.mkv' },
      { id: 'shin_18', title: 'Crayon Shin Chan Episode 18', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/vq10zw.mkv' },
      { id: 'shin_19', title: 'Crayon Shin Chan Episode 19', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/et4g5i.mkv' },
      { id: 'shin_20', title: 'Crayon Shin Chan Episode 20', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/rtzjgh.mp4' },
      { id: 'shin_21', title: 'Crayon Shin Chan Episode 21', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/c2zjxo.mkv' },
      { id: 'shin_22', title: 'Crayon Shin Chan Episode 22', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/oqiy2x.mkv' },
      { id: 'shin_23', title: 'Crayon Shin Chan Episode 23', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/4hawk0.webm' },
      { id: 'shin_24', title: 'Crayon Shin Chan Episode 24', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/tvef9t.mp4' },
      { id: 'shin_25', title: 'Crayon Shin Chan Episode 25', thumbnail: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg', url: 'https://files.catbox.moe/ikw3wi.mkv' }
    ]
  },
  {
    id: 'digimon_adventure_01',
    type: 'series',
    name: 'Digimon Adventure 01 (Series)',
    poster: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg',
    description: 'Digimon Adventure 01 Series',
    videos: [
      { id: 'digimon01_1', title: 'Digimon Adventure 01 - Episode 1', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/e0rqpf.mkv' },
      { id: 'digimon01_2', title: 'Digimon Adventure 01 - Episode 2', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/2hou0p.mkv' },
      { id: 'digimon01_3', title: 'Digimon Adventure 01 - Episode 3', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/e9v6wa.mkv' },
      { id: 'digimon01_4', title: 'Digimon Adventure 01 - Episode 4', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/gu2sos.mkv' },
      { id: 'digimon01_5', title: 'Digimon Adventure 01 - Episode 5', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/n6rsk2.mkv' },
      { id: 'digimon01_6', title: 'Digimon Adventure 01 - Episode 6', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/tskc12.mkv' },
      { id: 'digimon01_7', title: 'Digimon Adventure 01 - Episode 7', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/fpko2t.mkv' },
      { id: 'digimon01_8', title: 'Digimon Adventure 01 - Episode 8', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/r0bem3.mkv' },
      { id: 'digimon01_9', title: 'Digimon Adventure 01 - Episode 9', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/cdimzv.mkv' },
      { id: 'digimon01_10', title: 'Digimon Adventure 01 - Episode 10', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/0yua59.mkv' },
      { id: 'digimon01_11', title: 'Digimon Adventure 01 - Episode 11', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/wofmc1.mkv' },
      { id: 'digimon01_12', title: 'Digimon Adventure 01 - Episode 12', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/zezjha.mkv' },
      { id: 'digimon01_13', title: 'Digimon Adventure 01 - Episode 13', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/jz8h9m.mkv' },
      { id: 'digimon01_14', title: 'Digimon Adventure 01 - Episode 14', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/ttnebg.mkv' },
      { id: 'digimon01_15', title: 'Digimon Adventure 01 - Episode 15', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/j1qgd0.mkv' },
      { id: 'digimon01_16', title: 'Digimon Adventure 01 - Episode 16', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/2f5l1i.mkv' },
      { id: 'digimon01_17', title: 'Digimon Adventure 01 - Episode 17', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/9zl6f3.mkv' },
      { id: 'digimon01_18', title: 'Digimon Adventure 01 - Episode 18', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/g5mp05.mkv' },
      { id: 'digimon01_19', title: 'Digimon Adventure 01 - Episode 19', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/9qyu8m.mkv' },
      { id: 'digimon01_20', title: 'Digimon Adventure 01 - Episode 20', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/qi4907.mkv' },
      { id: 'digimon01_21', title: 'Digimon Adventure 01 - Episode 21', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/62qm6q.mkv' },
      { id: 'digimon01_22', title: 'Digimon Adventure 01 - Episode 22', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/qd2rp6.mkv' },
      { id: 'digimon01_23', title: 'Digimon Adventure 01 - Episode 23', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/hsirv9.mkv' },
      { id: 'digimon01_24', title: 'Digimon Adventure 01 - Episode 24', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/j9inza.mkv' },
      { id: 'digimon01_25', title: 'Digimon Adventure 01 - Episode 25', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/imdz6v.mkv' },
      { id: 'digimon01_26', title: 'Digimon Adventure 01 - Episode 26', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/eavdti.mkv' },
      { id: 'digimon01_27', title: 'Digimon Adventure 01 - Episode 27', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/6bt1jb.mkv' },
      { id: 'digimon01_28', title: 'Digimon Adventure 01 - Episode 28', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/j7y6l5.mkv' },
      { id: 'digimon01_29', title: 'Digimon Adventure 01 - Episode 29', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/k3qi71.mkv' },
      { id: 'digimon01_30', title: 'Digimon Adventure 01 - Episode 30', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/z48p20.mkv' },
      { id: 'digimon01_31', title: 'Digimon Adventure 01 - Episode 31', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/0liv2g.mkv' },
      { id: 'digimon01_32', title: 'Digimon Adventure 01 - Episode 32', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/ib93b9.mkv' },
      { id: 'digimon01_33', title: 'Digimon Adventure 01 - Episode 33', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/cmddcq.mkv' },
      { id: 'digimon01_34', title: 'Digimon Adventure 01 - Episode 34', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/hc75qs.mkv' },
      { id: 'digimon01_35', title: 'Digimon Adventure 01 - Episode 35', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/80ihqw.mkv' },
      { id: 'digimon01_36', title: 'Digimon Adventure 01 - Episode 36', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/2j4528.mkv' },
      { id: 'digimon01_37', title: 'Digimon Adventure 01 - Episode 37', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/m2vk0x.mkv' },
      { id: 'digimon01_38', title: 'Digimon Adventure 01 - Episode 38', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/bxkjwm.mkv' },
      { id: 'digimon01_39', title: 'Digimon Adventure 01 - Episode 39', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/1b9gwu.mkv' },
      { id: 'digimon01_40', title: 'Digimon Adventure 01 - Episode 40', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/lnxlw4.mkv' },
      { id: 'digimon01_41', title: 'Digimon Adventure 01 - Episode 41', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/kffur9.mkv' },
      { id: 'digimon01_42', title: 'Digimon Adventure 01 - Episode 42', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/x39h67.mkv' },
      { id: 'digimon01_43', title: 'Digimon Adventure 01 - Episode 43', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/b5mwsr.mkv' },
      { id: 'digimon01_44', title: 'Digimon Adventure 01 - Episode 44', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/cwq3jd.mkv' },
      { id: 'digimon01_45', title: 'Digimon Adventure 01 - Episode 45', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/gokoql.mkv' },
      { id: 'digimon01_46', title: 'Digimon Adventure 01 - Episode 46', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/a88ir0.mkv' },
      { id: 'digimon01_47', title: 'Digimon Adventure 01 - Episode 47', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/e2ocb9.mkv' },
      { id: 'digimon01_48', title: 'Digimon Adventure 01 - Episode 48', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/op51ps.mkv' },
      { id: 'digimon01_49', title: 'Digimon Adventure 01 - Episode 49', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/ynheic.mkv' },
      { id: 'digimon01_50', title: 'Digimon Adventure 01 - Episode 50', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/44nsq7.mkv' },
      { id: 'digimon01_51', title: 'Digimon Adventure 01 - Episode 51', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/tvu37m.mkv' },
      { id: 'digimon01_52', title: 'Digimon Adventure 01 - Episode 52', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/dqatyz.mkv' },
      { id: 'digimon01_53', title: 'Digimon Adventure 01 - Episode 53', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/sbex83.mkv' },
      { id: 'digimon01_54', title: 'Digimon Adventure 01 - Episode 54', thumbnail: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg', url: 'https://files.catbox.moe/qd2yx9.mkv' }
    ]
  },
  {
    id: 'digimon_savers',
    type: 'series',
    name: 'Digimon Savers (Series)',
    poster: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg',
    description: 'Digimon Savers Series',
    videos: [
      { id: 'savers_1', title: 'Digimon Savers Episode 1', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/pjuq4v.mp4' },
      { id: 'savers_2', title: 'Digimon Savers Episode 2', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/2xj9b9.mp4' },
      { id: 'savers_3', title: 'Digimon Savers Episode 3', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/qwdfom.mp4' },
      { id: 'savers_4', title: 'Digimon Savers Episode 4', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/0rcnrs.mp4' },
      { id: 'savers_5', title: 'Digimon Savers Episode 5', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/dcum9s.mp4' },
      { id: 'savers_6', title: 'Digimon Savers Episode 6', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/m7vixb.mp4' },
      { id: 'savers_7', title: 'Digimon Savers Episode 7', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/kwgaqq.mp4' },
      { id: 'savers_8', title: 'Digimon Savers Episode 8', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/odxlwf.mp4' },
      { id: 'savers_9', title: 'Digimon Savers Episode 9', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/903sr9.mp4' },
      { id: 'savers_10', title: 'Digimon Savers Episode 10', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/v2vwvm.mp4' },
      { id: 'savers_11', title: 'Digimon Savers Episode 11', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/jnjj2h.mp4' },
      { id: 'savers_12', title: 'Digimon Savers Episode 12', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/c82q1v.mp4' },
      { id: 'savers_13', title: 'Digimon Savers Episode 13', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/dc7of9.mp4' },
      { id: 'savers_14', title: 'Digimon Savers Episode 14', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/j2f9wa.mp4' },
      { id: 'savers_15', title: 'Digimon Savers Episode 15', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/ogadln.mp4' },
      { id: 'savers_16', title: 'Digimon Savers Episode 16', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/gfctf7.mp4' },
      { id: 'savers_17', title: 'Digimon Savers Episode 17', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/tus67m.mp4' },
      { id: 'savers_18', title: 'Digimon Savers Episode 18', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/paodxr.mp4' },
      { id: 'savers_19', title: 'Digimon Savers Episode 19', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/t8zlhi.mp4' },
      { id: 'savers_20', title: 'Digimon Savers Episode 20', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/sgg2ih.mp4' },
      { id: 'savers_21', title: 'Digimon Savers Episode 21', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/t2ysv4.mp4' },
      { id: 'savers_22', title: 'Digimon Savers Episode 22', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/981fj9.mp4' },
      { id: 'savers_23', title: 'Digimon Savers Episode 23', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/ok19dj.mp4' },
      { id: 'savers_24', title: 'Digimon Savers Episode 24', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/yn3mcd.mp4' },
      { id: 'savers_25', title: 'Digimon Savers Episode 25', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/kyn0pe.mp4' },
      { id: 'savers_26', title: 'Digimon Savers Episode 26', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/oyg7fd.mp4' },
      { id: 'savers_27', title: 'Digimon Savers Episode 27', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/xn5x2v.mp4' },
      { id: 'savers_28', title: 'Digimon Savers Episode 28', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/bo830d.mp4' },
      { id: 'savers_29', title: 'Digimon Savers Episode 29', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/0axnec.mp4' },
      { id: 'savers_30', title: 'Digimon Savers Episode 30', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/k67jwm.mp4' },
      { id: 'savers_31', title: 'Digimon Savers Episode 31', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/2s09wt.mp4' },
      { id: 'savers_32', title: 'Digimon Savers Episode 32', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/1337zx.mp4' },
      { id: 'savers_33', title: 'Digimon Savers Episode 33', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/yyj40k.mp4' },
      { id: 'savers_34', title: 'Digimon Savers Episode 34', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/00iraw.mp4' },
      { id: 'savers_35', title: 'Digimon Savers Episode 35', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/mu4b9q.mp4' },
      { id: 'savers_36', title: 'Digimon Savers Episode 36', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/ng4uzb.mp4' },
      { id: 'savers_37', title: 'Digimon Savers Episode 37', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/e0qa9y.mp4' },
      { id: 'savers_38', title: 'Digimon Savers Episode 38', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/iyxhhs.mp4' },
      { id: 'savers_39', title: 'Digimon Savers Episode 39', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/ggmem5.mp4' },
      { id: 'savers_40', title: 'Digimon Savers Episode 40', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/107d1y.mp4' },
      { id: 'savers_41', title: 'Digimon Savers Episode 41', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/ttwtn5.mp4' },
      { id: 'savers_42', title: 'Digimon Savers Episode 42', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/7skrqk.mp4' },
      { id: 'savers_43', title: 'Digimon Savers Episode 43', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/sub0gd.mp4' },
      { id: 'savers_44', title: 'Digimon Savers Episode 44', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/rrkgee.mp4' },
      { id: 'savers_45', title: 'Digimon Savers Episode 45', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/30u7ag.mp4' },
      { id: 'savers_46', title: 'Digimon Savers Episode 46', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/a1obqr.mp4' },
      { id: 'savers_47', title: 'Digimon Savers Episode 47', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/8anpz9.mp4' },
      { id: 'savers_48', title: 'Digimon Savers Episode 48', thumbnail: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg', url: 'https://files.catbox.moe/23a3j8.mp4' }
    ]
  },
  {
    id: 'black_cat',
    type: 'series',
    name: 'Black Cat (Series)',
    poster: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg',
    description: 'Black Cat Series',
    videos: [
      { id: 'bc_1', title: 'Black Cat Episode 1', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/xt0a0n.mp4' },
      { id: 'bc_2', title: 'Black Cat Episode 2', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/k1wxy6.mp4' },
      { id: 'bc_3', title: 'Black Cat Episode 3', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/npays5.mp4' },
      { id: 'bc_4', title: 'Black Cat Episode 4', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/vr6t77.mp4' },
      { id: 'bc_5', title: 'Black Cat Episode 5', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/rtp95u.mp4' },
      { id: 'bc_6', title: 'Black Cat Episode 6', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/3u3jbh.mp4' },
      { id: 'bc_7', title: 'Black Cat Episode 7', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/6hf6fs.mp4' },
      { id: 'bc_8', title: 'Black Cat Episode 8', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/u9zsug.mp4' },
      { id: 'bc_9', title: 'Black Cat Episode 9', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/tza3td.mp4' },
      { id: 'bc_10', title: 'Black Cat Episode 10', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/s2z3iy.mp4' },
      { id: 'bc_11', title: 'Black Cat Episode 11', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/p0nv9h.mp4' },
      { id: 'bc_12', title: 'Black Cat Episode 12', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/3l5rnc.mp4' },
      { id: 'bc_13', title: 'Black Cat Episode 13', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/am14fw.mp4' },
      { id: 'bc_14', title: 'Black Cat Episode 14', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/ip19yx.mp4' },
      { id: 'bc_15', title: 'Black Cat Episode 15', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/ifwh66.mp4' },
      { id: 'bc_16', title: 'Black Cat Episode 16', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/jrf7j4.mp4' },
      { id: 'bc_17', title: 'Black Cat Episode 17', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/j5scn9.mp4' },
      { id: 'bc_18', title: 'Black Cat Episode 18', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/hjueai.mp4' },
      { id: 'bc_19', title: 'Black Cat Episode 19', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/3ds9an.mp4' },
      { id: 'bc_20', title: 'Black Cat Episode 20', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/o80p7r.mp4' },
      { id: 'bc_21', title: 'Black Cat Episode 21', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/6vtgbq.mp4' },
      { id: 'bc_22', title: 'Black Cat Episode 22', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/58zmb9.mp4' },
      { id: 'bc_23', title: 'Black Cat Episode 23', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/3zrbqp.mp4' },
      { id: 'bc_24', title: 'Black Cat Episode 24', thumbnail: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg', url: 'https://files.catbox.moe/jsah3e.mp4' }
    ]
  },
  {
    id: 'ginban_kaleidoscope',
    type: 'series',
    name: 'Ginban Kaleidoscope (Series)',
    poster: 'https://i.postimg.cc/x1ywwxmB/Ginban-Kaleidoscope.jpg',
    description: 'Ginban Kaleidoscope Series',
    videos: [
      { id: 'ginban_1', title: 'Ginban Kaleidoscope Episode 1', thumbnail: 'https://i.postimg.cc/x1ywwxmB/Ginban-Kaleidoscope.jpg', url: 'https://files.catbox.moe/5je70q.flv' },
      { id: 'ginban_2', title: 'Ginban Kaleidoscope Episode 2', thumbnail: 'https://i.postimg.cc/x1ywwxmB/Ginban-Kaleidoscope.jpg', url: 'https://files.catbox.moe/l4dsxu.flv' },
      { id: 'ginban_3', title: 'Ginban Kaleidoscope Episode 3', thumbnail: 'https://i.postimg.cc/x1ywwxmB/Ginban-Kaleidoscope.jpg', url: 'https://files.catbox.moe/0pffen.flv' },
      { id: 'ginban_4', title: 'Ginban Kaleidoscope Episode 4', thumbnail: 'https://i.postimg.cc/x1ywwxmB/Ginban-Kaleidoscope.jpg', url: 'https://files.catbox.moe/v67xcz.mp4' },
      { id: 'ginban_5', title: 'Ginban Kaleidoscope Episode 5', thumbnail: 'https://i.postimg.cc/x1ywwxmB/Ginban-Kaleidoscope.jpg', url: 'https://files.catbox.moe/dth1gm.mp4' },
      { id: 'ginban_6', title: 'Ginban Kaleidoscope Episode 6', thumbnail: 'https://i.postimg.cc/x1ywwxmB/Ginban-Kaleidoscope.jpg', url: 'https://files.catbox.moe/tvcszy.mp4' },
      { id: 'ginban_7', title: 'Ginban Kaleidoscope Episode 7', thumbnail: 'https://i.postimg.cc/x1ywwxmB/Ginban-Kaleidoscope.jpg', url: 'https://files.catbox.moe/pj6spq.mp4' },
      { id: 'ginban_8', title: 'Ginban Kaleidoscope Episode 8', thumbnail: 'https://i.postimg.cc/x1ywwxmB/Ginban-Kaleidoscope.jpg', url: 'https://files.catbox.moe/tta199.mp4' },
      { id: 'ginban_9', title: 'Ginban Kaleidoscope Episode 9', thumbnail: 'https://i.postimg.cc/x1ywwxmB/Ginban-Kaleidoscope.jpg', url: 'https://files.catbox.moe/dzl7mp.mp4' },
      { id: 'ginban_10', title: 'Ginban Kaleidoscope Episode 10', thumbnail: 'https://i.postimg.cc/x1ywwxmB/Ginban-Kaleidoscope.jpg', url: 'https://files.catbox.moe/mzv0e3.mp4' },
      { id: 'ginban_11', title: 'Ginban Kaleidoscope Episode 11', thumbnail: 'https://i.postimg.cc/x1ywwxmB/Ginban-Kaleidoscope.jpg', url: 'https://files.catbox.moe/8cxro0.mp4' },
      { id: 'ginban_12', title: 'Ginban Kaleidoscope Episode 12', thumbnail: 'https://i.postimg.cc/x1ywwxmB/Ginban-Kaleidoscope.jpg', url: 'https://files.catbox.moe/c33xc2.mp4' }
    ]
  },
  {
    id: 'the_law_of_ueki',
    type: 'series',
    name: 'The Law Of Ueki (Series)',
    poster: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg',
    description: 'The Law Of Ueki Series',
    videos: [
      { id: 'ueki_1', title: 'The Law Of Ueki Episode 1', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/8kj5ks.mp4' },
      { id: 'ueki_2', title: 'The Law Of Ueki Episode 2', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/z0g9yg.mp4' },
      { id: 'ueki_3', title: 'The Law Of Ueki Episode 3', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/08sesz.mp4' },
      { id: 'ueki_4', title: 'The Law Of Ueki Episode 4', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/6md76n.mp4' },
      { id: 'ueki_5', title: 'The Law Of Ueki Episode 5', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/807ppt.mp4' },
      { id: 'ueki_6', title: 'The Law Of Ueki Episode 6', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/p97pyk.mp4' },
      { id: 'ueki_7', title: 'The Law Of Ueki Episode 7', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/u4xc7f.mp4' },
      { id: 'ueki_8', title: 'The Law Of Ueki Episode 8', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/t6cqgz.mp4' },
      { id: 'ueki_9', title: 'The Law Of Ueki Episode 9', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/ccd8xy.mp4' },
      { id: 'ueki_10', title: 'The Law Of Ueki Episode 10', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/00umfq.mp4' },
      { id: 'ueki_11', title: 'The Law Of Ueki Episode 11', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/4jqaxr.mp4' },
      { id: 'ueki_12', title: 'The Law Of Ueki Episode 12', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/f2fu7v.mp4' },
      { id: 'ueki_13', title: 'The Law Of Ueki Episode 13', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/3hqo5h.mp4' },
      { id: 'ueki_14', title: 'The Law Of Ueki Episode 14', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/k5rsv8.mp4' },
      { id: 'ueki_15', title: 'The Law Of Ueki Episode 15', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/a52eaw.mp4' },
      { id: 'ueki_16', title: 'The Law Of Ueki Episode 16', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/92vn6m.mp4' },
      { id: 'ueki_17', title: 'The Law Of Ueki Episode 17', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/lc4ggf.mp4' },
      { id: 'ueki_18', title: 'The Law Of Ueki Episode 18', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/g7z0qd.mp4' },
      { id: 'ueki_19', title: 'The Law Of Ueki Episode 19', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/1cu6nb.mp4' },
      { id: 'ueki_20', title: 'The Law Of Ueki Episode 20', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/simne6.mp4' },
      { id: 'ueki_21', title: 'The Law Of Ueki Episode 21', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/qsd9d6.mp4' },
      { id: 'ueki_22', title: 'The Law Of Ueki Episode 22', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/bvqz25.mp4' },
      { id: 'ueki_23', title: 'The Law Of Ueki Episode 23', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/lz4f81.mp4' },
      { id: 'ueki_24', title: 'The Law Of Ueki Episode 24', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/cxdp53.mp4' },
      { id: 'ueki_25', title: 'The Law Of Ueki Episode 25', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/42fp1m.mp4' },
      { id: 'ueki_26', title: 'The Law Of Ueki Episode 26', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/0cct4v.mp4' },
      { id: 'ueki_27', title: 'The Law Of Ueki Episode 27', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/tq28dt.mp4' },
      { id: 'ueki_28', title: 'The Law Of Ueki Episode 28', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/4644lf.MP4' },
      { id: 'ueki_29', title: 'The Law Of Ueki Episode 29', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/220ni1.MP4' },
      { id: 'ueki_30', title: 'The Law Of Ueki Episode 30', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/yr03al.MP4' },
      { id: 'ueki_31', title: 'The Law Of Ueki Episode 31', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/1owo27.MP4' },
      { id: 'ueki_32', title: 'The Law Of Ueki Episode 32', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/5p84az.MP4' },
      { id: 'ueki_33', title: 'The Law Of Ueki Episode 33', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/xwp7g4.MP4' },
      { id: 'ueki_34', title: 'The Law Of Ueki Episode 34', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/nq68ze.MP4' },
      { id: 'ueki_35', title: 'The Law Of Ueki Episode 35', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/5iklua.MP4' },
      { id: 'ueki_36', title: 'The Law Of Ueki Episode 36', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/4n3ctq.MP4' },
      { id: 'ueki_37', title: 'The Law Of Ueki Episode 37', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/82q9a5.MP4' },
      { id: 'ueki_38', title: 'The Law Of Ueki Episode 38', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/2sl6it.MP4' },
      { id: 'ueki_39', title: 'The Law Of Ueki Episode 39', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/1o0vhh.MP4' },
      { id: 'ueki_40', title: 'The Law Of Ueki Episode 40', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/9wxs8p.MP4' },
      { id: 'ueki_41', title: 'The Law Of Ueki Episode 41', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/bwk5nr.MP4' },
      { id: 'ueki_42', title: 'The Law Of Ueki Episode 42', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/rf1i5n.MP4' },
      { id: 'ueki_43', title: 'The Law Of Ueki Episode 43', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/a8wyuy.MP4' },
      { id: 'ueki_44', title: 'The Law Of Ueki Episode 44', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/lwe17r.MP4' },
      { id: 'ueki_45', title: 'The Law Of Ueki Episode 45', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/kno50g.MP4' },
      { id: 'ueki_46', title: 'The Law Of Ueki Episode 46', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/3x4ddf.MP4' },
      { id: 'ueki_47', title: 'The Law Of Ueki Episode 47', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/iiksmp.MP4' },
      { id: 'ueki_48', title: 'The Law Of Ueki Episode 48', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/qa4dc0.MP4' },
      { id: 'ueki_49', title: 'The Law Of Ueki Episode 49', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/ayw9r7.MP4' },
      { id: 'ueki_50', title: 'The Law Of Ueki Episode 50', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/z2903v.MP4' },
      { id: 'ueki_51', title: 'The Law Of Ueki Episode 51', thumbnail: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg', url: 'https://files.catbox.moe/wb03ng.MP4' }
    ]
  },
  {
    id: 'anak_anak_sidek',
    type: 'series',
    name: 'Anak-Anak Sidek (Series)',
    poster: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg',
    description: 'Anak-Anak Sidek Series',
    videos: [
      { id: 'sidek_1', title: 'Anak-Anak Sidek Episode 1', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/0ts7am.mp4' },
      { id: 'sidek_2', title: 'Anak-Anak Sidek Episode 2', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/lpswls.mp4' },
      { id: 'sidek_3', title: 'Anak-Anak Sidek Episode 3', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/lbmnel.mp4' },
      { id: 'sidek_4', title: 'Anak-Anak Sidek Episode 4', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/eligd9.mp4' },
      { id: 'sidek_5', title: 'Anak-Anak Sidek Episode 5', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/khs41p.mp4' },
      { id: 'sidek_6', title: 'Anak-Anak Sidek Episode 6', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/26c3re.mp4' },
      { id: 'sidek_7', title: 'Anak-Anak Sidek Episode 7', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/b16149.mp4' },
      { id: 'sidek_8', title: 'Anak-Anak Sidek Episode 8', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/mxe2nn.mp4' },
      { id: 'sidek_9', title: 'Anak-Anak Sidek Episode 9', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/s1ayej.mp4' },
      { id: 'sidek_10', title: 'Anak-Anak Sidek Episode 10', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/32z6i6.mp4' },
      { id: 'sidek_11', title: 'Anak-Anak Sidek Episode 11', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/f8pnpd.mp4' },
      { id: 'sidek_12', title: 'Anak-Anak Sidek Episode 12', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/86iy1e.mp4' },
      { id: 'sidek_13', title: 'Anak-Anak Sidek Episode 13', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/ttqlp9.mp4' },
      { id: 'sidek_14', title: 'Anak-Anak Sidek Episode 14', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/q9dr60.mp4' },
      { id: 'sidek_15', title: 'Anak-Anak Sidek Episode 15', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/of0qnd.mp4' },
      { id: 'sidek_16', title: 'Anak-Anak Sidek Episode 16', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/cedu56.mp4' },
      { id: 'sidek_17', title: 'Anak-Anak Sidek Episode 17', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/xdskm8.mp4' },
      { id: 'sidek_18', title: 'Anak-Anak Sidek Episode 18', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/9mzf1z.mp4' },
      { id: 'sidek_19', title: 'Anak-Anak Sidek Episode 19', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/lsz3p9.mp4' },
      { id: 'sidek_20', title: 'Anak-Anak Sidek Episode 20', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/3mxx6i.mp4' },
      { id: 'sidek_21', title: 'Anak-Anak Sidek Episode 21', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/jkjj9o.mp4' },
      { id: 'sidek_22', title: 'Anak-Anak Sidek Episode 22', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/wdgv93.mp4' },
      { id: 'sidek_23', title: 'Anak-Anak Sidek Episode 23', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/qf2fvl.mp4' },
      { id: 'sidek_24', title: 'Anak-Anak Sidek Episode 24', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/jvfta3.mp4' },
      { id: 'sidek_25', title: 'Anak-Anak Sidek Episode 25', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/q40kmo.mp4' },
      { id: 'sidek_26', title: 'Anak-Anak Sidek Episode 26', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/t6tkl7.mp4' },
      { id: 'sidek_27', title: 'Anak-Anak Sidek Episode 27', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/7hj0pp.mp4' },
      { id: 'sidek_28', title: 'Anak-Anak Sidek Episode 28', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/2cvkol.mp4' },
      { id: 'sidek_29', title: 'Anak-Anak Sidek Episode 29', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/x6d6l2.mp4' },
      { id: 'sidek_30', title: 'Anak-Anak Sidek Episode 30', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/em16n2.mp4' },
      { id: 'sidek_31', title: 'Anak-Anak Sidek Episode 31', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/kfx8fa.mp4' },
      { id: 'sidek_32', title: 'Anak-Anak Sidek Episode 32', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/psqwmg.mp4' },
      { id: 'sidek_33', title: 'Anak-Anak Sidek Episode 33', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/qhhlph.mp4' },
      { id: 'sidek_34', title: 'Anak-Anak Sidek Episode 34', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/4yre1a.mp4' },
      { id: 'sidek_35', title: 'Anak-Anak Sidek Episode 35', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/xmphie.mp4' },
      { id: 'sidek_36', title: 'Anak-Anak Sidek Episode 36', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/uwyuaa.mp4' },
      { id: 'sidek_37', title: 'Anak-Anak Sidek Episode 37', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/xzp99z.mp4' },
      { id: 'sidek_38', title: 'Anak-Anak Sidek Episode 38', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/gw2t8k.mp4' },
      { id: 'sidek_39', title: 'Anak-Anak Sidek Episode 39', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/farxtu.mp4' },
      { id: 'sidek_40', title: 'Anak-Anak Sidek Episode 40', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/ndsb34.mp4' },
      { id: 'sidek_41', title: 'Anak-Anak Sidek Episode 41', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/8p480z.mp4' },
      { id: 'sidek_42', title: 'Anak-Anak Sidek Episode 42', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/2by4hx.mp4' },
      { id: 'sidek_43', title: 'Anak-Anak Sidek Episode 43', thumbnail: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg', url: 'https://files.catbox.moe/r1443c.mp4' }
    ]
  },
  {
    id: 'pokemon_journey_the_series',
    type: 'series',
    name: 'Pokemon Journey The Series (Series)',
    poster: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg',
    description: 'Pokemon Journey The Series',
    videos: [
      { id: 'pkmn_1', title: 'Pokemon Journey Episode 1', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/9l6811.mp4' },
      { id: 'pkmn_2', title: 'Pokemon Journey Episode 2', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/f2adj4.mp4' },
      { id: 'pkmn_3', title: 'Pokemon Journey Episode 3', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/bnoev9.mp4' },
      { id: 'pkmn_4', title: 'Pokemon Journey Episode 4', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/64ntqo.mp4' },
      { id: 'pkmn_5', title: 'Pokemon Journey Episode 5', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/83f07d.mp4' },
      { id: 'pkmn_6', title: 'Pokemon Journey Episode 6', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/17e2tr.mp4' },
      { id: 'pkmn_7', title: 'Pokemon Journey Episode 7', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/5y14uj.mp4' },
      { id: 'pkmn_8', title: 'Pokemon Journey Episode 8', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/poz7od.mp4' },
      { id: 'pkmn_9', title: 'Pokemon Journey Episode 9', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/y46f9t.mp4' },
      { id: 'pkmn_10', title: 'Pokemon Journey Episode 10', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/grq2iu.mp4' },
      { id: 'pkmn_11', title: 'Pokemon Journey Episode 11', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/k773ev.mp4' },
      { id: 'pkmn_12', title: 'Pokemon Journey Episode 12', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/r5rda8.mp4' },
      { id: 'pkmn_13', title: 'Pokemon Journey Episode 13', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/8idngm.mp4' },
      { id: 'pkmn_14', title: 'Pokemon Journey Episode 14', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/8fz354.mp4' },
      { id: 'pkmn_15', title: 'Pokemon Journey Episode 15', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/tzcx7q.mp4' },
      { id: 'pkmn_16', title: 'Pokemon Journey Episode 16', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/o1beae.mp4' },
      { id: 'pkmn_17', title: 'Pokemon Journey Episode 17', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/uyhug0.mp4' },
      { id: 'pkmn_18', title: 'Pokemon Journey Episode 18', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/5f9hjn.mp4' },
      { id: 'pkmn_19', title: 'Pokemon Journey Episode 19', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/ou8sgf.mp4' },
      { id: 'pkmn_20', title: 'Pokemon Journey Episode 20', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/63xw8p.mp4' },
      { id: 'pkmn_21', title: 'Pokemon Journey Episode 21', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/r69vzr.mp4' },
      { id: 'pkmn_22', title: 'Pokemon Journey Episode 22', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/29y1ey.mp4' },
      { id: 'pkmn_23', title: 'Pokemon Journey Episode 23', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/q258dj.mp4' },
      { id: 'pkmn_24', title: 'Pokemon Journey Episode 24', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/7lyrdj.mp4' },
      { id: 'pkmn_25', title: 'Pokemon Journey Episode 25', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/eiy4gx.mp4' },
      { id: 'pkmn_26', title: 'Pokemon Journey Episode 26', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/utrujc.mp4' },
      { id: 'pkmn_27', title: 'Pokemon Journey Episode 27', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/f40v16.mp4' },
      { id: 'pkmn_28', title: 'Pokemon Journey Episode 28', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/9p1oo4.mp4' },
      { id: 'pkmn_29', title: 'Pokemon Journey Episode 29', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/vw842q.mp4' },
      { id: 'pkmn_30', title: 'Pokemon Journey Episode 30', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/43p2fg.mp4' },
      { id: 'pkmn_31', title: 'Pokemon Journey Episode 31', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/odqedh.mp4' },
      { id: 'pkmn_32', title: 'Pokemon Journey Episode 32', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/iaxi6v.mp4' },
      { id: 'pkmn_33', title: 'Pokemon Journey Episode 33', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/k27hgg.mp4' },
      { id: 'pkmn_34', title: 'Pokemon Journey Episode 34', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/umbpcj.mp4' },
      { id: 'pkmn_35', title: 'Pokemon Journey Episode 35', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/6gn6ci.mp4' },
      { id: 'pkmn_36', title: 'Pokemon Journey Episode 36', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/brro9o.mp4' },
      { id: 'pkmn_37', title: 'Pokemon Journey Episode 37', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/0pn8a9.mp4' },
      { id: 'pkmn_38', title: 'Pokemon Journey Episode 38', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/6qs7l7.mp4' },
      { id: 'pkmn_39', title: 'Pokemon Journey Episode 39', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/iljl67.mp4' },
      { id: 'pkmn_40', title: 'Pokemon Journey Episode 40', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/o1welq.mp4' },
      { id: 'pkmn_41', title: 'Pokemon Journey Episode 41', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/1qf2bs.mp4' },
      { id: 'pkmn_42', title: 'Pokemon Journey Episode 42', thumbnail: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg', url: 'https://files.catbox.moe/6432zl.mp4' }
    ]
  },
  {
    id: 'doraemon_series',
    type: 'series',
    name: 'Doraemon (Series)',
    poster: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg',
    description: 'Doraemon TV Series',
    videos: [
      { id: 'dor_1', title: 'Doraemon Episode 1', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/oycp0l.mp4' },
      { id: 'dor_2', title: 'Doraemon Episode 2', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/y2jnzp.mp4' },
      { id: 'dor_3', title: 'Doraemon Episode 3', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/0rhjn1.mp4' },
      { id: 'dor_4', title: 'Doraemon Episode 4', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/j5bb72.mp4' },
      { id: 'dor_5', title: 'Doraemon Episode 5', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/tx56z3.mp4' },
      { id: 'dor_6', title: 'Doraemon Episode 6', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/d999bc.mp4' },
      { id: 'dor_7', title: 'Doraemon Episode 7', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/9oagow.mp4' },
      { id: 'dor_8', title: 'Doraemon Episode 8', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/c88t2y.mp4' },
      { id: 'dor_9', title: 'Doraemon Episode 9', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/s0w4l2.mp4' },
      { id: 'dor_10', title: 'Doraemon Episode 10', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/9z3g6p.mp4' },
      { id: 'dor_11', title: 'Doraemon Episode 11', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/w2rqxc.mp4' },
      { id: 'dor_12', title: 'Doraemon Episode 12', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/0ye5xj.mp4' },
      { id: 'dor_13', title: 'Doraemon Episode 13', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/p43ryb.mp4' },
      { id: 'dor_14', title: 'Doraemon Episode 14', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/4v3zun.mp4' },
      { id: 'dor_15', title: 'Doraemon Episode 15', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/k6jxyt.mp4' },
      { id: 'dor_16', title: 'Doraemon Episode 16', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/8rbre5.mp4' },
      { id: 'dor_17', title: 'Doraemon Episode 17', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/mhs0nv.mp4' },
      { id: 'dor_18', title: 'Doraemon Episode 18', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/5h1ezm.mp4' },
      { id: 'dor_19', title: 'Doraemon Episode 19', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/htqy6e.mp4' },
      { id: 'dor_20', title: 'Doraemon Episode 20', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/lea2x8.mp4' },
      { id: 'dor_21', title: 'Doraemon Episode 21', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/r42hc2.mp4' },
      { id: 'dor_22', title: 'Doraemon Episode 22', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/vkeb1q.mp4' },
      { id: 'dor_23', title: 'Doraemon Episode 23', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/4mcmx3.mp4' },
      { id: 'dor_24', title: 'Doraemon Episode 24', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/cunbqt.mp4' },
      { id: 'dor_25', title: 'Doraemon Episode 25', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/qxylix.mp4' },
      { id: 'dor_26', title: 'Doraemon Episode 26', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/re0c0z.mp4' },
      { id: 'dor_27', title: 'Doraemon Episode 27', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/ks1u8n.mp4' },
      { id: 'dor_28', title: 'Doraemon Episode 28', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/79zs6n.mp4' },
      { id: 'dor_29', title: 'Doraemon Episode 29', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/c6zn2u.mp4' },
      { id: 'dor_30', title: 'Doraemon Episode 30', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/ytnekv.mp4' },
      { id: 'dor_31', title: 'Doraemon Episode 31', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/vatbmf.mp4' },
      { id: 'dor_32', title: 'Doraemon Episode 32', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/5ot9pd.mp4' },
      { id: 'dor_33', title: 'Doraemon Episode 33', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/8hetcy.mp4' },
      { id: 'dor_34', title: 'Doraemon Episode 34', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/zl3nzc.mp4' },
      { id: 'dor_35', title: 'Doraemon Episode 35', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/7bhl4b.mp4' },
      { id: 'dor_36', title: 'Doraemon Episode 36', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/336km9.mp4' },
      { id: 'dor_37', title: 'Doraemon Episode 37', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/gz6zd1.mp4' },
      { id: 'dor_38', title: 'Doraemon Episode 38', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/ti97x3.mp4' },
      { id: 'dor_39', title: 'Doraemon Episode 39', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/gz9nzk.mp4' },
      { id: 'dor_40', title: 'Doraemon Episode 40', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/7as2xt.mp4' },
      { id: 'dor_41', title: 'Doraemon Episode 41', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/lur6di.mp4' },
      { id: 'dor_42', title: 'Doraemon Episode 42', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/y6cidm.mp4' },
      { id: 'dor_43', title: 'Doraemon Episode 43', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/40q9mb.mp4' },
      { id: 'dor_44', title: 'Doraemon Episode 44', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/14uoer.mp4' },
      { id: 'dor_45', title: 'Doraemon Episode 45', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/tnu1yq.mp4' },
      { id: 'dor_46', title: 'Doraemon Episode 46', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/jqn9l7.mp4' },
      { id: 'dor_47', title: 'Doraemon Episode 47', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/75bfy0.mp4' },
      { id: 'dor_48', title: 'Doraemon Episode 48', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/mpwbnh.mp4' },
      { id: 'dor_49', title: 'Doraemon Episode 49', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/2sjant.mp4' },
      { id: 'dor_50', title: 'Doraemon Episode 50', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/khkto1.mp4' },
      { id: 'dor_51', title: 'Doraemon Episode 51', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/r0w4yb.mp4' },
      { id: 'dor_52', title: 'Doraemon Episode 52', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/25qjxr.mp4' },
      { id: 'dor_53', title: 'Doraemon Episode 53', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/z81zu8.mp4' },
      { id: 'dor_54', title: 'Doraemon Episode 54', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/22zj5h.mp4' },
      { id: 'dor_55', title: 'Doraemon Episode 55', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/prdrno.mp4' },
      { id: 'dor_56', title: 'Doraemon Episode 56', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/c81md0.mp4' },
      { id: 'dor_57', title: 'Doraemon Episode 57', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/hkiu08.mp4' },
      { id: 'dor_58', title: 'Doraemon Episode 58', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/f0uzr4.mp4' },
      { id: 'dor_59', title: 'Doraemon Episode 59', thumbnail: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg', url: 'https://files.catbox.moe/a1cqxl.mp4' }
    ]
  },
  {
    id: 'ninja_boy',
    type: 'series',
    name: 'Ninja Boy (Series)',
    poster: 'https://i.postimg.cc/NjchPqKZ/Ninja_Boy.jpg',
    description: 'Ninja Boy Series',
    videos: [
      { id: 'ninja_1', title: 'Ninja Boy Episode 1', thumbnail: 'https://i.postimg.cc/NjchPqKZ/Ninja_Boy.jpg', url: 'https://files.catbox.moe/eufzjd.mp4' },
      { id: 'ninja_2', title: 'Ninja Boy Episode 2', thumbnail: 'https://i.postimg.cc/NjchPqKZ/Ninja_Boy.jpg', url: 'https://files.catbox.moe/gujt6g.mp4' },
      { id: 'ninja_3', title: 'Ninja Boy Episode 3', thumbnail: 'https://i.postimg.cc/NjchPqKZ/Ninja_Boy.jpg', url: 'https://files.catbox.moe/tlvkbp.mp4' },
      { id: 'ninja_4', title: 'Ninja Boy Episode 4', thumbnail: 'https://i.postimg.cc/NjchPqKZ/Ninja_Boy.jpg', url: 'https://files.catbox.moe/fzsduj.mp4' },
      { id: 'ninja_5', title: 'Ninja Boy Episode 5', thumbnail: 'https://i.postimg.cc/NjchPqKZ/Ninja_Boy.jpg', url: 'https://files.catbox.moe/zmbbmq.mp4' },
      { id: 'ninja_6', title: 'Ninja Boy Episode 6', thumbnail: 'https://i.postimg.cc/NjchPqKZ/Ninja_Boy.jpg', url: 'https://files.catbox.moe/o7bhaf.mp4' },
      { id: 'ninja_7', title: 'Ninja Boy Episode 7', thumbnail: 'https://i.postimg.cc/NjchPqKZ/Ninja_Boy.jpg', url: 'https://files.catbox.moe/jmwdz9.mp4' }
    ]
  },
  {
    id: 'malaysian_movies',
    type: 'movie',
    name: 'Malaysian (Movies)',
    poster: 'https://i.postimg.cc/PxxN1gWN/congkak.jpg',
    description: 'Koleksi Filem Seram & Komedi Malaysia',
    videos: [
      { id: 'malay_1', title: 'Congkak', thumbnail: 'https://i.postimg.cc/PxxN1gWN/congkak.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbf8f16e979983cdce554e' },
      { id: 'malay_2', title: 'Damping Malam', thumbnail: 'https://i.postimg.cc/rsn7tvjT/Damping-Malam.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbf8f36e979983cdce5550' },
      { id: 'malay_3', title: 'Dorm Melati', thumbnail: 'https://i.postimg.cc/7hh7YCsm/dormmelati.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbf8f26e979983cdce554f' },
      { id: 'malay_4', title: 'Flat 3A', thumbnail: 'https://i.postimg.cc/qqqnMtbZ/flat3a.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbfc716e979983cdce5551' },
      { id: 'malay_5', title: 'Gudang Kubur', thumbnail: 'https://i.postimg.cc/wMMJTtf4/gudangkubur.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbfc716e979983cdce5552' },
      { id: 'malay_6', title: 'Ia Wujud', thumbnail: 'https://i.postimg.cc/yxx9YJQt/iawujud.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbfc736e979983cdce5554' },
      { id: 'malay_7', title: 'Highland Tower', thumbnail: 'https://i.postimg.cc/tJJPC1Sf/highlandtower.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbfc736e979983cdce5553' },
      { id: 'malay_8', title: 'Jangan Pandang Belakang', thumbnail: 'https://i.postimg.cc/8ccWPFK2/janganpandangbelakang.gif', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbfc746e979983cdce5557' },
      { id: 'malay_9', title: 'Hantu Kak Limah Balik Rumah', thumbnail: 'https://i.postimg.cc/BbbDQ8YV/hantukaklimahbalikrumah.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbfc736e979983cdce5555' },
      { id: 'malay_10', title: 'Jalan Puncak Alam', thumbnail: 'https://i.postimg.cc/WzzrbDWx/jalanpuncakalam.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbfc736e979983cdce5556' },
      { id: 'malay_11', title: 'Jangan Tegur', thumbnail: 'https://i.postimg.cc/3NNpJyfM/jangantegur.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbfc756e979983cdce5558' },
      { id: 'malay_12', title: 'Jerit Malam', thumbnail: 'https://i.postimg.cc/6qPZ79gM/jeritmalam.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbfc766e979983cdce5559' },
      { id: 'malay_13', title: 'Keranda Tok Wan Terbang', thumbnail: 'https://i.postimg.cc/wMrNt6ZP/kerandatokwanterbang.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbfc806e979983cdce555c' },
      { id: 'malay_14', title: 'Karak', thumbnail: 'https://i.postimg.cc/D00syWpk/karak.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbfc7b6e979983cdce555a' },
      { id: 'malay_15', title: 'Kelibat', thumbnail: 'https://i.postimg.cc/kGHSVnzj/kelibat.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbfc7b6e979983cdce555b' },
      { id: 'malay_16', title: 'Malam Tahlil Suhaila Balik', thumbnail: 'https://i.postimg.cc/yxGRJVtp/malamtahlilsuhailabalik.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acbfdfc6e979983cdce555d' },
      { id: 'malay_17', title: 'Mami Jarum The Movie', thumbnail: 'https://i.postimg.cc/rsH4d83v/mamijarumthemovie.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc05d16e979983cdce55c2' },
      { id: 'malay_18', title: 'Misteri Jalan Lama', thumbnail: 'https://i.postimg.cc/HnNMJpFC/misterijalanlama.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc05d16e979983cdce55c3' },
      { id: 'malay_19', title: 'Mami Jarum Junior', thumbnail: 'https://i.postimg.cc/6qPZ79gP/mamijarumjunior.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc05d16e979983cdce55c5' },
      { id: 'malay_20', title: 'Momok 2', thumbnail: 'https://i.postimg.cc/gj7hwY1b/momok2.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc05d16e979983cdce55c4' },
      { id: 'malay_21', title: 'Minyak Dagu', thumbnail: 'https://i.postimg.cc/qqFKtkWV/minyakdagu-jpg.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc05d36e979983cdce55c7' },
      { id: 'malay_22', title: 'Mantra', thumbnail: 'https://i.postimg.cc/J0FXy1Sw/mantra.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc05d26e979983cdce55c6' },
      { id: 'malay_23', title: 'Momok 3', thumbnail: 'https://i.postimg.cc/gj7hwY1W/momok3.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc05d56e979983cdce55c8' },
      { id: 'malay_24', title: 'Momok The Movie', thumbnail: 'https://i.postimg.cc/8cYvF1xT/momokthemovie.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc05da6e979983cdce55c9' },
      { id: 'malay_25', title: 'Nasi Tangas', thumbnail: 'https://i.postimg.cc/qqFKtkW4/nasitangas.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc06936e979983cdce55ca' },
      { id: 'malay_26', title: 'Munafik', thumbnail: 'https://i.postimg.cc/d3fC7qgF/munafik.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc06936e979983cdce55cb' },
      { id: 'malay_27', title: 'Paku', thumbnail: 'https://i.postimg.cc/WzyZD2xN/paku.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc074d6e979983cdce55cc' },
      { id: 'malay_28', title: 'Paya Hitam', thumbnail: 'https://i.postimg.cc/d3fC7qgt/payahitam.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc074d6e979983cdce55cd' },
      { id: 'malay_29', title: 'Siapa Tak Sayang Bini', thumbnail: 'https://i.postimg.cc/XqP5ZVtZ/siapataksayangbini.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc13f16e979983cdce55ce' },
      { id: 'malay_30', title: 'Siapa Tak Sayang Bini 2', thumbnail: 'https://i.postimg.cc/nVSBSkrT/siapataksayangbini2.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc13f16e979983cdce55d1' },
      { id: 'malay_31', title: 'Santau', thumbnail: 'https://i.postimg.cc/KjWTKZCj/santau.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc13f16e979983cdce55d0' },
      { id: 'malay_32', title: 'Pelepas Saka', thumbnail: 'https://i.postimg.cc/Y0PF4pTC/pelepassaka.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc13f16e979983cdce55cf' },
      { id: 'malay_33', title: 'Polong', thumbnail: 'https://i.postimg.cc/C528ZF9K/polong.jpg', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc13f16e979983cdce55d2' },
      { id: 'malay_34', title: 'Senario The Movie', thumbnail: 'https://i.postimg.cc/90k94Wsr/senariothemovie.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace542c6e979983cdce5d00' },
      { id: 'malay_35', title: 'Senario Beach Boy', thumbnail: 'https://i.postimg.cc/WzyZD2xt/senariobeachboy.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace542c6e979983cdce5d01' },
      { id: 'malay_36', title: 'Volkswagen Kuning', thumbnail: 'https://i.postimg.cc/KcpBpNjJ/volkswagenkuning.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace542c6e979983cdce5d02' },
      { id: 'malay_37', title: 'Titisan Setan', thumbnail: 'https://i.postimg.cc/59KLK3yS/titisansetan.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace542c6e979983cdce5cfe' },
      { id: 'malay_38', title: 'Sumpahan Kum Kum', thumbnail: 'https://i.postimg.cc/jq3P3X2Q/sumpahankumkum.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace542c6e979983cdce5cff' }
    ]
  },
  {
    id: 'tom_and_jerry',
    type: 'series',
    name: 'Tom & Jerry',
    poster: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg',
    description: 'Tom and Jerry Classic & Collection Cartoons',
    videos: [
      { id: 'tj_1', title: 'Fine Feathered Friend', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4506e979983cdce5ad0' },
      { id: 'tj_2', title: "Sufferin' Cats!", thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4506e979983cdce5ad1' },
      { id: 'tj_3', title: 'The Lonesome Mouse', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4506e979983cdce5ad2' },
      { id: 'tj_4', title: 'The Zoot Cat', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc45b6e979983cdce5ad5' },
      { id: 'tj_5', title: 'The Million Dollar Cat', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc45c6e979983cdce5ad6' },
      { id: 'tj_6', title: 'The Bodyguard', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc45c6e979983cdce5ad7' },
      { id: 'tj_7', title: "Puttin' On The Dog", thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4876e979983cdce5ad8' },
      { id: 'tj_8', title: 'Mouse Trouble', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48d6e979983cdce5ad9' },
      { id: 'tj_9', title: 'Mouse In Manhattan', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48e6e979983cdce5ada' },
      { id: 'tj_10', title: 'Tee For Two', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48f6e979983cdce5adb' },
      { id: 'tj_11', title: 'The Mouse Comes To Dinner', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc48f6e979983cdce5adc' },
      { id: 'tj_12', title: 'Flirty Birdy', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4926e979983cdce5add' },
      { id: 'tj_13', title: 'Quiet Please!', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4926e979983cdce5ade' },
      { id: 'tj_14', title: 'Springtime For Thomas', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4936e979983cdce5adf' },
      { id: 'tj_15', title: 'The Milky Waif', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4986e979983cdce5ae0' },
      { id: 'tj_16', title: 'Trap Happy', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4c36e979983cdce5ae1' },
      { id: 'tj_17', title: 'Solid Serenade', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4c36e979983cdce5ae2' },
      { id: 'tj_18', title: "Cat Fishin'", thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4c86e979983cdce5ae3' },
      { id: 'tj_19', title: 'Part Time Pal', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae4' },
      { id: 'tj_20', title: 'The Cat Concerto', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae5' },
      { id: 'tj_21', title: 'Dr Jekyll and Mr Mouse', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae6' },
      { id: 'tj_22', title: 'Salt Water Tabby', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cd6e979983cdce5ae7' },
      { id: 'tj_23', title: 'A Mouse In The House', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4cf6e979983cdce5ae8' },
      { id: 'tj_24', title: 'The Invisible Mouse', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4d36e979983cdce5ae9' },
      { id: 'tj_25', title: 'The Truce Hurts', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4d96e979983cdce5aeb' },
      { id: 'tj_26', title: 'Kitty Foiled', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc4d96e979983cdce5aea' },
      { id: 'tj_27', title: "Old Rockin' Chair Tom", thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5036e979983cdce5aec' },
      { id: 'tj_28', title: 'Professor Tom', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5056e979983cdce5aed' },
      { id: 'tj_29', title: 'Mouse Cleaning', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5056e979983cdce5aee' },
      { id: 'tj_30', title: 'Polka Dot Puss', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5056e979983cdce5aef' },
      { id: 'tj_31', title: 'The Little Orphan', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5096e979983cdce5af0' },
      { id: 'tj_32', title: 'Hatch Up Your Troubles', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc50a6e979983cdce5af1' },
      { id: 'tj_33', title: 'Heavenly Puss', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc50e6e979983cdce5af2' },
      { id: 'tj_34', title: 'The Cat And The Mermouse', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc50e6e979983cdce5af3' },
      { id: 'tj_35', title: 'Love That Pup', thumbnail: 'https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5136e979983cdce5af4' },
      { id: "tj_36", title: "Jerry's Diary", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5136e979983cdce5af5" },
      { id: "tj_37", title: "Tennis Chumps", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc53b6e979983cdce5af6" },
      { id: "tj_38", title: "Little Quacker", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc53c6e979983cdce5af7" },
      { id: "tj_39", title: "Saturday Evening Puss", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5406e979983cdce5af8" },
      { id: "tj_40", title: "Texas Tom", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5406e979983cdce5af9" },
      { id: "tj_41", title: "Safety Second", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5416e979983cdce5afa" },
      { id: "tj_42", title: "Jerry And The Lion", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5416e979983cdce5afb" },
      { id: "tj_43", title: "The Hollywood Bowl", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5466e979983cdce5afc" },
      { id: "tj_44", title: "The Framed Cat", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5466e979983cdce5afd" },
      { id: "tj_45", title: "Cue Ball Cat", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc54b6e979983cdce5afe" },
      { id: "tj_46", title: "Casanova Cat", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc54c6e979983cdce5aff" },
      { id: "tj_47", title: "Jerry And The Goldfish", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5776e979983cdce5b00" },
      { id: "tj_48", title: "Jerry's Cousin", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5776e979983cdce5b01" },
      { id: "tj_49", title: "Sleepy Time Tom", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc57c6e979983cdce5b03" },
      { id: "tj_50", title: "His Mouse Friday", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc57c6e979983cdce5b02" },
      { id: "tj_51", title: "Slicked Up Pup", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc57c6e979983cdce5b04" },
      { id: "tj_52", title: "Nit Witty Kitty", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5826e979983cdce5b05" },
      { id: "tj_53", title: "Cat Napping", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5826e979983cdce5b06" },
      { id: "tj_54", title: "The Flying Cat", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5876e979983cdce5b07" },
      { id: "tj_55", title: "The Duck Doctor", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5876e979983cdce5b08" },
      { id: "tj_56", title: "The Two Mouseketeers", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5876e979983cdce5b09" },
      { id: "tj_57", title: "Smitten Kitten", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5876e979983cdce5b0a" },
      { id: "tj_58", title: "Triplet Trouble", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5b86e979983cdce5b0b" },
      { id: "tj_59", title: "Little Runaway", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5b96e979983cdce5b0c" },
      { id: "tj_60", title: "Fit To Be Tied", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc5b96e979983cdce5b0d" },
      { id: "tj_61", title: "Hic cup Pup", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6006e979983cdce5b1a" },
      { id: "tj_62", title: "Touché, Pussy Cat!", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6376e979983cdce5b21" },
      { id: "tj_63", title: "Designs On Jerry", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc63d6e979983cdce5b25" },
      { id: "tj_64", title: "Tom And Chérie", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6426e979983cdce5b26" },
      { id: "tj_65", title: "Pecos Pest", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc66d6e979983cdce5b28" },
      { id: "tj_66", title: "That's My Mommy", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc66d6e979983cdce5b29" },
      { id: "tj_67", title: "The Flying Sorceress", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc66e6e979983cdce5b2a" },
      { id: "tj_68", title: "The Egg And Jerry", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6726e979983cdce5b2b" },
      { id: "tj_69", title: "Busy Buddies", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6736e979983cdce5b2c" },
      { id: "tj_70", title: "Muscle Beach Tom", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6786e979983cdce5b2d" },
      { id: "tj_71", title: "Down Beat Bear", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6786e979983cdce5b2e" },
      { id: "tj_72", title: "Blue Cat Blues", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6786e979983cdce5b2f" },
      { id: "tj_73", title: "Barbecue Brawl", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc67e6e979983cdce5b30" },
      { id: "tj_74", title: "Tops With Pops", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6a96e979983cdce5b31" },
      { id: "tj_75", title: "Timid Tabby", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6ae6e979983cdce5b32" },
      { id: "tj_76", title: "Feedin' The Kiddie", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6af6e979983cdce5b33" },
      { id: "tj_77", title: "Mucho Mouse", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6af6e979983cdce5b34" },
      { id: "tj_78", title: "Tom's Photo Finish", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6af6e979983cdce5b35" },
      { id: "tj_79", title: "Happy Go Ducky", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6b56e979983cdce5b36" },
      { id: "tj_80", title: "Royal Cat Nap", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6b56e979983cdce5b37" },
      { id: "tj_81", title: "The Vanishing Duck", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6ba6e979983cdce5b38" },
      { id: "tj_82", title: "Robin Hoodwinked", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6bb6e979983cdce5b39" },
      { id: "tj_83", title: "Tot Watchers", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6bb6e979983cdce5b3a" },
      { id: "tj_84", title: "Switchin' Kitten", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6e66e979983cdce5b3b" },
      { id: "tj_85", title: "Down and Outing", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6ea6e979983cdce5b3c" },
      { id: "tj_86", title: "It's Greek to Me Ow!", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6ea6e979983cdce5b3d" },
      { id: "tj_87", title: "High Steaks", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6ea6e979983cdce5b3e" },
      { id: "tj_88", title: "Mouse into Space", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6eb6e979983cdce5b3f" },
      { id: "tj_89", title: "Landing Stripling", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6eb6e979983cdce5b40" },
      { id: "tj_90", title: "Calypso Cat", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6f06e979983cdce5b41" },
      { id: "tj_91", title: "Dicky Moe", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6f56e979983cdce5b42" },
      { id: "tj_92", title: "The Tom and Jerry Cartoon Kit", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6f66e979983cdce5b43" },
      { id: "tj_93", title: "Tall in the Trap", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc6f66e979983cdce5b44" },
      { id: "tj_94", title: "Sorry Safari", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7226e979983cdce5b45" },
      { id: "tj_95", title: "Buddies Thicker Than Water", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7266e979983cdce5b46" },
      { id: "tj_96", title: "Carmen Get It!", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7266e979983cdce5b47" },
      { id: "tj_97", title: "Pent House Mouse", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7276e979983cdce5b48" },
      { id: "tj_98", title: "The Cat Above and the Mouse Below", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7286e979983cdce5b49" },
      { id: "tj_99", title: "Is There a Doctor in the Mouse?", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc72b6e979983cdce5b4a" },
      { id: "tj_100", title: "Much Ado About Mousing", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc72c6e979983cdce5b4b" },
      { id: "tj_101", title: "Snowbody Loves Me", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc72d6e979983cdce5b4c" },
      { id: "tj_102", title: "The Unshrinkable Jerry Mouse", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7316e979983cdce5b4d" },
      { id: "tj_103", title: "Ah, Sweet Mouse Story of Life", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7316e979983cdce5b4e" },
      { id: "tj_104", title: "Tom ic Energy", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7366e979983cdce5b4f" },
      { id: "tj_105", title: "Bad Day at Cat Rock", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7366e979983cdce5b50" },
      { id: "tj_106", title: "The Brothers Carry Mouse Off", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7626e979983cdce5b51" },
      { id: "tj_107", title: "Haunted Mouse", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7636e979983cdce5b52" },
      { id: "tj_108", title: "I'm Just Wild About Jerry", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7686e979983cdce5b53" },
      { id: "tj_109", title: "Of Feline Bondage", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7696e979983cdce5b54" },
      { id: "tj_110", title: "The Year of the Mouse", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc76d6e979983cdce5b55" },
      { id: "tj_111", title: "The Cat's Me Ouch", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc76d6e979983cdce5b56" },
      { id: "tj_112", title: "Duel Personality", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc76d6e979983cdce5b57" },
      { id: "tj_113", title: "Jerry, Jerry, Quite Contrary", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc76e6e979983cdce5b58" },
      { id: "tj_114", title: "Jerry Go Round", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7726e979983cdce5b59" },
      { id: "tj_115", title: "Love Me, Love My Mouse", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc79a6e979983cdce5b5a" },
      { id: "tj_116", title: "Puss 'N' Boats", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc79b6e979983cdce5b5b" },
      { id: "tj_117", title: "Filet Meow", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7a16e979983cdce5b5c" },
      { id: "tj_118", title: "Matinee Mouse", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7a16e979983cdce5b5d" },
      { id: "tj_119", title: "The A TOM iNABLE Snowman", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7a26e979983cdce5b5e" },
      { id: "tj_120", title: "Catty Cornered", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7a66e979983cdce5b5f" },
      { id: "tj_121", title: "Cat and Dupli Cat", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7a66e979983cdce5b60" },
      { id: "tj_122", title: "O Solar Meow", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7a66e979983cdce5b61" },
      { id: "tj_123", title: "Guided Mouse ille", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7ac6e979983cdce5b62" },
      { id: "tj_124", title: "Rock 'N' Rodent", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7d66e979983cdce5b63" },
      { id: "tj_125", title: "Cannery Rodent", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7dc6e979983cdce5b64" },
      { id: "tj_126", title: "The Mouse from H.U.N.G.E.R.", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7dd6e979983cdce5b65" },
      { id: "tj_127", title: "Surf Bored Cat", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7dd6e979983cdce5b66" },
      { id: "tj_128", title: "Advance and Be Mechanized", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7e16e979983cdce5b67" },
      { id: "tj_129", title: "Shutter Bugged Cat", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accc7e16e979983cdce5b68" },
      { id: "tj_130", title: "The Flying Sorceress [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccc206e979983cdce5c1c" },
      { id: "tj_131", title: "Termites Plus Two [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccc266e979983cdce5c1d" },
      { id: "tj_132", title: "The Kitten Sitters [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccc266e979983cdce5c1e" },
      { id: "tj_133", title: "Planet Pest [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccc2c6e979983cdce5c1f" },
      { id: "tj_134", title: "Give Em The Air [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccc2c6e979983cdce5c21" },
      { id: "tj_135", title: "The Egg And Tom And Jerry [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccc5e6e979983cdce5c22" },
      { id: "tj_136", title: "Watch Out Watch Dog [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccc5e6e979983cdce5c23" },
      { id: "tj_137", title: "The Super Cyclists [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccc646e979983cdce5c24" },
      { id: "tj_138", title: "The Police Kitten [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccc646e979983cdce5c25" },
      { id: "tj_139", title: "The Outfoxed Fox [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccc656e979983cdce5c26" },
      { id: "tj_140", title: "Towering Fiasco [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccc696e979983cdce5c27" },
      { id: "tj_141", title: "The Lost Duckling [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccc696e979983cdce5c28" },
      { id: "tj_142", title: "Beanstalk Buddies [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccc6e6e979983cdce5c29" },
      { id: "tj_143", title: "Two Stars Are Born [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccc6e6e979983cdce5c2a" },
      { id: "tj_144", title: "Son Of Gopher Broke [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccc6e6e979983cdce5c2b" },
      { id: "tj_145", title: "The Sorcerers Apprentices [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccc6f6e979983cdce5c2c" },
      { id: "tj_146", title: "Hold That Pose [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccc9e6e979983cdce5c2d" },
      { id: "tj_147", title: "The Supercape Caper [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccca06e979983cdce5c2e" },
      { id: "tj_148", title: "Chickenrella [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccca36e979983cdce5c2f" },
      { id: "tj_149", title: "Double Trouble Crow [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccca36e979983cdce5c30' },
      { id: "tj_150", title: "Jerrys Nephew [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccca56e979983cdce5c31" },
      { id: "tj_151", title: "The Campout Cutup [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accccae6e979983cdce5c34" },
      { id: "tj_152", title: "The Bull Fighters [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accccd66e979983cdce5c36" },
      { id: "tj_153", title: "Cruise Kitty [1975]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accccd66e979983cdce5c37" },
      { id: "tj_154", title: "Calaboose Cal 495 [1990]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accced96e979983cdce5c8a" },
      { id: "tj_155", title: "Jerry Hood & Merry Meeces [1990]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccede6e979983cdce5c8c" },
      { id: "tj_156", title: "The Planet Dogmania [1991]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccee36e979983cdce5c8d" },
      { id: "tj_157", title: "Catawumpus Cat [1991]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccee36e979983cdce5c8e" },
      { id: "tj_158", title: "Pest In The West [1991]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccee36e979983cdce5c8f" },
      { id: "tj_159", title: "Tom The Babysitter [1991]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf0f6e979983cdce5c90" },
      { id: "tj_160", title: "Gas Blaster Puss [1991]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf0f6e979983cdce5c91" },
      { id: "tj_161", title: "Mess Hall Mouser [1991]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf0f6e979983cdce5c92" },
      { id: "tj_162", title: "Tolivers Twist [1991]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf156e979983cdce5c93" },
      { id: "tj_163", title: "Krazy Klaws [1991]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf156e979983cdce5c94" },
      { id: "tj_164", title: "Tom Thumped [1993]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf1b6e979983cdce5c95" },
      { id: "tj_165", title: "Cheap Skates [1993]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf1b6e979983cdce5c96" },
      { id: "tj_166", title: "When Knights Were Cold [1993]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf206e979983cdce5c97" },
      { id: "tj_167", title: "Cat Counselor Cal [1993]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf216e979983cdce5c98" },
      { id: "tj_168", title: "Hillbilly Hootenanny [1993]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf4b6e979983cdce5c99" },
      { id: "tj_169", title: "Hawkeye Tom [1993]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf4c6e979983cdce5c9a" },
      { id: "tj_170", title: "No Tom Like The Present [1993]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf4c6e979983cdce5c9b" },
      { id: "tj_171", title: "Two Stepping Tom [1993]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf4c6e979983cdce5c9c" },
      { id: "tj_172", title: "Disc Temper [1993]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf526e979983cdce5c9d" },
      { id: "tj_173", title: "King Wildmouse [1993]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf576e979983cdce5c9e" },
      { id: "tj_174", title: "Space Chase [1993]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf576e979983cdce5c9f" },
      { id: "tj_175", title: "The Karate Guard [2005]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf586e979983cdce5ca0" },
      { id: "tj_176", title: "Bats What I Like About [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf5d6e979983cdce5ca1" },
      { id: "tj_177", title: "Cat Got Your Luggage [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf5d6e979983cdce5ca2" },
      { id: "tj_178", title: "City Dump Chumps [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf5d6e979983cdce5ca3" },
      { id: "tj_179", title: "Cry Uncle [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf5d6e979983cdce5ca4" },
      { id: "tj_180", title: "Digital Dilemma [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf886e979983cdce5ca5" },
      { id: "tj_181", title: "Din O Sores [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf886e979983cdce5ca6" },
      { id: "tj_182", title: "Egg Beats [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf8e6e979983cdce5ca7" },
      { id: "tj_183", title: "Feeding Time [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf8e6e979983cdce5ca8" },
      { id: "tj_184", title: "Fraidycat Scat [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf946e979983cdce5ca9" },
      { id: "tj_185", title: "Freaky Tiky [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf946e979983cdce5caa" },
      { id: "tj_186", title: "Hi Robot [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf946e979983cdce5cab" },
      { id: "tj_187", title: "Joy Riding Jokers [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf9a6e979983cdce5cac" },
      { id: "tj_188", title: "Polar Peril [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccf9a6e979983cdce5cad" },
      { id: "tj_189", title: "Prehisterics [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccfc36e979983cdce5cae" },
      { id: "tj_190", title: "Tiger Cat [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccfc96e979983cdce5caf" },
      { id: "tj_191", title: "Tomb It May Concern [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccfc96e979983cdce5cb0" },
      { id: "tj_192", title: "Tomcat Jetpack [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccfc96e979983cdce5cb1" },
      { id: "tj_193", title: "Way Off Brodway [2006]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccfce6e979983cdce5cb2" },
      { id: "tj_194", title: "24 Karat Kat [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccfce6e979983cdce5cb3" },
      { id: "tj_195", title: "A Life Less Guarded [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccfd36e979983cdce5cb4" },
      { id: "tj_196", title: "Abracadumb [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccfd36e979983cdce5cb5" },
      { id: "tj_197", title: "Adventures In Penguin Sitting [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccfd36e979983cdce5cb6" },
      { id: "tj_198", title: "Babysitting Blues [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acccfd86e979983cdce5cb7" },
      { id: "tj_199", title: "Battle Of The Power Tools [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0006e979983cdce5cb8" },
      { id: "tj_200", title: "Beach Bully Bingo [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0046e979983cdce5cb9" },
      { id: "tj_201", title: "Beefcake Tom [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0066e979983cdce5cba" },
      { id: "tj_202", title: "Bend It Like Thomas [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0096e979983cdce5cbb" },
      { id: "tj_203", title: "Cat Nebula [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0096e979983cdce5cbc" },
      { id: "tj_204", title: "Cat Of Prey [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd00a6e979983cdce5cbd" },
      { id: "tj_205", title: "Cat Show Catastrophe [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd00f6e979983cdce5cbe" },
      { id: "tj_206", title: "Catch Me Though You Can't [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd00f6e979983cdce5cbf" },
      { id: "tj_207", title: "Catfish Follies [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd00f6e979983cdce5cc0" },
      { id: "tj_208", title: "Destruction Junction [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0406e979983cdce5cc1" },
      { id: "tj_209", title: "DJ Jerry [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0416e979983cdce5cc2" },
      { id: "tj_210", title: "Doggone Hill Hog [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0416e979983cdce5cc3" },
      { id: "tj_211", title: "Don't Bring Your Pet To School Day [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0476e979983cdce5cc4" },
      { id: "tj_212", title: "Endless Bummer [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0486e979983cdce5cc5" },
      { id: "tj_213", title: "Fire Breathing Tom Cat [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd04c6e979983cdce5cc6" },
      { id: "tj_214", title: "Flamenco Fiasco [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd04d6e979983cdce5cc7" },
      { id: "tj_215", title: "Game Of Mouse And Cat [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd04e6e979983cdce5cc8" },
      { id: "tj_216", title: "Game Set Match [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0516e979983cdce5cc9" },
      { id: "tj_217", title: "I Dream Of Meanie [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0526e979983cdce5cca" },
      { id: "tj_218", title: "Ho Ho Horrors [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0526e979983cdce5ccb" },
      { id: "tj_219", title: "Hockey Schtick [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0526e979983cdce5ccc" },
      { id: "tj_220", title: "Jackhammered Cat [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0816e979983cdce5ccd" },
      { id: "tj_221", title: "Invasion Of The Body Slammers [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0826e979983cdce5cce" },
      { id: "tj_222", title: "Jungle Love [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0876e979983cdce5ccf" },
      { id: "tj_223", title: "Kangadoofus [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0876e979983cdce5cd0" },
      { id: "tj_224", title: "Kitty Cat Blues [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0886e979983cdce5cd1" },
      { id: "tj_225", title: "Kitty Hawked [2007]", thumbnail: "https://i.postimg.cc/KjY0H2Nm/Tom-And-Jerry-DP.jpg", url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd08c6e979983cdce5cd2" },
    ],
  },
  {
  "league-of-cats": {
    name: "League Of Cats [2007]",
    type: "series",
    poster: "",
    videos: [
      { id: "loc-1", title: "League Of Cats [2007]", episode: 1, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd08c6e979983cdce5cd3" },
      { id: "loc-2", title: "Little Big Mouse [2007]", episode: 2, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd08d6e979983cdce5cd4" },
      { id: "loc-3", title: "Martian Mouse [2007]", episode: 3, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0916e979983cdce5cd5" },
      { id: "loc-4", title: "Medieval Menace [2007]", episode: 4, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0be6e979983cdce5cd6" },
      { id: "loc-5", title: "Octo Suave [2007]", episode: 5, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0be6e979983cdce5cd7" },
      { id: "loc-6", title: "Monster Con [2007]", episode: 6, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0bf6e979983cdce5cd8" },
      { id: "loc-7", title: "Northern Light Fish Fight [2007]", episode: 7, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0c36e979983cdce5cd9" },
      { id: "loc-8", title: "More Powers To You [2007]", episode: 8, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0c36e979983cdce5cda" },
      { id: "loc-9", title: "Over The River And Boo The Woods [2007]", episode: 9, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0c36e979983cdce5cdb" },
      { id: "loc-10", title: "Piranha Be Loved By You [2007]", episode: 10, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0c96e979983cdce5cdc" },
      { id: "loc-11", title: "Sasquashed [2007]", episode: 11, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0c96e979983cdce5cdd" },
      { id: "loc-12", title: "Power Tom [2007]", episode: 12, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0cd6e979983cdce5cde" },
      { id: "loc-13", title: "Monkey Chow [2007]", episode: 13, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0ce6e979983cdce5cdf" },
      { id: "loc-14", title: "Snow Brawl [2007]", episode: 14, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0ce6e979983cdce5ce0" },
      { id: "loc-15", title: "Snow Mouse [2007]", episode: 15, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd0fa6e979983cdce5ce1" },
      { id: "loc-16", title: "Spaced Out Cat [2007]", episode: 16, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd1006e979983cdce5ce2" },
      { id: "loc-17", title: "Spook House Mouse [2007]", episode: 17, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd1006e979983cdce5ce3" },
      { id: "loc-18", title: "Summer Squashing [2007]", episode: 18, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd1006e979983cdce5ce4" },
      { id: "loc-19", title: "The Cat Whisperer [2007]", episode: 19, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd1056e979983cdce5ce5" },
      { id: "loc-20", title: "The Itch [2007]", episode: 20, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd1066e979983cdce5ce6" },
      { id: "loc-21", title: "The Declaration Of Independunce [2007]", episode: 21, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd1066e979983cdce5ce7" },
      { id: "loc-22", title: "Tin Cat Of Tomorrow [2007]", episode: 22, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd10a6e979983cdce5ce8" },
      { id: "loc-23", title: "Tomcat Superstar [2007]", episode: 23, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd10a6e979983cdce5ce9" },
      { id: "loc-24", title: "Treasure Map Scrap [2007]", episode: 24, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd10b6e979983cdce5cea" },
      { id: "loc-25", title: "Which Witch [2007]", episode: 25, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd1366e979983cdce5ceb" },
      { id: "loc-26", title: "Xtreme Trouble [2007]", episode: 26, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd13d6e979983cdce5cec" },
      { id: "loc-27", title: "You're Lion [2007]", episode: 27, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd13d6e979983cdce5ced" },
      { id: "loc-28", title: "Zent Out Of Shape [2007]", episode: 28, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6accd1426e979983cdce5cee" }
    ]
  },
{
"detective-conan-series": {
  name: "Detective Conan (Series)",
  type: "series",
    poster: "https://i.postimg.cc/zvFTPwSK/Detective-Conan-DP.jpg",
    videos: [
      { id: "dc-100", title: "Episode 100 Bahagian 1", episode: 100, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace686f6e979983cdce5dde" },
      { id: "dc-114", title: "Episode 114 Bahagian 1", episode: 114, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68756e979983cdce5de0" },
      { id: "dc-115", title: "Episode 115 Bahagian 2", episode: 115, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68756e979983cdce5de1" },
      { id: "dc-124", title: "Episode 124", episode: 124, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5dac6e979983cdce5d27" },
      { id: "dc-125", title: "Episode 125", episode: 125, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5dac6e979983cdce5d26" },
      { id: "dc-129", title: "Episode 129", episode: 129, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5dbb6e979983cdce5d2e" },
      { id: "dc-132", title: "Episode 132", episode: 132, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d736e979983cdce5d1e" },
      { id: "dc-133", title: "Episode 133", episode: 133, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d746e979983cdce5d1f" },
      { id: "dc-134", title: "Episode 134", episode: 134, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d746e979983cdce5d20" },
      { id: "dc-177", title: "Episode 177", episode: 177, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68446e979983cdce5ddc" },
      { id: "dc-178", title: "Episode 178", episode: 178, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68446e979983cdce5ddd" },
      { id: "dc-197", title: "Episode 197", episode: 197, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66dc6e979983cdce5da2" },
      { id: "dc-198", title: "Episode 198", episode: 198, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace670a6e979983cdce5da3" },
      { id: "dc-201", title: "Episode 201", episode: 201, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d386e979983cdce5d13" },
      { id: "dc-202", title: "Episode 202", episode: 202, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d3a6e979983cdce5d14" },
      { id: "dc-208", title: "Episode 208", episode: 208, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d306e979983cdce5d10" },
      { id: "dc-210", title: "Episode 210", episode: 210, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d306e979983cdce5d0e" },
      { id: "dc-211", title: "Episode 211", episode: 211, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d306e979983cdce5d0f" },
      { id: "dc-212", title: "Episode 212", episode: 212, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d3a6e979983cdce5d16" },
      { id: "dc-213", title: "Episode 213", episode: 213, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d3e6e979983cdce5d17" },
      { id: "dc-214", title: "Episode 214", episode: 214, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d3a6e979983cdce5d15" },
      { id: "dc-215", title: "Episode 215", episode: 215, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d306e979983cdce5d12" },
      { id: "dc-216", title: "Episode 216", episode: 216, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d306e979983cdce5d0d" },
      { id: "dc-217", title: "Episode 217", episode: 217, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d3e6e979983cdce5d18" },
      { id: "dc-218", title: "Episode 218", episode: 218, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d436e979983cdce5d19" },
      { id: "dc-219", title: "Episode 219", episode: 219, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d436e979983cdce5d1a" },
      { id: "dc-220-221", title: "Episode 220-221", episode: 220, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d306e979983cdce5d11" },
      { id: "dc-222", title: "Episode 222 Bahagian 1", episode: 222, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5dbd6e979983cdce5d2f" },
      { id: "dc-223", title: "Episode 223 Bahagian 2", episode: 223, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5dec6e979983cdce5d30" },
      { id: "dc-224", title: "Episode 224 Bahagian 3", episode: 224, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5dec6e979983cdce5d31" },
      { id: "dc-225", title: "Episode 225", episode: 225, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d436e979983cdce5d1b" },
      { id: "dc-226", title: "Episode 226", episode: 226, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d436e979983cdce5d1c" },
      { id: "dc-227", title: "Episode 227", episode: 227, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d736e979983cdce5d1d" },
      { id: "dc-229", title: "Episode 229 Bahagian 2", episode: 229, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5dee6e979983cdce5d33" },
      { id: "dc-230", title: "Episode 230 Bahagian 1", episode: 230, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5df26e979983cdce5d34" },
      { id: "dc-233", title: "Episode 233", episode: 233, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67fd6e979983cdce5dcd" },
      { id: "dc-234", title: "Episode 234", episode: 234, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68006e979983cdce5dce" },
      { id: "dc-235", title: "Episode 235", episode: 235, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d796e979983cdce5d21" },
      { id: "dc-236", title: "Episode 236 Bahagian 1", episode: 236, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68016e979983cdce5dcf" },
      { id: "dc-237", title: "Episode 237 Bahagian 2", episode: 237, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68016e979983cdce5dd0" },
      { id: "dc-242", title: "Episode 242", episode: 242, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d796e979983cdce5d22" },
      { id: "dc-245", title: "Episode 245", episode: 245, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d7e6e979983cdce5d23" },
      { id: "dc-246", title: "Episode 246", episode: 246, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d7e6e979983cdce5d24" },
      { id: "dc-247", title: "Episode 247", episode: 247, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5d836e979983cdce5d25" },
      { id: "dc-249", title: "Episode 249", episode: 249, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5db66e979983cdce5d2b" },
      { id: "dc-250", title: "Episode 250", episode: 250, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5db66e979983cdce5d2c" },
      { id: "dc-251", title: "Episode 251", episode: 251, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5ede6e979983cdce5d57" },
      { id: "dc-252", title: "Episode 252", episode: 252, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace65d16e979983cdce5d6b" },
      { id: "dc-253", title: "Episode 253 Bahagian 1", episode: 253, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace65d16e979983cdce5d70" },
      { id: "dc-254", title: "Episode 254", episode: 254, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5e706e979983cdce5d4d" },
      { id: "dc-257", title: "Episode 257", episode: 257, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5f256e979983cdce5d67" },
      { id: "dc-258", title: "Episode 258", episode: 258, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace674d6e979983cdce5daf" },
      { id: "dc-259", title: "Episode 259", episode: 259, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace674d6e979983cdce5db0" },
      { id: "dc-260", title: "Episode 260", episode: 260, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67516e979983cdce5db1" },
      { id: "dc-261", title: "Episode 261", episode: 261, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67516e979983cdce5db2" },
      { id: "dc-262", title: "Episode 262", episode: 262, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67526e979983cdce5db3" },
      { id: "dc-264", title: "Episode 264", episode: 264, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67586e979983cdce5db4" },
      { id: "dc-265", title: "Episode 265", episode: 265, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace677e6e979983cdce5db5" },
      { id: "dc-266", title: "Episode 266", episode: 266, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace677e6e979983cdce5db6" },
      { id: "dc-267", title: "Episode 267", episode: 267, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace677e6e979983cdce5db7" },
      { id: "dc-268", title: "Episode 268", episode: 268, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67836e979983cdce5db8" },
      { id: "dc-269", title: "Episode 269", episode: 269, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67836e979983cdce5db9" },
      { id: "dc-270", title: "Episode 270", episode: 270, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67846e979983cdce5dba" },
      { id: "dc-271", title: "Episode 271", episode: 271, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace65d16e979983cdce5d6e" },
      { id: "dc-273", title: "Episode 273", episode: 273, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67896e979983cdce5dbb" },
      { id: "dc-276", title: "Episode 276", episode: 276, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5dfd6e979983cdce5d39" },
      { id: "dc-277", title: "Episode 277", episode: 277, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66ca6e979983cdce5d98" },
      { id: "dc-278", title: "Episode 278", episode: 278, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66d06e979983cdce5d99" },
      { id: "dc-279", title: "Episode 279", episode: 279, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66d16e979983cdce5d9a" },
      { id: "dc-280", title: "Episode 280", episode: 280, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66d16e979983cdce5d9c" },
      { id: "dc-281", title: "Episode 281", episode: 281, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66d16e979983cdce5d9b" },
      { id: "dc-282", title: "Episode 282", episode: 282, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66d66e979983cdce5d9d" },
      { id: "dc-283", title: "Episode 283", episode: 283, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66d66e979983cdce5d9e" },
      { id: "dc-284", title: "Episode 284", episode: 284, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67106e979983cdce5da5" },
      { id: "dc-285", title: "Episode 285", episode: 285, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67106e979983cdce5da6" },
      { id: "dc-287", title: "Episode 287", episode: 287, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67166e979983cdce5da7" },
      { id: "dc-288", title: "Episode 288", episode: 288, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67166e979983cdce5da8" },
      { id: "dc-289-290", title: "Episode 289-290", episode: 289, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5e286e979983cdce5d3a" },
      { id: "dc-298", title: "Episode 298", episode: 298, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67896e979983cdce5dbc" },
      { id: "dc-299", title: "Episode 299", episode: 299, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace678f6e979983cdce5dbd" },
      { id: "dc-300", title: "Episode 300", episode: 300, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace678f6e979983cdce5dbe" },
      { id: "dc-301", title: "Episode 301", episode: 301, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5e346e979983cdce5d3f" },
      { id: "dc-302", title: "Episode 302", episode: 302, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5e346e979983cdce5d41" },
      { id: "dc-303", title: "Episode 303", episode: 303, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67ba6e979983cdce5dc1" },
      { id: "dc-304", title: "Episode 304 (Special)", episode: 304, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5ede6e979983cdce5d59" },
      { id: "dc-307", title: "Episode 307", episode: 307, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67bf6e979983cdce5dc3" },
      { id: "dc-308", title: "Episode 308", episode: 308, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5e396e979983cdce5d44" },
      { id: "dc-309", title: "Episode 309", episode: 309, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5e606e979983cdce5d45" },
      { id: "dc-310", title: "Episode 310", episode: 310, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5e396e979983cdce5d43" },
      { id: "dc-312", title: "Episode 312", episode: 312, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5df86e979983cdce5df7" },
      { id: "dc-314", title: "Episode 314", episode: 314, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5df36e979983cdce5d36" },
      { id: "dc-315", title: "Episode 315", episode: 315, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5eac6e979983cdce5d56" },
      { id: "dc-316", title: "Episode 316", episode: 316, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5e666e979983cdce5d48" },
      { id: "dc-317", title: "Episode 317", episode: 317, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5e6a6e979983cdce5d49" },
      { id: "dc-318", title: "Episode 318", episode: 318, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5e6b6e979983cdce5d4a" },
      { id: "dc-319", title: "Episode 319", episode: 319, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5e6b6e979983cdce5d4b" },
      { id: "dc-320", title: "Episode 320", episode: 320, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5e706e979983cdce5d4c" },
      { id: "dc-323", title: "Episode 323", episode: 323, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67c56e979983cdce5dc5" },
      { id: "dc-324", title: "Episode 324", episode: 324, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67c56e979983cdce5dc6" },
      { id: "dc-325-326", title: "Episode 325-326 Bahagian 1 & 2", episode: 325, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67c56e979983cdce5dc7" },
      { id: "dc-327", title: "Episode 327 Bahagian 3", episode: 327, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67cb6e979983cdce5dc8" },
      { id: "dc-328", title: "Episode 328", episode: 328, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace65db6e979983cdce5d72" },
      { id: "dc-329", title: "Episode 329 Bahagian 1", episode: 329, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace65db6e979983cdce5d71" },
      { id: "dc-331", title: "Episode 331", episode: 331, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace65db6e979983cdce5d73" },
      { id: "dc-337", title: "Episode 337", episode: 337, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace65db6e979983cdce5d74" },
      { id: "dc-340", title: "Episode 340", episode: 340, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace65e16e979983cdce5d75" },
      { id: "dc-341", title: "Episode 341", episode: 341, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace65e16e979983cdce5d76" },
      { id: "dc-342", title: "Episode 342", episode: 342, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace65e76e979983cdce5d78" },
      { id: "dc-343", title: "Episode 343", episode: 343, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace65e76e979983cdce5d77" },
      { id: "dc-344", title: "Episode 344", episode: 344, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66156e979983cdce5d79" },
      { id: "dc-346", title: "Episode 346 Bahagian 1", episode: 346, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5f266e979983cdce5d68" },
      { id: "dc-347", title: "Episode 347 Bahagian 2", episode: 347, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5f506e979983cdce5d69" },
      { id: "dc-348-349", title: "Episode 348-349", episode: 348, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5f516e979983cdce5d6a" },
      { id: "dc-350", title: "Episode 350", episode: 350, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66166e979983cdce5d7a" },
      { id: "dc-351", title: "Episode 351", episode: 351, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66166e979983cdce5d7b" },
      { id: "dc-352", title: "Episode 352", episode: 352, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace661a6e979983cdce5d7c" },
      { id: "dc-353", title: "Episode 353", episode: 353, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace661a6e979983cdce5d7d" },
      { id: "dc-354", title: "Episode 354", episode: 354, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace661a6e979983cdce5d7e" },
      { id: "dc-355", title: "Episode 355", episode: 355, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace661b6e979983cdce5d7f" },
      { id: "dc-356", title: "Episode 356", episode: 356, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66216e979983cdce5d80" },
      { id: "dc-357", title: "Episode 357", episode: 357, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66216e979983cdce5d81" },
      { id: "dc-358", title: "Episode 358", episode: 358, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66266e979983cdce5d82" },
      { id: "dc-359", title: "Episode 359", episode: 359, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66266e979983cdce5d83" },
      { id: "dc-361", title: "Episode 361", episode: 361, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66516e979983cdce5d84" },
      { id: "dc-362", title: "Episode 362", episode: 362, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66516e979983cdce5d85" },
      { id: "dc-363", title: "Episode 363", episode: 363, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66566e979983cdce5d86" },
      { id: "dc-364", title: "Episode 364", episode: 364, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66566e979983cdce5d87" },
      { id: "dc-365", title: "Episode 365", episode: 365, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66576e979983cdce5d88" },
      { id: "dc-367", title: "Episode 367", episode: 367, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66576e979983cdce5d89" },
      { id: "dc-368", title: "Episode 368", episode: 368, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace665c6e979983cdce5d8a" },
      { id: "dc-369", title: "Episode 369", episode: 369, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace665c6e979983cdce5d8b" },
      { id: "dc-370", title: "Episode 370", episode: 370, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66616e979983cdce5d8c" },
      { id: "dc-389", title: "Episode 389", episode: 389, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5e346e979983cdce5d40" },
      { id: "dc-392", title: "Episode 392", episode: 392, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5e9c6e979983cdce5d4f" },
      { id: "dc-413", title: "Episode 413", episode: 413, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67f76e979983cdce5dc9" },
      { id: "dc-414", title: "Episode 414", episode: 414, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67f76e979983cdce5dca" },
      { id: "dc-419", title: "Episode 419", episode: 419, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67fb6e979983cdce5dcb" },
      { id: "dc-425", title: "Episode 425", episode: 425, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67166e979983cdce5daa" },
      { id: "dc-426", title: "Episode 426", episode: 426, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67fb6e979983cdce5dcc" },
      { id: "dc-428", title: "Episode 428", episode: 428, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5e2a6e979983cdce5d3c" },
      { id: "dc-437", title: "Episode 437", episode: 437, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5ea26e979983cdce5d50" },
      { id: "dc-438", title: "Episode 438", episode: 438, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5e2f6e979983cdce5d3d" },
      { id: "dc-442", title: "Episode 442", episode: 442, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5e2f6e979983cdce5d3e" },
      { id: "dc-443", title: "Episode 443", episode: 443, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace671c6e979983cdce5dab" },
      { id: "dc-444", title: "Episode 444", episode: 444, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace67466e979983cdce5dac" },
      { id: "dc-460", title: "Episode 460", episode: 460, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5dfd6e979983cdce5d38" },
      { id: "dc-477", title: "Episode 477", episode: 477, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5df36e979983cdce5d35" }
    ]
  },
  {
  "detective-conan-movie": {
    name: "Detective Conan (Movie)",
    type: "movie",
    poster: "",
    videos: [
      { id: "dcm-1", title: "Movie: The Last Wizard of the Century (1999)", episode: 1, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5db16e979983cdce5d28" },
      { id: "dcm-2", title: "Movie: Captured in Her Eyes (2000)", episode: 2, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace5db16e979983cdce5d29" },
      { id: "dcm-3", title: "Movie: The Fist of Blue Sapphire (2019)", episode: 3, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68066e979983cdce5dd1" }
    ]
  },
  {
  "magic-kaito": {
    name: "Magic Kaito (Series)",
    type: "series",
    poster: "",
    videos: [
      { id: "mk-1", title: "Magic Kaito (MK) Ep 1", episode: 1, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace688a6e979983cdce5de3" },
      { id: "mk-2", title: "Magic Kaito (MK) Ep 2", episode: 2, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace688a6e979983cdce5de5" },
      { id: "mk-3", title: "Magic Kaito (MK) Ep 3", episode: 3, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace688a6e979983cdce5de4" },
      { id: "mk-4", title: "Magic Kaito (MK) Ep 4", episode: 4, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace688a6e979983cdce5de7" },
      { id: "mk-5", title: "Magic Kaito (MK) Ep 5", episode: 5, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace688a6e979983cdce5de2" },
      { id: "mk-6", title: "Magic Kaito (MK) Ep 6", episode: 6, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace688a6e979983cdce5de6" },
      { id: "mk-7", title: "Magic Kaito (MK) Ep 7", episode: 7, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68ac6e979983cdce5de8" },
      { id: "mk-8", title: "Magic Kaito (MK) Ep 8", episode: 8, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68b16e979983cdce5dea" },
      { id: "mk-9", title: "Magic Kaito (MK) Ep 9", episode: 9, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68b16e979983cdce5de9" },
      { id: "mk-10", title: "Magic Kaito (MK) Ep 10", episode: 10, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68b16e979983cdce5deb" },
      { id: "mk-11", title: "Magic Kaito (MK) Ep 11", episode: 11, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68b16e979983cdce5dec" },
      { id: "mk-12", title: "Magic Kaito (MK) Ep 12", episode: 12, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68b16e979983cdce5ded" },
      { id: "mk-13", title: "Magic Kaito (MK) Ep 13", episode: 13, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68be6e979983cdce5dee" },
      { id: "mk-14", title: "Magic Kaito (MK) Ep 14", episode: 14, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68be6e979983cdce5def" },
      { id: "mk-15", title: "Magic Kaito (MK) Ep 15", episode: 15, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68be6e979983cdce5df0" },
      { id: "mk-16", title: "Magic Kaito (MK) Ep 16", episode: 16, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace68be6e979983cdce5df1" },
      { id: "mk-17", title: "Magic Kaito (MK) Ep 17", episode: 17, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66616e979983cdce5d8d" },
      { id: "mk-18", title: "Magic Kaito (MK) Ep 18", episode: 18, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace668d6e979983cdce5d8e" },
      { id: "mk-19", title: "Magic Kaito (MK) Ep 19", episode: 19, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66936e979983cdce5d8f" },
      { id: "mk-20", title: "Magic Kaito (MK) Ep 20", episode: 20, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66936e979983cdce5d91" },
      { id: "mk-21", title: "Magic Kaito (MK) Ep 21", episode: 21, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66936e979983cdce5d90" },
      { id: "mk-22", title: "Magic Kaito (MK) Ep 22", episode: 22, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66936e979983cdce5d92" },
      { id: "mk-23", title: "Magic Kaito (MK) Ep 23", episode: 23, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace66936e979983cdce5d93" },
      { id: "mk-24", title: "Magic Kaito (MK) Ep 24", episode: 24, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6ace669e6e979983cdce5d94" }
    ]
  },
  {
  "running-man-1-324": {
    name: "Running Man Episode 1-324",
    type: "series",
    poster: "https://i.postimg.cc/RhkmczXf/Runningman-Episode-1-324.jpg",
    videos: Array.from({ length: 324 }, (_, i) => {
      const epNum = i + 1;
      let url = "";
      if (epNum === 1) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acbff846e979983cdce555e";
      else if (epNum === 2) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce5561";
      else if (epNum === 3) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce555f";
      else if (epNum === 4) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce5562";
      else if (epNum === 5) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc001a6e979983cdce5563";
      else if (epNum === 6) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00196e979983cdce5560";
      else if (epNum === 7) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc001a6e979983cdce5564";
      else if (epNum === 8) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc001c6e979983cdce5565";
      else if (epNum === 9) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc001c6e979983cdce5566";
      else if (epNum === 10) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc001d6e979983cdce5567";
      else if (epNum === 11) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00216e979983cdce5569";
      else if (epNum === 12) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00216e979983cdce5568";
      else if (epNum === 13) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00266e979983cdce556a";
      else if (epNum === 14) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00266e979983cdce556b";
      else if (epNum === 15) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc002c6e979983cdce556c";
      else if (epNum === 16) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc002c6e979983cdce556d";
      else if (epNum === 17) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00586e979983cdce556e";
      else if (epNum === 18) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00596e979983cdce556f";
      else if (epNum === 19) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00596e979983cdce5570";
      else if (epNum === 20) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc005d6e979983cdce5571";
      else if (epNum === 21) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc005d6e979983cdce5572";
      else if (epNum === 22) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc005e6e979983cdce5573";
      else if (epNum === 23) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00636e979983cdce5574";
      else if (epNum === 24) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00686e979983cdce5575";
      else if (epNum === 25) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00696e979983cdce5576";
      else if (epNum === 26) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00696e979983cdce5577";
      else if (epNum === 27) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00696e979983cdce5578";
      else if (epNum === 28) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00946e979983cdce5579";
      else if (epNum === 29) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00946e979983cdce557a";
      else if (epNum === 30) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00996e979983cdce557b";
      else if (epNum === 31) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc009a6e979983cdce557c";
      else if (epNum === 32) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc009f6e979983cdce557d";
      else if (epNum === 33) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a06e979983cdce557e";
      else if (epNum === 34) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a46e979983cdce557f";
      else if (epNum === 35) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a46e979983cdce5580";
      else if (epNum === 36) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a56e979983cdce5581";
      else if (epNum === 37) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00a56e979983cdce5582";
      else if (epNum === 38) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00d06e979983cdce5583";
      else if (epNum === 39) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00d56e979983cdce5584";
      else if (epNum === 40) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00d66e979983cdce5585";
      else if (epNum === 41) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00da6e979983cdce5586";
      else if (epNum === 42) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00db6e979983cdce5587";
      else if (epNum === 43) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00dc6e979983cdce5588";
      else if (epNum === 44) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00e06e979983cdce5589";
      else if (epNum === 45) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00e06e979983cdce558a";
      else if (epNum === 46) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00e06e979983cdce558b";
      else if (epNum === 47) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00e66e979983cdce558c";
      else if (epNum === 48) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc010d6e979983cdce558d";
      else if (epNum === 49) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01116e979983cdce558e";
      else if (epNum === 50) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01136e979983cdce558f";
      else if (epNum === 51) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01136e979983cdce5590";
      else if (epNum === 52) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01176e979983cdce5591";
      else if (epNum === 53) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01176e979983cdce5592";
      else if (epNum === 54) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01186e979983cdce5593";
      else if (epNum === 55) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc011d6e979983cdce5594";
      else if (epNum === 56) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01226e979983cdce5595";
      else if (epNum === 57) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01486e979983cdce5596";
      else if (epNum === 58) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01496e979983cdce5597";
      else if (epNum === 59) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc014d6e979983cdce5598";
      else if (epNum === 60) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01526e979983cdce5599";
      else if (epNum === 61) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01546e979983cdce559a";
      else if (epNum === 62) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01556e979983cdce559b";
      else if (epNum === 63) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01586e979983cdce559c";
      else if (epNum === 64) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01586e979983cdce559f";
      else if (epNum === 65) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01586e979983cdce559e";
      else if (epNum === 66) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01586e979983cdce559d";
      else if (epNum === 67) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc015d6e979983cdce55a0";
      else if (epNum === 68) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc015e6e979983cdce55a1";
      else if (epNum === 69) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01896e979983cdce55a2";
      else if (epNum === 70) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01896e979983cdce55a3";
      else if (epNum === 71) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01896e979983cdce55a4";
      else if (epNum === 72) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc018f6e979983cdce55a5";
      else if (epNum === 73) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01946e979983cdce55a6";
      else if (epNum === 74) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01956e979983cdce55a7";
      else if (epNum === 75) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01956e979983cdce55a8";
      else if (epNum === 76) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01956e979983cdce55a9";
      else if (epNum === 77) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc019b6e979983cdce55aa";
      else if (epNum === 78) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01c56e979983cdce55ab";
      else if (epNum === 79) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01c56e979983cdce55ac";
      else if (epNum === 80) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01c76e979983cdce55ad";
      else if (epNum === 81) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01c76e979983cdce55ae";
      else if (epNum === 82) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01ca6e979983cdce55af";
      else if (epNum === 83) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01cb6e979983cdce55b0";
      else if (epNum === 84) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01cb6e979983cdce55b1";
      else if (epNum === 85) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01d06e979983cdce55b3";
      else if (epNum === 86) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01d06e979983cdce55b2";
      else if (epNum === 87) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01d66e979983cdce55b4";
      else if (epNum === 88) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01d66e979983cdce55b5";
      else if (epNum === 89) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01fd6e979983cdce55b6";
      else if (epNum === 90) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc01fd6e979983cdce55b7";
      else if (epNum === 91) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc00fe6e979983cdce55b8";
      else if (epNum === 92) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc02036e979983cdce55b9";
      else if (epNum === 93) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc02036e979983cdce55ba";
      else if (epNum === 94) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc02036e979983cdce55bb";
      else if (epNum === 95) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc02096e979983cdce55bd";
      else if (epNum === 96) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc02096e979983cdce55bc";
      else if (epNum === 97) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc020e6e979983cdce55be";
      else if (epNum === 98) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc020e6e979983cdce55bf";
      else if (epNum === 99) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc02396e979983cdce55c0";
      else if (epNum === 100) url = "https://filestreambot-production-bef2.up.railway.app/dl/6acc023e6e979983cdce55c1";
      else if (epNum === 101) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55dd";
      else if (epNum === 102) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55da";
      else if (epNum === 103) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55dc";
      else if (epNum === 104) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55d9";
      else if (epNum === 105) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55d8";
      else if (epNum === 106) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68a46e979983cdce55db";
      else if (epNum === 107) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ad6e979983cdce55de";
      else if (epNum === 108) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ad6e979983cdce55df";
      else if (epNum === 109) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ad6e979983cdce55e0";
      else if (epNum === 110) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ad6e979983cdce55e1";
      else if (epNum === 111) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b36e979983cdce55e2";
      else if (epNum === 112) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b86e979983cdce55e3";
      else if (epNum === 113) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b86e979983cdce55e5";
      else if (epNum === 114) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b86e979983cdce55e4";
      else if (epNum === 115) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b96e979983cdce55e7";
      else if (epNum === 116) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68b96e979983cdce55e6";
      else if (epNum === 117) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68e46e979983cdce55e8";
      else if (epNum === 118) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68e96e979983cdce55e9";
      else if (epNum === 119) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68e96e979983cdce55eb";
      else if (epNum === 120) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68e96e979983cdce55ea";
      else if (epNum === 121) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ef6e979983cdce55ed";
      else if (epNum === 122) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ef6e979983cdce55ec";
      else if (epNum === 123) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68ef6e979983cdce55ee";
      else if (epNum === 124) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68f46e979983cdce55ef";
      else if (epNum === 125) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68f56e979983cdce55f0";
      else if (epNum === 126) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc68f56e979983cdce55f1";
      else if (epNum === 127) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc691f6e979983cdce55f2";
      else if (epNum === 128) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69256e979983cdce55f4";
      else if (epNum === 129) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69256e979983cdce55f3";
      else if (epNum === 130) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc692a6e979983cdce55f5";
      else if (epNum === 131) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc692b6e979983cdce55f6";
      else if (epNum === 132) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc692f6e979983cdce55f7";
      else if (epNum === 133) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc692f6e979983cdce55f8";
      else if (epNum === 134) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69306e979983cdce55f9";
      else if (epNum === 135) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69356e979983cdce55fa";
      else if (epNum === 136) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69606e979983cdce55fb";
      else if (epNum === 137) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69606e979983cdce55fd";
      else if (epNum === 138) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69606e979983cdce55fc";
      else if (epNum === 139) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69666e979983cdce55fe";
      else if (epNum === 140) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69666e979983cdce55ff";
      else if (epNum === 141) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc696b6e979983cdce5600";
      else if (epNum === 142) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc696b6e979983cdce5601";
      else if (epNum === 143) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc696c6e979983cdce5602";
      else if (epNum === 144) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc696c6e979983cdce5603";
      else if (epNum === 145) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69716e979983cdce5604";
      else if (epNum === 146) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc699c6e979983cdce5605";
      else if (epNum === 147) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc699c6e979983cdce5606";
      else if (epNum === 148) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a26e979983cdce5607";
      else if (epNum === 149) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a26e979983cdce5608";
      else if (epNum === 150) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a36e979983cdce5609";
      else if (epNum === 151) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a86e979983cdce560b";
      else if (epNum === 152) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a86e979983cdce560a";
      else if (epNum === 153) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a86e979983cdce560c";
      else if (epNum === 154) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69a86e979983cdce560d";
      else if (epNum === 155) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69ad6e979983cdce560e";
      else if (epNum === 156) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69d46e979983cdce560f";
      else if (epNum === 157) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69d46e979983cdce5610";
      else if (epNum === 158) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69d46e979983cdce5611";
      else if (epNum === 159) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69d96e979983cdce5612";
      else if (epNum === 160) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69da6e979983cdce5613";
      else if (epNum === 161) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69da6e979983cdce5614";
      else if (epNum === 162) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69df6e979983cdce5616";
      else if (epNum === 163) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69df6e979983cdce5615";
      else if (epNum === 164) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69e46e979983cdce5617";
      else if (epNum === 165) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc69e56e979983cdce5618";
      else if (epNum === 166) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a106e979983cdce5619";
      else if (epNum === 167) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a116e979983cdce561a";
      else if (epNum === 168) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a156e979983cdce561b";
      else if (epNum === 169) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a156e979983cdce561c";
      else if (epNum === 170) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a166e979983cdce561d";
      else if (epNum === 171) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a1b6e979983cdce561e";
      else if (epNum === 172) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a1b6e979983cdce561f";
      else if (epNum === 173) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a1b6e979983cdce5620";
      else if (epNum === 174) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a206e979983cdce5621";
      else if (epNum === 175) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a216e979983cdce5622";
      else if (epNum === 176) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a516e979983cdce5623";
      else if (epNum === 177) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a526e979983cdce5624";
      else if (epNum === 178) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a526e979983cdce5625";
      else if (epNum === 179) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a526e979983cdce5626";
      else if (epNum === 180) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a576e979983cdce5627";
      else if (epNum === 181) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a576e979983cdce5628";
      else if (epNum === 182) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a576e979983cdce5629";
      else if (epNum === 183) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a5c6e979983cdce562a";
      else if (epNum === 184) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a5c6e979983cdce562b";
      else if (epNum === 185) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a5d6e979983cdce562c";
      else if (epNum === 186) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a626e979983cdce562d";
      else if (epNum === 187) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a896e979983cdce562e";
      else if (epNum === 188) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a8f6e979983cdce562f";
      else if (epNum === 189) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a906e979983cdce5631";
      else if (epNum === 190) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a906e979983cdce5630";
      else if (epNum === 191) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a946e979983cdce5632";
      else if (epNum === 192) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a956e979983cdce5633";
      else if (epNum === 193) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a956e979983cdce5634";
      else if (epNum === 194) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a9a6e979983cdce5635";
      else if (epNum === 195) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6a9a6e979983cdce5636";
      else if (epNum === 196) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6ac96e979983cdce5637";
      else if (epNum === 197) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6aca6e979983cdce5638";
      else if (epNum === 198) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6acb6e979983cdce5639";
      else if (epNum === 199) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6ace6e979983cdce563b";
      else if (epNum === 200) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc6ace6e979983cdce563a";
      else if (epNum === 201) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc76e46e979983cdce563d";
      else if (epNum === 202) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc76e56e979983cdce5641";
      else if (epNum === 203) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc76e46e979983cdce563c";
      else if (epNum === 204) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc76e46e979983cdce5640";
      else if (epNum === 205) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc76e46e979983cdce563e";
      else if (epNum === 206) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc76e46e979983cdce563f";
      else if (epNum === 207) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc76ed6e979983cdce5643";
      else if (epNum === 208) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc76ed6e979983cdce5642";
      else if (epNum === 209) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc76ed6e979983cdce5644";
      else if (epNum === 210) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc76ed6e979983cdce5645";
      else if (epNum === 211) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc76f36e979983cdce5646";
      else if (epNum === 212) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc76f86e979983cdce5647";
      else if (epNum === 213) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc76f86e979983cdce5648";
      else if (epNum === 214) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc76f86e979983cdce5649";
      else if (epNum === 215) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc76f96e979983cdce564b";
      else if (epNum === 216) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc76f96e979983cdce564a";
      else if (epNum === 217) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77296e979983cdce564c";
      else if (epNum === 218) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc772b6e979983cdce564e";
      else if (epNum === 219) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc772b6e979983cdce564d";
      else if (epNum === 220) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc772b6e979983cdce564f";
      else if (epNum === 221) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc772e6e979983cdce5650";
      else if (epNum === 222) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc772e6e979983cdce5651";
      else if (epNum === 223) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77346e979983cdce5652";
      else if (epNum === 224) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77346e979983cdce5653";
      else if (epNum === 225) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77346e979983cdce5654";
      else if (epNum === 226) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77606e979983cdce5655";
      else if (epNum === 227) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77666e979983cdce5656";
      else if (epNum === 228) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77676e979983cdce5657";
      else if (epNum === 229) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77676e979983cdce5659";
      else if (epNum === 230) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77676e979983cdce5658";
      else if (epNum === 231) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc776b6e979983cdce565a";
      else if (epNum === 232) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc776c6e979983cdce565b";
      else if (epNum === 233) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc776c6e979983cdce565c";
      else if (epNum === 234) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77716e979983cdce565d";
      else if (epNum === 235) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77716e979983cdce565f";
      else if (epNum === 236) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77716e979983cdce565e";
      else if (epNum === 237) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77a16e979983cdce5660";
      else if (epNum === 238) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77a66e979983cdce5661";
      else if (epNum === 239) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77a76e979983cdce5662";
      else if (epNum === 240) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77a86e979983cdce5663";
      else if (epNum === 241) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77ac6e979983cdce5664";
      else if (epNum === 242) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77ac6e979983cdce5666";
      else if (epNum === 243) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77ac6e979983cdce5665";
      else if (epNum === 244) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77b06e979983cdce5667";
      else if (epNum === 245) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77b16e979983cdce5669";
      else if (epNum === 246) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77b16e979983cdce5668";
      else if (epNum === 247) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77e16e979983cdce566a";
      else if (epNum === 248) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77e16e979983cdce566b";
      else if (epNum === 249) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77e16e979983cdce566c";
      else if (epNum === 250) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77e76e979983cdce566d";
      else if (epNum === 251) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77ec6e979983cdce566e";
      else if (epNum === 252) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77ec6e979983cdce566f";
      else if (epNum === 253) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77ec6e979983cdce5670";
      else if (epNum === 254) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77ec6e979983cdce5671";
      else if (epNum === 255) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77f16e979983cdce5672";
      else if (epNum === 256) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc77f26e979983cdce5673";
      else if (epNum === 257) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78196e979983cdce5674";
      else if (epNum === 258) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc781a6e979983cdce5675";
      else if (epNum === 259) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc781f6e979983cdce5676";
      else if (epNum === 260) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc781f6e979983cdce5677";
      else if (epNum === 261) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78246e979983cdce5678";
      else if (epNum === 262) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78256e979983cdce5679";
      else if (epNum === 263) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78296e979983cdce567a";
      else if (epNum === 264) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc782a6e979983cdce567b";
      else if (epNum === 265) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc782a6e979983cdce567c";
      else if (epNum === 266) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78566e979983cdce567d";
      else if (epNum === 267) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78566e979983cdce567e";
      else if (epNum === 268) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc785b6e979983cdce567f";
      else if (epNum === 269) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc785b6e979983cdce5680";
      else if (epNum === 270) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc785e6e979983cdce5681";
      else if (epNum === 271) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78616e979983cdce5683";
      else if (epNum === 272) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78616e979983cdce5682";
      else if (epNum === 273) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78686e979983cdce5685";
      else if (epNum === 274) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78676e979983cdce5684";
      else if (epNum === 275) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78696e979983cdce5686";
      else if (epNum === 276) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78926e979983cdce5687";
      else if (epNum === 277) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78966e979983cdce5688";
      else if (epNum === 278) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78966e979983cdce5689";
      else if (epNum === 279) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78966e979983cdce568b";
      else if (epNum === 280) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78966e979983cdce568a";
      else if (epNum === 281) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc789c6e979983cdce568c";
      else if (epNum === 282) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78a26e979983cdce568d";
      else if (epNum === 283) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78a26e979983cdce568e";
      else if (epNum === 284) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78a26e979983cdce5690";
      else if (epNum === 285) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78a26e979983cdce568f";
      else if (epNum === 286) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78d26e979983cdce5691";
      else if (epNum === 287) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78d26e979983cdce5692";
      else if (epNum === 288) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78d36e979983cdce5693";
      else if (epNum === 289) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78d46e979983cdce5694";
      else if (epNum === 290) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78d46e979983cdce5695";
      else if (epNum === 291) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78d96e979983cdce5697";
      else if (epNum === 292) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78d96e979983cdce5696";
      else if (epNum === 293) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78de6e979983cdce5699";
      else if (epNum === 294) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78de6e979983cdce5698";
      else if (epNum === 295) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78e36e979983cdce569a";
      else if (epNum === 296) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc78e36e979983cdce569b";
      else if (epNum === 297) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc790a6e979983cdce569c";
      else if (epNum === 298) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc790a6e979983cdce569d";
      else if (epNum === 299) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc790f6e979983cdce569e";
      else if (epNum === 300) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc79106e979983cdce569f";
      else if (epNum === 301) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc79166e979983cdce56a0";
      else if (epNum === 302) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc79166e979983cdce56a1";
      else if (epNum === 303) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc79176e979983cdce56a2";
      else if (epNum === 304) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc791b6e979983cdce56a3";
      else if (epNum === 305) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc791b6e979983cdce56a4";
      else if (epNum === 306) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc791b6e979983cdce56a5";
      else if (epNum === 307) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc79466e979983cdce56a6";
      else if (epNum === 308) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc794b6e979983cdce56a7";
      else if (epNum === 309) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc794c6e979983cdce56a8";
      else if (epNum === 310) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc794c6e979983cdce56a9";
      else if (epNum === 311) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc79506e979983cdce56aa";
      else if (epNum === 312) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc79516e979983cdce56ab";
      else if (epNum === 313) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc79516e979983cdce56ac";
      else if (epNum === 314) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc79566e979983cdce56ad";
      else if (epNum === 315) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc79566e979983cdce56ae";
      else if (epNum === 316) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc79876e979983cdce56af";
      else if (epNum === 317) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc79886e979983cdce56b0";
      else if (epNum === 318) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc79896e979983cdce56b1";
      else if (epNum === 319) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc79896e979983cdce56b2";
      else if (epNum === 320) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc798d6e979983cdce56b3";
      else if (epNum === 321) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc798d6e979983cdce56b4";
      else if (epNum === 322) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc798d6e979983cdce56b5";
      else if (epNum === 323) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc79926e979983cdce56b6";
      else if (epNum === 324) url = "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc79936e979983cdce56b7";

      return {
        id: `rm-${epNum}`,
        title: `Episod ${epNum}`,
        episode: epNum,
        url: url
      };
    })
  },
  "running-man-325-345": {
    name: "Running Man Episode 325-345",
    type: "series",
    poster: "https://i.postimg.cc/fRf1pNRR/6RM.jpg",
    videos: [
      { id: "rm-325", title: "Running Man Ep 325: Deficiency Travel", episode: 325, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7a676e979983cdce56b9" },
      { id: "rm-326", title: "Running Man Ep 326: Steamed Rice Stealer Race", episode: 326, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7a676e979983cdce56b8" },
      { id: "rm-327", title: "Running Man Ep 327: Bromance War", episode: 327, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7a676e979983cdce56bb" },
      { id: "rm-328", title: "Running Man Ep 328: Busan Vacation", episode: 328, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7a676e979983cdce56ba" },
      { id: "rm-329", title: "Running Man Ep 329: United Or Divided; Part 1", episode: 329, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7a676e979983cdce56bd" },
      { id: "rm-330", title: "Running Man Ep 330: Jeonju Tour; Part 2", episode: 330, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7a676e979983cdce56bc" },
      { id: "rm-331", title: "Running Man Ep 331: Bad Santa Christmas Special", episode: 331, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7a706e979983cdce56bf" },
      { id: "rm-332", title: "Running Man Ep 332: 2017 Running Man's New Ceremony", episode: 332, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7a706e979983cdce56c0" },
      { id: "rm-333", title: "Running Man Ep 333: Member's Week 1 - Song Ji-hyo", episode: 333, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7a6f6e979983cdce56be" },
      { id: "rm-334", title: "Running Man Ep 334: Member's Week 2 - Kim Jong-kook", episode: 334, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7a706e979983cdce56c1" },
      { id: "rm-335", title: "Running Man Ep 335: Member's Week 3 - Ji Suk-jin", episode: 335, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7a756e979983cdce56c2" },
      { id: "rm-336", title: "Running Man Ep 336: Member's Week 4", episode: 336, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7a756e979983cdce56c3" },
      { id: "rm-337", title: "Running Man Ep 337: Member's Week 5 - HaHa", episode: 337, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7a7a6e979983cdce56c6" },
      { id: "rm-338", title: "Running Man Ep 338: Break Week", episode: 338, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7a7a6e979983cdce56c4" },
      { id: "rm-339", title: "Running Man Ep 339: Member's Week 6-Yoo Jae-Suk", episode: 339, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7a7a6e979983cdce56c5" },
      { id: "rm-340", title: "Running Man Ep 340: Member's Week 7 - Lee Kwang-soo", episode: 340, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7aa66e979983cdce56c7" },
      { id: "rm-341", title: "Running Man Ep 341: A Dangerous Deal - Running House", episode: 341, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7aac6e979983cdce56c8" },
      { id: "rm-342", title: "Running Man Ep 342: Getting Item Race", episode: 342, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7aac6e979983cdce56cb" },
      { id: "rm-343", title: "Running Man Ep 343: Gongju Tour - Couple Race", episode: 343, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7aac6e979983cdce56c9" },
      { id: "rm-344", title: "Running Man Ep 344: The Secret of Runchelin", episode: 344, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7aac6e979983cdce56ca" },
      { id: "rm-345", title: "Running Man Ep 345: King of the Booking Race", episode: 345, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7aac6e979983cdce56cc" }
    ]
  },
  "running-man-346-559": {
    name: "Running Man Episode 346-559",
    type: "series",
    poster: "https://i.postimg.cc/kgc9P8gW/RM-YSC-JSM.jpg",
    videos: [
      { id: "rm-347", title: "Episode 347 ∙ Global Project - Dangerous Goddess; Part II", episode: 347, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7e9b6e979983cdce56d2" },
      { id: "rm-348", title: "Episode 348 ∙ Global Project - Dangerous Bag; Part 3", episode: 348, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7e9b6e979983cdce56d1" },
      { id: "rm-349", title: "Episode 349 ∙ Global Project - Dangerous Visiting; Part 4", episode: 349, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7e9b6e979983cdce56cd" },
      { id: "rm-350", title: "Episode 350 ∙ Global Project - Dangerous Choice; Part 5", episode: 350, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7e9b6e979983cdce56ce" },
      { id: "rm-351", title: "Episode 351 ∙ Global Project - Dangerous Banquet; Part 3", episode: 351, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7e9b6e979983cdce56cf" },
      { id: "rm-352", title: "Episode 352 ∙ Global Project - Russia & Mongolia; Part 7", episode: 352, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ea36e979983cdce56d3" },
      { id: "rm-353", title: "Episode 353 ∙ Global Project - Russia & Mongolia 2; Part 8", episode: 353, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ea36e979983cdce56d6" },
      { id: "rm-354", title: "Episode 354 ∙ Global Project - Labyrinth of Fear Finale; Part 9", episode: 354, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ea36e979983cdce56d5" },
      { id: "rm-355", title: "Episode 355 ∙ Somewhere 1%: #1 Tour in Tokyo; Part 1", episode: 355, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ea36e979983cdce56d4" },
      { id: "rm-356", title: "Episode 356 ∙ Somewhere 1%: Complete Disagreement Race; Part 2", episode: 356, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ea96e979983cdce56d7" },
      { id: "rm-357", title: "Episode 357 ∙ Somewhere 1%: No.1 Couple Race; Part 3", episode: 357, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ea96e979983cdce56d8" },
      { id: "rm-358", title: "Episode 358 ∙ Somewhere 1%: Protecting I GO Sticker Race; Part 4", episode: 358, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7eae6e979983cdce56da" },
      { id: "rm-359", title: "Episode 359 ∙ Somewhere 1%: I GO, STOP Race; Part 5", episode: 359, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7eae6e979983cdce56db" },
      { id: "rm-360", title: "Episode 360 ∙ 7th Anniversary Special: Real Family Outing; Part 1", episode: 360, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7eae6e979983cdce56d9" },
      { id: "rm-361", title: "Episode 361 ∙ 7th Anniversary Special: Real Family Outing; Part 2", episode: 361, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7eda6e979983cdce56dc" },
      { id: "rm-362", title: "Episode 362 ∙ Summer Special: Finding the Boss; Part 1", episode: 362, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7edf6e979983cdce56de" },
      { id: "rm-363", title: "Episode 363 ∙ Summer Special: Finding Bad Girls; Part 2", episode: 363, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7edf6e979983cdce56dd" },
      { id: "rm-364", title: "Episode 364 ∙ Summer Special: Finding Ghosts; Part 3", episode: 364, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ee06e979983cdce56e0" },
      { id: "rm-365", title: "Episode 365 ∙ Half-and-Half Tour: Half-and-Half Race; Part 1", episode: 365, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ee06e979983cdce56df" },
      { id: "rm-366", title: "Episode 366 ∙ Half-and-Half Tour: Sensing Race; Part 2", episode: 366, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ee06e979983cdce56e1" },
      { id: "rm-367", title: "Episode 367 ∙ Half-and-Half Tour: Public Enemy; Part 3", episode: 367, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7ee56e979983cdce56e2" },
      { id: "rm-368", title: "Episode 368 ∙ Half-and-Half Tour: Public Enemy 2; Part 4", episode: 368, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7eea6e979983cdce56e3" },
      { id: "rm-369", title: "Episode 369 ∙ Half-and-Half Tour Final: The Hell of Roulette; Part 5", episode: 369, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7eea6e979983cdce56e4" },
      { id: "rm-370", title: "Episode 370 ∙ Tiger Moth Tour; Part 1", episode: 370, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f166e979983cdce56e5" },
      { id: "rm-371", title: "Episode 371 ∙ Tiger Moth Tour; Part 2", episode: 371, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f166e979983cdce56e6" },
      { id: "rm-372", title: "Episode 372 ∙ Half-and-Half Tour Pass Race", episode: 372, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f166e979983cdce56e7" },
      { id: "rm-373", title: "Episode 373 ∙ Do Whatever You Want", episode: 373, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f1c6e979983cdce56e8" },
      { id: "rm-374", title: "Episode 374 ∙ City of Outlaws Race; Part 1", episode: 374, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f1c6e979983cdce56ea" },
      { id: "rm-375", title: "Episode 375 ∙ City of Outlaws; Part 2 & Mystery Autumn Trip Race", episode: 375, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f1c6e979983cdce56e9" },
      { id: "rm-376", title: "Episode 376 ∙ Running Man Dongye Olympic Race", episode: 376, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f226e979983cdce56eb" },
      { id: "rm-377", title: "Episode 377 ∙ Return of the Heiress Race", episode: 377, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f226e979983cdce56ec" },
      { id: "rm-378", title: "Episode 378 ∙ Tiger Butterfly Tour; Part 1", episode: 378, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f286e979983cdce56ee" },
      { id: "rm-379", title: "Episode 379 ∙ Tiger Butterfly Tour; Part 2", episode: 379, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f286e979983cdce56ed" },
      { id: "rm-380", title: "Episode 380 ∙ Different Dreams on the Money Race", episode: 380, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f526e979983cdce56ef" },
      { id: "rm-381", title: "Episode 381 ∙ Bad Guys: War Against the Evildoer", episode: 381, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f536e979983cdce56f0" },
      { id: "rm-382", title: "Episode 382 ∙ Christmas Miracle? Christmas Nightmare!", episode: 382, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f536e979983cdce56f1" },
      { id: "rm-383", title: "Episode 383 ∙ Winter Kingdom Survival", episode: 383, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f596e979983cdce56f3" },
      { id: "rm-384", title: "Episode 384 ∙ Mysterious Stone Pouch", episode: 384, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f596e979983cdce56f2" },
      { id: "rm-385", title: "Episode 385 ∙ The New Year Star Wars", episode: 385, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f5e6e979983cdce56f4" },
      { id: "rm-386", title: "Episode 386 ∙ Happiness with 10,000 Won Race (2)", episode: 386, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f5f6e979983cdce56f5" },
      { id: "rm-387", title: "Episode 387 ∙ Together with God - Sin and Punishment", episode: 387, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f5f6e979983cdce56f6" },
      { id: "rm-388", title: "Episode 388 ∙ Rule of Collection (1)", episode: 388, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f646e979983cdce56f7" },
      { id: "rm-389", title: "Episode 389 ∙ Bingo to the Flowery Road (2)", episode: 389, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f646e979983cdce56f8" },
      { id: "rm-390", title: "Episode 390 ∙ Global Random Tour: Part 1", episode: 390, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f646e979983cdce56f9" },
      { id: "rm-391", title: "Episode 391 ∙ Global Random Tour: Part 2", episode: 391, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f646e979983cdce56fa" },
      { id: "rm-392", title: "Episode 392 ∙ Global Random Tour: Part 3/Family Package Project: Part 1", episode: 392, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f936e979983cdce56fb" },
      { id: "rm-393", title: "Episode 393 ∙ Family Package Project: Part 2 - The Curse of the Diamonds", episode: 393, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f936e979983cdce56fc" },
      { id: "rm-394", title: "Episode 394 ∙ Family Package Part 3: The Lost Sticker?", episode: 394, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f946e979983cdce56fd" },
      { id: "rm-395", title: "Episode 395 ∙ Family Package: Part 4 - Find the Coaches", episode: 395, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f986e979983cdce56fe" },
      { id: "rm-396", title: "Episode 396 ∙ Family Package: Part 5 - Steel House; Get Out Race", episode: 396, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f996e979983cdce56ff" },
      { id: "rm-397", title: "Episode 397 ∙ TV Rating Notice Race: Part 2", episode: 397, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f9d6e979983cdce5700" },
      { id: "rm-398", title: "Episode 398 ∙ Running 365 Retreat", episode: 398, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f9e6e979983cdce5702" },
      { id: "rm-399", title: "Episode 399 ∙ Running 365 Retreat: Part 2/Family Package Project: Part 6 - Secret Doors", episode: 399, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7f9e6e979983cdce5701" },
      { id: "rm-400", title: "Episode 400 ∙ Family Package Project: Part 7", episode: 400, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fa36e979983cdce5703" },
      { id: "rm-401", title: "Episode 401 ∙ TV Rating Notice Race: Part 3 - Game of Thrones", episode: 401, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fa36e979983cdce5704" },
      { id: "rm-402", title: "Episode 402 ∙ Zombie Couple Race", episode: 402, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fcf6e979983cdce5705" },
      { id: "rm-403", title: "Episode 403 ∙ Isolated Race", episode: 403, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fcf6e979983cdce5706" },
      { id: "rm-404", title: "Episode 404 ∙ Invigorating Race", episode: 404, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fcf6e979983cdce5707" },
      { id: "rm-405", title: "Episode 405 ∙ Don't Trust Them", episode: 405, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fcf6e979983cdce5708" },
      { id: "rm-406", title: "Episode 406 ∙ Family Package Project: Part 8 - A Sudden Journey", episode: 406, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fd56e979983cdce5709" },
      { id: "rm-407", title: "Episode 407 ∙ Family Package Project: Part 9 - The Unfinished War", episode: 407, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fd56e979983cdce570a" },
      { id: "rm-408", title: "Episode 408 ∙ Family Package Project: Part 10 - Grand Final", episode: 408, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fda6e979983cdce570b" },
      { id: "rm-409", title: "Episode 409 ∙ Summer Waterpark Couple Race", episode: 409, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fdb6e979983cdce570c" },
      { id: "rm-410", title: "Episode 410 ∙ Mission: Impossible", episode: 410, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc7fdb6e979983cdce570d" },
      { id: "rm-411", title: "Episode 411 ∙ Catch the Petty Thief", episode: 411, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc800c6e979983cdce570e" },
      { id: "rm-412", title: "Episode 412 ∙ Get Your Number Eights", episode: 412, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc800d6e979983cdce570f" },
      { id: "rm-413", title: "Episode 413 ∙ Unlucky Vacation", episode: 413, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80116e979983cdce5710" },
      { id: "rm-414", title: "Episode 414 ∙ Out Dot Com", episode: 414, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80116e979983cdce5711" },
      { id: "rm-415", title: "Episode 415 ∙ Happy Death Day, Along With the Birthdays", episode: 415, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80116e979983cdce5712" },
      { id: "rm-416", title: "Episode 416 ∙ Truth or Dare/Eternal Love: Part 1", episode: 416, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80116e979983cdce5713" },
      { id: "rm-417", title: "Episode 417 ∙ Dangerous Choice 2: Eternal Love", episode: 417, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80166e979983cdce5714" },
      { id: "rm-418", title: "Episode 418 ∙ Dangerous Delivery: Briefcase Delivery", episode: 418, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80176e979983cdce5715" },
      { id: "rm-419", title: "Episode 419 ∙ Dangerous Delivery Part 2: The Secret of the Briefcase", episode: 419, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc801c6e979983cdce5716" },
      { id: "rm-420", title: "Episode 420 ∙ 100 in a Day; Part 1", episode: 420, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc801c6e979983cdce5717" },
      { id: "rm-421", title: "Episode 421 ∙ 100 in a Day; Part 2", episode: 421, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80486e979983cdce5719" },
      { id: "rm-422", title: "Episode 422 ∙ The Legendary Captain", episode: 422, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80486e979983cdce5718" },
      { id: "rm-423", title: "Episode 423 ∙ Game of Thrones", episode: 423, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc804d6e979983cdce571a" },
      { id: "rm-424", title: "Episode 424 ∙ The Nightmare of Halloween", episode: 424, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc804d6e979983cdce571b" },
      { id: "rm-425", title: "Episode 425 ∙ Go, Determined Gourmet", episode: 425, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc804e6e979983cdce571c" },
      { id: "rm-426", title: "Episode 426 ∙ How Well Do You Know Running Man Race?", episode: 426, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc804e6e979983cdce571d" },
      { id: "rm-427", title: "Episode 427 ∙ Familiar Partner, Finding Thief Race", episode: 427, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80536e979983cdce571f" },
      { id: "rm-428", title: "Episode 428 ∙ Kimchi Special: 'Who Is Kimchi's Partner?' Race", episode: 428, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80536e979983cdce571e" },
      { id: "rm-429", title: "Episode 429 ∙ Year End Special, Losers Bracket Race", episode: 429, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80586e979983cdce5720" },
      { id: "rm-430", title: "Episode 430 ∙ Year End Special Part 2: Once Again Even If You Hate It", episode: 430, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80586e979983cdce5721" },
      { id: "rm-431", title: "Episode 431 ∙ Christmas Special: The Miracle of Christmas", episode: 431, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80586e979983cdce5722" },
      { id: "rm-432", title: "Episode 432 ∙ Christmas Special - Flirting Santa Claus", episode: 432, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80846e979983cdce5724" },
      { id: "rm-433", title: "Episode 433 ∙ RPG: Running Man Playing Game", episode: 433, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80846e979983cdce5723" },
      { id: "rm-434", title: "Episode 434 ∙ RPG: The Secret of The Clans", episode: 434, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80896e979983cdce5726" },
      { id: "rm-435", title: "Episode 435 ∙ RPG: Catch Me If You Can", episode: 435, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80896e979983cdce5725" },
      { id: "rm-436", title: "Episode 436 ∙ RPG: The Last War", episode: 436, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc808a6e979983cdce5727" },
      { id: "rm-437", title: "Episode 437 ∙ New Year's Special: I Am the King", episode: 437, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc808f6e979983cdce5729" },
      { id: "rm-438", title: "Episode 438 ∙ The Ace vs The Commander", episode: 438, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc808f6e979983cdce5728" },
      { id: "rm-439", title: "Episode 439 ∙ Survive To The End", episode: 439, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80946e979983cdce572a" },
      { id: "rm-440", title: "Episode 440 ∙ The Secret of 100", episode: 440, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80946e979983cdce572b" },
      { id: "rm-441", title: "Episode 441 ∙ The Revenge of the Bee", episode: 441, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80946e979983cdce572c" },
      { id: "rm-442", title: "Episode 442 ∙ Running Man College", episode: 442, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80c66e979983cdce572d" },
      { id: "rm-443", title: "Episode 443 ∙ Unboxing: The Secret of the Boxes", episode: 443, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80c66e979983cdce572e" },
      { id: "rm-444", title: "Episode 444 ∙ Case Number 444: The Invisible Danger", episode: 444, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80c66e979983cdce572f" },
      { id: "rm-445", title: "Episode 445 ∙ The Counterattack of Singles: Part 1", episode: 445, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80c66e979983cdce5730" },
      { id: "rm-446", title: "Episode 446 ∙ The Counterattack of Singles: Part 2/So Min's Secret Personal Life: Part 1", episode: 446, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80c86e979983cdce5731" },
      { id: "rm-447", title: "Episode 447 ∙ One Fine Spring Day", episode: 447, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80cb6e979983cdce5732" },
      { id: "rm-448", title: "Episode 448 ∙ Search Running Man", episode: 448, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80cc6e979983cdce5733" },
      { id: "rm-449", title: "Episode 449 ∙ Return of Yoomes Bond: A Man of 100,000 Dollars", episode: 449, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80d06e979983cdce5734" },
      { id: "rm-450", title: "Episode 450 ∙ Your Name", episode: 450, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80d06e979983cdce5735" },
      { id: "rm-451", title: "Episode 451 ∙ Deep-rooted Secret", episode: 451, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80fc6e979983cdce5736" },
      { id: "rm-452", title: "Episode 452 ∙ Demon's Whispers", episode: 452, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc80fc6e979983cdce5737" },
      { id: "rm-453", title: "Episode 453 ∙ 9 Years of Running Man Episode 2: We're Supposed to Be a Family", episode: 453, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81036e979983cdce5739" },
      { id: "rm-454", title: "Episode 454 ∙ The Devil Wears Running Shirts", episode: 454, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81036e979983cdce5738" },
      { id: "rm-455", title: "Episode 455 ∙ Nine Years of Running Man Part 4: There Was a Miracle", episode: 455, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81046e979983cdce573a" },
      { id: "rm-456", title: "Episode 456 ∙ Lyrics Writing Race", episode: 456, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81086e979983cdce573b" },
      { id: "rm-457", title: "Episode 457 ∙ Invigorating Food of Alley Restaurant Race", episode: 457, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81086e979983cdce573c" },
      { id: "rm-458", title: "Episode 458 ∙ On Our Way to Escort You", episode: 458, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81086e979983cdce573d" },
      { id: "rm-459", title: "Episode 459 ∙ Running Project: My Partner is Far Away", episode: 459, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc810e6e979983cdce573e" },
      { id: "rm-460", title: "Episode 460 ∙ Five Exits: Escape to Live", episode: 460, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81386e979983cdce573f" },
      { id: "rm-461", title: "Episode 461 ∙ Episode #1.461", episode: 461, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81386e979983cdce5740" },
      { id: "rm-462", title: "Episode 462 ∙ Why Can't You Eat Race", episode: 462, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc813d6e979983cdce5741" },
      { id: "rm-463", title: "Episode 463 ∙ War of the Deities: Hades' Revenge", episode: 463, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc813e6e979983cdce5742" },
      { id: "rm-464", title: "Episode 464 ∙ Find the Father", episode: 464, url: "https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81436e979983cdce5743" },
    ],
};

const catalogData = {
    'running-man-464-559': {
        name: 'Running Man Episode 464-559',
        poster: 'https://i.postimg.cc/kgc9P8gW/RM-YSC-JSM.jpg',
        type: 'series',
        videos: [
            { id: 'rm1_465', title: 'Episode 465 ∙ Deity of Games: Don\'t Trust Anyone', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81436e979983cdce5744' },
            { id: 'rm1_466', title: 'Episode 466 ∙ War of Lights: Black and White', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81436e979983cdce5745' },
            { id: 'rm1_467', title: 'Episode 467 ∙ Running 9 Project: Running Man 9-Year Anniversary Fan Meeting', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81486e979983cdce5746' },
            { id: 'rm1_468', title: 'Episode 468 ∙ Running 9 Project: Spy Game', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81496e979983cdce5747' },
            { id: 'rm1_469', title: 'Episode 469 ∙ Running Man 9-Year Anniversary Fan Meeting: The Grand Finale', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc814d6e979983cdce5748' },
            { id: 'rm1_470', title: 'Episode 470 ∙ What Happened at Their Holiday Spot', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc814d6e979983cdce5749' },
            { id: 'rm1_471', title: 'Episode 471 ∙ Secret Code: Fall Ambush', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81756e979983cdce574a' },
            { id: 'rm1_472', title: 'Episode 472 ∙ What Happened in Anyang', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81756e979983cdce574b' },
            { id: 'rm1_473', title: 'Episode 473 ∙ Joker\'s House', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc817a6e979983cdce574c' },
            { id: 'rm1_474', title: 'Episode 474 ∙ Betray for the Gold Bars', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc817b6e979983cdce574d' },
            { id: 'rm1_475', title: 'Episode 475 ∙ Michelin Gourmet Eaters', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc817b6e979983cdce574e' },
            { id: 'rm1_476', title: 'Episode 476 ∙ Mysterious Animal Farm', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc817f6e979983cdce574f' },
            { id: 'rm1_477', title: 'Episode 477 ∙ Ghost Story at TV Station: Legendary Proposal Part 1', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81806e979983cdce5750' },
            { id: 'rm1_478', title: 'Episode 478 ∙ Ghost Story at TV Station: Legendary Proposal Part 2', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81806e979983cdce5751' },
            { id: 'rm1_479', title: 'Episode 479 ∙ Along with Distrust', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81866e979983cdce5752' },
            { id: 'rm1_480', title: 'Episode 480 ∙ Run to You: Project to Attract Investments', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81866e979983cdce5753' },
            { id: 'rm1_481', title: 'Episode 481 ∙ To Incheon: Catch Me', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81b06e979983cdce5754' },
            { id: 'rm1_482', title: 'Episode 482 ∙ Episode #1.482', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81b56e979983cdce5755' },
            { id: 'rm1_483', title: 'Episode 483 ∙ Ggannes Film Festival: The Uninvited One', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81b56e979983cdce5757' },
            { id: 'rm1_484', title: 'Episode 484 ∙ The Uninvited One', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81b56e979983cdce5756' },
            { id: 'rm1_485', title: 'Episode 485 ∙ We Won\'t Harm You', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81b56e979983cdce5758' },
            { id: 'rm1_486', title: 'Episode 486 ∙ Running Martial Arts School: Trade the Cards', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81bb6e979983cdce5759' },
            { id: 'rm1_487', title: 'Episode 487 ∙ The Rat Holds the Briefcase with Money', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81bb6e979983cdce575a' },
            { id: 'rm1_488', title: 'Episode 488 ∙ Running Man: Tear of Yondu', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81c06e979983cdce575b' },
            { id: 'rm1_489', title: 'Episode 489 ∙ Outgoing Race', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81c16e979983cdce575c' },
            { id: 'rm1_490', title: 'Episode 490 ∙ RM Countdown', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81c56e979983cdce575d' },
            { id: 'rm1_491', title: 'Episode 491 ∙ Decide! Bag, Part 1', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81f26e979983cdce575e' },
            { id: 'rm1_492', title: 'Episode 492 ∙ Decide! Bag, Part 2', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81f36e979983cdce575f' },
            { id: 'rm1_493', title: 'Episode 493 ∙ Fate Betting Race: Throw Double or Nothing', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81f76e979983cdce5760' },
            { id: 'rm1_494', title: 'Episode 494 ∙ Do Whatever You Want! Running MT', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81f76e979983cdce5761' },
            { id: 'rm1_495', title: 'Episode 495 ∙ Protect Your Mom: Another Rice Cake to the Ugly Child', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81f76e979983cdce5762' },
            { id: 'rm1_496', title: 'Episode 496 ∙ Idol versus Running Man, Center\'s Dignity', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81f86e979983cdce5763' },
            { id: 'rm1_497', title: 'Episode 497 ∙ Race Nobody Can Tell: Hey, You Can Find Out Too!', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81fc6e979983cdce5764' },
            { id: 'rm1_498', title: 'Episode 498 ∙ I Saw the Angels and Devils: The Devils\' Advocates', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc81fc6e979983cdce5765' },
            { id: 'rm1_499', title: 'Episode 499 ∙ Seniority Race: Running Man Class', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82026e979983cdce5766' },
            { id: 'rm1_500', title: 'Episode 500 ∙ Greedy Camp Race', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82026e979983cdce5767' },
            { id: 'rm1_501', title: 'Episode 501 ∙ The 1st Running Man Quiz Strongest Person War', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82026e979983cdce5768' },
            { id: 'rm1_502', title: 'Episode 502 ∙ Tiger\'s Birthday Party', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc822d6e979983cdce5769' },
            { id: 'rm1_503', title: 'Episode 503 ∙ Festival Money Securing Race: A World of the Festival', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82fc6e979983cdce578e' },
            { id: 'rm1_504', title: 'Episode 504 ∙ Crossroads of Choice: Too Much Dilemma', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc822e6e979983cdce576a' },
            { id: 'rm1_505', title: 'Episode 505 ∙ Eliminating Trespassers: Secret of the Old Village', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc822f6e979983cdce576b' },
            { id: 'rm1_506', title: 'Episode 506 ∙ Captains of Running Man', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82336e979983cdce576d' },
            { id: 'rm1_507', title: 'Episode 507 ∙ Concealed Broker Race: Convenience Store Hot Items', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82336e979983cdce576c' },
            { id: 'rm1_508', title: 'Episode 508 ∙ Running Man Loyalty Race: Sharing Playbook', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82386e979983cdce576e' },
            { id: 'rm1_509', title: 'Episode 509 ∙ The Superpowers School Race: The Superpowers War: Endgame', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82386e979983cdce576f' },
            { id: 'rm1_510', title: 'Episode 510 ∙ Find the Secret of Reincarnation: Reincarnation Camp 2020', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc823d6e979983cdce5770' },
            { id: 'rm1_511', title: 'Episode 511 ∙ 10th Anniversary Live Broadcast: Provocation by Running Man Thief', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc823d6e979983cdce5771' },
            { id: 'rm1_512', title: 'Episode 512 ∙ The 1st Tazza Hip Chairman Election: Battle of the Workers', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc826b6e979983cdce5772' },
            { id: 'rm1_513', title: 'Episode 513 ∙ Capitalistic Race with Partners: Don\'t Worry Be Happy', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc826b6e979983cdce5773' },
            { id: 'rm1_514', title: 'Episode 514 ∙ Find My Family Race: Little Sister Is Cannot Stop', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82716e979983cdce5774' },
            { id: 'rm1_515', title: 'Episode 515 ∙ 2 Person Prison Break Race, My Unfamiliar Partner', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82716e979983cdce5775' },
            { id: 'rm1_516', title: 'Episode 516 ∙ Operation: Clear Out the Criminals, Domestic Investigation', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82766e979983cdce5776' },
            { id: 'rm1_517', title: 'Episode 517 ∙ Link Average Race, Cut Off to Survive', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82766e979983cdce5778' },
            { id: 'rm1_518', title: 'Episode 518 ∙ Brahms Music School Race: Do you like 1 person?', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82766e979983cdce5777' },
            { id: 'rm1_519', title: 'Episode 519 ∙ Running Man Thief Race 2, The Copycat Criminals', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82766e979983cdce5779' },
            { id: 'rm1_520', title: 'Episode 520 ∙ 8 People, 8 Colors Preference Race, Lucky Hobbies', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc827b6e979983cdce577a' },
            { id: 'rm1_521', title: 'Episode 521 ∙ Fashion Choice Race, All or Nothing', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc827b6e979983cdce577b' },
            { id: 'rm1_522', title: 'Episode 522 ∙ America vs Asia, The Trade King', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82ac6e979983cdce577c' },
            { id: 'rm1_523', title: 'Episode 523 ∙ Chuseok Family Race, The Yoo Family\'s Inheritance War', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82b26e979983cdce577d' },
            { id: 'rm1_524', title: 'Episode 524 ∙ Back to the Basics Race, Precious Sisters', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82b36e979983cdce577e' },
            { id: 'rm1_525', title: 'Episode 525 ∙ BLACKPINK in Running Man, Save Us From Probability', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82b36e979983cdce577f' },
            { id: 'rm1_526', title: 'Episode 526 ∙ Robber versus Robber: Faceless King of Tomb Robbery', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82b36e979983cdce5780' },
            { id: 'rm1_527', title: 'Episode 527 ∙ Jeju Island Special Part 1: Wind, Women, Rocks, and Bomb', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82b86e979983cdce5782' },
            { id: 'rm1_528', title: 'Episode 528 ∙ Jeju Island Special Part 2: Loser-Pays-All Group Tour', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82b86e979983cdce5781' },
            { id: 'rm1_529', title: 'Episode 529 ∙ Journal of Old Restaurant', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82b86e979983cdce5783' },
            { id: 'rm1_530', title: 'Episode 530 ∙ Penthouse Special Part 1: Top Club vs Bottom Club', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82be6e979983cdce5784' },
            { id: 'rm1_531', title: 'Episode 531 ∙ Penthouse Special Part 2: Tenant War', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82ec6e979983cdce5785' },
            { id: 'rm1_532', title: 'Episode 532 ∙ Best Friend Special Friendship Race: The 1st Friendship Awards', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82ee6e979983cdce5787' },
            { id: 'rm1_533', title: 'Episode 533 ∙ Sweet Home 5pm, Saturday night', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82ee6e979983cdce5786' },
            { id: 'rm1_534', title: 'Episode 534 ∙ Ryu Hyun-Jin X Kim Kwang-Hyun: Sparkling Stove League', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82f16e979983cdce5788' },
            { id: 'rm1_535', title: 'Episode 535 ∙ New Year Blues Race: 2020 Year-end Closing', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82f16e979983cdce5789' },
            { id: 'rm1_536', title: 'Episode 536 ∙ 2021 Hoodwinker Association New Year\'s Party', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82f16e979983cdce578a' },
            { id: 'rm1_537', title: 'Episode 537 ∙ Production Objective Race: Running Man Rewritten, Part 1', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82f36e979983cdce578b' },
            { id: 'rm1_538', title: 'Episode 538 ∙ Production Objective Race: Running Man Rewritten, Part 2', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82fc6e979983cdce578c' },
            { id: 'rm1_539', title: 'Episode 539 ∙ Activity Cost Shooter Race: Burning 18 Again', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82fc6e979983cdce578d' },
            { id: 'rm1_540', title: 'Episode 540 ∙ The Charismatic Sisters, The Ugly Siblings', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc82fc6e979983cdce578f' },
            { id: 'rm1_541', title: 'Episode 541 ∙ 2021 New Year Driving Out Bad Luck Race: Take My Bad Luck Away', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc832d6e979983cdce5790' },
            { id: 'rm1_542', title: 'Episode 542 ∙ 2021 Running Man Neighborhood Athletic Meet with The Penthouse', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc832e6e979983cdce5791' },
            { id: 'rm1_543', title: 'Episode 543 ∙ Running Man Investment Contest: Genius Investors', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc832e6e979983cdce5792' },
            { id: 'rm1_544', title: 'Episode 544 ∙ Running Man Investment Contest Genius Investors Part 2', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83306e979983cdce5793' },
            { id: 'rm1_545', title: 'Episode 545 ∙ On the Way to Find Gold', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83336e979983cdce5795' },
            { id: 'rm1_546', title: 'Episode 546 ∙ Records of the Running Dynasty', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83336e979983cdce5794' },
            { id: 'rm1_547', title: 'Episode 547 ∙ Dignity of Grand Award', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83346e979983cdce5797' },
            { id: 'rm1_548', title: 'Episode 548 ∙ Stars\' Contract War', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83346e979983cdce5796' },
            { id: 'rm1_549', title: 'Episode 549 ∙ Idol Star Project: Brave Idol\'s Day', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83396e979983cdce5798' },
            { id: 'rm1_550', title: 'Episode 550 ∙ 10 Minutes vs. 1 Hour: Sweet Savage\'s Off Work Road', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83396e979983cdce5799' },
            { id: 'rm1_551', title: 'Episode 551 ∙ I Want to Find the Partner Entertainer', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83646e979983cdce579a' },
            { id: 'rm1_552', title: 'Episode 552 ∙ Students Who Entered University in 1991 Are Back!', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83656e979983cdce579b' },
            { id: 'rm1_553', title: 'Episode 553 ∙ The Entering Class of 1991 Is Back!', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83696e979983cdce579c' },
            { id: 'rm1_554', title: 'Episode 554 ∙ Credit Card Payment Race, When You Go to the TV Station', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc836b6e979983cdce579d' },
            { id: 'rm1_555', title: 'Episode 555 ∙ Smart Escape Race, Empty Head Land', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc836f6e979983cdce579e' },
            { id: 'rm1_556', title: 'Episode 556 ∙ We Will Find Spring For You', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83706e979983cdce579f' },
            { id: 'rm1_557', title: 'Episode 557 ∙ Going Home Race, Read the Room', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83706e979983cdce57a0' },
            { id: 'rm1_558', title: 'Episode 558 ∙ Three Meals for Jae Suk', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83746e979983cdce57a1' },
            { id: 'rm1_559', title: 'Episode 559 ∙ Goodbye, Our Special Brother', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc83756e979983cdce57a2' }
        ]
  },
  {
    'running-man-560-679': {
        name: 'Running Man Episode 560-679',
        poster: 'https://i.postimg.cc/sXPb5CGW/RM7.png',
        type: 'series',
        videos: [
            { id: 'rm2_560', title: 'Episode 560 ∙ The 1st Game Lover Get-together', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88716e979983cdce57a8' },
            { id: 'rm2_561', title: 'Episode 561 ∙ Delightful Men and Women\'s Vacation', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88716e979983cdce57a7' },
            { id: 'rm2_562', title: 'Episode 562 ∙ Talk Nightmare: The Day for Chattering', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88716e979983cdce57a4' },
            { id: 'rm2_563', title: 'Episode 563 ∙ The Strange Family Photo Race', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88716e979983cdce57a6' },
            { id: 'rm2_564', title: 'Episode 564 ∙ Make Your Wish Come True and Pay The Price Later', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88716e979983cdce57a5' },
            { id: 'rm2_565', title: 'Episode 565 ∙ Theft of Comedian Association Membership Fee', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88716e979983cdce57a3' },
            { id: 'rm2_566', title: 'Episode 566 ∙ Make Your Own Fate, Protect Money For Your Parents', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88796e979983cdce57a9' },
            { id: 'rm2_567', title: 'Episode 567 ∙ Team Selection Race, Young Ji versus Young Ji', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc887b6e979983cdce57ab' },
            { id: 'rm2_568', title: 'Episode 568 ∙ Find the most expensive doll, Scary Doll Detective', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc887b6e979983cdce57aa' },
            { id: 'rm2_569', title: 'Episode 569 ∙ Couple Race, You Raise a Man Up', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc887b6e979983cdce57ac' },
            { id: 'rm2_570', title: 'Episode 570 ∙ Catch the Mafia, Running Man in Chaos', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc887e6e979983cdce57ad' },
            { id: 'rm2_571', title: 'Episode 571 ∙ Gym Revival Project, Trainer Jong Kook and National Team', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc887e6e979983cdce57ae' },
            { id: 'rm2_572', title: 'Episode 572 ∙ Female Volleyball Team, Fierce Transfer Contract', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88846e979983cdce57af' },
            { id: 'rm2_573', title: 'Episode 573 ∙ Fierce Transfer Race 2: Negotiation of Long Legs', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88846e979983cdce57b0' },
            { id: 'rm2_574', title: 'Episode 574 ∙ To Become Italian Gentlemen, Elegant Road of Western Dishes', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88846e979983cdce57b1' },
            { id: 'rm2_575', title: 'Episode 575 ∙ Squid Game', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88846e979983cdce57b2' },
            { id: 'rm2_576', title: 'Episode 576 ∙ The Choice of Destiny, Golden Ratio Race', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88b46e979983cdce57b4' },
            { id: 'rm2_577', title: 'Episode 577 ∙ The Rehabilitation Project, Icon of Misfortune', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88b46e979983cdce57b3' },
            { id: 'rm2_578', title: 'Episode 578 ∙ The Race to Get To Know Each Other, My Money and My Alpine Club', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88b46e979983cdce57b5' },
            { id: 'rm2_579', title: 'Episode 579 ∙ Street Human Fighter', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88b46e979983cdce57b6' },
            { id: 'rm2_580', title: 'Episode 580 ∙ Running Man vs Production Team, 2021 Running Man Penalty Negotiation', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88ba6e979983cdce57b7' },
            { id: 'rm2_581', title: 'Episode 581 ∙ Welcome The New Millennium: End of Century', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88ba6e979983cdce57b8' },
            { id: 'rm2_582', title: 'Episode 582 ∙ The Variety Show Family, Yang Se Chan the Good Son', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88bf6e979983cdce57b9' },
            { id: 'rm2_583', title: 'Episode 583 ∙ Suk Jin\'s Cells', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88bf6e979983cdce57ba' },
            { id: 'rm2_584', title: 'Episode 584 ∙ 2021 Clever Year-end Party', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88bf6e979983cdce57bb' },
            { id: 'rm2_585', title: 'Episode 585 ∙ Running Man Year-End Special', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88ec6e979983cdce57bd' },
            { id: 'rm2_586', title: 'Episode 586 ∙ Renyin Year: Duplicate Loan Race', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88ec6e979983cdce57bc' },
            { id: 'rm2_587', title: 'Episode 587 ∙ The Seniority War of the Youngest Members', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88ed6e979983cdce57be' },
            { id: 'rm2_588', title: 'Episode 588 ∙ Height Point Race Pt.1', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88f16e979983cdce57bf' },
            { id: 'rm2_589', title: 'Episode 589 ∙ Height Point Pt.2/Renyin Year\'s Tangun Myth Pt.1', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88f36e979983cdce57c0' },
            { id: 'rm2_590', title: 'Episode 590 ∙ Renyin Year\'s Tangun Myth Pt.2', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88f66e979983cdce57c1' },
            { id: 'rm2_591', title: 'Episode 591 ∙ Seri and Birdie Buddy', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88f86e979983cdce57c2' },
            { id: 'rm2_592', title: 'Episode 592 ∙ The Tazza Association: People Who Read the Minds of Scammers', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88fb6e979983cdce57c3' },
            { id: 'rm2_593', title: 'Episode 593 ∙ Casual Ji', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88fc6e979983cdce57c4' },
            { id: 'rm2_594', title: 'Episode 594 ∙ Running Man General Election Race', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc88fd6e979983cdce57c5' },
            { id: 'rm2_595', title: 'Episode 595 ∙ This is the First Time in My Life as a Team Leader', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89296e979983cdce57c7' },
            { id: 'rm2_596', title: 'Episode 596 ∙ This is the First Time in My Life as a Team Leader/BTOB Without BTOB Special', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89296e979983cdce57c6' },
            { id: 'rm2_597', title: 'Episode 597 ∙ Not Spring, Candy, or Penalty', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc892f6e979983cdce57c8' },
            { id: 'rm2_598', title: 'Episode 598 ∙ Captain Ji\'s Imagination Comes True', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc892f6e979983cdce57c9' },
            { id: 'rm2_599', title: 'Episode 599 ∙ How Much Do You Want to Spend?', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89306e979983cdce57ca' },
            { id: 'rm2_600', title: 'Episode 600 ∙ Along With You', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89356e979983cdce57cb' },
            { id: 'rm2_601', title: 'Episode 601 ∙ The Decisive Punch', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89356e979983cdce57cc' },
            { id: 'rm2_602', title: 'Episode 602 ∙ Scoundrels Come Slowly', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc893a6e979983cdce57cd' },
            { id: 'rm2_603', title: 'Episode 603 ∙ 1st 1/N Game', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc893a6e979983cdce57ce' },
            { id: 'rm2_604', title: 'Episode 604 ∙ Instruction for Using Black and White Rose', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc893a6e979983cdce57cf' },
            { id: 'rm2_605', title: 'Episode 605 ∙ 2022: Truth or Guilt', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc893b6e979983cdce57d0' },
            { id: 'rm2_606', title: 'Episode 606 ∙ Masters of Investment: Go to NY Part I', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc896b6e979983cdce57d2' },
            { id: 'rm2_607', title: 'Episode 607 ∙ Masters of Investment: Go to NY Part II', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc896b6e979983cdce57d1' },
            { id: 'rm2_608', title: 'Episode 608 ∙ I Got Off Work First', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc896c6e979983cdce57d3' },
            { id: 'rm2_609', title: 'Episode 609 ∙ The 1st Running Man Proxy Vacance', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89716e979983cdce57d4' },
            { id: 'rm2_610', title: 'Episode 610 ∙ Home Jong-kook', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89716e979983cdce57d5' },
            { id: 'rm2_611', title: 'Episode 611 ∙ The Rice Spoon War', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89766e979983cdce57d6' },
            { id: 'rm2_612', title: 'Episode 612 ∙ 2nd Witty Sharing Life', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89766e979983cdce57d7' },
            { id: 'rm2_613', title: 'Episode 613 ∙ Running Biography', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89766e979983cdce57d8' },
            { id: 'rm2_614', title: 'Episode 614 ∙ One After Another Running Man', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89776e979983cdce57d9' },
            { id: 'rm2_615', title: 'Episode 615 ∙ One After Another Running Man/Three Three Five Five Race', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89a66e979983cdce57da' },
            { id: 'rm2_616', title: 'Episode 616 ∙ Three Three Five Five Race. Part 2', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89a66e979983cdce57db' },
            { id: 'rm2_617', title: 'Episode 617 ∙ Huge Investments', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89a66e979983cdce57dc' },
            { id: 'rm2_618', title: 'Episode 618 ∙ War of Coins', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89ab6e979983cdce57dd' },
            { id: 'rm2_619', title: 'Episode 619 ∙ Running Man Runs Around', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89ab6e979983cdce57de' },
            { id: 'rm2_620', title: 'Episode 620 ∙ My Way with \'Strong\' Momentum', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89ab6e979983cdce57df' },
            { id: 'rm2_621', title: 'Episode 621 ∙ He Said He Wants to Go to Gangwon-do. Part 1', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89b16e979983cdce57e0' },
            { id: 'rm2_622', title: 'Episode 622 ∙ He Said He Wants to Go to Gangwon-do. Part 2/Anyway, The Penalty is...', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89b16e979983cdce57e1' },
            { id: 'rm2_623', title: 'Episode 623 ∙ Go! Stop!', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89b66e979983cdce57e2' },
            { id: 'rm2_624', title: 'Episode 624 ∙ Go! Stop!/Expert Run, Have I Eaten The Rice?', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89b66e979983cdce57e3' },
            { id: 'rm2_625', title: 'Episode 625 ∙ Take a Tour Around At a Well-known Neighborhood', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89e26e979983cdce57e4' },
            { id: 'rm2_626', title: 'Episode 626 ∙ Show Me The Fight Money', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89e36e979983cdce57e5' },
            { id: 'rm2_627', title: 'Episode 627 ∙ Suk Jin VS Seok Jin', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89e36e979983cdce57e6' },
            { id: 'rm2_628', title: 'Episode 628 ∙ I\'m Finding Autumn', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89e76e979983cdce57e7' },
            { id: 'rm2_629', title: 'Episode 629 ∙ Combat: Transfer Bombs', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89e76e979983cdce57e8' },
            { id: 'rm2_630', title: 'Episode 630 ∙ One Dollar Lawyer', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89e96e979983cdce57e9' },
            { id: 'rm2_631', title: 'Episode 631 ∙ Or First World Cup Win?', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89ed6e979983cdce57ea' },
            { id: 'rm2_632', title: 'Episode 632 ∙ Or First World Cup Win?/The Lucky Number Race', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89f26e979983cdce57eb' },
            { id: 'rm2_633', title: 'Episode 633 ∙ What\'s The End of The Year Party', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89f26e979983cdce57ec' },
            { id: 'rm2_634', title: 'Episode 634 ∙ Yoosanta and The Sixth Rudolph', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc89f36e979983cdce57ed' },
            { id: 'rm2_635', title: 'Episode 635 ∙ Running Man Outing', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a1e6e979983cdce57ee' },
            { id: 'rm2_636', title: 'Episode 636 ∙ Running Man Outing II', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a236e979983cdce57ef' },
            { id: 'rm2_637', title: 'Episode 637 ∙ Sparkling Salary Race', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a236e979983cdce57f0' },
            { id: 'rm2_638', title: 'Episode 638 ∙ That is a Tattered Conglomerate Family', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a296e979983cdce57f1' },
            { id: 'rm2_639', title: 'Episode 639 ∙ Liverless Rabbit', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a296e979983cdce57f2' },
            { id: 'rm2_640', title: 'Episode 640 ∙ The Colourful Martial Arts Master/The Golden MT Time I', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a296e979983cdce57f3' },
            { id: 'rm2_641', title: 'Episode 641 ∙ The Golden MT Time II', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a2f6e979983cdce57f4' },
            { id: 'rm2_642', title: 'Episode 642 ∙ Winter Festival', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a2f6e979983cdce57f5' },
            { id: 'rm2_643', title: 'Episode 643 ∙ Butler\'s Days I', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a2f6e979983cdce57f6' },
            { id: 'rm2_644', title: 'Episode 644 ∙ Butler\'s Days II/Suk-jin\'s Treat', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a356e979983cdce57f7' },
            { id: 'rm2_645', title: 'Episode 645 ∙ Crash Course in Bad Hand', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a5f6e979983cdce57f8' },
            { id: 'rm2_646', title: 'Episode 646 ∙ Dongducheon Class', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a5f6e979983cdce57f9' },
            { id: 'rm2_647', title: 'Episode 647 ∙ Just right! Now Suitable for Camping. Part 1', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a616e979983cdce57fa' },
            { id: 'rm2_648', title: 'Episode 648 ∙ Just right! Now Suitable for Camping. Part 2', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a616e979983cdce57fb' },
            { id: 'rm2_649', title: 'Episode 649 ∙ Do You Know the Flower Scholar?', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a666e979983cdce57fc' },
            { id: 'rm2_650', title: 'Episode 650 ∙ Running Man in the Philippines', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a666e979983cdce57fd' },
            { id: 'rm2_651', title: 'Episode 651 ∙ No Coin No Gain', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a666e979983cdce57fe' },
            { id: 'rm2_652', title: 'Episode 652 ∙ Running Tour Project', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a6b6e979983cdce57ff' },
            { id: 'rm2_653', title: 'Episode 653 ∙ Age Notice Picture Exhibition. Part 1', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a6c6e979983cdce5800' },
            { id: 'rm2_654', title: 'Episode 654 ∙ Age Notice Picture Exhibition. Part 2', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a706e979983cdce5801' },
            { id: 'rm2_655', title: 'Episode 655 ∙ 2023 Choice of So-min', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a706e979983cdce5802' },
            { id: 'rm2_656', title: 'Episode 656 ∙ You\'re My Fool', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8a9b6e979983cdce5803' },
            { id: 'rm2_657', title: 'Episode 657 ∙ Ji-hyo\'s Detox Tour', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aa06e979983cdce5804' },
            { id: 'rm2_658', title: 'Episode 658 ∙ I\'m Single\'s Inferno', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aa06e979983cdce5805' },
            { id: 'rm2_659', title: 'Episode 659 ∙ I\'m Single\'s Inferno/The Lucky 29th', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aa06e979983cdce5806' },
            { id: 'rm2_660', title: 'Episode 660 ∙ Heating with Noodles', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aa56e979983cdce5807' },
            { id: 'rm2_661', title: 'Episode 661 ∙ Forget-About-Age Party', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aa56e979983cdce5808' },
            { id: 'rm2_662', title: 'Episode 662 ∙ Running Scout', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aa66e979983cdce5809' },
            { id: 'rm2_663', title: 'Episode 663 ∙ Along with Veterans Joseon Dynasty Edition', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aaa6e979983cdce580a' },
            { id: 'rm2_664', title: 'Episode 664 ∙ Yoo Jae-suk\'s Cultural Heritage Inspection Diary', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aab6e979983cdce580b' },
            { id: 'rm2_665', title: 'Episode 665 ∙ Summer Vacation: Running Man Outing. Part 1', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8aab6e979983cdce580c' },
            { id: 'rm2_666', title: 'Episode 666 ∙ Summer Vacation: Running Man Outing. Part 2', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8ad76e979983cdce580d' },
            { id: 'rm2_667', title: 'Episode 667 ∙ Summer Vacation in Fishing Village: Running Man Outing. Part 1', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8adc6e979983cdce580e' },
            { id: 'rm2_668', title: 'Episode 668 ∙ Summer Vacation in Fishing Village: Running Man Outing. Part 2', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8adc6e979983cdce580f' },
            { id: 'rm2_669', title: 'Episode 669 ∙ Midsummer Nights Detective', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8ade6e979983cdce5810' },
            { id: 'rm2_670', title: 'Episode 670 ∙ Midsummer Nights Detective', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8ae26e979983cdce5811' },
            { id: 'rm2_671', title: 'Episode 671 ∙ Vtopia That Eats Up the Ground', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8ae26e979983cdce5812' },
            { id: 'rm2_672', title: 'Episode 672 ∙ Money Road in Daehangno', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8ae86e979983cdce5813' },
            { id: 'rm2_673', title: 'Episode 673 ∙ Amnesia Couple Battle', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8ae96e979983cdce5814' },
            { id: 'rm2_674', title: 'Episode 674 ∙ "Yoo" are my Leader', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8ae96e979983cdce5815' },
            { id: 'rm2_675', title: 'Episode 675 ∙ The Escape of the Ten', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8b136e979983cdce5816' },
            { id: 'rm2_676', title: 'Episode 676 ∙ Few Heaven', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8b136e979983cdce5817' },
            { id: 'rm2_677', title: 'Episode 677 ∙ Autumn Food Party', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8b1a6e979983cdce5818' },
            { id: 'rm2_678', title: 'Episode 678 ∙ The Dream of a Million Dollars', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8b1a6e979983cdce5819' },
            { id: 'rm2_679', title: 'Episode 679 ∙ Goodbye So-Min', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8b1b6e979983cdce581a' }
        ]
  },
  {
    'running-man-680-732': {
        name: 'Running Man Episode 680-732',
        poster: 'https://i.postimg.cc/q7cWfdBT/RM-SCP.webp',
        type: 'series',
        videos: [
            { id: 'rm3_680', title: 'Episode 680 ∙ Do You Want to Win the Championship?', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8c8c6e979983cdce581c' },
            { id: 'rm3_681', title: 'Episode 681 ∙ Singapore Exclusive Package', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8c8c6e979983cdce581d' },
            { id: 'rm3_682', title: 'Episode 682 ∙ Tazza: Veteran\'s Wonderland', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8c8c6e979983cdce581b' },
            { id: 'rm3_683', title: 'Episode 683 ∙ Tazza: Veteran\'s Wonderland/Travel to Suk-jin in Advance', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8c8c6e979983cdce5820' },
            { id: 'rm3_684', title: 'Episode 684 ∙ Attack and Defense Come, Attack and Defense Stay: Clear War', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8c8c6e979983cdce581f' },
            { id: 'rm3_685', title: 'Episode 685 ∙ Will I Give You a Gift at Christmas? (Christmas Special)', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8c8c6e979983cdce581e' },
            { id: 'rm3_686', title: 'Episode 686 ∙ Running Villa in Crisis (New Year Special)', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f246e979983cdce5823' },
            { id: 'rm3_687', title: 'Episode 687 ∙ 2nd Winter Festival (Winter Special)', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f246e979983cdce5825' },
            { id: 'rm3_688', title: 'Episode 688 ∙ Will You be Satisfied with Me?', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f246e979983cdce5821' },
            { id: 'rm3_689', title: 'Episode 689 ∙ Ji Seok-jin Oh~swa Healthy Oh~swa', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f246e979983cdce5826' },
            { id: 'rm3_690', title: 'Episode 690 ∙ Wonderful Value! for Money', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f276e979983cdce5828' },
            { id: 'rm3_691', title: 'Episode 691 ∙ It Is the Ji\'s Family Who Repays the Favor (Lunar New Year Special)', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f276e979983cdce5827' },
            { id: 'rm3_692', title: 'Episode 692 ∙ The Legendary Gold Bar', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f2c6e979983cdce582a' },
            { id: 'rm3_693', title: 'Episode 693 ∙ I will Win in My Next Life. Part 1', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f2c6e979983cdce5829' },
            { id: 'rm3_694', title: 'Episode 694 ∙ I will Win in My Next Life. Part 2/Towards the tower', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f2c6e979983cdce582b' },
            { id: 'rm3_695', title: 'Episode 695 ∙ Top Teacher Yoo Jae-suk\'s Empty Head Historical Visit', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f2c6e979983cdce582c' },
            { id: 'rm3_696', title: 'Episode 696 ∙ Running Old Shops Marble', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f316e979983cdce582d' },
            { id: 'rm3_697', title: 'Episode 697 ∙ 1st Futsal Running Cup', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f376e979983cdce582e' },
            { id: 'rm3_698', title: 'Episode 698 ∙ The Hips are full', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f376e979983cdce582f' },
            { id: 'rm3_699', title: 'Episode 699 ∙ Spring has come to TV Rating Notice', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f376e979983cdce5830' },
            { id: 'rm3_700', title: 'Episode 700 ∙ Sweet and Sweet 7 Million Dollars (700th Episode special)', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f376e979983cdce5831' },
            { id: 'rm3_701', title: 'Episode 701 ∙ 2nd Futsal Running Cup', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f636e979983cdce5832' },
            { id: 'rm3_702', title: 'Episode 702 ∙ Half of the Future', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f636e979983cdce5833' },
            { id: 'rm3_703', title: 'Episode 703 ∙ Returning Go Stop', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f686e979983cdce5834' },
            { id: 'rm3_704', title: 'Episode 704 ∙ More Wonderful Value! for Money Part.2', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f686e979983cdce5835' },
            { id: 'rm3_705', title: 'Episode 705 ∙ I Have to Come in First Place', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f696e979983cdce5836' },
            { id: 'rm3_706', title: 'Episode 706 ∙ Oh My Gosh Kang Hoon (Kang Hoon\'s birthday special)', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f6e6e979983cdce5837' },
            { id: 'rm3_707', title: 'Episode 707 ∙ Between Partner and Fake Partner', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f6e6e979983cdce5838' },
            { id: 'rm3_708', title: 'Episode 708 ∙ 3rd Hwang Hee-chan Cup Futsal Running Cup', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f6e6e979983cdce5839' },
            { id: 'rm3_709', title: 'Episode 709 ∙ 3rd Hwang Hee-chan Cup Futsal Running Cup II / Joint Escape Area Race', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f746e979983cdce583a' },
            { id: 'rm3_710', title: 'Episode 710 ∙ Summer Meal Break Initiated', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f9f6e979983cdce583c' },
            { id: 'rm3_711', title: 'Episode 711 ∙ The Unknown Choice', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f9f6e979983cdce583b' },
            { id: 'rm3_712', title: 'Episode 712 ∙ Good and Bad Partner', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8f9f6e979983cdce583d' },
            { id: 'rm3_713', title: 'Episode 713 ∙ Temperature Differences in the Middle of Summer (14th Anniversary SBS Running Man Special)', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8fa56e979983cdce583e' },
            { id: 'rm3_714', title: 'Episode 714 ∙ 2024 Burning Runningpic (2024 Paris Olympics Special)', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8faa6e979983cdce583f' },
            { id: 'rm3_715', title: 'Episode 715 ∙ The Desperate Villagecance', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8faa6e979983cdce5840' },
            { id: 'rm3_716', title: 'Episode 716 ∙ National Runningpic', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8fab6e979983cdce5841' },
            { id: 'rm3_717', title: 'Episode 717 ∙ Happy Dice Day (Yoo Jae-suk, Haha, and Song Ji-hyo\'s birthday special)', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8fab6e979983cdce5842' },
            { id: 'rm3_718', title: 'Episode 718 ∙ Soo Yoo-ri Catch Lucky', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8fab6e979983cdce5843' },
            { id: 'rm3_719', title: 'Episode 719 ∙ The Unlucky Family Appears', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc8fe06e979983cdce5844' },
            { id: 'rm3_720', title: 'Episode 720 ∙ The Perfect Code', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90566e979983cdce5845' },
            { id: 'rm3_721', title: 'Episode 721 ∙ Check your luck! - MT with Mr. Tong', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90566e979983cdce5849' },
            { id: 'rm3_722', title: 'Episode 722 ∙ Alley Leader for Each Other', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90566e979983cdce5848' },
            { id: 'rm3_723', title: 'Episode 723 ∙ Indomitable maintainer', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90566e979983cdce584a' },
            { id: 'rm3_724', title: 'Episode 724 ∙ Hierarchical Clan', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90566e979983cdce5847' },
            { id: 'rm3_725', title: 'Episode 725 ∙ Only Money For Me', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90566e979983cdce5846' },
            { id: 'rm3_726', title: 'Episode 726 ∙ Look at The Way You Believe Me', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc905e6e979983cdce584b' },
            { id: 'rm3_727', title: 'Episode 727 ∙ The Monitor Election that Overestimates One\'s Ability feat. Autumn Picnic', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc905e6e979983cdce584c' },
            { id: 'rm3_728', title: 'Episode 728 ∙ Decision to Trust', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc905f6e979983cdce584e' },
            { id: 'rm3_729', title: 'Episode 729 ∙ Such an Intimate Overseas Traveling', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc905e6e979983cdce584d' },
            { id: 'rm3_730', title: 'Episode 730 ∙ Choose your Odd/Even Choice Wisely', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90646e979983cdce584f' },
            { id: 'rm3_731', title: 'Episode 731 ∙ The Invitation doesn\'t go as Planned', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90656e979983cdce5850' },
            { id: 'rm3_732', title: 'Episode 732 ∙ Cool Running Year-End Party', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc90696e979983cdce5851' },
     ]
  },
  {
    'running-man-733-822': {
        name: 'Running Man Episode 680-732',
        poster: 'https://i.postimg.cc/fb714hWs/RM-YESCP.webp',
        type: 'series',
        videos: [
            { id: 'rm4_733', title: 'Running Man - 733: The Cool Running Year-End Party. Part 2', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc92146e979983cdce5852' },
            { id: 'rm4_734', title: 'Running Man - 734: Resolve to Part Ways with 2024', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc92146e979983cdce5855' },
            { id: 'rm4_735', title: 'Running Man - 735: The Lucky 2025', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc92146e979983cdce5853' },
            { id: 'rm4_736', title: 'Running Man - 736: Team Kill Not Sorry', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc92146e979983cdce5856' },
            { id: 'rm4_737', title: 'Running Man - 737: The Blessed Gods Ratio Part.3', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc92146e979983cdce5854' },
            { id: 'rm4_738', title: 'Running Man - 738: The Person Who Laughs in Paradise', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc92146e979983cdce5857' },
            { id: 'rm4_739', title: 'Running Man - 739: The Chaotic Life of Slaves', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc921c6e979983cdce5858' },
            { id: 'rm4_740', title: 'Running Man - 740: The Don\'t Go Family', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc921c6e979983cdce5859' },
            { id: 'rm4_741', title: 'Running Man - 741: SOS. The Cleanup Code: Heroes on Call', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc921e6e979983cdce585a' },
            { id: 'rm4_742', title: 'Running Man - 742: Love Consumption', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc921e6e979983cdce585b' },
            { id: 'rm4_743', title: 'Running Man - 743: 2025 Running Backup Championship', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc92216e979983cdce585c' },
            { id: 'rm4_744', title: 'Running Man - 744: Going Up the TV Rating Notice', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93796e979983cdce5862' },
            { id: 'rm4_745', title: 'Running Man - 745: Recharge After Work', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93796e979983cdce5861' },
            { id: 'rm4_746', title: 'Running Man - 746: How Did a Imogi Becomes a Dragon', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93796e979983cdce585f' },
            { id: 'rm4_747', title: 'Running Man - 747: He Said We\'re New Family', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93796e979983cdce585e' },
            { id: 'rm4_748', title: 'Running Man - 748: Determination to Drive', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93796e979983cdce5860' },
            { id: 'rm4_749', title: 'Running Man - 749: Merchant Chronicles: You Have to Earn to Live', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93796e979983cdce585d' },
            { id: 'rm4_750', title: 'Running Man - 750: A Good Day for being Solo', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93826e979983cdce5863' },
            { id: 'rm4_751', title: 'Running Man - 751: The More You Shoot, the More You Succeed', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93826e979983cdce5865' },
            { id: 'rm4_752', title: 'Running Man - 752: Territorial Expansion of Killers', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93826e979983cdce5867' },
            { id: 'rm4_753', title: 'Running Man - 753: The Eye-Catching Running Family', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93826e979983cdce5864' },
            { id: 'rm4_754', title: 'Running Man - 754: Let\'s Vote Spring', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93826e979983cdce5866' },
            { id: 'rm4_755', title: 'Running Man - 755: Road Trips as Drawn', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93826e979983cdce5868' },
            { id: 'rm4_756', title: 'Running Man - 756: Veterans In the City', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc938c6e979983cdce586a' },
            { id: 'rm4_757', title: 'Running Man - 757: The Empty Head Avengers Last Competition', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc938c6e979983cdce5869' },
            { id: 'rm4_758', title: 'Running Man - 758: The Miracle Breakfast', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc938c6e979983cdce586b' },
            { id: 'rm4_759', title: 'Running Man - 759: Creepy Vacation Thriller', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc938c6e979983cdce586c' },
            { id: 'rm4_760', title: 'Running Man - 760: Back to 2010', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc938c6e979983cdce586d' },
            { id: 'rm4_761', title: 'Running Man - 761: The Splitting Gamblers', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc938c6e979983cdce586e' },
            { id: 'rm4_762', title: 'Running Man - 762: Happy Ye-eun Day', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93926e979983cdce586f' },
            { id: 'rm4_763', title: 'Running Man - 763: The Weak Loyalty Roulette Battle', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93926e979983cdce5870' },
            { id: 'rm4_764', title: 'Running Man - 764: 2025 Daytime Goblin Room Tour', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93926e979983cdce5871' },
            { id: 'rm4_765', title: 'Running Man - 765: Between Flops and Masterpieces', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93926e979983cdce5872' },
            { id: 'rm4_766', title: 'Running Man - 766: Running Sports University Prize Victory', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93926e979983cdce5873' },
            { id: 'rm4_767', title: 'Running Man - 767: More spend, more luck! The Lucky Date Strikes', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93926e979983cdce5874' },
            { id: 'rm4_768', title: 'Running Man - 768: The Time Prize and Penalty Fighter Attack', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93fa6e979983cdce5875' },
            { id: 'rm4_769', title: 'Running Man - 769: Go Straight as You Answer', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93fa6e979983cdce5876' },
            { id: 'rm4_770', title: 'Running Man - 770: Holding Back Laughter, Congratulatory Delegation', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93fa6e979983cdce5877' },
            { id: 'rm4_771', title: 'Running Man - 771: Sir, That Salary Goes to The CEO', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93fa6e979983cdce5878' },
            { id: 'rm4_772', title: 'Running Man - 772: The King\'s Crops', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93fa6e979983cdce5879' },
            { id: 'rm4_773', title: 'Running Man - 773: A World Where Only the Average Survives', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc93fa6e979983cdce587a' },
            { id: 'rm4_774', title: 'Running Man - 774: Finders Keepers, Gold Hunters', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94386e979983cdce587b' },
            { id: 'rm4_775', title: 'Running Man - 775: Time-lapse Photography Crew', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94386e979983cdce587c' },
            { id: 'rm4_776', title: 'Running Man - 776: Running Man Weekly Keywords', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94386e979983cdce587d' },
            { id: 'rm4_777', title: 'Running Man - 777: When we gather, it\'s all good! Autumn Literary Club', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94386e979983cdce587e' },
            { id: 'rm4_778', title: 'Running Man - 778: Dynamite Abandonment', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94386e979983cdce587f' },
            { id: 'rm4_779', title: 'Running Man - 779: Isn\'t this the real deal?', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94386e979983cdce5880' },
            { id: 'rm4_780', title: 'Running Man - 780: Isn\'t this the real deal 2', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94386e979983cdce5881' },
            { id: 'rm4_781', title: 'Running Man - 781: The Problematic New Members', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94386e979983cdce5882' },
            { id: 'rm4_782', title: 'Running Man - 782: May it reach you as a Christmas gift', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94386e979983cdce5883' },
            { id: 'rm4_783', title: 'Running Man - 783: The Year-End Clear out Settlement', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94386e979983cdce5884' },
            { id: 'rm4_784', title: 'Running Man - 784: Follow the Horse, Complete the Bingo', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94816e979983cdce5885' },
            { id: 'rm4_785', title: 'Running Man - 785: Gold Bag Chasers: Gold Me More', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94816e979983cdce5886' },
            { id: 'rm4_786', title: 'Running Man - 786: The Lucky 2026 OT Day', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94816e979983cdce5887' },
            { id: 'rm4_787', title: 'Running Man - 787: Starting Today, I\'m A Nine-Tailed Fox But', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94816e979983cdce5888' },
            { id: 'rm4_788', title: 'Running Man - 788: TV Rating Notice Survival', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94816e979983cdce5889' },
            { id: 'rm4_789', title: 'Running Man - 789: The Game of Two', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94816e979983cdce588a' },
            { id: 'rm4_790', title: 'Running Man - 790: I\'m the Main Character Until Lunar New Year', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94816e979983cdce588b' },
            { id: 'rm4_791', title: 'Running Man - 791: The Great Jee-tsby', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94816e979983cdce588c' },
            { id: 'rm4_792', title: 'Running Man - 792: Card Shark Association: Return of the 2026 Gamblers', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94816e979983cdce588d' },
            { id: 'rm4_793', title: 'Running Man - 793: Run and Fun Company: Spin the Roomlette', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94816e979983cdce588e' },
            { id: 'rm4_794', title: 'Running Man - 794: Recharging Your Energy is All About Speed in Spring', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94816e979983cdce588f' },
            { id: 'rm4_795', title: 'Running Man - 795: Detective Agency: Find the Genuine Piece', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94816e979983cdce5890' },
            { id: 'rm4_796', title: 'Running Man - 796: You\'d Probably Want a Bite', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94816e979983cdce5891' },
            { id: 'rm4_797', title: 'Running Man - 797: War of the Bosses: Ladder of Destiny', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94816e979983cdce5892' },
            { id: 'rm4_798', title: 'Running Man - 798: The Art of Betting: The Birth of a Gambler', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94816e979983cdce5893' },
            { id: 'rm4_799', title: 'Running Man - 799: Running Days: Codename R', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f46e979983cdce5894' },
            { id: 'rm4_800', title: 'Running Man - 800: Infinite Accumulation with Destiny Race', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f46e979983cdce5895' },
            { id: 'rm4_801', title: 'Running Man - 801: Be Different to Walk the Flower Path', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f46e979983cdce5896' },
            { id: 'rm4_802', title: 'Running Man - 802: Gold Thief: Break the Vault', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f46e979983cdce5897' },
            { id: 'rm4_803', title: 'Running Man - 803: Secret Payment', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f46e979983cdce5898' },
            { id: 'rm4_804', title: 'Running Man - 804: Why is Running Man Like That?', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f46e979983cdce5899' },
            { id: 'rm4_805', title: 'Running Man - 805: I Will Prove It With My Face', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f46e979983cdce589a' },
            { id: 'rm4_806', title: 'Running Man - 806: Solo Money Up', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f46e979983cdce589b' },
            { id: 'rm4_807', title: 'Running Man - 807: A Quick Visit to Your Place', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f46e979983cdce589c' },
            { id: 'rm4_808', title: 'Running Man - 808: Running Man Summer Vacation', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f46e979983cdce589d' },
            { id: 'rm4_809', title: 'Running Man - 809: The Invaluable New World', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f46e979983cdce589e' },
            { id: 'rm4_810', title: 'Running Man - 810: A Great Luck Comes to Me', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f46e979983cdce589f' },
            { id: 'rm4_811', title: 'Running Man - 811: Holding the Nostalgic Memory\'s Edge', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f46e979983cdce58a0' },
            { id: 'rm4_812', title: 'Running Man - 812: Yaho Off to Work', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f46e979983cdce58a1' },
            { id: 'rm4_813', title: 'Running Man - 813: Goal: The Favorite Employee', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f46e979983cdce58a2' },
            { id: 'rm4_814', title: 'Running Man - 814: Undercover Chaebol vs. Detectives', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f46e979983cdce58a3' },
            { id: 'rm4_815', title: 'Running Man - 815: Let\'s All Walk Around Jongno', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f96e979983cdce58a4' },
            { id: 'rm4_816', title: 'Running Man - 816: Scratch-vacation in the Sweltering Heat', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94f96e979983cdce58a5' },
            { id: 'rm4_817', title: 'Running Man - 817: Stay Strong Chief Kang!', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94fa6e979983cdce58a6' },
            { id: 'rm4_818', title: 'Running Man - 818: Take It or Leave It?', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94fa6e979983cdce58a7' },
            { id: 'rm4_819', title: 'Running Man - 819: Irrefutable Artificial Intelligence \'Pick\'', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc94fe6e979983cdce58a8' },
            { id: 'rm4_820', title: 'Running Man - 820: Episode #1.820', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc95266e979983cdce58a9' },
            { id: 'rm4_821', title: 'Running Man - 821: Episode #1.821', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc95316e979983cdce58aa' },
            { id: 'rm4_822', title: 'Running Man - 822: Episode #1.822', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acc95336e979983cdce58ab' }
        ]
  },
  {
    'dragon-ball-movies': {
        name: 'Dragon Ball (Movies)',
        poster: 'https://i.postimg.cc/0N7jfkC0/goku.jpg',
        type: 'movie',
        videos: [
            { id: 'dbm_1', title: 'Mutiara Naga Movie 04: The Path to Power', poster: 'https://i.postimg.cc/2y7nXdFB/DB-The-Path-To-Power-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb1486e979983cdce5a77' },
            { id: 'dbm_2', title: 'Dragon Ball: Sleeping Princess in Devil\'s Castle', poster: 'https://i.postimg.cc/VvWXH9Bq/sleeping-princess-in-devil-s-castle-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb1486e979983cdce5a78' },
            { id: 'dbm_3', title: 'Dragon Ball: Legend of Shenron', poster: 'https://i.postimg.cc/Wzw0fm6Z/DB-The-Legend-Of-Shenron-DP.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb1486e979983cdce5a79' }
        ]
  },
  {
    'satria-7-pahlawan': {
        name: 'Satria 7 Pahlawan (Series)',
        poster: 'https://i.postimg.cc/mZmDV678/Satria-DP.jpg',
        type: 'series',
        videos: Array.from({ length: 26 }, (_, i) => ({
            id: `s7p_${i + 1}`,
            title: `[EP.${String(i + 1).padStart(2, '0')}] Satria 7 Pahlawan`,
            url: [
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7f',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7d',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7b',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7e',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7a',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2bf6e979983cdce5a7c',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2c76e979983cdce5a80',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2c76e979983cdce5a81',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2c76e979983cdce5a82',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2c76e979983cdce5a83',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2cd6e979983cdce5a84',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2cd6e979983cdce5a85',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2d26e979983cdce5a86',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2d26e979983cdce5a87',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2fe6e979983cdce5a88',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2fe6e979983cdce5a89',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2fe6e979983cdce5a8a',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb2ff6e979983cdce5a8b',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3036e979983cdce5a8c',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3036e979983cdce5a8d',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3096e979983cdce5a8e',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3096e979983cdce5a8f',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3096e979983cdce5a90',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb30e6e979983cdce5a91',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb30e6e979983cdce5a92',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb33a6e979983cdce5a93'
            ][i]
        }))
    },
    'gundam-build-fighter': {
        name: 'Gundam Build Fighter (Series)',
        poster: 'https://i.postimg.cc/hjsCsjV5/Gundam-Build-Fighter-DP.png',
        type: 'series',
        videos: Array.from({ length: 25 }, (_, i) => ({
            id: `gbf_${i + 1}`,
            title: `GUNDAM BUILD FIGHTERS Episode ${i + 1}`,
            url: [
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a96',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a94',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a95',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a98',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a99',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb38a6e979983cdce5a97',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3926e979983cdce5a9a',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3926e979983cdce5a9c',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3926e979983cdce5a9b',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3926e979983cdce5a9d',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3986e979983cdce5a9e',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3986e979983cdce5a9f',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb39d6e979983cdce5aa0',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb39d6e979983cdce5aa1',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb39d6e979983cdce5aa2',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb39d6e979983cdce5aa3',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3c96e979983cdce5aa4',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3ce6e979983cdce5aa5',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3ce6e979983cdce5aa6',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3ce6e979983cdce5aa7',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3d46e979983cdce5aa8',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3d46e979983cdce5aa9',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3d46e979983cdce5aaa',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3d96e979983cdce5aab',
                'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb3d96e979983cdce5aac'
            ][i]
        }))
    },
    'time-bokan-24': {
        name: 'Time Bokan 24 (Series)',
        poster: 'https://i.postimg.cc/HnL6hg2m/Time-Bokan-24-DP.jpg',
        type: 'series',
        videos: [
            { id: 'tb24_1', title: 'Time Bokan 24 - Episode 01', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5ab0' },
            { id: 'tb24_2', title: 'Time Bokan 24 - Episode 02', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5aad' },
            { id: 'tb24_3', title: 'Time Bokan 24 - Episode 03', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5ab1' },
            { id: 'tb24_4', title: 'Time Bokan 24 - Episode 04', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5aae' },
            { id: 'tb24_5', title: 'Time Bokan 24 - Episode 05', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5ab2' },
            { id: 'tb24_6', title: 'Time Bokan 24 - Episode 06', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb51a6e979983cdce5aaf' },
            { id: 'tb24_7', title: 'Time Bokan 24 - Episode 07', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5226e979983cdce5ab3' },
            { id: 'tb24_8', title: 'Time Bokan 24 - Episode 08', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5246e979983cdce5ab4' },
            { id: 'tb24_9', title: 'Time Bokan 24 - Episode 09', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5246e979983cdce5ab5' },
            { id: 'tb24_10', title: 'Time Bokan 24 - Episode 10', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5246e979983cdce5ab6' },
            { id: 'tb24_12', title: 'Time Bokan 24 - Episode 12', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5276e979983cdce5ab7' },
            { id: 'tb24_13', title: 'Time Bokan 24 - Episode 13', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5276e979983cdce5ab8' },
            { id: 'tb24_14', title: 'Time Bokan 24 - Episode 14', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb52d6e979983cdce5ab9' },
            { id: 'tb24_15', title: 'Time Bokan 24 - Episode 15', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb52d6e979983cdce5aba' },
            { id: 'tb24_16', title: 'Time Bokan 24 - Episode 16', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb52d6e979983cdce5abb' },
            { id: 'tb24_17', title: 'Time Bokan 24 - Episode 17', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb52d6e979983cdce5abc' },
            { id: 'tb24_18', title: 'Time Bokan 24 - Episode 18', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb55d6e979983cdce5abd' },
            { id: 'tb24_19', title: 'Time Bokan 24 - Episode 19', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb55d6e979983cdce5abe' },
            { id: 'tb24_20', title: 'Time Bokan 24 - Episode 20', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb55d6e979983cdce5abf' },
            { id: 'tb24_21', title: 'Time Bokan 24 - Episode 21', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb55d6e979983cdce5ac0' },
            { id: 'tb24_22', title: 'Time Bokan 24 - Episode 22', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5636e979983cdce5ac1' },
            { id: 'tb24_23', title: 'Time Bokan 24 - Episode 23', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5636e979983cdce5ac2' },
            { id: 'tb24_24', title: 'Time Bokan 24 - Episode 24 Akhir', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5686e979983cdce5ac3' }
        ]
    },
    'naruto-movies': {
        name: 'Naruto (Movie)',
        poster: 'https://i.postimg.cc/8kRvPQ0p/Naruto-Movie-DP.jpg',
        type: 'movie',
        videos: [
            { id: 'nmov_1', title: 'Naruto The Movie 3: Guardians of the Crescent Moon Kingdom', poster: 'https://i.postimg.cc/qvRm0kWy/Naruto-The-Movie-3-Guardians-of-the-Crescent-Moon-Kingdom-(Malay-Dub).jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accaf986e979983cdce5a74' },
            { id: 'nmov_2', title: 'Naruto The Movie: Legend of the Stone of Gelel', poster: 'https://i.postimg.cc/7Z6BDxj2/Naruto-the-Movie-Legend-of-the-Stone-of-Gelel.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accaf986e979983cdce5a75' },
            { id: 'nmov_3', title: 'Naruto The Movie: Ninja Clash in the Land of Snow', poster: 'https://i.postimg.cc/SxsZqyH8/Naruto-the-Movie-Ninja-Clash-in-the-Land-of-Snow.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accaf986e979983cdce5a73' }
        ]
    },
    'doraemon-movies': {
        name: 'Doraemon (Movie)',
        poster: 'https://i.postimg.cc/Bb7ZD43r/D13.png',
        type: 'movie',
        videos: [
            { id: 'dmov_1', title: 'Doraemon: The Record of Nobita\'s Parallel Visit to the West (1988)', poster: 'https://i.postimg.cc/K8McK6Wz/D1.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a66' },
            { id: 'dmov_2', title: 'Doraemon: Nobita\'s Treasure Island (2018)', poster: 'https://i.postimg.cc/cJGxfDqT/D2.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a68' },
            { id: 'dmov_3', title: 'Doraemon: Great Adventure in The Antarctic Kachi Kochi (2017)', poster: 'https://i.postimg.cc/L814qcbG/D3.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a67' },
            { id: 'dmov_4', title: 'Doraemon 2003 Nobita', poster: 'https://i.postimg.cc/SKLydWkb/D4.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a65' },
            { id: 'dmov_5', title: 'Doraemon Stand By Me (2014)', poster: 'https://i.postimg.cc/tCfC4q2W/D5.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a69' },
            { id: 'dmov_6', title: 'Doraemon 2017 - Benua Antartika', poster: 'https://i.postimg.cc/9FSFQmJy/D6.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab1d6e979983cdce5a6a' },
            { id: 'dmov_7', title: 'Doraemon Nobita and the Steel Troops (1986)', poster: 'https://i.postimg.cc/QxVdD9kK/D7.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab256e979983cdce5a6c' },
            { id: 'dmov_8', title: 'Doraemon Nobita in the Robot Kingdom (2002)', poster: 'https://i.postimg.cc/YqjC7Gfh/D8.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab256e979983cdce5a6d' },
            { id: 'dmov_9', title: 'Doraemon Nobita and the Haunts of Evil (1982)', poster: 'https://i.postimg.cc/yYW8KgXX/D9.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab256e979983cdce5a6b' },
            { id: 'dmov_10', title: 'Doraemon Nobita and the Castle of the Undersea Devil (1983)', poster: 'https://i.postimg.cc/3wjK1g71/D10.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab256e979983cdce5a6e' },
            { id: 'dmov_11', title: 'Doraemon Nobita and the Birth of Japan (2016)', poster: 'https://i.postimg.cc/8kZzxBWS/D11.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab2b6e979983cdce5a70' },
            { id: 'dmov_12', title: 'Doraemon Nobita in the Wan Nyan Spacetime Odyssey (2004)', poster: 'https://i.postimg.cc/FFTHwgSq/D12.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab2a6e979983cdce5a6f' },
            { id: 'dmov_13', title: 'Doraemon Movie Special Movie', poster: 'https://i.postimg.cc/Bb7ZD43r/D13.png', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab306e979983cdce5a71' },
            { id: 'dmov_14', title: 'Doraemon Nobita\'s Dinosaur (2006)', poster: 'https://i.postimg.cc/90gXTCVq/D14.webp', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accab306e979983cdce5a72' },
            { id: 'dmov_15', title: 'Doraemon: Nobita and the Secret Gadget Museum (2013)', poster: 'https://i.postimg.cc/4yfjzS1C/Doraemon-The-Movie-Nobita-and-Secret-Gadget-Museum.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb5fa6e979983cdce5ac4' },
            { id: 'dmov_16', title: 'Doraemon: Nobita & The Space Heroes (2015)', poster: 'https://i.postimg.cc/j2xBzF4Z/Doraemon-The-Movie-Nobita-The-Space-Heroes.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb6076e979983cdce5ac5' },
            { id: 'dmov_17', title: 'Doraemon: New Record of Nobita\'s Spaceblazer (2009)', poster: 'https://i.postimg.cc/wMqnhGQF/Doraemon-The-Movie-New-Record-of-Nobita-Spaceblazer.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb6136e979983cdce5ac6' },
            { id: 'dmov_18', title: 'Stand by Me Doraemon 2 (2020)', poster: 'https://i.postimg.cc/WzNxMHw8/Doraemon-Stand-By-Me-2.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb6196e979983cdce5ac7' },
            { id: 'dmov_19', title: 'Stand by Me Doraemon', poster: 'https://i.postimg.cc/wMqnhGQV/Doraemon-Stand-By-Me.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6accb6236e979983cdce5ac8' }
        ]
    },
    'hagemaru': {
        name: 'Hagemaru (Series)',
        poster: 'https://i.postimg.cc/bJg6gJ1W/Hagemaru-DP.jpg',
        type: 'series',
        videos: [
            { id: 'hge_1', title: 'Hagemaru - Episode 01', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a26' },
            { id: 'hge_2', title: 'Hagemaru - Episode 02', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a24' },
            { id: 'hge_3', title: 'Hagemaru - Episode 03', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a22' },
            { id: 'hge_4', title: 'Hagemaru - Episode 04', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a23' },
            { id: 'hge_5', title: 'Hagemaru - Episode 05', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a25' },
            { id: 'hge_6', title: 'Hagemaru - Episode 06', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6a96e979983cdce5a27' },
            { id: 'hge_7', title: 'Hagemaru - Episode 07', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6b16e979983cdce5a28' },
            { id: 'hge_8', title: 'Hagemaru - Episode 08', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6b36e979983cdce5a2b' },
            { id: 'hge_9', title: 'Hagemaru - Episode 09', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6b36e979983cdce5a29' },
            { id: 'hge_10', title: 'Hagemaru - Episode 10', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6b36e979983cdce5a2a' },
            { id: 'hge_11', title: 'Hagemaru - Episode 11', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6b66e979983cdce5a2c' },
            { id: 'hge_12', title: 'Hagemaru - Episode 12', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6b66e979983cdce5a2d' },
            { id: 'hge_13', title: 'Hagemaru - Episode 13', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6bc6e979983cdce5a2e' },
            { id: 'hge_14', title: 'Hagemaru - Episode 14', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6bc6e979983cdce5a2f' },
            { id: 'hge_15', title: 'Hagemaru - Episode 15', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6bc6e979983cdce5a30' },
            { id: 'hge_16', title: 'Hagemaru - Episode 16', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6bc6e979983cdce5a31' },
            { id: 'hge_17', title: 'Hagemaru - Episode 17', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6ef6e979983cdce5a32' },
            { id: 'hge_18', title: 'Hagemaru - Episode 18', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6ef6e979983cdce5a33' },
            { id: 'hge_19', title: 'Hagemaru - Episode 19', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6ef6e979983cdce5a34' },
            { id: 'hge_20', title: 'Hagemaru - Episode 20', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6ef6e979983cdce5a35' },
            { id: 'hge_21', title: 'Hagemaru - Episode 21', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6f66e979983cdce5a36' },
            { id: 'hge_22', title: 'Hagemaru - Episode 22', poster: 'https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6fa6e979983cdce5a37' }
        ]
    },
    id: 'boruto',
    name: 'Boruto',
    type: 'series',
    poster: 'https://i.postimg.cc/1tBWBtDc/Boruto-DP.jpg',
    description: 'Katalog siri Boruto lengkap dengan semua episod.',
    episodes: [
      { id: 'boruto-1', title: 'Boruto Episode 1', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca26e6e979983cdce59d2' },
      { id: 'boruto-2', title: 'Boruto Episode 2', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca26e6e979983cdce59d3' },
      { id: 'boruto-3', title: 'Boruto Episode 3', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca26e6e979983cdce59d4' },
      { id: 'boruto-4', title: 'Boruto Episode 4', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca26e6e979983cdce59d5' },
      { id: 'boruto-5', title: 'Boruto Episode 5', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2736e979983cdce59d6' },
      { id: 'boruto-6', title: 'Boruto Episode 6', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca27a6e979983cdce59d7' },
      { id: 'boruto-7', title: 'Boruto Episode 7', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2a06e979983cdce59d8' },
      { id: 'boruto-8', title: 'Boruto Episode 8', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2a06e979983cdce59d9' },
      { id: 'boruto-9', title: 'Boruto Episode 9', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2a06e979983cdce59da' },
      { id: 'boruto-10', title: 'Boruto Episode 10', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2a66e979983cdce59db' },
      { id: 'boruto-11', title: 'Boruto Episode 11', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2a66e979983cdce59dc' },
      { id: 'boruto-12', title: 'Boruto Episode 12', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2ab6e979983cdce59de' },
      { id: 'boruto-13', title: 'Boruto Episode 13', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2ab6e979983cdce59df' },
      { id: 'boruto-14', title: 'Boruto Episode 14', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2b16e979983cdce59e0' },
      { id: 'boruto-15', title: 'Boruto Episode 15', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2b16e979983cdce59e1' },
      { id: 'boruto-16', title: 'Boruto Episode 16', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2dc6e979983cdce59e2' },
      { id: 'boruto-17', title: 'Boruto Episode 17', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e06e979983cdce59e3' },
      { id: 'boruto-18', title: 'Boruto Episode 18', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e06e979983cdce59e4' },
      { id: 'boruto-19', title: 'Boruto Episode 19', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e16e979983cdce59e6' },
      { id: 'boruto-20', title: 'Boruto Episode 20', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e16e979983cdce59e5' },
      { id: 'boruto-21', title: 'Boruto Episode 21', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e66e979983cdce59e7' },
      { id: 'boruto-22', title: 'Boruto Episode 22', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2e66e979983cdce59e8' },
      { id: 'boruto-23', title: 'Boruto Episode 23', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2eb6e979983cdce59e9' },
      { id: 'boruto-24', title: 'Boruto Episode 24', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2ec6e979983cdce59ea' },
      { id: 'boruto-25', title: 'Boruto Episode 25', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2ec6e979983cdce59eb' },
      { id: 'boruto-26', title: 'Boruto Episode 26', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2f26e979983cdce59ec' },
      { id: 'boruto-27', title: 'Boruto Episode 27', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3186e979983cdce59ed' },
      { id: 'boruto-28', title: 'Boruto Episode 28', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca31e6e979983cdce59ee' },
      { id: 'boruto-29', title: 'Boruto Episode 29', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca31e6e979983cdce59ef' },
      { id: 'boruto-30', title: 'Boruto Episode 30', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3246e979983cdce59f0' },
      { id: 'boruto-31', title: 'Boruto Episode 31', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3246e979983cdce59f1' },
      { id: 'boruto-32', title: 'Boruto Episode 32', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3256e979983cdce59f2' },
      { id: 'boruto-33', title: 'Boruto Episode 33', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3296e979983cdce59f3' },
      { id: 'boruto-34', title: 'Boruto Episode 34', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3296e979983cdce59f4' },
      { id: 'boruto-35', title: 'Boruto Episode 35', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3296e979983cdce59f5' },
      { id: 'boruto-36', title: 'Boruto Episode 36', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca32f6e979983cdce59f6' },
      { id: 'boruto-37', title: 'Boruto Episode 37', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca32f6e979983cdce59f7' },
      { id: 'boruto-38', title: 'Boruto Episode 38', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3546e979983cdce59f8' },
      { id: 'boruto-39', title: 'Boruto Episode 39', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca35a6e979983cdce59f9' },
      { id: 'boruto-40', title: 'Boruto Episode 40', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca35c6e979983cdce59fa' },
      { id: 'boruto-41', title: 'Boruto Episode 41', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca35f6e979983cdce59fb' },
      { id: 'boruto-42', title: 'Boruto Episode 42', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca35f6e979983cdce59fc' },
      { id: 'boruto-43', title: 'Boruto Episode 43', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3606e979983cdce59fd' },
      { id: 'boruto-44', title: 'Boruto Episode 44', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3606e979983cdce59fe' },
      { id: 'boruto-45', title: 'Boruto Episode 45', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3656e979983cdce59ff' },
      { id: 'boruto-46', title: 'Boruto Episode 46', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3906e979983cdce5a00' },
      { id: 'boruto-47', title: 'Boruto Episode 47', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3906e979983cdce5a01' },
      { id: 'boruto-48', title: 'Boruto Episode 48', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3906e979983cdce5a02' },
      { id: 'boruto-49', title: 'Boruto Episode 49', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3956e979983cdce5a03' },
      { id: 'boruto-50', title: 'Boruto Episode 50', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca39b6e979983cdce5a04' },
      { id: 'boruto-51', title: 'Boruto Episode 51', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca39b6e979983cdce5a05' },
      { id: 'boruto-52', title: 'Boruto Episode 52', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca39b6e979983cdce5a06' },
      { id: 'boruto-53', title: 'Boruto Episode 53', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3a06e979983cdce5a07' },
      { id: 'boruto-54', title: 'Boruto Episode 54', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3a06e979983cdce5a08' },
      { id: 'boruto-55', title: 'Boruto Episode 55', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3a06e979983cdce5a09' },
      { id: 'boruto-56', title: 'Boruto Episode 56', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3a56e979983cdce5a0a' },
      { id: 'boruto-57', title: 'Boruto Episode 57', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3cd6e979983cdce5a0b' },
      { id: 'boruto-58', title: 'Boruto Episode 58', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3cd6e979983cdce5a0c' },
      { id: 'boruto-59', title: 'Boruto Episode 59', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3cd6e979983cdce5a0d' },
      { id: 'boruto-60', title: 'Boruto Episode 60', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3d26e979983cdce5a0e' },
      { id: 'boruto-61', title: 'Boruto Episode 61', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3d76e979983cdce5a0f' },
      { id: 'boruto-62', title: 'Boruto Episode 62', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3d76e979983cdce5a10' },
      { id: 'boruto-63', title: 'Boruto Episode 63', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3d76e979983cdce5a11' },
      { id: 'boruto-64', title: 'Boruto Episode 64', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3dc6e979983cdce5a13' },
      { id: 'boruto-65', title: 'Boruto Episode 65', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca3dd6e979983cdce5a14' },
      { id: 'boruto-66', title: 'Boruto Episode 66', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a15' },
      { id: 'boruto-67', title: 'Boruto Episode 67', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a16' },
      { id: 'boruto-68', title: 'Boruto Episode 68', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a17' },
      { id: 'boruto-69', title: 'Boruto Episode 69', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a18' },
      { id: 'boruto-70', title: 'Boruto Episode 70', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a19' },
      { id: 'boruto-71', title: 'Boruto Episode 71', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6056e979983cdce5a1a' },
      { id: 'boruto-72', title: 'Boruto Episode 72', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca60d6e979983cdce5a1b' },
      { id: 'boruto-73', title: 'Boruto Episode 73', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca60d6e979983cdce5a1c' },
      { id: 'boruto-74', title: 'Boruto Episode 74', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca60d6e979983cdce5a1d' },
      { id: 'boruto-75', title: 'Boruto Episode 75', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca60d6e979983cdce5a1e' },
      { id: 'boruto-76', title: 'Boruto Episode 76', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6136e979983cdce5a1f' },
      { id: 'boruto-77', title: 'Boruto Episode 77', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6136e979983cdce5a20' },
      { id: 'boruto-78', title: 'Boruto Episode 78', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca6196e979983cdce5a21' },
      { id: 'boruto-79', title: 'Boruto Episode 79', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a3d' },
      { id: 'boruto-80', title: 'Boruto Episode 80', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a3c' },
      { id: 'boruto-81', title: 'Boruto Episode 81', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a39' },
      { id: 'boruto-82', title: 'Boruto Episode 82', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a3a' },
      { id: 'boruto-83', title: 'Boruto Episode 83', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a3b' },
      { id: 'boruto-84', title: 'Boruto Episode 84', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca77e6e979983cdce5a38' },
      { id: 'boruto-85', title: 'Boruto Episode 85', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7866e979983cdce5a40' },
      { id: 'boruto-86', title: 'Boruto Episode 86', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7866e979983cdce5a3f' },
      { id: 'boruto-87', title: 'Boruto Episode 87', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7866e979983cdce5a3e' },
      { id: 'boruto-88', title: 'Boruto Episode 88', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7866e979983cdce5a41' },
      { id: 'boruto-89', title: 'Boruto Episode 89', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca78c6e979983cdce5a42' },
      { id: 'boruto-90', title: 'Boruto Episode 90', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca78c6e979983cdce5a43' },
      { id: 'boruto-91', title: 'Boruto Episode 91', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7916e979983cdce5a45' },
      { id: 'boruto-92', title: 'Boruto Episode 92', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7916e979983cdce5a44' },
      { id: 'boruto-93', title: 'Boruto Episode 93', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7916e979983cdce5a46' },
      { id: 'boruto-94', title: 'Boruto Episode 94', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7bd6e979983cdce5a47' },
      { id: 'boruto-95', title: 'Boruto Episode 95', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7bd6e979983cdce5a48' },
      { id: 'boruto-96', title: 'Boruto Episode 96', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7bd6e979983cdce5a49' },
      { id: 'boruto-97', title: 'Boruto Episode 97', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7c26e979983cdce5a4a' },
      { id: 'boruto-98', title: 'Boruto Episode 98', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7c26e979983cdce5a4c' },
      { id: 'boruto-99', title: 'Boruto Episode 99', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca7c26e979983cdce5a4b' },
      { id: 'boruto-100', title: 'Boruto Episode 100', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1706e979983cdce59a6' },
      { id: 'boruto-101', title: 'Boruto Episode 101', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1706e979983cdce59a5' },
      { id: 'boruto-102', title: 'Boruto Episode 102', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1706e979983cdce59a3' },
      { id: 'boruto-103', title: 'Boruto Episode 103', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1706e979983cdce59a4' },
      { id: 'boruto-104', title: 'Boruto Episode 104', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1706e979983cdce59a2' },
      { id: 'boruto-105', title: 'Boruto Episode 105', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1706e979983cdce59a7' },
      { id: 'boruto-106', title: 'Boruto Episode 106', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1786e979983cdce59a8' },
      { id: 'boruto-107', title: 'Boruto Episode 107', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1786e979983cdce59a9' },
      { id: 'boruto-108', title: 'Boruto Episode 108', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1786e979983cdce59aa' },
      { id: 'boruto-109', title: 'Boruto Episode 109', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1786e979983cdce59ab' },
      { id: 'boruto-110', title: 'Boruto Episode 110', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca17e6e979983cdce59ac' },
      { id: 'boruto-111', title: 'Boruto Episode 111', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca17e6e979983cdce59ad' },
      { id: 'boruto-112', title: 'Boruto Episode 112', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1836e979983cdce59ae' },
      { id: 'boruto-113', title: 'Boruto Episode 113', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1836e979983cdce59af' },
      { id: 'boruto-114', title: 'Boruto Episode 114', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1836e979983cdce59b0' },
      { id: 'boruto-115', title: 'Boruto Episode 115', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1836e979983cdce59b1' },
      { id: 'boruto-116', title: 'Boruto Episode 116', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1af6e979983cdce59b2' },
      { id: 'boruto-117', title: 'Boruto Episode 117', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1af6e979983cdce59b3' },
      { id: 'boruto-118', title: 'Boruto Episode 118', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1b46e979983cdce59b4' },
      { id: 'boruto-119', title: 'Boruto Episode 119', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1b46e979983cdce59b5' },
      { id: 'boruto-120', title: 'Boruto Episode 120', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1ba6e979983cdce59b6' },
      { id: 'boruto-121', title: 'Boruto Episode 121', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1ba6e979983cdce59b7' },
      { id: 'boruto-122', title: 'Boruto Episode 122', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1ba6e979983cdce59b8' },
      { id: 'boruto-123', title: 'Boruto Episode 123', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1bf6e979983cdce59b9' },
      { id: 'boruto-124', title: 'Boruto Episode 124', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1bf6e979983cdce59ba' },
      { id: 'boruto-125', title: 'Boruto Episode 125', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1eb6e979983cdce59bb' },
      { id: 'boruto-126', title: 'Boruto Episode 126', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1eb6e979983cdce59bc' },
      { id: 'boruto-127', title: 'Boruto Episode 127', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1ec6e979983cdce59bd' },
      { id: 'boruto-128', title: 'Boruto Episode 128', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1f06e979983cdce59be' },
      { id: 'boruto-129', title: 'Boruto Episode 129', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1f06e979983cdce59bf' },
      { id: 'boruto-130', title: 'Boruto Episode 130', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1f06e979983cdce59c0' },
      { id: 'boruto-131', title: 'Boruto Episode 131', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1f66e979983cdce59c1' },
      { id: 'boruto-132', title: 'Boruto Episode 132', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1f66e979983cdce59c2' },
      { id: 'boruto-133', title: 'Boruto Episode 133', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1fa6e979983cdce59c3' },
      { id: 'boruto-134', title: 'Boruto Episode 134', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca1fb6e979983cdce59c4' },
      { id: 'boruto-135', title: 'Boruto Episode 135', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2276e979983cdce59c5' },
      { id: 'boruto-136', title: 'Boruto Episode 136', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2276e979983cdce59c6' },
      { id: 'boruto-137', title: 'Boruto Episode 137', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca22d6e979983cdce59c7' },
      { id: 'boruto-138', title: 'Boruto Episode 138', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca22d6e979983cdce59c8' },
      { id: 'boruto-139', title: 'Boruto Episode 139', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca22d6e979983cdce59c9' },
      { id: 'boruto-140', title: 'Boruto Episode 140', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2336e979983cdce59ca' },
      { id: 'boruto-141', title: 'Boruto Episode 141', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2336e979983cdce59cb' },
      { id: 'boruto-142', title: 'Boruto Episode 142', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2386e979983cdce59cc' },
      { id: 'boruto-143', title: 'Boruto Episode 143', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2386e979983cdce59cd' },
      { id: 'boruto-144', title: 'Boruto Episode 144', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2396e979983cdce59ce' },
      { id: 'boruto-145', title: 'Boruto Episode 145', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2636e979983cdce59cf' },
      { id: 'boruto-146', title: 'Boruto Episode 146', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2636e979983cdce59d0' },
      { id: 'boruto-147', title: 'Boruto Episode 147', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca2686e979983cdce59d1' }
    ]
  },
  {
    id: 'jujutsu-kaisen',
    name: 'JuJutsu Kaisen (Series)',
    type: 'series',
    poster: 'https://i.postimg.cc/nz2d2zvt/Jujutsu-Kaisen-DP.jpg',
    description: 'Katalog siri Jujutsu Kaisen lengkap dengan semua episod.',
    episodes: [
      { id: 'jjk-1', title: 'Jujutsu Kaisen Episode 1', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a4d' },
      { id: 'jjk-2', title: 'Jujutsu Kaisen Episode 2', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a4e' },
      { id: 'jjk-3', title: 'Jujutsu Kaisen Episode 3', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a4f' },
      { id: 'jjk-4', title: 'Jujutsu Kaisen Episode 4', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a50' },
      { id: 'jjk-5', title: 'Jujutsu Kaisen Episode 5', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a51' },
      { id: 'jjk-6', title: 'Jujutsu Kaisen Episode 6', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8136e979983cdce5a52' },
      { id: 'jjk-7', title: 'Jujutsu Kaisen Episode 7', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca81b6e979983cdce5a53' },
      { id: 'jjk-8', title: 'Jujutsu Kaisen Episode 8', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca81d6e979983cdce5a54' },
      { id: 'jjk-9', title: 'Jujutsu Kaisen Episode 9', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca81d6e979983cdce5a55' },
      { id: 'jjk-10', title: 'Jujutsu Kaisen Episode 10', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca81d6e979983cdce5a56' },
      { id: 'jjk-11', title: 'Jujutsu Kaisen Episode 11', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8206e979983cdce5a57' },
      { id: 'jjk-12', title: 'Jujutsu Kaisen Episode 12', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8206e979983cdce5a58' },
      { id: 'jjk-13', title: 'Jujutsu Kaisen Episode 13', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8256e979983cdce5a59' },
      { id: 'jjk-14', title: 'Jujutsu Kaisen Episode 14', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8256e979983cdce5a5a' },
      { id: 'jjk-15', title: 'Jujutsu Kaisen Episode 15', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca83a6e979983cdce5a5b' },
      { id: 'jjk-16', title: 'Jujutsu Kaisen Episode 16', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca83b6e979983cdce5a5c' },
      { id: 'jjk-17', title: 'Jujutsu Kaisen Episode 17', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca83b6e979983cdce5a5d' },
      { id: 'jjk-18', title: 'Jujutsu Kaisen Episode 18', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca83b6e979983cdce5a5e' },
      { id: 'jjk-19', title: 'Jujutsu Kaisen Episode 19', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8406e979983cdce5a5f' },
      { id: 'jjk-20', title: 'Jujutsu Kaisen Episode 20', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8406e979983cdce5a60' },
      { id: 'jjk-21', title: 'Jujutsu Kaisen Episode 21', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8406e979983cdce5a61' },
      { id: 'jjk-22', title: 'Jujutsu Kaisen Episode 22', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8466e979983cdce5a62' },
      { id: 'jjk-23', title: 'Jujutsu Kaisen Episode 23', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8466e979983cdce5a63' },
      { id: 'jjk-24', title: 'Jujutsu Kaisen Episode 24', url: 'https://filestreambot-production-bef2.up.railway.app:8080/dl/6acca8466e979983cdce5a64' }
    ]
  },
  {
    id: 'naruto',
    name: 'Naruto (Series)',
    type: 'series',
    poster: 'https://i.postimg.cc/Qtm6mtph/Naruto-DP.jpg',
    description: 'Katalog siri Naruto lengkap dengan tajuk dan episod.',
    episodes: [
      { id: 'naruto-1', title: 'Episod 1: Masuk! Uzumaki Naruto!', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55c8' },
      { id: 'naruto-2', title: 'Episod 2: Nama Saya Konohamaru!', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55c9' },
      { id: 'naruto-3', title: 'Episod 3: Musuh Ketat! Sasuke dan Sakura', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ca' },
      { id: 'naruto-4', title: 'Episod 4: Lulus atau Gagal! Ujian Survival', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55cb' },
      { id: 'naruto-5', title: 'Episod 5: Gagal? Keputusan Akhir Kakashi', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55cc' },
      { id: 'naruto-6', title: 'Episod 6: Misi Berbahaya! Perjalanan ke Negeri Ombak', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55cd' },
      { id: 'naruto-7', title: 'Episod 7: Pembunuh Bayaran Pakar!', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ce' },
      { id: 'naruto-8', title: 'Episod 8: Sumpahan Kesatriaan', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55cf' },
      { id: 'naruto-9', title: 'Episod 9: Kakashi: Pahlawan Bermata Sharingan', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d0' },
      { id: 'naruto-10', title: 'Episod 10: Hutan Chakra', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d1' },
      { id: 'naruto-11', title: 'Episod 11: Negeri Tempat Munculnya Wira', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d2' },
      { id: 'naruto-12', title: 'Episod 12: Pertempuran di Jambatan! Zabuza Kembali!', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d3' },
      { id: 'naruto-13', title: 'Episod 13: Seni Rahsia Haku: Cermin Kristal Ais Demonic', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d4' },
      { id: 'naruto-14', title: 'Episod 14: Naruto Nombor Satu Masuk Medan', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d5' },
      { id: 'naruto-15', title: 'Episod 15: Pertempuran Tanpa Penglihatan: Sharingan Musnah', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d6' },
      { id: 'naruto-16', title: 'Episod 16: Musnahnya Kunci Yang Dimeteraikan', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d7' },
      { id: 'naruto-17', title: 'Episod 17: Masa Lalu Putih: Salji Tersembunyi', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d8' },
      { id: 'naruto-18', title: 'Episod 18: Senjata Bernama Shinobi', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55d9' },
      { id: 'naruto-19', title: 'Episod 19: Zabuza Salji Darah', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55da' },
      { id: 'naruto-20', title: 'Episod 20: Bermulanya Musim Baru: Ujian Chunin!', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55db' },
      { id: 'naruto-21', title: 'Episod 21: Kenalkan Mereka! Pesaing Baru Yang Hebat', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55dc' },
      { id: 'naruto-22', title: 'Episod 22: Cabaran Baru: 100 Calon Chunin', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55dd' },
      { id: 'naruto-23', title: 'Episod 23: Pertarungan Pertama: Temui Pasukan 9', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55de' },
      { id: 'naruto-24', title: 'Episod 24: Kelayakan Ujian Pertama: Ujian Bertulis', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55df' },
      { id: 'naruto-25', title: 'Episod 25: Soalan Kesepuluh: Pertaruhan Nyawa', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e0' },
      { id: 'naruto-26', title: 'Episod 26: Laporan Khas: Masuk Ke Hutan Kematian', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e1' },
      { id: 'naruto-27', title: 'Episod 27: Ujian Kedua Bermula: Semua Musuh Adalah Sasaran', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e2' },
      { id: 'naruto-28', title: 'Episod 28: Jangan Mengalah! Temui Naruto', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e3' },
      { id: 'naruto-29', title: 'Episod 29: Naruto Bangkit! Kuasa Sembilan Ekor', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e4' },
      { id: 'naruto-30', title: 'Episod 30: Cinta Sakura: Keputusan Berani', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e5' },
      { id: 'naruto-31', title: 'Episod 31: Shoryu Tensei: Cinta dan Keberanian Lee', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e6' },
      { id: 'naruto-32', title: 'Episod 32: Bunga Sakura Mekar: Kebenaran Terbongkar', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e7' },
      { id: 'naruto-33', title: 'Episod 33: Formasi Terkuat: Pasukan Ino-Shika-Cho!', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e8' },
      { id: 'naruto-34', title: 'Episod 34: Akatsuki Menyerang: Gaara Menunjuk Belang', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55e9' },
      { id: 'naruto-35', title: 'Episod 35: Gulungan Rahsia: Siapa Yang Dapat Dulu?', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ea' },
      { id: 'naruto-36', title: 'Episod 36: Pertembungan Pasangan: Klon Melawan Klon', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55eb' },
      { id: 'naruto-37', title: 'Episod 37: Amaran Kedua: Hayate Ditemui Mati', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ec' },
      { id: 'naruto-38', title: 'Episod 38: Pusingan Kelayakan Ketiga Bermula', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ed' },
      { id: 'naruto-39', title: 'Episod 39: Kuasa Kipas Temari vs Tenten', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ee' },
      { id: 'naruto-40', title: 'Episod 40: Pertarungan Sengit Shikamaru', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ef' },
      { id: 'naruto-41', title: 'Episod 41: Kiba vs Naruto: Pertarungan Anjing Liar', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f0' },
      { id: 'naruto-42', title: 'Episod 42: Taktik Bijak Naruto: Pertarungan Tipu Daya', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f1' },
      { id: 'naruto-43', title: 'Episod 43: Hinata Menentang Neji: Tradisi Keluarga Hyuga', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f2' },
      { id: 'naruto-44', title: 'Episod 44: Tekad Merah Hinata', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f3' },
      { id: 'naruto-45', title: 'Episod 45: Perlawanan Seterusnya: Lee Melawan Gaara', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f4' },
      { id: 'naruto-46', title: 'Episod 46: Pukulan Maut! Rahsia Teknik Pintu Terbuka', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f5' },
      { id: 'naruto-47', title: 'Episod 47: Pertembungan Hebat: Usaha Melawan Takdir', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f6' },
      { id: 'naruto-48', title: 'Episod 48: Kehebatan Tersembunyi Sasuke', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f7' },
      { id: 'naruto-49', title: 'Episod 49: Chidori vs Pasir Gaara', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f8' },
      { id: 'naruto-50', title: 'Episod 50: Kisah Disebalik Garisan Takdir', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55f9' },
      { id: 'naruto-51', title: 'Episod 51: Pertemuan Semula Dengan Jiraiya', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55fa' },
      { id: 'naruto-52', title: 'Episod 52: Latihan Rasengan Bersama Pertapa Genit', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55fb' },
      { id: 'naruto-53', title: 'Episod 53: Pusingan Akhir Ujian Chunin Bermula', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55fc' },
      { id: 'naruto-54', title: 'Episod 54: Permulaan Perlawanan Akhir Sasuke', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55fd' },
      { id: 'naruto-55', title: 'Episod 55: Munculnya Juruhebah Berita Konoha', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55fe' },
      { id: 'naruto-56', title: 'Episod 56: Pertarungan Penuh Kejutan: Shikamaru Menyerah?', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce55ff' },
      { id: 'naruto-57', title: 'Episod 57: Keputusan Pusingan Penyingkiran Ketiga', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5600' },
      { id: 'naruto-58', title: 'Episod 58: Serangan Musuh Di Kampung Daun', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5601' },
      { id: 'naruto-59', title: 'Episod 59: Pertempuran Kemuncak: Hokage Ketiga', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5602' },
      { id: 'naruto-60', title: 'Episod 60: Pertarungan Dua Legenda: Warisan Hokage', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5603' },
      { id: 'naruto-61', title: 'Episod 61: Keputusan Pertempuran Terakhir', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5604' },
      { id: 'naruto-62', title: 'Episod 62: Kebangkitan Kuasa Sepuluh Jari', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5605' },
      { id: 'naruto-63', title: 'Episod 63: Penamat Yang Menyayat Hati', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5606' },
      { id: 'naruto-64', title: 'Episod 64: Awan Merah Menghampiri Konoha', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5607' },
      { id: 'naruto-65', title: 'Episod 65: Itachi Uchiha Kembali!', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5608' },
      { id: 'naruto-66', title: 'Episod 66: Pertembungan Mata Sharingan Di Kedai Kopi', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5609' },
      { id: 'naruto-67', title: 'Episod 67: Misi Mencari Tsunade Bermula', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce560a' },
      { id: 'naruto-68', title: 'Episod 68: Perjalanan Bersama Ahli Perubatan Legendaris', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce560b' },
      { id: 'naruto-69', title: 'Episod 69: Pertembungan Tiga Sannin Hebat', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce560c' },
      { id: 'naruto-70', title: 'Episod 70: Rasengan Sempurna Naruto', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce560d' },
      { id: 'naruto-71', title: 'Episod 71: Pertarungan Panggil Binata Besar', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce560e' },
      { id: 'naruto-72', title: 'Episod 72: Kembalinya Hokage Kelima', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce560f' },
      { id: 'naruto-73', title: 'Episod 73: Pertarungan Sasuke Melawan Itachi', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5610' },
      { id: 'naruto-74', title: 'Episod 74: Keputusan Ke-100: Beban Nama Baik Klan Uchiha', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5611' },
      { id: 'naruto-75', title: 'Episod 75: Impian Sasuke Yang Hilang', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5612' },
      { id: 'naruto-76', title: 'Episod 76: Misi Menjejaki Sasuke Bermula', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5613' },
      { id: 'naruto-77', title: 'Episod 77: Pembentukan Pasukan Penyelamat Sasuke', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5614' },
      { id: 'naruto-78', title: 'Episod 78: Pertempuran Bermula: Penyelamat Melawan Empat Orang Bunian', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5615' },
      { id: 'naruto-79', title: 'Episod 79: Kehebatan Pasukan Khas Lembah Akhir', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5616' },
      { id: 'naruto-80', title: 'Episod 80: Pertarungan Choji: Pengorbanan Sahabat Sejati', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5617' },
      { id: 'naruto-81', title: 'Episod 81: Neji Terperangkap Dalam Perangkap Maut', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5618' },
      { id: 'naruto-82', title: 'Episod 82: Bantuan Tiba: Sekutu Dari Pasukan Pasir', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5619' },
      { id: 'naruto-83', title: 'Episod 83: Pertarungan Puncak Lembah Akhir', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce561a' },
      { id: 'naruto-84', title: 'Episod 84: Rasengan Bertemu Chidori!', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce561b' },
      { id: 'naruto-85', title: 'Episod 85: Janji Yang Tidak Tertunai', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce561c' },
      { id: 'naruto-86', title: 'Episod 86: Kepulangan Yang Menyayat Hati', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce561d' },
      { id: 'naruto-87', title: 'Episod 87: Misi Baru Di Bawah Pimpinan Hokage Kelima', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce561e' },
      { id: 'naruto-88', title: 'Episod 88: Muslihat Di Sebalik Kelihatan', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce561f' },
      { id: 'naruto-89', title: 'Episod 89: Misteri Harta Karun Negeri Laut', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5620' },
      { id: 'naruto-90', title: 'Episod 90: Penjaga Hati Dan Semangat Ninja', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5621' },
      { id: 'naruto-91', title: 'Episod 91: Munculnya Juruhebah Rahsia', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5622' },
      { id: 'naruto-92', title: 'Episod 92: Pengembaraan Bersama Jiraiya Bermula', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5623' },
      { id: 'naruto-93', title: 'Episod 93: Latihan Khas Rasengan Jarak Jauh', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5624' },
      { id: 'naruto-94', title: 'Episod 94: Kehebatan Benteng Pertahanan Mutlak', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5625' },
      { id: 'naruto-95', title: 'Episod 95: Pertarungan Menentang Klan Fuma', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5626' },
      { id: 'naruto-96', title: 'Episod 96: Kesilapan Masa Lalu Yang Menghantui', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5627' },
      { id: 'naruto-97', title: 'Episod 97: Cabaran Kumpulan Siasatan Khas', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5628' },
      { id: 'naruto-98', title: 'Episod 98: Tugas Paling Sukar Hokage Kelima', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5629' },
      { id: 'naruto-99', title: 'Episod 99: Sumpahan Raksasaki: Air Terjun Darah', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce562a' },
      { id: 'naruto-100', title: 'Episod 100: Impian Seorang Ninja Sejati', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce562b' },
      { id: 'naruto-101', title: 'Episod 101: Wajah Sebenar Kakashi Sensei Terbongkar!', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce562c' },
      { id: 'naruto-102', title: 'Episod 102: Misi Menyelamatkan Negeri Teh', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce562d' },
      { id: 'naruto-103', title: 'Episod 103: Perlumbaan Kapal Di Lautan Lepas', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce562e' },
      { id: 'naruto-104', title: 'Episod 104: Aksi Berani Di Lautan Bergelora', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce562f' },
      { id: 'naruto-105', title: 'Episod 105: Pertembungan Akhir Lumba Kapal', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5630' },
      { id: 'naruto-106', title: 'Episod 106: Pertarungan Sengit Di Pelabuhan', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5631' },
      { id: 'naruto-107', title: 'Episod 107: Pilihan Sukar Sasuke Uchiha', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5632' },
      { id: 'naruto-108', title: 'Episod 108: Pintu Gerbang Kegelapan Dibuka', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5633' },
      { id: 'naruto-109', title: 'Episod 109: Bunyi Bunyian Angin Malam', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5634' },
      { id: 'naruto-110', title: 'Episod 110: Pasukan Pemburu Beraksi', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5635' },
      { id: 'naruto-111', title: 'Episod 111: Pertempuran Antara Bunian Dan Ninja', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5636' },
      { id: 'naruto-112', title: 'Episod 112: Kegagalan Misi Mengukir Luka', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5637' },
      { id: 'naruto-113', title: 'Episod 113: Kekuatan Penuh Pasukan Bantuan Konoha', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5638' },
      { id: 'naruto-114', title: 'Episod 114: Pertarungan Kiba Melawan Sakon', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce5639' },
      { id: 'naruto-115', title: 'Episod 115: Strategi Hebat Shikamaru Diuji', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce563a' },
      { id: 'naruto-116', title: 'Episod 116: Bantuan Dari Negeri Pasir Muncul', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc02a16e979983cdce563b' },
      { id: 'naruto-117', title: 'Episod 117: Pertarungan Kimimaro: Tulang Maut', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7e9b6e979983cdce56d0' },
      { id: 'naruto-118', title: 'Episod 118: Pertolongan Di Saat Akhir', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7e9b6e979983cdce56d1' },
      { id: 'naruto-119', title: 'Episod 119: Kesilapan Strategi Pertarungan Terakhir', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7e9b6e979983cdce56d2' },
      { id: 'naruto-120', title: 'Episod 120: Pertarungan Hidup Mati Rock Lee', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7e9b6e979983cdce56cd' },
      { id: 'naruto-121', title: 'Episod 121: Kehebatan Teknik Mabuk Drunken Fist', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7e9b6e979983cdce56ce' },
      { id: 'naruto-122', title: 'Episod 122: Kuasa Tersembunyi Gaara Diuji', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7e9b6e979983cdce56cf' },
      { id: 'naruto-123', title: 'Episod 123: Pertembungan Dua Sahabat Karib', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7ea36e979983cdce56d3' },
      { id: 'naruto-124', title: 'Episod 124: Pilihan Antara Cahaya Dan Kegelapan', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7ea36e979983cdce56d4' },
      { id: 'naruto-125', title: 'Episod 125: Kawan Sejati Sepanjang Zaman', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7ea36e979983cdce56d5' },
      { id: 'naruto-126', title: 'Episod 126: Pertembungan Puncak Di Lembah Kematian', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7ea36e979983cdce56d6' },
      { id: 'naruto-127', title: 'Episod 127: Keputusan Di Hujung Takdir', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7ea96e979983cdce56d7' },
      { id: 'naruto-128', title: 'Episod 128: Gema Penyesalan Yang Mendalam', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7ea96e979983cdce56d8' },
      { id: 'naruto-129', title: 'Episod 129: Ikatan Persahabatan Yang Berdarah', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7eae6e979983cdce56d9' },
      { id: 'naruto-130', title: 'Episod 130: Pertarungan Mata Sharingan Ketiga', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7eae6e979983cdce56da' },
      { id: 'naruto-131', title: 'Episod 131: Air Mata Di Hujung Ikatan', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7eae6e979983cdce56db' },
      { id: 'naruto-132', title: 'Episod 132: Rahsia Gelap Di Sebalik Garisan Takdir', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7eda6e979983cdce56dc' },
      { id: 'naruto-133', title: 'Episod 133: Jeritan Hati Seorang Sahabat', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7edf6e979983cdce56dd' },
      { id: 'naruto-134', title: 'Episod 134: Akhir Sebuah Pengembaraan Di Lembah', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7edf6e979983cdce56de' },
      { id: 'naruto-135', title: 'Episod 135: Janji Yang Belum Tertunai', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7ee06e979983cdce56df' },
      { id: 'naruto-136', title: 'Episod 136: Misi Menembus Benteng Musuh', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7ee06e979983cdce56e0' },
      { id: 'naruto-137', title: 'Episod 137: Perangkap Misteri Di Markas Musuh', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7ee06e979983cdce56e1' },
      { id: 'naruto-138', title: 'Episod 138: Pengkhianatan Di Tengah Kegelapan', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7ee56e979983cdce56e2' },
      { id: 'naruto-139', title: 'Episod 139: Pertarungan Sengit Di Markas Orochimaru', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7eea6e979983cdce56e3' },
      { id: 'naruto-140', title: 'Episod 140: Skim Pemusnahan Penjara Suci', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7eea6e979983cdce56e4' },
      { id: 'naruto-141', title: 'Episod 141: Keyakinan Diri Yang Teruji', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f166e979983cdce56e5' },
      { id: 'naruto-142', title: 'Episod 142: Pertarungan Penjara Berapi', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f166e979983cdce56e6' },
      { id: 'naruto-143', title: 'Episod 143: Cabaran Misi Menyelamatkan Harta', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f166e979983cdce56e7' },
      { id: 'naruto-144', title: 'Episod 144: Kebangkitan Semangat Pasukan Ketiga', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f1c6e979983cdce56e8' },
      { id: 'naruto-145', title: 'Episod 145: Formasi Baharu Diuji', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f1c6e979983cdce56e9' },
      { id: 'naruto-146', title: 'Episod 146: Munculnya Musuh Berwajah Seribu', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f1c6e979983cdce56ea' },
      { id: 'naruto-147', title: 'Episod 147: Pertarungan Di Pinggir Hutan Larangan', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f226e979983cdce56eb' },
      { id: 'naruto-148', title: 'Episod 148: Misi Mencari Biksu Misterius', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f226e979983cdce56ec' },
      { id: 'naruto-149', title: 'Episod 149: Misteri Di Sebalik Kuasa Bayangan', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f286e979983cdce56ed' },
      { id: 'naruto-150', title: 'Episod 150: Pertarungan Menentang Klan Mizuki', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f286e979983cdce56ee' },
      { id: 'naruto-151', title: 'Episod 151: Keputusan Di Markas Mizuki', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f526e979983cdce56ef' },
      { id: 'naruto-152', title: 'Episod 152: Penjejakan Biksu Yang Hilang', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f536e979983cdce56f0' },
      { id: 'naruto-153', title: 'Episod 153: Serangan Berani Di Kubu Musuh', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f536e979983cdce56f1' },
      { id: 'naruto-154', title: 'Episod 154: Muslihat Di Sebalik Kabus Tebal', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f596e979983cdce56f2' },
      { id: 'naruto-155', title: 'Episod 155: Perlumbaan Menentang Masa', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f596e979983cdce56f3' },
      { id: 'naruto-156', title: 'Episod 156: Misteri Di Padang Pasir Luas', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f5e6e979983cdce56f4' },
      { id: 'naruto-157', title: 'Episod 157: Pertarungan Di Kubu Misteri', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f5f6e979983cdce56f5' },
      { id: 'naruto-158', title: 'Episod 158: Keputusan Misi Menyelamat', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f5f6e979983cdce56f6' },
      { id: 'naruto-159', title: 'Episod 159: Misi Mengawal Kumpulan Penjenayah', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f646e979983cdce56f7' },
      { id: 'naruto-160', title: 'Episod 160: Pertarungan Di Kuil Kuno', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f646e979983cdce56f8' },
      { id: 'naruto-161', title: 'Episod 161: Munculnya Binatang Buas Legenda', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f646e979983cdce56f9' },
      { id: 'naruto-162', title: 'Episod 162: Kuasa Mistik Binatang Berekor Tiga', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f646e979983cdce56fa' },
      { id: 'naruto-163', title: 'Episod 163: Strategi Menumpaskan Raksasa Laut', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f936e979983cdce56fb' },
      { id: 'naruto-164', title: 'Episod 164: Pertarungan Di Permukaan Air', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f936e979983cdce56fc' },
      { id: 'naruto-165', title: 'Episod 165: Misteri Di Pulau Terpencil', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f946e979983cdce56fd' },
      { id: 'naruto-166', title: 'Episod 166: Penyelidikan Di Makam Kuno', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f986e979983cdce56fe' },
      { id: 'naruto-167', title: 'Episod 167: Perangkap Maut Di Dalam Tanah', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f996e979983cdce56ff' },
      { id: 'naruto-168', title: 'Episod 168: Latihan Istimewa Di Kampung Daun', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f9d6e979983cdce5700' },
      { id: 'naruto-169', title: 'Episod 169: Kenangan Bersama Pasukan Lama', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f9e6e979983cdce5701' },
      { id: 'naruto-170', title: 'Episod 170: Pertarungan Sengit Di Lorong Sunyi', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7f9e6e979983cdce5702' },
      { id: 'naruto-171', title: 'Episod 171: Misteri Jejak Kaki Di Salji', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7fa36e979983cdce5703' },
      { id: 'naruto-172', title: 'Episod 172: Pertarungan Di Puncak Gunung Ais', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7fa36e979983cdce5704' },
      { id: 'naruto-173', title: 'Episod 173: Misi Menyelamatkan Puteri Negeri', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7fcf6e979983cdce5705' },
      { id: 'naruto-174', title: 'Episod 174: Serangan Ghaib Di Istana Lama', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7fcf6e979983cdce5706' },
      { id: 'naruto-175', title: 'Episod 175: Seni Pertahanan Diri Yang Hilang', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7fcf6e979983cdce5707' },
      { id: 'naruto-176', title: 'Episod 176: Keputusan Di Dewan Perjuangan', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7fcf6e979983cdce5708' },
      { id: 'naruto-177', title: 'Episod 177: Misi Mengawal Pedang Legenda', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7fd56e979983cdce5709' },
      { id: 'naruto-178', title: 'Episod 178: Pertarungan Menentang Pencuri Pedang', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7fd56e979983cdce570a' },
      { id: 'naruto-179', title: 'Episod 179: Penjejakan Di Hutan Berkabus', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7fda6e979983cdce570b' },
      { id: 'naruto-180', title: 'Episod 180: Keputusan Di Markas Penjenayah', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7fdb6e979983cdce570c' },
      { id: 'naruto-181', title: 'Episod 181: Misi Rahsia Di Kampung Bintang', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc7fdb6e979983cdce570d' },
      { id: 'naruto-182', title: 'Episod 182: Misteri Di Sebalik Tabir Bintang', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc800c6e979983cdce570e' },
      { id: 'naruto-183', title: 'Episod 183: Kuasa Misteri Batu Meteorit', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc800d6e979983cdce570f' },
      { id: 'naruto-184', title: 'Episod 184: Pengorbanan Demi Kampung Bintang', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80116e979983cdce5710' },
      { id: 'naruto-185', title: 'Episod 185: Pertarungan Terakhir Di Lembah Meteor', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80116e979983cdce5711' },
      { id: 'naruto-186', title: 'Episod 186: Kenangan Zaman Kanak-Kanak Kiba', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80116e979983cdce5712' },
      { id: 'naruto-187', title: 'Episod 187: Misi Mengawal Lori Barang Misteri', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80116e979983cdce5713' },
      { id: 'naruto-188', title: 'Episod 188: Serangan Penyamun Di Jalan Raya', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80166e979983cdce5714' },
      { id: 'naruto-189', title: 'Episod 189: Wajah Disebalik Topeng Penyamun', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80176e979983cdce5715' },
      { id: 'naruto-190', title: 'Episod 190: Misteri Di Rumah Berhantu', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc801c6e979983cdce5716' },
      { id: 'naruto-191', title: 'Episod 191: Pertarungan Di Lorong Gelap', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc801c6e979983cdce5717' },
      { id: 'naruto-192', title: 'Episod 192: Kisah Latihan Genin Di Konoha', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80486e979983cdce5718' },
      { id: 'naruto-193', title: 'Episod 193: Cabaran Memasak Makanan Ninja', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80486e979983cdce5719' },
      { id: 'naruto-194', title: 'Episod 194: Misteri Pesanan Terakhir Pelanggan', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc804d6e979983cdce571a' },
      { id: 'naruto-195', title: 'Episod 195: Pertarungan Di Kubu Sepi', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc804d6e979983cdce571b' },
      { id: 'naruto-196', title: 'Episod 196: Pertembungan Pasukan Istimewa Anbu', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc804e6e979983cdce571c' },
      { id: 'naruto-197', title: 'Episod 197: Misi Mengawal Penjara Keselamatan Tinggi', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc804e6e979983cdce571d' },
      { id: 'naruto-198', title: 'Episod 198: Pemberontakan Di Dalam Penjara', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80536e979983cdce571e' },
      { id: 'naruto-199', title: 'Episod 199: Keputusan Di Pintu Gerbang Penjara', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80536e979983cdce571f' },
      { id: 'naruto-200', title: 'Episod 200: Perlawanan Penuh Ketawa Di Konoha', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80586e979983cdce5720' },
      { id: 'naruto-201', title: 'Episod 201: Misi Menyelamatkan Pelajar Akademi', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80586e979983cdce5721' },
      { id: 'naruto-202', title: 'Episod 202: Pertarungan Di Hutan Pengganti', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80586e979983cdce5722' },
      { id: 'naruto-203', title: 'Episod 203: Keputusan Misi Menyelamat Pelajar', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80846e979983cdce5723' },
      { id: 'naruto-204', title: 'Episod 204: Misteri KLAN Kurama Yang Hilang', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80846e979983cdce5724' },
      { id: 'naruto-205', title: 'Episod 205: Ilusi Maut Di Rumah Keluarga Kurama', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80896e979983cdce5725' },
      { id: 'naruto-206', title: 'Episod 206: Penyelamatan Di Alam Ilusi', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80896e979983cdce5726' },
      { id: 'naruto-207', title: 'Episod 207: Pertarungan Menentang Bayangan Diri', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc808a6e979983cdce5727' },
      { id: 'naruto-208', title: 'Episod 208: Keputusan Di Alam Ilusi Sempurna', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc808f6e979983cdce5728' },
      { id: 'naruto-209', title: 'Episod 209: Misi Mengawal Bekalan Istimewa', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc808f6e979983cdce5729' },
      { id: 'naruto-210', title: 'Episod 210: Tipu Daya Di Padang Pasir Luas', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80946e979983cdce572a' },
      { id: 'naruto-211', title: 'Episod 211: Pertarungan Menentang Pahlawan Bayangan', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80946e979983cdce572b' },
      { id: 'naruto-212', title: 'Episod 212: Keputusan Pertarungan Di Padang Pasir', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80946e979983cdce572c' },
      { id: 'naruto-213', title: 'Episod 213: Misteri Kenangan Yang Hilang', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80c66e979983cdce572d' },
      { id: 'naruto-214', title: 'Episod 214: Penjejakan Di Kampung Asal', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80c66e979983cdce572e' },
      { id: 'naruto-215', title: 'Episod 215: Wajah Disebalik Ingatan Yang Pulih', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80c66e979983cdce572f' },
      { id: 'naruto-216', title: 'Episod 216: Pertarungan Menentang Pelajar Pelarian', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80c66e979983cdce5730' },
      { id: 'naruto-217', title: 'Episod 217: Keputusan Di Jambatan Takdir', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80c86e979983cdce5731' },
      { id: 'naruto-218', title: 'Episod 218: Misi Menyelamatkan Karyawan Pelarian', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80cb6e979983cdce5732' },
      { id: 'naruto-219', title: 'Episod 219: Pertarungan Di Kuil Penjagaan Purba', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80cc6e979983cdce5733' },
      { id: 'naruto-220', title: 'Episod 220: Perpisahan Dan Permulaan Baharu', url: 'https://filestreambot-production-bef2.up.railway.app/dl/6acc80d06e979983cdce5734' }
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

