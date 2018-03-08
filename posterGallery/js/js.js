// let photo = document.getElementsByClassName('photo');
// console.log("取到了要设置翻转的photo:"+photo.id+' '+photo.className);
function turn(elem) {
    let cls = elem.className;
    let n=elem.id.split("_")[1];
    if(!/photo_center/.test(cls)){
        return rsort(n);
    }
    if (/photo_front/.test(cls)) {
        cls = "photo photo_center photo_back";
        g('#nav_'+n).className +=' i_back';
    } else {
        cls = "photo photo_center photo_front";
        g('#nav_'+n).className =g('#nav_'+n).className.replace(/\s*i_back\s*/,' ');
    }
    //  /photo_front/.test(cls) 如果存在 .photo_front，返回TRUE，否则返回FALSE

    return elem.className=cls;

}


// 通用函数
function g(selector) {
    let m = selector.substr(0,1);
    // console.log(m);
    let method;
    m == '.' ? method = 'getElementsByClassName' : method = 'getElementById';
    // console.log(method);
    return document[method](selector.substr(1))
}

//输出所有的海报

function addPhotos(){
    let template = g('#wrap').innerHTML;
    // console.log("template:"+template);
    let html=[];
    let nav=[];
    for(s in data){
        let _html= template.replace('{{index}}',s).replace('{{img}}',data[s].img).replace('{{caption}}',data[s].caption).replace('{{desc}}',data[s].desc);
        html.push(_html);
        nav.push('<span id="nav_'+s+'" onclick="turn(g(\'#photo_'+s+'\'))" ' +
            'class="i">&nbsp;</span>');
    }
    html.push('<div class="nav">'+nav.join('')+'</div>');
    // console.log("html"+html);
    g('#wrap').innerHTML=html.join('');
    // alert("add diao yong le");
    rsort(selectFrom(1,data.length));
}
addPhotos();

//排序海报
function rsort(n){
    let photo_all = g('.photo');
    let photos=[];

    for(let i = 0;i<photo_all.length;i++){
        photo_all[i].className.replace(/\s*photo_center\s*/,'');
        photos.push(photo_all[i]);
    }
    //photo是一个真正的数组 要把photo——center删掉
    let photo_center = g('#photo_'+n);
    // console.log(photo_center.className);
    photo_center.className+=' photo_center';
    // console.log('添加后'+photo_center.className);
    photos.splice(n,1);
    //把海报分为左右两个部分
    let photos_left = photos.splice(0,Math.ceil(photos.length/2));
    let photos_right = photos;
    let ranges = range();
    for(s in photos_left){
        let photo = photos_left[s];
        photo.style.left=selectFrom(ranges.left.x[0],ranges.left.x[1])+'px';
        photo.style.top=selectFrom(ranges.left.y[0],ranges.left.y[1])+'px';
        photo.style['-webkit-transform']=`rotate(${selectFrom(-150,150)}deg`;
    }
    for(s in photos_right){
        let photo = photos_right[s];
        photo.style.left=selectFrom(ranges.right.x[0],ranges.right.x[1])+'px';
        photo.style.top=selectFrom(ranges.right.y[0],ranges.right.y[1])+'px';
        photo.style['-webkit-transform']=`rotate(${selectFrom(-150,150)}deg`;
    }
    let navs = g('.i');
    for(let s=0;s<navs.length;s++){
        navs[s].className =navs[s].className.replace(/\s*i_current\s*/,' ');
        navs[s].className =navs[s].className.replace(/\s*i_back\s*/,' ');
    }
    g('#nav_'+n).className += ' i_current ';
}

//随机生成照片序号
function selectFrom(min,max){
    //1-20
    let choices = max-min+1;
    return Math.floor(Math.random()*choices)+min;
}
//z在后面无序排列的图片  有一个分布范围
//左分区x要大于0-photo.width小于wrap.width/2-photo.width/2
//计算左右分区
function range(){
    let range = {
        left:{x:[],y:[]},
        right:{x:[],y:[]}
    }
    let  wrap = {
        width:g('#wrap').clientWidth,
        height:g('#wrap').clientHeight
    }
    let photo = {
        width:g('.photo')[0].clientWidth,
        height:g('.photo')[0].clientHeight
    }
    range.left.x=[0-photo.width,wrap.width/2-photo.width];
    range.left.y=[0-photo.height,wrap.height];
    range.right.x=[wrap.width/2,wrap.width];
    range.right.y=[0-photo.height,wrap.height];
    return range;

}
