import Css from "./LangPicker.css";
import EnFlag from "/components/flags/en.svg";
import TrFlag from "/components/flags/tr.svg";
import HeaderCss from "/components/header/Header.css";
import dom from "/lib/util/dom";
import { I18nString, LangCode } from "/lib/util/i18n";

/** @define {I18nString} */
const Route = { tr: "tr", en: "en" };

/**
 * @param {{ cookieDomain: string }} props
 */
const LangPicker = ({ cookieDomain }) => {
  /** @const {!HTMLAnchorElement} */
  const LangButton = dom.a(Css.LangButton);
  /** @const {!HTMLUListElement} */
  const LangDropdown = dom.ul(Css.LangDropdown);

  /**
   * @param {Event} event 
   */
  const langChanged = (event) => {
    /** @const {!Element} */
    const targetElem = /** @type {!Element} */(event.target);
    /** @const {!HTMLLIElement} */
    const li = /** @type {!HTMLLIElement} */(targetElem.closest("li"));

    /** @const {LangCode} */
    const newLang = /** @type {LangCode} */(li.id.slice(Css.Root.length));
    if (newLang != dom.Lang) {
      document.cookie = `l=${newLang};path=/;domain=${cookieDomain};SameSite=Strict;max-age=${1e6}`;
      window.location.href = Route[newLang] + window.location.hash;
    }
  };

  return (
    <div id={Css.Root}>
      <Css />
      <LangButton
        controlsDropdown={LangDropdown}
        class={HeaderCss.Link} href="javascript:">{{ en: "EN", tr: "TR" }}
      </LangButton>
      <LangDropdown nodisplay onClick={langChanged}>
        <li id={Css.Root + LangCode.EN}>
          <EnFlag width={16} height={16} /> English
        </li>
        <li id={Css.Root + LangCode.TR}>
          <TrFlag width={16} height={16} /> Türkçe
        </li>
      </LangDropdown>
    </div>
  );
}

/** @enum {string} */
LangPicker.Css = Css;

export default LangPicker;
