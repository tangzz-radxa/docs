import React from "react";
import clsx from "clsx";
import { useWindowSize, useColorMode } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import DocItemPaginator from "@theme/DocItem/Paginator";
import DocVersionBanner from "@theme/DocVersionBanner";
import DocVersionBadge from "@theme/DocVersionBadge";
import DocItemFooter from "@theme/DocItem/Footer";
import DocItemTOCMobile from "@theme/DocItem/TOC/Mobile";
import DocItemTOCDesktop from "@theme/DocItem/TOC/Desktop";
import DocItemContent from "@theme/DocItem/Content";
import DocBreadcrumbs from "@theme/DocBreadcrumbs";
import ContentVisibility from "@theme/ContentVisibility";
import styles from "./styles.module.css";
import Giscus from "@giscus/react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;
  const mobile = canRender ? <DocItemTOCMobile /> : undefined;
  const desktop =
    canRender && (windowSize === "desktop" || windowSize === "ssr") ? (
      <DocItemTOCDesktop />
    ) : undefined;
  return {
    hidden,
    mobile,
    desktop,
  };
}
export default function DocItemLayout({ children }) {
  const { i18n } = useDocusaurusContext();
  const { colorMode } = useColorMode();
  const docTOC = useDocTOC();
  const { metadata } = useDoc();
  return (
    <div className="row">
      <div className={clsx("col", !docTOC.hidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
        <div
          style={{
            marginTop: "2rem",
            paddingTop: "2rem",
            borderTop: "1px solid #000",
          }}
          className="giscus-container"
        >
          <Giscus
            id="comments-giscus"
            repo="radxa-docs/docs"
            repoId="R_kgDOLlFk6A"
            category="General"
            categoryId="DIC_kwDOLlFk6M4CuX5H"
            mapping="title"
            theme={colorMode === "dark" ? "dark_dimmed" : "light"}
            lang={i18n.currentLocale === "zh" ? "zh-CN" : "en"}
            loading="lazy"
          />
          <p
            style={{ fontSize: ".8rem", color: "#74bc1f", textAlign: "center" }}
          >
            {i18n.currentLocale === "zh"
              ? "您需要登录 GitHub 才能发表评论。如果您已登录，请忽略此消息。"
              : "You need to be logged into GitHub to post a comment. If you are already logged in, please ignore this message."}
          </p>
        </div>
        <p style={{ textAlign: "center", marginTop: "2rem", marginBottom: "0" }}>
          <a href="https://docs.radxa.com">Radxa-docs</a> © 2026 by <Link to="/license"> Radxa Computer (Shenzhen) Co.,Ltd.</Link> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/"> CC BY 4.0</a>
        </p>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}
