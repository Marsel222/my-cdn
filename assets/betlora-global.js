let link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css";

document.head.appendChild(link);

(function () {
    let lastUrl = location.href;
    let isFirstLoad = true;
    if (isFirstLoad) {
        setTimeout(function () { 
			addMenuItemsWithAuth();
          bonusTabCustomReplace();
addScrollingTextWithNextUrl();
initializeWebsiteFeatures();
		setTimeout(addRandomUserPlaying, 2000); 
			createToastAndShow(); 
			filterActiveLanguages();
			cleanCasinoAndPoker();
            var sportspath = window.location.pathname;
            if (sportspath === "/tr/sportsbook") {
              clearDynamicContent();
            } else if (sportspath === "/tr/trade") {
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
				  hideTabsNav();
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
				
            } else if (path === "/tr/vip") {
                clearDynamicContent();
        
            } else if (path === "/tr/casino") {
                clearDynamicContent();
			
            } else if (path === "/tr/sportsbook") {
                clearDynamicContent();
            } else if (path === "/tr/trade") {
                clearDynamicContent();
            } else if (path === "/tr/e-sport") {
                clearDynamicContent();
            } else if (path === "/tr/challenges") {
                clearDynamicContent();
            }
			else if (path === "/tr/promotions") {

                clearDynamicContent();
              hideTabsNav();
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
    if (casinoLinkP && casinoLinkP.textContent.trim() === "Casino") {
        casinoLinkP.textContent = "Slot";
    }
}

function hideTabsNav() {
    try {
        const tabsNav = document.getElementById('tabs-nav');
        if (tabsNav) {
            tabsNav.style.display = 'none';
            console.log('✅ #tabs-nav element is now hidden.');
        } else {
            console.error('⚠️ #tabs-nav element not found.');
        }
    } catch (err) {
        console.error('❌ Error hiding #tabs-nav:', err);
    }
}


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
    const idsToRemove = ["toast-slider-ced", "scrolling-text", "league-wrapper", "custom-section-landing", "telegram-section" , "whatsapp-badge","led-wrapper","toast-container-ced"];

    const styleIdsToRemove = [
        "toast-slider-style",
        "telegram-style",
        "mini-games-style",
		"_wa-badge-style",
		"led-style"
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
        const randomDuration = Math.random() * 35000 + 5000; // 5000ms ile 20000ms arasında rastgele süre

        // Eğer toast aktifse, bir sonraki animasyonu başlatmadan önce minimum 5 saniye bekle
        if (toastActive) {
            return setTimeout(animateToast, 5000); // Minimum 5 saniye bekle
        }

        toastActive = true;

        const randomUser = `****${Math.floor(Math.random() * 1000)}`;
        const randomGame = gameList[Math.floor(Math.random() * gameList.length)];

        // Fiyatı 1.000 ile 25.000 arasında rastgele bir değer üret
        const randomPrice = Math.floor(Math.random() * 24000 + 1000); // 1000 ile 25000 arasında değer üret

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
 
