# KimlikDAO dApp'ı

## Organizasyon
Her http request gerektiren bölümü 'sayfa' olarak adlandırıyoruz.
Her sayfa için gerekli dosyalar http `pathname`'i ile aynı isimli
bir dizinde toplanıyor.

Buna istisna `/` pathindeki ana sayfa; bu sayfaya `ana` dizinini
ayırıyoruz.

Sayfaların bazı `altbirim`leri olabilir; bunlar sayfa içindeki sınırları belli
bileşenler ve bu bileşenlere ait her dosya altbirimle aynı adda bir dizinde
duruyor. Örneğin `al/` sayfasının `tanışma` ve `ödeme` gibi altbirimleri
`al/tanışma` ve `al/ödeme` dizininde duruyor.

Birden çok yerde kullanılabilen bileşenlere ise `birim` adını
veriyoruz ve bunları `birim/` dizinine koyuyoruz.

## Kullanım
Yazılımcıların dApp'i test etmesi için gereken adımlar:
- `git clone --recursive https://github.com/KimlikDAO/dapp`

- `yarn` gerekli build toollarını ve dev sunucusunu yükler

- `make dev` dev sunucuyu çalıştırır.
    - http://localhost:8787/al

Staging ve deployment adımları için birkaç araca daha ihtiyacımız var
```shell
brew install pngcrush
brew install zopfli
brew install brotli
pip install fonttools
brew install woff2
```
- `make staging` deploya hazır dApp'i `build` edip staging sunucusunu
   çalıştırır
    - http://localhost:8787/al
- `make cf-deployment` deploya hazır dApp'i Cloudflare'e yükler
