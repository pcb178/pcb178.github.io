(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'snow';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const flakes = [];
  const maxFlakes = 120;
  let mouseX = 0;
  let mouseY = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  resize();

  function star(cx, cy, r, rot) {
    const inner = r * 0.5;
    let angle = rot - Math.PI / 2;
    const step = Math.PI / 6;
    ctx.beginPath();
    for (let i = 0; i < 12; i++) {
      const rad = i % 2 === 0 ? r : inner;
      const x = cx + Math.cos(angle) * rad;
      const y = cy + Math.sin(angle) * rad;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      angle += step;
    }
    ctx.closePath();
  }

  function Snowflake() {
    this.x = Math.random() * canvas.width;
    this.y = -Math.random() * 80 - 20;
    this.r = Math.random() * 4 + 3;
    this.speed = Math.random() * 1.2 + 0.6;
    this.alpha = Math.random() * 0.6 + 0.4;
    this.rot = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.02;
    this.drift = Math.random() * 0.4 - 0.2;
  }

  Snowflake.prototype.update = function () {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.hypot(dx, dy);
    if (dist < 90) {
      const force = (90 - dist) / 90;
      const angle = Math.atan2(dy, dx);
      this.x += Math.cos(angle) * force * 7;
      this.y += Math.sin(angle) * force * 7;
    }
    this.y += this.speed;
    this.x += this.drift;
    this.rot += this.rotSpeed;
    if (this.y > canvas.height + 20) {
      this.y = -80;
      this.x = Math.random() * canvas.width;
    }
  };

  Snowflake.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = '#fff';
    star(this.x, this.y, this.r, this.rot);
    ctx.fill();
    ctx.restore();
  };

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    flakes.forEach(f => {
      f.update();
      f.draw();
    });
    requestAnimationFrame(animate);
  }

  setInterval(() => {
    if (flakes.length < maxFlakes) flakes.push(new Snowflake());
  }, 200);

  animate();
})();