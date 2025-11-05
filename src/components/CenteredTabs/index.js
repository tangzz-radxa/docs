import { useState, useRef, useLayoutEffect } from 'react';
import styles from './index.module.css';
import clsx from 'clsx';

const CenteredTabs = ({ datalist, setIndexCategory, categoryData, currentLocale }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabsContainerRef = useRef(null);
  const tabRefs = useRef([]);
  const tabLine = useRef(null);

  const centerTab = (index) => {
    const container = tabsContainerRef.current;
    const tab = tabRefs.current[index];

    if (container && tab) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();

      const targetScrollLeft = tab.offsetLeft - (containerRect.width / 2) + (tabRect.width / 2);

      if (tabLine.current) {
        tabLine.current.style.left = `${tab.offsetLeft}px`;
        tabLine.current.style.width = `${tabRect.width}px`;
      }

      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useLayoutEffect(() => {
    if (datalist.length > 0 && tabRefs.current[activeTab]) {
      centerTab(activeTab);
    }
  }, [datalist, activeTab]);

  return (
    <div className={styles["tabs-container"]} ref={tabsContainerRef}>
      <ol className={styles["tabs-list"]}>
        {datalist.map((tab, index) => {
          return (
            <li
              key={index}
              ref={el => tabRefs.current[index] = el}
              className={clsx(
                styles["tab-button"],
                activeTab === index ? styles['active'] : ''
              )}
              onClick={() => {
                setIndexCategory(tab)
                setActiveTab(index);
                centerTab(index);
              }}
            >
              {
                categoryData[tab] && currentLocale ? categoryData[tab].zh : categoryData[tab].en
              }
            </li>
          )
        })}
      </ol>
      <span className={styles["absolute_line"]} ref={tabLine}></span>
    </div>
  );
};

export default CenteredTabs;