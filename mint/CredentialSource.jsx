import Css from "./CredentialSource.css";
import { FlagStack } from "/components/flags/Flags";
import dom from "../lib/kastro/dom";
import { I18nString, LangCode } from "../lib/util/i18n";

/**
 * @param {{
*   id: string,
*   title$: I18nString,
*   description$: I18nString,
*   countries$: LangCode[]
* }} props
*/
const CredentialSource = ({ id, title$, description$, countries$ }) => {
  /** @const {HTMLDivElement} */
  const Root = dom.div(id);

  return (
    <Root class={Css.Root}>
      <h3 class={Css.Title}>{title$}</h3>
      <div class={Css.Content}>
        <div class={Css.Info}>
          <p class={Css.Description}>{description$}</p>
          <FlagStack codes={countries$} />
        </div>
        <div class={Css.ImageContainer}>
        </div>
      </div>
    </Root>
  );
};

export default CredentialSource;
