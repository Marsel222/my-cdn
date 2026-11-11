# Betlora V2 görsel yönü — 2026-11-11

## Kullanıcı geri bildirimi

v0.3.0 kabuk çalışması nihai kalite hedefini karşılamadı. Kozmetik CSS cilası yerine belirgin biçimde farklı, premium ve özgün bir casino/sportsbook kompozisyonu üretilecek.

## Yeni zorunlu yön

- Mobil header ve alt navigasyon kompakt, dengeli ve işlem odaklı olacak.
- Cüzdan tekrarı azaltılacak; bakiye açık halde prototip görsellerine konmayacak.
- VIP kartları tekrar eden metin blokları yerine hedef, avantaj ve ilerleme hiyerarşisiyle yeniden düzenlenecek.
- Yanlış oranlar veya veri tutarsızlıkları CSS ile saklanmayacak; ayrı veri/şablon hatası olarak kaydedilecek.
- Ana sayfa, Casino, Spor, Promosyonlar ve VIP tek tasarım sistemiyle ele alınacak.
- Yeni kompozisyon önce yerel masaüstü ve mobil prototiplerde doğrulanacak.
- Görsel kalite doğrulanmadan test domainine entegrasyon yapılmayacak.
- Mevcut Next.js davranışları ve panel veri sahipliği korunacak; kaynak kod gerektiren değişiklikler açıkça ayrılacak.

## v0.3.0 durumu

`src/v2/modules/10-shell-v0.3.0.css` araştırma ve karşılaştırma kaydıdır. Test domainine gönderilmeyecek ve yeni tasarımın temeli kabul edilmeyecektir.

## Yerel prototip doğrulaması

- Ana sayfa, Casino, Spor, Promosyonlar ve VIP için birbirinden farklı içerik kompozisyonları hazırlandı.
- Ortak kabuk; kompakt header, beş öğeli ana navigasyon, sade cüzdan erişimi ve mobil alt navigasyondan oluşuyor.
- 320×700 ve 1024×768 ölçülerinde beş sayfanın tamamında yatay taşma oluşmadı.
- 390×844 ve 1920×1080 ölçülerinde ekran görüntüleri üretildi.
- Rota geçişlerinde konsol hatası veya uyarısı oluşmadı.

## Entegrasyon sınırı

Mevcut DOM üzerinde güvenli biçimde uyarlanabilecekler:

- renk, tipografi, boşluk ve ortak yüzey tokenları;
- header, sidebar ve mobil alt navigasyonun görsel sistemi;
- mevcut kartların grid, boyut, odak ve responsive davranışı;
- buton, sekme, rozet, yüklenme ve boş durum görsel dili.

Kaynak kodu veya platform sağlayıcısı desteği gerektirebilecekler:

- DOM sırasını ve bilgi mimarisini değiştiren gerçek header/cüzdan sadeleştirmesi;
- VIP oranlarının ve tekrar eden açıklamaların veri kaynağında düzeltilmesi;
- promosyon tarih verisinin (`Invalid date`) şablon/veri katmanında düzeltilmesi;
- üçüncü taraf spor widget'ının veya iframe içeriğinin iç yerleşimi;
- sayfada bulunmayan yeni semantik bileşenler ve gerçek iş akışları.

Bu ikinci gruptaki sorunlar CSS ile gizlenmeyecek ve tamamlanmış sayılmayacaktır.
