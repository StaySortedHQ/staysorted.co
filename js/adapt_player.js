var player_Adapt = null;
var player_Adapt_path = "videos/Adapt/"; // path to Phosphor files on your server
var Adapt_framecount = 0;


/**
 * After the page has loaded, we register a callback which will be triggered by the jsonp file.
 * Once the callback is registered, we inject the jsonp script file into the page's HEAD block.
 * An alternative method is to use AJAX (getJSON, etc) to load the corresponding json file.  After loading the
 * data, instantiate the player in the same way.
 */

 $(document).ready(function(){
  player_Adapt = new PhosphorPlayer('anim_target_Adapt');
  phosphorCallback_Adapt = function(data) {

    /**
     * Instantiate the player.  The player supports a variate of callbacks for deeper integration into your site.
     */

     Adapt_framecount = data.frames.length;
     player_Adapt.load_animation({
      imageArray:["Adapt_atlas000.jpg","Adapt_atlas001.jpg"],
      imagePath: player_Adapt_path,
      animationData: data,
      loop: true,
      onLoad: function() {
        player_Adapt.play();

        /**
         * If your Phosphor composition was created with the "interactive" mode set, the code below enables that
         * interation.  Handlers are registered for both mouse drag and touch events.
         */

         var trappedMouse = false;
         var trappedXPos;

         var enableInteractivity = false;

         if(enableInteractivity) {
          $("#anim_target_Adapt").mousedown(function(e){
            e.preventDefault();
            player_Adapt.stop();
            trappedMouse = true;
            trappedXPos = e.pageX;
            $(document).bind('mousemove',function(event) {
              if(trappedMouse){
                var pos =  (event.pageX - trappedXPos) / 5;
                var seekTime = (Adapt_framecount + player_Adapt.currentFrameNumber() + parseInt(pos)) % Adapt_framecount;
                player_Adapt.setCurrentFrameNumber(seekTime);
                trappedXPos = event.pageX;
              }

            });

          });

          $(document).mouseup(function(e){
            trappedMouse = false;
            $(document).unbind('mousemove');
          });



          $("#anim_target_Adapt").bind("touchstart",function(event){
           var e = event.originalEvent;
           e.preventDefault();
           player_Adapt.stop();
           trappedMouse = true;
           trappedXPos = e.pageX;
           $(document).bind('touchmove', function(e) {
            if(trappedMouse){
              var e = e.originalEvent;
              e.preventDefault();
              var pos =  (e.pageX - trappedXPos) / 5;
              var seekTime = (Adapt_framecount + player_Adapt.currentFrameNumber() + parseInt(pos)) % Adapt_framecount;
              player_Adapt.setCurrentFrameNumber(seekTime);
              trappedXPos = e.pageX;
            }
           });
         });

          $("#anim_target_Adapt").bind("touchend",function(event){
           var e = event.originalEvent;
           e.preventDefault();
           trappedMouse = false;
           player_Adapt.play(true);
           $(document).unbind('touchmove');
         });

        }

      }
    });
   }
   var jsonpScript = document.createElement("script");
   jsonpScript.type = "text/javascript";
   jsonpScript.id = "jsonPinclude_Adapt";
   jsonpScript.src = player_Adapt_path + "Adapt_animationData.jsonp";
   document.getElementsByTagName("head")[0].appendChild(jsonpScript);


});