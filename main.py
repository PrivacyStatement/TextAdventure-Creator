from flask import Flask , render_template


app = Flask(__name__)

@app.route("/")
def index():
    return render_template('Start.html')

@app.route("/Load_Game")
def Load():
    return render_template('Load_Game.html')

@app.route("/Game")
def Game():
    return render_template('Game.html')

app.run(host= "0.0.0.0", port=5000)
