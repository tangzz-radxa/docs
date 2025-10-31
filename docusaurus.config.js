// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes as prismThemes } from "prism-react-renderer";
const path = require("path");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Radxa Docs",
  tagline: "Documentations for Radxa products",
  url: "https://docs.radxa.com",
  baseUrl: "/",
  trailingSlash: false,
  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "warn",
  onBrokenAnchors: "ignore",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "radxa-docs", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh",
    locales: ["en", "zh"],
    localeConfigs: {
      en: {
        htmlLang: "en-US",
      },
      zh: {
        htmlLang: "zh-CN",
      },
    },
  },
  future: {
    v4: true,
    experimental_faster: true,
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: ({ locale, docPath }) => {
            if (locale !== "zh") {
              return `https://github.com/radxa-docs/docs/edit/main/i18n/${locale}/docusaurus-plugin-content-docs/current/${docPath}`;
            }
            return `https://github.com/radxa-docs/docs/edit/main/docs/${docPath}`;
          },
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/radxa-docs/docs/edit/main/",
        },
        theme: {
          customCss: [
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/css/footer.css"),
            require.resolve("./src/css/doc.css"),
            require.resolve("./src/css/navbar.css"),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      algolia: {
        appId: "KB2V2SQ6N9",
        apiKey: "9fdd9855b5bfb8447d4079ca17e40bdc",
        indexName: "radxa",
        contextualSearch: true,
        externalUrlRegex: "external\\.com|domain\\.com",
        replaceSearchResultPathname: {
          from: "/docs/",
          to: "/",
        },
        searchParameters: {},
        searchPagePath: false,
      },
      colorMode: {
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      announcementBar: {
        id: "radxa-website",
        content:
          '<div id="bulletin"><a target="_blank" rel="noopener noreferrer" href="https://radxa.com">Home</a><a target="_blank" rel="noopener noreferrer" href="https://radxa.com/products">Products</a><a target="_blank" rel="noopener noreferrer" href="https://radxa.com/news">News</a><a target="_blank" rel="noopener noreferrer" href="https://radxa.com/services">Services</a><a target="_blank" rel="noopener noreferrer" href="https://radxa.com/community">Support</a><a target="_blank" rel="noopener noreferrer" href="https://radxa.com/about">About</a></div>',
        backgroundColor: "#2b2b2b",
        textColor: "#fff",
        isCloseable: false,
      },
      navbar: {
        hideOnScroll: false,
        logo: {
          alt: "Radxa",
          src: "/page/radxa-docs.svg",
          href: "/",
        },
        items: [
          {
            label: "Docs",
            to: "/welcome",
            position: "left",
            target: "_self",
          },
          {
            type: "dropdown",
            label: "SBC",
            position: "left",
            items: [
              {
                label: "ROCK 2 系列",
                to: "/rock2",
                children: [
                  {
                    label: "→ ROCK 2A",
                    to: "/rock2/rock2a",
                  },
                  {
                    label: "→ ROCK 2F",
                    to: "/rock2/rock2f",
                  },
                ],
              },
              {
                label: "ROCK 3 系列",
                to: "/rock3",
                children: [
                  {
                    label: "→ ROCK 3A",
                    to: "/rock3/rock3a",
                  },
                  {
                    label: "→ ROCK 3B/3B+",
                    to: "/rock3/rock3b",
                  },
                  {
                    label: "→ ROCK 3C",
                    to: "/rock3/rock3c",
                  },
                ],
              },
              {
                label: "ROCK 4 系列",
                to: "/rock4",
                children: [
                  {
                    label: "→ ROCK 4A/4B/4A+/4B+/4SE",
                    to: "/rock4/rock4ab-se",
                  },
                  {
                    label: "→ ROCK 4C+",
                    to: "/rock4/rock4c+",
                  },
                  {
                    label: "→ ROCK 4D",
                    to: "/rock4/rock4d",
                  },
                ],
              },
              {
                label: "ROCK 5 系列",
                to: "/rock5",
                children: [
                  {
                    label: "→  ROCK 5A",
                    to: "/rock5/rock5a",
                  },
                  {
                    label: "→  ROCK 5B/5B+",
                    to: "/rock5/rock5b",
                  },
                  {
                    label: "→  ROCK 5C",
                    to: "/rock5/rock5c",
                  },
                  {
                    label: "→  ROCK 5T",
                    to: "/rock5/rock5t",
                  },
                  {
                    label: "→  ROCK 5 ITX",
                    to: "/rock5/rock5itx",
                  },
                ],
              },
              {
                label: "ROCK Pi",
                to: "/rockpi",
                children: [
                  {
                    label: "→ ROCK Pi S",
                    to: "/rockpi/rockpis",
                  },
                  {
                    label: "→ ROCK Pi E",
                    to: "/rockpi/rockpie",
                  },
                  {
                    label: "→ ROCK S0",
                    to: "/rockpi/rocks0",
                  },
                ],
              },
              {
                label: "ZERO 系列",
                to: "/zero",
                children: [
                  {
                    label: "ZERO",
                    to: "/zero/zero",
                  },
                  {
                    label: "ZERO 2 Pro",
                    to: "/zero/zero2pro",
                  },
                  {
                    label: "ZERO 3W/3E",
                    to: "/zero/zero3",
                  },
                ],
              },
              {
                label: "X 系列",
                to: "/x",
                children: [
                  {
                    label: "X2L",
                    to: "/x/x2l",
                  },
                  {
                    label: "X4",
                    to: "/x/x4",
                  },
                ],
              },
              {
                label: "NIO 系列",
                to: "/nio",
                children: [
                  {
                    label: "NIO 12L",
                    to: "/nio/12l",
                  },
                ],
              },
              {
                label: "SiRider 系列",
                to: "/sirider",
                children: [
                  {
                    label: "SiRider S1",
                    to: "/sirider/s1",
                  },
                ],
              },
              {
                label: "Orion 系列",
                to: "/orion",
                children: [
                  {
                    label: "Orion O6",
                    to: "/orion/o6",
                  },
                ],
              },
              {
                label: "Cubie 系列",
                to: "/cubie",
                children: [
                  {
                    label: "Cubie A5E",
                    to: "/cubie/a5e",
                  },
                  {
                    label: "Cubie A7A",
                    to: "/cubie/a7a",
                  },
                  {
                    label: "Cubie A7Z",
                    to: "/cubie/a7z",
                  },
                ],
              },
              {
                label: "Dragon 系列",
                to: "/dragon",
                children: [
                  {
                    label: "Dragon Q6A",
                    to: "/dragon/q6a",
                  },
                ],
              },
            ],
          },
          {
            type: "dropdown",
            label: "核心板",
            position: "left",
            items: [
              {
                label: "CM3",
                to: "/compute-module/cm3",
              },
              {
                label: "CM3I",
                to: "/compute-module/cm3i",
              },
              {
                label: "CM3J",
                to: "/compute-module/cm3j",
              },
              {
                label: "CM4",
                to: "/compute-module/cm4",
              },
              {
                label: "CM5",
                to: "/compute-module/cm5",
              },
              {
                label: "NX5",
                to: "/compute-module/nx5",
              },
            ],
          },
          {
            type: "dropdown",
            label: "网络计算",
            position: "left",
            items: [
              {
                label: "E20C",
                to: "/e/e20c",
              },
              {
                label: "E24C",
                to: "/e/e24c",
              },
              {
                label: "E52C",
                to: "/e/e52c",
              },
              {
                label: "E54C",
                to: "/e/e54c",
              },
            ],
          },
          {
            type: "dropdown",
            label: "边缘计算",
            position: "left",
            items: [
              {
                label: "Airbox",
                to: "/fogwise/airbox",
              },
              {
                label: "Airbox Q900",
                to: "/fogwise/airbox-q900",
              },
            ],
          },
          {
            type: "dropdown",
            label: "智核系列",
            position: "left",
            items: [
              {
                label: "AX-M1",
                to: "/aicore/ax-m1",
              },
              {
                label: "DX-M1",
                to: "/aicore/dx-m1",
              },
              {
                label: "SG2300X",
                to: "/aicore/sg2300x",
              },
            ],
          },
          {
            type: "localeDropdown",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Radxa",
            items: [
              {
                label: "Home",
                to: "https://radxa.com/",
                target: "_self",
              },
              {
                label: "Products",
                to: "https://radxa.com/product",
                target: "_self",
              },
              {
                label: "News",
                to: "https://radxa.com/news",
                target: "_self",
              },
              {
                label: "Services",
                to: "https://radxa.com/services",
                target: "_self",
              },
              {
                label: "Community",
                to: "https://radxa.com/community",
                target: "_self",
              },
            ],
          },
          {
            title: "Support",
            items: [
              {
                label: "Wiki",
                href: "https://wiki.radxa.com/",
              },
              {
                label: "Forum",
                href: "https://forum.radxa.com/",
              },
              {
                label: "Github",
                href: "https://github.com/radxa",
              },
            ],
          },
          {
            title: "About",
            items: [
              {
                label: "About Radxa",
                to: "https://radxa.com/about",
              },
              {
                label: "Contact Radxa",
                to: "https://radxa.com/about?#contact",
              },
              {
                label: "About Distributors",
                to: "https://radxa.com/about#distributors",
              },
              {
                html: `
                   <div class='footer_box'>
                    <div class='footer_center'>
                        <div class='log'></div>
                        <div class='iconBox'>
                          <div class='men'>Follow us</div>
                          <ul>
                            <li>
                              <a class='a_on1 iconpg' href='https://github.com/radxa'></a>
                            </li>
                            <li>
                              <a class='a_on2 iconpg' href='https://discord.com/invite/mn73YNWdHY'></a>
                            </li>
                            <li>
                              <a class='a_on3 iconpg' href='https://t.me/rockpi4'></a>
                            </li>
                            <li class='a_on4_li'>
                              <div class='a_on4 iconpg'></div>
                              <div class='vxMa'></div>
                            </li>
                            <li class='a_on5_li'>
                              <div class='a_on5 iconpg'></div>
                              <div class='qqMa'></div>
                            </li>
                          </ul>
                        </div>
                    </div>
                   </div>
                  `,
              },
            ],
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["bash"],
      },
      typography: {
        fontFamily: [
          "Helvetica",
          "pingFangSC",
          "Microsoft YaHei",
          "微软雅黑",
          "Arial",
          "sans-serif",
        ],
      },
    }),
  plugins: [
    require.resolve(path.join(__dirname, "/plugins/symlink-resolver")),
    [
      "@docusaurus/plugin-google-gtag",
      {
        trackingID: "G-2V3W91WFXP",
        anonymizeIP: true,
      },
    ],
  ],
};

module.exports = config;
