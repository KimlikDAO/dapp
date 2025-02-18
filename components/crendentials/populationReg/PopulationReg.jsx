import CredentialsCss from "../Credentials.css";
import Css from "./PopulationReg.css";
import dom from "/lib/util/dom";
import NavTitle from "/components/elements/NavTitle";

const PopulationReg = () => {
  const Commitment = dom.td(Css.Commitment);

  return (
    <div>
      <Css />
      <NavTitle
        id={"aasdas"}
        title$={{ en: "Add population registry", tr: "Nüfus kayıt örneği ekle" }}
        backFn={() => { }} />
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
            en: "Calculating...",
            tr: "Hesaplanıyor..."
          }}</Commitment>
        </tr>
      </table>
    </div >
  );
};

export default PopulationReg;
