from pymongo import MongoClient, errors

class MongoDatabase:
  def __init__(self):
    self.colleciton = None
    self.client = None
    self.db = None
    self.mongo_uri = "mongodb://root:example@localhost:27017/"
  
  def connect(self, db_name="shorts"):
    try:
      # Connect with a MongoClient object using MONGO_URI
      self.client = MongoClient(self.mongo_uri, serverSelectionTimeoutMS=5000) 
      # Extract the database from mongo client
      self.db = self.client['shorts']
      # Extract what collection we want to interact with and return it
      self.collection = self.db["short_ids"]
      print("Mongo Database Connected!")
      # self.collection.create_index("id", unique=True)
      return self.collection
    except errors.ServerSelectionTimeoutError as e:
      print("failed to connect ", e)
      raise

  def disconnect(self):
    if self.client:
      self.client.close()
      print("Closed connection!")
    else:
      print("No connection currently open...")


# db = MongoDatabase()

# collection = db.connect()
# users = collection.find()
# doc = {
#   "age": "123",
#   "time": "456",
#   "day": "99343"
# }

# collection.insert_one(doc)

# for user in users:
#   print(user)

# mongo = MongoDatabase()
# collection = mongo.col

# res = collection.delete_many({})
# print(res)

# for user in collection.find():
#   print(user)


# # Insert a single document
# result = collection.insert_one({"name": "Alice", "age": 25})
# print("Inserted ID:", result.inserted_id)

# # Insert multiple documents
# documents = [
#     {"name": "Bob", "age": 30},
#     {"name": "Charlie", "age": 22}
# ]
# # result = collection.insert_many(documents)
# # print("Inserted IDs:", result.inserted_ids)

# # Query to verify insertion
# for user in collection.find({'name': "Bob"}):
#     print(user)
# for user in collection.find({}):
#     print(user)


