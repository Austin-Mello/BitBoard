from flask import Flask, render_template, redirect, jsonify
from os.path import exists
import fileIO
import database

app = Flask(__name__)


@app.route("/")
def main():
    return render_template('index.html')

@app.route("/getBitBoard", methods=['GET'])
def getBoard():
    #pixel = database.grabPixel(0)
    #print(pixel)
    #return pixel
    return "#000000"

#@app.route("/setColor", methods=['POST'])
#def setColor(row, col, color):

if __name__ == "__main__":
    pixel = database.grabPixel(0)
    print(pixel)

    app.run(debug=True, host="0.0.0.0", port=8080)