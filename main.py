from flask import Flask , render_template, request, redirect, jsonify
import os
import json
import copy

app = Flask(__name__)


# return all the games in Save_Stats with a description
def Save_Stats():
    Save_Stats = []
    files = os.listdir("Save_Games")
    for i in files:
        if i.split(".")[-1] == "json":
            with open("Save_Games/" + str(i), 'r') as json_file:
                json_data = json.load(json_file)
                try:
                    Save_Stats.append({"title": json_data["Settings"]["titel"], "img": json_data["Settings"]["img"],
                                       "des": json_data["Settings"]["description"], "location": i})
                except (TypeError, KeyError):
                    pass
    return Save_Stats

# return all the games in Save_Template with a description
def Save_Template():
    Save_Template = []
    files = os.listdir("game templates")
    for i in files:
        if i.split(".")[-1] == "json":
            with open("game templates/" + str(i), 'r') as json_file:
                json_data = json.load(json_file)
                try:
                    Save_Template.append({"title": json_data["Settings"]["titel"], "img": json_data["Settings"]["img"],
                                          "des": json_data["Settings"]["description"], "location": i})
                except (TypeError, KeyError):
                    pass
    return Save_Template

#-----------------------------------------------------------------------------------------

@app.route("/")
def index():
    return render_template('Start.html')

@app.route("/Load_Game")
def Load_Game():
    return render_template('Load_Game.html', Save_Stats=Save_Stats())

@app.route("/Game", methods=['GET', 'POST'])
def Game():
    if request.method == 'POST':
        try:
            with open(f"Save_Games/{request.form['file']}", 'r') as json_file:
                json_data = json.load(json_file)
        except:
            return redirect("/Load_Game")
    else:
        return redirect("/Load_Game")
    return render_template('Game.html', json_data=json_data)

@app.route("/Load_Creator")
def Load_Creator():
    return render_template('Load_Creator.html', Save_Stats=Save_Stats())

@app.route("/Creator", methods=['GET','POST'])
def Creator():
    try:
        if request.method == 'POST':
            try:
                with open(f"game templates/{request.form['file']}", 'r') as json_file:
                    json_data = json.load(json_file)
            except:
                return redirect("/Load_Creator")
        else:
            return redirect("/Load_Creator")

        treeData = []
        allready_in_tree = set([0,-1,-2])

        def tree_list(i,repet):
            if i != None:
                if json_data["Game"][i]["Spring zu"][0] != "end" and not repet:
                    goto = copy.deepcopy(json_data["Game"][i]["Spring zu"])
                    allready_in_tree.add(repetitiv_value for repetitiv_value in goto)
                    return {
                        "name": json_data["Game"][i]["Titel"],
                        "section": i,
                        "ende":False,
                        "children":[tree_list(index,index in allready_in_tree) for index in goto]}
                return {
                    "name": json_data["Game"][i]["Titel"],
                    "section": i,
                    "ende": True,
                    "children": []}
            return {
                "name": "+",
                "section": -1,
                "ende": True,
                "children": []}

        treeData.append(tree_list(0,False))
    except:
        treeData = []

    return render_template('Creator.html', treeData=treeData, json_data=json_data)

@app.route("/Load_Game_Post", methods=['GET','POST'])
def main_Game():
    def delete():
        try:
            delete_file_name = str(request.get_json(force=True)["delete"]).split("/")[-1].split("\\")[-1].split(":")[-1]
            if delete_file_name.split(".")[-1] == "json":
                os.remove(f"Save_Games\\{delete_file_name}")
            else:
                return jsonify(success=False, false_file_suffix=True)
        except FileNotFoundError:
            return jsonify(success=False, exist=False)
        except:
            return jsonify(success=False)
        return jsonify(success=True)
    def select():
        try:
            return jsonify(success=True, templates=Save_Template())
        except:
            return jsonify(success=False)
    def create(file):
        files = os.listdir("Save_Games")
        print(file,files)
        if not (file in files):
            return jsonify(success=True,name="hallo.json")
        else:
            return jsonify(success=False, name=False)

    if request.method == 'POST':
        if str(request.get_json(force=True)["mode"]) == "delete":
            return delete()
        elif str(request.get_json(force=True)["mode"]) == "select":
            return select()
        elif str(request.get_json(force=True)["mode"]) == "create":
            return create(str(request.get_json(force=True)["location"]))
    return jsonify(success=False, mode = f"The mode {str(request.get_json(force=True)['mode'])} is not available or a wrong method was used")

@app.route("/Load_Creator_Post", methods=['GET','POST'])
def main_Creator():
    def delete():
        try:
            if request.method == 'POST':
                delete_file_name = str(request.get_json(force=True)["delete"]).split("/")[-1].split("\\")[-1].split(":")[-1]
                if delete_file_name.split(".")[-1] == "json":
                    os.remove(f"game templates\\{delete_file_name}")
                else:
                    return jsonify(success=False, false_file_suffix=True)
        except FileNotFoundError:
            return jsonify(success=False, exist=False)
        except:
            return jsonify(success=False)
        return jsonify(success=True)
    def create():
        return "Gut"

    if request.method == 'POST':
        if str(request.get_json(force=True)["mode"]) == "delete":
            return delete()
        elif str(request.get_json(force=True)["mode"]) == "create":
            return create()
    return jsonify(success=False, mode = f"The mode {str(request.get_json(force=True)['mode'])} is not available or a wrong method was used")

app.run(host= "0.0.0.0", port=5000)