GameSave["Settings"]["reach"].forEach(element => {
  NewField(element)
});

function Next(WitchIndex){
  NewField(WitchIndex)
}

function NewField(index){
  switch (Number(GameSave["Game"][index]["Typ"])) {
    case 1:
      var temp = document.getElementById("Text")
      var clon = temp.content.cloneNode(true);
      clon.querySelector("h1").textContent = GameSave["Game"][index]["Titel"];
      clon.querySelector("p").textContent = GameSave["Game"][index]["Text1"];
      document.getElementById('game_body').appendChild(clon);
      document.querySelector("#NextButton").setAttribute("onclick","Next('" + GameSave["Game"][index]["Spring zu"][0] + "')");
      document.querySelector("#NextButton").style.background = "#DDC6FA";
      break;
    case 2:
      var temp = document.getElementById("TwoButtons")
      var clon = temp.content.cloneNode(true);
      clon.querySelector("h1").textContent = GameSave["Game"][index]["Titel"];
      clon.querySelector("p").textContent = GameSave["Game"][index]["Text1"];
      clon.querySelector("#TwoButton1").textContent = GameSave["Game"][index]["Quest1"];
      clon.querySelector("#TwoButton2").textContent = GameSave["Game"][index]["Quest2"];
      clon.querySelector("#TwoButton1").setAttribute("onclick","Next('" + GameSave["Game"][index]["Spring zu"][0] + "')");
      clon.querySelector("#TwoButton2").setAttribute("onclick","Next('" + GameSave["Game"][index]["Spring zu"][1] + "')");
      document.querySelector("#NextButton").setAttribute("onclick", "function()");
      document.querySelector("#NextButton").style.background = "#868588";
      document.getElementById('game_body').appendChild(clon);
      break;
    case 3:
      var temp = document.getElementById("ThreeButtons")
      var clon = temp.content.cloneNode(true);
      clon.querySelector("h1").textContent = GameSave["Game"][index]["Titel"];
      clon.querySelector("p").textContent = GameSave["Game"][index]["Text1"];
      clon.querySelector("#ThreeButton1").textContent = GameSave["Game"][index]["Quest1"];
      clon.querySelector("#ThreeButton2").textContent = GameSave["Game"][index]["Quest2"];
      clon.querySelector("#ThreeButton3").textContent = GameSave["Game"][index]["Quest3"];
      clon.querySelector("p").textContent = GameSave["Game"][index]["Text1"];
      clon.querySelector("#ThreeButton1").setAttribute("onclick","Next('" + GameSave["Game"][index]["Spring zu"][0] + "')");
      clon.querySelector("#ThreeButton2").setAttribute("onclick","Next('" + GameSave["Game"][index]["Spring zu"][1] + "')");
      clon.querySelector("#ThreeButton3").setAttribute("onclick","Next('" + GameSave["Game"][index]["Spring zu"][2] + "')");
      document.querySelector("#NextButton").setAttribute("onclick", "function()");
      document.querySelector("#NextButton").style.background = "#868588";
      document.getElementById('game_body').appendChild(clon);
      break;
      case 4:
        var temp = document.getElementById("FourButtons")
        var clon = temp.content.cloneNode(true);
        clon.querySelector("h1").textContent = GameSave["Game"][index]["Titel"];
        clon.querySelector("p").textContent = GameSave["Game"][index]["Text1"];
        clon.querySelector("#FourButton1").textContent = GameSave["Game"][index]["Quest1"];
        clon.querySelector("#FourButton2").textContent = GameSave["Game"][index]["Quest2"];
        clon.querySelector("#FourButton3").textContent = GameSave["Game"][index]["Quest3"];
        clon.querySelector("#FourButton4").textContent = GameSave["Game"][index]["Quest4"];
        clon.querySelector("p").textContent = GameSave["Game"][index]["Text1"];
        clon.querySelector("#FourButton1").setAttribute("onclick","Next('" + GameSave["Game"][index]["Spring zu"][0] + "')");
        clon.querySelector("#FourButton2").setAttribute("onclick","Next('" + GameSave["Game"][index]["Spring zu"][1] + "')");
        clon.querySelector("#FourButton3").setAttribute("onclick","Next('" + GameSave["Game"][index]["Spring zu"][2] + "')");
        clon.querySelector("#FourButton4").setAttribute("onclick","Next('" + GameSave["Game"][index]["Spring zu"][3] + "')");
        document.querySelector("#NextButton").setAttribute("onclick", "function()");
        document.querySelector("#NextButton").style.background = "#868588";
        document.getElementById('game_body').appendChild(clon);
        break;
      case 5:
        console.log("juhu")
        break;
      case 6:
      case 0:
        var temp = document.getElementById("Text")
        var clon = temp.content.cloneNode(true);
        clon.querySelector("h1").textContent = GameSave["Game"][index]["Titel"];
        clon.querySelector("p").textContent = GameSave["Game"][index]["Text1"];
        document.querySelector("#NextButton").setAttribute("onclick", "function()");
        document.querySelector("#NextButton").style.background = "#868588";
        document.getElementById('game_body').appendChild(clon);
        break;
  }

}