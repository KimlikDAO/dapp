#!/usr/bin/env python

import os
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse

import toml

import keymapper

CF_CONFIG = toml.load('wrangler.toml')
HOST_NAME = "localhost"
PORT = CF_CONFIG['dev']['port']
ROUTE = CF_CONFIG['env']['beta']['route'][:-1]
REVERSE = {
    ROUTE: "http://localhost:8787/"
}

PAGES = {
    "/": "/ana.html",
    "/al": "/al.html",
    "/incele": "/incele.html"
}

MIMES = {
    "js": "text/javascript;charset=utf-8",
    "css": "text/css",
    "png": "image/png",
    "svg": "image/svg+xml",
    "ttf": "font/ttf",
    "woff2": "font/woff2",
    "ico": "image/x-icon",
}


class TestServer(BaseHTTPRequestHandler):
    def do_GET(self):
        fname = PAGES.get(urlparse(self.path).path, None)
        if fname:
            fname = 'build' + fname
            ctype = "text/html;charset=utf-8"
        else:
            fname = 'build' + self.path
            ctype = MIMES[os.path.splitext(self.path)[1][1:]]

        self.send_response(200)
        self.send_header("Content-type", ctype)
        self.end_headers()

        file = open(fname, 'br').read()
        if ctype.startswith('text/html'):
            file = keymapper.multireplace(
                file.decode('utf-8'), REVERSE).encode('utf-8')
        self.wfile.write(file)


with HTTPServer((HOST_NAME, PORT), TestServer) as server:
    server.serve_forever()
