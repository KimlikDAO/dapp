import SharedCss from "../shared/SharedCss";
import Css from "./Subscribe.css";
import dom from "/lib/util/dom";

/**
 * @param {{ id: string }} props
 */
const Subscribe = ({ id }) => {
  /** @const {HTMLFormElement} */
  const Root = dom.form(id);
  /** @const {HTMLInputElement} */
  const input = /** @type {HTMLInputElement} */(Root.firstElementChild);
  /** @const {Element} */
  const button = /** @type {Element} */(input.nextElementSibling);

  /**
   * @param {boolean} success
   */
  const update = (success) => {
    if (success) {
      input.value = "";
      dom.text.appendPreserve(button, dom.i18n({ en: "d 👍", tr: "dunuz 👍" }));
    } else
      dom.text.update(button, dom.i18n({ en: "Error 🫨", tr: "Hata 🫨" }));
    setTimeout(() => dom.text.setPreserve(button), 3000);
  }

  /**
   * Sends the email newsletter registration request and calls
   * {@link update()} to update the UI.
   *
   * @param {Event | null=} e
   */
  const submit = (e) => {
    e?.preventDefault();
    dom.text.appendPreserve(button, " ⏳");
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
