# Radxa Documentation

## Fork

Fork https://github.com/radxa-docs/docs to your own github account.

## Clone

```bash
git clone https://github.com/radxa-docs/docs-template.git
cd docs-template
git submodule set-url contents git@github.com:your_username/docs.git
git submodule update --init --recursive
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
