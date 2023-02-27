let vehicle;
let target;
var detailsBox = document.getElementById('details-box');

document.addEventListener('mouseover', function (e) {
  var x = document.getElementById("map");
  if (window.getComputedStyle(x).display === "none") {
    return;
  }else
    {
      detailsBox = document.getElementById('details-box');
  if (e.target.tagName == 'path') {
    var content = e.target.getAttribute("data-info");
    detailsBox.innerHTML = content;
    detailsBox.style.opacity = "100%";
  }
  else {
    detailsBox.style.opacity = "0%";
  }
    }
});

window.onmousemove = function (e) {
  var x = document.getElementById("map");
  if (window.getComputedStyle(x).display === "none") {
    return;
  }else
    {
      detailsBox = document.getElementById('details-box');
      var x = e.clientX,
      y = e.clientY;
      detailsBox.style.top = (y + 20) + 'px';
      detailsBox.style.left = (x) + 'px';
    }
  
};

let mapDisplayed=false;

function F1()
{
  var x = document.getElementById("map");
  x.classList.toggle("hidden");
  x = document.getElementById("start");
  x.remove();
  mapDisplayed=true;
  
  
  
  
}

let ufoSightings1;
let ufoSightings2;
let ufoSightings3;
let ufoSightings4;
let ufoSightings5;
let ufoSightings6;
let ufoSightings7;

function preload() {
  
  
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  ufoSightings1 = loadTable('Assets/file0.csv', 'csv', 'header');
  ufoSightings2 = loadTable('Assets/file1.csv', 'csv', 'header');
  ufoSightings3 = loadTable('Assets/file2.csv', 'csv', 'header');
  ufoSightings4 = loadTable('Assets/file3.csv', 'csv', 'header');
  ufoSightings5 = loadTable('Assets/file4.csv', 'csv', 'header');
  ufoSightings6 = loadTable('Assets/file5.csv', 'csv', 'header');
  ufoSightings7 = loadTable('Assets/file6.csv', 'csv', 'header');
  //the file can be remote
  //table = loadTable("http://p5js.org/reference/assets/mammals.csv",
  //                  "csv", "header");
  
  
}

let statesSetTotal;
let statesArray;

function setup()
{
  createCanvas(displayWidth, displayHeight);
  vehicle = new Vehicle(100, 100);
  
  var x = document.getElementById("start");
  x.style.display = 'inline-block'; 
  
  var states= ufoSightings1.getColumn('Location.State');
  states= states.concat(ufoSightings2.getColumn('Location.State'));
  states= states.concat(ufoSightings3.getColumn('Location.State'));
  states= states.concat(ufoSightings4.getColumn('Location.State'));
  states= states.concat(ufoSightings5.getColumn('Location.State'));
  states= states.concat(ufoSightings6.getColumn('Location.State'));
  states= states.concat(ufoSightings7.getColumn('Location.State'));
  statesArray= states; //used to get amount of ufo sightings
  varstatesSet = [...new Set(states)];
  
  varstatesSet= shuffle(Array.from(varstatesSet));
  
  
  statesSetTotal= varstatesSet;
  
  soundFormats('mp3', 'ogg');
  sample = loadSound('Assets/ding.mp3');
  sample2 = loadSound('Assets/victory.mp3');
}
var sample2;
var curState;

var touchDown=true;
var finished= false;

let element;
let staterect;
let statex;
let statey;

let ufoposition;

var end=false;

function draw()
{
  disableScroll();
  if(finished &&end)
    {
      var x = document.getElementById("end");
      x.style.display = 'inline-block';
    }
  else if(finished &&!end)
    {
      element= document.getElementById("CA");
      staterect = element.getBoundingClientRect();
      statex= staterect.left;
      statey= staterect.top;
          
      clear();
      fill(0, 255, 0);
      noStroke();
      target = createVector(statex, statey);
      circle(target.x, target.y, 10);
      vehicle.seek(target);
      vehicle.update();
      vehicle.show();
      ufoposition= vehicle.pos;
        
        if(target.x== ufoposition.x || (target.x+10>ufoposition.x&& ufoposition.x>target.x-10))
          {
            if(target.y== ufoposition.y || (target.y+10>ufoposition.y&& ufoposition.y>target.y-10))
              {
                if(!end)
                  {
                sample2.play();
                    end=true;
                  }
              }
          }
      
    }
  else if(mapDisplayed &&!finished)
    {
      if(touchDown)
      {
        getState();
        if(finished)
          {
            return;
          }
      element= document.getElementById(curState);
        
        if(element===null)
          {
            finished=true;
            return;
          }
       staterect = element.getBoundingClientRect();
        statex= staterect.left + window.scrollX;
        statey= staterect.top + window.scrollY;
        touchDown=false;
      }
      if(!touchDown)
      {
        statex= staterect.left + window.scrollX;
        statey= staterect.top + window.scrollY;
          
      clear();
      fill(0, 255, 0);
      noStroke();
      target = createVector(statex, statey);
      circle(target.x, target.y, 10);
      vehicle.seek(target);
      vehicle.update();
      vehicle.show();
      ufoposition= vehicle.pos;
        
        if(target.x== ufoposition.x || (target.x+10>ufoposition.x&& ufoposition.x>target.x-10))
          {
            if(target.y== ufoposition.y || (target.y+10>ufoposition.y&& ufoposition.y>target.y-10))
              {
                element= document.getElementById(curState);
                element.setAttribute("fill", resultColor);
                
                sample.play();
                touchDown=true;
              }
          }
      
    }
      
    }
  
}


var entriesNum;
var ratio=0;
var color;

var color1="#95C195";
var color2="#00FF04";
var resultColor="#f9f9f9"

var totalNums=0;
function getState()
{
  entriesNum=0;
  if(statesSetTotal===null||statesSetTotal===undefined)
    {
      finished=true;
    }
  curState= statesSetTotal.shift();
  
  var array = statesArray.filter(value => value == curState);
  entriesNum= array.length;
  
  if(curState===null||statesSetTotal===undefined)
    {
      finished=true;
    }
  
  ratio= (entriesNum/60632)*5;
  
  resultColor= pSBC (ratio, color1, color2, true );
  
  
}



const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}

function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}