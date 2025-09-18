import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
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
            )}&body=${encodeURIComponent(
              `URL: [https://docs.radxa.com${pathname}](https://docs.radxa.com${pathname})\n\n` +
              `Time: ${new Date().toLocaleString()}`
            )}`}
          >
            {/* bug icon */}
            <svg t="1727244518678" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6366" xlink="http://www.w3.org/1999/xlink" width="20" height="20"><path d="M940 512H792V412c76.8 0 139-62.2 139-139 0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 34.8-28.2 63-63 63H232c-34.8 0-63-28.2-63-63 0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 76.8 62.2 139 139 139v100H84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h148v96c0 6.5 0.2 13 0.7 19.3C164.1 728.6 116 796.7 116 876c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-44.2 23.9-82.9 59.6-103.7 6 17.2 13.6 33.6 22.7 49 24.3 41.5 59 76.2 100.5 100.5 28.9 16.9 61 28.8 95.3 34.5 4.4 0 8-3.6 8-8V484c0-4.4 3.6-8 8-8h60c4.4 0 8 3.6 8 8v464.2c0 4.4 3.6 8 8 8 34.3-5.7 66.4-17.6 95.3-34.5 41.5-24.3 76.2-59 100.5-100.5 9.1-15.5 16.7-31.9 22.7-49C812.1 793.1 836 831.8 836 876c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-79.3-48.1-147.4-116.7-176.7 0.4-6.4 0.7-12.8 0.7-19.3v-96h148c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" p-id="6367" fill="#2e8555"></path><path d="M304 280h416c4.4 0 8-3.6 8-8 0-40-8.8-76.7-25.9-108.1-17.2-31.5-42.5-56.8-74-74C596.7 72.8 560 64 520 64h-16c-40 0-76.7 8.8-108.1 25.9-31.5 17.2-56.8 42.5-74 74C304.8 195.3 296 232 296 272c0 4.4 3.6 8 8 8z" p-id="6368" fill="#2e8555"></path></svg>
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
