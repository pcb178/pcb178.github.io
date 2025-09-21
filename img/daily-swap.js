(function () {
    const TOTAL = 7;                          // 7 套图/视频
    const dayOfYear = Math.floor(Date.now() / 86400000) % TOTAL + 1;
    const num = String(dayOfYear).padStart(2, '0');
    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';
  
    /* 1. 顶部 banner 图（1920×600） */
    const banner = document.querySelector('.banner, .post-banner, #banner');
    if (banner && banner.tagName === 'IMG') {
      banner.src = `/img/banner-${isDark() ? 'dark' : 'light'}.png`;
    }
  
    /* 2. 底部横幅 图（1920×400） */
    const bottom = document.querySelector('footer, .footer, #footer');
    if (bottom) {
      const bottomImg = document.createElement('div');
      bottomImg.id = 'daily-bottom';
      bottomImg.style.cssText = 'margin:2rem auto 0;text-align:center;pointer-events:none;';
      bottomImg.innerHTML = `<img style="max-width:100%;border-radius:12px;box-shadow:0 4px 18px rgba(0,0,0,.08);" src="/img/bottom-${isDark() ? 'dark' : 'light'}.png" alt="bottom">`;
      bottom.before(bottomImg);
    }
  
    /* 3. 中间视频（800×800）替换原有视频 / 图片 */
    const post = document.querySelector('#post-body, .post-content, .article-container');
    if (post) {
      const video = document.createElement('div');
      video.id = 'daily-center-video';
      video.style.cssText = 'margin:2rem auto;text-align:center;pointer-events:none;';
      video.innerHTML = `
        <video autoplay muted loop style="max-width:100%;height:auto;border-radius:12px;box-shadow:0 4px 18px rgba(0,0,0,.08);">
          <source src="/img/center/${num}-${isDark() ? 'dark' : 'light'}.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>`;
      post.after(video);
    }
  
    /* 4. 主题切换时同步更新 */
    new MutationObserver(() => {
      if (banner && banner.tagName === 'IMG') banner.src = `/img/banner-${isDark() ? 'dark' : 'light'}.png`;
      if (document.getElementById('daily-bottom'))
        document.getElementById('daily-bottom').querySelector('img').src = `/img/bottom-${isDark() ? 'dark' : 'light'}.png`;
      if (document.getElementById('daily-center-video'))
        document.getElementById('daily-center-video').querySelector('source').src = `/img/center/${num}-${isDark() ? 'dark' : 'light'}.mp4`;
    }).observe(document.documentElement, { attributeFilter: ['data-theme'] });
  })();