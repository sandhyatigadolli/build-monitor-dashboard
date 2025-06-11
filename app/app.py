from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

@app.route('/')
def dashboard():
    with open('app/builds.json') as f:
        builds = json.load(f)
    return render_template('dashboard.html', builds=builds)

if __name__ == '__main__':
    app.run(debug=True)
