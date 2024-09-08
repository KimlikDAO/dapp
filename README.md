<h1><img src="birim/favicon/icon.svg" align="top" height="44"> KimlikDAO dApp'ı</a></h1>

## Dizinler

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

- `bun i` gerekli build araçlarını ve dev sunucusunu yükler

- `bun run dev` dev sunucuyu çalıştırır.
  - http://localhost:8787/

Kanarya ve deployment adımları için birkaç araca daha ihtiyacımız var

```shell
brew install pngcrush brotli zopfli woff2 webp librsvg
pip install fonttools
```

- `bun run dev --build` veya `bun run build; bun run canary` deploya hazır dApp'i `build` edip kanarya
  sunucusunu çalıştırır
  - http://localhost:8787/
