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

# Archetype mapping
archetype_names = {
    "V": "Visionary",
    "I": "Dreamer", 
    "E": "Architect",
    "P": "Catalyst",
    "C": "Realist",
    "R": "Maverick",
    "S": "Connector",
    "M": "Sage",
    "L": "Builder",
    "A": "Harmonizer"
}

try:
    # Call the scoring API
    response = requests.post(
        'http://localhost:8000/score',
        json={'answers': sample_answers},
        headers={'Content-Type': 'application/json'}
    )
    response.raise_for_status()
    
    # Get the raw results
    raw_results = response.json()
    
    # Transform to match frontend expectations
    transformed_results = {
        "ranked": []
    }
    
    # Transform ranked array from [letter, score] to object format
    for letter, score in raw_results["ranked"]:
        transformed_results["ranked"].append({
            "archetype": archetype_names.get(letter, letter),
            "letter": letter,
            "score": score,
            "description": f"Score: {score:.1f}"
        })
    
    # Add top2_profile if exists
    if raw_results.get("top2_profile"):
        top2 = raw_results["top2_profile"]
        transformed_results["top2_profile"] = {
            "profile": top2.get("Profile Name", "Unknown Profile"),
            "class": top2.get("Class", "Unknown Class"),
            "pair": top2.get("(Archetypes)", "Unknown Pair")
        }
    
    # Add top3_profile if exists  
    if raw_results.get("top3_profile"):
        top3 = raw_results["top3_profile"]
        transformed_results["top3_profile"] = {
            "profile": top3.get("Profile Name", "Unknown Profile"),
            "class": top3.get("Class", "Unknown Class"),
            "triple": top3.get("Triple (Archetypes)", "Unknown Triple")
        }
    
    # URL encode the results for the query parameter
    results_json = json.dumps(transformed_results)
    encoded_results = urllib.parse.quote(results_json)
    
    # Print the URL to navigate to
    demo_url = f"http://localhost:3000/results?result={encoded_results}"
    
    print("Transformed Demo Results:")
    print(json.dumps(transformed_results, indent=2))
    print("\n" + "="*70)
    print("🚀 DEMO URL - Navigate to this in your browser:")
    print(demo_url)
    print("\n" + "="*70)
    print("📊 DEMO SUMMARY:")
    print(f"Top Archetype: {transformed_results['ranked'][0]['archetype']} ({transformed_results['ranked'][0]['letter']}) - {transformed_results['ranked'][0]['score']:.1f}")
    if 'top2_profile' in transformed_results:
        print(f"Profile: {transformed_results['top2_profile']['profile']}")
        print(f"Class: {transformed_results['top2_profile']['class']}")
    
except Exception as e:
    print(f"Error: {e}")
