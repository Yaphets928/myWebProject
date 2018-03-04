window.onload=function(){
    // 第二行要计算高度
    waterFall('main','box');
    //获取后台的数据
    var dataInt= {"data":[{},{}]};
    //拖动滚动条 滚动条滚动20px 页面向下20px
    //若最下面一张图片的位置的高度露出一半了 就加载数据 所以要算出从顶部到这个盒子的一半的距离
    //offsettop可以获取到和父元素的距离
    window.onscroll=function(){
        if(checkScrollSlide){
            //将数据快渲染到当前页面尾部
            //先看后台给的JSON多少数据
            for(var i=0;i<dataInt.data.length;i++){
                //图片塞到pic的div中 然后在塞到box的div中
                var oBox = document.createElement('div');
                oBox.className='box';
                var oParent = document.getElementById('main');
                oParent.appendChild(oBox);
                var oPic = document.createElement('div');
                oPic.className='pic';
                oBox.appendChild(oPic);
                var oImg = document.createElement('img');
                oImg.src='images/'+dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            //新加的元素还没渲染
            waterFall('main','box');
        }
    }
}
// 操作main下class为box的盒子
function waterFall(parent,box) {
    // 将main下的class为box的盒子
    var oParent = document.getElementById(parent);
    //ie6以下原生js没有直接取class的
    var oBoxes = oParent.getElementsByClassName(box);
    //列数会随着窗口大小变化 要计算 页面宽度/box的宽
    var boxWidth = oBoxes[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / boxWidth);
    //设置main宽度和对齐
    oParent.style.width = boxWidth * cols + 'px';
    oParent.style.margin = 'auto';
    //第一行的高度 第二张第一张图片加到第一行高度最小的下面
    //数组后面会被修改为每列的高度
    var heightArr = [];
    for (var i = 0; i < oBoxes.length; i++) {
        if (i < cols) {
            heightArr.push(oBoxes[i].offsetHeight);
        } else {
            var minHeight = Math.min.apply(null, heightArr);
            //找索引
            var minHeightIndex = heightArr.indexOf(minHeight);
            oBoxes[i].style.position = "absolute";
            oBoxes[i].style.top = minHeight + 'px';
            oBoxes[i].style.left = oBoxes[minHeightIndex].offsetLeft + 'px';
            heightArr[minHeightIndex] += oBoxes[i].offsetHeight;
        }
        console.log(heightArr);
    }
}
//判断是否具备了加载数据库的条件
function checkScrollSlide(){
    var oParent = document.getElementById("main");
    var oBoxes = document.getElementsByClassName("box");
    var lastBoxHeight = oBoxes[oBoxes.length-1].offsetTop + Math.floor(oBoxes[oBoxes.length-1].offsetHeight/2);
    //标准模式用html元素获取滚动距离 混杂模式用body属性 下面这是滚走的距离
    var scrollHeight = document.body.scrollTop||document.documentElement.scrollTop;
    //再加上浏览器高度 混杂模式用body 标准模式用doc.docEle
    var height = scrollHeight+document.body.clientHeight||document.documentElement.clientHeight;
    //比较height和lastBoxHeight
    if(lastBoxHeight < height){
        return false;
    }else{
        return true;
    }
}




