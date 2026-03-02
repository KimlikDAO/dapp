import EnFlag from "./en.svg";
import TrFlag from "./tr.svg";
import { css } from "/lib/kastro/StyleSheet";
import { LangCode } from "/lib/util/i18n";

/** @enum {string} */
const Css = css`
  .Stack {
    display: flex;
    align-items: center;
  }

  .Flag {
    border-radius: 50%;
    border: none;
    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    display: inline-flex;
    height: 18px;
    margin-left: -3px;
    overflow: hidden;
    width: 18px;
  }

  .Flag:first-child {
    margin-left: 0;
  }
`;

/**
 * @param {{ codes?: LangCode[] }} props
 */
const FlagStack = ({ codes }) => (
  <div class={Css.Stack}>
    {codes.map(code => {
      const Flag = {
        [LangCode.TR]: TrFlag,
        [LangCode.EN]: EnFlag,
      }[code];
      return <span class={Css.Flag}><Flag width={18} height={18} inline /></span>;
    })}
  </div>
);

export { FlagStack };
