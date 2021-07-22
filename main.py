from flask import Flask , render_template, request
import os
import json
import copy


app = Flask(__name__)

@app.route("/")
def index():
    return render_template('Start.html')

@app.route("/Load_Game", methods=["POST" , "GET"])
def Load():
    #loads and return the files
    def Save_Stats():
        Save_Stats = []
        files = os.listdir("Save_Games")
        for i in files:
            if i.split(".")[-1] == "json":
                with open("Save_Games/" + str(i), 'r') as json_file:
                    json_data = json.load(json_file)
                    try:
                        Save_Stats.append({"title": json_data["Settings"]["titel"], "img": json_data["Settings"]["img"],
                                           "des": json_data["Settings"]["description"]})
                    except (TypeError, KeyError):
                        pass
        return Save_Stats

    if request.method == "POST":
        print(type(request.form["Button"]))
    return render_template('Load_Game.html', Save_Stats=Save_Stats())

@app.route("/Game")
def Game():
    return render_template('Game.html')

@app.route("/Load_Creator")
def Load2():
    return render_template('Load_Creator.html')

@app.route("/Creator")
def Creator():
    with open("game templates/A Sample.json", 'r') as json_file:
        json_data = json.load(json_file)

    treeData = []
    allready_in_tree = set([0,-1,-2])

    def tree_list(i,repet):
        goto = copy.deepcopy(json_data["Game"][i]["Spring zu"])
        goto_truth = [True for len_goto in goto]

        for repetitiv_value in range(len(goto)-1, -1, -1):
            if goto[repetitiv_value] in allready_in_tree:
                goto_truth[repetitiv_value] = False

        allready_in_tree.add(repetitiv_value for repetitiv_value in goto)

        if repet:
            return {
                "name": json_data["Game"][i]["Titel"],
                "section": 0,
                "ende":False if not(json_data["Game"][i]["Spring zu"][0] in allready_in_tree) else True,
                "children":[tree_list(goto[index],goto_truth[index]) for index in range(len(goto))]}
        return {
            "name": json_data["Game"][i]["Titel"],
            "section": 0,
            "ende": False if not (json_data["Game"][i]["Spring zu"][0] in allready_in_tree) else True,
            "children": []}

    treeData.append(tree_list(0,not(json_data["Game"][0]["Spring zu"][0] == -2 and len(json_data["Game"][0]["Spring zu"]) == 1)))

    return render_template('Creator.html', treeData=treeData)

app.run(host= "0.0.0.0", port=5000)

