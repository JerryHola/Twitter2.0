var firebaseConfig = {
    apiKey: "AIzaSyCwWai5_crCR8ngcP2HNUtYttrHe-9MyL8",
    authDomain: "red-social-jerry.firebaseapp.com",
    databaseURL: "https://red-social-jerry-default-rtdb.firebaseio.com",
    projectId: "red-social-jerry",
    storageBucket: "red-social-jerry.appspot.com",
    messagingSenderId: "189379210277",
    appId: "1:189379210277:web:b1be058a4e64b691c1e3cc"
  };

firebase.initializeApp(firebaseConfig);    
//AÑADE TUS ENLACES DE FIREBASE
user_name=localStorage.getItem("nombre de usuario");
room_name=localStorage.getItem("nombre de la sala");

function publish_a_message(){
    console.log("enviar");
console.log(room_name);
    msg=document.getElementById("Message").value;
    console.log(msg);
    firebase.database().ref(room_name).push({
        name:user_name,message:msg,like:0
    });
    document.getElementById("Message").value;
}
function getdata(){
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
         document.getElementById("output").innerHTML = "";
          snapshot.forEach(function (childSnapshot) {
             childKey = childSnapshot.key;
              childData = childSnapshot.val();
              if(childKey !="purpose"){
                firebase_message_id=childKey;
                message_data=childData;
                nombre= message_data['name'];
                message=message_data['message'];
                like = message_data['like'];

                name_with_tag="<h4>" + nombre+ "<img class='user_tick' src='tick.png'></h4>";

                message_with_tag = "<h4 class='message_h4'>"+message+"</h4>";

                like_button="<button class='btn btn-warning' id=" + firebase_message_id+ "value= " +like+ " onclick='updateLike(this.id)'>";

                span_with_tag= "<span class='glyphicon glyphicon-thumbs-up'>Like: " +like+ "</span></button><hr>";

                row = name_with_tag + message_with_tag + like_button+ span_with_tag;
                document.getElementById("output").innerHTML+=row;

              }
});
});
}
getdata();

function updateLike(message_id){
    console.log("clicked on like button - " + message_id);
    button_id= message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) +1;
    console.log(updated_likes);
    
    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });

}

function logout(){
    localStorage.removeItem("nombre de usuario");
    localStorage.removeItem("nombre de la sala");
    window.location.replace("index.html");

}