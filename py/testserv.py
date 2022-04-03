from http.server import BaseHTTPRequestHandler, HTTPServer
import time

HOST_NAME = "localhost"
PORT = 8787

class TestServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.path = self.path.replace("%C5%9F", "ş")
    
        ctype = "text/html"
        if self.path.endswith('.js'):
            ctype = 'text/javascript'
        elif self.path.endswith('.css'):
            ctype = 'text/css'
        elif self.path.endswith('.png'):
            ctype = 'image/png'

        if self.path.endswith('.map') or self.path.endswith(".ico"):
            self.send_response(404)
            return

        self.send_response(200)
        self.send_header("Content-type", ctype)
        self.end_headers()

        if self.path == '/':
            fname = 'src/index.html'
        elif self.path.find('.') == -1:
            fname = 'src' + self.path + '.html'
        else:
            fname = 'src' + self.path
        self.wfile.write(open(fname, 'r').read().encode('utf-8'))

with HTTPServer(('localhost', PORT), TestServer) as server:
    server.serve_forever()
