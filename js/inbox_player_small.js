var player_InboxSmall = null;
var player_InboxSmall_path = "videos/InboxSmall/"; // path to Phosphor files on your server

var instantiateInboxSmall = function() {
  player_InboxSmall = new PhosphorPlayer('anim_target_InboxSmall');
  phosphorCallback_InboxSmall = function(data) {

     player_InboxSmall.load_animation({
      imageArray:["InboxSmall_atlas000.jpg","InboxSmall_atlas001.jpg"],
      imagePath: player_InboxSmall_path,
      animationData: data,
      loop: true,
      onLoad: function() {}
    });
   }
   var jsonpScript = document.createElement("script");
   jsonpScript.type = "text/javascript";
   jsonpScript.id = "jsonPinclude_InboxSmall";
   jsonpScript.src = player_InboxSmall_path + "InboxSmall_animationData.jsonp";
   document.getElementsByTagName("head")[0].appendChild(jsonpScript);
}

// $(document).ready(function() {
//   instantiateInboxSmall()
// });