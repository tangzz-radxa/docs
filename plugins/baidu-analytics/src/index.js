// plugins/baidu-analytics/src/index.js
const path = require('path');

function baiduAnalyticsPlugin(context, options) {
  const { trackingID } = options;

  if (!trackingID) {
    throw new Error('百度统计插件需要提供 trackingID 参数');
  }

  return {
    name: 'baidu-analytics-plugin',

    getClientModules() {
      return [path.resolve(__dirname, './baidu-analytics-client')];
    },

    injectHtmlTags() {
      if (!trackingID) {
        return {};
      }

      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              async: true,
              src: `https://hm.baidu.com/hm.js?${trackingID}`,
            },
          },
          {
            tagName: 'script',
            innerHTML: `
              window._hmt = window._hmt || [];
              // 初始化百度统计
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?${trackingID}";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
              })();
            `,
          },
        ],
      };
    },

    extendCli(cli) {
      cli
        .command('baidu:check')
        .description('检查百度统计配置')
        .action(() => {
          console.log('百度统计配置信息:');
          console.log('Tracking ID:', trackingID);
          console.log('状态: ✓ 已配置');
        });
    },
  };
}

module.exports = baiduAnalyticsPlugin;
