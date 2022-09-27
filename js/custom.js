$(function () {


    // 변수선언
    var visualWrap = $("#brandVisual"),
      slide = visualWrap.find(".visual_slide>li"),
      slideCount = slide.length,
      stopTimer,
      leftBtn=visualWrap.find(".btnImg>.prev"),
      rightBtn=visualWrap.find(".btnImg>.next"),
      pager=visualWrap.find(".buttonList>li"),
      current = 0;
    /* **
    슬라이드 위치 설정
    * */
  
    var slidePos = slide.each(function (i) {
      $(this).css("left", i * 100 + "%");
    });
  
    /**
     * 슬라이드 이미지부분 - setinterval
     * 슬라이드 인덱스 번호를 반환
     * * */
    timer();
    
    // autoplay 함수
    function timer() {
      stopTimer=setInterval(function () {
        var prev = slide.eq(current);//0
        move(prev,0,"-100%")
        var prevPager = pager.eq(current);
        current++;//1
        if(current == slideCount){
          current=0
        }
        var next=slide.eq(current);//1
        move(next,"100%","0%")
        var nextPager=pager.eq(current);
        nextPager.addClass("on");
      }, 2000);
    }
  
    /**
     * 슬라이드 애니메이트
     * * */
    function move(tg, start, end) {
      tg.css("left", start).stop().animate({ left: end }, 1000);
    }
  

  
  //  좌우버튼 UI
  rightBtn.click(function(){
    var prev = slide.eq(current);//0
    move(prev,0,"-100%")
    var prevPager = pager.eq(current);
    prevPager.removeClass('on');
  
  
        current++;//1
        if(current == slideCount){
          current=0
        }
        var next=slide.eq(current);//1
        move(next,"100%","0%");
        var nextPager=pager.eq(current);
        nextPager.addClass("on");
  })
  
  leftBtn.click(function(){
    var prev = slide.eq(current);//0
        move(prev,0,"100%") //slide.eq(0),0,100%
        var prevPager = pager.eq(current);
        prevPager.removeClass('on');
  
        current--;//1
        if(current < 0){
          current = slideCount-1;
        }
        var next=slide.eq(current);//2
        move(next,"-100%","0%");
        var nextPager=pager.eq(current);
        nextPager.addClass("on");
  });
  
  // pager UI
  pager.click(function(){
    var tg=$(this);
    var i= tg.index();
    pager.removeClass('on');
    tg.addClass('on');
    pagerMove(i);
  });
  
  
  function pagerMove(i){
    var currentEl=slide.eq(current);
    var nextEl=slide.eq(i);
    currentEl.css("left","%0").stop().animate({left:"-100%"},500)
    nextEl.css("left","100").stop().animate({left:"0%"},500)
    current = i;
  }
  //카운터 동적생성
  var counterEl="<div class='counter'>1";
  $("#wrap").append(counterEl);
  
  }); //jQuery
  
  
  

  /* news_slider */
  var slideWrapper = $('.first_news'),
   slides = slideWrapper.find('.news_slider'),
    slide = slides.find('li'),
    currentIdx = 0,
    slideCount = slide.length,
    slideWidth = slide.width(),
    slideGap = 33,
    moveAmt, //  가변적으로 슬라이드 갯수가 얼마냐에따라 달라짐 slideWidth+slideGap 움직일 너비
    prevBtn = slideWrapper.find('.prev'),
    nextBtn = slideWrapper.find('.next'),
    indicator = $('.pager'),
    newSlideWidth, 
    indicatorHTML = '',
    responsiveGap=20,
    maxSlides=3, //한번에 보이는 li 갯수
    newslides, //clone 된 요소를 담을 변수

    newSlideWidth=slideWidth;

    // indicator 추가
slide.each(function(i){
    indicatorHTML+='<a href="#">'+(i+1)+'</a>'
    // indicatorHTML+='<a href="#">'+(i+1)+'</a>' -> 1 2 3 4 5 다 나옴 / += : 값이 하나씩 더해진다.
    // indicatorHTML='<a href="#">'+(i+1)+'</a>' -> 5만 나옴 / = : 재할당한다.
})
indicator.html(indicatorHTML)

    // 복사본 생성
    // append : 원본 뒤 추가 / clone : 복사 / prepend : 원본 앞에 추가
slides.append(slide.clone().addClass("clone"));
slides.prepend(slide.clone().addClass("clone"));
    // 가로 배치
function slideLayout(sw,sm){
    newSlides=$('.slide_wrapper li');
    moveAmt=sw+sm;

    newSlides.each(function(idx){
        $(this).css('left',moveAmt*idx+'px')
    })
}
slideLayout(slideWidth,slideGap);

    // 슬라이드 이동함수
function MoveSlide(num){
    slides.stop().animate({left:moveAmt*-num},100,function(){
        if(currentIdx==slideCount || currentIdx == -slideCount){
            slides.css('left',0)
            currentIdx=0
        }
    })
    currentIdx=num
}

    // 좌우버튼
nextBtn.click(function(){
        MoveSlide(currentIdx+1)
})
prevBtn.click(function(){
        MoveSlide(currentIdx-1)
})

    // 중앙배치
function setslidePos(){
    var ulMoveAmt= - moveAmt*slideCount + 'px';
    slides.css('transform',"translateX("+ ulMoveAmt+")")
}
setslidePos()

    //인디케이터
indicator.find('a').click(function(){
    var ci=$(this).index()
    MoveSlide(ci)
})
    // 자동슬라이드
var timer=undefined
function autoSlide(){
    if(timer==undefined){
        timer=setInterval(function(){
            MoveSlide(currentIdx+1)
        },3000)
    }
}
autoSlide()
function stopSlide(){
    clearInterval(timer)
    timer=undefined
}
slideWrapper.mouseenter(function(){
    stopSlide()
})
slideWrapper.mouseleave(function(){
    autoSlide()
})

//반응형슬라이드
$(window).resize(function(){
    var winWidth=$(this).width();
   if(winWidth<700){
    console.log(slides.width(),newSlideWidth);
    responsiveGap=20;
    newSlideWidth=(slides.width()-responsiveGap*(maxSlides-1))/
    maxSlides;
   }
   else{
    newSlideWidth=slideWidth;
    responsiveGap=slideGap;
   }
   if(winWidth<=500){
    newSlideWidth=slides.width();
    maxSlides=1;
    responsiveGap=0;
   }
   slideLayout(newSlideWidth, responsiveGap);
   setslidePos();
})