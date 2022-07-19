# KimlikDAO dApp'ı

## Organizasyon
Her http request gerektiren bölümü 'sayfa' olarak adlandırıyoruz.
Her sayfa için gerekli dosyalar http `pathname`'i ile aynı isimli
bir klasörde toplanıyor.

Buna istisna `/` pathindeki ana sayfa; bu sayfaya `ana` klasörünü
ayırıyoruz.

## Kullanım
Yazılımcıların dApp'i test etmesi için gereken adımlar:
- Önce build ve dev sunucusu için kullandığımız araçları yükleyelim.
`
npm install
`

- `make dev` yazarak artık dev sunucuyu çalıştırabiliriz:
    - Ana sayfaya erişmek icin http://localhost:8787
- `staging` ve `deployment` için; yani `make build` komutuna bağlı şeyleri çalıştırmadan önce `npx` komutuna ve `google-closure-compiler`'a ihtiyacımız olacak.
    - `npx` bizim desteklediğimiz npm sürümlerinde hali hazırda kurulu geliyor.
    - `npm install -g google-closure-compiler` yazarak `google-closure-compiler`'ı kurabiliriz.
    - `make staging` yazarak deploy için hazırlanmış dApp'i kendi bilgisayarımızda yine http://localhost:8787 adresinde çalıştırabiliriz.
