import json
from flask import Flask, jsonify, request
from utils.data import preprocess_data, find_similar_rows
import os
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
df = None

def clean_dict(d):
    cleaned = {}
    for k, v in d.items():
        if isinstance(v, dict):
            new_dict = clean_dict(v)
            if new_dict:
                cleaned[k] = new_dict
        elif isinstance(v, list):
            cleaned_list = [item for item in v if not pd.isna(item)]
            if cleaned_list:  
                cleaned[k] = cleaned_list
        else:
            if not pd.isna(v):
                cleaned[k] = v
    return cleaned
    
@app.route('/search_csv', methods=['POST'])
def search_csv_api():
    data = request.get_json()
    text = data.get('text')
    print("text:",text)
    if text:
        rows_dict = clean_dict(find_similar_rows(text).to_dict())
        response = jsonify({'success': True, 'similiar_rows': rows_dict})
        print(rows_dict)
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers['Content-Type'] = 'application/json'
        return response
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

if __name__ == '__main__':
   script_dir = os.path.dirname(__file__)
   relative_path = 'data/argon.csv'
   file_path = os.path.join(script_dir, relative_path)
   df = preprocess_data(file_path)
   app.run(port=5000)