#!/usr/bin/env python

import os
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse

import toml

import keymapper

DEV_CONFIG = toml.load("tools/dev.toml")
HOST_NAME = DEV_CONFIG['hostname']
PORT = DEV_CONFIG['port']
ROUTE = toml.load("tools/prod.toml")['route']['pattern']
REVERSE = {
    f"//{ROUTE}": f"{HOST_NAME}:{PORT}/",
    '"//': '"https://'
}

PAGES = {
    "/": "ana-tr.html",
    "/al": "al-tr.html",
    "/get": "al-en.html",
    "/mint": "al-en.html",
    "/incele": "incele-tr.html",
    "/view": "incele-en.html",
    "/oyla": "oyla-tr.html",
    "/vote": "oyla-en.html",
    "/iptal": "iptal-tr.html",
    "/revoke": "iptal-en.html",
}

MIMES = {
    "css": "text/css",
    "js": "text/javascript;charset=utf-8",
    "svg": "image/svg+xml",
    "ttf": "font/ttf",
    "woff2": "font/woff2",
    "ico": "image/x-icon",
    "txt": "text/plain",
}


class TestServer(BaseHTTPRequestHandler):
    def do_GET(self):
        fname = PAGES.get(urlparse(self.path).path, None)
        if fname:
            fname = 'build/' + fname
            ctype = "text/html;charset=utf-8"
        else:
            fname = 'build' + self.path
            ctype = MIMES[os.path.splitext(self.path)[1][1:]]

        file = open(fname, 'br').read()
        self.send_response(200)
        self.send_header("Content-type", ctype)
        self.end_headers()
        if ctype.startswith('text/'):
            file = keymapper.multireplace(
                file.decode('utf-8'), REVERSE).encode('utf-8')
        self.wfile.write(file)


with HTTPServer(("localhost", PORT), TestServer) as server:
    server.serve_forever()
