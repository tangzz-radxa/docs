import { useState, useEffect, useLayoutEffect, useRef } from "react";
import styles from "./index.module.css";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";
import SearchBar from "@theme/SearchBar";
import useIsBrowser from "@docusaurus/useIsBrowser";
import clsx from "clsx";
import CenteredTabs from "../components/CenteredTabs";
import home_data from "./home-data.json";
import category_data from "./category.json";
import official_selection from "./official-selection.json";
import axios from "axios";

export default () => {
  const { i18n } = useDocusaurusContext();
  const isBrowser = useIsBrowser();
  const currentLocale = i18n.currentLocale === "zh";
  const [indexCategory, setIndexCategory] = useState(Object.keys(home_data)[0])
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
  const [hotTopics, setHotTopics] = useState([]);
  const [hotUpdates, setHotUpdates] = useState([]);

  useEffect(() => {
    const specialPathRegex = /\/common|\/_/;
    axios.get("https://docs.radxa.com/json/baidu_tongji_data.json").then((res) => {
      const data = res.data.data.items[0];
      const filteredData = data.filter(subArray =>
        !subArray.some(item =>
          item.name.includes('welcome') ||
          item.name === "https://docs.radxa.com" ||
          item.name === "https://docs.radxa.com/en"
        )
      );
      setHotTopics(filteredData);
    }).catch((err) => {
    })
    axios.get("https://docs.radxa.com/json/commit_update_data.json").then((res) => {
      const filteredData = res.data.items.filter(item => {
        return item.title.indexOf("Merge") !== 0 && !specialPathRegex.test(item.page_url)
      });
      setHotUpdates(filteredData);
    }).catch((err) => {
    })
  }, []);

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

  useLayoutEffect(() => {
    if (home_data[indexCategory].length === renderCount) {
      setRendered(true);
    }
  }, [renderCount, home_data[indexCategory].length]);

  useLayoutEffect(() => {
    setRenderCount(itemsRef.current.length);
  }, [home_data[indexCategory].length]);

  useLayoutEffect(() => {
    setSeriesKey(0)
  }, [indexCategory])

  const leftItems = home_data[indexCategory].map((item, index) => {
    return (
      <li
        key={index}
        ref={(el) => {
          itemsRef.current[index] = el;
          if (index === home_data[indexCategory].length - 1) {
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
      <section className={styles["doc-header-container"]}>
        <div className={styles["doc-header"]} id="doc-contact">
          <h1><Translate id="radxa.docs" /></h1>
          <div>
            <SearchBar />
            <img src="/home/doc-search.svg" />
          </div>
        </div>
      </section>
      <section className={styles["doc-series-container"]}
        style={{ display: `${rendered ? "block" : "none"}` }}
      >
        <div>
          <div className={styles["pr-list"]}>
            <div className={styles["pr-category"]}>
              <CenteredTabs datalist={Object.keys(home_data)} indexCategory={indexCategory} setIndexCategory={setIndexCategory} categoryData={category_data} currentLocale={currentLocale} />
            </div>
            <div className={styles["pr-series"]}>
              <ul className={styles.product_lines}>
                {home_data[indexCategory].length > 0 && leftItems}
              </ul>
              <div className={styles.line_info} ref={infoRef}
              >
                <p>
                  {currentLocale
                    ? home_data[indexCategory][seriesKey]?.series_zh
                    : home_data[indexCategory][seriesKey]?.series_en}
                </p>
                <p style={{ color: "#000" }}>
                  {currentLocale
                    ? home_data[indexCategory][seriesKey]?.series_introduction_zh
                    : home_data[indexCategory][seriesKey]?.series_introduction_en}
                </p>
                <div className={styles.photos} id="photo">
                  {
                    home_data[indexCategory][seriesKey]?.products.length > 0
                    && home_data[indexCategory][seriesKey]?.products.map((item, index) => {
                      return (
                        <Link
                          to={item?.products_link}
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
                              <span>{item?.products_name}</span>
                            </>
                          )}
                          <img
                            style={{ display: `${loading ? "none" : "block"}` }}
                            src={item?.products_photo_url}
                            alt={item?.products_name}
                            onLoad={() => {
                              setLoading(false);
                            }}
                          />
                        </Link>
                      );
                    })
                  }
                </div>
                <div className={styles.doc_links}>
                  {
                    home_data[indexCategory].length > 0 &&
                    home_data[indexCategory][seriesKey]?.products[productKey]?.docs.map(
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
                  }
                </div>
              </div>
            </div>
          </div>
          <div className={styles["right-list"]}>
            <div style={{ display: `${hotTopics.length > 0 ? "block" : "none"}` }}>
              <p>{currentLocale ? "热门话题" : "Hot Topic"}</p>
              <ol className={styles["hot-topic"]}>
                {
                  hotTopics.length > 0 && hotTopics.map((item, index) => {
                    const current = item[0];
                    if (index < 5)
                      return (
                        <li key={index}>
                          {
                            current.breadcrumbs.length > 0 && current.breadcrumbs.map((_item, _index) => {
                              if (_index > 0)
                                return (
                                  <>
                                    <Link to={_index === current.breadcrumbs.length - 1 ? current.name.replace("/en", "").replace("https://docs.radxa.com/", "") : _item.url.replace("/en", "")} key={_index}>
                                      {_item.title}
                                    </Link>
                                    {
                                      _index !== current.breadcrumbs.length - 1 && svgEle
                                    }
                                  </>
                                )
                            })
                          }
                        </li>
                      )
                  })
                }
              </ol>
            </div>
            <div style={{ display: `${hotUpdates.length > 0 ? "block" : "none"}` }}>
              <p>{currentLocale ? "更新" : "Update"}</p>
              <ol>
                {
                  hotUpdates.length > 0 && hotUpdates.map((item, index) => {
                    if (index < 5)
                      return (
                        <li key={index} style={{ lineHeight: "120%" }}>
                          <Link to={item.page_url.replace("/en", "")} >
                            {item.title}
                          </Link>
                        </li>
                      )
                  })
                }
              </ol>
            </div>
            <div>
              <p>{currentLocale ? "官方精选" : "Official Selection"}</p>
              <ol>
                {
                  official_selection.length > 0 && official_selection.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link to={item.link_url} >
                          {currentLocale ? item.title_zh : item.title_en}
                        </Link>
                      </li>
                    )
                  })
                }
              </ol>
            </div>
          </div>
        </div>
      </section>
      <div
        className={styles.load_box}
        style={{ display: `${!rendered ? "flex" : "none"}` }}
      >
        <p className={clsx(styles.loading_spinner, styles.loading_max)}></p>
      </div>
    </Layout>
  );
};
