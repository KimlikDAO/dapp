import Paths from "./paths";

/**
 * @param {{
 *   width: (number | undefined),
 *   height: (number | undefined)
 * }=} props
 */
export default ({ width = 24, height = 24 }) => (
  <svg width={width} height={height}>
    <path d={Paths.Arrow} stroke="#fff" stroke-width={1.5} stroke-miterlimit={10} />
  </svg>
);
