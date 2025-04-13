from selenium import webdriver
from bs4 import BeautifulSoup
import pprint
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo import ReplaceOne
from flask import Flask, jsonify, request
from flask_cors import CORS

# replace <db_password> with your actual password
uri = "mongodb+srv://harrit4:puSKIogoUl9CZqSY@cluster0.dtapwpl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))

db = client.scholarships

# scrapes the scholarship website for info cuhhhh
driver = webdriver.Chrome()
driver.get("https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-type/first-in-family-scholarships")

soup = BeautifulSoup(driver.page_source, "html.parser")

titles = soup.find_all("h2", class_="margin-zero font-size-lg-2")
amounts = soup.find_all("li",  style="margin-left:20px;")
deadline_elements = soup.find_all("li", style="margin-left:20px;")
deadline = []
for i in deadline_elements:
    deadline.append(i.find_next('li'))

# initializes a list object to put the data in

documents = []
"""
for i, ii,iii in zip(titles, amounts,deadline):
    print(i.text + " " + ii.text.split('Amount')[1] + " " + iii.text.split('Deadline')[1])"""
# iterates through the titles and amounts and appends them to the list
for i, ii, iii, iv in zip(titles, amounts, deadline, range(len(titles))):
    documents.append({
        '_id': str(iv),
        'title': i.text,
        'amount': ii.text.split('Amount')[1],
        'deadline': iii.text.split('Deadline')[1]
    })

operations = [
    ReplaceOne({"_id": doc["_id"]}, doc, upsert=True)
    for doc in documents
]
scholarships = db.titlesandamounts
scholarships.bulk_write(operations)
for i in scholarships.find():
    pprint.pprint(i)

driver.quit()

app = Flask(__name__)
CORS(app)

@app.route('/api/scholarships', methods=['GET'])
def get_scholarships():
    scholarships = list(db.titlesandamounts.find())
    return jsonify([{
        'id': str(sch['_id']),
        'title': sch['title'],
        'amount': sch['amount'],
        'deadline': sch['deadline']
    } for sch in scholarships])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)

