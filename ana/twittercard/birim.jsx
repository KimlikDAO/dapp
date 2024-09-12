import { Description, Title } from "../opengraph/birim";

const TwitterCard = () => (<>
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={Title} />
  <meta name="twitter:description" content={Description} />
  <meta name="twitter:image" content="https://kimlikdao.org/KPASS.svg" />
</>);

export default TwitterCard;
