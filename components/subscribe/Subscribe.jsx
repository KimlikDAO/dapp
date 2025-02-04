import Css from "./Subscribe.css";
import SharedCss from "../shared/SharedCss";
import dom from "/lib/util/dom";

/**
 * @param {{ id: string }} props
 */
const Subscribe = ({ id }) => {
  /** @const {!HTMLFormElement} */
  const Root = dom.form(id);
  /** @const {!HTMLInputElement} */
  const input = /** @type {!HTMLInputElement} */(Root.firstElementChild);
  /** @const {!Element} */
  const button = /** @type {!Element} */(input.nextElementSibling);
  /** @type {?string} */
  let subscribeText;

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
   * Sends the email newsletter registration request and calls
   * {@link update()} to update the UI.
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
