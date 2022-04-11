#!/usr/bin/env bash

Compression="none gz br"
Pages="al ana"

declare -A CompressionToExtension

CompressionToExtension["none"]=""
CompressionToExtension["gz"]=".gz"
CompressionToExtension["br"]=".br"

for page in $Pages; do
  for comp in $Compression; do
    key="${page}${CompressionToExtension[$comp]}"
    wrangler kv:key put --namespace-id f5dd6a87ada14a288622f94019dac027 ${key} \
                    "build/${key}" --path

  done
done

set -o allexport
source .env
set +o allexport

curl https://api.cloudflare.com/client/v4/zones/cb31764917040dd0b9a7b79e1ec099df/purge_cache \
      -H "Authorization: Bearer ${CF_CACHE_PURGE_TOKEN}" \
      -H "Content-Type: application/json" \
      -d '{"files":["https://fujitestnet.kimlikdao.org/al", "https://fujitestnet.kimlikdao.org/"]}'
