import { readFileSync, writeFileSync } from 'fs';
import { Parser } from "htmlparser2";

const serializeTag = (name, attr) => {
  /** @type {string} */
  let out = "<" + name;
  for (let key in attr) {
    out += attr[key] ? ` ${key}="${attr[key]}"` : " " + key;
  }
  return out + ">";
}

const readInline = (name, lang) => {
  const parts = name.split('.');
  let file = "";
  try {
    file = readFileSync(`build${parts[0]}-${lang}.${parts[1]}.inl`, 'utf8');
  } catch (e) {
    file = readFileSync(`build${name}.inl`, 'utf8');
  }
  return file.trim();
}

/**
 * @param {string} moduleName
 * @param {string} lang
 * @param {!Object<string, string>} baseAttrs
 * @return {string}
 */
const readModule = (moduleName, lang, baseAttrs) => {
  const EN = lang == "en";
  let output = ""
  let depth = 0;
  let replaceDepth = 0;
  let phantom = {};
  let staged = null;

  /** @const {!Object<string, string>} */
  const dict = {};
  for (const attr in baseAttrs)
    if (attr.startsWith("data-")) {
      dict[attr.slice(5)] = baseAttrs[attr];
      delete baseAttrs[attr];
    }

  const parser = new Parser({
    onopentag(tag, attrs) {
      depth += 1;

      if ("data-remove" in attrs) return;

      if (tag.startsWith("birim:")) {
        output += readModule(`birim/${tag.slice(6)}/birim.html`, lang, attrs);
        return;
      }

      if (tag.startsWith("altbirim:")) {
        output += readModule(moduleName.slice(0, -10) + tag.slice(9) + "/birim.html", lang, attrs);
        return;
      }

      for (const attr in attrs) {
        if (attr.startsWith("data-remove-")) {
          delete attrs[attr.slice("data-remove-".length)];
          delete attrs[attr];
        } else if (attr.startsWith("data-en-")) {
          if (EN) attrs[attr.slice("data-en-".length)] = attrs[attr];
          delete attrs[attr];
        } else if (attr.startsWith("data-set-")) {
          const value = dict[attrs[attr]];
          if (value) attrs[attr.slice("data-set-".length)] = value;
          delete attrs[attr];
        }
      }

      if ("data-inline" in attrs) {
        if (tag === 'script') output += '<script>';
        output += readInline(attrs.src, lang);
        return;
      }

      let replaceStr = "";
      if ("data-en" in attrs) {
        if (replaceDepth) console.error("Nested replace!", tag, attrs);
        if (EN) {
          replaceDepth = depth;
          replaceStr = attrs["data-en"];
        }
        delete attrs["data-en"];
      } else if (replaceDepth > 0) {
        return;
      }

      if ("data-phantom" in attrs) {
        phantom[depth] = true;
      } else {
        if (depth == 1)
          Object.assign(attrs, baseAttrs);

        output += serializeTag(tag, attrs);
      }

      output += replaceStr;
    },
    ontext(text) {
      if (replaceDepth <= 0) {
        if (staged) {
          output += staged;
          staged = null;
        } else
          output += text;
      }
    },
    oncomment(comment) {
      comment = comment.trim();
      if (EN && comment.startsWith("en:")) {
        staged = comment.slice(3);
      }
    },
    onclosetag(tag, isImplied) {
      staged = null;
      if (depth == replaceDepth) {
        replaceDepth = 0;
      }
      if (replaceDepth == 0 && !phantom[depth] && !isImplied)
        output += "</" + tag + ">";

      phantom[depth] = false;
      depth -= 1;
    },
    onprocessinginstruction(name, data) {
      output += `<${data}>`;
    }
  }, { recognizeSelfClosing: true });

  parser.end(readFileSync(moduleName, 'utf8'));
  return output;
}

/** @const {!Array<string>} */
const args = process.argv;

/** @const {string} */
const out = readModule(args[2], args[3], {});

/** @const {!Array<string>} */
const parts = args[2].split('.');
writeFileSync(`build/${parts[0].slice(0, -6)}-${args[3]}.${parts[1]}`, out);
