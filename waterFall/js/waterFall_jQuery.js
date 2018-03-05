$(function(){
    waterFallJQ();
    //获取后台的数据
    var dataInt= {"data":[{"src":"0.png"},{"src":"1.png"},{"src":"2.png"},{"src":"微信图片_20180304173209.jpg"},{"src":"23.png"}]};
    $(window).on('scroll',function(){
        if(checkScrollSlide){
            $.each(dataInt.data,function(key,value){
            var oBox=$('<div></div>').addClass('box').appendTo($('#main'));
            var oPic=$('<div></div>').addClass('pic').appendTo(oBox);
            var oImg=$('<img />').attr('src','img/'+$(value).attr('src'));
            oImg.appendTo($(oPic));
            });
            waterFallJQ();
        }
    });
});

function waterFallJQ(){
    var $boxes = $('.box');
    //计算每列的宽度 width获取定义的宽度 outerWidth包括padding和border outerWidth(true)包含margin
    var widthPerBox = $boxes.eq(1).outerWidth();
    //获取列数
    var cols =Math.floor($(window).width()/widthPerBox);
    //width这个方法不需要宽度
    $('#main').width(cols*widthPerBox).css('margin','0 auto');
    var heightArr =[];
    //jq中遍历可以用$.each
    $boxes.each(function(index,value){
        var height=$boxes.eq(index).outerHeight();
        if(index<cols){
            heightArr[index]=height;
        }else{
            var minH=Math.min.apply(null,heightArr);
            var minHIndex = $.inArray(minH,heightArr);
            //value保存的是每一个div对象 value要转jq对象
            $(value).css({
                'position':'absolute',
                'top':minH+'px',
                'left':minHIndex*widthPerBox+'px',
            });
            heightArr[minHIndex]+=$boxes.eq(index).outerHeight();
        }

    });
}
function checkScrollSlide(){
    var $lastBox = $('.box').last;
    var lastBoxTopHalf = $lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();
    return (lastBoxTopHalf < scrollTop+documentH);

}