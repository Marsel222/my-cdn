# Betlora V2 tasarım temeli — v0.2.0

## Kapsam

Bu sürüm yalnız `test.betlora.com` için ortak tasarım temeli oluşturur. İş kurallarını, kampanya görsellerini, oyun içeriklerini, bildirim izin mantığını ve kullanıcı verilerini değiştirmez.

## Tokenlar

| Amaç | Değer |
|---|---|
| Marka | `#81EE99` |
| Marka güçlü | `#52D875` |
| Arka plan | `#070807` |
| Yüzey | `#0D0F0E` |
| Yükseltilmiş yüzey | `#121513` |
| Ana metin | `#F2FBF3` |
| İkincil metin | `#B7C2B9` |
| Sessiz metin | `#93A096` |
| Kenarlık | `rgba(255,255,255,.10)` |
| Odak | `#81EE99` |

## Kurallar

- Tipografi mevcut dosya indirmeden sistem yazı tipi zincirini kullanır.
- Sayfa başlıkları `.ph6q__title`, açıklamalar `.ph6q__subtitle` ile standardize edilir.
- Klavye odağı ortak kabukta en az 3 px görünür halkadır.
- Hareket azaltma tercihi desteklenir.
- Bildirim kutusunun onaylanmış responsive CSS bloğu aynen korunur.

## Doğrulanmış sorun

VIP, Promosyonlar ve Çark sayfa başlıkları Bootstrap varsayılanı `rgb(33,37,41)` ile koyu zeminde gösteriliyordu. v0.2.0 bu alanı doğrudan güvenli sınıfları üzerinden düzeltir.
