import React, { useState } from "react";
import styles from "./index.module.css";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { getDocs } from "../utils/getDocs";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";
import SearchBar from '@theme/SearchBar';
import useIsBrowser from '@docusaurus/useIsBrowser';
export default () => {
	const { i18n } = useDocusaurusContext();
	const isBrowser = useIsBrowser();
	const currentLocale = i18n.currentLocale === 'zh'
	const homeDocData = getDocs().Home.sidebar_custom_props.product_docs || [];
	const [seriesKey, setSeriesKey] = useState(isBrowser ? localStorage.getItem('radxa_doc_current') : 0 || 0);

	const svgEle = <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
		<path d="M13.5039 27L22.5039 18L13.5039 9" stroke="#333333" strokeWidth="2.88018" strokeLinecap="round" strokeLinejoin="round" />
	</svg>

	const icons = {
		Overview: '/home/overview.svg',
		Download: '/home/download.svg',
		Accessories: '/home/accessories.svg',
		GettingStart: '/home/gettingstart.svg',
		Certification: '/home/certification.svg',
		SystemConfigrations: '/home/radxaos.svg',
	}

	return (
		<Layout>
			<div className={styles.docs_home_main}>
				<div className={styles.docs_entry}>
					<h1><Translate id="radxa.docs" /></h1>
					<p><Translate id="radxa.docs.info1" /></p>
					<div className={styles.search_box}>
						<SearchBar />
					</div>
					<div className={styles.hot_topic}>
						<p><Translate id="radxa.docs.hot" /></p>
						<div>
							<Link to='/rock3'>ROCK 3 Family</Link>
							<Link to='/rock5'>ROCK 5 Family</Link>
							<Link to='/zero'>ZERO Family</Link>
							<Link to='/nio'>NIO Family</Link>
						</div>
					</div>
				</div>
				<div className={styles.products_center}>
					<ul className={styles.product_lines}>
						{
							homeDocData.length > 0 ? homeDocData.map((item, index) => {
								return (
									<li key={index}
										className={seriesKey == index ? styles.current_series : null}
										onClick={() => {
											setSeriesKey(index)
											localStorage.setItem('radxa_doc_current', index)
										}}
									>
										{currentLocale ? item.series_zh : item.series_en}
									</li>
								)
							}) : null
						}
					</ul>
					<div className={styles.line_info}>
						<p>{currentLocale ? homeDocData[seriesKey].series_zh : homeDocData[seriesKey].series_en}</p>
						<p>{currentLocale ? homeDocData[seriesKey].series_introduction_zh : homeDocData[seriesKey].series_introduction_en}</p>
						<div className={styles.photos}>
							{
								homeDocData[seriesKey].products.length > 0 ? homeDocData[seriesKey].products.map((item, index) => {
									return (
										<Link key={index} to={item.products_link}>
											<p>{item.products_name}</p>
											<img src={item.products_photo_url} alt={item.products_name} />
										</Link>
									)
								}) : null
							}
						</div>
						<div className={styles.doc_links}>
							{
								homeDocData[seriesKey].docs.length > 0 ? homeDocData[seriesKey].docs.map((item, index) => {
									return (
										<Link to={item.docs_link} key={index}>
											<img src={icons[item.docs_photo_type]} />
											<p className={styles.link_title}>
												<span>{currentLocale ? item.docs_name_zh : item.docs_name_en} {svgEle}</span>
												<span>{currentLocale ? item.docs_info_zh : item.docs_info_en}</span>
											</p>
										</Link>
									)
								}) : null
							}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};
