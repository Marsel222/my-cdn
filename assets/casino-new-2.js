
<script>
(function () {
  "use strict";

  /* Config */
  const CONFIG = {
    casinoPaths: ["/casino", "/casino/group/lobby", "/casino/group/live-lobby", "/live-casino"],
    rootClass: "casino-new-root",
    mountSelector: "#main__content",

    rt: () => Math.floor(Date.now() / 1000),

    api: {
      casino: {
        url: "https://api1.jukd049944jdjdh333ikslisspoelerss44shh334opodjd4ssd.com/api/player/public/games/group/casino",
        payload: () => ({ language: "tr", rt: CONFIG.rt() }),
      },
      /*
      live: {
        url: "https://api1.jukd049944jdjdh333ikslisspoelerss44shh334opodjd4ssd.com/api/player/public/games/group/live",
        payload: () => ({ language: "tr", rt: CONFIG.rt() }),
      },
      */
    },

    providersApi: {
      casino: {
        url: "https://api1.jukd049944jdjdh333ikslisspoelerss44shh334opodjd4ssd.com/api/player/public/providers/group/lobby",
        payload: () => ({ type: "lobby", rt: CONFIG.rt() }),
      },
      live: {
        url: "https://api1.jukd049944jdjdh333ikslisspoelerss44shh334opodjd4ssd.com/api/player/public/providers/group/live-lobby",
        payload: () => ({ type: "live-lobby", rt: CONFIG.rt() }),
      },
    },

    games2Base: "https://api1.jukdkdjruf33434hhdshh334opodjd4ssd.com/api/player/public",

    games2LiveLobby: {
      url: "https://api1.jukd049944jdjdh333ikslisspoelerss44shh334opodjd4ssd.com/api/player/public/games2/group/live-lobby",
      payload: () => ({ type: "live-lobby", page: 1, limit: 5000, sortBy: "sort", direction: "desc", rt: CONFIG.rt() }),
    },

    searchApi: {
      url: "https://api1.jukd049944jdjdh333ikslisspoelerss44shh334opodjd4ssd.com/api/player/public/games2/search",
    },
  };

  /* State */
  const AppState = {
    activeTab: null,
    lastTabBeforeProvider: null,

    tabs: [],
    tabsLoading: false,

    _categoriesCache: null,
    _categoriesFetching: null,

    gamesCache: Object.create(null),
    gamesLoading: Object.create(null),

    searchQuery: "",
    searchDebounce: null,

    providers: null,
    providersLoading: false,
    selectedProvider: null,
    providerSearchQuery: "",
    providerGamesCache: Object.create(null),

    requestId: 0,
    providersRequestId: 0,
    _stateGen: 0,

    _onDocClick: null,
  };

  /* Helpers */
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

          const img = resolveProviderImage(p);
          return `
            <div class="provider-dd-item ${isSel ? "is-selected" : ""}"
              data-provider="${safeAttr(p.id)}"
              data-identifier="${safeAttr(p.identifier || "")}"
              data-name="${safeAttr(p.name || "")}">
              <img src="${safeAttr(img)}" alt="${safeAttr(p.name || "")}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display=''">
              <span style="display:none">${safeAttr(p.name || p.identifier || "")}</span>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
  }

  const VENDOR_CDN = "https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/game-providers/light";
  const VENDOR_CDN2 = "https://cdn.ebetlab.com/ebetlab/game-providers/light";

  const VENDOR_IMAGE_MAP = {
    "pushgaming":       { cdn: VENDOR_CDN2, file: "push_gaming" },
    "gaming-corps":     { cdn: VENDOR_CDN2, file: "Gaming%20Corps%20Dark%20Logo%20SVG" },
    "pragmaticplay":    "pragmaticplay",
    "egtinteractive":   "egt",
    "egt-interactive":  "amusnet",
    "pgsoft":           "Pocket%20Games%20Soft",
    "5men":             "5men",
    "alg":              "alg",
    "amatic":           "amatic",
    "avatarux":         "avatarux",
    "belatra":          "belatra",
    "beterlive":        "beterlive",
    "betsolutions":     "Betsolutions",
    "bgaming":          "softswiss",
    "booming":          "booming",
    "endorphina":       "endorphina",
    "evoplay":          "evoplay",
    "ezugi":            "ezugi",
    "fantasma":         "fantasma",
    "fazi":             "fazi",
    "gamebeat":         "gamebeat",
    "gamzix":           "gamezix",
    "hollegames":       "hollegames",
    "playson":          "playson",
    "jaderabbit":       "jaderabbit",
    "kagaming":         "KAGa",
    "kalamba":          "kalamba",
    "lucky":            "lucky",
    "mancala":          "mancala",
    "mrslotty":         "mrslotty",
    "mplay":            "m%20play",
    "netgame":          "netgame",
    "novomatic":        "novomatic",
    "nucleus":          "nucleus",
    "onlyplay":         "onlyplay",
    "oryx":             "oryx",
    "platipus":         "platipus",
    "popiplay":         "popiplay",
    "quickspin":        "quickspin",
    "smartsoft":        "smartsoft",
    "spadegaming":      "spadegaming",
    "everymatrix":      "everymatrix",
    "spinza":           "spinza",
    "spribe":           "spribe",
    "swintt":           "swintt",
    "tomhornnative":    "tomhorn",
    "truelab":          "truelab",
    "turbogames":       "turbogames",
    "wazdan":           "wazdan",
    "zillion":          "zillion",
    "aesexybaccarat":   "AE%20Sexy",
    "asiagaming":       "Asia%20Gaming",
    "beefee":           "BeeFee%20Games",
    "betradarvs":       "Betradar%20Virtual%20sports",
    "betsoft":          "betsoft",
    "concept":          "Concept%20Gaming",
    "cq9":              "CQ9",
    "ctgaming":         "CT%20Gaming",
    "evolution":        "Evolution%20Gaming",
    "habanero":         "habanero",
    "hogaming":         "HoGaming",
    "igrosoft":         "Igrosoft",
    "kiron":            "Kiron%20Interactive",
    "leap":             "Leap",
    "livegames":        "Live%20Games",
    "luckystreak":      "luckystreak",
    "mascotgaming":     "mascot",
    "netent":           "netent",
    "sagaming":         "SA%20Gaming",
    "salsa":            "Salsa%20technology",
    "spinomenal":       "spinomenal",
    "vivogaming":       "Vivo%20Gaming",
    "yggdrasil":        "yggdrasil",
    "nolimitcity":      "NoLimitCity",
    "redtiger":         "Red%20Tiger%20Gaming",
    "jdb":              "JDB",
    "gaming7777":       "Gaming%207777",
    "gamomat":          "gamomat",
    "givme":            "givme%20games",
    "goldenhero":       "golden%20hero",
    "atomic":           "atomic%20slot",
    "fugaso":           "fugaso",
    "tvbet":            "tv%20bet",
    "7mojos":           "7%20mojos",
    "pragmaticlive":    "pragmatic-live-light",
    "hacksaw":          "hacksaw",
    "ebetlab":          "originals",
    "galaxys":          "galaxy%20gaming",
    "imagine-live":     "imageinelive",
    "imoon":            "imoon",
    "inout":            "InOut",
    "jiliasia":         "Jiliasia",
    "royal-gaming":     "Royal%20Gaming",
    "tada-gaming":      "Tada%20Gaming",
    "zeus-play":        "Zeus%20Play",
    "peter-and-sons":   "Peter%20And%20Sons",
    "popok":            "Popok",
    "ygrgames":         "YGR",
    "fbastards":        "F_Bastards",
    "victoryark":       "Victory%20Ark",
    "urgentgames":      "Urgent%20games",
    "rubyplay":         "ruby%20play",
    "relaxgaming":      "relax%20gaming",
  };

  function resolveProviderImage(provider) {
    const idf = normIdentifier(provider?.identifier || "");
    if (!idf) return "";
    const entry = VENDOR_IMAGE_MAP[idf];
    if (entry && typeof entry === "object") return `${entry.cdn}/${entry.file}.svg`;
    const file = entry || idf;
    return `${VENDOR_CDN}/${file}.svg`;
  }

  function filterProvidersByQuery(providers, query) {
    if (!providers) return [];
    if (!query) return providers;
    const q = normStr(query);
    return providers.filter((p) => {
      return normStr(p.name).includes(q) || normStr(p.identifier).includes(q);
    });
  }

  function ensureCasinoGlobalStyle() {
    if (document.getElementById("casino-global-style")) return;
    const style = document.createElement("style");
    style.id = "casino-global-style";
    style.textContent = `
      body[data-casino] .casino-hidden,
      body[data-casino] #main__content > .section:not(.section--first:has(.mini-slider)) {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  function hideCasinoSections() {
    if (!document.body.hasAttribute("data-casino")) return;

    const norm = (s) =>
      String(s || "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\u0131/g, "i");

    const tabSlugs = new Set(AppState.tabs.map((t) => norm(t.label)));

    document.querySelectorAll(".section__title, .section-title").forEach((t) => {
      const txt = norm(t.textContent || "");
      if (!txt || !tabSlugs.has(txt)) return;
      const section = t.closest(".section");
      if (section) section.classList.add("casino-hidden");
    });
  }

  const __casinoSidebarAuto = {
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
    return document.querySelector("button.sidebar__btn");
  }

  function isDesktop() {
    return window.matchMedia("(min-width: 769px)").matches;
  }

  function isSidebarActive(sidebar) {
    if (!sidebar) return false;
    return sidebar.classList.contains("active");
  }

  async function maybeAutoOpenSidebarOnCasinoDesktop() {
    const casinoNow = isCasinoRoute(location.pathname);
    const desktopNow = isDesktop();

    if (!casinoNow || !desktopNow) {
      __casinoSidebarAuto.didOpenOnThisVisit = false;
      return;
    }

    const sidebar = getSidebarEl();
    if (!sidebar) return;

    if (isSidebarActive(sidebar)) return;
    if (__casinoSidebarAuto.didOpenOnThisVisit) return;

    let btn = getSidebarBtn();
    if (!btn) btn = await waitForElement("button.sidebar__btn", 2500);
    if (!btn) return;

    if (isSidebarActive(getSidebarEl())) return;

    btn.click();

    __casinoSidebarAuto.didOpenOnThisVisit = true;
  }

  function normIdentifier(s) {
    return String(s || "")
      .trim()
      .toLowerCase()
      .replace(/[\s_]/g, "-");
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

  /* Styles */
  function ensureMobileCasinoStyles() {
    if (document.getElementById("casino-mobile-grid-style")) return;
    const style = document.createElement("style");
    style.id = "casino-mobile-grid-style";
    style.textContent = `
  .provider-dd-item.is-selected {
    background: var(--tf-hvr2);
    border-color: rgba(255,255,255,.16);
  }

  @media (max-width: 768px) {
    .casino-new__searchwrap {
      position: relative;
      z-index: 30;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    .casino-new__left {
      display: none;
    }

    .casino-new__filter-btn {
      background: var(--tf-hvr1);
      border: 1px solid rgba(255,255,255,.06);
      padding: 0 14px;
      height: 40px;
      border-radius: 8px;
      cursor: pointer;
      color: var(--tf-tc3);
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background .2s;
      flex-shrink: 0;
    }

    .casino-new__filter-btn:hover {
      background: var(--tf-hvr2);
    }

    .provider-dropdown {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background: var(--tf-bg, #13151f);
      backdrop-filter: blur(10px);
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,.06);
      padding: 12px;
      max-height: 60vh;
      overflow-y: auto;
      z-index: 9999;
      box-shadow: 0 16px 40px rgba(0,0,0,.5);
    }

    .provider-dropdown-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0,1fr));
      gap: 8px;
    }

    .provider-dd-item {
      background: var(--tf-hvr1);
      border-radius: 8px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background .15s, border-color .15s;
      border: 1px solid rgba(255,255,255,.06);
    }

    .provider-dd-item:active {
      transform: scale(.97);
    }

    .provider-dd-item:hover {
      background: var(--tf-hvr2);
      border-color: rgba(255,255,255,.12);
    }

    .provider-dd-item img {
      max-height: 30px;
      max-width: 80%;
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
  /* Root */
  .casino-new-root.casino-container.container {
    padding: 16px 24px !important;
  }

  /* Tabs */
  .casino-new__tabs {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 6px;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    padding: 0 0 12px 0;
    scrollbar-width: none;
  }

  .casino-new__tabs::-webkit-scrollbar {
    display: none;
  }

  .casino-new__tab {
    cursor: pointer;
    border: none;
    background: var(--tf-bg2);
    color: var(--tf-tc3);
    padding: 0 14px;
    height: 40px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: .4px;
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    white-space: nowrap;
    scroll-snap-align: start;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: background .2s, color .2s;
  }

  .casino-new__tab:hover {
    background: var(--tf-hvr2);
    color: #fff;
  }

  .casino-new__tab.is-active {
    background: var(--tf-btn);
    color: var(--tf-tc);
  }

  /* Search */
  .casino-new__searchwrap {
    padding: 0 0 12px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .casino-new__search {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--tf-bg2);
    border: 1px solid rgba(255,255,255,.06);
    border-radius: 8px;
    padding: 0 14px;
    height: 40px;
    transition: border-color .2s;
  }

  .casino-new__search:focus-within {
    border-color: rgba(255,255,255,.16);
  }

  .casino-new__search svg {
    width: 16px;
    height: 16px;
    flex: 0 0 16px;
    color: var(--tf-tc3);
  }

  .casino-new__search input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: #fff;
    font-weight: 400;
    font-size: 14px;
  }

  .casino-new__search input::placeholder {
    color: var(--tf-tc3);
  }

  /* Layout */
  #casino-new-content.casino-new__content {
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }

  .casino-new__left {
    width: 200px;
    flex-shrink: 0;
    height: 720px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,.1) transparent;
  }

  .casino-new__left::-webkit-scrollbar { width: 3px; }
  .casino-new__left::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,.1);
    border-radius: 999px;
  }

  .casino-new__right {
    flex: 1;
    min-width: 0;
    height: 720px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,.1) transparent;
  }

  .casino-new__right::-webkit-scrollbar { width: 3px; }
  .casino-new__right::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,.1);
    border-radius: 999px;
  }

  /* Providers panel */
  .casino-new__providers {
    background: var(--tf-bg2);
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,.06);
    padding: 12px;
  }

  .casino-new__providers-clear {
    cursor: pointer;
    border: none;
    background: var(--tf-hvr1);
    color: var(--tf-tc3);
    font-weight: 500;
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 6px;
    transition: background .2s, color .2s;
  }

  .casino-new__providers-clear:hover {
    background: var(--tf-hvr2);
    color: #fff;
  }

  .casino-new__providers-search {
    margin: 0 0 10px 0;
  }

  .casino-new__providers-search input {
    width: 100%;
    background: var(--tf-hvr1);
    border: 1px solid rgba(255,255,255,.06);
    border-radius: 8px;
    padding: 8px 12px;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    outline: none;
    transition: border-color .2s;
  }

  .casino-new__providers-search input:focus {
    border-color: rgba(255,255,255,.16);
  }

  .casino-new__providers-search input::placeholder {
    color: var(--tf-tc3);
  }

  .casino-new__providers-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
  }

  .casino-new__provider {
    cursor: pointer;
    border-radius: 8px;
    background: var(--tf-hvr1);
    border: 1px solid rgba(255,255,255,.06);
    transition: background .15s, border-color .15s;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    padding: 8px 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    min-height: 48px;
  }

  .casino-new__provider:hover {
    background: var(--tf-hvr2);
    border-color: rgba(255,255,255,.12);
  }

  .casino-new__provider:active {
    transform: scale(.97);
  }

  .casino-new__provider img {
    max-width: 88%;
    max-height: 26px;
    display: block;
    object-fit: contain;
    pointer-events: none;
  }

  .casino-new__provider span {
    font-size: 10px;
    font-weight: 500;
    color: var(--tf-tc3);
    text-align: center;
    line-height: 1.2;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .casino-new__provider.is-selected {
    background: var(--tf-btn);
    border-color: rgba(255,255,255,.12);
  }

  /* Provider skeleton */
  .casino-new__providers-skel {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
  }

  .casino-new__provider-skel {
    height: 48px;
    border-radius: 8px;
    background: var(--tf-hvr1);
    position: relative;
    overflow: hidden;
  }

  .casino-new__provider-skel::after,
  .casino-new__skel-box::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent);
    animation: casinoSkel 1.4s ease-in-out infinite;
  }

  .casino-new__skeleton .game-card {
    pointer-events: none;
  }

  .casino-new__skeleton .game-image {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .casino-new__skel-box {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background: var(--tf-hvr1);
    position: relative;
    overflow: hidden;
  }

  @keyframes casinoSkel {
    0%   { transform: translateX(0); }
    100% { transform: translateX(280%); }
  }

  /* Game cards */
  .game-card {
    margin-top: 0 !important;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;
    background: rgba(255,255,255,.02);
    text-decoration: none;
  }

  .game-card .game-image {
    position: relative;
    width: 100%;
    aspect-ratio: 3 / 4;
    overflow: hidden;
  }

  .game-card .game-image img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: filter .4s, transform .5s;
  }

  .game-card .game-image::after {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--tf-bg, #13151f);
    opacity: 0;
    pointer-events: none;
    transition: opacity .35s;
  }

  @media (hover: hover) {
    .game-card:hover .game-image img {
      transform: scale(1.08);
      filter: blur(2px);
    }

    .game-card:hover .game-image::after {
      opacity: .75;
    }

    .game-card:hover .game-image::before {
      opacity: 1;
    }
  }

  .game-card .game-image::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    width: 36%;
    aspect-ratio: 1 / 1;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 45%;
    background-image: var(--play-icon);
    background-color: var(--tf-active);
    border-radius: 999px;
    z-index: 2;
    opacity: 0;
    pointer-events: none;
    transition: opacity .35s;
  }

  /* Game grid */
  .games-container {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 10px;
  }

  @media (max-width: 768px) {
    .casino-new-root.casino-container.container {
      padding: 12px 12px !important;
    }

    #casino-new-content.casino-new__content {
      display: block;
    }

    .casino-new__left {
      width: 100%;
      height: auto;
      margin-bottom: 12px;
    }

    .casino-new__right {
      width: 100%;
      height: auto;
    }

    .games-container {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    .games-container {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  @media (min-width: 769px) {
    .provider-dropdown,
    #filter-btn {
      display: none !important;
    }

    .games-container {
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 10px;
    }
  }

  @media (min-width: 1200px) {
    .games-container {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
  }

  .casino-new__empty {
    color: var(--tf-tc3);
    padding: 16px 2px;
    font-size: 14px;
    font-weight: 500;
  }
  `;
    document.head.appendChild(style);
  }

  /* Search */
  async function searchGamesGlobal(query) {
    try {
      const res = await fetch(CONFIG.searchApi.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: query, rt: CONFIG.rt() }),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      return list;
    } catch (e) {
      return [];
    }
  }

  /* Providers */
  function isLiveCasinoPage() {
    const path = window.location.pathname;
    return path.includes("/live-casino") || path.includes("/live-lobby");
  }

  async function fetchProviders() {
    if (AppState.providers) return AppState.providers;
    if (AppState.providersLoading) {
      return new Promise((resolve) => {
        let elapsed = 0;
        const poll = setInterval(() => {
          elapsed += 50;
          if (!AppState.providersLoading || elapsed > 15000) {
            clearInterval(poll);
            resolve(AppState.providers || []);
          }
        }, 50);
      });
    }
    const gen = AppState._stateGen;
    AppState.providersLoading = true;
    try {
      const api = isLiveCasinoPage() ? CONFIG.providersApi.live : CONFIG.providersApi.casino;
      const res = await fetch(api.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(api.payload()),
      });
      if (!res.ok) throw new Error(`providers fetch failed: ${res.status}`);
      const json = await res.json();
      if (gen !== AppState._stateGen) return [];
      const providers = Array.isArray(json?.data) ? json.data : [];
      AppState.providers = providers;
      return providers;
    } catch (e) {
      if (gen === AppState._stateGen) AppState.providers = [];
      return [];
    } finally {
      if (gen === AppState._stateGen) AppState.providersLoading = false;
    }
  }

  function renderProvidersSkeleton(count = 18) {
    return `
      <div class="casino-new__providers">
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
              const isSelected = selectedId && id === selectedId;
              const img = resolveProviderImage(p);
              return `
                <div class="casino-new__provider ${
                  isSelected ? "is-selected" : ""
                }"
                     role="button"
                     tabindex="0"
                     data-provider="${safeAttr(id)}"
                     data-identifier="${safeAttr(identifier)}"
                     data-name="${safeAttr(name)}">
                  <img src="${safeAttr(img)}" alt="${safeAttr(name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display=''">
                  <span style="display:none">${safeAttr(name)}</span>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  /* Provider games fetch */
  async function fetchGamesByProviderSlots(provider) {
    try {
      const ts = CONFIG.rt();
      const provIdentifierRaw = (provider && provider.identifier) || "";

      if (provIdentifierRaw) {
        try {
          const categories = await fetchAllCategories();
          const allGames = [];
          for (const cat of categories) {
            if (Array.isArray(cat.group)) {
              for (const g of cat.group) allGames.push(g);
            }
          }
          const needle = provIdentifierRaw.toLowerCase();
          const seen = new Set();
          const filtered = allGames.filter((g) => {
            const ps = (g.provider_slug || "").toLowerCase();
            if (!ps.includes(needle) && !needle.includes(ps)) return false;
            const key = g.slug || g.id;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
          if (filtered.length) return filtered;
        } catch (_) {}
      }

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
        const providerSlug = g.provider_slug || g.providerSlug || "";
        return { slug, image, name, provider: providerName, provider_slug: providerSlug };
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

      if (provId) {
        try {
          const byId = await postAndUnwrap(
            `${CONFIG.games2Base}/games2/provider/${provId}`,
            { page: 1, limit: 100, sortBy: "sort", direction: "desc", rt: ts },
          );
          if (byId && byId.length) {
            if (provIdentifier) {
              const needleId = provIdentifier.toLowerCase();
              const filtered = byId.filter((g) => {
                const gProvSlug = (g.provider_slug || "").toLowerCase();
                return gProvSlug === needleId || gProvSlug.includes(needleId) || needleId.includes(gProvSlug);
              });
              if (filtered.length) return filtered;
            }
            return byId;
          }
        } catch (_) {}
      }

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
              const needleId = (provIdentifier || "").toLowerCase();
              const needleName = (provName || "").toLowerCase();
              const filtered = list.filter((g) => {
                const gProvider = (g.provider || "").toLowerCase();
                const gProvSlug = (g.provider_slug || "").toLowerCase();
                if (needleId) {
                  return gProvSlug.includes(needleId) || gProvSlug === needleId ||
                    needleId.includes(gProvSlug) || gProvider.includes(needleId);
                }
                return needleName ? gProvider.includes(needleName) : true;
              });
              if (filtered.length) return filtered;
            }
            return list;
          }
        } catch (_) {}
      }

      return [];
    } catch (e) {
      return [];
    }
  }

  async function getProviderGames(provider) {
    const provId = String(provider?.id || "");
    if (!provId) return { games: [] };

    let cached = AppState.providerGamesCache[provId];
    if (cached?.games) return cached;
    if (cached?.promise) return cached.promise;

    const promise = (async () => {
      const games = (await fetchGamesByProviderSlots(provider)) || [];
      AppState.providerGamesCache[provId] = { games };
      return { games };
    })();

    AppState.providerGamesCache[provId] = { promise };
    return promise;
  }

  /* Tab / group API */
  async function fetchAllCategories() {
    if (AppState._categoriesCache) return AppState._categoriesCache;
    if (AppState._categoriesFetching) return AppState._categoriesFetching;

    const gen = AppState._stateGen;
    AppState._categoriesFetching = (async () => {
      try {
        const live = isLiveCasinoPage();
        let data;

        if (live) {
          const res = await fetch(CONFIG.games2LiveLobby.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(CONFIG.games2LiveLobby.payload()),
          });
          if (!res.ok) throw new Error(`live fetch failed: ${res.status}`);
          const json = await res.json();
          const allGames = Array.isArray(json?.data?.data) ? json.data.data : [];
          data = [{ slug: "tumu", name: "Tümü", title: "Tümü", group: allGames }];
        } else {
          const api = CONFIG.api.casino;
          const res = await fetch(api.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(api.payload()),
          });
          if (!res.ok) throw new Error(`casino fetch failed: ${res.status}`);
          const json = await res.json();
          data = Array.isArray(json?.data) ? json.data : [];
        }

        if (gen !== AppState._stateGen) return [];
        if (data.length) AppState._categoriesCache = data;
        return data;
      } finally {
        if (gen === AppState._stateGen) AppState._categoriesFetching = null;
      }
    })();

    return AppState._categoriesFetching;
  }

  async function fetchTabs() {
    if (AppState.tabs.length) return AppState.tabs;
    if (AppState.tabsLoading) {
      return new Promise((resolve) => {
        let elapsed = 0;
        const poll = setInterval(() => {
          elapsed += 50;
          if (!AppState.tabsLoading || elapsed > 15000) {
            clearInterval(poll);
            resolve(AppState.tabs);
          }
        }, 50);
      });
    }
    const gen = AppState._stateGen;
    AppState.tabsLoading = true;
    try {
      const categories = await fetchAllCategories();
      if (gen !== AppState._stateGen) return [];
      AppState.tabs = categories.map((c) => ({
        slug: c.slug,
        label: c.name || c.title || c.slug,
      }));
      if (!AppState.activeTab && AppState.tabs.length) {
        AppState.activeTab = AppState.tabs[0].slug;
        AppState.lastTabBeforeProvider = AppState.activeTab;
      }
      return AppState.tabs;
    } catch (err) {
      return [];
    } finally {
      if (gen === AppState._stateGen) AppState.tabsLoading = false;
    }
  }

  function extractGames(cat) {
    if (!cat) return [];
    const g = cat.group ?? cat.games ?? cat.items ?? cat.data ?? [];
    return Array.isArray(g) ? g : [];
  }

  async function fetchGroupGamesBySlug(slug) {
    if (!slug) return [];

    if (slug in AppState.gamesCache) return AppState.gamesCache[slug];
    if (AppState.gamesLoading[slug]) {
      return new Promise((resolve) => {
        let elapsed = 0;
        const poll = setInterval(() => {
          elapsed += 50;
          if (!AppState.gamesLoading[slug] || elapsed > 15000) {
            clearInterval(poll);
            resolve(AppState.gamesCache[slug] || []);
          }
        }, 50);
      });
    }

    const gen = AppState._stateGen;
    AppState.gamesLoading[slug] = true;
    try {
      const categories = await fetchAllCategories();
      if (gen !== AppState._stateGen) return [];
      const found = categories.find((c) => c.slug === slug);
      const games = extractGames(found);
      AppState.gamesCache[slug] = games;
      return games;
    } catch (err) {
      return [];
    } finally {
      if (gen === AppState._stateGen) AppState.gamesLoading[slug] = false;
    }
  }

  /* Skeleton */
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

  /* Render helpers */
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
                 onclick="event.preventDefault(); const path = document.documentElement.lang === 'tr' ? '/tr/casino/games/${safeAttr(slug)}' : '/en/casino/games/${safeAttr(slug)}'; window.history.pushState('','',path); window.history.pushState('','',path); window.history.go(-1);">
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
        ${AppState.tabs.map((t) => {
          const a = AppState.activeTab === t.slug ? "is-active" : "";
          return `
            <button class="casino-new__tab ${a}" data-tab="${safeAttr(
              t.slug,
            )}" role="tab" aria-selected="${a ? "true" : "false"}">
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
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
      </button>
    </div>
  `;
  }

  async function renderRootShell() {
    await fetchTabs();
    return `
      <div class="${CONFIG.rootClass} casino-container container">
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

  function setActiveTabUI(root, slug) {
    qsa(".casino-new__tab", root).forEach((btn) => {
      const isActive = btn.dataset.tab === slug;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

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

  /* Main render flow */
  async function loadAndRenderActivePanel(root) {
    const right = qs("#casino-new-right", root);
    if (!right) return;

    await ensureProvidersRendered(root);

    const reqId = ++AppState.requestId;
    right.innerHTML = renderSkeleton(36);

    const qRaw = (AppState.searchQuery || "").trim();

    if (qRaw.length >= 2) {
      setTabsDisabled(root, false);
      setActiveTabUI(root, AppState.activeTab);

      const list = await searchGamesGlobal(qRaw);
      if (reqId !== AppState.requestId) return;

      right.innerHTML = renderGames(list);
      return;
    }

    if (AppState.selectedProvider) {
      setTabsDisabled(root, true);
      clearTabsUI(root);

      const provider = AppState.selectedProvider;
      const idfRaw = (provider.identifier || "").toLowerCase();

      if (isLiveCasinoPage()) {
        let games = [];
        try {
          const cats = await fetchAllCategories();
          const allCat = cats.find((c) => c.slug === "tumu");
          const all = extractGames(allCat);
          games = all.filter((g) => (g.provider_slug || "").toLowerCase() === idfRaw);
        } catch (_) {}

        if (reqId !== AppState.requestId) return;
        right.innerHTML = renderGames(games);
        return;
      }

      const IDENTIFIER_TO_GROUP_SLUG = {
        "egt-interactive": "amusnet",
        "egtinteractive": "egt",
        "pragmaticplay": "pragmatic-play",
        "hacksaw": "hacksaw-gaming",
        "pgsoft": "pgsoft",
        "evolution": "evolution",
        "relaxgaming": "relax-gaming",
        "bgaming": "bgaming",
      };

      const idf = idfRaw.replace(/-/g, "");
      const specialSlug = IDENTIFIER_TO_GROUP_SLUG[idfRaw] || IDENTIFIER_TO_GROUP_SLUG[idf] || "";

      if (specialSlug) {
        let games = [];
        try {
          const cats = await fetchAllCategories();
          const found = cats.find((c) => c.slug === specialSlug);
          games = extractGames(found);
        } catch (_) {}

        if (reqId !== AppState.requestId) return;

        if (!games || !games.length) {
          const { games: fallback } = await getProviderGames(provider);
          if (reqId !== AppState.requestId) return;
          games = fallback || [];
        }

        right.innerHTML = renderGames(games);
        return;
      }

      const { games: providerGames } = await getProviderGames(provider);
      if (reqId !== AppState.requestId) return;

      right.innerHTML = renderGames(providerGames || []);
      return;
    }

    setTabsDisabled(root, false);

    const activeSlug = AppState.activeTab || (AppState.tabs[0]?.slug ?? "");
    setActiveTabUI(root, activeSlug);

    const games = await fetchGroupGamesBySlug(activeSlug);
    if (reqId !== AppState.requestId) return;

    right.innerHTML = renderGames(games);
  }

  function bindEvents(root) {
    root.addEventListener("input", (e) => {
      const input = e.target.closest("[data-provider-search]");
      if (!input) return;

      AppState.providerSearchQuery = input.value || "";
      const filtered = filterProvidersByQuery(AppState.providers, AppState.providerSearchQuery);

      if (window.matchMedia("(min-width: 769px)").matches) {
        const grid = qs("#desktop-provider-grid", root);
        if (grid && AppState.providers) {
          grid.innerHTML = filtered
            .map((p) => {
              const id = String(p?.id ?? "");
              const identifier = String(p?.identifier ?? "");
              const name = String(p?.name ?? "");
              const isSelected =
                AppState.selectedProvider &&
                String(AppState.selectedProvider.id) === id;

              const img2 = resolveProviderImage({ identifier });
              return `
            <div class="casino-new__provider ${isSelected ? "is-selected" : ""}"
              role="button"
              tabindex="0"
              data-provider="${safeAttr(id)}"
              data-identifier="${safeAttr(identifier)}"
              data-name="${safeAttr(name)}">
              <img src="${safeAttr(img2)}" alt="${safeAttr(name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display=''">
              <span style="display:none">${safeAttr(name)}</span>
            </div>
          `;
            })
            .join("");
        }
      }

      const grid = qs("#provider-dropdown-grid");
      if (grid && AppState.providers) {
        grid.innerHTML = filtered
          .map((p) => {
            const isSel =
              AppState.selectedProvider &&
              String(AppState.selectedProvider.id) === String(p.id);

            const ddImg = resolveProviderImage(p);
            return `
            <div class="provider-dd-item ${isSel ? "is-selected" : ""}"
              data-provider="${safeAttr(p.id)}"
              data-identifier="${safeAttr(p.identifier || "")}"
              data-name="${safeAttr(p.name || "")}">
              <img src="${safeAttr(ddImg)}" alt="${safeAttr(p.name || "")}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display=''">
              <span style="display:none">${safeAttr(p.name || p.identifier || "")}</span>
            </div>
          `;
          })
          .join("");
      }
    });

    qsa(".casino-new__tab", root).forEach((btn) => {
      btn.onclick = () => {
        const slug = btn.dataset.tab;
        if (!slug) return;

        const hadProvider = !!AppState.selectedProvider;

        if (hadProvider) {
          AppState.selectedProvider = null;

          const left = qs("#casino-new-left", root);
          if (left && AppState.providers)
            left.innerHTML = renderProvidersPanel(AppState.providers);

          qs(".provider-dropdown")?.remove();
        }

        if (!hadProvider && slug === AppState.activeTab) return;

        AppState.activeTab = slug;

        setTabsDisabled(root, false);
        setActiveTabUI(root, slug);

        loadAndRenderActivePanel(root);
      };
    });

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

    const onDocClick = (e) => {
      if (window.matchMedia("(max-width: 768px)").matches) return;

      const dd = qs(".provider-dropdown");
      const btn = qs("#filter-btn");
      if (!dd) return;
      if (dd.contains(e.target)) return;
      if (btn && btn.contains(e.target)) return;

      dd.remove();
    };
    document.addEventListener("click", onDocClick);
    AppState._onDocClick = onDocClick;

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

        requestAnimationFrame(() => {
          qs("#provider-search-input", dropdown)?.focus();
        });
      });
    }

    root.addEventListener("click", async (e) => {
      const ddItem = e.target.closest(".provider-dd-item");
      if (ddItem) {
        const provider = {
          id: ddItem.dataset.provider,
          identifier: ddItem.dataset.identifier || "",
          name: ddItem.dataset.name || "",
        };

        const wasSelected =
          AppState.selectedProvider &&
          String(AppState.selectedProvider.id) === String(provider.id);

        const firstSlug = AppState.tabs[0]?.slug ?? "";

        if (wasSelected) {
          AppState.selectedProvider = null;
          AppState.activeTab = AppState.lastTabBeforeProvider || firstSlug;

          setTabsDisabled(root, false);
          setActiveTabUI(root, AppState.activeTab);
        } else {
          AppState.lastTabBeforeProvider = AppState.activeTab || firstSlug;
          AppState.selectedProvider = provider;

          setTabsDisabled(root, false);
          setActiveTabUI(root, AppState.activeTab);
        }

        qs(".provider-dropdown")?.remove();

        const left = qs("#casino-new-left", root);
        if (left && AppState.providers)
          left.innerHTML = renderProvidersPanel(AppState.providers);

        loadAndRenderActivePanel(root);
        return;
      }

      const clearBtn = e.target.closest(".casino-new__providers-clear");
      if (clearBtn) {
        if (!AppState.selectedProvider) return;

        const firstSlug = AppState.tabs[0]?.slug ?? "";
        AppState.selectedProvider = null;
        AppState.activeTab = AppState.lastTabBeforeProvider || firstSlug;

        const left = qs("#casino-new-left", root);
        if (left && AppState.providers)
          left.innerHTML = renderProvidersPanel(AppState.providers);

        setTabsDisabled(root, false);
        setActiveTabUI(root, AppState.activeTab);

        loadAndRenderActivePanel(root);
        return;
      }

      const option = e.target.closest(".casino-new__provider");
      if (!option) return;

      const provider = {
        id: option.dataset.provider,
        identifier: option.dataset.identifier || "",
        name: option.dataset.name || "",
      };

      const wasSelected =
        AppState.selectedProvider &&
        String(AppState.selectedProvider.id) === String(provider.id);

      const firstSlug2 = AppState.tabs[0]?.slug ?? "";

      if (wasSelected) {
        AppState.selectedProvider = null;
        AppState.activeTab = AppState.lastTabBeforeProvider || firstSlug2;
        setTabsDisabled(root, false);
        setActiveTabUI(root, AppState.activeTab);
      } else {
        AppState.lastTabBeforeProvider = AppState.activeTab || firstSlug2;
        AppState.selectedProvider = provider;

        setTabsDisabled(root, false);
        setActiveTabUI(root, AppState.activeTab);
      }

      qs(".provider-dropdown")?.remove();

      const left = qs("#casino-new-left", root);
      if (left && AppState.providers)
        left.innerHTML = renderProvidersPanel(AppState.providers);

      loadAndRenderActivePanel(root);
    });
  }

  function closeSidebarIfOpen() {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar && sidebar.classList.contains("active")) {
      const btn = document.querySelector("button.sidebar__btn");
      if (btn) btn.click();
    }
  }

  /* ── Navigation core ── */
  let _navPath = null;
  let _navLive = null;
  let _navId = 0;
  let _mountObs = null;
  let _injecting = false;

  function cleanup() {
    qs(`.${CONFIG.rootClass}`)?.remove();
    qs(".provider-dropdown")?.remove();

    document.querySelectorAll(".casino-hidden").forEach((s) => s.classList.remove("casino-hidden"));

    if (AppState._onDocClick) {
      document.removeEventListener("click", AppState._onDocClick);
      AppState._onDocClick = null;
    }

    AppState.requestId++;
    AppState.providersRequestId++;
    AppState._stateGen++;

    if (AppState.searchDebounce) {
      clearTimeout(AppState.searchDebounce);
      AppState.searchDebounce = null;
    }

    AppState._categoriesCache = null;
    AppState._categoriesFetching = null;
    AppState.tabs = [];
    AppState.tabsLoading = false;
    AppState.gamesCache = Object.create(null);
    AppState.gamesLoading = Object.create(null);
    AppState.activeTab = null;
    AppState.lastTabBeforeProvider = null;
    AppState.providers = null;
    AppState.providersLoading = false;
    AppState.selectedProvider = null;
    AppState.providerSearchQuery = "";
    AppState.providerGamesCache = Object.create(null);
    AppState.searchQuery = "";
    _injecting = false;
  }

  async function inject() {
    if (_injecting) return;
    const mount = qs(CONFIG.mountSelector);
    const gen = AppState._stateGen;
    if (!mount) return;
    if (qs(`.${CONFIG.rootClass}`)) return;
    if (!isCasinoRoute(location.pathname)) return;

    _injecting = true;
    try {
      ensureStyles();
      ensureMobileCasinoStyles();

      const wrap = document.createElement("div");
      wrap.innerHTML = await renderRootShell();
      if (gen !== AppState._stateGen) return;
      const rootEl = wrap.firstElementChild;
      if (!rootEl) return;

      if (!isCasinoRoute(location.pathname)) return;
      if (qs(`.${CONFIG.rootClass}`)) return;

      if (!_navPath) _navPath = normalizePath(location.pathname);
      if (_navLive === null) _navLive = isLiveCasinoPage();

      const slider = mount.querySelector(".section.section--first") || mount.querySelector(".section--first");
      if (slider) {
        slider.after(rootEl);
      } else {
        mount.prepend(rootEl);
      }
      bindEvents(rootEl);

      hideCasinoSections();
      closeSidebarIfOpen();
      await loadAndRenderActivePanel(rootEl);
      if (gen !== AppState._stateGen) { rootEl.remove(); return; }
      maybeAutoOpenSidebarOnCasinoDesktop();
    } finally {
      _injecting = false;
    }
  }

  function stopMountObserver() {
    if (_mountObs) { _mountObs.disconnect(); _mountObs = null; }
  }

  function waitForMount(navId) {
    stopMountObserver();
    _mountObs = new MutationObserver(() => {
      if (navId !== _navId) { stopMountObserver(); return; }
      if (qs(CONFIG.mountSelector)) {
        stopMountObserver();
        inject().catch(() => {});
      }
    });
    _mountObs.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(() => stopMountObserver(), 15000);
  }

  function onNavigate() {
    const path = normalizePath(location.pathname);
    const isCasino = isCasinoRoute(location.pathname);
    const live = isLiveCasinoPage();

    if (!isCasino) {
      document.body.removeAttribute("data-casino");
      stopMountObserver();
      cleanup();
      _navPath = null;
      _navLive = null;
      return;
    }

    document.body.setAttribute("data-casino", "1");

    const contextChanged = _navPath !== path || _navLive !== live;

    if (contextChanged) {
      stopMountObserver();
      cleanup();
      _navPath = path;
      _navLive = live;

      const id = ++_navId;

      const tryInject = (attempt) => {
        if (id !== _navId) return;
        if (!isCasinoRoute(location.pathname)) return;

        const hasMount = !!qs(CONFIG.mountSelector);
        if (hasMount) {
          inject().catch(() => {});
        } else if (attempt < 20) {
          setTimeout(() => tryInject(attempt + 1), 150);
        } else {
          waitForMount(id);
        }
      };

      tryInject(0);
      return;
    }

    const existingRoot = qs(`.${CONFIG.rootClass}`);
    if (existingRoot) {
      loadAndRenderActivePanel(existingRoot).catch(() => {});
      maybeAutoOpenSidebarOnCasinoDesktop();
    } else if (qs(CONFIG.mountSelector)) {
      inject().catch(() => {});
    } else {
      waitForMount(++_navId);
    }
  }

  /* ── Bootstrap ── */
  function init() {
    ensureCasinoGlobalStyle();

    if (!window.__casinoHistoryPatched) {
      window.__casinoHistoryPatched = true;
      const _push = history.pushState;
      const _replace = history.replaceState;
      history.pushState = function () { _push.apply(this, arguments); onNavigate(); };
      history.replaceState = function () { _replace.apply(this, arguments); onNavigate(); };
      window.addEventListener("popstate", onNavigate);
    }

    let _lastHref = location.href;
    setInterval(() => {
      if (location.href !== _lastHref) {
        _lastHref = location.href;
        onNavigate();
      }
    }, 250);

    let _resizeRaf = false;
    window.addEventListener("resize", () => {
      if (_resizeRaf) return;
      _resizeRaf = true;
      requestAnimationFrame(() => { _resizeRaf = false; maybeAutoOpenSidebarOnCasinoDesktop(); });
    });

    onNavigate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
</script>
