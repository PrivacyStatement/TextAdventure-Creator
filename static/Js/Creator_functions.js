const Titel_div = document.getElementById("Title_input");
const Story_div = document.getElementById("Story_input");
const Answer_div = [document.getElementById("Answer1_input"),document.getElementById("Answer2_input"),document.getElementById("Answer3_input"),document.getElementById("Answer4_input")];
const Springzu_div = [document.getElementById("Spring1_input"),document.getElementById("Spring2_input"),document.getElementById("Spring3_input"),document.getElementById("Spring4_input")];
const XP_div = document.getElementById("XP");
const random_div = document.getElementById("random");
const story_typ_button = Array.from(document.getElementsByClassName("story_typ_button") )

function delete_alert(value) {
  Story_tile = value;
  var ele = document.getElementById("delete_alert");
  ele.style.display = "inherit";
}

function deactivate_delete_alert(event, element) {
   if (event.target != element) {
    event.stopPropagation();
    return;
  }
  var ele = document.getElementById("delete_alert");
  ele.style.display = "none";
  json_give_valure()
}

function deactivate_delete_alert2(b) {
  var ele = document.getElementById("delete_alert");
  ele.style.display = "none";
}

var Story_tile = undefined
var json_data = json;
console.log(json_data)

function json_give_valure(){
  try {
    var Titel = Titel_div.value;
    var Story = Story_div.value;
    var XP = XP_div.value;
    var random = random_div.value;

    var Answer_sorted = [];
    for (let i = 0; i < Answer_div.length; i++) {
      if (Answer_div[i].value != ""){
        Answer_sorted.push(Answer_div[i].value)
      } else{
        break;
      }
    }

    var Springzu_sorted = [];
    Answer_sorted.forEach(function (value, i) {
      Springzu_sorted.push(Springzu_div[i].value) 
    });

    console.log(json_data["Game"][Number(Story_tile)])
    json_data["Game"][Number(Story_tile)] = {"Text1": Story, "Titel": Titel, "Spring zu": Answer_sorted}
    console.log(json_data["Game"][Number(Story_tile)])

  }
  catch (e) {
    // Anweisungen für jeden Fehler
    console.log(e); // Fehler-Objekt an die Error-Funktion geben
  }
}

function type_button(button){
  story_typ_button.forEach(function (value, i) {
    value.style.backgroundColor = i == button ? "rgba(186,133,251,0.12)" : "#fff"
    value.style.color = i == button ? "#7B61FF" : "#000" 
  });

  switch (button){
    case 0:
      Answer_div.forEach(element => {
        element.disabled = true;
      });
      Springzu_div.forEach(element => {
        element.disabled = true;
      });
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
  }
}