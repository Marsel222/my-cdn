/* casino-new.js — CLEAN STARTER + ALL / MOST LIKED / MOST POPULAR / HIGH RTP / JACKPOT / BUY BONUS / FISH & HUNTING / MEGAWAYS / DROPS & WINS GAMES (IMAGE ONLY GRID)Fırst
 */
(function () {
  ("use strict");

  // -----------------------------
  // Config
  // -----------------------------
  const CONFIG = {
    casinoPaths: ["/casino"],
    rootClass: "casino-new-root",
    mountSelector: "#main__content",

    api: {
      url: "https://api1.jukd049944jdjdh333ikslisspoelerss44shh334opodjd4ssd.com/api/player/public/games/group/casino",
      payload: { language: "tr" },
    },

    providersApi: {
      url: "https://api1.jukd049944jdjdh333ikslisspoelerss44shh334opodjd4ssd.com/api/player/public/providers/index",
      payload: { type: null },
    },

    games2Base:
      "https://api1.jukdkdjruf33434hhdshh334opodjd4ssd.com/api/player/public",

    searchApi: {
      url: "https://api1.jukdkdjruf33434hhdshh334opodjd4ssd.com/api/player/public/games2/search",
      rt: "1744988812",
    },
  };

  const AppState = {
    currentRoute: null,
    activeTab: "all",
    lastTabBeforeProvider: "all",
    isRendered: false,

    allGames: null,
    allLoading: false,

    likedGames: null,
    likedLoading: false,

    popularGames: null,
    popularLoading: false,

    rtpGames: null,
    rtpLoading: false,

    jackpotGames: null,
    jackpotLoading: false,

    buyBonusGames: null,
    buyBonusLoading: false,

    fishGames: null,
    fishLoading: false,

    megawaysGames: null,
    megawaysLoading: false,

    dropsWinsGames: null,
    dropsWinsLoading: false,

    // Search
    searchQuery: "",
    searchDebounce: null,

    // Providers
    providers: null,
    providersLoading: false,
    selectedProvider: null, // {id, identifier, name, image}
    providerSearchQuery: "",

    // yarış engeli
    requestId: 0,
    providersRequestId: 0,

    // ✅ provider oyun cache + promise (aynı anda 2 fetch olmasın)
    providerGamesCache: Object.create(null), // key: provId -> { games, keys, promise }

    pragmaticGroupGames: null,
    pragmaticGroupLoading: false,

    vipBellGames: null,
    vipBellLoading: false,
  };

  // -----------------------------
  // Tabs
  // -----------------------------
  const TABS = [
    {
      key: "all",
      label: "Tüm Oyunlar",
      icon: "https://cdn.betpirmedia.com/casino/all/slot.png",
      slug: "all-games",
    },
    {
      key: "liked",
      label: "En Beğenilen Oyunlar",
      icon: "https://cdn.betpirmedia.com/casino/favorite/favorite.png",
      slug: "most-liked-games",
    },
    {
      key: "popular",
      label: "En Popüler Oyunlar",
      icon: "https://cdn.betpirmedia.com/casino/popular/popular.png",
      slug: "most-popular-games",
    },
    {
      key: "rtp",
      label: "Yüksek RTP",
      icon: "https://cdn.betpirmedia.com/casino/rtp/rtp.png",
      slug: "high-rtp",
    },
    {
      key: "vipBell",
      label: "VIP Bell Link",
      icon: "https://cdn.betpirmedia.com/casino/bell/bell.png",
      // slug: "vi̇p-bell-li̇nk",
      slug: "vip-bell-link",
    },
    {
      key: "jackpot",
      label: "Jackpot Oyunları",
      icon: "https://cdn.betpirmedia.com/casino/jackpot/jackpot.png",
      slug: "jackpot-games",
    },
    {
      key: "buyBonus",
      label: "Bonus Satın Al",
      icon: "https://cdn.betpirmedia.com/casino/buy-bonus/buy-bonus.png",
      slug: "bonus-buy-games",
    },
    {
      key: "fish",
      label: "Balık ve Av Oyunları",
      icon: "https://cdn.betpirmedia.com/casino/fish/fish.png",
      slug: "fish-and-hunting-games",
    },
    {
      key: "megaways",
      label: "Megaways Oyunları",
      icon: "https://cdn.betpirmedia.com/casino/megaways/megaways.png",
      slug: "megaways-games",
    },
    {
      key: "dropsWins",
      label: "Drops & Wins",
      icon: "https://cdn.betpirmedia.com/casino/drops-and-wins/bomb.png",
      slug: "drops-wins-games",
    },
  ];

  // -----------------------------
  // Helpers
  // -----------------------------
  // ✅ provider.identifier -> group slug mapping (senin verdiğin kesin değerler)
  // ✅ Casino desktop'ta sidebar'ı site'nin kendi mekanizmasıyla açtır

  const PROVIDER_IMAGE_OVERRIDE = {
    relaxgaming: "https://cdn.betpirmedia.com/casino/providers/relaxgaming.png",
    rubyplay: "https://cdn.betpirmedia.com/casino/providers/rubyplay.png",
    urgentgames: "https://cdn.betpirmedia.com/casino/providers/urgentgames.png",
    victoryark: "https://cdn.betpirmedia.com/casino/providers/victoryark.png",
    ebetlab: "https://cdn.betpirmedia.com/casino/providers/ebetlab.png",
    pgsoft: "https://cdn.betpirmedia.com/casino/providers/pgsoft.png",
    hacksaw: "https://cdn.betpirmedia.com/casino/providers/hacksaw.png",
    fbastards: "https://cdn.betpirmedia.com/casino/providers/fbastards.png",
  };

  function renderProviderDropdownContent() {
    return `
    <div class="casino-new__providers-search">
      <input
        id="provider-search-input"
        type="text"
        placeholder="Sağlayıcı ara"
        value="${safeAttr(AppState.providerSearchQuery || "")}"
        data-provider-search
      />
    </div>

    <div class="provider-dropdown-grid" id="provider-dropdown-grid">
      ${filterProvidersByQuery(AppState.providers, AppState.providerSearchQuery)
        .map((p) => {
          const isSel =
            AppState.selectedProvider &&
            String(AppState.selectedProvider.id) === String(p.id);

          return `
            <div class="provider-dd-item ${isSel ? "is-selected" : ""}"
              data-provider="${safeAttr(p.id)}"
              data-identifier="${safeAttr(p.identifier || "")}"
              data-name="${safeAttr(p.name || "")}"
              data-image="${safeAttr(resolveProviderImage(p))}">
              <img src="${safeAttr(resolveProviderImage(p))}" alt="${safeAttr(
                p.name,
              )}">
            </div>
          `;
        })
        .join("")}
    </div>
  `;
  }

  function resolveProviderImage(provider) {
    if (!provider) return "";

    const identifier = normIdentifier(provider.identifier);
    if (identifier && PROVIDER_IMAGE_OVERRIDE[identifier]) {
      return PROVIDER_IMAGE_OVERRIDE[identifier];
    }

    return provider.image || "";
  }

  function filterProvidersByQuery(providers, query) {
    if (!query) return providers;
    const q = normStr(query);
    return providers.filter((p) => {
      return normStr(p.name).includes(q) || normStr(p.identifier).includes(q);
    });
  }

  function ensureCasinoOnlyHideStyle() {
    if (document.getElementById("casino-only-hide-style")) return;

    const style = document.createElement("style");
    style.id = "casino-only-hide-style";
    style.textContent = `
    /* ✅ SADECE CASINO SAYFASI */
    
    /* ÜSTTEKİ tablo / bahis section */
    .col-12.section--first {
      display: none !important;
    }

    /* Sağlayıcılar (125) slider section */
    .section.section--last {
      display: none !important;
    }
  `;
    document.head.appendChild(style);
  }

  function removeCasinoOnlyHideStyle() {
    document.getElementById("casino-only-hide-style")?.remove();
  }

  const __casinoSidebarAuto = {
    lastRouteWasCasino: false,
    didOpenOnThisVisit: false,
  };

  function getSidebarEl() {
    return (
      document.querySelector("#sidebar.sidebar") ||
      document.querySelector("#sidebar") ||
      document.querySelector(".sidebar")
    );
  }

  function getSidebarBtn() {
    // çoğu temada tek olur; yoksa en yakını seçeriz
    return document.querySelector("button.sidebar__btn");
  }

  function isDesktop() {
    return window.matchMedia("(min-width: 769px)").matches;
  }

  function isSidebarActive(sidebar) {
    if (!sidebar) return false;
    return sidebar.classList.contains("active");
  }

  // 👇 sadece casino + desktop + sidebar active değilken => btn click
  async function maybeAutoOpenSidebarOnCasinoDesktop() {
    const casinoNow = isCasinoRoute(location.pathname);
    const desktopNow = isDesktop();

    // casino değilse veya desktop değilse: bu otomasyona dokunma
    if (!casinoNow || !desktopNow) {
      __casinoSidebarAuto.lastRouteWasCasino = casinoNow;
      __casinoSidebarAuto.didOpenOnThisVisit = false;
      return;
    }

    const sidebar = getSidebarEl();
    if (!sidebar) return;

    // zaten active ise hiç elleme
    if (isSidebarActive(sidebar)) return;

    // bu casino ziyaretinde 1 kere açmayı dene
    if (__casinoSidebarAuto.didOpenOnThisVisit) return;

    // btn geç gelebiliyor → bekle
    let btn = getSidebarBtn();
    if (!btn) {
      btn = await waitForElement("button.sidebar__btn", 2500);
    }
    if (!btn) return;

    // tekrar kontrol: sidebar bu arada açıldıysa tıklama
    if (isSidebarActive(getSidebarEl())) return;

    // ✅ gerçek click
    btn.click();

    __casinoSidebarAuto.didOpenOnThisVisit = true;
    __casinoSidebarAuto.lastRouteWasCasino = true;
  }

  function toggleCasinoSidebarActive(isActive) {
    const isDesktop = window.matchMedia("(min-width: 769px)").matches;
    const el =
      document.querySelector("#sidebar.sidebar") ||
      document.querySelector("#sidebar") ||
      document.querySelector(".sidebar");

    if (!el) return;

    // Mobilde asla active kalmasın
    if (!isDesktop) {
      el.classList.remove("active");
      return;
    }

    el.classList.toggle("active", !!isActive);
  }

  const PROVIDER_GROUP_SLUG_BY_IDENTIFIER = {
    evolution: "evolution-yeni",
    hacksaw: "hacksaw-gaming-yeni", // ✅ düz ASCII
    egtinteractive: "egt-digital-yeni",
    "egt-interactive": "amusnet-yeni",
    pgsoft: "pgsoft-yeni",
    "3oaks": "3oaks-booongo-yeni",
  };

  // identifier normalize (case-insensitive)
  function normIdentifier(s) {
    return String(s || "")
      .trim()
      .toLowerCase();
  }

  // bu provider özel group slug’a mı gitmeli?
  function getSpecialGroupSlugByProvider(provider) {
    const idf = normIdentifier(provider?.identifier);
    if (!idf) return "";
    return PROVIDER_GROUP_SLUG_BY_IDENTIFIER[idf] || "";
  }

  function isPragmaticProvider(p) {
    if (!p) return false;
    const idf = normStr(p.identifier || "");
    const nm = toSlug(p.name || "");

    if (idf.includes("pragmaticplay")) return true;

    // name bazen: "Pragmatic Play"
    if (nm.includes("pragmaticplay") && nm.includes("pragmaticplay"))
      return true;

    return false;
  }

  function waitForElement(selector, timeout = 6000) {
    return new Promise((resolve) => {
      const start = Date.now();
      const tick = () => {
        const el = document.querySelector(selector);
        if (el) return resolve(el);
        if (Date.now() - start > timeout) return resolve(null);
        setTimeout(tick, 60);
      };
      tick();
    });
  }

  function normalizePath(pathname) {
    return pathname.replace(/^\/[a-z]{2}\//, "/").replace(/\/$/, "") || "/";
  }

  function isCasinoRoute(pathname) {
    return CONFIG.casinoPaths.includes(normalizePath(pathname));
  }

  // ✅ /casino içinde belirli section başlıklarına sahip parent ".section" gizle
  function hideCasinoSectionsByTitles() {
    if (!isCasinoRoute(location.pathname)) return;

    // Başlıkları normalize edip karşılaştıracağız
    const TARGET_TITLES = [
      "3oaks (booongo) yeni",
      "hacksaw gaming yeni",
      "vip bell link",
      "en popüler oyunlar",
      "vip bell link oyunlari",
      "egt bell link",
      "pragmatic play",
      "jackpot oyunları",
      "yüksek rtp",
      "bonus satın alma oyunları",
      "booming games",
      "balık ve av oyunları",
      "amusnet",
      "megaways oyunları",
      "pgsoft",
      "evolution",
      "drops & wins oyunları",
      "hacksaw gaming",
      "playson",
      "ezugi",
      "en beğenilen oyunlar",
      "evolution yeni",
      "pgsoft yeni",
      "amusnet yeni",
      "egt digital yeni",
      "pragmatic play yeni",
      "tüm oyunlar",
    ];

    // "İ/ı/Ğ/ş/ö/ü/ç" gibi karakterleri toleranslı eşleştirmek için:
    const norm = (s) =>
      String(s || "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase()
        // TR karakterleri normalize (NFD + diacritics remove)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        // özel birkaç dönüşüm
        .replace(/ı/g, "i")
        .replace(/&amp;/g, "&");

    const targetSet = new Set(TARGET_TITLES.map(norm));

    const titles = document.querySelectorAll(".section__title");
    titles.forEach((t) => {
      const txt = norm(t.textContent || "");
      if (!txt) return;

      // birebir eşleşme (en güvenlisi)
      if (!targetSet.has(txt)) return;

      const section = t.closest(".section");
      if (!section) return;

      // tekrar tekrar işlem yapmayalım
      if (section.dataset.__hiddenCasinoSection === "1") return;

      section.style.display = "none";
      section.dataset.__hiddenCasinoSection = "1";
    });
  }

  function setup3oaksHideObserver() {
    if (window.__hide3oaksObserverInstalled) return;
    window.__hide3oaksObserverInstalled = true;

    const obs = new MutationObserver(() => {
      hideCasinoSectionsByTitles();
    });

    // casino içeriği genelde main content altında aktığı için body yeterli
    obs.observe(document.body, { childList: true, subtree: true });

    // referans sakla (istersen ileride disconnect edersin)
    window.__hide3oaksObserver = obs;
  }

  function qs(sel, root = document) {
    return root.querySelector(sel);
  }

  function qsa(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  function safeAttr(v) {
    return String(v == null ? "" : v).replace(/"/g, "&quot;");
  }

  function toSlug(s) {
    return (s || "")
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^\w]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function normStr(s) {
    return String(s || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
  }

  function imgKey(url) {
    const u = String(url || "");
    const noQ = u.split("?")[0];
    const last = noQ.split("/").pop() || "";
    return normStr(last);
  }

  function gameKeys(g) {
    const name = g?.name || g?.title || g?.gameName || g?.displayName || "";
    const nameSlug = toSlug(name);

    const rawIds = [
      g?.slug,
      g?.seo,
      g?.code,
      g?.id,
      g?.gameId,
      g?.game_id,
      g?.externalId,
      g?.external_id,
      g?.tableId,
      g?.table_id,
    ]
      .filter(Boolean)
      .map((x) => normStr(x));

    const keys = new Set(rawIds);
    if (nameSlug) keys.add(normStr(nameSlug));

    const image =
      g?.image ||
      g?.thumbnail ||
      g?.cover ||
      g?.logo ||
      g?.icon ||
      g?.img ||
      "";
    const ik = imgKey(image);
    if (ik) keys.add(ik);

    return keys;
  }

  function buildKeysIndex(games) {
    const set = new Set();
    for (const g of games || []) for (const k of gameKeys(g)) set.add(k);
    return set;
  }

  function countIntersectKeys(game, keySet) {
    let hit = 0;
    for (const k of gameKeys(game)) if (keySet.has(k)) hit++;
    return hit;
  }

  function gameNameOf(g) {
    return String(g?.name || g?.title || g?.gameName || g?.displayName || "");
  }

  function gameImageOf(g) {
    return String(g?.image || g?.thumbnail || g?.cover || g?.img || "");
  }

  function gameSlugOf(g) {
    return (
      g?.slug ||
      g?.seo ||
      g?.code ||
      g?.id ||
      g?.gameId ||
      g?.game_id ||
      toSlug(gameNameOf(g) || "game")
    );
  }

  // -----------------------------
  // Styles
  // -----------------------------
  function ensureMobileCasinoStyles() {
    if (document.getElementById("casino-mobile-grid-style")) return;
    const style = document.createElement("style");
    style.id = "casino-mobile-grid-style";
    style.textContent = `
      /* ✅ Seçili provider (mobil dropdown) */
  .provider-dd-item.is-selected{
    background: rgba(255,208,0,.12);
    border-color: rgba(255,208,0,.35);
    box-shadow: 0 0 0 1px rgba(255,208,0,.18) inset;
  }

    
    /* Mobile Styles */
    @media (max-width: 768px) {
      .casino-new__searchwrap {
        position: relative;
        z-index: 30;
      }
      
      .casino-new__left {
          display: none;
      }

      .casino-new__searchwrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 6px;
      }

      .casino-new__filter-btn {
        background: rgba(255, 255, 255, 0.06);
        padding: 8px 12px;
        border-radius: 12px;
        cursor: pointer;
        color: #fff;
        font-weight: 600;
        transition: all 0.3s ease;
      }

      .casino-new__filter-btn:hover {
        background: rgba(255, 208, 0, 0.16);
      }

      /* Mobile dropdown styles */
      .provider-dropdown{
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        right: 0;

        background: rgba(18,18,18,0.98);
        backdrop-filter: blur(6px);

        border-radius: 14px;
        padding: 12px;

        max-height: 65vh;
        overflow-y: auto;

        z-index: 9999;
        box-shadow:
          0 20px 40px rgba(0,0,0,.55),
          0 0 0 1px rgba(255,255,255,.06) inset;
      }

      .provider-option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        cursor: pointer;
      }
      .provider-option:hover {
        background-color: rgba(255, 208, 0, 0.1);
      }

      .provider-dropdown-grid{
    display: grid;
    grid-template-columns: repeat(2, minmax(0,1fr));
    gap: 10px;
  }

  .provider-dd-item{
    background: rgba(255,255,255,0.06);
    border-radius: 12px;
    height: 56px;

    display:flex;
    align-items:center;
    justify-content:center;

    cursor: pointer;
    transition: all .15s ease;
    border: 1px solid rgba(255,255,255,0.06);
  }

  .provider-dd-item:active{
    transform: scale(.97);
  }

  .provider-dd-item:hover{
    background: rgba(255,208,0,.14);
    border-color: rgba(255,208,0,.35);
  }

  .provider-dd-item img{
    max-height: 40px;
    max-width: 90%;
    object-fit: contain;
    pointer-events: none;
  }
    }
  `;
    document.head.appendChild(style);
  }

  function ensureStyles() {
    if (document.getElementById("casino-new-style")) return;

    const style = document.createElement("style");
    style.id = "casino-new-style";
    style.textContent = `    
    .casino-new__providers-search{
  margin: 0 0 10px 0;
}

.casino-new__providers-search input{
  width: 100%;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 10px;
  padding: 10px 12px;
  color: #fff;
  font-weight: 600;
  outline: none;
}

.casino-new__providers-search input::placeholder{
  color: rgba(255,255,255,.55);
}

    
      .${CONFIG.rootClass}{ padding-top:12px; }

      .casino-new-root.casino-container.container {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 100% !important;
        padding: 12px 24px !important;
      }

      /* TABS */
      .casino-new__tabs{
        position: relative;
        display:flex;
        flex-wrap: nowrap;
        align-items:center;
        gap: 8px;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        scroll-snap-type: x mandatory;
        scroll-padding: 10px;
        padding: 0 10px 12px 10px;
        margin: 0 -10px 0px -10px;
        scrollbar-width: none;
        backdrop-filter: blur(6px);
      }
      .casino-new__tabs::-webkit-scrollbar{ height: 0px; }

      .casino-new__tab{
        cursor:pointer;
        border:none;
        background:rgba(255,255,255,.06);
        color:#fff;
        padding:10px 14px;
        border-radius:12px;
        font-weight:700;
        display:flex;
        align-items:center;
        gap:6px;
        flex: 0 0 auto;
        white-space: nowrap;
        scroll-snap-align: start;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        transition: transform .12s ease, background .12s ease, box-shadow .12s ease, opacity .12s ease;
      }
      .casino-new__tab:active{ transform: scale(.98); }
      .casino-new__tab img{ width:20px; height:20px; flex: 0 0 20px; }
      .casino-new__tab.is-active{
        background:rgba(255,208,0,.16);
        box-shadow:0 0 0 1px rgba(255,208,0,.35) inset;
      }

      /* ✅ provider seçiliyken tablar disabled
      .casino-new__tabs.is-disabled .casino-new__tab{
        opacity: .45;
        pointer-events: none;
      }
      */

      /* SEARCH */
      .casino-new__searchwrap{
        padding: 0 10px 14px 10px;
        margin: 0 -10px 6px -10px;
      }
      .casino-new__search{
        width: 100%;
        display:flex;
        align-items:center;
        gap: 10px;
        background: rgba(255,255,255,.06);
        border-radius: 12px;
        padding: 12px 12px;
        backdrop-filter: blur(4px);
      }
      .casino-new__search svg{
        width:18px;height:18px;flex:0 0 18px;
        opacity: .85;
      }
      .casino-new__search input{
        width: 100%;
        border: none;
        outline: none;
        background: transparent;
        color: #fff;
        font-weight: 600;
        font-size: 14px;
      }
      .casino-new__search input::placeholder{
        color: rgba(255,255,255,.65);
        font-weight: 600;
      }

      /* CONTENT FLEX */
      #casino-new-content.casino-new__content{
        display:flex;
        gap: 12px;
        align-items:flex-start;
        padding: 0 10px 0 10px;
        margin: 0 -10px 0 -10px;
      }
      .casino-new__left{
        width: 15%;
        min-width: 220px;
        height: 700px !important;
        overflow-y: scroll !important;
      }
      .casino-new__right{
        width: 85%;
        min-width: 0;
        height: 700px !important;
        overflow-y: scroll !important;
      }
      @media (max-width: 768px){

            .casino-new-root.casino-container.container {
        padding: 12px 0px !important;
      }
      
        #casino-new-content.casino-new__content{ display:block; }
        .casino-new__left{ width:100%; min-width:0; margin-bottom: 12px; }
        .casino-new__right{ width:100%; min-width:0; }
      }

      /* PROVIDERS */
      .casino-new__providers{
        background: rgba(255,255,255,0.03);
        border-radius: 12px;
        padding: 10px;
      }
      .casino-new__providers-head{
        color: rgba(255,255,255,0.85);
        font-weight: 800;
        font-size: 16px;
        margin: 0 0 10px 2px;
        display:flex;
        align-items:center;
        justify-content: space-between;
        gap: 10px;
      }
      .casino-new__providers-clear{
        cursor:pointer;
        border:none;
        background: rgba(255,255,255,0.06);
        color:#fff;
        font-weight: 800;
        font-size: 12px;
        padding: 8px 10px;
        border-radius: 10px;
      }
      .casino-new__providers-grid{
        display:grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
      }
      .casino-new__provider{
        cursor: pointer;
        border-radius: 12px;
        background: rgba(255,255,255,0.06);
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.06);
        transition: transform .12s ease, background .12s ease, box-shadow .12s ease, border-color .12s ease;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        padding: 8px;
        display:flex;
        align-items:center;
        justify-content:center;
        min-height: 46px;
      }
      .casino-new__provider:active{ transform: scale(.98); }
      .casino-new__provider img{
        max-width: 100%;
        max-height: 28px;
        display:block;
      }
      .casino-new__provider.is-selected{
        background: rgba(255,208,0,.12);
        border-color: rgba(255,208,0,.25);
        box-shadow: 0 0 0 1px rgba(255,208,0,.18) inset;
      }
      .casino-new__providers-skel{
        display:grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
      }
      .casino-new__provider-skel{
        height: 46px;
        border-radius: 12px;
        background: rgba(255,255,255,0.06);
        position: relative;
        overflow:hidden;
      }
      .casino-new__provider-skel::after{
        content:"";
        position:absolute;
        top:0; left:-60%;
        width:60%;
        height:100%;
        background: linear-gradient(
          90deg,
          rgba(255,255,255,0),
          rgba(255,255,255,0.12),
          rgba(255,255,255,0)
        );
        animation: casinoSkel 1.1s ease-in-out infinite;
      }

      /* SKELETON (games) */
      .casino-new__skeleton .game-card{ pointer-events:none; }
      .casino-new__skeleton .game-image{ position: relative; width: 100%; overflow: hidden; }
      .casino-new__skel-box{
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background: rgba(255,255,255,0.06);
        position: relative;
        overflow:hidden;
      }
      .casino-new__skel-box::after{
        content:"";
        position:absolute;
        top:0; left:-60%;
        width:60%;
        height:100%;
        background: linear-gradient(
          90deg,
          rgba(255,255,255,0),
          rgba(255,255,255,0.12),
          rgba(255,255,255,0)
        );
        animation: casinoSkel 1.1s ease-in-out infinite;
      }
      @keyframes casinoSkel{
        0%{ transform: translateX(0); }
        100%{ transform: translateX(260%); }
      }

      /* GRID */
      @media (max-width: 480px){
        .game-card{ aspect-ratio: 1.5 / 1.2 !important; border-radius: 0px !important; }
        .casino-container .games-container{
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 8px !important;
        }
        .casino-container .game-card{
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          overflow: hidden;
          background: rgba(255,255,255,0.02);
          text-decoration: none;
        }
        .casino-container .game-card .game-image{
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }
        .casino-container .game-card .game-image img{
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
      }

      @media (min-width: 481px) and (max-width: 768px){
        .casino-container .games-container{
          display: grid !important;
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          gap: 10px !important;
        }
        .casino-container .game-card .game-image{ aspect-ratio: 1.5 / 1.2; }
        .casino-container .game-card .game-image img{ object-fit: cover; }
      }

      @media (min-width: 769px){
        .casino-container .games-container{
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 12px;
        }
        .casino-container .game-card{
          display:flex;
          flex-direction:column;
          border-radius: 12px;
          overflow:hidden;
          background: rgba(255,255,255,0.02);
          text-decoration:none;
        }
        .casino-container .game-card .game-image{
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 2;
          overflow: hidden;
        }
        .casino-container .game-card .game-image img{
          width: 100%;
          height: 100%;
          display:block;
        }

        .provider-dropdown,
  #filter-btn{
    display:none !important;
  }
      }

      .casino-new__empty{ color: rgba(255,255,255,0.8); padding: 12px 2px; }
      .game-card { margin-top: 0px !important; }

      /* ✅ ONLY casino-new scrollbars (Chrome/Edge/Safari + Firefox) */
.casino-new-root .casino-new__left,
.casino-new-root .casino-new__right{
  overflow-y: auto !important;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: rgba(255,208,0,.55) rgba(255,255,255,.08); /* thumb track */
}

/* Webkit scrollbars */
.casino-new-root .casino-new__left::-webkit-scrollbar,
.casino-new-root .casino-new__right::-webkit-scrollbar{
  width: 10px;
}

.casino-new-root .casino-new__left::-webkit-scrollbar-track,
.casino-new-root .casino-new__right::-webkit-scrollbar-track{
  background: rgba(255,255,255,.08);
  border-radius: 999px;
}

.casino-new-root .casino-new__left::-webkit-scrollbar-thumb,
.casino-new-root .casino-new__right::-webkit-scrollbar-thumb{
  background: rgba(255,208,0,.55);
  border-radius: 999px;

  /* Track ile thumb birbirine karışmasın */
  border: 2px solid rgba(0,0,0,0);
  background-clip: padding-box;
}

.casino-new-root .casino-new__left::-webkit-scrollbar-thumb:hover,
.casino-new-root .casino-new__right::-webkit-scrollbar-thumb:hover{
  background: rgba(255,208,0,.75);
}



/* ============================
   TOP BAR (tek tam genişlik banner)
   ============================ */
.casino-new__topbar {
  width: 100%;
  height: 140px;
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 16px;
}

.casino-new__topbar picture,
.casino-new__topbar img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

    `;
    document.head.appendChild(style);
  }

  // -----------------------------
  // ✅ Global Search (casino.js gibi)
  // -----------------------------
  async function searchGamesGlobal(query) {
    try {
      const res = await fetch(CONFIG.searchApi.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: query, rt: CONFIG.searchApi.rt }),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      return list;
    } catch (e) {
      console.error("[search] fetch error:", e);
      return [];
    }
  }

  // -----------------------------
  // Providers
  // -----------------------------
  async function fetchProviders() {
    if (AppState.providers || AppState.providersLoading)
      return AppState.providers || [];
    AppState.providersLoading = true;
    try {
      const res = await fetch(CONFIG.providersApi.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(CONFIG.providersApi.payload),
      });
      const json = await res.json();
      const providers = Array.isArray(json?.data) ? json.data : [];
      AppState.providers = providers;
      return providers;
    } catch (e) {
      console.error("[providers] fetch error:", e);
      AppState.providers = [];
      return [];
    } finally {
      AppState.providersLoading = false;
    }
  }

  function renderProvidersSkeleton(count = 18) {
    return `
      <div class="casino-new__providers">
        <div class="casino-new__providers-head">
          <span>Sağlayıcılar</span>
        </div>
        <div class="casino-new__providers-skel">
          ${Array.from({ length: count })
            .map(() => `<div class="casino-new__provider-skel"></div>`)
            .join("")}
        </div>
      </div>
    `;
  }

  function renderProvidersPanel(providers) {
    const selectedId = AppState.selectedProvider?.id
      ? String(AppState.selectedProvider.id)
      : "";

    const filteredProviders = filterProvidersByQuery(
      providers,
      AppState.providerSearchQuery,
    );

    return `
      <div class="casino-new__providers">
        <div class="casino-new__providers-head">
          <span>Sağlayıcılar</span>
        </div>
        <div class="casino-new__providers-search">
          <input
            id="provider-search-input"
            type="text"
            placeholder="Sağlayıcı ara"
            value="${safeAttr(AppState.providerSearchQuery || "")}"
            data-provider-search
          />
        </div>
        <div class="casino-new__providers-grid" id="desktop-provider-grid">
          ${filteredProviders
            .map((p) => {
              const id = String(p?.id ?? "");
              const identifier = String(p?.identifier ?? "");
              const name = String(p?.name ?? "");
              // const image = String(p?.image ?? "");
              const image = resolveProviderImage(p);
              const isSelected = selectedId && id === selectedId;
              return `
                <div class="casino-new__provider ${
                  isSelected ? "is-selected" : ""
                }"
                     role="button"
                     tabindex="0"
                     data-provider="${safeAttr(id)}"
                     data-identifier="${safeAttr(identifier)}"
                     data-name="${safeAttr(name)}"
                     data-image="${safeAttr(image)}">
                  <img src="${safeAttr(image)}" alt="${safeAttr(
                    name,
                  )}" loading="lazy">
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  // -----------------------------
  // Provider games fetch (eski mantık)
  // -----------------------------
  async function fetchGamesByProviderSlots(provider) {
    try {
      const ts = Math.floor(Date.now() / 1000);

      const provId = provider && (provider.id || provider);
      const provIdentifier = provider && provider.identifier;
      const provName = provider && provider.name;

      const normalizeGame = (g) => {
        const name =
          g.name ||
          g.title ||
          g.gameName ||
          g.tableName ||
          g.displayName ||
          g.game_title ||
          "Game";
        const slug =
          g.slug ||
          g.seo ||
          g.code ||
          g.id ||
          g.gameId ||
          g.game_id ||
          g.tableId ||
          g.table_id ||
          g.externalId ||
          g.external_id ||
          toSlug(name);
        const image =
          g.image ||
          g.thumbnail ||
          g.cover ||
          g.logo ||
          g.icon ||
          g.image_url ||
          g.imageUrl ||
          g.logoUrl ||
          g.thumb ||
          g.picture ||
          g.img ||
          "";
        const providerName =
          g.provider ||
          g.vendor ||
          g.providerName ||
          g.provider_name ||
          g.studio ||
          g.brand ||
          "";
        return { slug, image, name, provider: providerName };
      };

      const looksLikeGameObj = (it) => {
        if (!it || typeof it !== "object") return false;
        const hasName =
          "name" in it ||
          "title" in it ||
          "gameName" in it ||
          "tableName" in it ||
          "displayName" in it;
        const hasVisual =
          "image" in it ||
          "thumbnail" in it ||
          "cover" in it ||
          "logo" in it ||
          "icon" in it ||
          "image_url" in it ||
          "imageUrl" in it ||
          "thumb" in it ||
          "picture" in it ||
          "img" in it;
        const hasIdish =
          "slug" in it ||
          "seo" in it ||
          "code" in it ||
          "id" in it ||
          "gameId" in it ||
          "game_id" in it ||
          "externalId" in it ||
          "external_id" in it ||
          "tableId" in it ||
          "table_id" in it;
        return hasName || hasVisual || hasIdish;
      };

      const unwrap = (json) => {
        if (Array.isArray(json?.data?.data)) return json.data.data;
        if (Array.isArray(json?.data?.list)) return json.data.list;
        if (Array.isArray(json?.data)) return json.data;
        if (Array.isArray(json?.list)) return json.list;

        const stack = [json];
        let best = [];
        while (stack.length) {
          const cur = stack.pop();
          if (Array.isArray(cur)) {
            if (cur.some(looksLikeGameObj) && cur.length > best.length)
              best = cur;
          } else if (cur && typeof cur === "object") {
            for (const k in cur) stack.push(cur[k]);
          }
        }
        return best;
      };

      const postAndUnwrap = async (url, body) => {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("Network response was not ok");
        const json = await res.json();
        return unwrap(json).map(normalizeGame);
      };

      // 1) provider/{id}
      if (provId) {
        try {
          const byId = await postAndUnwrap(
            `${CONFIG.games2Base}/games2/provider/${provId}`,
            { page: 1, limit: 100, sortBy: "sort", direction: "desc", rt: ts },
          );
          if (byId && byId.length) return byId;
        } catch (_) {}
      }

      // 2) fallback welcome/popular
      const attempts = [
        {
          url: `${CONFIG.games2Base}/games2/welcome/popular`,
          body: {
            type: "new-releases",
            page: 1,
            limit: 100,
            providers: provId ? [provId] : [],
            sortBy: "sort",
            direction: "desc",
            rt: ts,
          },
        },
      ];

      if (provIdentifier) {
        attempts.push({
          url: `${CONFIG.games2Base}/games2/welcome/popular`,
          body: {
            type: "new-releases",
            page: 1,
            limit: 100,
            providers: [provIdentifier],
            sortBy: "sort",
            direction: "desc",
            rt: ts,
          },
        });
      }

      for (const a of attempts) {
        try {
          const list = await postAndUnwrap(a.url, a.body);
          if (list && list.length) {
            if (provIdentifier || provName) {
              const needleA = (provIdentifier || "").toLowerCase();
              const needleB = (provName || "").toLowerCase();
              const filtered = list.filter((g) => {
                const p = (g.provider || "").toLowerCase();
                return needleA
                  ? p.includes(needleA)
                  : needleB
                    ? p.includes(needleB)
                    : true;
              });
              if (filtered.length) return filtered;
            }
            return list;
          }
        } catch (_) {}
      }

      return [];
    } catch (e) {
      console.error("[provider-games] fetch error:", e);
      return [];
    }
  }

  async function getProviderGames(provider) {
    const provId = String(provider?.id || "");
    if (!provId) return { games: [], keys: new Set() };

    let cached = AppState.providerGamesCache[provId];
    if (cached?.games && cached?.keys) return cached;

    // aynı provider için devam eden istek varsa onu bekle
    if (cached?.promise) return cached.promise;

    const promise = (async () => {
      const games = (await fetchGamesByProviderSlots(provider)) || [];
      const keys = buildKeysIndex(games);
      const val = { games, keys };
      AppState.providerGamesCache[provId] = val;
      return val;
    })();

    AppState.providerGamesCache[provId] = { promise };
    return promise;
  }

  // -----------------------------
  // Tab/group API
  // -----------------------------
  // ✅ Group API'den (sekme API'si) slug ile oyun getir — Pragmatic özel
  async function fetchGroupGamesDirectBySlug(slug) {
    if (!slug) return [];

    // Pragmatic cache
    if (slug === "pragmatic-play-yeni") {
      if (AppState.pragmaticGroupGames || AppState.pragmaticGroupLoading)
        return AppState.pragmaticGroupGames || [];
      AppState.pragmaticGroupLoading = true;
    }

    try {
      const res = await fetch(CONFIG.api.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(CONFIG.api.payload),
      });

      const json = await res.json();
      const categories = Array.isArray(json?.data) ? json.data : [];

      const found = categories.find(
        (c) => String(c?.slug || "") === String(slug),
      );
      const games = Array.isArray(found?.group) ? found.group : [];

      if (slug === "pragmatic-play-yeni") AppState.pragmaticGroupGames = games;

      return games;
    } catch (err) {
      console.error(`[group:${slug}] fetch error:`, err);
      if (slug === "pragmatic-play-yeni") AppState.pragmaticGroupGames = [];
      return [];
    } finally {
      if (slug === "pragmatic-play-yeni")
        AppState.pragmaticGroupLoading = false;
    }
  }

  async function fetchGroupGamesBySlug(slug) {
    const tab = TABS.find((t) => t.slug === slug);
    if (!tab) return [];

    const isAll = tab.key === "all";
    const isLiked = tab.key === "liked";
    const isPopular = tab.key === "popular";
    const isRtp = tab.key === "rtp";
    const isJackpot = tab.key === "jackpot";
    const isBuyBonus = tab.key === "buyBonus";
    const isFish = tab.key === "fish";
    const isMegaways = tab.key === "megaways";
    const isDropsWins = tab.key === "dropsWins";
    const isVipBell = tab.key === "vipBell";

    if (isAll) {
      if (AppState.allGames || AppState.allLoading)
        return AppState.allGames || [];
      AppState.allLoading = true;
    }
    if (isLiked) {
      if (AppState.likedGames || AppState.likedLoading)
        return AppState.likedGames || [];
      AppState.likedLoading = true;
    }
    if (isPopular) {
      if (AppState.popularGames || AppState.popularLoading)
        return AppState.popularGames || [];
      AppState.popularLoading = true;
    }
    if (isRtp) {
      if (AppState.rtpGames || AppState.rtpLoading)
        return AppState.rtpGames || [];
      AppState.rtpLoading = true;
    }
    if (isJackpot) {
      if (AppState.jackpotGames || AppState.jackpotLoading)
        return AppState.jackpotGames || [];
      AppState.jackpotLoading = true;
    }
    if (isBuyBonus) {
      if (AppState.buyBonusGames || AppState.buyBonusLoading)
        return AppState.buyBonusGames || [];
      AppState.buyBonusLoading = true;
    }
    if (isFish) {
      if (AppState.fishGames || AppState.fishLoading)
        return AppState.fishGames || [];
      AppState.fishLoading = true;
    }
    if (isMegaways) {
      if (AppState.megawaysGames || AppState.megawaysLoading)
        return AppState.megawaysGames || [];
      AppState.megawaysLoading = true;
    }
    if (isDropsWins) {
      if (AppState.dropsWinsGames || AppState.dropsWinsLoading)
        return AppState.dropsWinsGames || [];
      AppState.dropsWinsLoading = true;
    }

    if (isVipBell) {
      if (AppState.vipBellGames || AppState.vipBellLoading)
        return AppState.vipBellGames || [];
      AppState.vipBellLoading = true;
    }

    try {
      const res = await fetch(CONFIG.api.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(CONFIG.api.payload),
      });

      const json = await res.json();
      const categories = Array.isArray(json?.data) ? json.data : [];

      const found = categories.find((c) => c.slug === slug);
      const games = Array.isArray(found?.group) ? found.group : [];

      if (isAll) AppState.allGames = games;
      if (isLiked) AppState.likedGames = games;
      if (isPopular) AppState.popularGames = games;
      if (isRtp) AppState.rtpGames = games;
      if (isJackpot) AppState.jackpotGames = games;
      if (isBuyBonus) AppState.buyBonusGames = games;
      if (isFish) AppState.fishGames = games;
      if (isMegaways) AppState.megawaysGames = games;
      if (isDropsWins) AppState.dropsWinsGames = games;
      if (isVipBell) AppState.vipBellGames = games;

      return games;
    } catch (err) {
      console.error(`[${slug}] fetch error:`, err);
      if (isAll) AppState.allGames = [];
      if (isLiked) AppState.likedGames = [];
      if (isPopular) AppState.popularGames = [];
      if (isRtp) AppState.rtpGames = [];
      if (isJackpot) AppState.jackpotGames = [];
      if (isBuyBonus) AppState.buyBonusGames = [];
      if (isFish) AppState.fishGames = [];
      if (isMegaways) AppState.megawaysGames = [];
      if (isDropsWins) AppState.dropsWinsGames = [];
      if (isVipBell) AppState.vipBellGames = [];
      return [];
    } finally {
      if (isAll) AppState.allLoading = false;
      if (isLiked) AppState.likedLoading = false;
      if (isPopular) AppState.popularLoading = false;
      if (isRtp) AppState.rtpLoading = false;
      if (isJackpot) AppState.jackpotLoading = false;
      if (isBuyBonus) AppState.buyBonusLoading = false;
      if (isFish) AppState.fishLoading = false;
      if (isMegaways) AppState.megawaysLoading = false;
      if (isDropsWins) AppState.dropsWinsLoading = false;
      if (isVipBell) AppState.vipBellLoading = false;
    }
  }

  // -----------------------------
  // Skeleton (games)
  // -----------------------------
  function renderSkeleton(count = 36) {
    const items = Array.from({ length: count })
      .map(
        () => `
          <a class="game-card" href="javascript:void(0)" aria-hidden="true">
            <div class="game-image">
              <div class="casino-new__skel-box"></div>
            </div>
          </a>
        `,
      )
      .join("");

    return `
      <div class="games-container casino-new__skeleton">
        ${items}
      </div>
    `;
  }

  // -----------------------------
  // Render helpers
  // -----------------------------
  function renderGames(games) {
    if (!games || !games.length) {
      return `<div class="casino-new__empty"><p>Oyun bulunamadı</p></div>`;
    }

    return `
      <div class="games-container">
        ${games
          .map((g) => {
            const slug = gameSlugOf(g);
            const image = gameImageOf(g);
            const name = gameNameOf(g) || "Game";
            return `
              <a href="/casino/games/${safeAttr(
                slug,
              )}" class="game-card" data-game-slug="${safeAttr(
                slug,
              )}" data-rr="true"
                 onclick="event.preventDefault(); const path = document.documentElement.lang === 'tr'
                   ? '/tr/casino/games/${safeAttr(slug)}'
                   : '/en/casino/games/${safeAttr(slug)}';
                   window.history.pushState('', '', path);
                   window.history.pushState('', '', path);
                   window.history.go(-1);">
                <div class="game-image">
                  <img src="${safeAttr(image)}" alt="${safeAttr(name)}">
                </div>
              </a>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderTabs() {
    return `
      <div class="casino-new__tabs" role="tablist" aria-label="Casino Sekmeleri">
        ${TABS.map((t) => {
          const a = AppState.activeTab === t.key ? "is-active" : "";
          return `
            <button class="casino-new__tab ${a}" data-tab="${safeAttr(
              t.key,
            )}" role="tab" aria-selected="${a ? "true" : "false"}">
              <img src="${safeAttr(t.icon)}" alt="">
              <span>${t.label}</span>
            </button>`;
        }).join("")}
      </div>
    `;
  }

  function renderSearch() {
    return `
    <div class="casino-new__searchwrap">
      <div class="casino-new__search">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input id="casino-new-search-input" type="text" autocomplete="off" placeholder="Oyun ara" value="${safeAttr(
          AppState.searchQuery || "",
        )}" />
      </div>
      <button class="casino-new__filter-btn" id="filter-btn">
        <img src="https://cdn.betpirmedia.com/casino/filter.png" width="20" height="20">
      </button>
    </div>
  `;
  }

  async function renderRootShell() {
    ensureStyles();
    ensureMobileCasinoStyles();
    return `
      <div class="${CONFIG.rootClass} casino-container container">


<div class="casino-new__topbar">
  <picture>
    <source media="(max-width: 767px)"
            srcset="https://cdn.betpirmedia.com/casino_top/410x140.png">
    <source media="(max-width: 991px)"
            srcset="https://cdn.betpirmedia.com/casino_top/664x140.png">
    <source media="(max-width: 1023px)"
            srcset="https://cdn.betpirmedia.com/casino_top/859x140.png">
    <source media="(max-width: 1199px)"
            srcset="https://cdn.betpirmedia.com/casino_top/891x140.png">
    <source media="(max-width: 1443px)"
            srcset="https://cdn.betpirmedia.com/casino_top/1073x140.png">
    <source media="(max-width: 1535px)"
            srcset="https://cdn.betpirmedia.com/casino_top/1313x140.png">
    <source media="(max-width: 1919px)"
            srcset="https://cdn.betpirmedia.com/casino_top/1405x140.png">
    <img src="https://cdn.betpirmedia.com/casino_top/1789x140.png"
         alt="Casino Banner" loading="lazy">
  </picture>
</div>
      
      
        ${renderTabs()}
        ${renderSearch()}
        <div id="casino-new-content" class="casino-new__content">
          <div class="casino-new__left" id="casino-new-left">
            ${renderProvidersSkeleton(18)}
          </div>
          <div class="casino-new__right" id="casino-new-right">
            ${renderSkeleton(36)}
          </div>
        </div>
      </div>
    `;
  }

  function setActiveTabUI(root, key) {
    qsa(".casino-new__tab", root).forEach((btn) => {
      const isActive = btn.dataset.tab === key;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  // ✅ provider seçilince tablar iptal: hepsinin active'ini kaldır
  function clearTabsUI(root) {
    qsa(".casino-new__tab", root).forEach((btn) => {
      btn.classList.remove("is-active");
      btn.setAttribute("aria-selected", "false");
    });
  }

  function setTabsDisabled(root, disabled) {
    const tabsWrap = qs(".casino-new__tabs", root);
    if (!tabsWrap) return;
    tabsWrap.classList.toggle("is-disabled", !!disabled);
  }

  async function ensureProvidersRendered(root) {
    const left = qs("#casino-new-left", root);
    if (!left) return;

    if (AppState.providers && left.querySelector(".casino-new__providers-grid"))
      return;

    left.innerHTML = renderProvidersSkeleton(18);

    const reqId = ++AppState.providersRequestId;
    const providers = await fetchProviders();
    if (reqId !== AppState.providersRequestId) return;

    left.innerHTML = renderProvidersPanel(providers);
  }

  // -----------------------------
  // Main render flow
  // -----------------------------
  async function loadAndRenderActivePanel(root) {
    const right = qs("#casino-new-right", root);
    if (!right) return;

    await ensureProvidersRendered(root);

    const reqId = ++AppState.requestId;
    right.innerHTML = renderSkeleton(36);

    const qRaw = (AppState.searchQuery || "").trim();

    // ✅ GLOBAL SEARCH (2+ karakter): tab/provider bağımsız, casino.js gibi API search
    if (qRaw.length >= 2) {
      // UI durumunu bozma: provider seçiliyse tablar disabled kalsın
      if (AppState.selectedProvider) {
        // setTabsDisabled(root, true);
        // clearTabsUI(root);
        setTabsDisabled(root, false);
        setActiveTabUI(root, AppState.activeTab);
      } else {
        setTabsDisabled(root, false);
        // aktif tab highlight kalsın (UI bozulmasın)
        setActiveTabUI(root, AppState.activeTab);
      }

      const list = await searchGamesGlobal(qRaw);
      if (reqId !== AppState.requestId) return;

      right.innerHTML = renderGames(list);
      return;
    }

    if (AppState.selectedProvider) {
      setTabsDisabled(root, true);
      clearTabsUI(root);

      const provider = AppState.selectedProvider;

      const specialSlug = getSpecialGroupSlugByProvider(provider);
      if (specialSlug) {
        const games = await fetchGroupGamesDirectBySlug(specialSlug);
        if (reqId !== AppState.requestId) return;

        right.innerHTML = renderGames(games || []);
        return;
      }

      // ✅ SADECE PRAGMATIC PLAY: sekmelerle aynı group API'den slug "pragmatic-play-yeni" çek
      if (isPragmaticProvider(provider)) {
        const games = await fetchGroupGamesDirectBySlug("pragmatic-play-yeni");
        if (reqId !== AppState.requestId) return;

        right.innerHTML = renderGames(games || []);
        return;
      }

      // ✅ Diğer provider'lar: mevcut provider endpoint mantığı
      const { games: providerGames } = await getProviderGames(provider);
      if (reqId !== AppState.requestId) return;

      right.innerHTML = renderGames(providerGames || []);
      return;
    }

    // ✅ 2) TAB MODU (provider yok) — arama yokken
    setTabsDisabled(root, false);

    const active = TABS.find((t) => t.key === AppState.activeTab) || TABS[0];
    setActiveTabUI(root, active.key);

    const games = await fetchGroupGamesBySlug(active.slug);
    if (reqId !== AppState.requestId) return;

    right.innerHTML = renderGames(games);
  }

  function bindEvents(root) {
    // Provider search (desktop + mobile ortak)

    root.addEventListener("input", (e) => {
      const input = e.target.closest("[data-provider-search]");
      if (!input) return;

      AppState.providerSearchQuery = input.value || "";

      if (window.matchMedia("(min-width: 769px)").matches) {
        const grid = qs("#desktop-provider-grid", root);
        if (grid && AppState.providers) {
          grid.innerHTML = filterProvidersByQuery(
            AppState.providers,
            AppState.providerSearchQuery,
          )
            .map((p) => {
              const id = String(p?.id ?? "");
              const identifier = String(p?.identifier ?? "");
              const name = String(p?.name ?? "");
              const image = resolveProviderImage(p);
              const isSelected =
                AppState.selectedProvider &&
                String(AppState.selectedProvider.id) === id;

              return `
            <div class="casino-new__provider ${isSelected ? "is-selected" : ""}"
              role="button"
              tabindex="0"
              data-provider="${safeAttr(id)}"
              data-identifier="${safeAttr(identifier)}"
              data-name="${safeAttr(name)}"
              data-image="${safeAttr(image)}">
              <img src="${safeAttr(image)}" alt="${safeAttr(
                name,
              )}" loading="lazy">
            </div>
          `;
            })
            .join("");
        }
      }

      // 🔥 MOBİL: SADECE GRID GÜNCELLE
      const grid = qs("#provider-dropdown-grid");
      if (grid && AppState.providers) {
        grid.innerHTML = filterProvidersByQuery(
          AppState.providers,
          AppState.providerSearchQuery,
        )
          .map((p) => {
            const isSel =
              AppState.selectedProvider &&
              String(AppState.selectedProvider.id) === String(p.id);

            return `
            <div class="provider-dd-item ${isSel ? "is-selected" : ""}"
              data-provider="${safeAttr(p.id)}"
              data-identifier="${safeAttr(p.identifier || "")}"
              data-name="${safeAttr(p.name || "")}"
              data-image="${safeAttr(resolveProviderImage(p))}">
              <img src="${safeAttr(resolveProviderImage(p))}" alt="${safeAttr(
                p.name,
              )}">
            </div>
          `;
          })
          .join("");
      }
    });

    // Tabs
    qsa(".casino-new__tab", root).forEach((btn) => {
      btn.onclick = () => {
        const key = btn.dataset.tab;
        if (!key) return;

        const hadProvider = !!AppState.selectedProvider;

        // ✅ Eğer provider seçiliyse: önce iptal et
        if (hadProvider) {
          AppState.selectedProvider = null;

          // Desktop sol panel refresh (seçili provider highlight kalksın)
          const left = qs("#casino-new-left", root);
          if (left && AppState.providers)
            left.innerHTML = renderProvidersPanel(AppState.providers);

          // dropdown varsa kapat
          qs(".provider-dropdown")?.remove();
        }

        // ✅ provider yokken ve aynı tab ise boşuna fetch etme
        if (!hadProvider && key === AppState.activeTab) return;

        AppState.activeTab = key;

        // tab UI
        setTabsDisabled(root, false);
        setActiveTabUI(root, key);

        loadAndRenderActivePanel(root);
      };
    });

    // Search input
    const input = qs("#casino-new-search-input", root);
    if (input) {
      input.value = AppState.searchQuery || "";

      const run = () => {
        AppState.searchQuery = (input.value || "").trim();

        if (AppState.searchDebounce) clearTimeout(AppState.searchDebounce);
        AppState.searchDebounce = setTimeout(() => {
          loadAndRenderActivePanel(root);
        }, 250);
      };

      input.addEventListener("input", run);

      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (AppState.searchDebounce) clearTimeout(AppState.searchDebounce);
          loadAndRenderActivePanel(root);
        }
      });
    }

    // ❌ Mobilde dropdown auto-close YOK
    document.addEventListener("click", (e) => {
      if (window.matchMedia("(max-width: 768px)").matches) return;

      const dd = qs(".provider-dropdown");
      const btn = qs("#filter-btn");
      if (!dd) return;
      if (dd.contains(e.target)) return;
      if (btn.contains(e.target)) return;

      dd.remove();
    });

    const filterBtn = qs("#filter-btn", root);
    if (filterBtn) {
      filterBtn.addEventListener("click", async (ev) => {
        ev.preventDefault();

        let dropdown = qs(".provider-dropdown");
        if (dropdown) {
          dropdown.remove();
          return;
        }

        if (!AppState.providers || !AppState.providers.length) {
          await fetchProviders();
        }

        dropdown = document.createElement("div");
        dropdown.className = "provider-dropdown";
        dropdown.innerHTML = renderProviderDropdownContent();

        qs(".casino-new__searchwrap", root)?.appendChild(dropdown);

        // 🔥 MOBİL KLAVYE SABİT KALSIN
        requestAnimationFrame(() => {
          qs("#provider-search-input", dropdown)?.focus();
        });
      });
    }

    // Providers click (delegation) — ✅ hem dropdown hem desktop panel
    root.addEventListener("click", async (e) => {
      // 1) ✅ MOBİL DROPDOWN ITEM seçimi
      const ddItem = e.target.closest(".provider-dd-item");
      if (ddItem) {
        const provider = {
          id: ddItem.dataset.provider,
          identifier: ddItem.dataset.identifier || "",
          name: ddItem.dataset.name || "",
          image: ddItem.dataset.image || "",
        };

        const wasSelected =
          AppState.selectedProvider &&
          String(AppState.selectedProvider.id) === String(provider.id);

        if (wasSelected) {
          // 🔁 aynı sağlayıcıya tekrar basıldı → iptal et
          AppState.selectedProvider = null;
          AppState.activeTab = AppState.lastTabBeforeProvider || "all";

          setTabsDisabled(root, false);
          setActiveTabUI(root, AppState.activeTab);
        } else {
          // ✅ yeni sağlayıcı seçildi
          AppState.lastTabBeforeProvider = AppState.activeTab || "all";
          AppState.selectedProvider = provider;

          // clearTabsUI(root);
          // setTabsDisabled(root, true);

          setTabsDisabled(root, false);
          setActiveTabUI(root, AppState.activeTab);
        }

        // dropdown kapat
        qs(".provider-dropdown")?.remove();

        // 🔥 Desktop paneli yeniden render et → is-selected görünür
        const left = qs("#casino-new-left", root);
        if (left && AppState.providers)
          left.innerHTML = renderProvidersPanel(AppState.providers);

        loadAndRenderActivePanel(root);
        return;
      }

      // 2) ✅ DESKTOP "Temizle" butonu (sol panel)
      const clearBtn = e.target.closest(".casino-new__providers-clear");
      if (clearBtn) {
        if (!AppState.selectedProvider) return;

        AppState.selectedProvider = null;
        AppState.activeTab = AppState.lastTabBeforeProvider || "all";

        // Desktop sol panel refresh
        const left = qs("#casino-new-left", root);
        if (left && AppState.providers)
          left.innerHTML = renderProvidersPanel(AppState.providers);

        // tabları yeniden aktif et
        setTabsDisabled(root, false);
        setActiveTabUI(root, AppState.activeTab);

        loadAndRenderActivePanel(root);
        return;
      }

      // 3) ✅ DESKTOP provider panel item seçimi (.casino-new__provider)
      const option = e.target.closest(".casino-new__provider");
      if (!option) return;

      const provider = {
        id: option.dataset.provider,
        identifier: option.dataset.identifier || "",
        name: option.dataset.name || "",
        image: option.dataset.image || "",
      };

      const wasSelected =
        AppState.selectedProvider &&
        String(AppState.selectedProvider.id) === String(provider.id);

      if (wasSelected) {
        AppState.selectedProvider = null;
        AppState.activeTab = AppState.lastTabBeforeProvider || "all";
        setTabsDisabled(root, false);
        setActiveTabUI(root, AppState.activeTab);
      } else {
        AppState.lastTabBeforeProvider = AppState.activeTab || "all";
        AppState.selectedProvider = provider;
        // clearTabsUI(root);
        // setTabsDisabled(root, true);

        setTabsDisabled(root, false);
        setActiveTabUI(root, AppState.activeTab);
      }

      // dropdown varsa kapat
      qs(".provider-dropdown")?.remove();

      // Desktop sol panel refresh
      const left = qs("#casino-new-left", root);
      if (left && AppState.providers)
        left.innerHTML = renderProvidersPanel(AppState.providers);

      loadAndRenderActivePanel(root);
    });
  }

  async function render() {
    const mount = await waitForElement(CONFIG.mountSelector, 6000);
    if (!mount) return;

    if (!isCasinoRoute(location.pathname)) return;

    const existingRoot = qs(`.${CONFIG.rootClass}`);
    if (existingRoot) {
      await loadAndRenderActivePanel(existingRoot);
      AppState.isRendered = true;

      // ✅ casino sayfası tekrar açıldıysa bir daha kontrol
      maybeAutoOpenSidebarOnCasinoDesktop();
      return;
    }

    const wrap = document.createElement("div");
    wrap.innerHTML = await renderRootShell();

    const rootEl = wrap.firstElementChild;
    if (!rootEl) return;

    mount.prepend(rootEl);
    bindEvents(rootEl);

    AppState.isRendered = true;
    await loadAndRenderActivePanel(rootEl);

    // ✅ mount bitti, buton/Sidebar hazırsa aç
    maybeAutoOpenSidebarOnCasinoDesktop();
  }

  function cleanup() {
    qs(`.${CONFIG.rootClass}`)?.remove();
    qs(".provider-dropdown")?.remove();

    AppState.isRendered = false;
    AppState.requestId++;

    if (AppState.searchDebounce) {
      clearTimeout(AppState.searchDebounce);
      AppState.searchDebounce = null;
    }

    AppState.providersRequestId++;
  }

  // function handleRoute() {
  //   if (isCasinoRoute(location.pathname)) render();
  //   else cleanup();
  // }

  // function handleRoute() {
  //   const onCasino = isCasinoRoute(location.pathname);

  //   // ✅ /casino'ya girince sidebar active, çıkınca kaldır
  //   // toggleCasinoSidebarActive(onCasino);

  //   if (onCasino) render();
  //   else cleanup();
  // }

  function handleRoute() {
    const currentPath = location.pathname;

    // ✅ SADECE /casino sayfasındaysa çalış (live-casino DEĞİL)
    if (isCasinoRoute(currentPath) && !currentPath.includes("/live-casino")) {
      ensureCasinoOnlyHideStyle();
      render();
      hideCasinoSectionsByTitles();
      maybeAutoOpenSidebarOnCasinoDesktop();
    } else {
      // ✅ /casino'dan çıkıldı - temizlik yap
      removeCasinoOnlyHideStyle();
      cleanup();
    }
  }

  function patchHistoryEvents() {
    // ✅ GLOBAL history patching - sadece 1 kez yapılmalı
    if (window.__globalHistoryPatched) return;
    window.__globalHistoryPatched = true;

    const fire = () => {
      window.dispatchEvent(new Event("locationchange"));
    };

    const _pushState = history.pushState;
    history.pushState = function () {
      const ret = _pushState.apply(this, arguments);
      fire();
      return ret;
    };

    const _replaceState = history.replaceState;
    history.replaceState = function () {
      const ret = _replaceState.apply(this, arguments);
      fire();
      return ret;
    };

    window.addEventListener("popstate", fire);
  }

  function init() {
    patchHistoryEvents();

    // ✅ ilk açılış
    handleRoute();

    // ✅ SPA navigate (pushState/replaceState) + geri/ileri
    window.addEventListener("locationchange", handleRoute);

    // ✅ bazı temalarda içerik geç basılıyor → bir kere daha dene
    document.addEventListener("DOMContentLoaded", handleRoute, { once: true });
    window.addEventListener("resize", () => {
      maybeAutoOpenSidebarOnCasinoDesktop();
    });

    // ✅ ilk açılış + dinamik yüklemeler için
    setup3oaksHideObserver();
    hideCasinoSectionsByTitles();
  }

  init();
})();
