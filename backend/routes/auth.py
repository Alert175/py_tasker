from flask import Flask, Blueprint, request, jsonify, make_response
import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId
import json


auth = Blueprint("auth", __name__)


# init databases
client = MongoClient("localhost", 27017)
db = client["takser"]


#create user
@auth.route("/create_user", methods=["POST"])
def create_user():
	if not request.json:
		return(400)
	else:
		data = request.json
		if "new_user_name" in data:
			user = db.info.insert({
				"user_name": data["new_user_name"],
				"tasks_array": []
				})
			return jsonify({"id_user": str(user)})
		else:
			return(400)


#login user
@auth.route("/login", methods=["POST"])
def login():
	if not request.json:
		return(400)
	else:
		data = request.json
		if "user_id" in data:
			user_id = json.loads(data["user_id"])
			user = db.info.find_one({'_id': ObjectId(user_id)})
			if user == None:
				return make_response("user_not_found", 200)
			else:
				if "tasks_array" in user and "user_name" in user:
					response_data = {
						"user_name": user["user_name"]
					}
					return make_response(jsonify(response_data), 200)
				else:
					return(400)
		else:
			return(400)