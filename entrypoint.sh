#!/bin/sh
set -e

if [ -f .adr-dir ]; then
  dos2unix .adr-dir
fi

adr "$@"

if [ -f .adr-dir ]; then
  targetFile="$(grep -m 1 -l ./*.md -e '<\!-- adrlog')"
  if [ -n "$targetFile" ]; then
    adr-log -i "$targetFile" -d "$(cat .adr-dir)"
  fi
fi
