# Radxa Documentation

## Clone

```bash
git clone --recurse-submodules https://github.com/radxa-docs/docs-template.git
```

## Build

```bash
yarn install
yarn build
```

## Serve locally

```bash
yarn start
yarn start --locale en
# If you want to start 2 locales side-by-side, use the following command on Linux:
# https://github.com/facebook/docusaurus/issues/7377#issuecomment-1167192715
yarn start & DOCUSAURUS_GENERATED_FILES_DIR_NAME=.docusaurus/en yarn start --locale en --port 3001
kill %1
```

## Set up pre-commit

```bash
pip3 install pre-commit
pre-commit install
pre-commit run --all-files
```

## Upgrade dependencies to the latest release

```bash
yarn upgrade
```
