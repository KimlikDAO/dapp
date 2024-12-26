import { I18nString, LangCode } from "/lib/util/i18n";

/** @enum {I18nString} */
const Page = {
  Ana: { en: "en", tr: "tr" },
  Al: { en: "mint", tr: "al" },
  İptal: { en: "revoke", tr: "iptal" },
  Oyla: { en: "vote", tr: "oyla" },
  KPassim: { en: "kpass", tr: "kpassim" }
};

/** @const {Page} */
const Entry = Page.Ana;

/** @const {LangCode} */
const CodebaseLang = LangCode.TR;

export { CodebaseLang, Entry, Page };
