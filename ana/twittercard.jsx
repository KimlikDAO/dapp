import { Description, Title } from "./opengraph.jsx";
import { HostUrl } from "/crate";

const TwitterCard = () => (<>
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={Title} />
  <meta name="twitter:description" content={Description} />
  <meta name="twitter:image" content={`${HostUrl}/KPASS.svg`} />
</>);

export default TwitterCard;
