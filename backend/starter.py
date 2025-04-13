from selenium import webdriver
from bs4 import BeautifulSoup
import pprint
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo import ReplaceOne
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize MongoDB connection
db = None
try:
    # Update this with your correct MongoDB Atlas connection string
    uri = "mongodb+srv://harrit4:puSKIogoUl9CZqSY@cluster0.dtapwpl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    client = MongoClient(uri, server_api=ServerApi('1'))
    # Test the connection
    client.admin.command('ping')
    db = client.scholarships
    print("Successfully connected to MongoDB!")
except Exception as e:
    print(f"Could not connect to MongoDB: {e}")
    print("The application will run in demo mode without database connection")

# Sample data for demo mode
sample_scholarships = [
    {
        'id': '1',
        'title': 'First Generation Scholarship',
        'amount': '$5,000',
        'deadline': 'May 1, 2024'
    },
    {
        'id': '2',
        'title': 'Academic Excellence Award',
        'amount': '$2,500',
        'deadline': 'June 15, 2024'
    }
]

# Scraping function - only run if MongoDB is connected
def scrape_scholarships():
    if db is None:
        print("Skipping scraping - MongoDB not connected")
        return

    try:
        driver = webdriver.Chrome()
        driver.get("https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-type/first-in-family-scholarships")

        soup = BeautifulSoup(driver.page_source, "html.parser")

        titles = soup.find_all("h2", class_="margin-zero font-size-lg-2")
        amounts = soup.find_all("li", style="margin-left:20px;")
        deadline_elements = soup.find_all("li", style="margin-left:20px;")
        deadline = []
        for i in deadline_elements:
            deadline.append(i.find_next('li'))

        documents = []
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
        print("Successfully scraped and stored scholarships!")
        
        driver.quit()
    except Exception as e:
        print(f"Error during scraping: {e}")

@app.route('/api/scholarships', methods=['GET'])
def get_scholarships():
    try:
        if db is not None:
            scholarships = list(db.titlesandamounts.find())
            return jsonify([{
                'id': str(sch['_id']),
                'title': sch['title'],
                'amount': sch['amount'],
                'deadline': sch['deadline']
            } for sch in scholarships])
        else:
            # Return sample data if database is not connected
            return jsonify(sample_scholarships)
    except Exception as e:
        print(f"Error fetching scholarships: {e}")
        return jsonify(sample_scholarships)  # Fallback to sample data

if __name__ == '__main__':
    # Only scrape if MongoDB is connected
    if db is not None:
        scrape_scholarships()
    app.run(debug=True, host='0.0.0.0', port=5001)

