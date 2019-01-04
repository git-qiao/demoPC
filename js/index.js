//首页JS入口函数
$(function () {
    //头部nav点击切换
    var arrow = $('.arrow');
    var aArr = $('.nav a');
    var ind = 0;
    aArr.each(function (index,val) {
        $(val).attr('index',index)
    })
    function aAni(index){
        disArrow = aArr.eq(index).offset().left+aArr.eq(index).width()/2-arrow.width()/2;
        aArr.eq(index).addClass('current')
        arrow.css('left',disArrow)
    }

    //默认显示第一个
    aAni(ind)
    //给每个a绑定点击事件
    aArr.on('click',function () {
        $(aArr).eq(ind).removeClass('current');
        ind = $(this).attr('index');
        aAni(ind)
    })
    //窗口大小改变时
    $(window).resize(function () {
        aAni(ind)
    })


})