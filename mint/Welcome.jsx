import Css from "./Mint.css";
import SharedCss from "/components/shared/SharedCss.css";
import Router from "/lib/kastro/Router";
import dom from "/lib/util/dom";

export default () => {
  const Button = dom.button(Css.WelcomeButton);
  return (
    <div id={Css.Welcome}>
      <h2>{{ en: "Welcome, here's your KPass 👋", tr: "Hoşgeldiniz, işte KPass'iniz 👋" }}</h2>
      <p>{{
        en: "You can click on the regenerate button to customize its appearance. For now, it contains no data and it's not written on chain. Let's add some data into it.",
        tr: "Görünümünü özelleştirmek için yeniden oluştur düğmesini kullanabilirsiniz. Şu anda içinde veri yok ve zincire yazılmamış. Haydi içine bazı veriler ekleyelim."
      }}</p>
      <Button
        onClick={() => Router.navigate("sources")}
        class={[SharedCss.Button, SharedCss.Action]}>
        {{ en: "Let's do it!", tr: "Haydi yapalım!" }}
      </Button>
    </div>
  );
}
