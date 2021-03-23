#!/bin/sh
set -e

if [ -f .adr-dir ]; then
  dos2unix .adr-dir
fi

adr "$@"

if [ -f README.md ] && [ -f .adr-dir ]; then
  adr-log -i README.md -d "$(cat .adr-dir)"
fi