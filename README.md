<h1><img src="components/icon.svg" align="top" height="44"> KimlikDAO dApp</a></h1>

## 👋 Introduction

<img align="right" width="280" height="280" src="https://kimlikdao.org/KPASS.svg" style="border-radius:10px;box-shadow:0px 2px 10px rgb(0 0 0 / 15%);">

Using the KimlikDAO dApp, you can mint your KPass by interacting with the
KimlikDAO network and inscribe it on one of the blockchains we support
(such as Ethereum, Arbitrum, Mina, etc).

The KimlikDAO dApp is truly decentralized: you can run it locally, deploy it
on your own server, or use the reference deployment at [kimlikdao.org](https://kimlikdao.org).

The dApp will connect to the KimlikDAO network nodes and the node discovery will be initiated
through the seed nodes at `node.kimlikdao.org`, `kdao-node.yenibank.org`, `kdao-node.blinkbridge.xyz`.
To modify the seed nodes, edit the list in `lib/node/network.js`.

For blockchain nodes, the dApp has no hardcoded rpc urls and will rely on your wallet's provider.

## 🧑‍💻 Developer Guide

The KimlikDAO dApp is built with our in-house framework, [kastro](https://github.com/KimlikDAO/kimlikdao-js/tree/ana/kastro). Kastro provides a familiar react-like experience yet allows us to build
highly optimized and lightweight frontends by pushing as much work as possible to the compile time.

To run the dApp, follow these steps:

- `git clone --recursive https://github.com/KimlikDAO/dapp`

- `bun i` install the required npm packages

- `bun dev` run the dev server
  - http://localhost:8787/

The dApp can also be run in `compiled` and `canary` modes.
To run the dApp in these modes, we need other tools installed:

```shell
# brew dependencies
brew install pngcrush brotli zopfli woff2 webp librsvg
# pip dependencies
pip install fonttools
```

With these dependencies installed, we can run the dApp in `compiled` and `canary` modes:

- `bun compiled` compile the required pages and assets
- `bun canary` serve the `bundle` prepared for deployment
