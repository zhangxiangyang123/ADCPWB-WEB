//自定义删除数组中某一项的方法
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
//const _url ="../powerTest/static/pack.doc"
// const _url ="../dongli/static/pack.doc"
const _url ="./static/pack.doc"
export default _url