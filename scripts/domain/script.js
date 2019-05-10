(function hardwareTest() {
  var elem = document.documentElement;

  const openFullscreen = () => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  };

  const display = document.getElementById("display-controls");

  display.addEventListener("click", e => {
    const elm = document.createElement("div");
    elm.style.position = "absolute";
    elm.id = "display-mask";
    elm.style.height = "100%";
    elm.style.width = "100%";
    elm.style.top = "0";
    elm.style.left = "0";
    elm.style.background = e.target.id;
    document.body.appendChild(elm);
    openFullscreen();
  });

  const pressed = element => element.classList.toggle("pressedkey");

  document.addEventListener("keyup", e => {
    // If a valid key, toggle style
    const key = document.querySelector(`[key="${e.keyCode}"]`);
    if (key) {
      pressed(key);
    }

    // Closes display mask if its open
    const displayMask = document.getElementById("display-mask");
    if (displayMask) {
      displayMask.remove();
    }
  });

  let interval;
  const iterations = 50;
  const multiplier = 1000000000;
  const cpuButton = document.querySelector(".cpu-button");

  // CPU strain function
  const calculatePrimes = (iterations, multiplier) => {
    var primes = [];
    for (var i = 0; i < iterations; i++) {
      var candidate = i * (multiplier * Math.random());
      var isPrime = true;
      for (var c = 2; c <= Math.sqrt(candidate); ++c) {
        if (candidate % c === 0) {
          // not prime
          isPrime = false;
          break;
        }
      }
      if (isPrime) {
        primes.push(candidate);
      }
    }
    return primes;
  };

  cpuButton.addEventListener("click", e => {
    if (e.target.innerHTML == "Run") {
      e.target.innerHTML =
        'STOP <div class="lds-spinner" style="pointer-events: none;"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
      e.target.style.background = "red";
      e.target.style.color = "white";
      interval = setInterval(() => {
        console.log("running...");
        calculatePrimes(iterations, multiplier);
      }, 10);
    } else {
      e.target.innerHTML = "Run";
      e.target.style.background = "white";
      e.target.style.color = "#cc0000";
      clearInterval(interval);
    }
  });

  // Trackpad
  class SignTool {
    constructor() {
      this.initVars();
      this.initEvents();
    }

    initVars() {
      this.canvas = document.querySelector(".trackpad-test canvas");
      this.ctx = this.canvas.getContext("2d");
      this.isMouseClicked = false;
      this.isMouseInCanvas = false;
      this.prevX = 0;
      this.currX = 0;
      this.prevY = 0;
      this.currY = 0;
    }

    initEvents() {
      const canvas = document.querySelector(".trackpad-test canvas");
      canvas.addEventListener("mousemove", e => this.onMouseMove(e));
      canvas.addEventListener("mousedown", e => this.onMouseDown(e));
      canvas.addEventListener("mouseup", () => this.onMouseUp());
      canvas.addEventListener("mouseout", () => this.onMouseOut());
      canvas.addEventListener("mouseenter", e => this.onMouseEnter(e));
    }

    onMouseDown(e) {
      this.isMouseClicked = true;
      this.updateCurrentPosition(e);
    }

    onMouseUp() {
      this.isMouseClicked = false;
    }

    onMouseEnter(e) {
      this.isMouseInCanvas = true;
      this.updateCurrentPosition(e);
    }

    onMouseOut() {
      this.isMouseInCanvas = false;
    }

    onMouseMove(e) {
      if (this.isMouseClicked && this.isMouseInCanvas) {
        this.updateCurrentPosition(e);
        this.draw();
      }
    }

    updateCurrentPosition(e) {
      this.prevX = this.currX;
      this.prevY = this.currY;
      this.currX = e.clientX - this.canvas.offsetLeft;
      this.currY = e.clientY - this.canvas.offsetTop;
    }

    draw() {
      console.log(this.prevX);
      console.log(this.prevY);
      this.ctx.beginPath();
      this.ctx.moveTo(this.prevX, this.prevY);
      this.ctx.lineTo(this.currX, this.currY);
      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  var canvass = new SignTool();
})();
