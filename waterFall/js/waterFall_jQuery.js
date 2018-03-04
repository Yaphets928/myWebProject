$(function(){
    waterFallJQ();
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
        console.log(index);
    });
}