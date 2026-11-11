"use strict";

const data = betloraReference;
const main = document.querySelector("main");
const menu = document.querySelector("#menu");
const number = new Intl.NumberFormat("tr-TR");
const art = "art/";
const catalog = "catalog/";
const esc = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[char]);

const paths = {
  home:"M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z",
  casino:"M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5z M8 8h.01M16 8h.01M12 12h.01M8 16h.01M16 16h.01",
  live:"M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z M10 9l5 3-5 3z",
  sports:"M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20 M12 7l4.5 3.2-1.7 5.3H9.2l-1.7-5.3L12 7z M12 2v5m-4.5 3.2L3 8.5m13.5 1.7L21 8.5m-6.2 7 2.7 4.5m-8.3-4.5L6.5 20",
  promo:"M4 11h16v10H4z M3 7h18v4H3z M12 7v14m0-14H8a2 2 0 1 1 2-2l2 2zm0 0h4a2 2 0 1 0-2-2l-2 2z",
  vip:"M3 8l4 3 5-7 5 7 4-3-2 11H5L3 8z",
  wheel:"M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20 M12 2v20M2 12h20m-17 7L19 5M5 5l14 14",
  trophy:"M7 3h10v7a5 5 0 0 1-10 0z M7 5H3v2a4 4 0 0 0 4 4m10-6h4v2a4 4 0 0 1-4 4m-5 4v5m-4 1h8",
  target:"M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20 M12 6a6 6 0 1 0 0 12 6 6 0 1 0 0-12 m0 4a2 2 0 1 0 0 4 2 2 0 1 0 0-4",
  profile:"M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2",
  help:"M3 13v-2a9 9 0 0 1 18 0v2m-18 0h3v5H3zm15 0h3v5h-3zm3 5v1a2 2 0 0 1-2 2h-5",
  search:"M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z M16 16l4 4",
  arrow:"M5 12h14m-5-5 5 5-5 5",
  right:"m9 6 6 6-6 6",
  menu:"M4 6h16M4 12h16M4 18h16",
  close:"m6 6 12 12M6 18 18 6",
  wallet:"M20 8H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z M4 8V6l13-3v5m4 4h-5v4h5",
  grid:"M3 3h7v7H3z m11 0h7v7h-7z M3 14h7v7H3z m11 0h7v7h-7z",
  heart:"M12 20 4.5 13A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7.5 5Z"
};

function icon(name) {
  return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[name]}"></path></svg>`;
}

const navGroups = [
  ["Keşfet", [["home","Ana Sayfa","home"],["casino","Casino","casino"],["live","Canlı Casino","live"],["sports","Spor","sports"],["providers","Sağlayıcılar","grid"]]],
  ["Betlora", [["promos","Promosyonlar","promo"],["vip","VIP Kulübü","vip"],["lottery","Piyango","trophy"],["wheel","Çark Çevir","wheel"],["tournaments","Turnuvalar","trophy"],["missions","Meydan Okumalar","target"],["poker","Poker","casino"],["zoom","Zoom","live"]]],
  ["Hesap ve destek", [["profile","Hesap","profile"],["help","Canlı Destek","help"]]]
];

const productLinks = {
  casino:"/tr/casino", live:"/tr/casino/live-casino/live-lobby", sports:"/tr/sportsbook", poker:"/tr/poker", zoom:"/tr/zoom",
  wheel:"/tr/wheel", missions:"/tr/casino/challenges", promos:"/tr/promotions", vip:"/tr/vip-club", blog:"/tr/blog"
};
const whatsapp = "https://wa.me/639751981909";
const supportMail = "support@globalbetlora.com";
const telegram = "https://t.me/betlora_tr";
const instagram = "https://www.instagram.com/betloraofficial/";

function brand() {
  return '<a href="#home" class="brand" aria-label="Betlora ana sayfa"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span><span>BETLORA<span class="brand-dot">.</span></span></a>';
}

function anchor(route, label, glyph, active = false) {
  return `<a class="nav-link" href="#${route}" ${active ? 'aria-current="page"' : ""}>${icon(glyph)}<span>${label}</span></a>`;
}

function sidebar(route) {
  return `<nav aria-label="Tüm bölümler">${navGroups.map(([name, items]) => `<div class="nav-group"><p>${name}</p>${items.map(([key,label,glyph]) => anchor(key,label,glyph,route === key)).join("")}</div>`).join("")}</nav>`;
}

function chrome(route) {
  document.querySelector("#header").innerHTML = `<div class="top-inner">${brand()}
    <nav class="top-links" aria-label="Ana gezinme">${navGroups[0][1].slice(1,4).map(([key,label,glyph]) => anchor(key,label,glyph,route === key)).join("")}</nav>
    <div class="top-actions"><span class="preview-label">Tasarım önizlemesi</span><a class="icon-button" href="#search" aria-label="Oyun ara">${icon("search")}</a>
    <a class="button small wallet" href="#profile/wallet" aria-label="Cüzdan">${icon("wallet")} <span>Cüzdan</span></a><a class="icon-button" href="#profile" aria-label="Hesap">${icon("profile")}</a></div></div>`;
  document.querySelector("#sidebar").innerHTML = sidebar(route);
  document.querySelector("#mobile-nav").innerHTML = `${anchor("home","Ana Sayfa","home",route === "home")}${anchor("casino","Casino","casino",route === "casino")}${anchor("live","Canlı","live",route === "live")}${anchor("sports","Spor","sports",route === "sports")}<button class="nav-link" data-open-menu>${icon("menu")}<span>Menü</span></button>`;
  menu.innerHTML = `<div class="menu-title">${brand()}<form method="dialog"><button class="icon-button" aria-label="Menüyü kapat">${icon("close")}</button></form></div>${sidebar(route)}`;
}

const button = (to, label, style = "") => `<a class="button ${style}" href="${to}">${label}${icon("arrow")}</a>`;
const link = (to, label) => `<a class="text-link" href="${to}">${label}${icon("arrow")}</a>`;
const source = (route, label = "Mevcut sayfayı aç") => button(data.origin + route, label, "outline");
const header = (title, sub = "") => `<div class="page-head">${link("#home","Ana Sayfa")}<h1>${title}</h1>${sub ? `<p>${sub}</p>` : ""}</div>`;
const titleRow = (title, to, label) => `<div class="section-head"><h2>${title}</h2>${to ? link(to,label) : ""}</div>`;
const img = (src, eager = false) => `<img src="${src}" alt="" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
const chips = (items, active) => `<div class="chips" aria-label="Filtreler">${items.map(([id,label,to]) => `<a class="chip" href="${to}" ${active === id ? 'aria-current="true"' : ""}>${label}</a>`).join("")}</div>`;

function gameCard(game) {
  return `<a href="#game/${game.id}" class="game-card"><div class="game-img">${img(catalog+game.asset)}<span aria-hidden="true">${icon("arrow")}</span></div>
    <div class="game-name"><strong>${game.title}</strong><small>${game.provider || game.category}</small></div></a>`;
}

function artCard(image, label, to, tone) {
  return `<a class="art-card ${tone || ""}" href="${to}">${img(image)}<span>${label}</span><span class="art-arrow">${icon("arrow")}</span></a>`;
}

function promotionCard(promo, featured = false) {
  return `<a href="#promo/${promo.id}" class="promo-card ${featured ? "featured" : ""}">${img(catalog+"promotion/"+promo.id+".jpg")}
    <div class="promo-info"><small>${promo.category}</small><h3>${promo.title}</h3><span>Koşulları incele ${icon("arrow")}</span></div></a>`;
}

function home() {
  return `<section class="hero"><div class="hero-image"></div><div class="hero-copy">
      <h1>Casino. Spor. <br><em>Betlora.</em></h1>
      <div class="hero-actions">${button("#casino","Casino")}${button("#sports","Spor","outline")}</div>
    </div><div class="hero-side">${link("#promo/111-freespin-deneme-bonusu","111 Freespin Deneme Bonusu")}</div></section>
    <div class="quick-links">
      ${[["live","Canlı Casino","live"],["lottery","Piyango","trophy"],["wheel","Çark Çevir","wheel"],["vip","VIP Kulübü","vip"],["profile/wallet","Cüzdan","wallet"]].map(([key,label,glyph])=>`<a href="#${key}">${icon(glyph)}<span>${label}</span>${icon("right")}</a>`).join("")}
    </div>
    <section class="shelf">${titleRow("Popüler Slot Oyunları","#casino","Tümünü gör")}<div class="games home-games">${data.games.slice(0,6).map(gameCard).join("")}</div></section>
    <section class="shelf">${titleRow("Canlı Casino","#live","Tümünü gör")}<div class="live-strip">${data.live.map(item=>artCard(catalog+"live/"+item.id+".jpg",item.title,"#live/"+item.id)).join("")}</div></section>
    <div class="editorial-split"><section>${titleRow("Promosyonlar","#promos","Tümünü gör")}<div class="two-promos">${[data.promotions[0],data.promotions[9]].map(p=>promotionCard(p)).join("")}</div></section>
      <section>${titleRow("VIP Kulübü")} ${artCard(art+"vip-medallion.jpg","Seviyeleri incele","#vip","vip-tile")}</section></div>
    <section class="shelf">${titleRow("Spor","#sports","Spor lobisi")}<div class="sport-shortcuts">${data.sports.map(([id,label])=>anchor("sports/"+id,label,"sports")).join("")}</div></section>
    <section class="shelf">${titleRow("Canlı Kazançlar")}<div class="quiet-panel"><p>Güncel akış mevcut Betlora’da görüntülenir.</p>${link(data.origin+"/tr","Betlora ana sayfası")}</div></section>
    <section class="shelf">${titleRow("Sağlayıcılar","#providers","Tümünü gör")}${providerGrid(data.providers.slice(0,6))}</section>`;
}

function gameSearch(query, provider) {
  return `<form id="game-search" class="filters" role="search">
    <label class="search-field">${icon("search")}<input id="query" name="query" placeholder="Oyun ara" aria-label="Oyun ara" value="${esc(query)}"></label>
    <label><span class="sr-only">Sağlayıcı</span><select name="provider"><option value="">Tüm sağlayıcılar</option>${[...new Set(data.games.map(game=>game.provider).filter(Boolean))].map(item=>`<option ${provider===item?"selected":""}>${item}</option>`).join("")}</select></label><button class="button small" type="submit">Ara</button>
    </form>`;
}

function casino(route, params) {
  const query = params.get("q") || "";
  const provider = params.get("p") || "";
  const favorites = route === "favorites";
  const games = data.games.filter(game =>
    (!favorites || favoriteIds.has(game.id)) && (!provider || provider === game.provider) &&
    game.title.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr"))
  );
  return `${header({casino:"Casino",search:"Oyun Ara",slots:"Slot Lobisi",favorites:"Favoriler"}[route], "Betlora kataloğundan tarihli seçki")}
    ${chips([["casino","Casino","#casino"],["slots","Slot Lobisi","#slots"],["favorites","Favoriler","#favorites"],["providers","Sağlayıcılar","#providers"]],route)}
    ${gameSearch(query,provider)}<div class="section-head"><h2>${favorites?"Favori oyunlar":"Oyunlar"}</h2><small>${games.length} sonuç</small></div>
    ${games.length ? `<div class="games">${games.map(gameCard).join("")}</div>` : `<div class="quiet-panel"><p>${favorites ? "Henüz favori oyun yok." : "Aramanıza uygun oyun bulunamadı."}</p>${link("#casino","Casino lobisine dön")}</div>`}`;
}

function gameDetail(id) {
  const game = data.games.find(item=>item.id===id);
  if (!game) return missing();
  const favorite = favoriteIds.has(id);
  return `${header(game.title,game.provider)}<div class="detail-layout">
    <div class="detail-art">${img(catalog+game.asset,true)}</div>
    <div class="detail-body"><h2>Oyun bilgisi</h2><dl><div><dt>Tür</dt><dd>${game.category}</dd></div>${game.provider?`<div><dt>Sağlayıcı</dt><dd>${game.provider}</dd></div>`:""}</dl>
    <button class="button outline" data-favorite="${id}" aria-pressed="${favorite}">${icon("heart")}${favorite?"Favorilerden çıkar":"Favorilere ekle"}</button>
    ${link("#casino","Casino lobisine dön")}</div></div>`;
}

function live(id) {
  const item = data.live.find(entry=>entry.id===id);
  return `${header(item ? item.title : "Canlı Casino")}
    ${chips([["","Tümü","#live"],...data.live.map(entry=>[entry.id,entry.title,"#live/"+entry.id])],id)}
    ${item ? `<div class="detail-layout"><div class="detail-art wide">${img(catalog+"live/"+item.id+".jpg",true)}</div><div class="detail-body"><h2>${item.title}</h2><p>Canlı masa listesi mevcut sağlayıcı ekranında görüntülenir.</p>${source(item.path,"Canlı Casino sayfası")}</div></div>` : `<div class="live-grid">${data.live.map(entry=>artCard(catalog+"live/"+entry.id+".jpg",entry.title,"#live/"+entry.id)).join("")}</div>`}`;
}

function providerGrid(providers) {
  return `<div class="provider-grid">${providers.map(([key,name])=>`<a href="#providers/${key}">${esc(name)}${icon("right")}</a>`).join("")}</div>`;
}

function providers(id, params) {
  const query = params.get("q") || "";
  const current = data.providers.find(([key])=>key===id);
  const shown = data.providers.filter(([key,name])=>`${key} ${name}`.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr")));
  if (current) {
    const games = data.games.filter(game=>game.provider===current[1]);
    return `${header(esc(current[1]))}${games.length ? `<div class="games">${games.map(gameCard).join("")}</div>` : '<p>Bu sağlayıcının oyunları yerel seçkide yer almıyor.</p>'}${link("#providers","Sağlayıcılar")}`;
  }
  return `${header("Sağlayıcılar")}<form id="provider-search" class="filters" role="search"><label class="search-field">${icon("search")}<input name="query" aria-label="Sağlayıcı ara" placeholder="Sağlayıcı ara" value="${esc(query)}"></label><button class="button small">Ara</button></form>
    ${shown.length ? providerGrid(shown) : '<div class="quiet-panel"><p>Sağlayıcı bulunamadı.</p></div>'}`;
}

function sports(id) {
  const current = data.sports.find(([key])=>key===id);
  return `${header(current ? current[1] : "Spor")}
    <div class="sports-banner">${img(art+"sports.jpg",true)}<div><h2>Spor Bahisleri</h2>${source(productLinks.sports,"Mevcut spor lobisi")}</div></div>
    <div class="sports-layout"><nav aria-label="Spor dalları">${data.sports.map(([key,label])=>anchor("sports/"+key,label,"sports",id===key)).join("")}</nav>
    <section class="quiet-panel"><h2>${current ? current[1] : "Karşılaşmalar"}</h2><p>Karşılaşmalar, oranlar ve kupon sağlayıcının spor ekranında görüntülenir.</p></section></div>`;
}

function promos(id) {
  const inactive = id === "inactive";
  return `${header("Promosyonlar")}${chips([["","Tümü","#promos"],["active","Aktif","#promos/active"],["inactive","Pasif","#promos/inactive"]],id)}
    ${inactive ? '<div class="quiet-panel"><h2>Pasif kampanya bulunamadı</h2><p>11 Kasım 2026 tarihli katalog görünümü.</p></div>' : `<div class="promos-grid">${data.promotions.map((promo,index)=>promotionCard(promo,index===0)).join("")}</div>`}`;
}

function promoDetail(id) {
  const promo = data.promotions.find(item=>item.id===id);
  if (!promo) return missing();
  return `${header(promo.title,promo.category)}<div class="detail-layout promo-detail">
    <div class="detail-art wide">${img(catalog+"promotion/"+promo.id+".jpg",true)}</div>
    <div class="detail-body"><h2>Kampanya koşulları</h2><p>11 Kasım 2026 tarihli detaydan alınan özet.</p><ul class="rules">${promo.facts.map(fact=>`<li>${esc(fact)}</li>`).join("")}</ul>
    ${source(promo.path,"Tam koşulları gör")}</div></div>`;
}

function vip() {
  return `${header("VIP Kulübü")}<div class="vip-hero">${img(art+"vip-medallion.jpg",true)}<div><h2>VIP seviyeleri</h2><p>Paket A denetiminde kaydedilen 13 seviye</p>${source(productLinks.vip,"Mevcut VIP Kulübü")}</div></div>
    <section class="shelf">${titleRow("Seviyeleri karşılaştır")}
    <div class="table-scroll"><table><thead><tr><th scope="col">Seviye</th><th scope="col">Çevrim</th><th scope="col">Hediye</th><th scope="col">Reload</th></tr></thead><tbody>
    ${data.vip.map(([name,turnover,gift,reload])=>`<tr><th scope="row"><span class="rank">${icon("vip")}</span>${name}</th><td>${number.format(turnover)}</td><td>${number.format(gift)}</td><td>${number.format(reload)}</td></tr>`).join("")}</tbody></table></div></section>`;
}

function activity(route,id) {
  const title = {wheel:"Çark Çevir",tournaments:"Turnuvalar",missions:"Meydan Okumalar",lottery:"Piyango"}[route];
  if (route==="lottery") return promoDetail("betlora-piyango");
  const filters = route==="wheel" ? [["","Normal Çark"],["vip","VIP Çark"]] : route==="tournaments" ?
    [["","Tümü"],["active","Aktif"],["past","Geçmiş"]] : [["","Tümü"],["done","Tamamlanan"],["open","Tamamlanmayan"]];
  return `${header(title)}${chips(filters.map(([key,label])=>[key,label,"#"+route+(key?"/"+key:"")]),id)}
    ${route==="wheel" ? `<div class="detail-layout"><div class="detail-art wide">${img(art+"wheel.jpg",true)}</div><div class="detail-body"><h2>${id==="vip"?"VIP Çark":"Normal Çark"}</h2>${link("#promo/betlora-wheel-of-fortune-for-each-500-try-deposit","Kampanya koşulları")} ${source(productLinks.wheel,"Mevcut çark sayfası")}</div></div>` :
    route==="tournaments" ? '<div class="quiet-panel"><h2>Turnuva bulunamadı</h2><p>Denetim sırasında bu listede kayıt görülmedi.</p></div>' :
    `<div class="quiet-panel"><h2>Görev durumu</h2><p>Görev ve ilerleme bilgisi hesapla ilişkilidir.</p>${source(productLinks.missions,"Mevcut görev sayfası")}</div>`}`;
}

const accountLinks = [
  ["wallet","Cüzdan","wallet"],["convert","Paranı Dönüştür","wallet"],["transactions","İşlemler","grid"],["bets","Bahislerim","sports"],
  ["code","Bonus Kodu","promo"],["request","Bonus Talebi","promo"],["settings","Ayarlar","profile"]
];

function profile(id) {
  const section = accountLinks.find(([key])=>key===id);
  return `${header(section ? section[1] : "Hesap")}
    ${section ? `<div class="quiet-panel"><h2>${section[1]}</h2><p>Bu hesap ekranı mevcut Betlora oturumuna bağlıdır.</p>${link("#profile","Hesap menüsü")}</div>` : `<div class="account-layout">
    <section class="account-main"><div class="account-hero">${icon("wallet")}<div><h2>Cüzdan</h2><p>Bakiye ve işlem bilgileri Betlora hesabında görüntülenir.</p></div>${button("#profile/wallet","Cüzdan")}</div>
    <h2>Hesap işlemleri</h2><div class="account-rows">${accountLinks.slice(1).map(([key,label,glyph])=>anchor("profile/"+key,label,glyph)).join("")}</div></section>
    <aside class="account-aside"><h2>VIP Kulübü</h2>${artCard(art+"vip-medallion.jpg","VIP seviyeleri","#vip","vip-tile")}${button("#help","Canlı Destek","outline")}</aside></div>`}`;
}

const helpTitles = {faq:"Sık Sorulan Sorular",legal:"Yasal Bilgiler",privacy:"Gizlilik",responsible:"Sorumlu Oyun"};

function help(id) {
  if (id === "blog") return `${header("Blog")}<div class="quiet-panel"><p>Mevcut Blog bağlantısı denetimde ana sayfaya yönlendi.</p>${link("#help","Destek kanalları")}</div>`;
  if (Object.hasOwn(helpTitles,id)) return `${header(helpTitles[id])}<div class="quiet-panel"><p>Bu alan için yayınlanabilir içerik doğrulaması bekleniyor.</p>${link("#help","Destek kanalları")}</div>`;
  return `${header("Yardım ve Destek")}<div class="help-grid">
    <section class="help-card"><span>${icon("help")}</span><h2>Canlı Destek</h2><p>Mevcut Betlora menüsünden açılır.</p>${source("/tr","Betlora’ya git")}</section>
    <section class="help-card"><span>${icon("profile")}</span><h2>WhatsApp</h2><p>Mevcut üye menüsündeki iletişim bağlantısı.</p>${button(whatsapp,"WhatsApp","outline")}</section>
    <section class="help-card"><span>${icon("help")}</span><h2>E-posta</h2>${button("mailto:"+supportMail,supportMail,"outline")}</section>
    <section class="help-card"><span>${icon("grid")}</span><h2>Bilgi Merkezi</h2><div class="help-links">${link("#help/faq","Sık Sorulan Sorular")}${link("#help/legal","Yasal Bilgiler")}${link("#help/privacy","Gizlilik")}${link("#help/responsible","Sorumlu Oyun")}${link("#help/blog","Blog")}</div></section>
    </div>`;
}

function footer() {
  const groups = [["Ürünler",[["casino","Casino"],["live","Canlı Casino"],["sports","Spor"],["providers","Sağlayıcılar"]]],["Betlora",[["promos","Promosyonlar"],["vip","VIP Kulübü"],["lottery","Piyango"],["wheel","Çark Çevir"]]],["Yardım",[["help","Canlı Destek"],["help/faq","Sık Sorulan Sorular"],["help/legal","Yasal Bilgiler"],["help/privacy","Gizlilik"],["help/responsible","Sorumlu Oyun"],["help/blog","Blog"]]]];
  return `<footer><div class="footer-grid"><div class="footer-brand">${brand()}<a href="mailto:${supportMail}">${supportMail}</a><div class="social-links"><a href="${telegram}">Telegram</a><a href="${instagram}">Instagram</a><a href="${whatsapp}">WhatsApp</a></div></div>
    ${groups.map(([name,items])=>`<div><h2>${name}</h2>${items.map(([route,label])=>`<a href="#${route}">${label}</a>`).join("")}</div>`).join("")}
    </div><div class="footer-end"><span>© Betlora</span><span>Yerel tasarım önizlemesi · 11 Kasım 2026</span></div></footer>`;
}

function missing() {
  return `${header("Sayfa bulunamadı")}${button("#home","Ana Sayfa")}`;
}

const favoriteIds = new Set();
function currentRoute() {
  const [path, search=""] = location.hash.slice(1).split("?");
  const [route="home", id=""] = (path || "home").split("/");
  return { route, id, params:new URLSearchParams(search) };
}

function render(moveFocus = false) {
  const {route,id,params} = currentRoute();
  const views = {
    home, casino:()=>casino(route,params), slots:()=>casino(route,params), search:()=>casino(route,params), favorites:()=>casino(route,params),
    game:()=>gameDetail(id), live:()=>live(id), providers:()=>providers(id,params), sports:()=>sports(id),
    promos:()=>promos(id), promo:()=>promoDetail(id), vip, profile:()=>profile(id), help:()=>help(id),
    wheel:()=>activity(route,id), tournaments:()=>activity(route,id), missions:()=>activity(route,id), lottery:()=>activity(route,id),
    poker:()=>header("Poker")+source(productLinks.poker), zoom:()=>header("Zoom")+source(productLinks.zoom)
  };
  const active = {game:"casino",promo:"promos",slots:"casino",search:"casino",favorites:"casino"}[route] || route;
  chrome(active);
  main.innerHTML = `<div class="content">${Object.hasOwn(views,route) ? views[route]() : missing()}${footer()}</div>`;
  document.title = `${main.querySelector("h1").textContent.trim()} · Betlora V2`;
  if (moveFocus) {
    window.scrollTo(0,0);
    main.focus({preventScroll:true});
  }
}

document.addEventListener("click", event => {
  if (event.target.closest(".skip")) {
    event.preventDefault();
    main.focus();
  }
  if (event.target.closest("[data-open-menu]")) menu.showModal();
  if (event.target.closest("dialog a")) menu.close();
  const button = event.target.closest("[data-favorite]");
  if (button) {
    const id = button.dataset.favorite;
    if (favoriteIds.has(id)) favoriteIds.delete(id); else favoriteIds.add(id);
    const favorite = favoriteIds.has(id);
    button.setAttribute("aria-pressed",String(favorite));
    button.innerHTML = icon("heart") + (favorite ? "Favorilerden çıkar" : "Favorilere ekle");
  }
});

document.addEventListener("submit", event => {
  const form = event.target;
  if (!["game-search","provider-search"].includes(form.id)) return;
  event.preventDefault();
  const values = new FormData(form);
  const params = new URLSearchParams();
  if (values.get("query").trim()) params.set("q",values.get("query").trim());
  if (values.get("provider")) params.set("p",values.get("provider"));
  const current = currentRoute().route;
  const route = form.id === "provider-search" ? "providers" : current;
  const query = params.size ? "?" + params : "";
  location.hash = route + query;
});
window.addEventListener("hashchange",()=>render(true));
render();
