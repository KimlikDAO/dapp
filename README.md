# KimlikDAO dApp'ı

## Organizasyon
Her http request gerektiren bölümü 'sayfa' olarak adlandırıyoruz.
Her sayfa için gerekli dosyalar http `pathname`'i ile aynı bir klasörde
toplanıyor.
Buna istisna `/` pathindeki sayfa, bunu `ana` klasörünü ayırıyoruz.