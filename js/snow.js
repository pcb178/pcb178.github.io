(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'snow';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  /* ---------- 工具函数 ---------- */
  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';
  const snowColor = () => isDark() ? '#ffffff' : '#6d7c94'; // 智能色

  /* ---------- 基础参数 ---------- */
  const flakes = [], fragments = [];
  const snowHeap = new Uint8Array(Math.ceil(window.innerWidth / 4));
  const heapCleanLine = 80;
  let mouseX = 0, mouseY = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    snowHeap.fill(0);
  }
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
  });
  canvas.addEventListener('click', clickExplode);
  resize();

  /* ---------- 六角星绘制 ---------- */
  function star(cx, cy, r, rot) {
    const inner = r * 0.5;
    let angle = rot - Math.PI / 2;
    const step = Math.PI / 6;
    ctx.beginPath();
    for (let i = 0; i < 12; i++) {
      ctx.lineTo(cx + Math.cos(angle) * (i % 2 === 0 ? r : inner), cy + Math.sin(angle) * (i % 2 === 0 ? r : inner));
      angle += step;
    }
    ctx.closePath();
  }

  /* ---------- 雪花类 ---------- */
  class Snowflake {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = -Math.random() * 80 - 20;
      this.r = Math.random() * 4 + 3;
      this.speed = Math.random() * 1.2 + 0.6;
      this.alpha = Math.random() * 0.6 + 0.4;
      this.rot = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;
      this.drift = Math.random() * 0.4 - 0.2;
    }
    update() {
      const dx = this.x - mouseX, dy = this.y - mouseY, dist = Math.hypot(dx, dy);
      if (dist < 90) {
        const force = (90 - dist) / 90, angle = Math.atan2(dy, dx);
        this.x += Math.cos(angle) * force * 7;
        this.y += Math.sin(angle) * force * 7;
      }
      this.y += this.speed; this.x += this.drift; this.rot += this.rotSpeed;
      if (this.y + this.r >= canvas.height - snowHeap[Math.floor(this.x / 4)]) {
        const idx = Math.floor(this.x / 4);
        if (idx >= 0 && idx < snowHeap.length) snowHeap[idx] = Math.min(snowHeap[idx] + 1, heapCleanLine);
        this.y = -80; this.x = Math.random() * canvas.width;
      }
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = snowColor(); // ← 主题智能色
      star(this.x, this.y, this.r, this.rot);
      ctx.fill();
      ctx.restore();
    }
  }

  /* ---------- 爆炸碎片 ---------- */
  class Fragment {
    constructor(x, y) {
      this.x = x; this.y = y;
      this.vx = (Math.random() - 0.5) * 6;
      this.vy = Math.random() * -8 - 2;
      this.r = Math.random() * 2 + 1;
      this.alpha = 1;
      this.gravity = 0.3;
    }
    update() {
      this.x += this.vx; this.y += this.vy; this.vy += this.gravity; this.alpha -= 0.03;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = snowColor(); // ← 碎片也随主题
      star(this.x, this.y, this.r, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  function clickExplode(e) {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE');
    audio.volume = 0.3; audio.play().catch(() => {});
    for (let i = 0; i < 25; i++) fragments.push(new Fragment(e.clientX, e.clientY));
  }

  /* ---------- 积雪 & 清理 ---------- */
  function drawHeap() {
    ctx.fillStyle = snowColor(); // ← 积雪也随主题
    for (let i = 0; i < snowHeap.length; i++)
      if (snowHeap[i] > 0) ctx.fillRect(i * 4, canvas.height - snowHeap[i], 4, snowHeap[i]);
    let total = 0;
    for (let h of snowHeap) total += h;
    if (total > heapCleanLine * snowHeap.length * 0.7)
      for (let i = 0; i < snowHeap.length; i++) snowHeap[i] = Math.max(0, snowHeap[i] - 15);
  }

  /* ---------- 主循环 ---------- */
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    flakes.forEach(f => { f.update(); f.draw(); });
    for (let i = fragments.length - 1; i >= 0; i--) {
      const fr = fragments[i];
      fr.update(); fr.draw();
      if (fr.alpha <= 0) fragments.splice(i, 1);
    }
    drawHeap();
    requestAnimationFrame(animate);
  }

  setInterval(() => { if (flakes.length < maxFlakes) flakes.push(new Snowflake()); }, 200);
  animate();
})();