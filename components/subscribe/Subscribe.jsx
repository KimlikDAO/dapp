import Css from "./Subscribe.css";
import SharedCss from "/components/sharedCss/SharedCss";
import dom from "/lib/util/dom";

/**
 * @param {{ id: string }} props
 * @return {Promise<string>}
 */
const Subscribe = ({ id }) => {
  /** @type {?string} */
  let subscribeText;
  /** @const {!HTMLFormElement} */
  const Root = dom.form(id);
  /** @const {!HTMLInputElement} */
  const input = /** @type {!HTMLInputElement} */(Root.firstElementChild);
  /** @const {!Element} */
  const button = /** @type {!Element} */(input.nextElementSibling);

  /**
   * @param {boolean} success
   */
  const update = (success) => {
    button.innerText = success
      ? subscribeText + dom.i18n({ tr: "dunuz 👍", en: "d 👍" })
      : dom.i18n({ tr: "Hata 🫨", en: "Error 🫨" });
    setTimeout(() => button.innerText = subscribeText, 3000);
    if (success)
      input.value = "";
  }

  /**
   * Email bültene kayıt isteğini gönderir ve sonucu görüntülemek için
   * {@link update()}'yi çağırır.
   *
   * @param {Event=} event
   */
  const submit = (event) => {
    event?.preventDefault();
    subscribeText ||= button.innerText;
    button.innerText = subscribeText + " ⏳";
    fetch("//bulten.kimlikdao.org/ekle", {
      method: "POST",
      body: JSON.stringify({ "email": input.value, "dil": dom.Lang })
    }).then(
      (res) => update(res && res.ok),
      () => update(false)
    );
  };

  return (
    <Root onSubmit={submit}>
      <Css />
      <input
        inputmode="email"
        autocomplete="email"
        name="email" class={Css.InputBox}
        type="email"
        placeholder={{ en: "Your email address", tr: "E-posta adresiniz" }}
      />
      <button
        class={[SharedCss.Button, SharedCss.Action, Css.SubscribeButton]}
        type="submit"
      >{{
        en: "Subscribe", tr: "Kaydol"
      }}</button>
    </Root>
  );
}

export default Subscribe;
