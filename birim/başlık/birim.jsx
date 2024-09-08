
/**
 * @param {{
 *   href: string,
 *   title: string,
 *   piggyback: string|undefined
 * }} props
 * @return {string}
 */
const Başlık = ({ href, title = "KimlikDAO", piggyback }) => (
  <div id="ba">
    <link rel="stylesheet" href="/birim/başlık/birim.css" data-shared />
    <a href={href} id="bag"><img id="bak" src="/birim/logo.svg" data-inline />{title}</a>
    <div id="baf">
      <birim:dil data-piggyback={piggyback} />
      <birim:cüzdan data-piggyback={piggyback} />
    </div>
  </div>
);

export default Başlık;
