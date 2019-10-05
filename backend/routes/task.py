from flask import Flask, Blueprint, request, jsonify, make_response
import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId
import json


task = Blueprint("task", __name__)


# init databases
client = MongoClient("localhost", 27017)
db = client["takser"]

# getting tasks
@task.route("/get_tasks", methods=["POST"])
def get_tasks():
	if not request.json:
		return make_response("invalid data format", 403)
	else:
		if not "user_id" in request.json:
			return make_response("this data is not correct", 403)
		else:
			user_id = json.loads(request.json["user_id"])
			user_info = db.info.find_one({'_id': ObjectId(user_id)})
			return make_response(jsonify(user_info["tasks_array"]), 200)