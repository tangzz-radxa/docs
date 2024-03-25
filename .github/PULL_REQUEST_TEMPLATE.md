###### Description of changes

<!--
Please briefly describe changes made in this PR.
-->

###### Review guide

<!--
The below instructions are for the reviewer only.
Do not delete them!
-->

To review this PR locally, please run the following commands:

```bash
PR= # the current PR number
git fetch origin pull/${PR}/head
git switch --detach FETCH_HEAD
yarn start
yarn start --locale en
# If you want to start 2 locales side-by-side, use the following command on Linux:
# https://github.com/facebook/docusaurus/issues/7377#issuecomment-1167192715
yarn start & DOCUSAURUS_GENERATED_FILES_DIR_NAME=.docusaurus/en yarn start --locale en --port 3001
kill %1
```
