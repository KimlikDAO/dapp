#!/usr/bin/env python

import base64
import hashlib
import os.path
import shutil
import sys


args = list(reversed(sys.argv[1:]))
map_file = open(args.pop(), 'a+')
compress = True
if args[-1] == '--nocompress':
    compress = False
    args.pop()


for f_name in args:
    f_name_parts = os.path.splitext(f_name)
    h = hashlib.sha256(open(f_name, 'rb').read()).digest()
    h = base64.b64encode(h, altchars=b'+-')[:8].decode()
    h_ext = h + f_name_parts[1]

    shutil.copyfile(f_name, 'build/' + h_ext)
    if compress:
        shutil.copyfile(f_name + '.gz', 'build/' + h_ext + '.gz')
        shutil.copyfile(f_name + '.br', 'build/' + h_ext + '.br')

    if f_name_parts[0][-3] == '-':
        f_name = f_name_parts[0][:-3] + f_name_parts[1]
    f_name = f_name[5:]
    print(f_name + " -> " + h_ext)
    map_file.write(f_name + " -> " + h_ext + "\n")
