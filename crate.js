import { I18nString, LangCode } from "/lib/util/i18n";

/** @define {string} */
const HOST_URL = "https://kimlikdao.org/";

/** @enum {I18nString} */
const Page = {
  Ana: { [LangCode.EN]: "en", [LangCode.TR]: "tr" },
  Al: { [LangCode.EN]: "mint", [LangCode.TR]: "al" },
  İptal: { [LangCode.EN]: "revoke", [LangCode.TR]: "iptal" },
  Oyla: { [LangCode.EN]: "vote", [LangCode.TR]: "oyla" },
  KPassim: { [LangCode.EN]: "kpass", [LangCode.TR]: "kpassim" }
};

/** @const {Page} */
const Entry = Page.Ana;

/** @const {LangCode} */
const CodebaseLang = LangCode.TR;

export {
  CodebaseLang,
  Entry,
  HOST_URL,
  Page
};
