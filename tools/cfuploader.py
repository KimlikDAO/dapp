#!/usr/bin/env python

import base64
import json
import os
import os.path
import sys

import requests
import toml

DIL = {
    'en', 'tr'
}

NAMED_ASSET = {
    'sitemap.txt',
    # 'favicon.ico',
}

EXT = ['', '.br', '.gz']

CF_CONFIG = toml.load('tools/prod.toml')
ROUTE = f"https://{CF_CONFIG['route']['pattern']}/"
ACCOUNT_ID = CF_CONFIG['account_id']
ZONE_ID = CF_CONFIG['zone_id']
NAMESPACE_ID = CF_CONFIG['kv_namespaces'][0]['id']
CF_UPLOADER_TOKEN = toml.load('.gizli')['CF_UPLOADER_TOKEN']

URL = "https://api.cloudflare.com/client/v4"
ACCOUNTS_URL = f"{URL}/accounts/{ACCOUNT_ID}/storage/kv/namespaces/{NAMESPACE_ID}/"
ZONES_URL = f"{URL}/zones/{ZONE_ID}/"


def read_pages() -> str:
    for line in open('Makefile'):
        if line.startswith('PAGES :='):
            return line[8:].split()
    assert False, "Sayfalar bulunamadı"


SAYFALAR = read_pages()


def chunks(xs, n):
    return (xs[i:i+n] for i in range(0, len(xs), n))


def get_existing(namespace_id: str) -> set[str]:
    res = requests.get(
        ACCOUNTS_URL + 'keys', headers={'authorization': 'Bearer ' + CF_UPLOADER_TOKEN})
    return {x['name'] for x in res.json()['result']}


def batch_upload(names: list[str]):
    to_upload = []
    for name in names:
        b = {
            'key': name,
            'base64': True
        }
        b['value'] = base64.b64encode(
            open('build/' + name, 'rb').read()).decode()
        to_upload.append(b)

    to_upload = json.dumps(to_upload, separators=(',', ':'))
    return requests.put(ACCOUNTS_URL + 'bulk', data=to_upload, headers={
        'content-type': 'application/json',
        'authorization': 'Bearer ' + CF_UPLOADER_TOKEN
    })


def purge_cache(assets):
    batches = chunks(assets, 20)
    for i, batch in enumerate(batches):
        to_purge = {
            'files': [ROUTE + asset for asset in batch]
        }
        to_purge = json.dumps(to_purge, separators=(',', ':'))
        res = requests.post(ZONES_URL + 'purge_cache', data=to_purge, headers={
            'content-type': 'application/json',
            'authorization': 'Bearer ' + CF_UPLOADER_TOKEN
        })
        print(f"Batch {i} result: {res.status_code}")


def is_static_upload(name: str) -> bool:
    """
    Verilen bir ismin CF'e yüklenmesi gereken bir static olup olmadığını tespit eder.
    """
    return name != 'prod.js' and name not in existing and name not in named_upload


existing = get_existing(NAMESPACE_ID)
named_upload = ([f'{sayfa}-{dil}.html{ext}' for sayfa in SAYFALAR for ext in EXT for dil in DIL] +
                [named + ext for named in NAMED_ASSET for ext in EXT])
static_upload = list(filter(is_static_upload, next(os.walk('build'))[2]))

# (1) Statik asset'leri yükle
if static_upload:
    print("🌀 Statik asset'ler yükleniyor")
    print(static_upload)
    batch_upload(static_upload)
else:
    print("✅ Statik asset'ler aynı, bu adım atlanıyor")

# (2) Named asset'leri yükle
print("🌀 Named asset'ler yükleniyor")
print(named_upload)
batch_upload(named_upload)

# (3) Cache purge et
print("🌀 Cache purge ediliyor")
purge_cache(named_upload)
