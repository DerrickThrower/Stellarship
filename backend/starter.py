from selenium import webdriver
from bs4 import BeautifulSoup

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://harrit4:<db_password>@cluster0.dtapwpl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

driver = webdriver.Chrome()
driver.get("https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-type/first-in-family-scholarships")


soup = BeautifulSoup(driver.page_source, "html.parser")

titles = soup.find_all("h2", class_="margin-zero font-size-lg-2")
amounts = soup.find_all("li",  style="margin-left:20px;")

for i, ii in zip(titles, amounts):
    print('Title: ' + i.text)
    print('Amount: ' + ii.text.split('Amount')[1])

driver.quit()