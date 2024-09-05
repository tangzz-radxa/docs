import React, { useState, useRef } from "react";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import SearchBar from "@theme/SearchBar";
import { Dropdown } from 'antd';
import siteConfig from "@generated/docusaurus.config";
import Translate from "@docusaurus/Translate";
import useBaseUrl from '@docusaurus/useBaseUrl';
import useIsBrowser from '@docusaurus/useIsBrowser';
import MobileNavBar from "./MobileNavBar";

export default () => {
  const isBrowser = useIsBrowser();
  const navbarConfig = siteConfig.themeConfig.navbar;
  const currentLanguage = useBaseUrl('/');
  const { pathname } = useLocation();
  const support_box = useRef(null);
  const [sFlag, setSflag] = useState(false);
  const language_box = useRef(null);

  const index_li_style = {
    color: "#6aad1a",
  };

  const svgEle = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.91028 5.835C3.05081 5.69437 3.23868 5.61112 3.43725 5.60146C3.63583 5.59179 3.83088 5.65642 3.98441 5.78273L4.04148 5.83446L7.99774 9.79073L11.9273 5.80833C12.0671 5.66678 12.2545 5.58235 12.4531 5.5715C12.6517 5.56066 12.8472 5.62417 13.0015 5.74966L13.0591 5.80086C13.2006 5.94058 13.2851 6.12801 13.2959 6.3266C13.3067 6.52519 13.2432 6.7207 13.1177 6.875L13.0665 6.93206L8.57054 11.4878C8.42982 11.6304 8.24073 11.7149 8.04066 11.7248C7.84059 11.7347 7.64409 11.6691 7.49001 11.5411L7.43561 11.4915L2.91028 6.9662C2.83594 6.8919 2.77696 6.80369 2.73673 6.70659C2.69649 6.6095 2.67578 6.50543 2.67578 6.40033C2.67578 6.29523 2.69649 6.19116 2.73673 6.09406C2.77696 5.99697 2.83594 5.90876 2.91028 5.83446V5.835Z"
        fill="#000"
      />
    </svg>
  );

  const svgEle2 = (
    <svg viewBox="0 0 24 24" width='20' height='20' aria-hidden="true" className="iconLanguage_nlXk">
      <path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z">
      </path>
    </svg>
  )

  const items = [
    {
      key: '1',
      label: 'ROCK',
      children: [
        {
          key: '1-1',
          label: <Link to='/rock2'>ROCK 2</Link>,
        },
        {
          key: '1-2',
          label: <Link to='/rock3'>ROCK 3</Link>,
        },
        {
          key: '1-3',
          label: <Link to='/rock4'>ROCK 4</Link>,
        },
        {
          key: '1-4',
          label: <Link to='/rock5'>ROCK 5</Link>,
        },
      ],
    },
    {
      key: '2',
      label: 'ZERO',
      children: [
        {
          key: '2-1',
          label: <Link to='/zero/zero'>Zero</Link>,
        },
        {
          key: '2-2',
          label: <Link to='/zero/zero2pro'>Zero 2 Pro</Link>,
        },
        {
          key: '2-3',
          label: <Link to='/zero/zero3'>Zero 3</Link>,
        },
      ],
    },
    {
      key: '3',
      label: 'X',
      children: [
        {
          key: '3-1',
          label: <Link to='/x/x2l'>X2L</Link>,
        },
        {
          key: '3-2',
          label: <Link to='/x/x4'>X4</Link>,
        },
      ],
    },
    {
      key: '4',
      label: 'SoM',
      children: [
        {
          key: '4-1',
          label: <Link to='/compute-module/cm3'>CM3</Link>,
        },
        {
          key: '4-2',
          label: <Link to='/compute-module/cm5'>CM5</Link>,
        },
      ],
    },
    {
      key: '5',
      label: 'NIO',
      children: [
        {
          key: '5-1',
          label: <Link to='/nio/12l'>NIO 12L</Link>,
        },
      ],
    },
    {
      key: '6',
      label: 'Network Computer',
      children: [
        {
          key: '6-1',
          label: <Link to='/e/e20c'>E20C</Link>,
        },
      ],
    },
    {
      key: '7',
      label: 'Gen AI',
      children: [
        {
          key: '7-1',
          label: <Link to='/sophon/aicore-sg2300x'>AICore SG2300x</Link>,
        },
        {
          key: '7-2',
          label: <Link to='/sophon/airbox'>Airbox</Link>,
        },
      ],
    },
  ];

  return (
    <>
      <nav className={styles.scroll_show}>
        <div className={styles.contentBox}>
          <Link href={navbarConfig.logo.href}>
            <img src={navbarConfig.logo.src} />
          </Link>
          <div className={styles.navbar_items}>
            <ul>
              <li style={{ paddingLeft: '0' }}>
                <Link href="/welcome"><Translate id="home.page.welcome" /></Link>
              </li>
              <li>
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
              </li>
            </ul>
            <ul>
              <li style={pathname == "/" ? index_li_style : null}>
                <Link href="https://radxa.com/"><Translate id="home.page.home" /></Link>
              </li>
              <li>
                <Link href="https://radxa.com/products">
                  <Translate id="home.page.product" />
                </Link>
              </li>
              <li>
                <Link href="https://radxa.com/news"><Translate id="home.page.news" /></Link>
              </li>
              <li>
                <Link href="https://radxa.com/services"><Translate id="home.page.services" /></Link>
              </li>
              <li
                onMouseEnter={() => {
                  support_box.current.style.display = "block";
                  setSflag(true);
                }}
                onMouseLeave={() => {
                  support_box.current.style.display = "none";
                  setSflag(false);
                }}
                style={sFlag ? index_li_style : null}
              >
                <Link><Translate id="home.page.support" /> {svgEle}</Link>
                <div
                  ref={support_box}
                  className={styles.down_menu}
                  onMouseEnter={() => {
                    support_box.current.style.display = "block";
                  }}
                  onMouseLeave={() => {
                    setSflag(false);
                  }}
                >
                  <Link to="https://radxa.com/community">Community</Link>
                  <Link to="https://forum.radxa.com/">Forum</Link>
                  <Link to="https://wiki.radxa.com/">Wiki</Link>
                  <Link to="https://github.com/radxa">Github</Link>
                </div>
              </li>
              <li
                onMouseEnter={() => {
                  language_box.current.style.display = "block";
                }}
                onMouseLeave={() => {
                  language_box.current.style.display = "none";
                }}
                style={sFlag ? index_li_style : null}
              >
                <Link>{svgEle2} {currentLanguage === '/' ? '中文' : 'English'} {svgEle}</Link>
                <div
                  ref={language_box}
                  className={styles.down_menu}
                  onMouseEnter={() => {
                    language_box.current.style.display = "block";
                  }}
                >
                  <Link href={"pathname:////" + (isBrowser ? window.location.host : null)} target="_self" rel="noopener noreferrer" lang="zh-CN">中文</Link>
                  <Link href="pathname:///en/" target="_self" rel="noopener noreferrer" lang="en-US">English</Link>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', paddingRight: '0' }}>
                <SearchBar />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <MobileNavBar items={items} lang={currentLanguage} isBrowser={isBrowser} />
    </>
  );
};
