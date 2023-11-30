#!/usr/bin/env python

import base64
import json
import os
import os.path
import subprocess
import sys

import requests
import toml

DIL = {"en", "tr"}

EXT = ["", ".br", ".gz"]

CF_CONFIG = toml.load(sys.argv[-2])
ROUTE = f"https://{CF_CONFIG['route']['pattern']}/"
ACCOUNT_ID = CF_CONFIG["account_id"]
ZONE_ID = CF_CONFIG["zone_id"]
NAMESPACE_ID = CF_CONFIG["kv_namespaces"][0]["id"]
CREDENTIALS = toml.load(".gizli")
CF_UPLOADER_TOKEN = CREDENTIALS["CF_UPLOADER_TOKEN"]
CF_TRIMMER_TOKEN = CREDENTIALS["CF_TRIMMER_TOKEN"]


URL = "https://api.cloudflare.com/client/v4"
ACCOUNTS_URL = f"{URL}/accounts/{ACCOUNT_ID}/storage/kv/namespaces/{NAMESPACE_ID}/"
ZONES_URL = f"{URL}/zones/{ZONE_ID}/"


def read_variable(prefix) -> list[str]:
    for line in open(sys.argv[-1]):
        if line.startswith(prefix):
            return line[len(prefix):].split()
    print(f"{prefix} bulunamadı")
    return []


SAYFALAR = read_variable("PAGES :=")

NAMED_ASSETS = read_variable("NAMED_ASSETS :=")


def get_existing(namespace_id: str) -> set[str]:
    res = requests.get(
        ACCOUNTS_URL + "keys", headers={"authorization": "Bearer " + CF_UPLOADER_TOKEN}
    )
    return {x["name"] for x in res.json()["result"]}


existing = get_existing(NAMESPACE_ID)
keep = (
    [f"{sayfa}-{dil}.html{ext}" for sayfa in SAYFALAR for ext in EXT for dil in DIL]
    + [named + ext for named in NAMED_ASSETS for ext in EXT]
    + list(next(os.walk("build"))[2])
)
keep = set(keep)
remove = [name for name in existing if name not in keep]

print("🤗 Keep")
print(keep)

print("🙅🏾 Remove")
print(json.dumps(remove))

res = requests.delete(
    ACCOUNTS_URL + "bulk",
    data=json.dumps(remove),
    headers={
        "content-type": "application/json",
        "authorization": "Bearer " + CF_TRIMMER_TOKEN,
    },
)

print(res.text)
