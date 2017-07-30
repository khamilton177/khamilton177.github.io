document.addEventListener("DOMContentLoaded", function(){

  var docBody=document.querySelector('body');
  var header=document.querySelector("header");
  var navA=document.querySelectorAll(".nav-a");
  var home=document.querySelector("#home");
  var nav=document.querySelector("#nav-bar");
  var navMobileCheck=document.querySelector("#nav-mobile-bar-checkBox");
  var projContainer=document.querySelectorAll(".proj-container");
  var projModalClose=document.querySelectorAll(".modal-close-icon");
  var frontEnd=document.querySelector(".front");
  var backEnd=document.querySelector(".back");
  var other=document.querySelector(".other");
  var circles=document.querySelectorAll(".circle");
  var imgs=document.querySelectorAll(".imgs");
  var aboutBtn=document.querySelectorAll(".p-btn");
  var scrollUpBtn=document.querySelector("#scroll-up");
  var aboutModalArrow=document.querySelector(".arrow-wrapper");
  var aboutModalInstruct=document.querySelector(".about-instruction");
  var ieModal=document.querySelector(".ie-modal");

  var win=window;
  var cnt; //  Counter used in loops
  var navIcon;  //  holder for small screen menu

  // Test for Internet Explorer 6-11 browser since CSS animation not working in it yet.
  var isIE = /*@cc_on!@*/false || !!document.documentMode;
  // console.log("Browser is IE? or Egde"+isIE+" "+isEdge)
  if (isIE){
    ieModal.style.display="block";
    ieModal.innerHTML="This site is not fully compatible with IE.  Please open in another browser.";
  }

  //  Set Home Screen to Window Width and Height on Load
  function resizeElement(){
    var x=win.innerWidth||docBody.clientWidth;
    var y=win.innerHeight||docBody.clientHeight;
    if(!home){
      //  Height of Nav bar
      var px=110;
    }
    else{
      home.style.height=y+"px";
    }
    // console.log(x+","+y);
    //  Make sure to 'uncheck' mobile menu on resize
    navMobileCheck.checked=false;

    //  Get height of tallest skills div and set other two to same
    var skillsHeight=backEnd.clientHeight;
    //  Need to minus 32 from clientHeight before applying
    skillsHeight-=32;
    skillsHeight+="px";
    // console.log("skills height- "+skillsHeight);
    frontEnd.style.height=skillsHeight;
    other.style.height=skillsHeight;
  }

  var scrollUp=function(element, to, duration) {
    if (duration <= 0) return;
    var move = to - element.scrollTop;
    // console.log("body- "+element.scrollTop)
    // console.log("moving-"+ move);
    var perpx = move / duration * 10;

    setTimeout(function() {
      element.scrollTop = element.scrollTop + perpx;
      if (element.scrollTop == to) return;
      scrollUp(element, to, duration - 10);
    }, 10);
  }

  var removeModal=function(){
    //  Get rid of the modals when first hover is Done
    aboutModalArrow.style.display="none";
    aboutModalInstruct.style.display="none";
    //  Remove the eventListner from circles
    for (cnt=0; circles.length > cnt; cnt++){
      circles[cnt].removeEventListener("mouseenter", removeModal);
    };
  }

  //  Set Home Screen to Window Width and Height on Window Resize
  win.addEventListener("resize", resizeElement);

  //  Find Scroll Position and transform NavBar to Fixed
  win.addEventListener("scroll", function(event){
    if(!home){
      //  Height of Nav bar
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
    // console.log("Bottom is "+ px);

    // Going to use this point in scroll position to hide scrollUpBtn
    var pxHalfPt=px/2;
    // console.log("hide at"+ pxHalfPt);

    var offSet=win.pageYOffset;

    // console.log("Your at "+ offSet);
    if (offSet >= px){
      nav.classList.add("nav-fixed");
      // Capture @media scrren width.
      screenWidth=win.matchMedia("screen and (max-width: 768px)");
      // console.log("Screen Width"+ screenWidth.matches);
      if (screenWidth.matches){
        //  Add small screen only element.  Done on scroll because element lost on refreshes.
        navIcon=document.querySelector("#nav-mobile-bar-icon");
        navIcon.classList.add("nav-mobile-menu-fixed");
        navMobileCheck.classList.add("nav-mobile-menu-fixed");
        //  Closes the mobile nav bar on scroll if it is opened
        navMobileCheck.checked=false;
      }
    }
    else{
      nav.classList.remove("nav-fixed");
      // Capture @media scrren width.
      screenWidth=win.matchMedia("screen and (max-width: 768px)");
      // console.log("Screen Width"+ screenWidth.matches);
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

  for (cnt=0; projContainer.length > cnt; cnt++){
    //  show modal when hover over container
    projContainer[cnt].addEventListener("mouseenter", function(event){
      var modalName=event.target.id;
      // console.log("name "+modalName);
      var projModal=document.querySelector("#"+modalName+"-modal");
      projModal.classList.add("proj-modal-show");
    }, false)

    //  Close modal using i tag
    projModalClose[cnt].addEventListener("click", function(event){
      var modalName=this.parentNode.id;
      // console.log("CLICKED "+modalName);
      var projModal=document.querySelector("#"+modalName);
      projModal.classList.remove("proj-modal-show");
    })
  }

  for (cnt=0; circles.length > cnt; cnt++){
    circles[cnt].addEventListener("mouseover", removeModal);

    circles[cnt].addEventListener("mouseenter", function(event){
      var circleName=event.target.id;
      // console.log("enter "+circleName);
      var img=document.querySelector("img#"+circleName+"-img");
      var tea=document.querySelector("div#"+circleName+" p.the-tea");
      // console.log(img);
      img.style.opacity=0;
      tea.classList.add("animate-fade-in");
      var btn=document.querySelector("#"+circleName+" button");
      //  Display button after fade-in
      setTimeout(function(){
        btn.style.display="block";
      },2000);
    });

    circles[cnt].addEventListener("mouseleave", function(event){
      var circleName=event.target.id;
      // console.log("leave "+circleName);
      var img=document.querySelector("img#"+circleName+"-img");
      var tea=document.querySelector("div#"+circleName+" p.the-tea");
      var btn=document.querySelector("#"+circleName+" button");
      btn.style.display="none";
      this.classList.remove("animate-flip");
      img.style.opacity=1;
      tea.classList.remove("animate-fade-in");
    });
  }

  for (cnt=0; aboutBtn.length > cnt; cnt++){
    aboutBtn[cnt].addEventListener("click", function(event){
      event.preventDefault();
      var btnName=event.target.name;
      // console.log(btnName);
      //  flip the image with the corresponding button name.
      document.querySelector("#"+btnName).classList.add("animate-flip");
    });
 }

})
