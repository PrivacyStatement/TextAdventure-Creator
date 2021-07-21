from flask import Flask , render_template
import os
import json


app = Flask(__name__)

@app.route("/")
def index():
    return render_template('Start.html')

@app.route("/Load_Game")
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
    return render_template('Load_Game.html', Save_Stats=Save_Stats())

@app.route("/Game")
def Game():
    return render_template('Game.html')

@app.route("/Load_Creator")
def Load2():
    return render_template('Load_Creator.html')

@app.route("/Creator")
def Creator():
    return render_template('Creator.html')

app.run(host= "0.0.0.0", port=5000)
