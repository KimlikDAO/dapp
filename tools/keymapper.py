#!/usr/bin/env python

import re
import sys

import toml


def multireplace(string, replacements):
    """
    Given a string and a replacement map, it returns the replaced string.

    :param str string: string to execute replacements on
    :param dict replacements: replacement dictionary {value to find: value to replace}
    :rtype: str

    """
    # Place longer ones first to keep shorter substrings from matching
    # where the longer ones should take place
    # For instance given the replacements {'ab': 'AB', 'abc': 'ABC'} against
    # the string 'hey abc', it should produce 'hey ABC' and not 'hey ABc'
    substrs = sorted(replacements, key=len, reverse=True)

    # Create a big OR regex that matches any of the substrings to replace
    regexp = re.compile('|'.join(map(re.escape, substrs)))

    # For each match, look up the new string in the replacements
    return regexp.sub(lambda match: replacements[match.group(0)], string)


def keymap(file):
    return {k.strip(): v.strip() for k, v in (l.rsplit('->', 1) for l in file)}


if __name__ == "__main__":
    PORT = toml.load("tools/dev.toml")['port']
    HOST = toml.load("tools/prod.toml")['route']['pattern']
    replace = {
        f"http://localhost:{PORT}/": f"//{HOST}",
        f"https://ipfs.{HOST}": f"//ipfs.{HOST}",
        ',{type:"module"}': '',
    }
    of_name = None
    if len(sys.argv) >= 3 and sys.argv[-2] == '-o':
        of_name = sys.argv.pop()
        sys.argv.pop()

    for name in sys.argv[2:]:
        f = open(name)
        replace.update(keymap(f))

    print("Şu kurallara göre güncellenecek:", replace)

    f = open(sys.argv[1], 'r' if of_name else 'r+')
    out = multireplace(f.read(), replace)

    if of_name:
        of = open(of_name, 'w')
        of.write(out)
        of.close()
    else:
        f.seek(0)
        f.write(out)
        f.truncate()
        f.close()
