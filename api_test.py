import json
import urllib.request
import urllib.error
import sys

def test_api(url):
    print(f"Testing {url}...")
    data = json.dumps({
        'uname': 'newtester1', 
        'email': 'newtest1@example.com', 
        'password': 'password123'
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    try:
        res = urllib.request.urlopen(req)
        print(f"Success! Response: {res.read().decode('utf-8')}")
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.read().decode('utf-8')}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        test_api(sys.argv[1])
    else:
        test_api('http://localhost:8000/api/auth/register/')
        test_api('https://moonflex.onrender.com/api/auth/register/')
