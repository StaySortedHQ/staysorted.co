// var player_Inbox = null;
// var player_Inbox_path = "videos/Inbox/"; // path to Phosphor files on your server

// var instantiateInbox = function() {
//   player_Inbox = new PhosphorPlayer('anim_target_Inbox');
//   phosphorCallback_Inbox = function(data) {

//     player_Inbox.load_animation({
//       imageArray:["Inbox_atlas000.jpg","Inbox_atlas001.jpg","Inbox_atlas002.jpg"],
//       imagePath: player_Inbox_path,
//       animationData: data,
//       loop: true,
//       onLoad: function() {}
//     });
//    }
//    var jsonpScript = document.createElement("script");
//    jsonpScript.type = "text/javascript";
//    jsonpScript.id = "jsonPinclude_Inbox";
//    jsonpScript.src = player_Inbox_path + "Inbox_animationData.jsonp";
//    document.getElementsByTagName("head")[0].appendChild(jsonpScript);
// }

// // $(document).ready(function(){
// //   instantiateInbox();
// // });