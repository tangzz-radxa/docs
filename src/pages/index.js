import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { getDocs } from "../utils/getDocs";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";
import SearchBar from "@theme/SearchBar";
import useIsBrowser from "@docusaurus/useIsBrowser";
import clsx from "clsx";

export default () => {
  const { i18n } = useDocusaurusContext();
  const isBrowser = useIsBrowser();
  const currentLocale = i18n.currentLocale === "zh";
  const homeDocData = getDocs().Home.sidebar_custom_props.product_docs || [];
  const [seriesKey, setSeriesKey] = useState(
    isBrowser ? localStorage.getItem("radxa_doc_current") : 0 || 0,
  );
  const [productKey, setProductKey] = useState(
    isBrowser ? localStorage.getItem("radxa_product_current") : 0 || 0,
  );
  const [loading, setLoading] = useState(false);
  const itemsRef = useRef([]);
  const [renderCount, setRenderCount] = useState(0);
  const [rendered, setRendered] = useState(false);
  const infoRef = useRef(null);
  const svgEle = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M13.5039 27L22.5039 18L13.5039 9"
        stroke="#333333"
        strokeWidth="2.88018"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  useEffect(() => {
    if (localStorage.getItem("radxa_doc_current")) return;
    localStorage.getItem("radxa_doc_current")
      ? null
      : localStorage.setItem("radxa_doc_current", 0);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("radxa_product_current")) return;
    localStorage.getItem("radxa_product_current")
      ? null
      : localStorage.setItem("radxa_product_current", 0);
  }, []);

  useEffect(() => {
    if (homeDocData.length === renderCount) {
      setRendered(true);
    }
  }, [renderCount, homeDocData]);

  useEffect(() => {
    setRenderCount(itemsRef.current.length);
  }, [homeDocData]);

  const leftItems = homeDocData.map((item, index) => {
    return (
      <li
        key={index}
        ref={(el) => {
          itemsRef.current[index] = el;
          if (index === homeDocData.length - 1) {
            setRenderCount(itemsRef.current.length);
          }
        }}
        className={seriesKey == index ? styles.current_series : null}
        onClick={() => {
          window.scroll({
            top: infoRef.current.offsetTop - 50,
            left: 0,
            behavior: "smooth",
          });
          setSeriesKey(index);
          if (index !== seriesKey) {
            setProductKey(0);
            setLoading(true);
          }
          localStorage.setItem("radxa_doc_current", index);
        }}
      >
        {currentLocale ? item.series_zh : item.series_en}
      </li>
    );
  });

  const icons = {
    Overview: "/home/overview.svg",
    Download: "/home/download.svg",
    Accessories: "/home/accessories.svg",
    GettingStart: "/home/gettingstart.svg",
    Certification: "/home/certification.svg",
    SystemConfigurations: "/home/radxaos.svg",
    FAQ: "/home/faq.svg",
    Android: "/home/android.svg",
  };

  return (
    <Layout>
      <div className={styles.docs_home_main}>
        <div className={styles.docs_entry}>
          <h1>
            <Translate id="radxa.docs" />
          </h1>
          <p>
            <Translate id="radxa.docs.info1" />
          </p>
          <div className={styles.search_box}>
            <SearchBar />
          </div>
          <div className={styles.hot_topic}>
            <p>
              <Translate id="radxa.docs.hot" />
            </p>
            <div>
              <Link to="/rock3">ROCK 3 Family</Link>
              <Link to="/rock5">ROCK 5 Family</Link>
              <Link to="/zero">ZERO Family</Link>
              <Link to="/nio">NIO Family</Link>
            </div>
          </div>
        </div>
        <div
          className={styles.products_center}
          style={{ display: `${rendered ? "flex" : "none"}` }}
        >
          <ul className={styles.product_lines}>
            {homeDocData.length > 0 ? leftItems : null}
          </ul>
          <div className={styles.line_info} ref={infoRef}>
            <p>
              {currentLocale
                ? homeDocData[seriesKey].series_zh
                : homeDocData[seriesKey].series_en}
            </p>
            <p style={{ color: "#000" }}>
              {currentLocale
                ? homeDocData[seriesKey].series_introduction_zh
                : homeDocData[seriesKey].series_introduction_en}
            </p>
            <div className={styles.photos} id="photo">
              {homeDocData[seriesKey].products.length > 0
                ? homeDocData[seriesKey].products.map((item, index) => {
                  return (
                    <Link
                      to={item.products_link}
                      key={index}
                      className={
                        productKey == index ? styles.current_photo : null
                      }
                      onMouseMove={() => {
                        setProductKey(index);
                        localStorage.setItem("radxa_product_current", index);
                      }}
                    >
                      {loading ? (
                        <div className={styles.loading_box}>
                          <p className={styles.loading_spinner}></p>
                        </div>
                      ) : (
                        <>
                          <span>{item.products_name}</span>
                        </>
                      )}
                      <img
                        style={{ display: `${loading ? "none" : "block"}` }}
                        src={item.products_photo_url}
                        alt={item.products_name}
                        onLoad={() => {
                          setLoading(false);
                        }}
                      />
                    </Link>
                  );
                })
                : null}
            </div>
            <div className={styles.doc_links}>
              {homeDocData[seriesKey].products[productKey].docs.length > 0 &&
                homeDocData[seriesKey].products[productKey].docs
                ? homeDocData[seriesKey].products[productKey].docs.map(
                  (item, index) => {
                    return (
                      <Link to={item.docs_link} key={index}>
                        <img src={icons[item.docs_photo_type]} />
                        <p className={styles.link_title}>
                          <span>
                            {currentLocale
                              ? item.docs_name_zh
                              : item.docs_name_en}{" "}
                            {svgEle}
                          </span>
                          <span>
                            {currentLocale
                              ? item.docs_info_zh
                              : item.docs_info_en}
                          </span>
                        </p>
                      </Link>
                    );
                  },
                )
                : null}
            </div>
          </div>
        </div>
        <div
          className={styles.load_box}
          style={{ display: `${!rendered ? "flex" : "none"}` }}
        >
          <p className={clsx(styles.loading_spinner, styles.loading_max)}></p>
        </div>
      </div>
    </Layout>
  );
};
