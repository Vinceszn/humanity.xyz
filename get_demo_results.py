import json
import requests
import urllib.parse

# Sample answers for demonstration
sample_answers = {
    "1": "A", "2": "B", "3": "C", "4": "D", "5": "E", "6": "A", "7": "B", "8": "C", "9": "D", "10": "E",
    "15": "A", "16": "B", "17": "C", "18": "D", "19": "E", "20": "A", "21": "B", "22": "C", "23": "D", "24": "E",
    "25": "A", "26": "B", "27": "C", "28": "D", "29": "E", "30": "A", "31": "B", "32": "C", "33": "D", "34": "E",
    "35": "A", "36": "B"
}

try:
    # Call the scoring API
    response = requests.post(
        'http://localhost:8000/score',
        json={'answers': sample_answers},
        headers={'Content-Type': 'application/json'}
    )
    response.raise_for_status()
    
    # Get the results
    results = response.json()
    
    # URL encode the results for the query parameter
    results_json = json.dumps(results)
    encoded_results = urllib.parse.quote(results_json)
    
    # Print the URL to navigate to
    demo_url = f"http://localhost:3000/results?result={encoded_results}"
    
    print("Demo Results JSON:")
    print(json.dumps(results, indent=2))
    print("\n" + "="*50)
    print("Demo URL:")
    print(demo_url)
    
except Exception as e:
    print(f"Error: {e}")
