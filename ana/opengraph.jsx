import { HostUrl } from "/crate";
import { I18nString, LangCode } from "/lib/util/i18n";

/** @const {I18nString} */
export const Description = {
  [LangCode.EN]: "Wallet-login to all on/off-ramps with a single account you truly own",
  [LangCode.TR]: "Bir kez KPass al, tüm on/off-ramp’leri cüzdanınla hesap açmadan kullan"
};

/** @const {I18nString} */
export const Title = {
  [LangCode.EN]: "KimlikDAO | Self-custody digital IDs",
  [LangCode.TR]: "KimlikDAO | Blokzincirdeki kimlik NFT’niz"
};

export default () => (<>
  <meta property="og:type" content="website" />
  <meta property="og:url" content={HostUrl} />
  <meta property="og:title" content={Title} />
  <meta property="og:image" content={`${HostUrl}/KPASS.svg`} />
  <meta property="og:description" content={Description} />
  <meta property="og:locale" content={{ [LangCode.EN]: "en_US", [LangCode.TR]: "tr_TR" }} />
  <meta property="og:site_name" content="KimlikDAO" />
</>);
