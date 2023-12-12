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
document.getElementById("user_name").innerHTML="Welcome "+user_name;

function addRoom(){
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose:"adding room name"
      });
      localStorage.setItem("nombre de la sala",room_name);
      window.location.replace("Twitter_page.html");
}



function getRoom() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Inicio del código
console.log("nombre de la sala "+Room_names);
row = "<div class= 'room_name' id="+ Room_names + " onclick='redirectToRoomName(this.id)' >#"+ Room_names + "</div><hr>"; document.getElementById("output").innerHTML += row;

      //Final del código
      });});}
getRoom();

function logout(){
      localStorage.removeItem("nombre de usuario");
      localStorage.removeItem("nombre de la sala");
      window.location.replace("index.html");
}

function redirectToRoomName(Room_names){
      console.log(Room_names)
      localStorage.setItem("nombre de la sala", Room_names);
      window.location=("Twitter_page.html");
}
