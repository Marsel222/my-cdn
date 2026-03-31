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
             addScrollingText("BİR SONRAKİ GÜNCEL ADRESİMİZ betlora204.com'dur. LÜTFEN SAHTE SİTELERE İTİBAR ETMEYİNİZ.");
          addRandomUserPlaying();
             createToastAndShow(); 
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
         
            bonusTabCustomReplace(); 
            if (path === "/tr/" || path === "/tr") {
				addRandomUserPlaying();
		
                 createToastAndShow(); 
            } else if (path === "/tr/vip") {
                clearDynamicContent();
        
            } else if (path === "/tr/casino") {
                clearDynamicContent();
				addRandomUserPlaying();
            } else if (path === "/tr/sportsbook") {
                clearDynamicContent();
            } else if (path === "/tr/trade") {
                clearDynamicContent();
            } else if (path === "/tr/e-sport") {
                clearDynamicContent();
            } else if (path === "/tr/challenges") {
                clearDynamicContent();
            } else if (path === "/tr/latest-big-wins") {
                LandingPage();
            } 
			else if (path === "/tr/promotions") {

                clearDynamicContent();
              
            }
			else {
                clearDynamicContent();
               removeGlobalModal();
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

function addScrollingText(text) {
    const existing = document.querySelector(".scrolling-text");

    if (existing) {
        const currentText = existing.querySelector("span")?.textContent;
        if (currentText === text) return; // Do nothing if the text is the same

        // Update the text if different
        existing.querySelector("span").textContent = text;
        return;
    }

    // Create the scrolling text div
    const scrollingDiv = document.createElement("div");
    scrollingDiv.className = "scrolling-text";

    const span = document.createElement("span");
    span.textContent = text;

    scrollingDiv.appendChild(span);

    // Insert after header
    const header = document.querySelector("header");
    header.insertAdjacentElement("afterend", scrollingDiv);
}


function clearDynamicContent() {
    const idsToRemove = ["", "custom-section-7", "league-wrapper", "custom-section-landing", "telegram-section" , "whatsapp-badge","led-wrapper","toast-container-ced"];

    const styleIdsToRemove = [
        "big-wins-style",
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
                    <path d="M12 2V16" stroke="#00a8ff" stroke-width="2" stroke-linecap="round"/>
                    <path d="M6 10L12 16L18 10" stroke="#00a8ff" stroke-width="2" stroke-linecap="round"/>
                    <rect x="2" y="18" width="20" height="4" rx="1" fill="#00a8ff"/>
                </svg>
            `
        },
        {
            text: 'Para Çek',
            href: '/tr/payments/withdrawal',
            svg: `
                <svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22V8" stroke="#00a8ff" stroke-width="2" stroke-linecap="round"/>
                    <path d="M6 14L12 8L18 14" stroke="#00a8ff" stroke-width="2" stroke-linecap="round"/>
                    <rect x="2" y="2" width="20" height="4" rx="1" fill="#00a8ff"/>
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
                    <p class="user-ced">BG*** KAZANDI</p>
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
            const randomDuration = Math.random() * 15000 + 5000; // 1000ms ile 3000ms arasında rastgele süre

            // Eğer toast aktifse, bir sonraki animasyonu başlatmadan önce minimum 5 saniye bekle
            if (toastActive) {
                return setTimeout(animateToast, 5000); // Minimum 5 saniye bekle
            }

            toastActive = true;

            const randomUser = `****${Math.floor(Math.random() * 1000)}`;
            const randomGame = gameList[Math.floor(Math.random() * gameList.length)];
            const randomPrice = Math.floor(Math.random() * 600 + 100); // 100 ile 700 arasında tam sayı

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
            }, randomDuration + 3000); // Yukarı çıktıktan 2 saniye sonra

            setTimeout(animateToast, randomDuration + 5000); // Minimum 5 saniye sonra tekrar döngüye gir
        }

        animateToast();
    }

 
