//首页JS入口函数
$(function () {
    //头部nav点击切换
    var arrow = $('.arrow');
    var aArr = $('.nav a');
    var ul = $('.content-ul');
    var ind = 0;
    var contentHeight = ul.height();
    aArr.each(function (index,val) {
        $(val).attr('index',index)
    });
    function aAni(index){
        disArrow = aArr.eq(index).offset().left+aArr.eq(index).width()/2-arrow.width()/2;
        aArr.eq(index).addClass('current');
        arrow.css('left',disArrow);
    }

    //默认显示第一个
    aAni(ind);
    //给每个a绑定点击事件
    aArr.on('click',function () {
        $(aArr).eq(ind).removeClass('current');
        ind = $(this).attr('index');
        aAni(ind)
        ul.css('top',-ind*contentHeight)
    });
    //窗口大小改变时
    $(window).resize(function () {
        aAni(ind)

        contentHeight = ul.height()
        ul.css('top',-ind*contentHeight)
    });

    //测试JQ绑定鼠标滚轮事件
    $(document).on("mousewheel DOMMouseScroll", function (e) {
        var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
            (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
        $(aArr).eq(ind).removeClass('current');
        if (delta > 0) {
            // 向上滚
            ind--;
            if(ind < 0){
                ind=0
            }
            ul.css('top',-ind*contentHeight)
            aAni(ind)
        } else if (delta < 0) {
            // 向下滚
            ind++;
            if(ind > 4){
                ind=4
            }
            ul.css('top',-ind*contentHeight)
            aAni(ind)
        }
    });

})