


/** @enum {string} */
const ConnectionId = {
  Core: "co",
  Rabby: "ra",
  MetaMask: "mm",
  Auro: "au",
};

/**
 * @param {string} ad
 * @return {string} url
 */
const bağlantıResmi = (ad) => `components/wallet/img/${ad.split(" ")[0].toLowerCase()}.svg`;

/**
 * @param {{ id: ConnectionId, name: (string|undefined) }} props
 */
const Connection = ({ id, name }) => (
  <li id={Css.Cüzdan + id}>
    <Image src={bağlantıResmi(name)} width={32} height={32} />
    <div class={Css.CüzdanIşığı}></div> {name}<span class={Css.Cüzdanİndir} nodisplay>{{
      en: "GET",
      tr: "İNDİR"
    }}</span>
  </li>
);

const ConnectionList = () => (
  <>
    <ul id={Css.Cüzdan + ChainGroup.EVM} class={Css.MenüListesi}>
      <Connection id={ConnectionId.Rabby} name="Rabby Wallet" />
      <Connection id={ConnectionId.Core} name="Core" />
      <Connection id={ConnectionId.MetaMask} name="Metamask" />
    </ul>
    <ul id={Css.Cüzdan + ChainGroup.MINA} class={Css.MenüListesi} nodisplay>
      <Connection id={ConnectionId.Auro} name="Auro" />
    </ul>
  </>
);

/**
 * @param {ChainGroup} chainGroup
 */
ConnectionList.show = (chainGroup) => {
  for (const group of ChainGroups)
    dom.adlaGösterGizle(Css.Cüzdan + group, group == chainGroup);

}

/**
 * @param {ChainGroup} chainGroup
 */
ConnectionList.hide = (chainGroup) => {
  for (const group of ChainGroups)
    dom.adlaGizle(Css.Cüzdan + group);
}

export default ConnectionList;
