from flask import Flask, Blueprint, request, jsonify
import pymongo
from pymongo import MongoClient


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
			print(data["new_user_name"])
			users = db.info.insert({
				"user_name": data["new_user_name"]
				})
			print(users)
			return "ok"
		else:
			return(400)
