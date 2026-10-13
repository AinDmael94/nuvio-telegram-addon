const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// ==========================================
// DATA KATALOG & EPISOD
// ==========================================
const catalogData = [
  {
    id: 'crayon_shinchan',
    name: 'Crayon Shin Chan (Series)',
    type: 'series',
    poster: 'https://i.postimg.cc/xC5s5CL3/Crayon-Shin-Chan-DP.webp',
    background: 'https://i.postimg.cc/kGTdXWdR/Shin-Chan.jpg',
    description: 'Koleksi episod Crayon Shin Chan.',
    urls: [
      'https://files.catbox.moe/b9vevt.mp4',
      'https://files.catbox.moe/7rag9o.mp4',
      'https://files.catbox.moe/m0edfm.mp4',
      'https://files.catbox.moe/pynt42.mp4',
      'https://files.catbox.moe/7yvdbd.mp4',
      'https://files.catbox.moe/w8huc2.mkv',
      'https://files.catbox.moe/nejhuv.mp4',
      'https://files.catbox.moe/8ca3cr.mp4',
      'https://files.catbox.moe/02x60l.mkv',
      'https://files.catbox.moe/8ea559.mp4',
      'https://files.catbox.moe/9t4e7x.webm',
      'https://files.catbox.moe/kk607w.mkv',
      'https://files.catbox.moe/tjtmqn.mkv',
      'https://files.catbox.moe/wy4h99.mkv',
      'https://files.catbox.moe/wdv2kj.mp4',
      'https://files.catbox.moe/t116gx.mkv',
      'https://files.catbox.moe/f5vmu3.mkv',
      'https://files.catbox.moe/vq10zw.mkv',
      'https://files.catbox.moe/et4g5i.mkv',
      'https://files.catbox.moe/rtzjgh.mp4',
      'https://files.catbox.moe/c2zjxo.mkv',
      'https://files.catbox.moe/oqiy2x.mkv',
      'https://files.catbox.moe/4hawk0.webm',
      'https://files.catbox.moe/tvef9t.mp4',
      'https://files.catbox.moe/ikw3wi.mkv'
    ]
  },
  {
    id: 'digimon_adventure_01',
    name: 'Digimon Adventure 01 (Series)',
    type: 'series',
    poster: 'https://i.postimg.cc/XYpdDgC6/Digimon-Adventure-01-DP.webp',
    background: 'https://i.postimg.cc/T368HMKn/Digimon-01.jpg',
    description: 'Koleksi episod Digimon Adventure 01.',
    urls: [
      'https://files.catbox.moe/e0rqpf.mkv',
      'https://files.catbox.moe/2hou0p.mkv',
      'https://files.catbox.moe/e9v6wa.mkv',
      'https://files.catbox.moe/gu2sos.mkv',
      'https://files.catbox.moe/n6rsk2.mkv',
      'https://files.catbox.moe/tskc12.mkv',
      'https://files.catbox.moe/fpko2t.mkv',
      'https://files.catbox.moe/r0bem3.mkv',
      'https://files.catbox.moe/cdimzv.mkv',
      'https://files.catbox.moe/0yua59.mkv',
      'https://files.catbox.moe/wofmc1.mkv',
      'https://files.catbox.moe/zezjha.mkv',
      'https://files.catbox.moe/jz8h9m.mkv',
      'https://files.catbox.moe/ttnebg.mkv',
      'https://files.catbox.moe/j1qgd0.mkv',
      'https://files.catbox.moe/2f5l1i.mkv',
      'https://files.catbox.moe/9zl6f3.mkv',
      'https://files.catbox.moe/g5mp05.mkv',
      'https://files.catbox.moe/9qyu8m.mkv',
      'https://files.catbox.moe/qi4907.mkv',
      'https://files.catbox.moe/62qm6q.mkv',
      'https://files.catbox.moe/qd2rp6.mkv',
      'https://files.catbox.moe/hsirv9.mkv',
      'https://files.catbox.moe/j9inza.mkv',
      'https://files.catbox.moe/imdz6v.mkv',
      'https://files.catbox.moe/eavdti.mkv',
      'https://files.catbox.moe/6bt1jb.mkv',
      'https://files.catbox.moe/j7y6l5.mkv',
      'https://files.catbox.moe/k3qi71.mkv',
      'https://files.catbox.moe/z48p20.mkv',
      'https://files.catbox.moe/0liv2g.mkv',
      'https://files.catbox.moe/ib93b9.mkv',
      'https://files.catbox.moe/cmddcq.mkv',
      'https://files.catbox.moe/hc75qs.mkv',
      'https://files.catbox.moe/80ihqw.mkv',
      'https://files.catbox.moe/2j4528.mkv',
      'https://files.catbox.moe/m2vk0x.mkv',
      'https://files.catbox.moe/bxkjwm.mkv',
      'https://files.catbox.moe/1b9gwu.mkv',
      'https://files.catbox.moe/lnxlw4.mkv',
      'https://files.catbox.moe/kffur9.mkv',
      'https://files.catbox.moe/x39h67.mkv',
      'https://files.catbox.moe/b5mwsr.mkv',
      'https://files.catbox.moe/cwq3jd.mkv',
      'https://files.catbox.moe/gokoql.mkv',
      'https://files.catbox.moe/a88ir0.mkv',
      'https://files.catbox.moe/e2ocb9.mkv',
      'https://files.catbox.moe/op51ps.mkv',
      'https://files.catbox.moe/ynheic.mkv',
      'https://files.catbox.moe/44nsq7.mkv',
      'https://files.catbox.moe/tvu37m.mkv',
      'https://files.catbox.moe/dqatyz.mkv',
      'https://files.catbox.moe/sbex83.mkv',
      'https://files.catbox.moe/qd2yx9.mkv'
    ]
  },
  {
    id: 'digimon_savers',
    name: 'Digimon Savers (Series)',
    type: 'series',
    poster: 'https://i.postimg.cc/25WvC8GM/Digimon-Savers-DP.jpg',
    background: 'https://i.postimg.cc/pLHN1bms/Digimon-Savers.jpg',
    description: 'Koleksi episod Digimon Savers.',
    urls: [
      'https://files.catbox.moe/pjuq4v.mp4',
      'https://files.catbox.moe/2xj9b9.mp4',
      'https://files.catbox.moe/qwdfom.mp4',
      'https://files.catbox.moe/0rcnrs.mp4',
      'https://files.catbox.moe/dcum9s.mp4',
      'https://files.catbox.moe/m7vixb.mp4',
      'https://files.catbox.moe/kwgaqq.mp4',
      'https://files.catbox.moe/odxlwf.mp4',
      'https://files.catbox.moe/903sr9.mp4',
      'https://files.catbox.moe/v2vwvm.mp4',
      'https://files.catbox.moe/jnjj2h.mp4',
      'https://files.catbox.moe/c82q1v.mp4',
      'https://files.catbox.moe/dc7of9.mp4',
      'https://files.catbox.moe/j2f9wa.mp4',
      'https://files.catbox.moe/ogadln.mp4',
      'https://files.catbox.moe/gfctf7.mp4',
      'https://files.catbox.moe/tus67m.mp4',
      'https://files.catbox.moe/paodxr.mp4',
      'https://files.catbox.moe/t8zlhi.mp4',
      'https://files.catbox.moe/sgg2ih.mp4',
      'https://files.catbox.moe/t2ysv4.mp4',
      'https://files.catbox.moe/981fj9.mp4',
      'https://files.catbox.moe/ok19dj.mp4',
      'https://files.catbox.moe/yn3mcd.mp4',
      'https://files.catbox.moe/kyn0pe.mp4',
      'https://files.catbox.moe/oyg7fd.mp4',
      'https://files.catbox.moe/xn5x2v.mp4',
      'https://files.catbox.moe/bo830d.mp4',
      'https://files.catbox.moe/0axnec.mp4',
      'https://files.catbox.moe/k67jwm.mp4',
      'https://files.catbox.moe/2s09wt.mp4',
      'https://files.catbox.moe/1337zx.mp4',
      'https://files.catbox.moe/yyj40k.mp4',
      'https://files.catbox.moe/00iraw.mp4',
      'https://files.catbox.moe/mu4b9q.mp4',
      'https://files.catbox.moe/ng4uzb.mp4',
      'https://files.catbox.moe/e0qa9y.mp4',
      'https://files.catbox.moe/iyxhhs.mp4',
      'https://files.catbox.moe/ggmem5.mp4',
      'https://files.catbox.moe/107d1y.mp4',
      'https://files.catbox.moe/ttwtn5.mp4',
      'https://files.catbox.moe/7skrqk.mp4',
      'https://files.catbox.moe/sub0gd.mp4',
      'https://files.catbox.moe/rrkgee.mp4',
      'https://files.catbox.moe/30u7ag.mp4',
      'https://files.catbox.moe/a1obqr.mp4',
      'https://files.catbox.moe/8anpz9.mp4',
      'https://files.catbox.moe/23a3j8.mp4'
    ]
  },
  {
    id: 'black_cat',
    name: 'Black Cat (Series)',
    type: 'series',
    poster: 'https://i.postimg.cc/x1cMFPz1/Black-Cat-DP.jpg',
    background: 'https://i.postimg.cc/fRjGG2dF/Black-Cat.jpg',
    description: 'Koleksi episod Black Cat.',
    urls: [
      'https://files.catbox.moe/xt0a0n.mp4',
      'https://files.catbox.moe/k1wxy6.mp4',
      'https://files.catbox.moe/npays5.mp4',
      'https://files.catbox.moe/vr6t77.mp4',
      'https://files.catbox.moe/rtp95u.mp4',
      'https://files.catbox.moe/3u3jbh.mp4',
      'https://files.catbox.moe/6hf6fs.mp4',
      'https://files.catbox.moe/u9zsug.mp4',
      'https://files.catbox.moe/tza3td.mp4',
      'https://files.catbox.moe/s2z3iy.mp4',
      'https://files.catbox.moe/p0nv9h.mp4',
      'https://files.catbox.moe/3l5rnc.mp4',
      'https://files.catbox.moe/am14fw.mp4',
      'https://files.catbox.moe/ip19yx.mp4',
      'https://files.catbox.moe/ifwh66.mp4',
      'https://files.catbox.moe/jrf7j4.mp4',
      'https://files.catbox.moe/j5scn9.mp4',
      'https://files.catbox.moe/hjueai.mp4',
      'https://files.catbox.moe/3ds9an.mp4',
      'https://files.catbox.moe/o80p7r.mp4',
      'https://files.catbox.moe/6vtgbq.mp4',
      'https://files.catbox.moe/58zmb9.mp4',
      'https://files.catbox.moe/3zrbqp.mp4',
      'https://files.catbox.moe/jsah3e.mp4'
    ]
  },
  {
    id: 'ginban_kaleidoscope',
    name: 'Ginban Kaleidoscope (Series)',
    type: 'series',
    poster: 'https://i.postimg.cc/LXB1ZCrk/Ginban-Kaleidoscope-DP.jpg',
    background: 'https://i.postimg.cc/x1ywwxmB/Ginban-Kaleidoscope.jpg',
    description: 'Koleksi episod Ginban Kaleidoscope.',
    urls: [
      'https://files.catbox.moe/5je70q.flv',
      'https://files.catbox.moe/l4dsxu.flv',
      'https://files.catbox.moe/0pffen.flv',
      'https://files.catbox.moe/v67xcz.mp4',
      'https://files.catbox.moe/dth1gm.mp4',
      'https://files.catbox.moe/tvcszy.mp4',
      'https://files.catbox.moe/pj6spq.mp4',
      'https://files.catbox.moe/tta199.mp4',
      'https://files.catbox.moe/dzl7mp.mp4',
      'https://files.catbox.moe/mzv0e3.mp4',
      'https://files.catbox.moe/8cxro0.mp4',
      'https://files.catbox.moe/c33xc2.mp4'
    ]
  },
  {
    id: 'the_law_of_ueki',
    name: 'The Law Of Ueki (Series)',
    type: 'series',
    poster: 'https://i.postimg.cc/J0rB338R/The-Law-Of-Ueki-DP.jpg',
    background: 'https://i.postimg.cc/Sx7BBT9v/The-Law-Of-Ueki.jpg',
    description: 'Koleksi episod The Law Of Ueki.',
    urls: [
      'https://files.catbox.moe/8kj5ks.mp4',
      'https://files.catbox.moe/z0g9yg.mp4',
      'https://files.catbox.moe/08sesz.mp4',
      'https://files.catbox.moe/6md76n.mp4',
      'https://files.catbox.moe/807ppt.mp4',
      'https://files.catbox.moe/p97pyk.mp4',
      'https://files.catbox.moe/u4xc7f.mp4',
      'https://files.catbox.moe/t6cqgz.mp4',
      'https://files.catbox.moe/ccd8xy.mp4',
      'https://files.catbox.moe/00umfq.mp4',
      'https://files.catbox.moe/4jqaxr.mp4',
      'https://files.catbox.moe/f2fu7v.mp4',
      'https://files.catbox.moe/3hqo5h.mp4',
      'https://files.catbox.moe/k5rsv8.mp4',
      'https://files.catbox.moe/a52eaw.mp4',
      'https://files.catbox.moe/92vn6m.mp4',
      'https://files.catbox.moe/lc4ggf.mp4',
      'https://files.catbox.moe/g7z0qd.mp4',
      'https://files.catbox.moe/1cu6nb.mp4',
      'https://files.catbox.moe/simne6.mp4',
      'https://files.catbox.moe/qsd9d6.mp4',
      'https://files.catbox.moe/bvqz25.mp4',
      'https://files.catbox.moe/lz4f81.mp4',
      'https://files.catbox.moe/cxdp53.mp4',
      'https://files.catbox.moe/42fp1m.mp4',
      'https://files.catbox.moe/0cct4v.mp4',
      'https://files.catbox.moe/tq28dt.mp4',
      'https://files.catbox.moe/4644lf.MP4',
      'https://files.catbox.moe/220ni1.MP4',
      'https://files.catbox.moe/yr03al.MP4',
      'https://files.catbox.moe/1owo27.MP4',
      'https://files.catbox.moe/5p84az.MP4',
      'https://files.catbox.moe/xwp7g4.MP4',
      'https://files.catbox.moe/nq68ze.MP4',
      'https://files.catbox.moe/5iklua.MP4',
      'https://files.catbox.moe/4n3ctq.MP4',
      'https://files.catbox.moe/82q9a5.MP4',
      'https://files.catbox.moe/2sl6it.MP4',
      'https://files.catbox.moe/1o0vhh.MP4',
      'https://files.catbox.moe/9wxs8p.MP4',
      'https://files.catbox.moe/bwk5nr.MP4',
      'https://files.catbox.moe/rf1i5n.MP4',
      'https://files.catbox.moe/a8wyuy.MP4',
      'https://files.catbox.moe/lwe17r.MP4',
      'https://files.catbox.moe/kno50g.MP4',
      'https://files.catbox.moe/3x4ddf.MP4',
      'https://files.catbox.moe/iiksmp.MP4',
      'https://files.catbox.moe/qa4dc0.MP4',
      'https://files.catbox.moe/ayw9r7.MP4',
      'https://files.catbox.moe/z2903v.MP4',
      'https://files.catbox.moe/wb03ng.MP4'
    ]
  },
  {
    id: 'anak_anak_sidek',
    name: 'Anak-Anak Sidek (Series)',
    type: 'series',
    poster: 'https://i.postimg.cc/WzbZvmhr/Anak-Anak-Sidek-DP.jpg',
    background: 'https://i.postimg.cc/25kYcR11/Anak-Anak-Sidek.jpg',
    description: 'Koleksi episod Anak-Anak Sidek.',
    urls: [
      'https://files.catbox.moe/0ts7am.mp4',
      'https://files.catbox.moe/lpswls.mp4',
      'https://files.catbox.moe/lbmnel.mp4',
      'https://files.catbox.moe/eligd9.mp4',
      'https://files.catbox.moe/khs41p.mp4',
      'https://files.catbox.moe/26c3re.mp4',
      'https://files.catbox.moe/b16149.mp4',
      'https://files.catbox.moe/mxe2nn.mp4',
      'https://files.catbox.moe/s1ayej.mp4',
      'https://files.catbox.moe/32z6i6.mp4',
      'https://files.catbox.moe/f8pnpd.mp4',
      'https://files.catbox.moe/86iy1e.mp4',
      'https://files.catbox.moe/ttqlp9.mp4',
      'https://files.catbox.moe/q9dr60.mp4',
      'https://files.catbox.moe/of0qnd.mp4',
      'https://files.catbox.moe/cedu56.mp4',
      'https://files.catbox.moe/xdskm8.mp4',
      'https://files.catbox.moe/9mzf1z.mp4',
      'https://files.catbox.moe/lsz3p9.mp4',
      'https://files.catbox.moe/3mxx6i.mp4',
      'https://files.catbox.moe/jkjj9o.mp4',
      'https://files.catbox.moe/wdgv93.mp4',
      'https://files.catbox.moe/qf2fvl.mp4',
      'https://files.catbox.moe/jvfta3.mp4',
      'https://files.catbox.moe/q40kmo.mp4',
      'https://files.catbox.moe/t6tkl7.mp4',
      'https://files.catbox.moe/7hj0pp.mp4',
      'https://files.catbox.moe/2cvkol.mp4',
      'https://files.catbox.moe/x6d6l2.mp4',
      'https://files.catbox.moe/em16n2.mp4',
      'https://files.catbox.moe/kfx8fa.mp4',
      'https://files.catbox.moe/psqwmg.mp4',
      'https://files.catbox.moe/qhhlph.mp4',
      'https://files.catbox.moe/4yre1a.mp4',
      'https://files.catbox.moe/xmphie.mp4',
      'https://files.catbox.moe/uwyuaa.mp4',
      'https://files.catbox.moe/xzp99z.mp4',
      'https://files.catbox.moe/gw2t8k.mp4',
      'https://files.catbox.moe/farxtu.mp4',
      'https://files.catbox.moe/ndsb34.mp4',
      'https://files.catbox.moe/8p480z.mp4',
      'https://files.catbox.moe/2by4hx.mp4',
      'https://files.catbox.moe/r1443c.mp4'
    ]
  },
  {
    id: 'pokemon_journey',
    name: 'Pokemon Journey The Series (Series)',
    type: 'series',
    poster: 'https://i.postimg.cc/qqb3Mt3R/Pokemon-Journey-The-Series-DP.png',
    background: 'https://i.postimg.cc/Ls9SCKJX/Pokemon.jpg',
    description: 'Koleksi episod Pokemon Journey The Series.',
    urls: [
      'https://files.catbox.moe/9l6811.mp4',
      'https://files.catbox.moe/f2adj4.mp4',
      'https://files.catbox.moe/bnoev9.mp4',
      'https://files.catbox.moe/64ntqo.mp4',
      'https://files.catbox.moe/83f07d.mp4',
      'https://files.catbox.moe/17e2tr.mp4',
      'https://files.catbox.moe/5y14uj.mp4',
      'https://files.catbox.moe/poz7od.mp4',
      'https://files.catbox.moe/y46f9t.mp4',
      'https://files.catbox.moe/grq2iu.mp4',
      'https://files.catbox.moe/k773ev.mp4',
      'https://files.catbox.moe/r5rda8.mp4',
      'https://files.catbox.moe/8idngm.mp4',
      'https://files.catbox.moe/8fz354.mp4',
      'https://files.catbox.moe/tzcx7q.mp4',
      'https://files.catbox.moe/o1beae.mp4',
      'https://files.catbox.moe/uyhug0.mp4',
      'https://files.catbox.moe/5f9hjn.mp4',
      'https://files.catbox.moe/ou8sgf.mp4',
      'https://files.catbox.moe/63xw8p.mp4',
      'https://files.catbox.moe/r69vzr.mp4',
      'https://files.catbox.moe/29y1ey.mp4',
      'https://files.catbox.moe/q258dj.mp4',
      'https://files.catbox.moe/7lyrdj.mp4',
      'https://files.catbox.moe/eiy4gx.mp4',
      'https://files.catbox.moe/utrujc.mp4',
      'https://files.catbox.moe/f40v16.mp4',
      'https://files.catbox.moe/9p1oo4.mp4',
      'https://files.catbox.moe/vw842q.mp4',
      'https://files.catbox.moe/43p2fg.mp4',
      'https://files.catbox.moe/odqedh.mp4',
      'https://files.catbox.moe/iaxi6v.mp4',
      'https://files.catbox.moe/k27hgg.mp4',
      'https://files.catbox.moe/umbpcj.mp4',
      'https://files.catbox.moe/6gn6ci.mp4',
      'https://files.catbox.moe/brro9o.mp4',
      'https://files.catbox.moe/0pn8a9.mp4',
      'https://files.catbox.moe/6qs7l7.mp4',
      'https://files.catbox.moe/iljl67.mp4',
      'https://files.catbox.moe/o1welq.mp4',
      'https://files.catbox.moe/1qf2bs.mp4',
      'https://files.catbox.moe/6432zl.mp4'
    ]
  },
  {
    id: 'doraemon',
    name: 'Doraemon (Series)',
    type: 'series',
    poster: 'https://i.postimg.cc/ydjfjd0Q/Doraemon-DP-Series.jpg',
    background: 'https://i.postimg.cc/XYbMDSrm/Doraemon.jpg',
    description: 'Koleksi episod Doraemon.',
    urls: [
      'https://files.catbox.moe/oycp0l.mp4',
      'https://files.catbox.moe/y2jnzp.mp4',
      'https://files.catbox.moe/0rhjn1.mp4',
      'https://files.catbox.moe/j5bb72.mp4',
      'https://files.catbox.moe/tx56z3.mp4',
      'https://files.catbox.moe/d999bc.mp4',
      'https://files.catbox.moe/9oagow.mp4',
      'https://files.catbox.moe/c88t2y.mp4',
      'https://files.catbox.moe/s0w4l2.mp4',
      'https://files.catbox.moe/9z3g6p.mp4',
      'https://files.catbox.moe/w2rqxc.mp4',
      'https://files.catbox.moe/0ye5xj.mp4',
      'https://files.catbox.moe/p43ryb.mp4',
      'https://files.catbox.moe/4v3zun.mp4',
      'https://files.catbox.moe/k6jxyt.mp4',
      'https://files.catbox.moe/8rbre5.mp4',
      'https://files.catbox.moe/mhs0nv.mp4',
      'https://files.catbox.moe/5h1ezm.mp4',
      'https://files.catbox.moe/htqy6e.mp4',
      'https://files.catbox.moe/lea2x8.mp4',
      'https://files.catbox.moe/r42hc2.mp4',
      'https://files.catbox.moe/vkeb1q.mp4',
      'https://files.catbox.moe/4mcmx3.mp4',
      'https://files.catbox.moe/cunbqt.mp4',
      'https://files.catbox.moe/qxylix.mp4',
      'https://files.catbox.moe/re0c0z.mp4',
      'https://files.catbox.moe/ks1u8n.mp4',
      'https://files.catbox.moe/79zs6n.mp4',
      'https://files.catbox.moe/c6zn2u.mp4',
      'https://files.catbox.moe/ytnekv.mp4',
      'https://files.catbox.moe/vatbmf.mp4',
      'https://files.catbox.moe/5ot9pd.mp4',
      'https://files.catbox.moe/8hetcy.mp4',
      'https://files.catbox.moe/zl3nzc.mp4',
      'https://files.catbox.moe/7bhl4b.mp4',
      'https://files.catbox.moe/336km9.mp4',
      'https://files.catbox.moe/gz6zd1.mp4',
      'https://files.catbox.moe/ti97x3.mp4',
      'https://files.catbox.moe/gz9nzk.mp4',
      'https://files.catbox.moe/7as2xt.mp4',
      'https://files.catbox.moe/lur6di.mp4',
      'https://files.catbox.moe/y6cidm.mp4',
      'https://files.catbox.moe/40q9mb.mp4',
      'https://files.catbox.moe/14uoer.mp4',
      'https://files.catbox.moe/tnu1yq.mp4',
      'https://files.catbox.moe/jqn9l7.mp4',
      'https://files.catbox.moe/75bfy0.mp4',
      'https://files.catbox.moe/mpwbnh.mp4',
      'https://files.catbox.moe/2sjant.mp4',
      'https://files.catbox.moe/khkto1.mp4',
      'https://files.catbox.moe/r0w4yb.mp4',
      'https://files.catbox.moe/25qjxr.mp4',
      'https://files.catbox.moe/z81zu8.mp4',
      'https://files.catbox.moe/22zj5h.mp4',
      'https://files.catbox.moe/prdrno.mp4',
      'https://files.catbox.moe/c81md0.mp4',
      'https://files.catbox.moe/hkiu08.mp4',
      'https://files.catbox.moe/f0uzr4.mp4',
      'https://files.catbox.moe/a1cqxl.mp4'
    ]
  },
  {
    id: 'ninja_boy',
    name: 'Ninja Boy (Series)',
    type: 'series',
    poster: 'https://i.postimg.cc/ydjfjdFY/Ninja-Boy-DP.jpg',
    background: 'https://i.postimg.cc/NjchPqKZ/Ninja_Boy.jpg',
    description: 'Koleksi episod Ninja Boy.',
    urls: [
      'https://files.catbox.moe/eufzjd.mp4',
      'https://files.catbox.moe/gujt6g.mp4',
      'https://files.catbox.moe/tlvkbp.mp4',
      'https://files.catbox.moe/fzsduj.mp4',
      'https://files.catbox.moe/zmbbmq.mp4',
      'https://files.catbox.moe/o7bhaf.mp4',
      'https://files.catbox.moe/jmwdz9.mp4'
    ]
  },
  {
    id: 'kids_delights_malay',
    name: 'Kids Delights (Malay Ver)',
    type: 'series',
    poster: 'https://i.postimg.cc/FsKg8hfM/KD.jpg',
    background: 'https://i.postimg.cc/FsKg8hfM/KD.jpg',
    description: 'Kisah-kisah Nabi versi Bahasa Melayu.',
    episodes: [
      { title: 'Nabi Nuh AS - Bahtera Penyelamat', thumbnail: 'https://i.postimg.cc/qMvTZV7c/Kisah-Nabi-Nuh.jpg' },
      { title: 'Nabi Ibrahim AS - Kekasih Allah Yang Taat', thumbnail: 'https://i.postimg.cc/wTTfd9Lp/Kisah-Nabi-Ibrahim.jpg' },
      { title: 'Nabi Ismail AS - Mukjizat Air Zam-Zam & Pengorbanan Besar', thumbnail: 'https://i.postimg.cc/bwMptCpb/Kisah-Nabi-Ismail.jpg' },
      { title: 'Nabi Ishaq AS - Rezeki Anak Di Usia Senja', thumbnail: 'https://i.postimg.cc/xTwz3R04/Kisah-Nabi-Ishaq.jpg' },
      { title: 'Nabo Yaaqub AS - Sifat Sabar Dan Wasiat Tauhid', thumbnail: 'https://i.postimg.cc/Tw30v9WR/Kisah-Nabi-Yaaqub.jpg' },
      { title: 'Nabi Yusuf AS - Dari Perigi Gelap Ke Takhta Mesir', thumbnail: 'https://i.postimg.cc/PqzVjJ3D/Kisah-Nabi-Yusuf.jpg' },
      { title: 'Nabi Yunus AS - Keajaiban Di Dalam Perut Ikan Nun', thumbnail: 'https://i.postimg.cc/bJtg3v77/image-c1cc390e.jpg' }
    ]
  },
  {
    id: 'kids_delights_eng',
    name: 'Kids Delights (Eng Ver)',
    type: 'series',
    poster: 'https://i.postimg.cc/FsKg8hfM/KD.jpg',
    background: 'https://i.postimg.cc/FsKg8hfM/KD.jpg',
    description: 'Stories of Prophets in English Version.',
    episodes: [
      { title: 'Prophet Nuh AS - The Ark Of Safety', thumbnail: 'https://i.postimg.cc/qMvTZV7c/Kisah-Nabi-Nuh.jpg' },
      { title: 'Prophet Ibrahim AS - The Close Friend Of Allah', thumbnail: 'https://i.postimg.cc/wTTfd9Lp/Kisah-Nabi-Ibrahim.jpg' },
      { title: 'Prophet Ismail AS - The Miracle Of Zam Zam & A Great Sacrifice', thumbnail: 'https://i.postimg.cc/bwMptCpb/Kisah-Nabi-Ismail.jpg' },
      { title: 'Prophet Ishaq AS - The Miracle Of A Long-Awaited Child', thumbnail: 'https://i.postimg.cc/xTwz3R04/Kisah-Nabi-Ishaq.jpg' },
      { title: 'Prophet Yaaqub AS - Patience And The Legacy Of Tawhid', thumbnail: 'https://i.postimg.cc/Tw30v9WR/Kisah-Nabi-Yaaqub.jpg' },
      { title: 'Prophet Yusuf AS - From Dark Well To The Throne Of Egypt', thumbnail: 'https://i.postimg.cc/PqzVjJ3D/Kisah-Nabi-Yusuf.jpg' },
      { title: 'Prophet Yunus AS - A Miracle In The Belly Of The Fish', thumbnail: 'https://i.postimg.cc/bJtg3v77/image-c1cc390e.jpg' }
    ]
  },
  {
    id: 'kisah_hidup_akhir_zaman',
    name: 'Kisah Hidup Akhir Zaman (Series)',
    type: 'series',
    poster: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg',
    background: 'https://i.postimg.cc/rynQfgCF/Akhir-Zaman.jpg',
    description: 'Koleksi siri Kisah Hidup Akhir Zaman.',
    urls: [
      'https://files.catbox.moe/dmr7ys.mp4',
      'https://files.catbox.moe/c05jnq.mp4',
      'https://files.catbox.moe/sakwy1.mp4',
      'https://files.catbox.moe/8jcm2b.mp4',
      'https://files.catbox.moe/fcw4me.mp4',
      'https://files.catbox.moe/ve28k8.mp4',
      'https://files.catbox.moe/cml4j6.mp4',
      'https://files.catbox.moe/t9ta6d.mp4',
      'https://files.catbox.moe/991agh.mp4',
      'https://files.catbox.moe/grbp8x.mp4',
      'https://files.catbox.moe/38soe6.mp4',
      'https://files.catbox.moe/ler4ag.mp4',
      'https://files.catbox.moe/ec9jc1.mp4',
      'https://files.catbox.moe/e9ckzj.mp4',
      'https://files.catbox.moe/rwzqqg.mp4',
      'https://files.catbox.moe/lfr6y0.mp4',
      'https://files.catbox.moe/5lod2l.mp4',
      'https://files.catbox.moe/2u6jeq.mp4',
      'https://files.catbox.moe/y4dfdt.mp4',
      'https://files.catbox.moe/cupuua.mp4',
      'https://files.catbox.moe/xlfvy0.mp4',
      'https://files.catbox.moe/svf1ld.mp4',
      'https://files.catbox.moe/6dmnwt.mp4',
      'https://files.catbox.moe/xz9p55.mp4',
      'https://files.catbox.moe/1oeizf.mp4',
      'https://files.catbox.moe/1dpc4q.mp4',
      'https://files.catbox.moe/wkk250.mp4',
      'https://files.catbox.moe/ns7oqa.mp4',
      'https://files.catbox.moe/rikryy.mp4',
      'https://files.catbox.moe/v6lwxq.mp4',
      'https://files.catbox.moe/qoyb9l.mp4',
      'https://files.catbox.moe/fa0z2q.mp4',
      'https://files.catbox.moe/rb6n12.mp4',
      'https://files.catbox.moe/p5a2ds.mp4',
      'https://files.catbox.moe/n4ro3i.mp4',
      'https://files.catbox.moe/f926el.mp4',
      'https://files.catbox.moe/sa6gq8.mp4',
      'https://files.catbox.moe/55vgoa.mp4',
      'https://files.catbox.moe/edzksm.mp4',
      'https://files.catbox.moe/g6gx07.mp4',
      'https://files.catbox.moe/h3rt2t.mp4',
      'https://files.catbox.moe/7zgjio.mp4',
      'https://files.catbox.moe/nianl8.mp4',
      'https://files.catbox.moe/pk2ija.mp4',
      'https://files.catbox.moe/g6vzed.mp4',
      'https://files.catbox.moe/2xr42f.mp4',
      'https://files.catbox.moe/i636mu.mp4',
      'https://files.catbox.moe/2dh0kw.mp4',
      'https://files.catbox.moe/osqos3.mp4',
      'https://files.catbox.moe/clraet.mp4',
      'https://files.catbox.moe/02vue5.mp4',
      'https://files.catbox.moe/oih2ce.mp4',
      'https://files.catbox.moe/opbp3x.mp4',
      'https://files.catbox.moe/47lmkc.mp4',
      'https://files.catbox.moe/gh1des.mp4',
      'https://files.catbox.moe/ny4qqj.mp4',
      'https://files.catbox.moe/v3yvoh.mp4',
      'https://files.catbox.moe/2bmvek.mp4',
      'https://files.catbox.moe/rnkq3v.mp4',
      'https://files.catbox.moe/a6i9oa.mp4',
      'https://files.catbox.moe/wj13np.mp4',
      'https://files.catbox.moe/2uk8a3.mp4'
    ]
  }
];

// ==========================================
// STREMIO / NUVIO MANIFEST
// ==========================================
const manifest = {
  id: 'org.custom.mycollection.addon',
  version: '1.0.0',
  name: 'Koleksi Siri Custom',
  description: 'Addon khas siri anime & kartun untuk Nuvio',
  types: ['series'],
  catalogs: [
    {
      type: 'series',
      id: 'custom_series_catalog',
      name: 'Koleksi Siri Custom'
    }
  ],
  resources: ['catalog', 'meta', 'stream'],
  idPrefixes: ['custom_']
};

// 1. MANIFEST ENDPOINT
app.get('/manifest.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(manifest);
});

// 2. CATALOG ENDPOINT
app.get('/catalog/:type/:id.json', (req, res) => {
  const metas = catalogData.map(item => ({
    id: `custom_${item.id}`,
    type: 'series',
    name: item.name,
    poster: item.poster,
    description: item.description
  }));
  res.json({ metas });
});

// 3. META ENDPOINT (Papar Senarai Episod)
app.get('/meta/:type/:id.json', (req, res) => {
  const idClean = req.params.id.replace('custom_', '');
  const item = catalogData.find(c => c.id === idClean);

  if (!item) {
    return res.json({ meta: {} });
  }

  let videos = [];

  if (item.episodes) {
    // Jika tajuk episod ditakrifkan secara khusus
    videos = item.episodes.map((ep, idx) => ({
      id: `custom_${item.id}:1:${idx + 1}`,
      title: ep.title,
      season: 1,
      episode: idx + 1,
      thumbnail: ep.thumbnail
    }));
  } else if (item.urls) {
    // Jika hanya pautan URL diberi
    videos = item.urls.map((url, idx) => ({
      id: `custom_${item.id}:1:${idx + 1}`,
      title: `Episod ${idx + 1}`,
      season: 1,
      episode: idx + 1
    }));
  }

  const meta = {
    id: `custom_${item.id}`,
    type: 'series',
    name: item.name,
    poster: item.poster,
    background: item.background || item.poster,
    description: item.description,
    videos: videos
  };

  res.json({ meta });
});

// 4. STREAM ENDPOINT (Mainkan Video)
app.get('/stream/:type/:id.json', (req, res) => {
  const fullId = req.params.id; // Contoh: custom_doraemon:1:5
  const parts = fullId.replace('custom_', '').split(':');
  
  const seriesId = parts[0];
  const episodeNum = parseInt(parts[2], 10);

  const item = catalogData.find(c => c.id === seriesId);
  const streams = [];

  if (item && item.urls && item.urls[episodeNum - 1]) {
    streams.push({
      title: `${item.name} - Episod ${episodeNum}`,
      url: item.urls[episodeNum - 1]
    });
  } else if (item && item.episodes) {
    // Jika tiada URL video spesifik disediakan untuk Kids Delights
    streams.push({
      title: `${item.name} - Episod ${episodeNum}`,
      url: 'https://files.catbox.moe/dmr7ys.mp4' // URL fallback/dummy
    });
  }

  res.json({ streams });
});

// SERVER LISTEN
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Addon aktif di port ${PORT}`);
});
