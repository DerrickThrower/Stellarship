from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('chatbot.log'),
        logging.StreamHandler()
    ]
)

# Load environment variables
load_dotenv()
app = Flask(__name__)

# Enable CORS for all domains
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize OpenAI client
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    logging.error("OPENAI_API_KEY not found in environment variables")
    raise ValueError("OPENAI_API_KEY not found in environment variables")

client = OpenAI(api_key=api_key)
logging.info("OpenAI client initialized successfully")

@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    start_time = datetime.now()
    logging.debug(f"Received chat request at {start_time}")
    
    # Handle preflight request
    if request.method == "OPTIONS":
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    try:
        # Log request headers and data
        logging.debug(f"Request headers: {dict(request.headers)}")
        data = request.get_json(silent=True)
        logging.debug(f"Request data: {data}")
        
        if not data:
            logging.warning("No data provided in request")
            return jsonify({"error": "No data provided"}), 400
            
        user_message = data.get("message", "")
        logging.debug(f"User message: {user_message}")
        
        if not user_message:
            logging.warning("Empty message provided")
            return jsonify({"error": "No message provided"}), 400

        # Log OpenAI API call
        logging.debug("Making OpenAI API call...")
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": """You are an expert scholarship advisor on the website Stellarship, Stellarship is a 
                 user-friendly platform designed 
            to centralize scholarship resources specifically for first-generation college students. 
            It helps users easily find and keep track of available scholarships by providing key 
            details such as award amounts, deadlines, eligibility requirements, and application tips. 
            Stellarship empowers students with the information and tools they need to confidently pursue
            financial aid opportunities and achieve their academic goals. You have extensive knowledge of:
1. Various types of scholarships (merit-based, need-based, athletic, etc.)
2. Scholarship application processes and requirements
3. Essay writing and interview preparation
4. Scholarship search strategies
5. Common scholarship mistakes to avoid
6. Scholarship deadlines and timelines
7. Local and national scholarship opportunities

Your responses should:
• Be specific and actionable
• Include relevant examples when possible
• Focus on practical advice
• Maintain a supportive and encouraging tone
• Provide step-by-step guidance when appropriate
• Include relevant deadlines or timeframes
• Suggest multiple options when applicable

If asked about unrelated topics, gently redirect the conversation back to scholarships and educational funding."""},
                {"role": "user", "content": user_message}
            ]
        )
        logging.debug("OpenAI API call completed successfully")

        # Extract and log the response
        bot_response = response.choices[0].message.content
        logging.debug(f"Bot response: {bot_response}")

        # Calculate and log response time
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        logging.info(f"Request completed in {duration} seconds")

        return jsonify({
            "response": bot_response
        })

    except Exception as e:
        # Log detailed error information
        logging.error(f"Error occurred: {str(e)}", exc_info=True)
        return jsonify({
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }), 500

if __name__ == "__main__":
    logging.info("Starting Flask server...")
    app.run(debug=True, host='0.0.0.0', port=5002)
