import Css from "./Credentials.css";
import CredentialSource from "./CredentialSource";
import PopulationReg from "./populationReg/PopulationReg";
import Wallet from "/components/wallet/Wallet";
import KeyedSwitch from "/lib/kastro/KeyedSwitch";
import Router from "/lib/kastro/Router";
import dom from "/lib/kastro/dom";
import { LangCode } from "/lib/util/i18n";

const CredentialSearch = () => {
  /** @const {HTMLDivElement} */
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
  dom.div("population-registry").onclick = (e) => {
    e.stopPropagation();
    Router.navigate("pop-reg");
  }

  return (
    <div id={Css.Root}>
      <KeyedSwitch instance={Credentials.panes} id={Css.Panes}>
        <CredentialSearch key="sources" />
        <PopulationReg key="pop-reg" />
      </KeyedSwitch>
    </div>
  );
}

Credentials.show = (route) => {
  Credentials.panes.showPane(route);
  if (route === "pop-reg")
    PopulationReg.show();
}

export default Credentials;
