from flask import Flask, request, render_template, redirect, flash, jsonify, session
from surveys import satisfaction_survey as survey

app = Flask(__name__)

RESPONSES_KEY = "responses"
app.config['SECRET_KEY'] = "secret"

@app.route('/')
def home_page():
    return render_template("home.html")

@app.route('/clear', methods=["POST"])
def clear_list():
    session[RESPONSES_KEY] = []
    return redirect('/questions/0')

@app.route('/questions/<int:id>')
def questions(id):
    responses = session.get(RESPONSES_KEY)
    question = survey.questions[id]
    if responses is None:
        return redirect('/')
    
    if len(session[RESPONSES_KEY]) == len(survey.questions):
        return redirect('/comlete')
    
    if (len(responses) != id):
        flash("Invalid Question")
        return redirect(f"/questions/{len(responses)}")

    return render_template("question-1.html", question = question, id = (id + 1))

@app.route('/answers', methods = ["POST"])
def answers():
    answer = request.form["answer"]
    responses = session[RESPONSES_KEY]
    responses.append(answer)
    session[RESPONSES_KEY] = responses

    if len(session[RESPONSES_KEY]) == len(survey.questions):
        return redirect('/complete')
    else:
        return redirect(f'/questions/{len(session[RESPONSES_KEY])}')
    
@app.route("/complete")
def complete():
    return render_template("complete.html")