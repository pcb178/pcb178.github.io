(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'snow';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const flakes = [];
  const maxFlakes = 100;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  function Snowflake() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height; // 从顶部外开始
    this.r = Math.random() * 3 + 1;
    this.d = Math.random() * maxFlakes;
    this.speed = Math.random() * 1 + 0.5;
    this.alpha = Math.random() * 0.6 + 0.4;
  }

  Snowflake.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark
      ? `rgba(255, 255, 255, ${this.alpha})`
      : `rgba(100, 100, 100, ${this.alpha})`;
    ctx.fill();
  };

  Snowflake.prototype.update = function () {
    this.y += this.speed;
    this.x += Math.sin(this.d) * 0.5;
    if (this.y > canvas.height) {
      this.y = -this.r; // 从顶部外重新落下
      this.x = Math.random() * canvas.width;
    }
  };

  function init() {
    for (let i = 0; i < maxFlakes; i++) {
      flakes.push(new Snowflake());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < flakes.length; i++) {
      flakes[i].update();
      flakes[i].draw();
    }
    requestAnimationFrame(animate);
  }

  init();
  animate();
})();