//首页JS入口函数
$(function () {

    // 页面nav切换，每屏切换
    function homeNavPageSlide(){
        //头部nav点击切换
        var arrow = $('.arrow');
        var aArr = $('.nav a');
        var ul = $('.content-ul');
        var pageDot = $('.page-dot li');
        var ind = 4;  //修改它改变显示第几屏幕
        var contentHeight = ul.height();
        var timer = null;
        aArr.each(function (index,val) {
            $(val).attr('index',index)
        });
        pageDot.each(function (index,val) {
            $(val).attr('index',index)
        });
        function aAni(index){
            disArrow = aArr.eq(index).offset().left+aArr.eq(index).width()/2-arrow.width()/2;
            aArr.eq(index).addClass('current');
            arrow.css('left',disArrow);
            //pagedot的显示
            pageDot.eq(index).addClass('current')
            //屏幕的滚动
            ul.css('top',-index*contentHeight)
        }
        //默认显示第一个
        aAni(ind);
        //给每个nav上的a绑定点击事件
        aArr.on('click',function () {
            $(aArr).eq(ind).removeClass('current');
            pageDot.eq(ind).removeClass('current');
            ind = $(this).attr('index');
            aAni(ind)
        });
        // 给每个page指示点添加事件
        pageDot.on('click',function () {
            $(aArr).eq(ind).removeClass('current');
            pageDot.eq(ind).removeClass('current');
            ind = $(this).attr('index');
            aAni(ind);
        })
        //窗口大小改变时
        $(window).resize(function () {
            contentHeight = ul.height()
            aAni(ind)
        });

        //测试JQ绑定鼠标滚轮事件
        $(document).on("mousewheel DOMMouseScroll", function (e) {
            var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
            clearTimeout(timer);

            //函数防抖 ：防止函数多次调用，优化性能，规定时间内调用函数，只有最后一次生效
            timer = setTimeout(function () {
                $(aArr).eq(ind).removeClass('current');
                pageDot.eq(ind).removeClass('current')
                if (delta > 0) {
                    // 向上滚
                    ind--;
                    if(ind < 0){
                        ind=0
                    }
                    aAni(ind)
                } else if (delta < 0) {
                    // 向下滚
                    ind++;
                    if(ind > 4){
                        ind=4
                    }
                    aAni(ind)
                }
            },200)
        });
    }
    homeNavPageSlide()

    // 首屏效果轮播
    function homeScreen(){
        var ind = 0;
        var lastInd = 0;
        var liArr = $('.home-carousel li');
        var dotArr = $('.home-dot li');
        var timer = null;
        var lastTime = 0;
        var nowTime = 0;
        liArr.each(function (ind,val) {
            $(val).attr('index',ind)
        });
        dotArr.each(function (ind,val) {
            $(val).attr('index',ind)
        });

        //点击原点进行切换
        dotArr.click(function () {
            //函数截流 解决动画没执行完就能进行点击的问题
            nowTime = new Date().getTime()
            if(nowTime - lastTime <1800)return; //间隔小于2s直接不能点击

            //能进行点击时将给最近一次点击重新赋值
            lastTime = nowTime;

            //点击的index值
            ind = $(this).attr('index');
            if (ind == lastInd) return;
            liArr.removeClass();//清空所有的类名
            //切换原点
            dotArr.eq(lastInd).removeClass('current')
            dotArr.eq(ind).addClass('current')
            // dotArr.eq(lastInd)
            if (ind > lastInd){
                liArr.eq(ind).addClass('rightShow')
                liArr.eq(lastInd).addClass('leftHide')
                lastInd = ind
            }
            if(ind < lastInd){
                // console.log(nowInd,lastInd)
                liArr.eq(ind).addClass('leftShow')
                liArr.eq(lastInd).addClass('rightHide')
                lastInd = ind
            }
        })

        //设置定时器
        timer = setInterval(function () {
            setInteHandle()
        },2500)

        //鼠标移入移出banner区域关闭和开启定时器
        $('.home').mouseenter(function () {
            clearInterval(timer)
        }).mouseleave(function () {
            timer = setInterval(setInteHandle,2500)
        })

        //定时器函数
        function setInteHandle(){
            // 解决bug,首屏轮播切换点不在ul内时，鼠标悬停不能停止定时器的情况下，不能在动画切换的过程中进行点击
            //本次布局中不存在这种现象，但是要注意
            lastTime = new Date().getTime()

            ind++
            if (ind>=4){
                ind = 0
            }
            liArr.removeClass();
            //切换原点
            dotArr.eq(lastInd).removeClass('current')
            dotArr.eq(ind).addClass('current')
            //切换每一屏
            liArr.eq(ind).addClass('rightShow')
            liArr.eq(lastInd).addClass('leftHide')
            lastInd = ind
        }
        
    }
    homeScreen();

    // 音乐播放
    function musicPlay(){
        var musicDom = $('.music-icon audio');
        var musicParDom = $('.music-icon');
        // alert(musicDom[0].autoplay)
        musicParDom[0].flag=1
        musicParDom.click(function () {
            if (musicParDom[0].flag == 1){
                musicDom[0].play();
                musicParDom[0].flag = 2;
                this.title = '点击暂停';
            }else{
                this.title = '点击播放';
                musicParDom[0].flag = 1;
                musicDom[0].pause();
            }
        })
    }
    musicPlay()

    //


})