import dom from "/lib/util/dom";
import Css from "./CredentialSource.css";
import { Image } from "/lib/kastro/image";
import { LangCode, I18nString } from "/lib/util/i18n";

/**
 * @param {{
*   id: string,
*   title$: (I18nString | undefined),
*   description$: (I18nString | undefined),
*   countries$: (!Array<LangCode> | undefined),
* }} props
*/
const CredentialSource = ({ id, title$, description$, countries$ }) => {
  /** @const {!HTMLDivElement} */
  const Root = dom.div(id);

  /** @const {!HTMLDivElement} */
  const CountryFlags = dom.div(`${id}_flags`);

  return (
    <Root class={Css.Root}>
      <Css />
      <h3 class={Css.Title}>{title$}</h3>
      <div class={Css.Content}>
        <div class={Css.Info}>
          <p class={Css.Description}>{description$}</p>
          <CountryFlags class={Css.Countries}>
            {countries$.map(country => (
              <span class={`${Css.Flag} flag-icon-${country.toLowerCase()}`} />
            ))}
          </CountryFlags>
        </div>
        <div class={Css.ImageContainer}>
        </div>
      </div>
    </Root>
  );
};

export default CredentialSource;
