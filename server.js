const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// 1. Naruto Episodes (1 - 220)
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
  { episode: 10, title: "Nt Episod 010.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97de6e979983cdce58b5" },
  { episode: 11, title: "Nt Episod 011.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97e46e979983cdce58b6" },
  { episode: 12, title: "Nt Episod 012.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97e96e979983cdce58b7" },
  { episode: 13, title: "Nt Episod 013.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97e96e979983cdce58b8" },
  { episode: 14, title: "Nt Episod 014.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97e96e979983cdce58b9" },
  { episode: 15, title: "Nt Episod 015.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97e96e979983cdce58ba" },
  { episode: 16, title: "Nt Episod 016.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc97e96e979983cdce58bb" },
  { episode: 17, title: "Nt Episod 017.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc981a6e979983cdce58bc" },
  { episode: 18, title: "Nt Episod 018.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc981a6e979983cdce58bd" },
  { episode: 19, title: "Nt Episod 019.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc981a6e979983cdce58be" },
  { episode: 20, title: "Nt Episod 020.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc981a6e979983cdce58bf" },
  { episode: 21, title: "Nt Episod 021.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc981f6e979983cdce58c0" },
  { episode: 22, title: "Nt Episod 022.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc981f6e979983cdce58c1" },
  { episode: 23, title: "Nt Episod 023.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98246e979983cdce58c2" },
  { episode: 24, title: "Nt Episod 024.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98256e979983cdce58c3" },
  { episode: 25, title: "Nt Episod 025.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98266e979983cdce58c4" },
  { episode: 26, title: "Nt Episod 026.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98516e979983cdce58c5" },
  { episode: 27, title: "Nt Episod 027.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98576e979983cdce58c6" },
  { episode: 28, title: "Nt Episod 028.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98576e979983cdce58c7" },
  { episode: 29, title: "Nt Episod 029.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98586e979983cdce58c8" },
  { episode: 30, title: "Nt Episod 030.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc985c6e979983cdce58c9" },
  { episode: 31, title: "Nt Episod 031.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc985d6e979983cdce58ca" },
  { episode: 32, title: "Nt Episod 032.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc985d6e979983cdce58cb" },
  { episode: 33, title: "Nt Episod 033.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98626e979983cdce58cc" },
  { episode: 34, title: "Nt Episod 034.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98626e979983cdce58cd" },
  { episode: 35, title: "Nt Episod 035.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc988d6e979983cdce58ce" },
  { episode: 36, title: "Nt Episod 036.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc988d6e979983cdce58cf" },
  { episode: 37, title: "Nt Episod 037.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98916e979983cdce58d0" },
  { episode: 38, title: "Nt Episod 038.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98936e979983cdce58d1" },
  { episode: 39, title: "Nt Episod 039.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98966e979983cdce58d2" },
  { episode: 40, title: "Nt Episod 040.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98966e979983cdce58d3" },
  { episode: 41, title: "Nt Episod 041.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98976e979983cdce58d4" },
  { episode: 42, title: "Nt Episod 042.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc989c6e979983cdce58d5" },
  { episode: 43, title: "Nt Episod 043.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc989c6e979983cdce58d6" },
  { episode: 44, title: "Nt Episod 044.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98a26e979983cdce58d8" },
  { episode: 45, title: "Nt Episod 045.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98a26e979983cdce58d7" },
  { episode: 46, title: "Nt Episod 046.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98c96e979983cdce58d9" },
  { episode: 47, title: "Nt Episod 047.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98c96e979983cdce58da" },
  { episode: 48, title: "Nt Episod 048.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98ca6e979983cdce58db" },
  { episode: 49, title: "Nt Episod 049.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98ce6e979983cdce58dc" },
  { episode: 50, title: "Nt Episod 050.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98cf6e979983cdce58dd" },
  { episode: 51, title: "Nt Episod 051.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98d46e979983cdce58de" },
  { episode: 52, title: "Nt Episod 052.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98d56e979983cdce58df" },
  { episode: 53, title: "Nt Episod 053.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98d96e979983cdce58e0" },
  { episode: 54, title: "Nt Episod 054.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98da6e979983cdce58e1" },
  { episode: 55, title: "Nt Episod 055.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc98da6e979983cdce58e2" },
  { episode: 56, title: "Nt Episod 056.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99056e979983cdce58e3" },
  { episode: 57, title: "Nt Episod 057.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99066e979983cdce58e4" },
  { episode: 58, title: "Nt Episod 058.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc990c6e979983cdce58e5" },
  { episode: 59, title: "Nt Episod 059.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc990c6e979983cdce58e6" },
  { episode: 60, title: "Nt Episod 060.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc990d6e979983cdce58e7" },
  { episode: 61, title: "Nt Episod 061.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99116e979983cdce58e8" },
  { episode: 62, title: "Nt Episod 062.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99116e979983cdce58e9" },
  { episode: 63, title: "Nt Episod 063.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99116e979983cdce58ea" },
  { episode: 64, title: "Nt Episod 064.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99186e979983cdce58eb" },
  { episode: 65, title: "Nt Episod 065.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99186e979983cdce58ec" },
  { episode: 66, title: "Nt Episod 066.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99476e979983cdce58ed" },
  { episode: 67, title: "Nt Episod 067.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc994c6e979983cdce58ee" },
  { episode: 68, title: "Nt Episod 068.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc994c6e979983cdce58ef" },
  { episode: 69, title: "Nt Episod 069.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc994c6e979983cdce58f0" },
  { episode: 70, title: "Nt Episod 070.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc994c6e979983cdce58f1" },
  { episode: 71, title: "Nt Episod 071.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc994d6e979983cdce58f2" },
  { episode: 72, title: "Nt Episod 072.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99516e979983cdce58f3" },
  { episode: 73, title: "Nt Episod 073.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99566e979983cdce58f4" },
  { episode: 74, title: "Nt Episod 074.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99566e979983cdce58f5" },
  { episode: 75, title: "Nt Episod 075.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99566e979983cdce58f6" },
  { episode: 76, title: "Nt Episod 076.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99576e979983cdce58f7" },
  { episode: 77, title: "Nt Episod 077.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc998b6e979983cdce58f8" },
  { episode: 78, title: "Nt Episod 078.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc998b6e979983cdce58fa" },
  { episode: 79, title: "Nt Episod 079.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc998b6e979983cdce58f9" },
  { episode: 80, title: "Nt Episod 080.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc998b6e979983cdce58fb" },
  { episode: 81, title: "Nt Episod 081.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99916e979983cdce58fc" },
  { episode: 82, title: "Nt Episod 082.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99916e979983cdce58fd" },
  { episode: 83, title: "Nt Episod 083.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99966e979983cdce58fe" },
  { episode: 84, title: "Nt Episod 084.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99966e979983cdce58ff" },
  { episode: 85, title: "Nt Episod 085.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99976e979983cdce5900" },
  { episode: 86, title: "Nt Episod 086.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99c46e979983cdce5901" },
  { episode: 87, title: "Nt Episod 087.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99c96e979983cdce5902" },
  { episode: 88, title: "Nt Episod 088.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99c96e979983cdce5903" },
  { episode: 89, title: "Nt Episod 089.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99ca6e979983cdce5904" },
  { episode: 90, title: "Nt Episod 090.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99cb6e979983cdce5905" },
  { episode: 91, title: "Nt Episod 091.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99cf6e979983cdce5906" },
  { episode: 92, title: "Nt Episod 092.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99cf6e979983cdce5907" },
  { episode: 93, title: "Nt Episod 093.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99cf6e979983cdce5908" },
  { episode: 94, title: "Nt Episod 094.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99d46e979983cdce5909" },
  { episode: 95, title: "Nt Episod 095.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99d56e979983cdce590a" },
  { episode: 96, title: "Nt Episod 096.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc99d56e979983cdce590b" },
  { episode: 97, title: "Nt Episod 097.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a006e979983cdce590c" },
  { episode: 98, title: "Nt Episod 098.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a056e979983cdce590d" },
  { episode: 99, title: "Nt Episod 099.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a076e979983cdce590e" },
  { episode: 100, title: "Nt Episod 100.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a086e979983cdce590f" },
  { episode: 101, title: "Nt Episod 101.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a0b6e979983cdce5910" },
  { episode: 102, title: "Nt Episod 102.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a0b6e979983cdce5911" },
  { episode: 103, title: "Nt Episod 103.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a106e979983cdce5912" },
  { episode: 104, title: "Nt Episod 104.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a106e979983cdce5913" },
  { episode: 105, title: "Nt Episod 105.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a116e979983cdce5914" },
  { episode: 106, title: "Nt Episod 106.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a3c6e979983cdce5915" },
  { episode: 107, title: "Nt Episod 107.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a3c6e979983cdce5916" },
  { episode: 108, title: "Nt Episod 108.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a416e979983cdce5917" },
  { episode: 109, title: "Nt Episod 109.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a426e979983cdce5918" },
  { episode: 110, title: "Nt Episod 110.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a436e979983cdce5919" },
  { episode: 111, title: "Nt Episod 111.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a486e979983cdce591a" },
  { episode: 112, title: "Nt Episod 112.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a486e979983cdce591b" },
  { episode: 113, title: "Nt Episod 113.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a486e979983cdce591c" },
  { episode: 114, title: "Nt Episod 114.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a4c6e979983cdce591d" },
  { episode: 115, title: "Nt Episod 115.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a4d6e979983cdce591e" },
  { episode: 116, title: "Nt Episod 116.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a4d6e979983cdce591f" },
  { episode: 117, title: "Nt Episod 117.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a7e6e979983cdce5920" },
  { episode: 118, title: "Nt Episod 118.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a836e979983cdce5922" },
  { episode: 119, title: "Nt Episod 119.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a836e979983cdce5921" },
  { episode: 120, title: "Nt Episod 120.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a836e979983cdce5923" },
  { episode: 121, title: "Nt Episod 121.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a846e979983cdce5924" },
  { episode: 122, title: "Nt Episod 122.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a886e979983cdce5925" },
  { episode: 123, title: "Nt Episod 123.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a886e979983cdce5926" },
  { episode: 124, title: "Nt Episod 124.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a8d6e979983cdce5927" },
  { episode: 125, title: "Nt Episod 125.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a8e6e979983cdce5929" },
  { episode: 126, title: "Nt Episod 126.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9a8d6e979983cdce5928" },
  { episode: 127, title: "Nt Episod 127.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9aba6e979983cdce592a" },
  { episode: 128, title: "Nt Episod 128.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9aba6e979983cdce592b" },
  { episode: 129, title: "Nt Episod 129.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9abb6e979983cdce592c" },
  { episode: 130, title: "Nt Episod 130.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9abf6e979983cdce592d" },
  { episode: 131, title: "Nt Episod 131.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9abf6e979983cdce592e" },
  { episode: 132, title: "Nt Episod 132.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9abf6e979983cdce592f" },
  { episode: 133, title: "Nt Episod 133.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ac66e979983cdce5930" },
  { episode: 134, title: "Nt Episod 134.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ac66e979983cdce5931" },
  { episode: 135, title: "Nt Episod 135.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9af06e979983cdce5932" },
  { episode: 136, title: "Nt Episod 136.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9af56e979983cdce5933" },
  { episode: 137, title: "Nt Episod 137.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9af56e979983cdce5934" },
  { episode: 138, title: "Nt Episod 138.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9af66e979983cdce5935" },
  { episode: 139, title: "Nt Episod 139.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9afb6e979983cdce5936" },
  { episode: 140, title: "Nt Episod 140.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9afb6e979983cdce5937" },
  { episode: 141, title: "Nt Episod 141.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9afb6e979983cdce5938" },
  { episode: 142, title: "Nt Episod 142.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b016e979983cdce5939" },
  { episode: 143, title: "Nt Episod 143.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b076e979983cdce593a" },
  { episode: 144, title: "Nt Episod 144.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b086e979983cdce593b" },
  { episode: 145, title: "Nt Episod 145.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b2d6e979983cdce593c" },
  { episode: 146, title: "Nt Episod 146.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b2d6e979983cdce593d" },
  { episode: 147, title: "Nt Episod 147.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b2d6e979983cdce593f" },
  { episode: 148, title: "Nt Episod 148.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b2d6e979983cdce593e" },
  { episode: 149, title: "Nt Episod 149.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b336e979983cdce5940" },
  { episode: 150, title: "Nt Episod 150.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b386e979983cdce5941" },
  { episode: 151, title: "Nt Episod 151.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b396e979983cdce5942" },
  { episode: 152, title: "Nt Episod 152.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b3a6e979983cdce5943" },
  { episode: 153, title: "Nt Episod 153.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b3d6e979983cdce5944" },
  { episode: 154, title: "Nt Episod 154.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b3e6e979983cdce5945" },
  { episode: 155, title: "Nt Episod 155.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b3e6e979983cdce5946" },
  { episode: 156, title: "Nt Episod 156.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b696e979983cdce5947" },
  { episode: 157, title: "Nt Episod 157.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b696e979983cdce5948" },
  { episode: 158, title: "Nt Episod 158.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b6f6e979983cdce5949" },
  { episode: 159, title: "Nt Episod 159.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b6f6e979983cdce594a" },
  { episode: 160, title: "Nt Episod 160.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b706e979983cdce594b" },
  { episode: 161, title: "Nt Episod 161.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b746e979983cdce594c" },
  { episode: 162, title: "Nt Episod 162.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b746e979983cdce594d" },
  { episode: 163, title: "Nt Episod 163.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b746e979983cdce594e" },
  { episode: 164, title: "Nt Episod 164.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9b7a6e979983cdce594f" },
  { episode: 165, title: "Nt Episod 165.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ba96e979983cdce5950" },
  { episode: 166, title: "Nt Episod 166.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bab6e979983cdce5951" },
  { episode: 167, title: "Nt Episod 167.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bab6e979983cdce5952" },
  { episode: 168, title: "Nt Episod 168.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bab6e979983cdce5953" },
  { episode: 169, title: "Nt Episod 169.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bae6e979983cdce5954" },
  { episode: 170, title: "Nt Episod 170.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9baf6e979983cdce5956" },
  { episode: 171, title: "Nt Episod 171.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9baf6e979983cdce5955" },
  { episode: 172, title: "Nt Episod 172.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bb46e979983cdce5957" },
  { episode: 173, title: "Nt Episod 173.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bb46e979983cdce5959" },
  { episode: 174, title: "Nt Episod 174.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bb46e979983cdce5958" },
  { episode: 175, title: "Nt Episod 175.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bba6e979983cdce595a" },
  { episode: 176, title: "Nt Episod 176.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9be26e979983cdce595c" },
  { episode: 177, title: "Nt Episod 177.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9be16e979983cdce595b" },
  { episode: 178, title: "Nt Episod 178.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9be76e979983cdce595d" },
  { episode: 179, title: "Nt Episod 179.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9be86e979983cdce595e" },
  { episode: 180, title: "Nt Episod 180.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9be86e979983cdce595f" },
  { episode: 181, title: "Nt Episod 181.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bed6e979983cdce5960" },
  { episode: 182, title: "Nt Episod 182.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bed6e979983cdce5961" },
  { episode: 183, title: "Nt Episod 183.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bed6e979983cdce5962" },
  { episode: 184, title: "Nt Episod 184.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bf26e979983cdce5963" },
  { episode: 185, title: "Nt Episod 185.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bf26e979983cdce5964" },
  { episode: 186, title: "Nt Episod 186.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9bf36e979983cdce5965" },
  { episode: 187, title: "Nt Episod 187.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c1d6e979983cdce5966" },
  { episode: 188, title: "Nt Episod 188.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c236e979983cdce5967" },
  { episode: 189, title: "Nt Episod 189.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c236e979983cdce5968" },
  { episode: 190, title: "Nt Episod 190.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c236e979983cdce5969" },
  { episode: 191, title: "Nt Episod 191.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c296e979983cdce596a" },
  { episode: 192, title: "Nt Episod 192.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c2f6e979983cdce596b" },
  { episode: 193, title: "Nt Episod 193.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c306e979983cdce596c" },
  { episode: 194, title: "Nt Episod 194.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c346e979983cdce596d" },
  { episode: 195, title: "Nt Episod 195.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c356e979983cdce596e" },
  { episode: 196, title: "Nt Episod 196.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c596e979983cdce596f" },
  { episode: 197, title: "Nt Episod 197.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c5e6e979983cdce5970" },
  { episode: 198, title: "Nt Episod 198.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c5e6e979983cdce5971" },
  { episode: 199, title: "Nt Episod 199.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c5e6e979983cdce5972" },
  { episode: 200, title: "Nt Episod 200.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c5e6e979983cdce5973" },
  { episode: 201, title: "Nt Episod 201.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c646e979983cdce5974" },
  { episode: 202, title: "Nt Episod 202.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c646e979983cdce5975" },
  { episode: 203, title: "Nt Episod 203.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c696e979983cdce5976" },
  { episode: 204, title: "Nt Episod 204.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c696e979983cdce5977" },
  { episode: 205, title: "Nt Episod 205.mkv", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c956e979983cdce5978" },
  { episode: 206, title: "Nt Episod 206.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c9c6e979983cdce5979" },
  { episode: 207, title: "Nt Episod 207.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9c9c6e979983cdce597a" },
  { episode: 208, title: "Nt Episod 208.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ca16e979983cdce597b" },
  { episode: 209, title: "Nt Episod 209.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ca26e979983cdce597c" },
  { episode: 210, title: "Nt Episod 210.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ca26e979983cdce597d" },
  { episode: 211, title: "Nt Episod 211.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ca66e979983cdce597f" },
  { episode: 212, title: "Nt Episod 212.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ca66e979983cdce597e" },
  { episode: 213, title: "Nt Episod 213.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ca76e979983cdce5980" },
  { episode: 214, title: "Nt Episod 214.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9ca76e979983cdce5981" },
  { episode: 215, title: "Nt Episod 215.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9cad6e979983cdce5982" },
  { episode: 216, title: "Nt Episod 216.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9cd66e979983cdce5983" },
  { episode: 217, title: "Nt Episod 217.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9cd66e979983cdce5984" },
  { episode: 218, title: "Nt Episod 218.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9cd76e979983cdce5985" },
  { episode: 219, title: "Nt Episod 219.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9cdb6e979983cdce5986" },
  { episode: 220, title: "Nt Episod 220.mp4", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/6acc9cdc6e979983cdce5987" }
];

// 2. Black Clover Episodes
const blackCloverEpisodes = [
  { episode: 1, title: "Black Clover Episode 1", url: "https://teraboxshare.com/s/1MnkiGCWy207764ewaAUeFw" },
  { episode: 2, title: "Black Clover Episode 2", url: "https://teraboxshare.com/s/1MnkiGCWy207764ewaAUeFw" },
  { episode: 3, title: "Black Clover Episode 3", url: "https://teraboxshare.com/s/15_tVldY5cV2ZHnPaKU4gEA" }
];

// 3. Malaysian Movies Database (Contoh)
const malaysianMoviesEpisodes = [
  { episode: 1, title: "Malaysian Movie 1", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/contohlink1" }
];

// 4. Anime & Animation (Doraemon, Shin Chan, Anak Anak Sidek, Hagemaru)
const animeAnimationEpisodes = [
  { episode: 1, title: "Anime & Animation Episode 1", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/contohlink2" }
];

// 5. Ustaz Wadi Kuliah / Ceramah
const ustazWadiEpisodes = [
  { episode: 1, title: "Ceramah Ustaz Wadi Episod 1", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/contohlink3" }
];

// 6. Kids Delight
const kidsDelightEpisodes = [
  { episode: 1, title: "Kids Delight Episod 1", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/contohlink4" }
];

// 7. Running Man
const runningManEpisodes = [
  { episode: 1, title: "Running Man Episode 1", url: "https://filestreambot-production-bef2.up.railway.app:8080/watch/contohlink5" }
];

// Manifest Endpoint (Semua katalog didaftarkan di sini)
app.get('/manifest.json', (req, res) => {
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

// Meta Endpoint (Maklumat poster & tajuk untuk setiap katalog)
app.get('/meta/:type/:id.json', (req, res) => {
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
      description: 'Asta and Yuno were abandoned at the same church and raised together, sharing a lifelong rivalry and dream.',
      genres: ['Anime', 'Action', 'Fantasy']
    },
    'malaysianmovies_catalog': {
      id: 'malaysianmovies_catalog',
      type: 'series',
      name: 'Malaysian Movies',
      poster: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg', // Ganti poster jika ada
      background: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
      description: 'Koleksi filem-filem Melayu dan drama pilihan.',
      genres: ['Local', 'Movies']
    },
    'animeanimation_catalog': {
      id: 'animeanimation_catalog',
      type: 'series',
      name: 'Anime & Animation',
      poster: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg', // Ganti poster jika ada
      background: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
      description: 'Doraemon, Shin Chan, Anak Anak Sidek, Hagemaru & banyak lagi.',
      genres: ['Animation', 'Kids', 'Anime']
    },
    'ustazwadi_catalog': {
      id: 'ustazwadi_catalog',
      type: 'series',
      name: 'Ustaz Wadi',
      poster: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg', // Ganti poster jika ada
      background: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
      description: 'Koleksi ceramah dan kuliah agama bersama Ustaz Wadi Anuar.',
      genres: ['Religion', 'Ceramah']
    },
    'kidsdelight_catalog': {
      id: 'kidsdelight_catalog',
      type: 'series',
      name: 'Kids Delight',
      poster: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg', // Ganti poster jika ada
      background: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
      description: 'Hiburan dan rancangan menarik khas untuk kanak-kanak.',
      genres: ['Kids', 'Family']
    },
    'runningman_catalog': {
      id: 'runningman_catalog',
      type: 'series',
      name: 'Running Man',
      poster: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg', // Ganti poster jika ada
      background: 'https://i.postimg.cc/vB6mWzW6/Naruto-DP.jpg',
      description: 'Variety show popular dari Korea Selatan, Running Man.',
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

// Stream Endpoint (Menghalakan kepada pautan video berdasarkan katalog)
app.get('/stream/:type/:id.json', (req, res) => {
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
  console.log(`Ultimate Add-on Server running on port ${PORT}`);
});
