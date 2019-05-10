"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

  // Trackpad

  var SignTool = function () {
    function SignTool() {
      _classCallCheck(this, SignTool);

      this.initVars();
      this.initEvents();
    }

    _createClass(SignTool, [{
      key: "initVars",
      value: function initVars() {
        this.canvas = document.querySelector(".trackpad-test canvas");
        this.ctx = this.canvas.getContext("2d");
        this.isMouseClicked = false;
        this.isMouseInCanvas = false;
        this.prevX = 0;
        this.currX = 0;
        this.prevY = 0;
        this.currY = 0;
      }
    }, {
      key: "initEvents",
      value: function initEvents() {
        var _this = this;

        var canvas = document.querySelector(".trackpad-test canvas");
        canvas.addEventListener("mousemove", function (e) {
          return _this.onMouseMove(e);
        });
        canvas.addEventListener("mousedown", function (e) {
          return _this.onMouseDown(e);
        });
        canvas.addEventListener("mouseup", function () {
          return _this.onMouseUp();
        });
        canvas.addEventListener("mouseout", function () {
          return _this.onMouseOut();
        });
        canvas.addEventListener("mouseenter", function (e) {
          return _this.onMouseEnter(e);
        });
      }
    }, {
      key: "onMouseDown",
      value: function onMouseDown(e) {
        this.isMouseClicked = true;
        this.updateCurrentPosition(e);
      }
    }, {
      key: "onMouseUp",
      value: function onMouseUp() {
        this.isMouseClicked = false;
      }
    }, {
      key: "onMouseEnter",
      value: function onMouseEnter(e) {
        this.isMouseInCanvas = true;
        this.updateCurrentPosition(e);
      }
    }, {
      key: "onMouseOut",
      value: function onMouseOut() {
        this.isMouseInCanvas = false;
      }
    }, {
      key: "onMouseMove",
      value: function onMouseMove(e) {
        if (this.isMouseClicked && this.isMouseInCanvas) {
          this.updateCurrentPosition(e);
          this.draw();
        }
      }
    }, {
      key: "updateCurrentPosition",
      value: function updateCurrentPosition(e) {
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - this.canvas.offsetLeft;
        this.currY = e.clientY - this.canvas.offsetTop;
      }
    }, {
      key: "draw",
      value: function draw() {
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
    }]);

    return SignTool;
  }();

  var canvass = new SignTool();
})();