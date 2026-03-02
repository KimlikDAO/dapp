import Css from "./LangPicker.css";
import EnFlag from "/components/flags/en.svg";
import TrFlag from "/components/flags/tr.svg";
import HeaderCss from "/components/header/Header.css";
import dom from "/lib/kastro/dom";
import { I18nString, LangCode } from "/lib/util/i18n";

/** @define {I18nString} */
const Route = { tr: "tr", en: "en" };

/**
 * @param {{
 *   cookieDomain: string,
 *   Route?: I18nString,
 * }} props
 */
const LangPicker = ({ cookieDomain, Route: route = Route }) => {
  const LangButton = dom.a(Css.LangButton);
  const LangDropdown = dom.ul(Css.LangDropdown);

  /**
   * @param {Event | null} event 
   */
  const langChanged = (event) => {
    const targetElem = /** @type {Element} */(event.target);
    const li = /** @type {HTMLLIElement} */(targetElem.closest("li"));

    const newLang = /** @type {LangCode} */(li.id.slice(Css.Root.length));
    if (newLang != dom.Lang) {
      document.cookie = `l=${newLang};path=/;domain=${cookieDomain};SameSite=Strict;max-age=${1e6}`;
      window.location.href = route[newLang] + window.location.hash;
    }
  };

  return (
    <div id={Css.Root}>
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
