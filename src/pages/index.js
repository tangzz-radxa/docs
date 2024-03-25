import React, { useState } from "react";
import Link from "@docusaurus/Link";
import { Select, Space, ConfigProvider } from "antd";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import { getDocs } from "../utils/getDocs";
import {
  getProduct_Line,
  getProduct_Name,
  getProduct_doc,
} from "../utils/getProducts";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";

export default () => {
  const { i18n } = useDocusaurusContext();
  const homeDoc = getDocs().Home.sidebar_custom_props.product_docs;
  const productLine = getProduct_Line(homeDoc, i18n.currentLocale);
  const productName = getProduct_Name(homeDoc, i18n.currentLocale);
  const [products, setProducts] = useState(productName[productLine[0]]);
  const [selectedProduct, setSelectedProduct] = useState(
    productName[productLine[0]][0],
  );
  const element = getProduct_doc(homeDoc, selectedProduct, i18n.currentLocale);

  const onProductLineChange = (value) => {
    setProducts(productName[value]);
    setSelectedProduct(productName[value][0]);
  };

  const onProductChange = (value) => {
    setSelectedProduct(value);
  };

  return (
    <Layout>
      <div style={{ backgroundColor: "rgb(249, 249, 249)" }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#fff",
            },
          }}
        >
          <div className={styles.selectBox}>
            <div className={styles.centerBox}>
              <h1 className={styles.seleH}>
                <Translate id="home.page.HomePageTitle"></Translate>
              </h1>
              <p className={styles.seleP}>
                <Translate id="home.page.HomePageIntroduction"></Translate>
              </p>
              <div className={styles.spaceBox}>
                <Space wrap>
                  <Select
                    placement="bottomRight"
                    bordered="false"
                    defaultValue={productLine[0]}
                    onChange={onProductLineChange}
                    options={productLine.map((productLine) => ({
                      label: productLine,
                      value: productLine,
                    }))}
                  />
                  <Select
                    bordered="false"
                    value={selectedProduct}
                    onChange={onProductChange}
                    options={products.map((product) => ({
                      label: product,
                      value: product,
                    }))}
                  />
                </Space>
              </div>
              <div style={{ float: "right" }}></div>
            </div>
          </div>
          <div className={styles.list}>
            <h1>{selectedProduct}</h1>
            <ul className={styles.card}>
              {element.map((item, idx) => {
                return (
                  <li key={idx} className={styles.doc}>
                    <Link to={item.url}>
                      <div className={styles.goTo}>
                        <h1 className={styles.goH1}>
                          {i18n.currentLocale === "zh"
                            ? item.title_zh
                            : item.title_en}
                        </h1>
                        <div className={styles.goToIcon}></div>
                      </div>
                      <p>
                        {i18n.currentLocale === "zh"
                          ? item.info_zh
                          : item.info_en}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </ConfigProvider>
      </div>
    </Layout>
  );
};
