#!/usr/bin/env python

import os.path
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


def inlines(file):
    kvs = {}
    for k, v in (l.rsplit('->', 1) for l in file):
        v = open(v.rstrip()).read()
        if k.startswith('js:'):
            k = f'<script src="{k[3:]}">'
            v = '<script>' + v
        kvs[k] = v
    return kvs


def keymap(file):
    return {k: v.rstrip() for k, v in (l.rsplit('->', 1) for l in file)}


def resolve(entry):
    return open(entry[5:]).read() if entry.startswith('file:') else entry


if __name__ == "__main__":
    route = toml.load('wrangler.toml')['env']['fujitestnet']['route'][:-1]
    replace = {
        "http://localhost:8787/": route
    }
    for name in sys.argv[2:]:
        f = open(name)
        replace.update(inlines(f) if name.endswith('.inlines') else keymap(f))

    print("Şu kurallara göre güncellenecek:", replace)

    f = open(sys.argv[1], 'r+')
    out = multireplace(f.read(), replace)

    f.seek(0)
    f.write(out)
    f.truncate()
    f.close()
