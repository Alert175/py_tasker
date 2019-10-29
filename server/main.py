from flask import Flask, url_for, request, jsonify, render_template
from routes.auth import auth
from routes.task import task

app = Flask(__name__,
			static_url_path="/public",
			static_folder="./public",
			template_folder="./public")


# register routes
app.register_blueprint(auth, url_prefix='/api/auth')
app.register_blueprint(task, url_prefix='/api/task')


# main request
@app.route("/", methods=["GET"])
def get_index():
	return render_template("index.html")


# get file for vue-build
# также в запросе проверяется, запрашивается файл, или какой-либо маршрут
@app.route("/<path:path>", methods=["GET"])
def get_file(path):
	result = path.find(".")
	if result > -1:
		return app.send_static_file(path)
	else:
		return render_template("index.html")
	


# run application
if __name__ == "__main__":
	app.run(debug=True,
			host="0.0.0.0")
