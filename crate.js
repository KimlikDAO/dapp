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

/**
 * @param {string} id of the source file to be transformed
 * @param {string} code
 * @param {!Object<string, string>} globals
 * @return {string|undefined}
 */
const devModeJsTransform = (id, code, globals) => {
  if (id.endsWith("cüzdan/birim.js"))
    return code
      .replace(/const Chains =.*?;/, `const Chains = ${JSON.stringify(globals["Chains"])};`)
      .replace(/const DefaultChain =.*?;/, `const DefaultChain = ${JSON.stringify(globals["DefaultChain"])};`);
  if (id.endsWith("dil/birim.js"))
    return code
      .replace(/const Route =.*?;/, `const Route = ${JSON.stringify(globals["Route"])};`);
  if (id.endsWith("util/dom.js"))
    return code
      .replace(/const GEN =.*?;/, `const GEN = false`)
      .replace(/const Lang =.*?;/, `const Lang = "${globals["Lang"]}";`);
  if (id.endsWith(".jsx")) {
    const lines = code.split("\n");
    const filteredLines = lines.filter((line) => line.includes("util/dom") ||
      line.trim().startsWith("export const"));
    return filteredLines.join("\n");
  }
}

export {
  HOST_URL,
  CodebaseLang,
  devModeJsTransform,
  Entry,
  Page
};
