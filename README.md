# KimlikDAO dApp'ı

## Organizasyon
Her http request gerektiren bölümü 'sayfa' olarak adlandırıyoruz.
Her sayfa için gerekli dosyalar http `pathname`'i ile aynı isimli
bir klasörde toplanıyor.

Buna istisna `/` pathindeki ana sayfa; bu sayfaya `ana` klasörünü
ayırıyoruz.