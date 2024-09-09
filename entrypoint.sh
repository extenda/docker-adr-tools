#!/bin/sh

set -e

if [ -f .adr-dir ]; then
  dos2unix .adr-dir
fi

adr "$@"

if [ -f .adr-dir ]; then
  node /usr/local/bin/generate-toc.js
fi
