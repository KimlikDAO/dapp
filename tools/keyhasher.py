#!/usr/bin/env python

import base64
import hashlib
import os.path
import shutil
import sys

map_file = open(sys.argv[1], 'a+')

f_name = sys.argv[2]
h = hashlib.sha256(open(f_name, 'rb').read()).digest()
h = base64.b64encode(h, altchars=b'+-')[:8].decode()
h += os.path.splitext(f_name)[1]

shutil.copyfile(f_name, os.path.join(os.path.dirname(f_name), h))
shutil.copyfile(
    f_name + '.gz', os.path.join(os.path.dirname(f_name), h + '.gz'))
shutil.copyfile(
    f_name + '.br', os.path.join(os.path.dirname(f_name), h + '.br'))


def to_source(name):
    name = name[6:]
    parts = os.path.splitext(name)
    return '/' + parts[0] + '/page' + parts[1]


f_name = sys.argv[3] if len(sys.argv) >= 4 else to_source(f_name)

print(f_name + " -> " + h)
map_file.write(f_name + " -> " + h + "\n")
