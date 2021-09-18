start()

function post(data, location){
return new Promise((resolve, reject) => {
  fetch(location,
    {
      method: "POST",
      body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {resolve(data)})
})
}

async function start(){
  for (let i=0; i<Save_Stats.length; i++) {
    var temp = document.getElementsByTagName("template")[0];
    temp.content.querySelector("h4").textContent = Save_Stats[i]["title"]
    temp.content.querySelector("img").src = "static/grafik/" + Save_Stats[i]["img"].toString()
    temp.content.querySelector("#desc").textContent = Save_Stats[i]["des"]
    temp.content.querySelector("#Load").setAttribute("onclick","load_game('" + Save_Stats[i]["location"] + "')");
    temp.content.querySelector("#Delete").setAttribute("onclick","alert(this,'" + Save_Stats[i]["location"] + "')");
    document.getElementById('LevelsDif').appendChild(temp.content.cloneNode(true));
  }

  var data = { mode: "select" };
  var return_value = await post(data, "/Load_Game_Post");

  if (return_value["success"]){
    return_value["templates"][0]
    change_create_prev(return_value["templates"][0]["img"],return_value["templates"][0]["title"],return_value["templates"][0]["des"],return_value["templates"][0]["location"])
  }
}

function alert(elements,b) {
    var ele = document.getElementById("delete_alert");
    ele.querySelector("#FinalDelete").onclick = function() { delete_game(elements,b.toString()), document.getElementById("delete_alert").style.display = "none"};
    ele.style.display = "inherit";
  }
  
function deactivate_delete_alert(event, element) {
    if (event.target != element) {
      event.stopPropagation();
      return;
    }

    var ele = document.getElementById("delete_alert");
    ele.style.display = "none";
}

function deactivate_create_alert(event, element) {
    if (event.target != element) {
      event.stopPropagation();
      return;
    }

    var ele = document.getElementById("create_alert");
    ele.style.display = "none";
}
  
function load_game(a) {
  var form = document.createElement('form');
  document.body.appendChild(form);
  form.method = 'post';
  form.action = "Game";
  var input = document.createElement('input');
  input.type = 'hidden';
  input.name = "file";
  input.value = a.toString();
  form.appendChild(input);
  form.submit();
  form.remove();
}

async function delete_game(elements, file){
  var data = { delete: file.toString(), mode: "delete" };
  var return_value = await post(data, "/Load_Game_Post");
  if (return_value["success"]) {
    elements.parentElement.parentElement.parentElement.remove();
  }
}

async function select_game(){

    var data = { mode: "select" };
    var return_value = await post(data, "/Load_Game_Post");

    if (return_value["success"]){
    var ele = document.getElementById("create_alert");
    var temp = document.getElementsByTagName("template")[1];
    var field = document.getElementsByClassName("field");
    while(field.length > 0){
        field[0].remove();
    }
    ele.style.display = "inherit";
    for (let i=0; i<return_value["templates"].length; i++) {
      temp.content.querySelector("div").textContent = return_value["templates"][i]["title"]
      var method = "change_create_prev('" + return_value["templates"][i]["img"] + "','" + return_value["templates"][i]["title"] + "','" + return_value["templates"][i]["des"] + "','" + return_value["templates"][i]["location"] + "');deactivate_create_alert(event, this);"
      temp.content.querySelector("div").setAttribute("onclick",method);
      ele.children[0].appendChild(temp.content.cloneNode(true))
    }
  }
}

function change_create_prev(pic, title, text, location){
  var pic_preview = document.getElementById('pic_preview')
  var title_preview = document.getElementById('title_preview')
  var text_preview = document.getElementById('text_preview')
  var create_game = document.getElementById('create_game')
  pic_preview.src = "static/grafik/" + pic.toString()
  title_preview.textContent = title.toString()
  text_preview.textContent = text.toString()
  create_game.setAttribute("onclick","create_game('" + location + "')");
}

async function create_game(location){
  const name = document.getElementById("create_name")
  const input_line = document.getElementById("input_line")
  switch (name.value) {
    case "":
      input_line.style.color = "red";
      name.placeholder = "require"
      break;
    default:
      const data = { location: location.toString(), mode: "create", name: name.value};
      const return_value = await post(data, "/Load_Game_Post");
      input_line.style.color = "#7B61FF";
      name.placeholder = ""
      name.value = ""
      if (return_value["success"]){
        console.log(return_value["name"])
       /*  load_game(return_value["name"]) */
      }else{
        name.placeholder = "name is in use"
        name.value = ""
      }
      break;
  }
}
