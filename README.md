# KimlikDAO dApp'ı

## Organizasyon
Her http request gerektiren bölümü 'sayfa' olarak adlandırıyoruz.
Her sayfa için gerekli dosyalar http `pathname`'i ile aynı isimli
bir klasörde toplanıyor.

Buna istisna `/` pathindeki ana sayfa; bu sayfaya `ana` klasörünü
ayırıyoruz.

## Kullanım
Yazılımcıların dApp'i test etmesi için gereken adımlar:
- `yarn install` gerekli build toollarını ve dev sunucusunu yükler

- `make dev` dev sunucuyu çalıştırır.
    - http://localhost:8787/al

Staging ve deployment adımları için birkaç araca daha ihtiyacımız var
```shell
brew install woff2
brew install zopfli
brew install brotli
```
- `make staging` deploya hazır dApp'i `build` edip staging sunucusunu çalıştırır
    - http://localhost:8787/al
- `make cf-deployment` deploya hazır dApp'i Cloudflare'e yükler
