import dom from "../../lib/kastro/dom";

/**
 * @param {NodeList<Element>} siblings
 * @param {number} offset
 * @param {string[]} fields
 * @param {Record<string, string>} data
 */
const setFieldsFrom = (siblings, offset, fields, data) => {
  for (let i = 0; i < fields.length; ++i)
    dom.text.update(siblings[offset + 2 * i], data[fields[i]]);
}

export { setFieldsFrom };
