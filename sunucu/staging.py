#!/usr/bin/env python

import os
import re
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse

import toml

DEV_CONFIG = toml.load("sunucu/dev.toml")
HOST_NAME = DEV_CONFIG['hostname']
PORT = DEV_CONFIG['port']
ROUTE = toml.load("sunucu/prod.toml")['route']['pattern']
REVERSE = {
}

PAGES = {
    "/": "ana-en.html",
    "/?tr": "ana-tr.html",
    "/?en": "ana-en.html",
    "/al": "al-tr.html",
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
    "png": "image/png",
    "ico": "image/x-icon",
    "txt": "text/plain",
    "webp": "image/webp"
}


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


class TestServer(BaseHTTPRequestHandler):
    def do_GET(self):
        fname = PAGES.get(self.path, None)
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
        self.wfile.write(file)


with HTTPServer(("localhost", PORT), TestServer) as server:
    server.serve_forever()
