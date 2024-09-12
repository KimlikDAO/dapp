import dom from "/lib/util/dom";

/** @const {!HTMLDivElement} */
export const Boncuklar = dom.div("sen");
/** @const {!HTMLUListElement} */
export const Kartlar = dom.ul("sem");

/**
 * @return {!HTMLDivElement}
 */
const Sergi = () => (
  <div id="se">
    <link rel="stylesheet" href="/ana/hero/sergi/birim.css" />
    <div id="sec">
      <Kartlar>
        <li class="sek">
          <h3 data-en="An on-chain account that you truly own">Kontrolü
            tamamen sende olan on-chain bir hesap</h3>
          <i18n data-en="Mint your KPass and wallet login to all supported on/off-ramps with an account you truly own">Bir
            kez KPass al, destekleyen tüm platformlarda cüzdanını bağla,
            gerekli bilgileri güvenle sun, hesap açmadan işlem
            yap</i18n>
        </li>
        <li class="sek">
          <h3 data-en="Your data is encrypted under your wallet private key">İçeriği kendi cüzdan anahtarlarınla
            şifrelenir</h3>
          <i18n
            data-en="The contents of your KPass is encrypted in your browser under your wallet private key. KimlikDAO will never store your data">
            KPass içeriği kendi tarayıcında kendi cüzdan anahtarlarınla şifrelenir. KimlikDAO asla bilgilerini
            göremez ve saklamaz</i18n>
        </li>
        <li class="sek">
          <h3 data-en="KPass can be kept in any NFT wallet, such as MetaMask">MetaMask gibi NFT
            destekleyen kripto cüzdanında taşınır</h3>
          <i18n data-en="KPass is an ERC-721 non-fungible token meaning that you can see it in any NFT wallet">KPass
            ERC-721 standardına uygun bir NFT olduğu için NFT destekleyen her cüzdanda görülebilir</i18n></li>
        <li class="sek">
          <h3 data-en="Control who can access your info">dApp’lere istediğin
            bilgileri paylaş, istediklerini gizli tut</h3>
          <i18n
            data-en="The connected dApp may send you requests for accessing parts of your KPass. Approve the sections you’d like to share, reject others">
            Bağlı dApp KPass’inin içindeki bölümlere erişim isteği yollayabilir. Paylaşmak istediklerini onayla,
            gizli tutmak istediklerini onaylama</i18n>
        </li>
      </Kartlar>
    </div>
    <Boncuklar>
      <div class="seb">
        <div class="sei sel"></div>
      </div>
      <div class="seb">
        <div class="sei"></div>
      </div>
      <div class="seb">
        <div class="sei"></div>
      </div>
      <div class="seb">
        <div class="sei"></div>
      </div>
    </Boncuklar>
  </div>
);

export default Sergi;
