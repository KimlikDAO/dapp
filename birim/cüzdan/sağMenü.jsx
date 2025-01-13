import AmbassadorResmi from "/birim/cüzdan/img/ambassador.svg";
import DeğiştirResmi from "/birim/cüzdan/img/external-link.svg";
import İptalResmi from "/birim/cüzdan/img/iptal.svg";
import VoteResmi from "/birim/cüzdan/img/vote.svg";

export default () => <>
  <li><AmbassadorResmi inline />{{
    en: " Ambassador program",
    tr: " Ambassador ol"
  }}</li>
  <li><VoteResmi width={16} height={16} />{{
    en: " Vote",
    tr: " Oy kullan"
  }}</li>
  <li><İptalResmi inline />{{
    en: " Revoke KPass",
    tr: " İptal işlemleri"
  }}</li>
  <li><DeğiştirResmi inline />{{
    en: " Switch wallet",
    tr: " Cüzdan değiştir"
  }}</li>
</>
