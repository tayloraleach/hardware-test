"use strict";

(function hardwareTest() {
  var elem = document.documentElement;

  var openFullscreen = function openFullscreen() {
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

  var closeFullscreen = function closeFullscreen() {
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

  var display = document.getElementById("display-controls");

  display.addEventListener("click", function (e) {
    var elm = document.createElement("div");
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

  var pressed = function pressed(element) {
    return element.classList.toggle("pressedkey");
  };

  document.addEventListener("keyup", function (e) {
    // If a valid key, toggle style
    var key = document.querySelector("[key=\"" + e.keyCode + "\"]");
    if (key) {
      pressed(key);
    }

    // Closes display mask if its open
    var displayMask = document.getElementById("display-mask");
    if (displayMask) {
      displayMask.remove();
    }
  });

  var interval = void 0;
  var iterations = 50;
  var multiplier = 1000000000;
  var cpuButton = document.querySelector(".cpu-button");

  // CPU strain function
  var calculatePrimes = function calculatePrimes(iterations, multiplier) {
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

  cpuButton.addEventListener("click", function (e) {
    if (e.target.innerHTML == "Run") {
      e.target.innerHTML = 'STOP <div class="lds-spinner" style="pointer-events: none;"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
      e.target.style.background = "red";
      e.target.style.color = "white";
      interval = setInterval(function () {
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

  var canvas = document.querySelector(".trackpad-test canvas");
  var clear_canvas = document.querySelector("#clear-canvas-button");
  var ctx = canvas.getContext("2d");
  var pos = { x: 0, y: 0 };

  clear_canvas.addEventListener("click", function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
  document.addEventListener("mousemove", draw);
  document.addEventListener("mousedown", setPosition);
  document.addEventListener("mouseenter", setPosition);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function setPosition(e) {
    pos.x = e.clientX - canvas.getBoundingClientRect().top;
    pos.y = e.clientY - canvas.getBoundingClientRect().top;
  }

  function draw(e) {
    // mouse left button must be pressed
    if (e.buttons !== 1) return;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#333";
    ctx.moveTo(pos.x, pos.y);
    setPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }
})();