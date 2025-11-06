// plugins/baidu-analytics/src/baidu-analytics-client.js
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// 百度统计工具函数
const baiduAnalytics = {
  // 初始化百度统计
  init() {
    if (!ExecutionEnvironment.canUseDOM) return;

    window._hmt = window._hmt || [];

    // 确保统计代码已加载
    if (!document.querySelector('script[src*="hm.baidu.com"]')) {
      const hm = document.createElement("script");
      hm.src = `https://hm.baidu.com/hm.js?${this.getTrackingID()}`;
      const s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    }
  },

  // 从脚本中提取 trackingID
  getTrackingID() {
    if (!ExecutionEnvironment.canUseDOM) return '';

    const scripts = document.querySelectorAll('script');
    for (let script of scripts) {
      if (script.src && script.src.includes('hm.baidu.com')) {
        const match = script.src.match(/hm\.js\?([^&]+)/);
        return match ? match[1] : '';
      }
    }
    return '';
  },

  // 跟踪页面浏览
  trackPageView(path = window.location.pathname) {
    if (ExecutionEnvironment.canUseDOM && window._hmt) {
      window._hmt.push(['_trackPageview', path]);
    }
  },

  // 跟踪事件
  trackEvent(category, action, label, value) {
    if (ExecutionEnvironment.canUseDOM && window._hmt) {
      window._hmt.push(['_trackEvent', category, action, label, value]);
    }
  },

  // 跟踪搜索
  trackSearch(keyword) {
    if (ExecutionEnvironment.canUseDOM && window._hmt) {
      window._hmt.push(['_trackPageview', `/search#q=${encodeURIComponent(keyword)}`]);
      this.trackEvent('search', 'keyword', keyword);
    }
  },

  // 跟踪外部链接点击
  trackOutboundLink(url) {
    if (ExecutionEnvironment.canUseDOM && window._hmt) {
      this.trackEvent('outbound', 'click', url);
    }
  }
};

// 初始化
if (ExecutionEnvironment.canUseDOM) {
  baiduAnalytics.init();

  // 监听 Docusaurus 页面视图事件
  document.addEventListener('docusaurus:pageView', (event) => {
    baiduAnalytics.trackPageView(event.detail.location.pathname);
  });

  // 监听路由变化（兼容旧版本 Docusaurus）
  let lastPathname = window.location.pathname;
  const observeUrlChange = () => {
    const currentPathname = window.location.pathname;
    if (currentPathname !== lastPathname) {
      lastPathname = currentPathname;
      baiduAnalytics.trackPageView(currentPathname);
    }
    setTimeout(observeUrlChange, 100);
  };

  // 开始监听
  observeUrlChange();

  // 监听外部链接点击
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && !link.href.includes(window.location.hostname)) {
      baiduAnalytics.trackOutboundLink(link.href);
    }
  });
}

export default baiduAnalytics;
