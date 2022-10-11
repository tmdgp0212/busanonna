const a = document.querySelectorAll('a');
a.forEach(function(item){
    const href = item.getAttribute('href')

    if(href === '#'){
        item.addEventListener('click',function(evt){evt.preventDefault()});
    }else{
        return;
    }
});

/* 헤더 네비게이션 구현 */
{

    const $header = document.querySelector('header>.header_container');
    const $mnus = document.querySelectorAll('header>.header_container>nav>.gnb>li');
    const $articles = document.querySelectorAll('.contents>article');
    const $top = document.querySelector('aside>a');
    const $logo = document.querySelector('header>.header_container>h1.logo');
    const headerTop = $header.parentElement.offsetTop;
    
    let scrollTop = window.scrollY;
    let nowIdx = 0;
    let oldIdx = 0;
    const articleTop = [];

    $articles.forEach(function(article){
        articleTop.push(article.offsetTop - 80);
    });

    const headerFixer = () => {
        // 헤더 조건부 fixed
        if(scrollTop > headerTop){
            $header.style.position = 'fixed';
            $header.style.top = 0;
        }else{
            $header.style.position = 'relative'
        }        
    }

    window.addEventListener('scroll',function(){
        scrollTop = window.scrollY;
        headerFixer();

        //nav스크롤링
        articleTop.forEach(function(topVal,idx){
            if(scrollTop >= topVal - 150){
                oldIdx = nowIdx;
                nowIdx = idx;

                $mnus[oldIdx].classList.remove('on');
                $mnus[nowIdx].classList.add('on'); 
            }else if(scrollTop < articleTop[0]){
                $mnus[oldIdx].classList.remove('on');
            }
        });
        
    });

    headerFixer();

    $mnus.forEach(function($mnu,idx){
        $mnu.addEventListener('click',function(evt){
            evt.preventDefault();

            window.scrollTo({top : articleTop[idx], behavior:'smooth'});
        });
    });

    $top.addEventListener('click',function(evt){
        evt.preventDefault();

        window.scrollTo({top: 0, behavior:'smooth'});
    });

    $logo.addEventListener('click',function(evt){
        evt.preventDefault();

        window.scrollTo({top: 0, behavior:'smooth'});
    });

}

/* 비쥬얼영역 fade 전환 */
{

    const $fadeFrame = document.querySelectorAll('.visual>.visual_container>.fade-frame');
    const $indicators = document.querySelectorAll('.visual>.visual_container>.active>li');
    const $autoPlayBtn = document.querySelector('.visual>.visual_container>.auto_play');
    const maxIndex = $fadeFrame.length - 1;

    let nowIdx = 0; 
    let oldIdx = 0;
    let intervalKey;

    const autoPlay = () => {
        intervalKey = setInterval(function(){

        oldIdx = nowIdx;
        nowIdx < maxIndex ? nowIdx++ : nowIdx = 0;

        fadeVisual(nowIdx,oldIdx)
        },3500);
    }

    const fadeVisual = (nowIdx,oldIdx) => {
        $fadeFrame[nowIdx].classList.add('on');
        $indicators[nowIdx].classList.add('on');
        
        if(nowIdx === oldIdx){
            return;
        } else {
        $indicators[oldIdx].classList.remove('on'); 
        $fadeFrame[oldIdx].classList.remove('on');
        }
    }

    autoPlay();

    $indicators.forEach(function(indicator,idx){
        indicator.addEventListener('click',function(evt){
            evt.preventDefault();

            oldIdx = nowIdx;
            nowIdx = idx;
            fadeVisual(nowIdx,oldIdx)
        });
    });

    $autoPlayBtn.addEventListener('click',function(){
        
        if(this.classList.contains('pause')){
            autoPlay();
            this.classList.remove('pause');
            
        }else{
            this.classList.add('pause');
            clearInterval(intervalKey)
        }

    });

}

/* 본문 추천여행지 슬라이드 */
{

const slideBox = document.querySelectorAll('.contents>.recommend>.slide-wrapper>ul');
const guideBox = document.querySelectorAll('.contents>.recommend>.guide');
const prevBtns = document.querySelectorAll('.contents>.recommend>.slide-wrapper>.prev');
const nextBtns = document.querySelectorAll('.contents>.recommend>.slide-wrapper>.next');

let recommendIdx = 0;
let slideIdx = [0,0,0];

const slideFn  = () => {
    slideBox[recommendIdx].style.marginLeft = (-464 * slideIdx[recommendIdx]) - 220 + 'px';

    const guides = Array.from(guideBox[recommendIdx].children);
    guides.forEach(function(guide){
        guide.classList.remove('on');
    });
  
    guideBox[recommendIdx].children[slideIdx[recommendIdx]].classList.add('on');
}

let testIdx;
slideBox.forEach(function(eachBox){
    const chlidrenLength = eachBox.childElementCount;
    eachBox.style.width = chlidrenLength*464+'px';

    eachBox.addEventListener('click',function(evt){
        for(let i = 0; i < slideBox.length; i++){
            if(slideBox[i] === evt.currentTarget){
                recommendIdx = i;
            }
        }

        for(let i = 0; i < this.childElementCount; i++){
            if(this.children[i] === evt.target.parentElement){
                slideIdx[recommendIdx] = i;
            }
        }
        
        slideFn();
    });
});

prevBtns.forEach(function(prevBtn,btnIdx){
    prevBtn.addEventListener('click',function(evt){
        evt.preventDefault();
    
        const maxLength = this.previousElementSibling.childElementCount;
        
        recommendIdx = btnIdx;
        let nowIdx = slideIdx[recommendIdx];
        nowIdx > 0 ? nowIdx-- : nowIdx = maxLength - 1;
        slideIdx[recommendIdx] = nowIdx;

        slideFn();
    });
});

nextBtns.forEach(function(nextBtn,btnIdx){
    nextBtn.addEventListener('click',function(evt){
        evt.preventDefault();
    
        const maxLength = this.previousElementSibling.previousElementSibling.childElementCount;

        recommendIdx = btnIdx;
        let nowIdx = slideIdx[recommendIdx];
        nowIdx < maxLength - 1 ? nowIdx++ : nowIdx = 0;
        slideIdx[recommendIdx] = nowIdx;

        slideFn();
    });
});

}

/* 뉴스 슬라이드 */
{

    const $news = document.querySelector('.contents>.news>.upper>.news_container>.news_slide>ul');
    const $upBtn = document.querySelector('.contents>.news>.upper>.news_container>.buttons>.up')
    const $downBtn = document.querySelector('.contents>.news>.upper>.news_container>.buttons>.down')
    const $pause = document.querySelector('.contents>.news>.upper>.news_container>.buttons>span')
    const maxIndex = $news.childElementCount - 3;

    let nowIdx = 0;
    let intervalKey;

    const autoPlay = function(){
        intervalKey = setInterval(function(){
            $downBtn.click();
        },2000);
    }

    $upBtn.addEventListener('click',function(){
        nowIdx > 0 ? nowIdx-- : nowIdx = maxIndex;       
        $news.style.top = -41 * nowIdx + 'px';
    });
    
    $downBtn.addEventListener('click',function(){
        nowIdx < maxIndex ? nowIdx++ : nowIdx = 0;       
        $news.style.top = -41 * nowIdx + 'px';
    });

    $pause.addEventListener('click',function(evt){
        evt.preventDefault();

        if(this.classList.contains('pause')){
            clearInterval(intervalKey);
            this.classList.remove('pause');
        }else{
            autoPlay();
            this.classList.add('pause');
        }
    });

    autoPlay();

}