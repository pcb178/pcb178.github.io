(function () {
  const TOTAL = 7;
  const dayIndex = Math.floor(Date.now() / 86400000) % TOTAL;
  const num = dayIndex + 1;

  /* 1. 顶部 banner 随机图 */
  const banner = document.querySelector('#page-header');
  if (banner) {
    const picIdx = Math.floor(Math.random() * 3) + 1;
    banner.style.backgroundImage = `url(/img/banner-light/${picIdx}.jpg)`;
  }

  /* 2. 视频 → 插在「卡片列表内部最末尾」，仍在红圈区域内 */
  const cardList = document.querySelector('.recent-posts'); // ← 你圈出的区域
  if (cardList) {
    let videoBox = document.getElementById('daily-center-video');
    if (!videoBox) {
      videoBox = document.createElement('div');
      videoBox.id = 'daily-center-video';
      videoBox.style.cssText = `
        margin: 2rem auto;
        text-align: center;
        pointer-events: none;
      `;
      videoBox.innerHTML = `
        <video autoplay muted loop playsinline style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 18px rgba(0,0,0,.08);">
          <source src="/img/center/${num}.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>`;
      cardList.appendChild(videoBox);   // ← 插在卡片列表内部最末尾
    } else {
      const v = videoBox.querySelector('video');
      v.querySelector('source').src = `/img/center/${num}.mp4`;
      v.load();
    }
  }

  /* 3. 每天换视频（不区分明暗）*/
  setInterval(() => {
    const tomorrow = (Math.floor(Date.now() / 86400000) % TOTAL) + 1;
    if (document.getElementById('daily-center-video')) {
      const v = document.getElementById('daily-center-video').querySelector('video');
      v.querySelector('source').src = `/img/center/${tomorrow}.mp4`;
      v.load();
    }
  }, 60000);   // 每分钟检查一次（可选）
})();