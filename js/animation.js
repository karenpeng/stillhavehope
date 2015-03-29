var ratio;

function init() {
  resize();
}

function resize() {
  var w = window.innerWidth;
  document.getElementById('viz').setAttribute('width', (w - 400) + 'px');

}

init();

function animate(stack) {
    drawText(txt);
    translate()
  }
  //window.addEventListener('resize', resize);