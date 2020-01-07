function WindowResize() {
    // 固定宽度
    // document.documentElement.style.fontSize = window.innerWidth > 1440 ? 1440 / 12 : window.innerWidth / 12 + "px";
    // 全屏展示
    document.documentElement.style.fontSize = document.body.clientWidth / 24 + "px";
}
window.MJStore = store.namespace("maiji");
document.addEventListener("DOMContentLoaded", function() {
    WindowResize();
});

window.onresize = function() {
    WindowResize();
};
window.onerror = function(){
}
