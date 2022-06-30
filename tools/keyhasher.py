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

if f_name.startswith('build/'):
    f_name = f_name[6:]

print(f_name + "=" + h)
map_file.write(f_name + "=" + h + "\n")