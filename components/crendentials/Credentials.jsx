import Css from "./Credentials.css";
import CredentialSource from "./CredentialSource";
import PopulationReg from "./populationReg/PopulationReg";
import Switch from "/lib/kastro/Switch";
import dom from "/lib/util/dom";
import { LangCode } from "/lib/util/i18n";

const CredentialSearch = () => {
  /** @const {!HTMLDivElement} */
  const Grid = dom.div(Css.Grid);

  return (
    <div>
      <h2 id={Css.Title}>{{ en: "Add info", tr: "Bilgi ekle" }}</h2>
      <input
        type="search"
        id={Css.Search}
        placeholder={{ en: "Type country, state, or source", tr: "Ülke veya kaynak gir" }}
      />
      <Grid>
        <CredentialSource
          id={"passport"}
          title$={{ en: "Passport", tr: "Pasaport" }}
          description$={{ en: "Passport", tr: "Pasaport" }}
          countries$={[LangCode.TR, LangCode.EN]} />
        <CredentialSource
          id={"population-registry"}
          title$={{ en: "Population registry", tr: "Nüfus kayıt örneği" }}
          description$={{ en: "Population registry", tr: "Nüfus kayıt örneği" }}
          countries$={[LangCode.TR]} />
        <CredentialSource
          id={"id-me"}
          title$={{ en: "ID.me", tr: "ID.me" }}
          description$={{ en: "ID.me", tr: "ID.me" }}
          countries$={[LangCode.EN]} />
      </Grid>
    </div>
  );
}

const Credentials = () => {
  dom.div("population-registry").onclick = () => Credentials.panes.showPane(1);

  return (
    <div id={Css.Root}>
      <Css />
      <Switch instance={Credentials.panes} id={Css.Panes} initialSelected={0}>
        <CredentialSearch />
        <PopulationReg />
      </Switch>

      <div nodisplay>
        <button>
          {{ en: "Back", tr: "Geri" }}
        </button>
      </div>
    </div>
  );
}

export default Credentials;
