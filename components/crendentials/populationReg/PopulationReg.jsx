import Css from "./PopulationReg.css";
import ExternalLink from "/al/tanışma/external-link.svg";
import NavTitle from "/components/elements/NavTitle";
import SharedCss from "/components/shared/SharedCss.css";
import Router from "/lib/kastro/Router";
import dom from "/lib/util/dom";
import CopyButton from "/components/elements/CopyButton";

const PopulationReg = () => {
  /** @const {!HTMLDivElement} */
  const Root = dom.div("pop-reg-root");
  /** @const {!HTMLDivElement} */
  const FileDrop = dom.div(Css.FileDrop);
  /** @const {!HTMLTableCellElement} */
  const Commitment = dom.td(Css.Commitment);
  /** @const {!HTMLButtonElement} */
  const Button = dom.button(Css.Button);

  return (
    <Root>
      <Css />
      <NavTitle
        id="pop-reg-title"
        title$={{ en: "Add Population Registry", tr: "Nüfus kayıt örneği ekle" }}
        backFn={() => Router.navigate("sources")} />

      <ol id={Css.Steps}>
        <li>{{
          en: <>You'll need a population registry document from the Turkish e-Government Portal.
            When you visit e-Devlet, you'll be asked to fill out a form to get your document.
            Here are the exact settings you need to use:</>,
          tr: <>E-devlet'ten nüfus kayıt örneği almanız gerekiyor.
            E-devlet'te belgenizi almak için bir form dolduracaksınız.
            Formu tam olarak şu şekilde doldurmanız gerekiyor:</>
        }}
          <table id={Css.Table}>
            <tr>
              <td>{{ en: "Certificate type", tr: "Belge tipi" }}</td>
              <td>{{ en: "Self", tr: "Kişi" }}</td>
            </tr>
            <tr>
              <td>{{ en: "Former spouse list", tr: "Eski eş listesi" }}</td>
              <td>{{ en: "No", tr: "Hayır" }}</td>
            </tr>
            <tr>
              <td>{{ en: "Background check", tr: "Vukuatlı" }}</td>
              <td>{{ en: "No", tr: "Hayır" }}</td>
            </tr>
            <tr>
              <td>{{ en: "Purpose", tr: "Belgenin veriliş amacı" }}</td>
              <td>{{ en: "Present to institution", tr: "Kuruma ibraz" }}</td>
            </tr>
            <tr>
              <td>{{ en: "Institution name", tr: "Kurum adı" }}</td>
              <Commitment>KimlikDAO-a234sfd
                <CopyButton width$={16} height$={16} id$={Css.CopyButton} />
              </Commitment>
            </tr>
          </table><p class={Css.Tip}>{{
            en: <>
              <b>Important:</b> You can only request one document per day, so please review
              the required settings above carefully before proceeding.
            </>,
            tr: <>
              <b>Önemli:</b> Günde sadece bir belge talep edebilirsiniz,
              bu nedenle lütfen yukarıdaki ayarları dikkatlice inceleyin.
            </>
          }}</p>
        </li>

        <li>{{
          en: <>Once you've reviewed the settings above, visit the <a href="https://www.turkiye.gov.tr/nvi-nufus-kayit-ornegi-belgesi-sorgulama"
            target="_blank"
            class={Css.Link}>
            e-Government Portal <ExternalLink inline /></a>{" "}
            and enter them exactly as shown. The institution name must match precisely.</>,
          tr: <>Yukarıdaki ayarları inceledikten sonra <a href="https://www.turkiye.gov.tr/nvi-nufus-kayit-ornegi-belgesi-sorgulama"
            target="_blank"
            class={Css.Link}>
            E-devlet Nüfus Kayıt Örneği sayfasını ziyaret edin <ExternalLink inline /></a>{" "}
            ve ayarları birebir girin. Kurum adının tam olarak aynı olması gerekiyor.</>
        }}<p class={Css.Tip}>{{
          en: <>
            <b>Tip:</b> If you make a mistake, you can try again with a different "Certificate type".
            You can request one document per day for each type: Individual, Family, or Population Family and we accept all of them.
          </>,
          tr: <>
            <b>İpucu:</b> Eğer bir hata yaparsanız, farklı bir belge tipi ile tekrar deneyebilirsiniz.
            Her belge tipi için günde bir belge talep edebilirsiniz: Birey, Aile veya Nüfus Aile.
            Tüm bunları kabul ediyoruz.
          </>
        }}</p>
        </li>

        <li>
          {{
            en: "Download the PDF document and upload it here",
            tr: "PDF belgesini indirin ve buraya yükleyin"
          }}
          <FileDrop class={[SharedCss.Card, Css.FileDrop]}>
            {{ en: "Upload Population Registry Document", tr: "Nüfus Kayıt Örneği Belgesi Yükle" }}
            <br />
            <Button class={[SharedCss.Button, SharedCss.Action]}>{{
              en: "Upload",
              tr: "Yükle"
            }}</Button>
          </FileDrop>
        </li>
      </ol>
    </Root>
  );
};

export default PopulationReg;
