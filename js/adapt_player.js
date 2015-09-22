var player_Adapt = null;
var player_Adapt_path = "videos/Adapt/"; // path to Phosphor files on your server

var instantiateAdapt = function() {
  player_Adapt = new PhosphorPlayer('anim_target_Adapt');
  phosphorCallback_Adapt = function(data) {
    player_Adapt.load_animation({
      imageArray:["Adapt_atlas000.jpg","Adapt_atlas001.jpg"],
      imagePath: player_Adapt_path,
      animationData: data,
      loop: true,
      onLoad: function() {}
    });
   }
   var jsonpScript = document.createElement("script");
   jsonpScript.type = "text/javascript";
   jsonpScript.id = "jsonPinclude_Adapt";
   jsonpScript.src = player_Adapt_path + "Adapt_animationData.jsonp";
   document.getElementsByTagName("head")[0].appendChild(jsonpScript);
}

$(document).ready(function(){
  instantiateAdapt();
});