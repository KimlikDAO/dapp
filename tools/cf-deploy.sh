#!/usr/bin/env bash

NamespaceId="15a080fd128945ecb0a9b1780f0e708a"
Compression="none gz br"
Pages="al ana"

declare -A CompressionToExtension

CompressionToExtension["none"]=""
CompressionToExtension["gz"]=".gz"
CompressionToExtension["br"]=".br"

for page in $Pages; do
  for comp in $Compression; do
    key="${page}${CompressionToExtension[$comp]}"
    wrangler kv:key put --namespace-id ${NamespaceId} ${key} \
             "build/${key}" --path
  done
done

# Read the CF_CACHE_PURGE_TOKEN
source .env

curl "https://api.cloudflare.com/client/v4/zones/${NamespaceId}/purge_cache" \
      -H "Authorization: Bearer ${CF_CACHE_PURGE_TOKEN}" \
      -H "Content-Type: application/json" \
      -d '{"files":["https://fujitestnet.kimlikdao.org/al*", "https://fujitestnet.kimlikdao.org/ana*"]}'
