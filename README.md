# docker-adr-tools

This docker image combines [adr-tools](https://github.com/npryce/adr-tools) and 
[adr-log](https://github.com/adr/adr-log) to make it easier to manage ADRs in 
GitHub Markdown pages.

## Usage

To start using ADRs, run `init`

```bash
docker run --rm -it -v "$(pwd)":/docs extenda/adr-tools init
```

To add an entry, run `new`

```bash
docker run --rm -it -v "$(pwd)":/docs extenda/adr-tools new Implement with Docker
```

For all options, run `help`.

## License

This image is released under the GPL license.