// 鼠标跟随效果
var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext("2d");
var starlist = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
init();
window.onresize = init;

canvas.addEventListener('mousemove', function (e) {
    starlist.push(new Star(e.offsetX, e.offsetY));
    console.log(starlist)
})

function random(min, max) {
    return Math.floor((max - min) * Math.random() + min);
}

function Star(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2.5;
    this.vy = (Math.random() - 0.5) * 2.5;
    this.color = 'rgb(' + random(0, 200) + ',' + random(0, 200) + ',' + random(0, 200) + ')';
    this.a = 1;
    console.log(this.color);
    this.draw();
}
Star.prototype = {
    draw: function () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.globalCompositeOperation = 'lighter'
        ctx.globalAlpha = this.a;
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
        ctx.fill();
        this.updata();
    },
    updata() {
        this.x += this.vx;
        this.y += this.vy;
        this.a *= .98;
    }
}
console.log(new Star(150, 200));

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    starlist.forEach((item, i) => {
        item.draw();
        if (item.a < 0.05) {
            starlist.splice(i, 1);
        }
    })

    requestAnimationFrame(render);
}
render();