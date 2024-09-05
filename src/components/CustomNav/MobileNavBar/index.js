import React, { useRef, useEffect } from "react";
import styles from "./index.module.css";
import styles_s from "../index.module.css";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import siteConfig from "@generated/docusaurus.config";
import { Dropdown } from 'antd';
import SearchBar from "@theme/SearchBar";
import { useLocation } from "@docusaurus/router";

export default ({ items, lang, isBrowser }) => {
  const { pathname } = useLocation();
  const navbarConfig = siteConfig.themeConfig.navbar;
  const meun_ref = useRef(null);
  const bg_ref = useRef(null);

  useEffect(() => {
    if (meun_ref.current && bg_ref.current) {
      meun_ref.current.style.width = "0rem";
      meun_ref.current.style.left = "-100rem";
      bg_ref.current.style.width = "0";
      bg_ref.current.style.backgroundColor = "transparent";
    }
  }, [pathname])

  const svgEle = (
    <svg
      width="25"
      height="25"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.91028 5.835C3.05081 5.69437 3.23868 5.61112 3.43725 5.60146C3.63583 5.59179 3.83088 5.65642 3.98441 5.78273L4.04148 5.83446L7.99774 9.79073L11.9273 5.80833C12.0671 5.66678 12.2545 5.58235 12.4531 5.5715C12.6517 5.56066 12.8472 5.62417 13.0015 5.74966L13.0591 5.80086C13.2006 5.94058 13.2851 6.12801 13.2959 6.3266C13.3067 6.52519 13.2432 6.7207 13.1177 6.875L13.0665 6.93206L8.57054 11.4878C8.42982 11.6304 8.24073 11.7149 8.04066 11.7248C7.84059 11.7347 7.64409 11.6691 7.49001 11.5411L7.43561 11.4915L2.91028 6.9662C2.83594 6.8919 2.77696 6.80369 2.73673 6.70659C2.69649 6.6095 2.67578 6.50543 2.67578 6.40033C2.67578 6.29523 2.69649 6.19116 2.73673 6.09406C2.77696 5.99697 2.83594 5.90876 2.91028 5.83446V5.835Z"
        fill="#2e8555"
      />
    </svg>
  );

  const svgEle2 = (
    <svg viewBox="0 0 24 24" width='20' height='20' aria-hidden="true" className="iconLanguage_nlXk">
      <path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z">
      </path>
    </svg>
  )

  return (
    <>
      <div className={styles_s.mb_navs} style={{ display: "none" }}>
        <div>
          <img
            src="/home/meun.svg"
            onClick={() => {
              // document.documentElement.style.overflow = "hidden";
              meun_ref.current.style.width = "80%";
              meun_ref.current.style.left = "0";
              bg_ref.current.style.width = "100vw";
              bg_ref.current.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            }}
          />
          <Link href={navbarConfig.logo.href}>
            <img src={navbarConfig.logo.src} />
          </Link>
        </div>
        <SearchBar />
      </div>
      <div
        className={styles.bg_nav}
        id="bg_nav"
        ref={bg_ref}
        onClick={(e) => {
          console.log(e.target.id);
          if (e.target.id === "bg_nav") {
            // document.documentElement.style.overflow = "auto";
            meun_ref.current.style.width = "0rem";
            meun_ref.current.style.left = "-100rem";
            bg_ref.current.style.width = "0";
            bg_ref.current.style.backgroundColor = "transparent";
          }
        }}
      >
        <div
          className={styles_s.meun_c}
          ref={meun_ref}
          style={{ display: "none" }}
        >
          <div className={styles_s.mb_navs_menu}
            onClick={() => {
              meun_ref.current.style.width = "0rem";
              meun_ref.current.style.left = "-100rem";
              bg_ref.current.style.width = "0";
              bg_ref.current.style.backgroundColor = "transparent";
            }}
          >
            <Link href={navbarConfig.logo.href}>
              <img src={navbarConfig.logo.src} />
            </Link>
          </div>
          <ul>
            <li>
              <div className={styles_s.item1_nav}>
                <div className={styles_s.item_title}>
                  <Link to="/welcome">
                    <Translate id="home.page.welcome" />
                  </Link>
                </div>
                <div className={styles_s.item_title}>
                  <Dropdown
                    menu={
                      {
                        items,
                      }
                    }
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Translate id="home.page.series" /> {svgEle}
                    </a>
                  </Dropdown>
                </div>
                <div className={styles_s.item_title}>
                  <Link href="https://radxa.com/">
                    <Translate id="home.page.home" />
                  </Link>
                </div>
                <div className={styles_s.item_title}>
                  <Link href="https://radxa.com/products">
                    <Translate id="home.page.product" />
                  </Link>
                </div>
                <div className={styles_s.item_title}>
                  <Link href="https://radxa.com/news">
                    <Translate id="home.page.news" />
                  </Link>
                </div>
                <div className={styles_s.item_title}>
                  <Link href="https://radxa.com/services">
                    <Translate id="home.page.services" />
                  </Link>
                </div>
                <div className={styles_s.item_title}>
                  <Link href="https://radxa.com/support">
                    <Translate id="home.page.support" />
                  </Link>
                </div>
                <div
                  className={clsx(
                    styles_s.items_box,
                  )}
                >
                  <div className={styles_s.item2_nav}>
                    <Link to="https://radxa.com/community">Community</Link>
                    <Link to="https://forum.radxa.com/">Forum</Link>
                    <Link to="https://wiki.radxa.com/">Wiki</Link>
                    <Link to="https://github.com/radxa">Github</Link>
                  </div>
                </div>
                <div className={styles_s.item_title}>
                  <Link >
                    {svgEle2}{lang === '/' ? '中文' : 'English'}
                  </Link>
                </div>
                <div
                  className={clsx(
                    styles_s.items_box,
                  )}
                >
                  <div className={styles_s.item2_nav}>
                    <Link href={"pathname:////" + (isBrowser ? window.location.host : null)} target="_self" rel="noopener noreferrer" lang="zh-CN">中文</Link>
                    <Link href="pathname:///en/" target="_self" rel="noopener noreferrer" lang="en-US">English</Link>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
