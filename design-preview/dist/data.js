"use strict";

const betloraReference = (() => {
  const origin = "https://betlora305.com";
  const media = "https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab";
  const standard = "kjaflkjqnlkwAqwrjqkldkljgq";
  const gamesArchive = "Jgaqgjklsdgjklqwetklfhjk";
  const date = "11 Kasım 2026";

  const promotions = [
    ["300-hos-geldin-bonusu", "%300 Hoş Geldin Bonusu", "Casino", "xWuxY77fhR9drYjfNthNNpxq1xktXGUX48cjZ3id", ["İlk üç yatırımın her biri için %100", "Yatırım tutarı: 1.000–10.000 TL", "TRY yatırımı ve slot oyunları. Talep kanalı: Canlı Destek.", "3×3, beş ödeme çizgili oyunlar hariç. Azami çekim 10×.", "Çevrim bitmeden oyun değiştirilirse kazanç iptal edilir. Aktif bahis olmamalıdır ve kayıp bonusuyla birleştirilemez."]],
    ["ilk-yatiriminiza-ozel-100-kayip-bonusu", "İlk Yatırımınıza Özel %100 Kayıp Bonusu", "Casino", "A7WmlmESNMIBnzO5Zq3PzIxkDUoayQaQsUcpvnt5", ["İlk yatırıma özel", "Azami yatırım 1.000 TL", "Talep, kayıptan sonra alınır."]],
    ["111-freespin-deneme-bonusu", "111 Freespin Deneme Bonusu", "Casino", "qTCv3zKXMVXorUiRnW3rROYQmqEsAypzWySicwNP", ["15 Ekim 2026 ve sonrasında kayıt olan üyeler", "KYC 1 ve telefon doğrulaması; IP başına tek kullanıcı", "Starlight Princess, Gates of Olympus ve Sweet Bonanza. Dönüş değeri 1 TL.", "Detay sayfasına göre 1.000 TL freespin bakiyesine ulaşıldığında 1.000 TL yatırım koşuluyla toplam 2.000 TL havale çekimi yapılabilir."]],
    ["betlora-da-5-yatirim-bizden-hediye", "5. Yatırım Bizden Hediye", "Casino", "rdcOqoKRTSQg84FJvh4HvSp1zCWXM1uktC2d0GpL", ["4 yatırım, 1 hediye", "Hesaplama ve kullanım kuralları kampanya detayında."]],
    ["10-cekim-sinirsiz-yatirim-bonusu", "Çekim Sınırsız Nakit Hediye", "Casino ve Spor", "Oo5RYfcyjWFMFHzuRaaE6Sr3wxQi5TFB7zQtHfcC", ["Slot, canlı casino ve spor", "Detay ekranında 1.000 TL alt sınırı, 10.000 TL ve 1x / 3x değerleri listeleniyor."]],
    ["30-vip-kayip-bonusu", "%30’a Varan VIP Kayıp Bonusu", "VIP", "VrSLtelmoLHPfiCQnBPAcIVkmzUfAXZc6J7x3vOA", ["Bonus detayları", "Çekim şartları", "Genel kurallar"]],
    ["10-weekly-loss-bonus", "%10 Haftalık Kayıp Bonusu", "Casino", "eLjcdbCkBOgD09u60GBLhD7xghUGtsRR0AwrqFb5", ["Kartta pazartesi talebi ve 10.000 TL’ye kadar geri ödeme belirtiliyor.", "Çekim şartları ve genel kurallar"]],
    ["betlora-wheel-of-fortune-for-each-500-try-deposit", "Her 500 TL Yatırıma Çark Kodu", "Etkinlik", "e2MlC2U5Mm3KziH6pbVOaXsY3R2sSyjtiBDO1yzH", ["Bonus detayları ve çekim koşulları", "Panel denetiminde başlangıç ve bitiş tarihi geçersiz göründü."]],
    ["betlora-happy-hours-yatirimlariniz-2x-degerli", "Betlora Happy Hours", "Etkinlik", "rbRRFpzyvBo3LbKhzwLN7hSV2LUk3oOiPMrlli9o", ["Detay ekranında Perşembe aktifliği belirtiliyor.", "Yatırıma göre hak, çekim şartları ve genel kurallar"]],
    ["ertesi-gun-freespin", "Ertesi Gün Freespin", "Casino", "8Wo5U70CkInavlHHGT2GnC1a7gWOaip6V8tJSpnZ", ["İki yatırım dilimi: 500–4.999 TL ve 5.000 TL ve üzeri", "Çekim ve oyun şartları"]],
    ["dogum-gunu-bonusu", "Doğum Günü Bonusu", "Casino", "PFbOEGjZbdtrNT1zBkPncapudv7UKOWFTXRAnJu0", ["Bonus detayları", "Çekim şartları", "Genel kurallar"]],
    ["betlora-vip-club", "Betlora VIP Kulübü", "VIP", "IswluobDDBonnft25U6KpU0bbYyHNMhXVLM9Oo1u", ["Seviye tablosu", "Seviye atlama, ödüller ve çekim limitleri"]],
    ["etkinlik-kural-sartlari", "Etkinlik Kural ve Şartları", "Etkinlik", "uz4oRXBp8HQ6aPk1rf97m6LGZGjJz6BguQFueE1P", ["Freespin kullanım şartları", "Nakit ödül şartları"]],
    ["betlora-piyango", "Betlora Piyango", "Etkinlik", "pOWWPTTd6Z6ROSmkwtme1JuJfFsOL7iJtm0APqZO", ["Başarıyla tamamlanan her 1.000 TL yatırım için bir çekiliş bileti", "Altı haneli bilet numaraları", "Detay sayfasında toplam 250.000 TL nakit ödül listeleniyor."]],
  ].map(([id, title, category, file, facts]) => ({
    id, title, category, facts, path: "/tr/promotions/" + id, media: `${media}/${standard}/promotions/${file}.png`, asset: `promotion/${id}.png`,
  }));

  const games = [
    ["pragmaticplay-saray-ruyasi", "Saray Rüyası", "Pragmatic Play", gamesArchive, "eFtR24r3zmFNp7BzZ7yKrGjlWh9dd9fIKygBlSXf.png", "Slot"],
    ["pragmaticplay-sweet-bonanza", "Sweet Bonanza", "Pragmatic Play", standard, "PH37c31el1Lf9VNAFsMO94c88WDJbNale1AIwkot.webp", "Slot"],
    ["pragmaticplay-sweet-bonanza-1000", "Sweet Bonanza 1000", "Pragmatic Play", standard, "8bTOrKYQ5yf3zEROmnTNZWoF4el7Y9kzgAhnhSRV.webp", "Slot"],
    ["pragmaticplay-sugar-rush-1000", "Sugar Rush 1000", "Pragmatic Play", gamesArchive, "ifWjg9fVkklsvM3BRuhrvRCMW2YaCR0N2tlcddfZ.jpg", "Slot"],
    ["EGTInteractive-40-lucky-king-bell-link", "40 Lucky King Bell Link", "EGT Interactive", "gXmqkthvbB1521K", "XjTKms8rJ7J10xjQMIXCqqyZDzyyqLYEDohSXifV.png", "Slot", "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab"],
    ["lucky-penny", "Lucky Penny", "Lucky", gamesArchive, "CmHN8ad4pFAIaDv52taZszu8Gy86eHWFL0WkKAKw.png", "Slot"],
    ["15-dragon-pearls", "15 Dragon Pearls", "", gamesArchive, "vU8FwK61bBVzhe4IhkskYeD27D0BeLfBNYfN6m8B.png", "Slot"],
    ["redtiger-cash-volt", "Cash Volt", "Red Tiger", gamesArchive, "j2jpFJuZg2gF9QSA7c5DOJS0YlxhFPSqNwmgmV63.avif", "Slot"],
  ].map(([id,title,provider,bucket,file,category,base=media])=>({
    id,title,provider,category,path:"/tr/games/"+id,media:`${base}/${bucket}/games/${file}`,asset:`game/${id}.${file.split(".").at(-1)}`,
  }));

  const live = [
    ["popular-live-casino-games","Popüler","29v2omHlkUnht56BTfwjGZFmVA9nWXMu6UyyiBS3"],
    ["ezugi","Ezugi","yluGw8bmaME96dP0TrVwzv43dD7JacVK8CwaaghS"],
    ["blackjack","Blackjack","121IF3pfe0MtycibK576lY9hyAQkJgkeusMqEeRN"],
    ["game-show","Oyun Şovları","fM4A44FoZN38Uw0S4Psa7Xvp4u2pJ1fddIXHqpsB"],
    ["rulet","Rulet","VDN6RcWzXKj2R73C0qAVYZlm0kPKndYWO5iZyc57"],
  ].map(([id,title,file])=>({id,title,path:"/tr/casino/live-casino/"+id,media:`${media}/${standard}/promotions/${file}.png`,asset:`live/${id}.png`}));

  const providers = [
    ["pragmaticplay","Pragmatic Play"],["evolution","Evolution"],["pragmaticlive","Pragmatic Live"],["hacksaw","HackSaw Gaming"],
    ["EGTInteractive","EGT"],["nolimitcity","No Limit City"],["netent","NetEnt"],["ezugi","Ezugi"],["egt-interactive","Amusnet"],
    ["1x2gaming","1x2 Gaming"],["5men","5men"],["alg","Absolutely Live Gaming"],["endorphina","Endorphina"],["mrslotty","MrSlotty"],
    ["redtiger","Red Tiger"],["bgaming","BGAMING"],["booming","Booming Games"],["3oaks","3oaks (Booongo)"],["avatarux","AvatarUX"],
    ["beterlive","Beter.Live"],["evoplay","Evoplay Entertainment"],["fazi","Fazi"],["gamebeat","Gamebeat"],["gamzix","Gamzix"],
  ];
  const providerCodes = `mascotgaming mancala mplay netgame novomatic onlyplay platipus popiplay smartsoft everymatrix spribe truelab
    turbogames zillion betsoft ctgaming habanero livegames redrake sagaming spinomenal yggdrasil pgsoft irondog givme fugaso tvbet galaxys
    imagine-live inout peter-and-sons popok poker-klas iconic21-slots hubgaming 7777 abracadabra advant-play airdice altente amigogaming
    apparat armadillostudios barbara-bang bfgames bigpot bigtimegaming-gh caletagaming cpgames creedroomz eezecasino elcasino fbastards
    funkygames hotdog iconic21 jetx kendoo macaw micro-gaming onegame pascalgaming platingaming redstone retrogames simpleplay skywind
    spearhead spinlogic tiptop vivo avigroup yoriginal-games`.trim().split(/\s+/);
  providers.push(...providerCodes.map(code=>[code,code]));

  const homeOnlyPromotions = [
    ["50-egt-yatirim-bonusu","%50 EGT Yatırım Bonusu"],
    ["ilk-3-yatiriminiza-ozel-300-kayip-bonusu","%300 İlk Kayıp"],
    ["betlora-hep-yaninda-freespin-bonusu","Betlora Hep Yanında"],
    ["20-cekim-sinirsiz-yatirim-bonusu","%20 Çekim Sınırsız Yatırım Bonusu"],
    ["444-freespin-deneme-bonusu","444 Freespin Deneme Bonusu"],
    ["betlora-ucma-zamani","Betlora Uçma Zamanı"],
    ["telegram-takip-bonusu","Telegram Takip Bonusu"],
    ["betlora-doping","Betlora Doping"],
    ["gece-yildizi-30-yatirim-bonusu","Gece Yıldızı %30 Yatırım Bonusu"],
  ];
  const vip = [
    ["Seed",0,0,0],["Spark",6000,20,0],["Pulse",12000,30,0],["Edge",28000,40,0],["Veil",60000,50,0],
    ["Flux",120000,80,50],["Aura",150000,100,75],["Fang",250000,135,100],["Core",500000,150,150],["Myth",750000,180,200],
    ["Royale",1000000,200,250],["Eternum",1500000,250,500],["BetloraPrime",3000000,1000,1000],
  ];
  const sports = [
    ["football","Futbol"],["basketball","Basketbol"],["american-football","Amerikan Futbolu"],["baseball","Beyzbol"],
    ["tennis","Tenis"],["volleyball","Voleybol"],
  ];
  return { origin,date,games,promotions,live,providers,vip,sports,homeOnlyPromotions };
})();
