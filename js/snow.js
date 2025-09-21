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
  const maxFlakes = 150;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  function Snowflake() {
    this.x = Math.random() * canvas.width;
    this.y = -Math.random() * 50 - 10; // ✅ 从顶部外一条线开始
    this.r = Math.random() * 3 + 2;
    this.speed = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.7 + 0.3;
    this.drift = Math.random() * 0.5;
  }

  Snowflake.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark
      ? `rgba(255, 255, 255, ${this.alpha})`
      : `rgba(120, 140, 160, ${this.alpha})`;
    ctx.fill();
  };

  Snowflake.prototype.update = function () {
    this.y += this.speed;
    this.x += Math.sin(this.y * 0.01) * this.drift;
    if (this.y > canvas.height) {
      this.y = -10;
      this.x = Math.random() * canvas.width;
    }
  };

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < flakes.length; i++) {
      flakes[i].update();
      flakes[i].draw();
    }
    requestAnimationFrame(animate);
  }

  // ✅ 分批生成雪花，模拟持续从顶部落下
  setInterval(() => {
    if (flakes.length < maxFlakes) {
      flakes.push(new Snowflake());
    }
  }, 200);

  animate();
})();(function () {
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
  const maxFlakes = 150;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  function Snowflake() {
    this.x = Math.random() * canvas.width;
    this.y = -Math.random() * 50 - 10; // ✅ 从顶部外一条线开始
    this.r = Math.random() * 3 + 2;
    this.speed = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.7 + 0.3;
    this.drift = Math.random() * 0.5;
  }

  Snowflake.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark
      ? `rgba(255, 255, 255, ${this.alpha})`
      : `rgba(120, 140, 160, ${this.alpha})`;
    ctx.fill();
  };

  Snowflake.prototype.update = function () {
    this.y += this.speed;
    this.x += Math.sin(this.y * 0.01) * this.drift;
    if (this.y > canvas.height) {
      this.y = -10;
      this.x = Math.random() * canvas.width;
    }
  };

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < flakes.length; i++) {
      flakes[i].update();
      flakes[i].draw();
    }
    requestAnimationFrame(animate);
  }

  // ✅ 分批生成雪花，模拟持续从顶部落下
  setInterval(() => {
    if (flakes.length < maxFlakes) {
      flakes.push(new Snowflake());
    }
  }, 200);

  animate();
})();