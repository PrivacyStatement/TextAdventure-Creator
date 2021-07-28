start()

function start(){
  console.log(Save_Stats)
  for (let i=0; i<Save_Stats.length; i++) {
    var temp = document.getElementsByTagName("template")[0];
    temp.content.querySelector("h4").textContent = Save_Stats[i]["title"]
    temp.content.querySelector("img").src = "static/grafik/" + Save_Stats[i]["img"].toString()
    temp.content.querySelector("#desc").textContent = Save_Stats[i]["des"]
    var func = "load_game('" + Save_Stats[i]["location"] + "')"
    temp.content.querySelectorAll("#Load")[0].setAttribute("onclick",func);
    document.getElementById('LevelsDif').appendChild(temp.content.cloneNode(true));
  }
}

function delete_alert(b) {
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
}
  
function load_game(a) {
  console.log(a)
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