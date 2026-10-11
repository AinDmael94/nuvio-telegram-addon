const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// ==========================================
// 1. MANIFEST ADDON (VERSION 3.1.0)
// ==========================================
const manifest = {
    id: "org.aindmael.hagemaru.addon",
    version: "3.1.0",
    name: "DaRyz Collection Addon",
    description: "Addon Stremio/Nuvio dengan katalog tersusun mengikut tajuk siri.",
    resources: ["catalog", "stream", "meta"],
    types: ["series"],
    catalogs: [
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
// 2. DATABASE SENARAI SIRI & EPISOD
// ==========================================

const seriesDatabase = {
    "hagemaru_catalog": {
        id: "hagemaru_series",
        catalogId: "hagemaru_catalog",
        name: "Hagemaru",
        poster: "https://i.postimg.cc/8zS8nQF8/Hagemaru.jpg",
        description: "Koleksi Episod Hagemaru Bahasa Melayu.",
        episodes: [
            { episode: 1, title: "Pasukan Bola Lisut Muda", url: "https://files.catbox.moe/05qmoa.mp4" }
        ]
    },
    "ninja_boy_catalog": {
        id: "ninja_boy_series",
        catalogId: "ninja_boy_catalog",
        name: "Ninja Boy",
        poster: "https://i.postimg.cc/NjchPqKZ/Ninja_Boy.jpg",
        description: "Koleksi Episod Ninja Boy Bahasa Melayu.",
        episodes: [
            "https://files.catbox.moe/eufzjd.mp4", "https://files.catbox.moe/gujt6g.mp4",
            "https://files.catbox.moe/tlvkbp.mp4", "https://files.catbox.moe/fzsduj.mp4",
            "https://files.catbox.moe/zmbbmq.mp4", "https://files.catbox.moe/o7bhaf.mp4",
            "https://files.catbox.moe/jmwdz9.mp4"
        ].map((url, idx) => ({ episode: idx + 1, title: `Episod ${idx + 1}`, url }))
    },
    "doraemon_catalog": {
        id: "doraemon_series",
        catalogId: "doraemon_catalog",
        name: "Doraemon",
        poster: "https://i.postimg.cc/XYbMDSrm/Doraemon.jpg",
        description: "Koleksi Episod Doraemon Bahasa Melayu.",
        episodes: [
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
        ].map((url, idx) => ({ episode: idx + 1, title: `Episod ${idx + 1}`, url }))
    },
    "pokemon_catalog": {
        id: "pokemon_journeys_series",
        catalogId: "pokemon_catalog",
        name: "Pokemon Journeys The Series",
        poster: "https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg",
        description: "Koleksi Episod Pokemon Journeys Bahasa Melayu.",
        episodes: [
            "https://files.catbox.moe/9l6811.mp4", "https://files.catbox.moe/f2adj4.mp4", "https://files.catbox.moe/bnoev9.mp4", "https://files.catbox.moe/64ntqo.mp4", "https://files.catbox.moe/83f07d.mp4",
            "https://files.catbox.moe/17e2tr.mp4", "https://files.catbox.moe/5y14uj.mp4", "https://files.catbox.moe/poz7od.mp4", "https://files.catbox.moe/y46f9t.mp4", "https://files.catbox.moe/grq2iu.mp4",
            "https://files.catbox.moe/k773ev.mp4", "https://files.catbox.moe/r5rda8.mp4", "https://files.catbox.moe/8idngm.mp4", "https://files.catbox.moe/8fz354.mp4", "https://files.catbox.moe/tzcx7q.mp4",
            "https://files.catbox.moe/o1beae.mp4", "https://files.catbox.moe/uyhug0.mp4", "https://files.catbox.moe/5f9hjn.mp4", "https://files.catbox.moe/ou8sgf.mp4", "https://files.catbox.moe/63xw8p.mp4",
            "https://files.catbox.moe/r69vzr.mp4", "https://files.catbox.moe/29y1ey.mp4", "https://files.catbox.moe/q258dj.mp4", "https://files.catbox.moe/7lyrdj.mp4", "https://files.catbox.moe/eiy4gx.mp4",
            "https://files.catbox.moe/utrujc.mp4", "https://files.catbox.moe/f40v16.mp4", "https://files.catbox.moe/9p1oo4.mp4", "https://files.catbox.moe/vw842q.mp4", "https://files.catbox.moe/43p2fg.mp4",
            "https://files.catbox.moe/odqedh.mp4", "https://files.catbox.moe/iaxi6v.mp4", "https://files.catbox.moe/k27hgg.mp4", "https://files.catbox.moe/umbpcj.mp4", "https://files.catbox.moe/6gn6ci.mp4",
            "https://files.catbox.moe/brro9o.mp4", "https://files.catbox.moe/0pn8a9.mp4", "https://files.catbox.moe/6qs7l7.mp4", "https://files.catbox.moe/iljl67.mp4", "https://files.catbox.moe/o1welq.mp4",
            "https://files.catbox.moe/1qf2bs.mp4", "https://files.catbox.moe/6432zl.mp4"
        ].map((url, idx) => ({ episode: idx + 1, title: `Episod ${idx + 1}`, url }))
    },
    "midori_days_catalog": {
        id: "midori_days_series",
        catalogId: "midori_days_catalog",
        name: "Midori Days",
        poster: "https://i.postimg.cc/P5zgg3D9/Midori-Days.jpg",
        description: "Koleksi Episod Midori Days Bahasa Melayu.",
        episodes: [
            "https://files.catbox.moe/17w3pa.mp4", "https://files.catbox.moe/k27qz0.mp4", "https://files.catbox.moe/17jqa4.mp4", "https://files.catbox.moe/yezp6w.mp4", "https://files.catbox.moe/a5bwab.mp4",
            "https://files.catbox.moe/l6no0r.mp4", "https://files.catbox.moe/lelg7u.mp4", "https://files.catbox.moe/au9rr9.mp4", "https://files.catbox.moe/kfta82.mp4", "https://files.catbox.moe/7iisgo.mp4",
            "https://files.catbox.moe/7c9042.mp4", "https://files.catbox.moe/o2mmz3.mp4", "https://files.catbox.moe/8wepsr.mp4"
        ].map((url, idx) => ({ episode: idx + 1, title: `Episod ${idx + 1}`, url }))
    },
    "anak_sidek_catalog": {
        id: "anak_anak_sidek_series",
        catalogId: "anak_sidek_catalog",
        name: "Anak-Anak Sidek",
        poster: "https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg",
        description: "Koleksi Episod Anak-Anak Sidek.",
        episodes: [
            "https://files.catbox.moe/0ts7am.mp4", "https://files.catbox.moe/lpswls.mp4", "https://files.catbox.moe/lbmnel.mp4", "https://files.catbox.moe/eligd9.mp4", "https://files.catbox.moe/khs41p.mp4",
            "https://files.catbox.moe/26c3re.mp4", "https://files.catbox.moe/b16149.mp4", "https://files.catbox.moe/mxe2nn.mp4", "https://files.catbox.moe/s1ayej.mp4", "https://files.catbox.moe/32z6i6.mp4",
            "https://files.catbox.moe/f8pnpd.mp4", "https://files.catbox.moe/86iy1e.mp4", "https://files.catbox.moe/ttqlp9.mp4", "https://files.catbox.moe/q9dr60.mp4", "https://files.catbox.moe/of0qnd.mp4",
            "https://files.catbox.moe/cedu56.mp4", "https://files.catbox.moe/xdskm8.mp4", "https://files.catbox.moe/9mzf1z.mp4", "https://files.catbox.moe/lsz3p9.mp4", "https://files.catbox.moe/3mxx6i.mp4",
            "https://files.catbox.moe/jkjj9o.mp4", "https://files.catbox.moe/wdgv93.mp4", "https://files.catbox.moe/qf2fvl.mp4", "https://files.catbox.moe/jvfta3.mp4", "https://files.catbox.moe/q40kmo.mp4",
            "https://files.catbox.moe/t6tkl7.mp4", "https://files.catbox.moe/7hj0pp.mp4", "https://files.catbox.moe/2cvkol.mp4", "https://files.catbox.moe/x6d6l2.mp4", "https://files.catbox.moe/em16n2.mp4",
            "https://files.catbox.moe/kfx8fa.mp4", "https://files.catbox.moe/psqwmg.mp4", "https://files.catbox.moe/qhhlph.mp4", "https://files.catbox.moe/4yre1a.mp4", "https://files.catbox.moe/xmphie.mp4",
            "https://files.catbox.moe/uwyuaa.mp4", "https://files.catbox.moe/xzp99z.mp4", "https://files.catbox.moe/gw2t8k.mp4", "https://files.catbox.moe/farxtu.mp4", "https://files.catbox.moe/ndsb34.mp4",
            "https://files.catbox.moe/8p480z.mp4", "https://files.catbox.moe/2by4hx.mp4", "https://files.catbox.moe/r1443c.mp4"
        ].map((url, idx) => ({ episode: idx + 1, title: `Episod ${idx + 1}`, url }))
    },
    "ueki_catalog": {
        id: "ueki_series",
        catalogId: "ueki_catalog",
        name: "The Law of Ueki",
        poster: "https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg",
        description: "Koleksi Episod The Law of Ueki Bahasa Melayu.",
        episodes: [
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
        ].map((url, idx) => ({ episode: idx + 1, title: `Episod ${idx + 1}`, url }))
    },
    "ginban_catalog": {
        id: "ginban_series",
        catalogId: "ginban_catalog",
        name: "Ginban Kaleidoscope",
        poster: "https://i.postimg.cc/x1ywwxmB/Ginban-Kaleidoscope.jpg",
        description: "Koleksi Episod Ginban Kaleidoscope Bahasa Melayu.",
        episodes: [
            "https://files.catbox.moe/5je70q.flv", "https://files.catbox.moe/l4dsxu.flv", "https://files.catbox.moe/0pffen.flv", "https://files.catbox.moe/v67xcz.mp4",
            "https://files.catbox.moe/dth1gm.mp4", "https://files.catbox.moe/tvcszy.mp4", "https://files.catbox.moe/pj6spq.mp4", "https://files.catbox.moe/tta199.mp4",
            "https://files.catbox.moe/dzl7mp.mp4", "https://files.catbox.moe/mzv0e3.mp4", "https://files.catbox.moe/8cxro0.mp4", "https://files.catbox.moe/c33xc2.mp4"
        ].map((url, idx) => ({ episode: idx + 1, title: `Episod ${idx + 1}`, url }))
    },
    "black_cat_catalog": {
        id: "black_cat_series",
        catalogId: "black_cat_catalog",
        name: "Black Cat",
        poster: "https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg",
        description: "Koleksi Episod Black Cat Bahasa Melayu.",
        episodes: [
            "https://files.catbox.moe/xt0a0n.mp4", "https://files.catbox.moe/k1wxy6.mp4", "https://files.catbox.moe/npays5.mp4", "https://files.catbox.moe/vr6t77.mp4", "https://files.catbox.moe/rtp95u.mp4",
            "https://files.catbox.moe/3u3jbh.mp4", "https://files.catbox.moe/6hf6fs.mp4", "https://files.catbox.moe/u9zsug.mp4", "https://files.catbox.moe/tza3td.mp4", "https://files.catbox.moe/s2z3iy.mp4",
            "https://files.catbox.moe/p0nv9h.mp4", "https://files.catbox.moe/3l5rnc.mp4", "https://files.catbox.moe/am14fw.mp4", "https://files.catbox.moe/ip19yx.mp4", "https://files.catbox.moe/ifwh66.mp4",
            "https://files.catbox.moe/jrf7j4.mp4", "https://files.catbox.moe/j5scn9.mp4", "https://files.catbox.moe/hjueai.mp4", "https://files.catbox.moe/3ds9an.mp4", "https://files.catbox.moe/o80p7r.mp4",
            "https://files.catbox.moe/6vtgbq.mp4", "https://files.catbox.moe/58zmb9.mp4", "https://files.catbox.moe/3zrbqp.mp4", "https://files.catbox.moe/jsah3e.mp4"
        ].map((url, idx) => ({ episode: idx + 1, title: `Episod ${idx + 1}`, url }))
    },
    "digimon_savers_catalog": {
        id: "digimon_savers_series",
        catalogId: "digimon_savers_catalog",
        name: "Digimon Savers",
        poster: "https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg",
        description: "Koleksi Episod Digimon Savers Bahasa Melayu.",
        episodes: [
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
        ].map((url, idx) => ({ episode: idx + 1, title: `Episod ${idx + 1}`, url }))
    },
    "digimon_01_catalog": {
        id: "digimon_01_series",
        catalogId: "digimon_01_catalog",
        name: "Digimon Adventure 01",
        poster: "https://i.postimg.cc/T368HMKn/Digimon-01.jpg",
        description: "Koleksi Episod Digimon Adventure 01 Bahasa Melayu.",
        episodes: [
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
        ].map((url, idx) => ({ episode: idx + 1, title: `Episod ${idx + 1}`, url }))
    },
    "shin_chan_catalog": {
        id: "shin_chan_series",
        catalogId: "shin_chan_catalog",
        name: "Crayon Shin Chan",
        poster: "https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg",
        description: "Koleksi Episod Crayon Shin Chan Bahasa Melayu.",
        episodes: [
            "https://files.catbox.moe/b9vevt.mp4", "https://files.catbox.moe/7rag9o.mp4", "https://files.catbox.moe/m0edfm.mp4", "https://files.catbox.moe/pynt42.mp4", "https://files.catbox.moe/7yvdbd.mp4",
            "https://files.catbox.moe/w8huc2.mkv", "https://files.catbox.moe/nejhuv.mp4", "https://files.catbox.moe/8ca3cr.mp4", "https://files.catbox.moe/02x60l.mkv", "https://files.catbox.moe/8ea559.mp4",
            "https://files.catbox.moe/9t4e7x.webm", "https://files.catbox.moe/kk607w.mkv", "https://files.catbox.moe/tjtmqn.mkv", "https://files.catbox.moe/wy4h99.mkv", "https://files.catbox.moe/wdv2kj.mp4",
            "https://files.catbox.moe/t116gx.mkv", "https://files.catbox.moe/f5vmu3.mkv", "https://files.catbox.moe/vq10zw.mkv", "https://files.catbox.moe/et4g5i.mkv", "https://files.catbox.moe/rtzjgh.mp4",
            "https://files.catbox.moe/c2zjxo.mkv", "https://files.catbox.moe/oqiy2x.mkv", "https://files.catbox.moe/4hawk0.webm", "https://files.catbox.moe/tvef9t.mp4", "https://files.catbox.moe/ikw3wi.mkv"
        ].map((url, idx) => ({ episode: idx + 1, title: `Episod ${idx + 1}`, url }))
    },
    "akhir_zaman_catalog": {
        id: "akhir_zaman_series",
        catalogId: "akhir_zaman_catalog",
        name: "Kisah Hidup Akhir Zaman",
        poster: "https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg",
        description: "Koleksi Episod Kisah Hidup Akhir Zaman.",
        episodes: [
            "https://files.catbox.moe/dmr7ys.mp4", "https://files.catbox.moe/c05jnq.mp4", "https://files.catbox.moe/sakwy1.mp4", "https://files.catbox.moe/8jcm2b.mp4", "https://files.catbox.moe/fcw4me.mp4",
            "https://files.catbox.moe/ve28k8.mp4", "https://files.catbox.moe/cml4j6.mp4", "https://files.catbox.moe/t9ta6d.mp4", "https://files.catbox.moe/991agh.mp4", "https://files.catbox.moe/grbp8x.mp4",
            "https://files.catbox.moe/38soe6.mp4", "https://files.catbox.moe/ler4ag.mp4", "https://files.catbox.moe/ec9jc1.mp4", "https://files.catbox.moe/e9ckzj.mp4", "https://files.catbox.moe/rwzqqg.mp4",
            "https://files.catbox.moe/lfr6y0.mp4", "https://files.catbox.moe/5lod2l.mp4", "https://files.catbox.moe/2u6jeq.mp4", "https://files.catbox.moe/y4dfdt.mp4", "https://files.catbox.moe/cupuua.mp4",
            "https://files.catbox.moe/xlfvy0.mp4", "https://files.catbox.moe/svf1ld.mp4", "https://files.catbox.moe/6dmnwt.mp4", "https://files.catbox.moe/xz9p55.mp4", "https://files.catbox.moe/1oeizf.mp4",
            "https://files.catbox.moe/1dpc4q.mp4", "https://files.catbox.moe/wkk250.mp4", "https://files.catbox.moe/ns7oqa.mp4", "https://files.catbox.moe/rikryy.mp4", "https://files.catbox.moe/v6lwxq.mp4",
            "https://files.catbox.moe/qoyb9l.mp4", "https://files.catbox.moe/fa0z2q.mp4", "https://files.catbox.moe/rb6n12.mp4", "https://files.catbox.moe/p5a2ds.mp4", "https://files.catbox.moe/n4ro3i.mp4",
            "https://files.catbox.moe/f926el.mp4", "https://files.catbox.moe/sa6gq8.mp4", "https://files.catbox.moe/55vgoa.mp4", "https://files.catbox.moe/edzksm.mp4", "https://files.catbox.moe/g6gx07.mp4",
            "https://files.catbox.moe/h3rt2t.mp4", "https://files.catbox.moe/7zgjio.mp4", "https://files.catbox.moe/nianl8.mp4", "https://files.catbox.moe/pk2ija.mp4", "https://files.catbox.moe/g6vzed.mp4",
            "https://files.catbox.moe/2xr42f.mp4", "https://files.catbox.moe/i636mu.mp4", "https://files.catbox.moe/2dh0kw.mp4", "https://files.catbox.moe/osqos3.mp4", "https://files.catbox.moe/clraet.mp4",
            "https://files.catbox.moe/02vue5.mp4", "https://files.catbox.moe/oih2ce.mp4", "https://files.catbox.moe/opbp3x.mp4", "https://files.catbox.moe/47lmkc.mp4", "https://files.catbox.moe/gh1des.mp4",
            "https://files.catbox.moe/ny4qqj.mp4", "https://files.catbox.moe/v3yvoh.mp4", "https://files.catbox.moe/2bmvek.mp4", "https://files.catbox.moe/rnkq3v.mp4", "https://files.catbox.moe/a6i9oa.mp4",
            "https://files.catbox.moe/wj13np.mp4", "https://files.catbox.moe/2uk8a3.mp4"
        ].map((url, idx) => ({ episode: idx + 1, title: `Episod ${idx + 1}`, url }))
    },
    "kd_malay_catalog": {
        id: "kd_malay_series",
        catalogId: "kd_malay_catalog",
        name: "Kids Delights (Malay Vers)",
        poster: "https://i.postimg.cc/FsKg8hfM/KD.jpg",
        description: "Koleksi Episod Kids Delights Bahasa Melayu.",
        episodes: [
            "https://files.catbox.moe/e1j98o.mp4", "https://files.catbox.moe/86iqng.mp4", "https://files.catbox.moe/2v49e1.mp4",
            "https://files.catbox.moe/nm6i4w.mp4", "https://files.catbox.moe/gkpikb.mp4", "https://files.catbox.moe/2bob72.mp4",
            "https://files.catbox.moe/rsobpn.mp4"
        ].map((url, idx) => ({ episode: idx + 1, title: `Episod ${idx + 1}`, url }))
    },
    "kd_eng_catalog": {
        id: "kd_eng_series",
        catalogId: "kd_eng_catalog",
        name: "Kids Delights (Eng Vers)",
        poster: "https://i.postimg.cc/FsKg8hfM/KD.jpg",
        description: "Koleksi Episod Kids Delights English Version.",
        episodes: [
            "https://files.catbox.moe/6uzimm.mp4", "https://files.catbox.moe/14zl0x.mp4", "https://files.catbox.moe/3u4p9f.mp4",
            "https://files.catbox.moe/a1qpn5.mp4", "https://files.catbox.moe/c23e8f.mp4", "https://files.catbox.moe/vmpp8r.mp4",
            "https://files.catbox.moe/izkdg9.mp4"
        ].map((url, idx) => ({ episode: idx + 1, title: `Episod ${idx + 1}`, url }))
    }
};

// ==========================================
// 3. ROUTING SERVER
// ==========================================
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.get('/stremio/:user/manifest.json', (req, res) => {
    res.json(manifest);
});

// Endpoint Catalog
app.get('/stremio/:user/catalog/:type/:id.json', (req, res) => {
    const catalogId = req.params.id;
    const series = seriesDatabase[catalogId];

    if (series) {
        res.json({
            metas: [{
                id: series.id,
                type: "series",
                name: series.name,
                poster: series.poster,
                description: series.description
            }]
        });
    } else {
        res.json({ metas: [] });
    }
});

// Endpoint Meta
app.get('/stremio/:user/meta/:type/:id.json', (req, res) => {
    const seriesId = req.params.id.split(':')[0];
    const series = Object.values(seriesDatabase).find(s => s.id === seriesId);

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

// Endpoint Stream
app.get('/stremio/:user/stream/:type/:id.json', (req, res) => {
    const parts = req.params.id.split(':');
    const seriesId = parts[0];
    const episodeNum = parseInt(parts[2], 10) || 1;

    const series = Object.values(seriesDatabase).find(s => s.id === seriesId);
    if (series) {
        const ep = series.episodes.find(e => e.episode === episodeNum);
        if (ep) {
            return res.json({
                streams: [
                    {
                        title: `Catbox Direct HD (${series.name} - E${ep.episode})`,
                        url: ep.url
                    }
                ]
            });
        }
    }
    res.json({ streams: [] });
});

app.get('/', (req, res) => {
    res.send("Nuvio / Stremio Addon Server is Running Live!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
