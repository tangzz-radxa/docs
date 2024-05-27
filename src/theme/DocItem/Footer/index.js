import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/theme-common/internal";
import TagsListInline from "@theme/TagsListInline";
import EditMetaRow from "@theme/EditMetaRow";
import styles from "./index.module.css";
import Translate from "@docusaurus/Translate";
const contributorsData = require("@site/static/page/contributors.json");
export default function DocItemFooter() {
  const { metadata } = useDoc();
  const { id } = metadata;
  let { pathname } = useLocation();
  pathname = pathname.replace("/en", "");
  const filename = "docs" + pathname + ".md";
  const filename_readme = "docs" + pathname + "/README.md";
  const contributorsIndex =
    contributorsData[filename] || contributorsData[filename_readme];
  const { editUrl, lastUpdatedAt, lastUpdatedBy, tags } = metadata;
  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;
  if (!canDisplayFooter) {
    return null;
  }
  return (
    <>
      <footer
        className={clsx(ThemeClassNames.docs.docFooter, "docusaurus-mt-lg")}
      >
        <div className={clsx(styles.issues_center)}>
          <Link
            to={`https://github.com/radxa-docs/docs/issues/new?title=Issue%20from%20${encodeURIComponent(
              id,
            )}`}
          >
            <span className={styles.issues_icon}>🐞</span>
            <Translate id="docs.issue" />
          </Link>
        </div>
        {canDisplayTagsRow && (
          <div
            className={clsx(
              "row margin-top--sm",
              ThemeClassNames.docs.docFooterTagsRow,
            )}
          >
            <div className="col">
              <TagsListInline tags={tags} />
            </div>
          </div>
        )}
        {canDisplayEditMetaRow && (
          <EditMetaRow
            className={clsx(
              "margin-top--sm",
              ThemeClassNames.docs.docFooterEditMetaRow,
            )}
            editUrl={editUrl}
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </footer>
      {contributorsIndex && (
        <h3
          className={clsx(ThemeClassNames.docs.docFooter, "docusaurus-mt-lg")}
        >
          <Translate id="docs.contributors" />
        </h3>
      )}
      <ul className={styles.dedicateUl}>
        {contributorsIndex &&
          contributorsIndex.map((item, key) => {
            if (item.name !== "web-flow") {
              return (
                <li key={key}>
                  <a href={item.html_url} target="_black">
                    <img
                      src={item.avatar_url}
                      alt={item.name}
                      title={item.name}
                    />
                  </a>
                </li>
              );
            }
          })}
      </ul>
    </>
  );
}
