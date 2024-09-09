FROM node:20-alpine

# adr-tools needs bash
RUN apk --no-cache add bash

WORKDIR /usr/local/bin

ADD https://github.com/npryce/adr-tools/archive/3.0.0.tar.gz adr-tools.tar.gz
RUN tar -xzf adr-tools.tar.gz adr-tools-3.0.0/src \
  && rm adr-tools.tar.gz

COPY entrypoint.sh .
COPY generate-toc.js .

ENV PATH="/usr/local/bin/adr-tools-3.0.0/src:${PATH}"

WORKDIR /docs

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]