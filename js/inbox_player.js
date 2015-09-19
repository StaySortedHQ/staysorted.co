var player_Inbox = null;
var player_Inbox_path = "videos/Inbox/"; // path to Phosphor files on your server
var Inbox_framecount = 0;


/**
 * After the page has loaded, we register a callback which will be triggered by the jsonp file.
 * Once the callback is registered, we inject the jsonp script file into the page's HEAD block.
 * An alternative method is to use AJAX (getJSON, etc) to load the corresponding json file.  After loading the
 * data, instantiate the player in the same way.
 */

 $(document).ready(function(){
  player_Inbox = new PhosphorPlayer('anim_target_Inbox');
  phosphorCallback_Inbox = function(data) {

    /**
     * Instantiate the player.  The player supports a variate of callbacks for deeper integration into your site.
     */

     Inbox_framecount = data.frames.length;
     player_Inbox.load_animation({
      imageArray:["Inbox_atlas000.jpg","Inbox_atlas001.jpg","Inbox_atlas002.jpg"],
      imagePath: player_Inbox_path,
      animationData: data,
      loop: true,
      onLoad: function() {
        player_Inbox.play();

        /**
         * If your Phosphor composition was created with the "interactive" mode set, the code below enables that
         * interation.  Handlers are registered for both mouse drag and touch events.
         */

         var trappedMouse = false;
         var trappedXPos;

         var enableInteractivity = false;

         if(enableInteractivity) {
          $("#anim_target_Inbox").mousedown(function(e){
            e.preventDefault();
            player_Inbox.stop();
            trappedMouse = true;
            trappedXPos = e.pageX;
            $(document).bind('mousemove',function(event) {
              if(trappedMouse){
                var pos =  (event.pageX - trappedXPos) / 5;
                var seekTime = (Inbox_framecount + player_Inbox.currentFrameNumber() + parseInt(pos)) % Inbox_framecount;
                player_Inbox.setCurrentFrameNumber(seekTime);
                trappedXPos = event.pageX;
              }

            });

          });

          $(document).mouseup(function(e){
            trappedMouse = false;
            $(document).unbind('mousemove');
          });



          $("#anim_target_Inbox").bind("touchstart",function(event){
           var e = event.originalEvent;
           e.preventDefault();
           player_Inbox.stop();
           trappedMouse = true;
           trappedXPos = e.pageX;
           $(document).bind('touchmove', function(e) {
            if(trappedMouse){
              var e = e.originalEvent;
              e.preventDefault();
              var pos =  (e.pageX - trappedXPos) / 5;
              var seekTime = (Inbox_framecount + player_Inbox.currentFrameNumber() + parseInt(pos)) % Inbox_framecount;
              player_Inbox.setCurrentFrameNumber(seekTime);
              trappedXPos = e.pageX;
            }
           });
         });

          $("#anim_target_Inbox").bind("touchend",function(event){
           var e = event.originalEvent;
           e.preventDefault();
           trappedMouse = false;
           player_Inbox.play(true);
           $(document).unbind('touchmove');
         });

        }

      }
    });
   }
   var jsonpScript = document.createElement("script");
   jsonpScript.type = "text/javascript";
   jsonpScript.id = "jsonPinclude_Inbox";
   jsonpScript.src = player_Inbox_path + "Inbox_animationData.jsonp";
   document.getElementsByTagName("head")[0].appendChild(jsonpScript);


});