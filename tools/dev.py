#!/usr/bin/env python

import sys
import time
from http.server import BaseHTTPRequestHandler, HTTPServer

HOST_NAME = "localhost"
PORT = 8787
STAGING = len(sys.argv) > 1 and sys.argv[1] == "--staging"


class TestServer(BaseHTTPRequestHandler):
    def do_GET(self):
        ctype = "text/html;charset=utf-8"
        if self.path.endswith('.js'):
            ctype = 'text/javascript'
        elif self.path.endswith('.css'):
            ctype = 'text/css'
        elif self.path.endswith('.png'):
            ctype = 'image/png'

        if self.path.endswith('.map') or self.path.endswith(".ico"):
            self.send_response(404)
            self.end_headers()
            return

        self.send_response(200)
        self.send_header("Content-type", ctype)
        self.end_headers()

        if self.path == '/':
            fname = 'build/ana' if STAGING else 'ana/page.html'
        elif self.path == '/al' or self.path.startswith('/al?'):
            fname = 'build/al' if STAGING else 'al/page.html'
        else:
            fname = 'build' + self.path if STAGING else self.path[1:]
        self.wfile.write(open(fname, 'r', encoding='utf-8').read().encode('utf-8'))


with HTTPServer(('localhost', PORT), TestServer) as server:
    server.serve_forever()
