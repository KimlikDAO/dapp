import Css from "./birim.css";
import OrtakCss from "/birim/ortakcss/birim";
import dom from "/lib/util/dom";

/**
 * @param {{ id: string }} props
 * @return {Promise<string>}
 */
const Kaydol = ({ id }) => {
  /** @type {?string} */
  let KaydolMetni;
  /** @const {!HTMLFormElement} */
  const Kök = dom.form(id);
  /** @const {!HTMLInputElement} */
  const girdi = /** @type {!HTMLInputElement} */(Kök.firstElementChild);
  /** @const {!Element} */
  const düğme = /** @type {!Element} */(girdi.nextElementSibling);

  /**
   * @param {boolean} başarılı
   */
  const güncelle = (başarılı) => {
    düğme.innerText = başarılı
      ? KaydolMetni + dom.i18n({ tr: "dunuz 👍", en: "d 👍" })
      : dom.i18n({ tr: "Hata 🫨", en: "Error 🫨" });
    setTimeout(() => düğme.innerText = KaydolMetni, 3000);
    if (başarılı)
      girdi.value = "";
  }

  /**
   * Email bültene kayıt isteğini gönderir ve sonucu görüntülemek için
   * {@link güncelle()}'yi çağırır.
   *
   * @param {Event=} event
   */
  const yolla = (event) => {
    event?.preventDefault();
    KaydolMetni ||= düğme.innerText;
    düğme.innerText = KaydolMetni + " ⏳";
    fetch("//bulten.kimlikdao.org/ekle", {
      method: "POST",
      body: JSON.stringify({ "email": girdi.value, "dil": dom.Lang })
    }).then(
      (res) => güncelle(res && res.ok),
      () => güncelle(false)
    );
  };

  return (
    <Kök onSubmit={yolla}>
      <Css />
      <input
        inputmode="email"
        autocomplete="email"
        name="email" class={Css.Girdi}
        type="email"
        placeholder={{ en: "Your email address", tr: "E-posta adresiniz" }}
      />
      <button
        class={[OrtakCss.Düğme, OrtakCss.Eylem, Css.KaydolDüğmesi]}
        type="submit"
      >{{
        en: "Subscribe", tr: "Kaydol"
      }}</button>
    </Kök>
  );
}

export default Kaydol;
