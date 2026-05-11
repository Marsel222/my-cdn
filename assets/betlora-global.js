
// ==========================================
// FEATURE: Sidebar Social Links Wp-Telegram
// Canlı Destek butonunun altına sosyal medya linkleri ekler
// Hedef: .sb-top-btn.supportbtn (Canlı Destek) altı
// Kapsam: Tüm sayfalar
// ==========================================
(function() {
  const FEATURE_ID = 'lora-sidebar-social-links';

  const socialLinks = [
    {
      name: 'WhatsApp Destek',
      url: 'https://bit.ly/m/betlorawp',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/betloraofficial/',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>'
    }

  ];

  function isAlreadyInserted() {
    return document.getElementById(FEATURE_ID) !== null;
  }

  function createSocialLinkButton(link) {
    const a = document.createElement('a');
    a.className = 'sb-top-btn lora-social-link-item';
    a.href = link.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('data-sb-tooltip', link.name);
    a.setAttribute('aria-label', link.name);
    a.innerHTML = `
      <span class="icon" aria-hidden="true">
        <span style="display: inline-flex; width: 20px; height: 20px; line-height: 0;">
          ${link.icon}
        </span>
      </span>
      <span class="sb-top-title">${link.name}</span>
      <span class="sb-top-arrow" aria-hidden="true">›</span>
    `;
    return a;
  }

  function createElement() {
    const wrapper = document.createElement('div');
    wrapper.id = FEATURE_ID;
    wrapper.className = 'lora-sidebar-social-section';

    const dividerTop = document.createElement('div');
    dividerTop.className = 'sidebar-section-title';
    dividerTop.innerHTML = '<span class="sidebar-section-title__line"></span>';
    wrapper.appendChild(dividerTop);

    socialLinks.forEach(link => {
      wrapper.appendChild(createSocialLinkButton(link));
    });

    const dividerBottom = document.createElement('div');
    dividerBottom.className = 'sidebar-section-title';
    dividerBottom.innerHTML = '<span class="sidebar-section-title__line"></span>';
    wrapper.appendChild(dividerBottom);

    return wrapper;
  }

  function insertElement() {
    if (isAlreadyInserted()) return;

    const supportBtn = document.querySelector('.sb-top-btn.supportbtn');
    if (!supportBtn) return;

    const el = createElement();
    supportBtn.parentNode.insertBefore(el, supportBtn.nextSibling);

    
  }

  function init() {
    setTimeout(insertElement, 300);

    const observer = new MutationObserver(() => {
      if (!isAlreadyInserted() && document.querySelector('.sb-top-btn.supportbtn')) {
        insertElement();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    let lastUrl = location.href;
    new MutationObserver(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        setTimeout(insertElement, 300);
      }
    }).observe(document, { subtree: true, childList: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ==========================================
// FEATURE: Menu Head WhatsApp Button
// .menu-head içindeki call-button'dan hemen önce WhatsApp butonu ekler
// Hedef: .menu-head .buttons > .call-button öncesi
// Kapsam: Tüm sayfalar
// ==========================================
(function() {
  const FEATURE_ID = 'lora-menu-whatsapp-btn';

  const whatsappLink = {
    name: 'WhatsApp',
    url: 'https://bit.ly/m/betlorawp',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="#82ee99" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>'
  };

  function isAlreadyInserted() {
    return document.getElementById(FEATURE_ID) !== null;
  }

  function createWhatsappButton() {
    const btn = document.createElement('a');
    btn.id = FEATURE_ID;
    btn.className = 'call-button lora-whatsapp-button';
    btn.href = whatsappLink.url;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.setAttribute('data-sb-tooltip', whatsappLink.name);
    btn.setAttribute('aria-label', whatsappLink.name);

    btn.innerHTML = `
      <span style="display: block; width: 20px; height: 20px; line-height: 0;" class="call-button__icon" aria-hidden="true">
        ${whatsappLink.icon}
      </span>
    `;
    return btn;
  }

  function insertButton() {
    if (isAlreadyInserted()) return;

    const callBtn = document.querySelector('.menu-head .buttons .call-button');
    if (!callBtn) return;

    const whatsappBtn = createWhatsappButton();
    callBtn.parentNode.insertBefore(whatsappBtn, callBtn);
    console.log('✅ WhatsApp button eklendi');
  }

  function init() {
    setTimeout(insertButton, 300);

    // DOM değişikliklerini gözlemle
    const observer = new MutationObserver(() => {
      if (!isAlreadyInserted() && document.querySelector('.menu-head .buttons .call-button')) {
        insertButton();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // URL değişirse tekrar ekle
    let lastUrl = location.href;
    new MutationObserver(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        setTimeout(insertButton, 300);
      }
    }).observe(document, { subtree: true, childList: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ==========================================
// FEATURE: Scrolling Text with Next URL
// Header'ın altına bir sonraki betlora numarasını gösteren kayan metin ekler
// Kapsam: Tüm sayfalar
// ==========================================
(function() {
    const FEATURE_ID = 'lora-scrolling-next-url';

    function getNextUrlNumber() {
        const currentUrl = window.location.href;
        const match = currentUrl.match(/betlora(\d+)/); // betlora sonrası gelen sayıyı al
      if (match && match[1]) {
        let currentNumber = parseInt(match[1], 10);
        
        // 230'u atla
        let nextNumber = currentNumber + 1;
        if (nextNumber === 230) {
            nextNumber = 231;
        }
        return nextNumber;
    }
      
        return null;
    }

    function createScrollingTextElement(text) {
        const wrapper = document.createElement('div');
        wrapper.className = 'scrolling-text';
        wrapper.id = FEATURE_ID;

        const span = document.createElement('span');
        span.textContent = text;

        wrapper.appendChild(span);
        return wrapper;
    }

    function isAlreadyInserted() {
        return document.getElementById(FEATURE_ID) !== null;
    }

    function insertOrUpdateScrollingText() {
        const nextNumber = getNextUrlNumber();
        if (nextNumber === null) {
            console.error("Geçerli bir URL formatı bulunamadı.");
            return;
        }

        const text = `BİR SONRAKİ GÜNCEL ADRESİMİZ betlora${nextNumber}.com'dur. LÜTFEN SAHTE SİTELERE İTİBAR ETMEYİNİZ.`;

        const existing = document.getElementById(FEATURE_ID);
        if (existing) {
            const currentText = existing.querySelector('span')?.textContent;
            if (currentText !== text) {
                existing.querySelector('span').textContent = text; // Metni güncelle
            }
            return;
        }

        const scrollingDiv = createScrollingTextElement(text);
        const header = document.querySelector('header');
        if (header) {
            header.insertAdjacentElement('afterend', scrollingDiv);
        }
    }

    function init() {
        setTimeout(insertOrUpdateScrollingText, 300);

        // DOM değişikliklerini gözlemle (SPAs için)
        const observer = new MutationObserver(() => {
            insertOrUpdateScrollingText();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // URL değişirse tekrar ekle
        let lastUrl = location.href;
        new MutationObserver(() => {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                setTimeout(insertOrUpdateScrollingText, 300);
            }
        }).observe(document, { subtree: true, childList: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();




