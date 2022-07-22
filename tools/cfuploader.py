#!/usr/bin/env python

import base64
import json
import os
import sys

import requests
import toml


CF_ENV = 'beta'

SAYFALAR = {
    'al', 'ana'
}
EXT = ['', '.br', '.gz']

config = toml.load('wrangler.toml')

ROUTE = config['env'][CF_ENV]['route'][:-1]
ACCOUNT_ID = config['account_id']
ZONE_ID = config['zone_id']
NAMESPACE_ID = config['kv_namespaces'][0]['id']
CF_UPLOADER_TOKEN = toml.load('.gizli')['CF_UPLOADER_TOKEN']

URL = "https://api.cloudflare.com/client/v4"
ACCOUNTS_URL = f"{URL}/accounts/{ACCOUNT_ID}/storage/kv/namespaces/{NAMESPACE_ID}/"
ZONES_URL = f"{URL}/zones/{ZONE_ID}/"


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

    return requests.put(ACCOUNTS_URL + 'bulk', data=json.dumps(to_upload), headers={
        'content-type': 'application/json',
        'authorization': 'Bearer ' + CF_UPLOADER_TOKEN
    })


def purge_cache():
    data = {
        'files': [ROUTE + page + ext for page in SAYFALAR for ext in EXT]
    }
    return requests.post(ZONES_URL + 'purge_cache', data=json.dumps(data), headers={
        'content-type': 'application/json',
        'authorization': 'Bearer ' + CF_UPLOADER_TOKEN
    })


def stem(name):
    return name.split('.', 1)[0]


def is_static_upload(name: str) -> bool:
    """
    Verilen bir ismin CF'e yüklenmesi gereken bir static olup olmadığını tespit eder.
    """
    return name != 'prod.js' and name not in existing and stem(name) not in SAYFALAR


existing = get_existing(NAMESPACE_ID)

# (1) Statik asset'leri yükle
static_upload = list(filter(is_static_upload, os.listdir('build')))
if static_upload:
    print("🌀 Statik asset'ler yükleniyor")
    batch_upload(static_upload)
else:
    print("✅ Statik asset'ler aynı, bu adım atlanıyor")

# (2) Sayfaları yükle
page_upload = [page + ext for page in SAYFALAR for ext in EXT]
print("🌀 Sayfalar yükleniyor")
batch_upload(page_upload)

# (3) Cache purge et
print("🌀 Cache purge ediliyor")
purge_cache()
