# v0.2.0 geri dönüş

1. V2 CSS Ayarları ekranında gerçek pointer ile **Test Domaini** seçilir.
2. Hedefin `49-test.css` olduğu ağ isteğiyle doğrulanır.
3. `BETLORA V2 FOUNDATION v0.2.0` işaretli blok kaldırılır veya işlem öncesi tam CSS yedeği geri yüklenir.
4. Kaydetmeden önce canlı varyanta geçilmediği tekrar doğrulanır.
5. 11–12 dakikalık CDN gecikmesi beklenir.
6. `49-test.css` SHA-256 değerinin işlem öncesi değere döndüğü doğrulanır.
7. `49.css` SHA-256 değerinin değişmediği yeniden kontrol edilir.

Bu işlem script 2501 veya 3443 gerektirmez.

İşlem öncesi doğrulanmış test CSS SHA-256 değeri: `5a1c8e58014c9aa58bbee1c7303b5c42609f8a50933095b7dc7adef1135189d2`.
