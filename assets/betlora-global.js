let link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css";

document.head.appendChild(link);

(function () {
    let lastUrl = location.href;
    let isFirstLoad = true;
    if (isFirstLoad) {
		waitForLuckyWheel();
        setTimeout(function () { 
			addMenuItemsWithAuth();
          bonusTabCustomReplace();
addScrollingTextWithNextUrl();
initializeWebsiteFeatures();
			  
		setTimeout(addRandomUserPlaying, 2000); 
			createToastAndShow(); 
			filterActiveLanguages();
			cleanCasinoAndPoker();
			removeTabsNav();
			startWatcher();
			initTopbarSliderFromJSON();
            var sportspath = window.location.pathname;
           if (sportspath.includes("/tr/sportsbook")) {
  clearDynamicContent();
  waitForIframeAndUpdate();
}
		   else if (sportspath === "/tr/trade") {
              clearDynamicContent();
            } else if (sportspath === "/tr/e-sport") {
              clearDynamicContent();
            } else if (sportspath === "/tr/vip") {
               
				clearDynamicContent();
            } else if (sportspath === "/tr/challenges") {
                clearDynamicContent();
            }
              else if (sportspath === "/tr/promotions") {
                clearDynamicContent();   
					removeTabsNav();         
			  }
			else if (sportspath !== "/tr/" && sportspath !== "/tr") {
               clearDynamicContent();
   
            }
            isFirstLoad = false;
        }, 400);
    }

    function checkUrlChange() {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            handlePageScripts(location.pathname);
        }
    }

    function handlePageScripts(path) {
        setTimeout(function () {
            addMenuItemsWithAuth();
         filterActiveLanguages()
            bonusTabCustomReplace(); 
			cleanCasinoAndPoker();
			     
            if (path === "/tr/" || path === "/tr") {
				setTimeout(addRandomUserPlaying, 2000); 
		initializeWebsiteFeatures()
                 createToastAndShow(); 
					startWatcher();
				
            } else if (path === "/tr/vip") {
                clearDynamicContent();
        
            } else if (path === "/tr/casino") {
                clearDynamicContent();
			initTopbarSliderFromJSON();
            } else if (path === "/tr/sportsbook") {
                clearDynamicContent();
				waitForIframeAndUpdate();
            } else if (path === "/tr/trade") {
                clearDynamicContent();
            } else if (path === "/tr/e-sport") {
                clearDynamicContent();
            } else if (path === "/tr/challenges") {
                clearDynamicContent();
            }
			else if (path === "/tr/promotions") {

                clearDynamicContent();
             setTimeout(removeTabsNav, 200); 
            }
			else {
                clearDynamicContent();
           
            }
        }, 400);
    }

    new MutationObserver(checkUrlChange).observe(document, {
        subtree: true,
        childList: true,
    });
    window.addEventListener("load", function () {
        checkUrlChange(); // Sayfa yüklendikten hemen sonra kontrol et
    });

    const pushState = history.pushState;
    const replaceState = history.replaceState;

    history.pushState = function () {
        pushState.apply(history, arguments);
        checkUrlChange();
    };

    history.replaceState = function () {
        replaceState.apply(history, arguments);
        checkUrlChange();
    };

    window.addEventListener("popstate", checkUrlChange);

    window.addEventListener("load", checkUrlChange);
})();

function checkModal() {
    const modal = document.getElementById("global-modal");

    if (modal) {
        modal.style.display = "none"; // Modal'ı gizle
    }
}

function cleanCasinoAndPoker() {
    // 1️⃣ Fazla casino container'larını temizle
    const path = window.location.pathname;
    if (/\/[a-z]{2}\/casino$|\/casino$|\/[a-z]{2}\/poker$|\/poker$/.test(path)) {
        const containers = document.querySelectorAll('.casino-new-root.casino-container.container');
        if (containers.length > 1) {
            for (let i = 1; i < containers.length; i++) {
                containers[i].remove();
            }
        }
    }

    // 2️⃣ Poker link <li> öğesini kaldır
    const pokerLink = document.querySelector('li a[href="/tr/poker"]');
    if (pokerLink) {
        const liElement = pokerLink.closest('li');
        if (liElement) liElement.remove();
    }
const casinoLinkP = document.querySelector('a.lowbar__btn[href="/tr/casino"] p');

if (casinoLinkP) {
  const parent = casinoLinkP.parentElement;

  // 🔥 ZATEN REPLACED MI?
  if (!parent.querySelector('img[data-replaced="true"]')) {

    // SVG kaldır
    const oldSvg = parent.querySelector('svg');
    if (oldSvg) oldSvg.remove();

    // IMG oluştur
    const img = document.createElement('img');
    img.src = "https://marsel222.github.io/my-cdn/images/777-Symbol.png";
    img.alt = "slotx";
    img.className = "svg-icon";
    img.setAttribute("data-replaced", "true");
    img.style.verticalAlign = "middle";

    parent.insertBefore(img, casinoLinkP);
  }

  // text fix (her zaman güvenli)
  if (casinoLinkP.textContent.trim() === "Casino") {
    casinoLinkP.textContent = "Slot";
  }
}
}

function removeTabsNav() {
    try {
        const tabsNav = document.getElementById('tabs-nav');
        if (tabsNav) {
            tabsNav.remove();
            console.log('✅ #tabs-nav element has been removed from the DOM.');
        } else {
            console.error('⚠️ #tabs-nav element not found.');
        }
    } catch (err) {
        console.error('❌ Error removing #tabs-nav:', err);
    }
}

// Kullanmak için
// removeTabsNav();


function getNextUrlNumber() {
    const currentUrl = window.location.href;
    const match = currentUrl.match(/betlora(\d+)/); // betlora sonrası gelen sayıyı alıyoruz

    if (match && match[1]) {
        const currentNumber = parseInt(match[1], 10); // Mevcut sayıyı al
        return currentNumber + 1; // Sayıyı 1 artır
    }
    return null; // URL'de uygun sayı yoksa
}

function addScrollingTextWithNextUrl() {
    const nextNumber = getNextUrlNumber();
    if (nextNumber !== null) {
        const text = `BİR SONRAKİ GÜNCEL ADRESİMİZ betlora${nextNumber}.com'dur. LÜTFEN SAHTE SİTELERE İTİBAR ETMEYİNİZ.`;
        addScrollingText(text);
    } else {
        console.error("Geçerli bir URL formatı bulunamadı.");
    }
}
function addScrollingText(text) {
  const existing = document.querySelector(".scrolling-text");
  if (existing) {
    const currentText = existing.querySelector("span")?.textContent;
    if (currentText === text) return; // Eğer metin aynıysa hiçbir şey yapma
    // Metin farklıysa güncelle
    existing.querySelector("span").textContent = text;
    return;
  }
  
  // Yeni kayan metin divi oluştur
  const scrollingDiv = document.createElement("div");
  scrollingDiv.className = "scrolling-text";
  scrollingDiv.id = "scrolling-text";
  const span = document.createElement("span");
  span.textContent = text;
  scrollingDiv.appendChild(span);

  // Header'dan sonra ekle
  const header = document.querySelector("header");
  header.insertAdjacentElement("afterend", scrollingDiv);
}

function clearDynamicContent() {
    const idsToRemove = ["toast-slider-ced", "scrolling-text", "league-wrapper", "custom-section-landing", "telegram-section" , "whatsapp-badge","led-wrapper","toast-container-ced","sport-header","sport-content"];

    const styleIdsToRemove = [
        "toast-slider-style",
        "telegram-style",
        "mini-games-style",
		"_wa-badge-style",
		"led-style",
		"sport-style"
        // buraya kaldırmak istediğin style id'lerini ekle
    ];

    idsToRemove.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
            el.remove();
            console.log(`${id} temizlendi.`);
        }
    });

    styleIdsToRemove.forEach((id) => {
        const styleEl = document.getElementById(id);
        if (styleEl) {
            styleEl.remove();
            console.log(`${id} style etiketi kaldırıldı.`);
        }
    });
}

function addMenuItemsWithAuth() {
    const token = localStorage.getItem('bearer');

    if (!token) {
       // console.error('Bearer token bulunamadı. Menü elemanları eklenmeyecek.');
        return;
    }

    const menuList = document.querySelector('.menu-list');

    if (!menuList) {
      //  console.error('Menu listesi bulunamadı.');
        return;
    }

    // Zaten eklenmişse tekrar ekleme
    if (menuList.querySelector('[data-custom-menu="true"]')) {
      //  console.error('Menü elemanları zaten eklenmiş.');
        return;
    }

    const items = [
        {
            text: 'Para Yatır',
            href: '/tr/payments/deposit',
            svg: `
                <svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2V16" stroke="#26a777" stroke-width="2" stroke-linecap="round"/>
                    <path d="M6 10L12 16L18 10" stroke="#26a777" stroke-width="2" stroke-linecap="round"/>
                    <rect x="2" y="18" width="20" height="4" rx="1" fill="#26a777"/>
                </svg>
            `
        },
        {
            text: 'Para Çek',
            href: '/tr/payments/withdrawal',
            svg: `
                <svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22V8" stroke="#26a777" stroke-width="2" stroke-linecap="round"/>
                    <path d="M6 14L12 8L18 14" stroke="#26a777" stroke-width="2" stroke-linecap="round"/>
                    <rect x="2" y="2" width="20" height="4" rx="1" fill="#26a777"/>
                </svg>
            `
        }
    ];

    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'menu-item';
        li.setAttribute('data-custom-menu', 'true'); // kontrol için işaretleme

        const div = document.createElement('div');
        div.className = 'item-text text-in';
        div.innerHTML = item.svg;

        const span = document.createElement('span');
        span.className = 'item-text text-in';
        span.textContent = item.text;

        li.addEventListener('click', () => {
            window.location.href = item.href;
        });

        li.appendChild(div);
        li.appendChild(span);
        menuList.appendChild(li);
    });
}


function bonusTabCustomReplace() {
    const token = localStorage.getItem('bearer');

    if (!token) {
        return;
    }

    const url = window.location.href;

    // URL kontrolü
    if (!url.includes("modal=bonus-request")) {
        return;
    }

    // --- UL yoksa DOM'a eklenmesini beklemek için OBSERVER EKLENDİ ---
    function tryApply() {
        const tabsUl = document.querySelector('.tabs-nav.tabs-nav--modal');
        if (!tabsUl) return false;

        // Eğer custom tab zaten varsa tekrar oluşturma
        if (tabsUl.querySelector(".custom-bonus-tab")) {
            return true; // işlem tamam
        }

        // Yeni custom li oluştur
        const newLi = document.createElement("li");
        newLi.className = "nav-item";
        newLi.setAttribute("role", "presentation");

        // Custom <a> sekmesi oluştur
        const newA = document.createElement("a");
        newA.className = "tabs-nav__btn custom-bonus-tab";
        newA.textContent = "Bonus Kodu Gir";
        newA.href = "?modal=vip&tab=bonus-code";

        newLi.appendChild(newA);
        tabsUl.appendChild(newLi);

        return true; // başarıyla uygulandı
    }

    // İlk deneme
    if (tryApply()) return;

    // UL henüz eklenmediyse bekle
    const observer = new MutationObserver(() => {
        if (tryApply()) {
            observer.disconnect(); // işlem tamamlandı → izlemeyi durdur
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}



function addRandomUserPlaying() {
    const slots = document.querySelectorAll('a.slot.slot--carousel');

    slots.forEach(slot => {
        // Tekrar eklenmesini engeller
        if (slot.querySelector('.user-playing')) return;

        const randomNumber = Math.floor(Math.random() * (200 - 20 + 1)) + 20; // 20–300

        const p = document.createElement('p');
        p.className = 'user-playing';
        p.style.marginTop = '6px';
        p.style.fontStyle = 'italic';
        p.style.color = '#7fb3d3';
        p.style.fontSize = '11px';

        // Yeşil nokta + bold sayı
        p.innerHTML = `<span style="color:#2ecc71;">•</span> <strong>${randomNumber}</strong> Çevrimiçi`;

        slot.appendChild(p);
    });
}


function createToastAndShow() {
    // HTML oluşturuluyor
    const toastHTML = `
        <div id="toast-container-ced">
            <div class="image-box-ced">
                <img class="game-img-ced" src="" alt="Game Image">
            </div>
            <div class="info-ced">
                <p class="user-ced">BG*** ÇEKİMİ ONAYLANDI</p>
                <p class="game-title-ced">EGT INTERACTIVE MORE DICE ROLL</p>
                <div class="win-value-ced">
                    <span class="live-icon-ced"></span>
                    <span class="price">477,43 TL</span>
                </div>
            </div>
        </div>
    `;
    // Sayfanın body kısmına toast öğesini ekle
    document.body.insertAdjacentHTML("beforeend", toastHTML);

    const gameList = [
        { title: "BIB BASS BONANZA 1000", img: "https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/gXmqkthvbB1521K/games/GN8mlG5kFJ18n1oZfaMGGZ5ECn99RB26L2F7fQyZ.png" },
        { title: "GATES OF OLYMPUS 1000", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/gXmqkthvbB1521K/games/HRILC4ibvAUtUUHZHw44QYrLadCQDd3FpW4uVoQi.avif" },
        { title: "OUT SOURCED", img: "https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/gXmqkthvbB1521K/games/zCAPQeGAtoFqDgTjX6btOGYe6hgIdg6C4iirTYnG.png" },
        { title: "BIG BASS DOWN DELUXE", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/gXmqkthvbB1521K/games/8t3f8yM1HACXy8qARZsGlbEM17TCYAqOxvqAVEa8.avif" },
        { title: "WILD WEST GOLD", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/gXmqkthvbB1521K/games/X8a3Hm2DZGEtorfe1FhLcvrGd3woxgiwbCHwAxxt.avif" },
        { title: "SWEET BONANZA 1000", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/gXmqkthvbB1521K/games/dy3y1exXqAstJkCAgmiNmtCjTOd53fiRR8v5hqeW.avif" },
        { title: "FRUIT PARTY", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/gXmqkthvbB1521K/games/09DbxG6YpwN7QP7eYDxGOSYjBLRwOuxMxc6TPLJy.avif" },
        { title: "WISDOM OF ATHENA 1000", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/gXmqkthvbB1521K/games/SqLRHFm82GBn4AuQbS331xn1QcVxLo20VI0KCzr8.avif" },
        { title: "SUGAR RUSH 1000", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/gXmqkthvbB1521K/games/3ZCbcXmpRA680KHyV2jYGNBJu32SBXf7YyuAwid3.avif" },
        { title: "FLAMING HOT", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/gXmqkthvbB1521K/games/yvrIgUnZIy7kgxwCP53YaQ8gXnDwQUaJOn9jliG8.png" },
        { title: "HAND OF MIDAS 2", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/gXmqkthvbB1521K/games/lEydb8VtvGa3ywWZSmAz3WrVElOZK6eaZWaWeClv.avif" },
        { title: "CRAZY TIME", img: "https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/gXmqkthvbB1521K/games/kOyIxpFKFZQZxykpEx1QboVZ92DsfpxBaLalIYOl.png" },
        { title: "DRAGON TIGER", img: "https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/gXmqkthvbB1521K/games/EMnrV18IIbidpiG0WLNokDDvAR8pVMxrQ2bVBDpA.png" },
        { title: "POKER", img: "https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/gXmqkthvbB1521K/games/dUaPG9qu6y43tRMvtKRmVQJen3qK6WATou9jTEjn.png" }
    ];

    const toast = document.getElementById("toast-container-ced");
    let toastActive = false;

    // Başlangıçta toast öğesini görünmez yap
    toast.style.bottom = "-150px";

    function animateToast() {
        const randomDuration = Math.random() * 80000 + 50000; // 5000ms ile 20000ms arasında rastgele süre

        // Eğer toast aktifse, bir sonraki animasyonu başlatmadan önce minimum 5 saniye bekle
        if (toastActive) {
            return setTimeout(animateToast, 5000); // Minimum 5 saniye bekle
        }

        toastActive = true;

        const randomUser = `****${Math.floor(Math.random() * 1000)}`;
        const randomGame = gameList[Math.floor(Math.random() * gameList.length)];

        // Fiyatı 1.000 ile 25.000 arasında rastgele bir değer üret
        const randomPrice = Math.floor(Math.random() * 150000 + 10000); // 1000 ile 25000 arasında değer üret

        const userElement = toast.querySelector(".user-ced");
        const gameTitleElement = toast.querySelector(".game-title-ced");
        const priceElement = toast.querySelector(".price");
        const gameImgElement = toast.querySelector(".game-img-ced");

        userElement.textContent = randomUser + " KAZANDI";
        gameTitleElement.textContent = randomGame.title;
        priceElement.textContent = `${randomPrice} TL`;
        gameImgElement.src = randomGame.img;

        setTimeout(() => {
            toast.style.transition = "bottom 1s ease-out";
            toast.style.bottom = "30px"; // Yukarıya 30px kaydır
        }, randomDuration);

        setTimeout(() => {
            toast.style.transition = "bottom 1s ease-in";
            toast.style.bottom = "-150px"; // Aşağıya kaydır
            toastActive = false;
        }, randomDuration + 3000); // Yukarı çıktıktan 3 saniye sonra

        setTimeout(animateToast, randomDuration + 5000); // Minimum 5 saniye sonra tekrar döngüye gir
    }

    animateToast();
}

function filterActiveLanguages() {
    const langMenu = document.querySelector('.dropdown-menu.sidebar__lang-menu');
    const langItems = langMenu.querySelectorAll('li');
    const activeLangs = ['EN', 'TR'];  // Aktif diller

    langItems.forEach(item => {
        const span = item.querySelector('span');
        if (!activeLangs.includes(span.textContent.trim())) {
            item.remove(); // Diğerlerini kaldır
        }
    });
}
function initializeWebsiteFeatures() {


    // Random kullanıcı adı oluşturma fonksiyonu
    function generateRandomUsername() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = Math.floor(Math.random() * 10) + 6;  // Yıldız kısmı 6 ile 15 arasında olacak
        let username = '';

        // İlk 2 harfi ekle
        username += chars.charAt(Math.floor(Math.random() * chars.length));

        // Yıldızları ekle
        for (let i = 0; i < length - 2; i++) {
            username += '*';
        }

        // Son 2 harfi ekle
        username += chars.charAt(Math.floor(Math.random() * chars.length));

        return username;
    }

    // Dinamik Toast Slider Fonksiyonu (mini-slider-wrapper kontrolü ile)
    function createToastSliderInWrapper(gameList, options = {}) {
        const wrapperId = options.wrapperId || 'main-slider';
        const initialCount = 50; // Başlangıçta 50 toast öğesi olacak

        // Wrapper div var mı kontrol et
        const wrapper = document.getElementById(wrapperId);
        if (!wrapper) {
            console.warn(`Div id="${wrapperId}" bulunamadı!`);
            return;
        }

        // Eğer slider zaten eklenmişse tekrar ekleme
        if (wrapper.querySelector('#toast-slider-ced')) {
            console.log('Toast slider zaten mevcut.');
            return;
        }

        // 1. Stil ekle (sadece bir kez eklenir)
        if (!document.getElementById('toast-slider-style')) {
            const style = document.createElement('style');
            style.id = 'toast-slider-style';
            style.textContent = `
            /* Container ve track */
            #toast-slider-ced {
                width: 100%;
                overflow: hidden;
                z-index: 1000000;
                background-color: #09223c;
                margin-top: 41px;
                margin-bottom: 19px;
            }
            .toast-track-ced {
                display: flex;
                gap: 12px;
                animation: slide-left 100s linear infinite; /* Sürekli kayma animasyonu */
            }
            .toast-item-ced {
                display: flex;
                align-items: center;
                min-width: 310px;
                background: rgba(9, 34, 60, 0.95);
                border: 1px solid #0ec096;
                border-radius: 12px;
                padding: 12px;
                box-shadow: 0 15px 40px rgba(0,0,0,0.8);
                font-family: 'Poppins', sans-serif;
                backdrop-filter: blur(10px);
            }
            .image-box-ced {
                width: 60px;
                height: 60px;
                flex-shrink: 0;
            }
            .image-box-ced img {
                width: 100%;
                height: 100%;
                border-radius: 8px;
                object-fit: cover;
                border: 1px solid #0ec096;
            }
            .info-ced {
                flex: 1;
                margin-left: 14px;
                overflow: hidden;
            }
            .user-ced {
                font-size: 11px;
                color: #0ec096;
                font-weight: 600;
                margin: 0;
                text-transform: uppercase;
            }
            .game-title-ced {
                font-size: 14px;
                color: #ffffff;
                font-weight: 700;
                margin: 2px 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .win-value-ced {
                font-size: 17px;
                color: #0ec096;
                font-weight: 900;
                margin: 0;
                display: flex;
                align-items: center;
            }
            .live-icon-ced {
                width: 8px;
                height: 8px;
                background: #0ec096;
                border-radius: 50%;
                margin-right: 8px;
                box-shadow: 0 0 8px #0ec096;
                animation: flash 1.5s infinite;
            }
            @keyframes flash {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.4; }
            }
            @keyframes slide-left {
                0% { transform: translateX(0); }
                100% { transform: translateX(-1600%); }
            }
            `;
            document.head.appendChild(style);
        }

        // 2. Slider container oluştur
        const slider = document.createElement('div');
        slider.id = 'toast-slider-ced';

        const track = document.createElement('div');
        track.className = 'toast-track-ced';

        slider.appendChild(track);
        wrapper.appendChild(slider);

        // 3. Toast ekleme fonksiyonu
        function updateToastContent(toastElement) {
            const randomGame = gameList[Math.floor(Math.random() * gameList.length)];
            const randomUser = generateRandomUsername();  // Yeni random kullanıcı adı

            // Oranlı kazanç hesaplama
            let randomPrice;

            // %75 oranında 1K ile 5K arasında
            if (Math.random() < 0.75) {
                randomPrice = Math.floor(Math.random() * 4001 + 1000); // 1K ile 5K arasında
            }
            // %10 oranında 5K ile 15K arasında
            else if (Math.random() < 0.10) {
                randomPrice = Math.floor(Math.random() * 10001 + 5000); // 5K ile 15K arasında
            }
            // %10 oranında 15K ile 25K arasında
            else if (Math.random() < 0.10) {
                randomPrice = Math.floor(Math.random() * 10001 + 15000); // 15K ile 25K arasında
            }
            // %5 oranında 50K ile 150K arasında
            else {
                randomPrice = Math.floor(Math.random() * 100001 + 50000); // 50K ile 150K arasında
            }

            // Toast item içeriğini güncelle
            toastElement.querySelector('.user-ced').innerText = `${randomUser} KAZANDI`;
            toastElement.querySelector('.game-title-ced').innerText = randomGame.title;
            toastElement.querySelector('.price').innerText = `${randomPrice} TL`;
            toastElement.querySelector('.image-box-ced img').src = randomGame.img;
        }

        // 4. Başlangıçta 50 toast öğesi oluştur
        let toastElements = [];
        function createInitialToasts() {
            for (let i = 0; i < initialCount; i++) {
                const toastItem = document.createElement('div');
                toastItem.className = 'toast-item-ced';
                toastItem.innerHTML = `
                    <div class="image-box-ced">
                        <img src="" alt="Game Image">
                    </div>
                    <div class="info-ced">
                        <p class="user-ced"></p>
                        <p class="game-title-ced"></p>
                        <div class="win-value-ced">
                            <span class="live-icon-ced"></span>
                            <span class="price"></span>
                        </div>
                    </div>
                `;
                track.appendChild(toastItem);
                toastElements.push(toastItem);  // Eklenen öğeyi tut
            }
            // 5. Başlangıçta ilk içeriği yükle
            toastElements.forEach((toastElement) => {
                updateToastContent(toastElement);  // İlk içerik yükle
            });
        }

        createInitialToasts(); // İlk slider öğelerini oluştur

        // 6. Her 100 saniyede bir yeni toast öğeleri ekle
        setInterval(() => {
            toastElements.forEach((toast) => toast.remove()); // Eski öğeleri sil
            toastElements = []; // Eski öğeleri temizle
            createInitialToasts(); // Yeni öğeleri oluştur
        }, 50000); // 50 saniye (100000 ms)
    }

    // Örnek oyun listesi
    const games = [
        { title: "BIG BASS BONANZA 1000", img: "https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/gXmqkthvbB1521K/games/GN8mlG5kFJ18n1oZfaMGGZ5ECn99RB26L2F7fQyZ.png" },
        { title: "GATES OF OLYMPUS DICE", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/gXmqkthvbB1521K/games/qVrgf2qkZ44apoCdNlS47ivKbn7xQbOkgQ6lRIyc.avif" },
        { title: "20 SUPER HOT", img: "https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/kjaflkjqnlkwAqwrjqkldkljgq/games/9TtOVGFJcH8UBsSGl3Ce58lhMFn2TmFp9JD1ZeqR.png" },
        { title: "VAMPIRE NIGHT VIP BELL LINK", img: "https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/kjaflkjqnlkwAqwrjqkldkljgq/games/mNO1iaNhi8Q5JZg4B35dbPsleKYCwZdazS9a1kN4.png" },
        { title: "SHINING CROWN", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/kjaflkjqnlkwAqwrjqkldkljgq/games/q5ImhlA8QQNhoCWIrrCkuNxTivRdi8tOwZBl4DCb.png" },
        { title: "40 BURNING HOT", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/kjaflkjqnlkwAqwrjqkldkljgq/games/IIul50QRjUNZcojMhN5oocCMbJ1wzJBJTrotr3Yz.png" },
        { title: "SUGAR RUSH SUPER SCATTER", img: "https://d3psi4rj7mv4u4.cloudfront.net/games/pragmaticplay/sugar_rush_super_scatter.jpg" },
        { title: "WISDOM OF ATHENA 1000", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/kjaflkjqnlkwAqwrjqkldkljgq/games/ZDD52QUSLUJM4NWSdYEwNNxw4cWoHrBXYNUxAsCg.png" },
        { title: "SUGAR RUSH 1000", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/kjaflkjqnlkwAqwrjqkldkljgq/games/y0C8hNvNSkcQIPZkqnR4gbePs7YU4tkZtluv0OBy.png" },
        { title: "SWEET BONANZA SUPER SCATTER", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/kjaflkjqnlkwAqwrjqkldkljgq/games/l1JYlUIe4z4BP9fpGIKnc9JD9m3AHxBcwGNzQncs.png" },
        { title: "THE DOG HOUSE MEGAWAYS", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/kjaflkjqnlkwAqwrjqkldkljgq/games/WI9EeOXR3EIhOSyPgUCosUNT18FYeOgvz4Dlbaxm.png" },
        { title: "SWEET BONANZA 1000", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/kjaflkjqnlkwAqwrjqkldkljgq/games/NuZ9UYNGezQHMpj2rE8uJR13wrZWYzlEuzflSHEb.png" },
        { title: "ROULETTE", img: "https://vendor-provider.fra1.digitaloceanspaces.com/ebetlab/gXmqkthvbB1521K/games/b9uylQsVqYbSG3xTXLmQuslENtjeOFzfjWyq6BTK.png" },
        { title: "BLACKJACK", img: "https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/kjaflkjqnlkwAqwrjqkldkljgq/games/b3KPqV9UyOixpMNKS7A2Lnd4YYqUxFn64dR6LDp2.png" }
    ];

    // Slider'ı başlat
	 createToastSliderInWrapper(games);

}
 
function createWhatsAppBadge(phoneNumber = '84814193622') {
    if (!document.getElementById("_wa-badge-style")) {
        const style = document.createElement('style');
        style.id = '_wa-badge-style';
        style.innerHTML = `
            ._wa-badge {
                position: fixed;
                top: 35%;
                right: -135px;
                transform: translateY(-50%);
                background-color: #25D366;
                color: white;
                padding: 10px 16px;
                border-radius: 8px 0 0 8px;
                box-shadow: 0 8px 24px rgba(32, 163, 233, 0.35);
                display: flex;
                align-items: center;
                transition: right 0.4s ease;
                z-index: 9999;
                text-decoration: none;
                border: 1px solid rgba(255, 255, 255, 0.1);
                animation: _wa-pulse 2.5s ease-in-out infinite;
            }

            ._wa-badge img {
                width: 30px;
                height: 30px;
                margin-right: 20px;       
                flex-shrink: 0;
            }

            ._wa-badge-text {
                white-space: nowrap;
                font-family: 'Segoe UI', 'Arial', sans-serif;
                font-size: 14px;
                opacity: 0;
                transition: opacity 0.3s ease;
                color: white;
            }

            ._wa-badge:hover {
                right: 0;
            }

            ._wa-badge:hover ._wa-badge-text {
                opacity: 1;
            }

            @keyframes _wa-pulse {
                0% {
                    transform: translateY(-50%) scale(1);
                }
                50% {
                    transform: translateY(-50%) scale(1.05);
                }
                100% {
                    transform: translateY(-50%) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Badge zaten varsa tekrar ekleme
    if (document.querySelector('._wa-badge')) return;

    // Badge elementi
    const badge = document.createElement('a');
    badge.href = `https://wa.me/${phoneNumber}`;
   // badge.href = `https://bit.ly/m/CedaBETViP`;
    badge.className = '_wa-badge';
    badge.target = '_blank';
    badge.setAttribute('aria-label', 'WhatsApp ile iletişime geç');
	  badge.id = 'whatsapp-badge';

    const icon = document.createElement('img');
    icon.src = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg';
    icon.alt = 'WhatsApp Icon';

    const text = document.createElement('span');
    text.className = '_wa-badge-text';
    text.textContent = 'WhatsApp Hattı';

    badge.appendChild(icon);
    badge.appendChild(text);
    document.body.appendChild(badge);
}

let matchInterval = null;
let isRendered = false;

async function loadMatches() {
    try {

        // SPA GUARD
        if (isRendered) return;

        const slider = document.getElementById("main-slider");
        if (!slider) return;

        isRendered = true;

        const res = await fetch("https://marsel222.github.io/my-cdn/assets/match.json");
        const data = await res.json();

        if (!data.active) return;

        // STOP WATCHER
        if (matchInterval) {
            clearInterval(matchInterval);
            matchInterval = null;
        }

        // STYLE INJECTION (once)
        if (!document.getElementById("sport-style")) {
            const style = document.createElement("style");
            style.id = "sport-style";
            style.innerHTML = `
           /* Orta Kısım - Bahisler Section */
.lora-betting-section {
    position: relative;
    display: flex;
    width: 100%;
}

/* Slider section */
.lora-matches-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    position: relative;
    background: transparent;
    max-width: 100%;
    overflow: hidden;
    box-sizing: border-box;
}

.lora-matches-scroll {
    position: relative;
    width: 100%;
    max-width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 12px 0;
    overflow-x: hidden;
    overflow-y: hidden;
    box-sizing: border-box;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
	    justify-content: space-evenly;
}

.lora-matches-scroll::-webkit-scrollbar {
    display: none;
}

.lora-matches-track {
    display: flex;
    width: fit-content;
    gap: 16px;
    will-change: transform;
    max-width: 100%;
    box-sizing: border-box;
}

.lora-matches-scroll:hover .lora-matches-track,
.lora-matches-scroll.touching .lora-matches-track {
    animation-play-state: paused;
}

.lora-match-card {
    flex: 0 0 auto;
    width: 350px;
    min-width: 350px;
    max-width: 350px;
    height: 100%;
    position: relative;
    border-radius: 18px;
    background: linear-gradient(135deg, 
        rgba(0, 0, 0, 0.95) 0%, 
        rgba(20, 20, 20, 0.9) 25%,
        rgba(10, 10, 10, 0.85) 50%,
        rgba(20, 20, 20, 0.9) 75%,
        rgba(0, 0, 0, 0.95) 100%);
    background-size: 200% 200%;
    animation: lora-gold-gradient 8s ease infinite;
    border: 1px solid rgba(14, 192, 150, 0.4);
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6), 0 0 4px rgba(14, 192, 150, 0.2);
}

.lora-match-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
        rgba(14, 192, 150, 0.08) 0%, 
        rgba(14, 192, 150, 0.12) 25%,
        rgba(14, 192, 150, 0.1) 50%,
        rgba(14, 192, 150, 0.12) 75%,
        rgba(14, 192, 150, 0.08) 100%);
    background-size: 300% 300%;
    animation: lora-gold-shimmer 6s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
    border-radius: 18px;
}

@keyframes lora-gold-gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes lora-gold-shimmer {
    0% { background-position: 0% 50%; opacity: 0.6; }
    50% { background-position: 100% 50%; opacity: 1; }
    100% { background-position: 0% 50%; opacity: 0.6; }
}

.lora-match-card::before {
    display: none;
}

.lora-match-card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 6px 18px rgba(14, 192, 150, 0.5), 0 0 12px rgba(14, 192, 150, 0.3);
    border-color: rgba(14, 192, 150, 0.7);
}

.lora-match-content {
    padding: 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    min-height: 200px;
    z-index: 1;
}

.lora-match-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
    gap: 8px;
}

.lora-match-competition {
    color: #0ec096;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    flex: 1;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-shadow: 0 1px 2px rgba(14, 192, 150, 0.5);
}

.lora-match-time {
    color: #0ec096;
    font-size: 12px;
    font-weight: 600;
    text-align: right;
    line-height: 1.2;
    flex-shrink: 0;
    text-shadow: 0 1px 2px rgba(14, 192, 150, 0.5);
}

.lora-match-teams {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
}

.lora-match-team {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    flex: 1;
}

.lora-team-badge {
    width: auto;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.lora-team-badge img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 2;
}

.lora-team-name {
    font-size: 12px;
    color: #0ec096;
    text-align: center;
    font-weight: 500;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-shadow: 0 1px 2px rgba(14, 192, 150, 0.5);
}

.lora-match-vs {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 16px;
}

.lora-match-vs-text {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #0ec096;
    background: #000000;
    border: 1px solid rgba(14, 192, 150, 0.5);
    padding: 4px 12px;
    border-radius: 999px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(14, 192, 150, 0.2), 0 0 8px rgba(14, 192, 150, 0.3);
    text-shadow: 0 1px 2px rgba(14, 192, 150, 0.6), 0 0 4px rgba(14, 192, 150, 0.4);
}

.lora-match-vs-image {
    width: auto;
    height: 30px;
    max-width: 80px;
    object-fit: contain;
    display: block;
}

.lora-match-odds {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 12px;
}

.lora-odds-row {
    display: flex;
    gap: 4px;
    justify-content: space-between;
}

.lora-odds-button {
    flex: 1;
    background: #000000;
    border: 1px solid rgba(14, 192, 150, 0.5);
    border-radius: 20px;
    padding: 6px 8px;
    cursor: pointer;
    transition: all 0.18s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    min-height: 40px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(14, 192, 150, 0.15), 0 0 4px rgba(14, 192, 150, 0.2);
    text-decoration: none;
    color: #0ec096;
    position: relative;
}

.lora-odds-button::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(14, 192, 150, 0.08) 0%, rgba(14, 192, 150, 0.03) 50%, transparent 100%);
    pointer-events: none;
}

.lora-odds-button:hover {
    background: #0a0a0a;
    border-color: rgba(14, 192, 150, 0.8);
    transform: translateY(-1px);
    text-decoration: none;
    color: #0ec096;
    box-shadow: 0 4px 12px rgba(14, 192, 150, 0.4), inset 0 1px 3px rgba(14, 192, 150, 0.25), 0 0 8px rgba(14, 192, 150, 0.2);
}

.lora-odds-button:active {
    transform: translateY(0);
}

.lora-odds-label {
    font-size: 10px;
    color: #0ec096;
    font-weight: 500;
    text-align: center;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
    text-shadow: 0 1px 2px rgba(14, 192, 150, 0.5);
}

.lora-odds-value {
    font-size: 12px;
    color: #0ec096;
    font-weight: 700;
    text-shadow: 0 1px 2px rgba(14, 192, 150, 0.5), 0 0 4px rgba(14, 192, 150, 0.3);
}

.lora-odds-button:hover .lora-odds-value {
    color: #0ec096;
    text-shadow: 0 1px 3px rgba(14, 192, 150, 0.6), 0 0 6px rgba(14, 192, 150, 0.5);
}

.lora-odds-button:hover .lora-odds-label {
    color: #0ec096;
}
.lora-section-header {
    width: 100%;
    text-align: center;
    margin-bottom: 16px;
}

.lora-section-header h2 {
    color: #0ec096;
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    text-shadow: 0 0 8px rgba(14,192,150,0.4);
}

.lora-section-header p {
    color: #aaa;
    font-size: 12px;
    margin-top: 4px;
    opacity: 0.8;
}
@media (max-width: 768px) {

    /* container düzeltme */
    .lora-matches-container {
        margin-left: 0;
        padding-left: 16px;
    }

    /* scroll alanı swipe */
    .lora-matches-scroll {
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
    }

    /* track spacing */
    .lora-matches-track {
        gap: 12px;
    }

    /* card mobil boyut */
    .lora-match-card {
        width: 80vw;
        min-width: 80vw;
        max-width: 80vw;
        flex: 0 0 auto;

        scroll-snap-align: center;
    }
}
            `;
            document.head.appendChild(style);
        }

        let html = "";

data.matches.forEach(match => {

    const href = (match.betid && match.betid.trim() !== "")
        ? `/tr/sportsbook/betid=${match.betid}`
        : `/tr/sportsbook`;

    html += `
    <a style="text-decoration: none;" href="${href}" class="lora-match-card">

        <div class="lora-match-content">
            <div class="lora-match-header">
                <span class="lora-match-competition">${match.date}</span>
                <span class="lora-match-time">${match.time}</span>
            </div>

            <div class="lora-match-teams">
                <div class="lora-match-team">
                    <img src="${match.home.logo || ''}" alt="${match.home.name}" class="lora-team-badge">
                    <span class="lora-team-name">${match.home.name}</span>
                </div>

                <div class="lora-match-vs">
                    <span class="lora-match-vs-text">VS</span>
                </div>

                <div class="lora-match-team">
                    <img src="${match.away.logo || ''}" alt="${match.away.name}" class="lora-team-badge">
                    <span class="lora-team-name">${match.away.name}</span>
                </div>
            </div>

            <div class="lora-match-odds">
                <div class="lora-odds-row">
                    <div class="lora-odds-button">
                        <span class="lora-odds-label">1</span>
                        <span class="lora-odds-value">${match.odds["1"]}</span>
                    </div>

                    <div class="lora-odds-button">
                        <span class="lora-odds-label">X</span>
                        <span class="lora-odds-value">${match.odds["X"]}</span>
                    </div>

                    <div class="lora-odds-button">
                        <span class="lora-odds-label">2</span>
                        <span class="lora-odds-value">${match.odds["2"]}</span>
                    </div>
                </div>
            </div>

        </div>

    </a>
    `;
});

        const section = `
		 <div id="sport-header" class="lora-section-header">
                <h2>ÖZEL ORAN MAÇLAR</h2>
                <p>Günün en iyi fırsatları</p>
            </div>
        <div id="sport-content" class="lora-betting-section">
            <div class="lora-matches-container">
                <div class="lora-matches-scroll">
                    <div class="lora-matches-track">
                        ${html}
                    </div>
                </div>
            </div>

        </div>`;

        slider.insertAdjacentHTML("afterend", section);

    } catch (err) {
        console.error("Match load error:", err);
    }
}

// 100ms SPA watcher
function startWatcher() {
    if (matchInterval) return;

    matchInterval = setInterval(() => {
        const exists = document.getElementById("main-slider");
        const already = document.querySelector(".lora-betting-section");

        if (exists && !already) {
            loadMatches();
        }
    }, 100);
}

// SPA navigation support
window.addEventListener("popstate", () => {
    isRendered = false;
    startWatcher();
});
function getBookabetFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);

  let code = urlParams.get("betid");

  // fallback: /sportsbook/betid=ABC123
  if (!code) {
    const match = window.location.pathname.match(/betid=([^/]+)/);
    if (match) code = match[1];
  }

  return code;
}

function waitForIframeAndUpdate() {
  const code = getBookabetFromUrl();

  console.error("[bookabet] URL'den gelen code:", code);

  if (!code) {
    console.error("[bookabet] betid yok → script durdu");
    return;
  }

  console.error("[bookabet] iframe bekleniyor...");

  const interval = setInterval(() => {
    const iframe = document.getElementById("game");

    console.error("[bookabet] iframe kontrol ediliyor...");

    if (!iframe) {
      console.error("[bookabet] iframe bulunamadı");
      return;
    }

    if (!iframe.src) {
      console.error("[bookabet] iframe bulundu ama src boş");
      return;
    }

    console.error("[bookabet] iframe bulundu:", iframe.src);

    try {
      const url = new URL(iframe.src);

      const before = url.toString();

      url.searchParams.set("bookabet", code);

      const after = url.toString();

      console.error("[bookabet] önce:", before);
      console.error("[bookabet] sonra:", after);

      iframe.src = after;

      console.error("[bookabet] iframe güncellendi ✔");

      clearInterval(interval);

    } catch (e) {
      console.error("[bookabet] URL parse hatası:", e);
    }

  }, 100);
}

function waitForLuckyWheel() {
    const token = localStorage.getItem('bearer');

    if (!token) {
       // console.error('Bearer token bulunamadı. Menü elemanları eklenmeyecek.');
        return;
    }

  const interval = setInterval(() => {

    const headerActions = document.querySelector('.header__actions');

    if (!headerActions) {
      return;
    }

    console.error("✅ header__actions bulundu");

    let existing = headerActions.querySelector('svg#lucky-wheel');

    // Eğer varsa sadece click event ekleyip çık
    if (existing) {

      existing.style.cursor = "pointer";
      existing.onclick = () => {
        console.error("🖱 lucky-wheel tıklandı → yönlendiriliyor");
        window.location.href = "/tr/wheel";
      };

      clearInterval(interval);
      return;
    }


    const wallet = headerActions.querySelector('.header__wallet');

    if (!wallet) {
      console.error("⌛ header__wallet henüz yok");
      return;
    }

    console.error("✅ header__wallet bulundu");

    // SVG oluştur

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', 'lucky-wheel');
    svg.setAttribute('class', 'svg-icon');
    svg.style.cursor = "pointer";

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '/static/media/sprite.416275c004a2977bb04b6579ccb104a4.svg#lucky-wheel');

    svg.appendChild(use);

    // click event
    svg.onclick = () => {
      console.error("🖱 lucky-wheel tıklandı → yönlendiriliyor");
      window.location.href = "/tr/wheel";
    };

    // ekle
    wallet.insertAdjacentElement('afterend', svg);


    clearInterval(interval);


  }, 200);
}
function initTopbarSliderFromJSON() {
  console.error("⏳ Slider bekleniyor...");

  const interval = setInterval(() => {
    const root = document.querySelector('.casino-new__topbar');

    if (!root) return;

    console.error("✅ container bulundu");
    clearInterval(interval);

    fetch('https://marsel222.github.io/my-cdn/assets/casino-images.json')
      .then(res => res.json())
      .then(data => {

        const images = data.images || [];
        if (!images.length) {
          console.error("❌ images yok");
          return;
        }

        const slider = document.createElement('div');
        slider.className = 'topbar-slider';

        images.forEach(item => {

          const picture = document.createElement('picture');

          // 🔥 SENİN FORMATIN: sources array yok, direkt field'lar var
          const sources = [
            { media: "(max-width: 767px)", src: item.mobile },
            { media: "(max-width: 991px)", src: item.tablet },
            { media: "(max-width: 1023px)", src: item.tablet },
            { media: "(max-width: 1443px)", src: item.desktop },
            { media: "(max-width: 1919px)", src: item.desktop }
          ];

          sources.forEach(s => {
            if (!s.src) return;

            const source = document.createElement('source');
            source.media = s.media;
            source.srcset = s.src;
            picture.appendChild(source);
          });

          const img = document.createElement('img');
          img.src = item.desktop;
          img.alt = "banner";
          img.loading = "lazy";
          img.draggable = false;

          picture.appendChild(img);
          slider.appendChild(picture);
        });

        root.innerHTML = "";
        root.appendChild(slider);

        // ======================
        // layout fix (KRİTİK)
        // ======================
        slider.style.display = "flex";

        let index = 0;
        const total = images.length;

        function update() {
          slider.style.transition = "transform 0.5s ease";
          slider.style.transform = `translateX(-${index * 100}%)`;
        }

        // AUTO
        let auto = setInterval(() => {
          index = (index + 1) % total;
          update();
        }, 10000);

        function resetAuto() {
          clearInterval(auto);
          auto = setInterval(() => {
            index = (index + 1) % total;
            update();
          }, 10000);
        }

        // SWIPE
        let startX = 0;

        slider.addEventListener('touchstart', e => {
          startX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', e => {
          const diff = startX - e.changedTouches[0].clientX;

          if (diff > 50) index = (index + 1) % total;
          else if (diff < -50) index = (index - 1 + total) % total;

          update();
          resetAuto();
        });

        console.error("🎉 slider hazır");
      });

  }, 200);
}
