document.addEventListener("DOMContentLoaded", function(){

  var docBody=document.querySelector('body');
  var header=document.querySelector("header");
  var navA=document.querySelectorAll(".nav-a");
  var home=document.querySelector("#home");
  var nav=document.querySelector("#nav-bar");
  var navMobileCheck=document.querySelector("#nav-mobile-bar-checkBox");
  var circles=document.querySelectorAll(".circle");
  var aboutBtn=document.querySelectorAll(".p-btn");
  var scrollUpBtn=document.querySelector("#scroll-up");

  var win=window;
  var cnt; //  Counter used in loops
  var navIcon;  //  holder for small screen menu

  //  Set Home Screen to Window Width and Height on Load
  function resizeElement(){
    var x=win.innerWidth||docBody.clientWidth;
    var y=win.innerHeight||docBody.clientHeight;
    home.style.height=y+"px";
    console.log(x+","+y);
    //  Make sure to 'uncheck' mobile menu on resize
    navMobileCheck.checked=false;
  }

  var scrollUp=function(element, to, duration) {
    if (duration <= 0) return;
    var move = to - element.scrollTop;
    console.log("moving-"+ move);
    var perpx = move / duration * 10;

    setTimeout(function() {
      element.scrollTop = element.scrollTop + perpx;
      if (element.scrollTop == to) return;
      scrollUp(element, to, duration - 10);
    }, 10);
  }

  //  Set Home Screen to Window Width and Height on Window Resize
  win.addEventListener("resize", resizeElement);

  //  Find Scroll Position and transform NavBar to Fixed
  win.addEventListener("scroll", function(event){
    if(!home){
      var px=110;
    }
    else if (home.style.height != ""){
      var px=home.style.height;
      px=px.replace(/px/,"");
    }
    else {
      // Set to min-height because on page refresh not capturing
      var px=568;
    }
    px=Number(px);
    console.log("Bottom is "+ px);

    // Going to use this point in scroll position to hide scrollUpBtn
    var pxHalfPt=px/2;
    console.log("hide at"+ pxHalfPt);

    var offSet=win.pageYOffset;

    console.log("Your at "+ offSet);
    if (offSet >= px){
      nav.classList.add("nav-fixed");
      // Capture @media scrren width.
      screenWidth=win.matchMedia("screen and (max-width: 768px)");
      console.log("Screen Width"+ screenWidth.matches);
      if (screenWidth.matches){
        //  Add small screen only element.  Done on scroll because element lost on refreshes.
        navIcon=document.querySelector("#nav-mobile-bar-icon");
        navIcon.classList.add("nav-mobile-menu-fixed");
        navMobileCheck.classList.add("nav-mobile-menu-fixed");
      }
    }
    else{
      nav.classList.remove("nav-fixed");
      // Capture @media scrren width.
      screenWidth=win.matchMedia("screen and (max-width: 768px)");
      console.log("Screen Width"+ screenWidth.matches);
      if (screenWidth.matches){
        //  Add small screen only element.  Done on scroll because element lost on refreshes.
        navIcon=document.querySelector("#nav-mobile-bar-icon");
        navIcon.classList.remove("nav-mobile-menu-fixed");
        navMobileCheck.classList.remove("nav-mobile-menu-fixed");
      }
    }
    if (offSet >= pxHalfPt){
      //  Show button and make cursor hand
      scrollUpBtn.style.opacity=1;
      scrollUpBtn.style.cursor="pointer";
    }
    else{
      //  Hide button and remove hand cursor
      scrollUpBtn.style.opacity=0;
      scrollUpBtn.style.cursor="default";
    }
  });

  scrollUpBtn.addEventListener("click", function(event){
    event.preventDefault();
    scrollUp(document.body, 0, 600);
  });

  for (cnt=0; circles.length > cnt; cnt++){
    circles[cnt].addEventListener("mouseenter", function(event){
      var circleName=event.target.id;
      console.log(circleName);
      var img=document.querySelector("img#"+circleName);
      var tea=document.querySelector("div#"+circleName+" p.the-tea");
      console.log(img);
      img.style.opacity=0;
      tea.classList.add("animate-fade-in");
    });
  }

  for (cnt=0;circles.length > cnt; cnt++){
    circles[cnt].addEventListener("mouseleave", function(event){
      var circleName=event.target.id;
      console.log(circleName);
      var img=document.querySelector("img#"+circleName);
      var tea=document.querySelector("div#"+circleName+" p.the-tea");
      this.classList.remove("animate-flip");
      img.style.opacity=1;
      tea.classList.remove("animate-fade-in");
    });
  }

  for (cnt=0; aboutBtn.length > cnt; cnt++){
    aboutBtn[cnt].addEventListener("click", function(event){
      event.preventDefault();
      var btnName=event.target.name;
      console.log(btnName);
      document.querySelector("#"+btnName).classList.add("animate-flip");
    });
 }

})
