/* 昼夜切换主函数 */
function switchNightMode() {
    document.body.insertAdjacentHTML('beforeend',
      '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>')
  
    setTimeout(() => {
      const isDark = document.body.classList.toggle('DarkMode')
      localStorage.setItem('isDark', isDark ? '1' : '0')
      document.getElementById('modeicon').setAttribute('xlink:href',
        isDark ? '#icon-sun' : '#icon-moon')
  
      /* 2 秒后让遮罩淡出 */
      setTimeout(() => {
        const sky = document.querySelector('.Cuteen_DarkSky')
        sky.style.transition = 'opacity 3s'
        sky.style.opacity = '0'
        setTimeout(() => sky.remove(), 1000)
      }, 2000)
    }, 50)
  
    /* 同步 Butterfly 自带的 darkmode 钩子 */
    const now = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (now === 'light') {
      activateDarkMode()
      saveToLocal.set('theme', 'dark', 2)
    } else {
      activateLightMode()
      saveToLocal.set('theme', 'light', 2)
    }
    /* 评论系统刷新 */
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length &&
      setTimeout(() => window.disqusReset(), 200)
  }