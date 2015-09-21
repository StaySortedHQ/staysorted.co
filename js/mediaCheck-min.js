/*
  mediaCheck
  http://github.com/sparkbox/mediaCheck

  Version: 0.4.6, 12-02-2015
  Author: Rob Tarr (http://twitter.com/robtarr)
*/(function(){window.mediaCheck=function(options){var breakpoints,checkQuery,convertEmToPx,createListener,getPXValue,hasMatchMedia,i,mmListener,mq,mqChange;if(mq=void 0,mqChange=void 0,createListener=void 0,convertEmToPx=void 0,getPXValue=void 0,hasMatchMedia=void 0!==window.matchMedia&&!!window.matchMedia("!").addListener)return mqChange=function(a,b){return a.matches?"function"==typeof b.entry&&b.entry(a):"function"==typeof b.exit&&b.exit(a),"function"==typeof b.both?b.both(a):void 0},(createListener=function(){return mq=window.matchMedia(options.media),mq.addListener(function(){return mqChange(mq,options)}),window.addEventListener("orientationchange",function(){return mq=window.matchMedia(options.media),mqChange(mq,options)},!1),mqChange(mq,options)})();breakpoints={},mqChange=function(a,b){return a.matches?"function"!=typeof b.entry||breakpoints[b.media]!==!1&&null!=breakpoints[b.media]||b.entry(a):"function"!=typeof b.exit||breakpoints[b.media]!==!0&&null!=breakpoints[b.media]||b.exit(a),"function"==typeof b.both&&b.both(a),breakpoints[b.media]=a.matches},convertEmToPx=function(a){var b,c;return b=void 0,b=document.createElement("div"),b.style.width="1em",b.style.position="absolute",document.body.appendChild(b),c=a*b.offsetWidth,document.body.removeChild(b),c},getPXValue=function(a,b){var c;switch(c=void 0,b){case"em":c=convertEmToPx(a);break;default:c=a}return c};for(i in options)breakpoints[options.media]=null;return checkQuery=function(parts){var constraint,dimension,matches,ratio,value,windowHeight,windowWidth;return constraint=parts[1],dimension=parts[2],value=parts[4]?getPXValue(parseInt(parts[3],10),parts[4]):parts[3],windowWidth=window.innerWidth||document.documentElement.clientWidth,windowHeight=window.innerHeight||document.documentElement.clientHeight,"width"===dimension?matches="max"===constraint&&value>windowWidth||"min"===constraint&&windowWidth>value:"height"===dimension?matches="max"===constraint&&value>windowHeight||"min"===constraint&&windowHeight>value:"aspect-ratio"===dimension&&(ratio=windowWidth/windowHeight,matches="max"===constraint&&eval(ratio)<eval(value)||"min"===constraint&&eval(ratio)>eval(value)),matches},mmListener=function(){var a,b,c,d,e,f;for(c=options.media.split(/\sand\s|,\s/),a=!0,e=0,f=c.length;f>e;e++)b=c[e],d=b.match(/\((.*?)-(.*?):\s([\d\/]*)(\w*)\)/),checkQuery(d)||(a=!1);return mqChange({media:options.media,matches:a},options)},window.addEventListener?window.addEventListener("resize",mmListener,!1):window.attachEvent&&window.attachEvent("onresize",mmListener),mmListener()}}).call(this);