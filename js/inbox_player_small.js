  var player_InboxSmall = null;
  var player_InboxSmall_path = "videos/InboxSmall/"; // path to Phosphor files on your server
  var InboxSmall_framecount = 0;


  /**
   * After the page has loaded, we register a callback which will be triggered by the jsonp file.
   * Once the callback is registered, we inject the jsonp script file into the page's HEAD block.
   * An alternative method is to use AJAX (getJSON, etc) to load the corresponding json file.  After loading the
   * data, instantiate the player in the same way.
   */

   $(document).ready(function(){
    player_InboxSmall = new PhosphorPlayer('anim_target_InboxSmall');
    phosphorCallback_InboxSmall = function(data) {

      /**
       * Instantiate the player.  The player supports a variate of callbacks for deeper integration into your site.
       */

       InboxSmall_framecount = data.frames.length;
       player_InboxSmall.load_animation({
        imageArray:["InboxSmall_atlas000.jpg","InboxSmall_atlas001.jpg"],
        imagePath: player_InboxSmall_path,
        animationData: data,
        loop: true,
        onLoad: function() {
          player_InboxSmall.play();

          /**
           * If your Phosphor composition was created with the "interactive" mode set, the code below enables that
           * interation.  Handlers are registered for both mouse drag and touch events.
           */

           var trappedMouse = false;
           var trappedXPos;

           var enableInteractivity = false;

           if(enableInteractivity) {
            $("#anim_target_InboxSmall").mousedown(function(e){
              e.preventDefault();
              player_InboxSmall.stop();
              trappedMouse = true;
              trappedXPos = e.pageX;
              $(document).bind('mousemove',function(event) {
                if(trappedMouse){
                  var pos =  (event.pageX - trappedXPos) / 5;
                  var seekTime = (InboxSmall_framecount + player_InboxSmall.currentFrameNumber() + parseInt(pos)) % InboxSmall_framecount;
                  player_InboxSmall.setCurrentFrameNumber(seekTime);
                  trappedXPos = event.pageX;
                }

              });

            });

            $(document).mouseup(function(e){
              trappedMouse = false;
              $(document).unbind('mousemove');
            });



            $("#anim_target_InboxSmall").bind("touchstart",function(event){
             var e = event.originalEvent;
             e.preventDefault();
             player_InboxSmall.stop();
             trappedMouse = true;
             trappedXPos = e.pageX;
             $(document).bind('touchmove', function(e) {
              if(trappedMouse){
                var e = e.originalEvent;
                e.preventDefault();
                var pos =  (e.pageX - trappedXPos) / 5;
                var seekTime = (InboxSmall_framecount + player_InboxSmall.currentFrameNumber() + parseInt(pos)) % InboxSmall_framecount;
                player_InboxSmall.setCurrentFrameNumber(seekTime);
                trappedXPos = e.pageX;
              }
             });
           });

            $("#anim_target_InboxSmall").bind("touchend",function(event){
             var e = event.originalEvent;
             e.preventDefault();
             trappedMouse = false;
             player_InboxSmall.play(true);
             $(document).unbind('touchmove');
           });

          }

        }
      });
     }
     var jsonpScript = document.createElement("script");
     jsonpScript.type = "text/javascript";
     jsonpScript.id = "jsonPinclude_InboxSmall";
     jsonpScript.src = player_InboxSmall_path + "InboxSmall_animationData.jsonp";
     document.getElementsByTagName("head")[0].appendChild(jsonpScript);


});