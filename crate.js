import { I18nString, LangCode } from "/lib/util/i18n";

/** @define {string} */
const HostUrl = "https://kimlikdao.org";

/** @enum {I18nString} */
const Page = {
  Landing: { [LangCode.EN]: "en", [LangCode.TR]: "tr" },
  Mint: { [LangCode.EN]: "mint", [LangCode.TR]: "al" },
  NewMint: { [LangCode.EN]: "newmint", [LangCode.TR]: "yenial" },
  Revoke: { [LangCode.EN]: "revoke", [LangCode.TR]: "iptal" },
  Vote: { [LangCode.EN]: "vote", [LangCode.TR]: "oyla" },
  KDAO: { [LangCode.EN]: "KDAO", [LangCode.TR]: "kdao" },
  KPass: { [LangCode.EN]: "kpass", [LangCode.TR]: "kpassim" }
};

/** @enum {I18nString|string} */
const ExternalPage = {
  Join: {
    [LangCode.EN]: "//join.kimlikdao.org/?en",
    [LangCode.TR]: "//join.kimlikdao.org/?tr"
  },
  Docs: {
    [LangCode.EN]: "//docs.kimlikdao.org",
    [LangCode.TR]: "//docs.kimlikdao.org/v/turkce"
  },
  Blog: {
    [LangCode.EN]: "//blog.kimlikdao.org/?en",
    [LangCode.TR]: "//blog.kimlikdao.org/?tr"
  },
  X: "//x.com/KimlikDAO",
  Discord: "//discord.gg/H2wg6pcWXG",
  Zealy: "//zealy.io/c/kimlikdao",
  GitHub: "//github.com/KimlikDAO",
  LinkedIn: "//linkedin.com/company/KimlikDAO/",
  DappRadar: "//dappradar.com/dapp/kimlikdao-2",
};

/** @const {Page} */
const Entry = Page.Landing;

/** @const {LangCode} */
const CodebaseLang = LangCode.EN;

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
