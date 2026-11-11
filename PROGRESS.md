# Betlora V2 ilerleme kaydı

Son güncelleme: 2026-11-11 18:35 Europe/Istanbul

## Sürüm durumu

- Son doğrulanmış kararlı entegrasyon: `integration-v0.1.0` (loader geri dönüşü tamamlandı; 3443 pasif).
- Test CSS üzerinde doğrulanmış düzenleme: bildirim kutusu responsive paketi, SHA-256 `5a1c8e58014c9aa58bbee1c7303b5c42609f8a50933095b7dc7adef1135189d2`.
- Hazırlanan ve panel sunucusunda kalıcılığı doğrulanan sürüm: `v0.2.0`, aday SHA-256 `997185742715ecf9df0a7d167c3f5f1661c5ff501bb0b11cf7d58fbb14c1254e`.
- `v0.2.0` kaynak CDN’de yeni sorgu anahtarıyla mevcut; test sitesinin kullandığı sabit sürümlü URL henüz eski içeriği döndürdüğü için gerçek site doğrulaması bekliyor.
- Hazırlanan fakat yayınlanmayan sonraki modül: `src/v2/modules/10-shell-v0.3.0.css` (header, desktop sidebar yüzeyi ve mobil alt navigasyon).

## Tamamlanan modüller

- Bildirim izni kutusunun masaüstü/tablet/mobil responsive düzenlemesi.
- v0.2.0 ortak tasarım tokenları.
- Koyu zeminde kaybolan `.ph6q__title` ve `.ph6q__subtitle` okunabilirlik düzenlemesi.
- Header yüzeyi, görünür klavye odağı ve azaltılmış hareket desteği.
- GitHub sürüm manifesti, test matrisi ve geri dönüş belgesi.

## Test domaininde doğrulanan değişiklikler

- Bildirim kutusu responsive paketi: masaüstü 1920×889, tablet 1024×768, mobil 390×844; yatay taşma yok.
- Kapat ve “Bir daha gösterme” davranışları çalışıyor; bildirim izni kullanıcı tıklaması olmadan istenmiyor.
- v0.2.0 panel kaydı “Yenile” sonrası GitHub adayıyla birebir eşleşiyor.
- v0.3.0 kabuk modülü yerel gerçek-DOM önizlemesinde 390×844 ve 1920×889 ölçülerinde test edildi; yatay taşma yok. Mobil header kırpılması düzeltilip logo, arama, bakiye, cüzdan, profil ve bildirim alanlarının tamamı görünür hale getirildi.

## Açık testler

- v0.2.0 sabit test CSS URL’sinin yeni hash’e geçmesi.
- Ana sayfa, Casino, Spor, Promosyonlar, VIP ve Çark rota turu.
- 320/375/390/768/1024/1440/1920 genişliklerinde taşma ve katman kontrolü.
- Console/network ve canlı CSS hash değişmezliği.

## Açık hatalar ve engeller

- Panelde ilk büyük editör yapıştırması görünürde değişmiş fakat sunucuya kalıcı yazılmamıştı. Çözüm: sunucudan yeniden yükleyip yalnız sürüm farkını eklemek ve “Yenile” sonrası birebir doğrulamak.
- CDN kaynak dosyası güncel olsa da test sitesinin kullandığı sabit sorgulu URL 11–12 dakika eski içeriği tutabiliyor.
- v0.2.0 sabit sorgulu test CSS URL’si 14 dakikalık doğrulama penceresinde güncellenmedi; cache-busting kaynak isteği güncelken gerçek sayfa hâlâ eski hash’i yükledi. Paneldeki ortak `Cache` işlemi test izolasyonu doğrulanmadan kullanılmayacak.
- Önceki v0.1.0 Casino rota yaşam döngüsü hatası nedeniyle 3443 pasif kalacak.

## Sonraki çalışma grubu

1. v0.2.0 gerçek site testlerini ve önce/sonra kanıtlarını tamamla.
2. Birinci grup bütünleşik paket: global tasarım sistemi, header, sidebar, footer, ana sayfa ve mobil navigasyon.
3. Casino/Spor hero panelleri ile oyun kataloğu görsel modüllerini yerelde geliştir.

## Devam komutları

```powershell
git switch codex/betlora-v2-test-transformation
npm test
npm run build
git status --short --branch
```

## Rollback referansları

- `docs/v2/rollback-v0.2.0.md`
- `master-audit/backups/49-test.css.20261111-1755-post-paket-b.bak` (yerel güvenli yedek)

## Değişmez sınırlar

- Canlı `49.css` / `49.json` değiştirilmeyecek.
- Script 2501 değiştirilmeyecek.
- Yeni script kaydı oluşturulmayacak; 3443 pasif kalacak.
- Ortak üretim verileri, finansal kurallar, gerçek kullanıcı verileri ve hukuki içerikler açık onay olmadan değiştirilmeyecek.
