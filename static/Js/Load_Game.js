start()

/*send a post request to location with data in json format and return the response also as json*/
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

/*set at the start of the programm the save stats and set the a template in create game*/
async function start(){
  const data = { mode: "get_templates" };
  const return_value = await post(data, "/Load_Game_Post");

  show_save_stats()

  if (return_value["success"]){
    change_create_prev(return_value["templates"][0]["img"],return_value["templates"][0]["title"],return_value["templates"][0]["des"],return_value["templates"][0]["location"])
  }
}

/*show the delete dialog*/
function alert(elements,file) {
    const element = document.getElementById("delete_alert");

    element.querySelector("#FinalDelete").onclick = function() { delete_game(elements,file.toString()), document.getElementById("delete_alert").style.display = "none"};
    element.style.display = "inherit";
}

/*hidde the delete dialog*/
function deactivate_delete_alert(event, element) {
    if (event.target != element) {
      event.stopPropagation();
      return;
    }

    document.getElementById("delete_alert").style.display = "none";
}

/*hidde the create dialog*/
function deactivate_create_alert(event, element) {
    if (event.target != element) {
      event.stopPropagation();
      return;
    }

    document.getElementById("create_alert").style.display = "none";
}

/*load the game with the name as the var name*/
function load_game(name) {
  const form = document.createElement('form');
  const input = document.createElement('input');

  document.body.appendChild(form);
  form.method = 'post';
  form.action = "Game";
  input.type = 'hidden';
  input.name = "file";
  input.value = name.toString();
  form.appendChild(input);
  form.submit();
  form.remove();
}

/*try to delete the game names the var file*/
async function delete_game(elements, file){
  const data = { delete: file.toString(), mode: "delete" };
  const return_value = await post(data, "/Load_Game_Post");

  if (return_value["success"]) {
    show_save_stats()
  }
}

/*open the template select dialog and update it*/
async function select_game(){
    const data = { mode: "get_templates" };
    const return_value = await post(data, "/Load_Game_Post");
    const element = document.getElementById("create_alert");
    const template = document.getElementsByTagName("template")[1];
    const to_remove = document.getElementsByClassName("field");

    if (return_value["success"]){
      while(to_remove.length > 0){
        to_remove[0].remove();
      }

      element.style.display = "inherit";
      
      for (let i=0; i<return_value["templates"].length; i++) {
        template.content.querySelector("div").textContent = return_value["templates"][i]["title"]
        template.content.querySelector("div").setAttribute("onclick","change_create_prev('" + return_value["templates"][i]["img"] + "','" + return_value["templates"][i]["title"] + "','" + return_value["templates"][i]["des"] + "','" + return_value["templates"][i]["location"] + "');deactivate_create_alert(event, this);");
        element.children[0].appendChild(template.content.cloneNode(true))
    }
  }
}

/*update the crate game window with the date from the var*/
function change_create_prev(pic, title, text, location){
  document.getElementById('pic_preview').src = "static/grafik/" + pic.toString()
  document.getElementById('title_preview').textContent = title.toString()
  document.getElementById('text_preview').textContent = text.toString()
  document.getElementById('create_game').setAttribute("onclick","create_game('" + location + "')");
}

/*try to create game and if it's work the game is open*/
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
        show_save_stats()
        load_game(return_value["name"])
      }else{
        name.placeholder = "name is in use"
        name.value = ""
      }
      break;
  }
}

/*delete all save stat template and set with a updated list new ones*/
async function show_save_stats(){
  const data = { mode: "get_save_stats" };
  const Save_Stats = await post(data, "/Load_Game_Post");
  const delete_childs = document.getElementById('LevelsDif').getElementsByClassName("template_body")

  if (Save_Stats["success"]){
    while (delete_childs.length > 0) {
      delete_childs[0].remove();
    }

    for (let i=0; i<Save_Stats["templates"].length; i++) {
      let temp = document.getElementsByTagName("template")[0];
      temp.content.querySelector("h4").textContent = Save_Stats["templates"][i]["title"]
      temp.content.querySelector("img").src = "static/grafik/" + Save_Stats["templates"][i]["img"].toString()
      temp.content.querySelector("#desc").textContent = Save_Stats["templates"][i]["des"]
      temp.content.querySelector("#Load").setAttribute("onclick","load_game('" + Save_Stats["templates"][i]["location"] + "')");
      temp.content.querySelector("#Delete").setAttribute("onclick","alert(this,'" + Save_Stats["templates"][i]["location"] + "')");
      document.getElementById('LevelsDif').appendChild(temp.content.cloneNode(true));
    }
  }
}