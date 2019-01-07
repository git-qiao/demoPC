//首页JS入口函数
$(function () {


    //出场入场动画
    //首屏元素
    var aniHome = $('.home');
    aniHome.css('transform','translateY(-50%)').css('opacity','0.5')
    //第二屏
    var airplane = $('.airplane');
    //第三屏
    var pencil = $('.pencil');
    //第四屏
    var a_img = $('.about-img');
    //第五屏
    var t_tit = $('.team-title');
    var t_p = $('.team-p');
    var aniArr = [
        //一屏
        {
            aniIn: function () {
                aniHome.css('transform','translateY(0px)').css('opacity','1')
            },
            aniOut: function () {
                aniHome.css('transform','translateY(-50%)').css('opacity','0.5')
            }
        },
        //二屏
        {
            aniIn: function () {
                airplane.css('transform','translate(0px,0px)')
                // console.log(airplane)
            },
            aniOut: function () {
                airplane.eq(0).css('transform','translate(20%,10%)')
                airplane.eq(1).css('transform','translate(-10%,-20%)')
                airplane.eq(2).css('transform','translate(20%,20%)')
            }
        },
        //三屏
        {
            aniIn: function () {
                pencil.css('transform','translate(0px,0px)')
            },
            aniOut: function () {
                pencil.eq(0).css('transform','translate(10%,20%)')
                pencil.eq(1).css('transform','translate(-10%。30%)')
                pencil.eq(2).css('transform','translate(20%,20%)')
            }
        },
        //四屏
        {
            aniIn: function () {
                a_img.css('transform','rotate(0deg)')
            },
            aniOut: function () {
                a_img.eq(0).css('transform','rotate(45deg)')
                a_img.eq(1).css('transform','rotate(-45deg)')
            }
        },
        //五屏
        {
            aniIn: function () {
                t_tit.css('transform','translateX(0)')
                t_p.css('transform','translateX(0)')
            },
            aniOut: function () {
                t_tit.css('transform','translateX(-10%)')
                t_p.css('transform','translateX(10%)')
            }
        }
    ];
    //入场动画初始化
    aniArr.forEach(function (val) {
        val.aniOut()
    })

    // 页面nav切换，每屏切换
    function homeNavPageSlide(){
        //头部nav点击切换
        var arrow = $('.arrow');
        var aArr = $('.nav a');
        var ul = $('.content-ul');
        var pageDot = $('.page-dot li');
        var ind = 0;  //修改它改变显示第几屏幕
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
            //入场动画
            aniArr[index].aniIn()
        }
        //默认显示第ind个
        aAni(ind);
        //给每个nav上的a绑定点击事件
        aArr.on('click',function () {
            //出场动画
            aniArr[ind].aniOut();
            $(aArr).eq(ind).removeClass('current');
            pageDot.eq(ind).removeClass('current');
            ind = $(this).attr('index');
            aAni(ind)
        });
        // 给每个page指示点添加事件
        pageDot.on('click',function () {
            $(aArr).eq(ind).removeClass('current');
            pageDot.eq(ind).removeClass('current');
            //出场动画
            aniArr[ind].aniOut()
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
                //出场动画
                aniArr[ind].aniOut()
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
            // lastTime = new Date().getTime()

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
        var musicIcon = $('.music-icon img');
        var musicParDom = $('.music-icon');
        // alert(musicDom[0].paused)
        musicParDom[0].flag=1;
        musicParDom.click(function () {
            if (musicParDom[0].flag == 1){
                musicDom[0].play();
                musicParDom[0].flag = 2;
                this.title = '点击暂停';
                musicIcon[0].src = './imgs/musicon.gif'
            }else{
                this.title = '点击播放';
                musicParDom[0].flag = 1;
                musicDom[0].pause();
                musicIcon[0].src = './imgs/musicoff.gif'
            }
        })
    }
    musicPlay()

    //第五屏气泡和透明度设置
    function teamHabdle(){
        var pers = $('.team-persons li');
        pers.each(function (i,val) {
            $(val).attr('index',i);
        })
        var wid = pers.width();
        var per = $('.team-persons');
        var cvs=null;
        var x=0;
        var conTimer1 = null;
        var conTimer2 = null;
        // 为了只创建一个canvas在ul中跟随li移动，这里的场景是，鼠标移入绑定在li上，鼠标移出绑定在ul上
        // 鼠标移入到每个li上
        pers.mouseenter(function () {
            $(this).css('opacity',1).siblings('li').css('opacity',0.5);
            //创建画板
            if (cvs){
                x = wid*$(this).attr('index');
                cvs.css('left',x)
                return;
            }
            cvs = $('<canvas width="236" height="448"></canvas>');
            cvs.addClass('cvs');
            per.append(cvs);
            x = wid*$(this).attr('index');
            cvs.css('left',x);

            bubble(cvs[0]);

        });
        //鼠标移出ul
        per.mouseleave(function () {
            pers.css('opacity',1);
            //移除canvas并且赋值为null
            cvs.remove();
            cvs=null;
            //清除定时器
            clearInterval(conTimer1);
            clearInterval(conTimer2);
        });
        //气泡运动
        function bubble(cvs){
            if (cvs.getContext) {
                // 需要操作的数据
                var x,y,c_r,opacity=1,arr=[],scal,deg=0,newX,newY;
                var ctx = cvs.getContext('2d');
                // 生成圆控制数量
                conTimer = setInterval(function(){
                    x = Math.round(Math.random()*cvs.width);
                    y = cvs.height;
                    c_r = Math.round(Math.random()*10 + 4);
                    scal = Math.round(Math.random()*10 + 10);
                    arr.push({
                        x:x,
                        y:y,
                        c_r:c_r,
                        opacity: opacity,
                        scal:scal,
                        deg:deg
                    })

                },120);
                //画出圆
                conTimer = setInterval(function(){
                    ctx.clearRect(0,0,cvs.width,cvs.height);
                    arr.forEach(function(val,i){
                        val.deg+=5;
                        var rad = val.deg*Math.PI/180;
                        newX = Math.floor(val.x + Math.sin(rad)*val.scal);
                        newY = Math.floor(val.y - rad*val.scal);
                        val.opacity -= 0.004;
                        if (val.opacity<=0 || newY<=0) {
                            arr.splice(i,1);
                            return ;
                        }
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(255,255,255,'+val.opacity+')';
                        ctx.arc(newX,newY,val.c_r,0,2*Math.PI);
                        ctx.fill()
                    })

                },1000/60)
            }
        }

    }
    teamHabdle()

})