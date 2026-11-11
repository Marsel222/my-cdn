# Betlora V2 · Tasarım Önizlemesi

`dist/index.html` dosyasını tarayıcıda aç. Kaynak dosyalar ve görseller yereldir. Önizleme `noindex,nofollow` ile işaretlidir.

11 Kasım 2026 tarihli Master Audit, Paket A, uygulama matrisi ve mevcut Betlora sayfası kapsamın kaynağıdır. Bu sürümde panel, CSS/JSON varyantları, script kayıtları veya canlı/test ortamları değiştirilmedi. Önizleme bir CDN veya Betlora sitesi tarafından yüklenmez.

| Alan | Önizlemede görülen |
| --- | --- |
| Ortak kabuk | Önerilen sözcük logosu, kömür/zümrüt yüzeyler, limon yeşili aksan, mobil alt menü, masaüstü yan menü ve footer |
| Ana sayfa ve Casino | Gerçek oyun kapaklarından seçki, adla arama, sağlayıcı filtresi, detay ve oturum boyunca yerel favoriler |
| Canlı Casino ve sağlayıcılar | Denetimde gözlenen kategoriler ve sağlayıcı dizini |
| Spor | Sağlayıcıya ayrılan alan ve mevcut spor dalları. Kupon, karşılaşma ve oranlar platform sağlayıcısına bağlı |
| Promosyonlar | 14 tarihli kart, durum filtreleri ve detayda koşul özeti. Gerçek uygunluk ve bonus talebi platforma bağlı |
| VIP, Çark, Piyango, Turnuvalar, Meydan Okumalar | Denetimdeki VIP seviyeleri, çark türleri, çekiliş koşulları ve liste durumları. Kişiye özel ilerleme, bilet ve işlemler platforma bağlı |
| Hesap, Cüzdan ve destek | Doğrulanmış hesap menüsü, destek bağlantıları ve yasal içerik için yerleşim. Oturum, kayıt, cüzdan işlemleri, blog yönlendirmesi ve yayımlanacak metinler açık |

Önizlemede gerçek bakiye, bahis, kullanıcı kimliği, kazanç kaydı veya lisans doğrulaması kullanılmaz. VIP oran çelişkisi ve promosyon 2292 tarih hatası kaynak veri düzeltmesi bekler. Kartlarda kaynak kampanya koşullarının tarihli özeti bulunur.

Yeni vitrin görseli `dist/art/hero.jpg`, yerleşik ImageGen aracında üretildi. Görsel istemi, sol tarafı metin için koyu bırakılmış, sağda çapraz açıdan gerçekçi metal rulet çarkı, yeşil keçe, tek fildişi top, zümrüt ve limon yeşili ışık çizgileri ile siyah-gölgeli sinematik bir kampanya fotoğrafıydı. Görselin içinde metin ve logo yok.

## Test ortamındaki ilk uygulama grubu

Mevcut bildirim CSS yedeği ve sürüm manifesti üzerinden başla. Panel kayıtları ile test CSS/JSON varyantını salt okunur karşılaştır. Testte görülebilirlik ve izolasyon kanıtı oluştuğunda ana sayfa ile ortak kabuk değişikliklerini küçük ve geri alınabilir paketlere ayır. CDN gecikmesi sonrasında gerçek test sayfasında masaüstü/mobil rota geçişi, klavye, bildirim katmanı ve hash doğrula. Spor iframe’i, VIP verisi ve gerçek hesap/cüzdan akışları için mevcut bileşenleri ve veri sahipliğini kullan.


## Yerel doğrulama

- 14 ekran, 320 / 390 / 768 / 1440 px genişliklerde toplam 56 görünüm. Son turda yatay sayfa taşması, tarayıcı konsol hatası veya yüklenmiş görsellerde bozuk kaynak saptanmadı.
- Sweet Bonanza aramasında iki sonuç, oyunu favorilere ekleyince bir kayıt, Pasif promosyonlarda boş durum, Tümü filtresinde 14 kart ve Hoş Geldin Bonusu detayında koşul listesi.
- Mobil menüden VIP Kulübü açıldı, menü kapandı ve 13 seviye gösterildi.
- Test adresi, bu oturumda normal tarayıcı erişiminde Cloudflare güvenlik doğrulaması ekranında kaldı.

## Gamdom ve Stake referansları

- [Gamdom](https://gamdom.com/) ana sayfasında Casino ve Spor girişleri, oyun araması ve ayrı katalog rafları görüldü. Betlora önizlemesinde mevcut iki ürün için kendi görsellerimizle kompakt girişler ve hemen altında oyun araması var.
- [Stake](https://stake.com/tr) ürün girişlerini, katalog alanlarını ve yardım bağlantılarını ayrı gruplarda sunuyor. Betlora'da ürün, etkinlik, hesap ve destek bağlantıları mevcut içeriklerine göre düzenlendi.
- Panel için başlangıç hedefi %70 panel, %20 doğrulanmış Test Domaini V2 CSS/JSON ve %10 zorunlu entegrasyon. Ana sayfa sıralaması, görseller, kategori ve sağlayıcılar önce mevcut panel bileşenleriyle eşlenir. V2 katmanına kart ölçüsü, tipografi, odak ve responsive düzen girer. Kaynak şablonunda erişilemeyen yapılar ve Spor iframe'i ancak gerekli olduğunda sağlayıcıya gider.
- Açık Loki Chrome sekmelerinde test ana sayfası `49-test.css`, canlı ana sayfa `49.css` yükledi. Bu bulgu CSS varyantına aittir. Panel kayıtlarının kapsamı, mevcut değer ve geri dönüş yedeği ilk yazmadan önce kayıt bazında doğrulanır.
- Yenilenen ana sayfa 320, 390, 768 ve 1440 px genişliklerde yatay taşma göstermedi. Ana sayfadan Sweet Bonanza ve Pragmatic Play filtreleri iki sonuç döndürdü. Mobil Spor kartı doğru yerel rotayı açtı.
