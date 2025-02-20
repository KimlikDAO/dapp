import Css from "./PopulationReg.css";
import NavTitle from "/components/elements/NavTitle";
import SharedCss from "/components/shared/SharedCss.css";
import Wallet from "/components/wallet/Wallet";
import Router from "/lib/kastro/Router";
import dom from "/lib/util/dom";

const PopulationReg = () => {
  const Button = dom.button(Css.Button);
  const Commitment = dom.td(Css.Commitment);

  return (
    <div>
      <Css />
      <NavTitle
        id={"aasdas"}
        title$={{ en: "Add population registry", tr: "Nüfus kayıt örneği ekle" }}
        backFn={() => Router.navigate("sources")} />
      <table id={Css.Table}>
        <tr>
          <td>{{ en: "Certificate type", tr: "Nüfus Kayıt Örneği Tipi" }}</td>
          <td>{{ en: "Self", tr: "Kişi" }}</td>
        </tr>
        <tr>
          <td>{{ en: "Include former spouse list", tr: "Eski Eş Listesi" }}</td>
          <td>{{ en: "No", tr: "Hayır" }}</td>
        </tr>
        <tr>
          <td>{{ en: "Include background check", tr: "Vukuatlı Belge (Olayları Göster)" }}</td>
          <td>{{ en: "No", tr: "Hayır" }}</td>
        </tr>
        <tr>
          <td>{{ en: "Purpose", tr: "Belgenin Neden Verileceği" }}</td>
          <td>{{ en: "Present to institution", tr: "Kuruma İbraz" }}</td>
        </tr>
        <tr>
          <td>{{ en: "Institution name", tr: "Kurum adı" }}</td>
          <Commitment>{{
            en: "Connect wallet...",
            tr: "Cüzdan bağla..."
          }}</Commitment>
        </tr>
      </table>
      <Button class={[SharedCss.Button, SharedCss.Action]} onClick={(e) => {
        e.stopPropagation();
        Wallet.open();
      }}>{{
        en: "Connect wallet", tr: "Cüzdan bağla"
      }}</Button>
    </div >
  );
};

export default PopulationReg;
