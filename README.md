# KimlikDAO dApp'ı

## Organizasyon
Her http request gerektiren bölümü 'sayfa' olarak adlandırıyoruz.
Her sayfa için gerekli dosyalar http `pathname`'i ile aynı isimli
bir klasörde toplanıyor.

Buna istisna `/` pathindeki ana sayfa; bu sayfaya `ana` klasörünü
ayırıyoruz.

## Kullanim
Yazilimcilarin on yuzu test etmesi icin gereken adimlar:
- `npm install`

- `make dev`
    - Ana sayfaya erismek icin http://0.0.0.0:8787
- `staging` ve `deployment` icin; yani `make build` komutuna bagli seyleri calistirmadan once `npx` komutuna ihtiyacimiz olacak. 
    - Eger npm versiyonu 5.2'den dusukse `npm install -g npx`
    - Eger yuksekse `npx` hali hazirda kurulu geliyor. 
