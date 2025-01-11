import { I18nString, LangCode } from "/lib/util/i18n";

/** @define {string} */
const HostUrl = "https://kimlikdao.org";

/** @enum {I18nString} */
const Page = {
  Ana: { [LangCode.EN]: "en", [LangCode.TR]: "tr" },
  Al: { [LangCode.EN]: "mint", [LangCode.TR]: "al" },
  YeniAl: { [LangCode.EN]: "newmint", [LangCode.TR]: "yenial" },
  İptal: { [LangCode.EN]: "revoke", [LangCode.TR]: "iptal" },
  Oyla: { [LangCode.EN]: "vote", [LangCode.TR]: "oyla" },
  KPassim: { [LangCode.EN]: "kpass", [LangCode.TR]: "kpassim" }
};

/** @enum {I18nString} */
const ExternalPage = {
  Join: {
    [LangCode.EN]: "//join.kimlikdao.org/?en", [LangCode.TR]: "//join.kimlikdao.org/?tr"
  },
  Docs: {
    [LangCode.EN]: "//docs.kimlikdao.org", [LangCode.TR]: "//docs.kimlikdao.org/v/turkce"
  }
};

/** @const {Page} */
const Entry = Page.Ana;

/** @const {LangCode} */
const CodebaseLang = LangCode.TR;

/** @const {!Object<string, string>} */
const Aliases = {
  "TCKT.svg": "KPASS.svg"
};

export {
  Aliases,
  CodebaseLang,
  Entry,
  ExternalPage,
  HostUrl,
  Page
};
