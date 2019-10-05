from flask import Flask, Blueprint, request, jsonify, make_response
import pymongo
from pymongo import MongoClient, ReturnDocument
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
			response_info = {
				"user_name": user_info["user_name"],
				"tasks": user_info["tasks_array"]
			}
			return make_response(jsonify(response_info), 200)


@task.route("/change_status_task", methods=["PUT"])
def change_status_task():
	if not request.json:
		return make_response("invalid data format", 403)
	else:
		if not "id_user" in request.json:
			return make_response("no user id specified", 403)
		else:
			if not "id_task" in request.json:
				return make_response("no task id specified", 403)
			else:
				if not "status_task" in request.json:
					return make_response("no task status specified", 403)
				else:
					request_info = request.json
					update_info = db.info.find_one_and_update(
						{
							"_id": ObjectId(request_info["id_user"])
						},
						{
							"$set":{
								"tasks_array.{id_task}.status_complete".format(id_task=request_info["id_task"]): "true" == request_info["status_task"]
							}
						},
							return_document=ReturnDocument.AFTER
						)
					return make_response("ok", 200)


@task.route("/delete_task", methods=["POST"])
def delete_task():
	if not request.json:
		return make_response("invalid data format", 403)
	else:
		if not "id_user" in request.json:
			return make_response("no user id specified", 403)
		else:
			if not "id_task" in request.json:
				return make_response("no task id specified", 403)
			else:
				request_info = request.json
				try:
					update_info = db.info.find_one_and_update(
						{
							"_id": ObjectId(request_info["id_user"])
						},
						{
							"$pull": {
								"tasks_array": {
									"id": request_info["id_task"]
								}
							}
						},
						return_document=ReturnDocument.AFTER
					)
					return make_response("ok", 200)
				except:
					print("internal error databases")
					make_response("internal error databases", 400)