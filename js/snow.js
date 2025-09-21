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
  const maxFlakes = 120;

  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function drawStar(cx, cy, spikes, outerRadius, innerRadius, rotation) {
    let rot = (Math.PI / 2) * 0 + rotation;
    const step = Math.PI / spikes;
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = cx + Math.cos(rot) * radius;
      const y = cy + Math.sin(rot) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      rot += step;
    }
    ctx.closePath();
  }

  function Snowflake() {
    this.x = Math.random() * canvas.width;
    this.y = -Math.random() * 80 - 20;
    this.r = Math.random() * 4 + 3; // 外半径
    this.innerR = this.r * 0.5;   // 内半径
    this.speed = Math.random() * 1.2 + 0.6;
    this.alpha = Math.random() * 0.6 + 0.4;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    this.drift = Math.random() * 0.4 - 0.2;
    this.avoidRadius = 90;
  }

  Snowflake.prototype.update = function () {
    // 鼠标互动
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < this.avoidRadius) {
      const force = (this.avoidRadius - dist) / this.avoidRadius;
      const angle = Math.atan2(dy, dx);
      this.x += Math.cos(angle) * force * 7;
      this.y += Math.sin(angle) * force * 7;
    }

    // 正常运动
    this.y += this.speed;
    this.x += this.drift;
    this.rotation += this.rotationSpeed;

    if (this.y > canvas.height + 20) {
      this.y = -80;
      this.x = Math.random() * canvas.width;
    }
  };

  Snowflake.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = '#ffffff'; // 纯白雪花
    drawStar(this.x, this.y, 6, this.r, this.innerR, this.rotation);
    ctx.fill();
    ctx.restore();
  };

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < flakes.length; i++) {
      flakes[i].update();
      flakes[i].draw();
    }
    requestAnimationFrame(animate);
  }

  // 分批生成
  setInterval(() => {
    if (flakes.length < maxFlakes) flakes.push(new Snowflake());
  }, 200);

  animate();
})();