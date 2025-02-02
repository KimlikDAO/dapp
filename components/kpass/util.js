/**
 * @param {!NodeList<!Element>} siblings
 * @param {number} offset
 * @param {!Array<string>} fields
 * @param {!Object<string, string>} data
 */
const setFieldsFrom = (siblings, offset, fields, data) => {
  for (let i = 0; i < fields.length; ++i)
    siblings[offset + 2 * i].innerText = data[fields[i]];
}

export { setFieldsFrom };
