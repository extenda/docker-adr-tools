#!/bin/sh
set -e

adr "$@"

if [ -f README.md ]; then
  adr-log -i README.md
fi