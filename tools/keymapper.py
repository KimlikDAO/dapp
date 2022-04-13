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


def wrap(txt):
    """
    Yanlışlıkla bul/değiştirleri azaltmak için sar.
    """
    return '="' + txt + '"'


def flip(name):
    return os.path.splitext(name)[0] + '/page' + os.path.splitext(name)[1]


route = toml.load('wrangler.toml')['env']['fujitestnet']['route'][:-1]
replace = {
    "http://localhost:8787/": route
}
for name in sys.argv[2:]:
    kvs = {k.strip(): v.strip() for k, v in (l.split('=') for l in open(name))}
    replace.update({wrap(flip(k)): wrap(v) for k, v in kvs.items()})

print("Şu kurallara göre güncellenecek:", replace)

f = open(sys.argv[1], 'r+')
out = multireplace(f.read(), replace)

f.seek(0)
f.write(out)
f.truncate()
f.close()
