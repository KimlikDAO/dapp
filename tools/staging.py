#!/usr/bin/env python

import toml
import keymapper
import sys
import time
from http.server import BaseHTTPRequestHandler, HTTPServer

HOST_NAME = "localhost"
PORT = 8787

ROUTE = toml.load('wrangler.toml')['env']['beta']['route'][:-1]
REVERSE = {
    ROUTE: "http://localhost:8787/"
}


class TestServer(BaseHTTPRequestHandler):
    def do_GET(self):
        base = 'build'
        if self.path == '/':
            ctype = "text/html;charset=utf-8"
            fname = 'build/ana.html'
        elif self.path == '/al' or self.path.startswith('/al?'):
            ctype = "text/html;charset=utf-8"
            fname = 'build/al.html'
        elif self.path.endswith('.js'):
            ctype = 'text/javascript'
            fname = base + self.path
        elif self.path.endswith('.css'):
            ctype = 'text/css'
            fname = base + self.path
        elif self.path.endswith('.png'):
            ctype = 'image/png'
            fname = base + self.path
        elif self.path.endswith('.svg'):
            ctype = 'image/svg+xml'
            fname = base + self.path

        if self.path.endswith('.map') or self.path.endswith(".ico"):
            self.send_response(404)
            self.end_headers()
            return

        self.send_response(200)
        self.send_header("Content-type", ctype)
        self.end_headers()

        file = open(fname, 'r', encoding='utf-8').read()
        if ctype.startswith('text/html'):
            file = keymapper.multireplace(file, REVERSE)
        self.wfile.write(file.encode('utf-8'))


with HTTPServer(('localhost', PORT), TestServer) as server:
    server.serve_forever()
