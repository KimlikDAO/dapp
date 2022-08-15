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

const readModule = (moduleName, lang, addAttr) => {
  const EN = lang == "en";
  let output = ""
  let depth = 0;
  let replaceDepth = 0;
  let phantom = {};
  let staged = null;

  const parser = new Parser({
    onopentag(tag, attr) {
      depth += 1;

      if ("data-remove" in attr) return;

      if (tag.startsWith("birim:")) {
        output += readModule(`birim/${tag.slice(6)}/birim.html`, lang, attr);
        return;
      }

      if (tag.startsWith("altbirim:")) {
        output += readModule(moduleName.slice(0, -10) + tag.slice(9) + "/birim.html", lang);
        return;
      }

      if ("data-remove-type" in attr) {
        delete attr["data-remove-type"];
        delete attr.type;
      }

      if ("data-inline" in attr) {
        if (tag === 'script') output += '<script>';
        output += readInline(attr.src, lang);
        return;
      }

      if (attr["data-en-title"]) {
        if (EN) attr.title = attr["data-en-title"];
        delete attr["data-en-title"];
      }

      if (attr["data-en-href"]) {
        if (EN) attr.href = attr["data-en-href"];
        delete attr["data-en-href"];
      }

      if (attr["data-en-lang"]) {
        if (EN) attr.lang = attr["data-en-lang"];
        delete attr["data-en-lang"];
      }

      let replaceStr = "";
      if ("data-en" in attr) {
        if (replaceDepth) console.error("Nested replace!");
        if (EN) {
          replaceDepth = depth;
          replaceStr = attr["data-en"];
        }
        delete attr["data-en"];
      } else if (replaceDepth > 0) {
        return;
      }

      if ("data-phantom" in attr) {
        phantom[depth] = true;
      } else {
        if (depth == 1)
          Object.assign(attr, addAttr);

        output += serializeTag(tag, attr);
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

/** @const {Array<string>} */
const args = process.argv;

/** @const {string} */
const out = readModule(args[2], args[3], {});

/** @const {Array<string>} */
const parts = args[2].split('.');
writeFileSync(`build/${parts[0].slice(0, -6)}-${args[3]}.${parts[1]}`, out);
