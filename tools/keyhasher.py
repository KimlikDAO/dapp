#!/usr/bin/env python

import base64
import hashlib
import os.path
import shutil
import sys

map_file = open(sys.argv[1], 'a+')

for f_name in sys.argv[2:]:
    h = hashlib.sha256(open(f_name, 'rb').read()).digest()
    h = base64.b64encode(h, altchars=b'+-')[:8].decode()
    h_ext = h + os.path.splitext(f_name)[1]

    shutil.copyfile(f_name, 'build/' + h_ext)
    shutil.copyfile(f_name + '.gz', 'build/' + h_ext + '.gz')
    shutil.copyfile(f_name + '.br', 'build/' + h_ext + '.br')

    f_name = f_name[5:]
    print(f_name + " -> " + h_ext)
    map_file.write(f_name + " -> " + h_ext + "\n")
