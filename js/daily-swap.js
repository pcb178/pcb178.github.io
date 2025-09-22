/**
 * 每日自动切换首页顶部大图（Banner）和网站背景图
 * 文件路径：source/js/daily-swap-dual.js
 * 调用方式：在 _config.butterfly.yml inject.bottom 中引入 <script src="/js/daily-swap-dual.js"></script>
 */

(function () {
  /* ========== 基础工具 ========== */
  const pad = n => String(n).padStart(2, '0');

  /* ========== 日期计算 ========== */
  const today = new Date();
  const day = today.getDate(); // 1-31

  /* ========== 图片路径 ========== */
  const bannerUrl = `/img/banner/${pad(day)}.jpg`;
  const bgUrl = `/img/background/${pad(day)}.jpg`;

  /* ========== 动态样式 ========== */
  const style = document.createElement('style');
  style.id = 'daily-swap-dual-style'; // 方便调试
  style.innerHTML = `
    /* 首页顶部大图（Banner） */
    #page-header {
      background-image: url("${bannerUrl}") !important;
      background-size: cover !important;
      background-position: center center !important;
      background-repeat: no-repeat !important;
    }

    /* 网站全局背景图 */
    body {
      background-image: url("${bgUrl}") !important;
      background-size: cover !important;
      background-position: center center !important;
      background-repeat: no-repeat !important;
      background-attachment: fixed !important;
    }

    /* 底部背景图（与背景图同步） */
    .footer {
      background-image: url("${bgUrl}") !important;
      background-size: cover !important;
      background-position: center center !important;
      background-repeat: no-repeat !important;
    }
  `;

  /* ========== 注入 DOM ========== */
  document.head.appendChild(style);
})();