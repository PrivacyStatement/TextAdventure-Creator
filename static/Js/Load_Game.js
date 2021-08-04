start()

function start(){
  for (let i=0; i<Save_Stats.length; i++) {
    var temp = document.getElementsByTagName("template")[0];
    temp.content.querySelector("h4").textContent = Save_Stats[i]["title"]
    temp.content.querySelector("img").src = "static/grafik/" + Save_Stats[i]["img"].toString()
    temp.content.querySelector("#desc").textContent = Save_Stats[i]["des"]
    temp.content.querySelector("#Load").setAttribute("onclick","load_game('" + Save_Stats[i]["location"] + "')");
    temp.content.querySelector("#Delete").setAttribute("onclick","alert(this,'" + Save_Stats[i]["location"] + "')");
    document.getElementById('LevelsDif').appendChild(temp.content.cloneNode(true));
  }
}

function alert(elements,b) {
    var ele = document.getElementById("delete_alert");
    ele.querySelector("#FinalDelete").onclick = function() { delete_game(elements,b.toString()), document.getElementById("delete_alert").style.display = "none"};
    ele.style.display = "inherit";
  }
  
function deactivate_alert(event, element) {
    if (event.target != element) {
      event.stopPropagation();
      return;
    }
  
    var ele = document.getElementById("delete_alert");
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

function delete_game(elements, file){
  var data = { delete: file.toString() };
  fetch("/Delete",
  {
    method: "POST",
    body: JSON.stringify(data)
  }).then(response => response.json())
  .then(data => { if (data["success"]) {
    elements.parentElement.parentElement.parentElement.remove();
  } })
}
