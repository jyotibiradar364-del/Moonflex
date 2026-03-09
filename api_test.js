const http = require('http');
const https = require('https');

function testAPI(urlStr) {
    console.log(`Testing ${urlStr}...`);
    const data = JSON.stringify({
        uname: 'test_node_user',
        email: 'test_node@example.com',
        password: 'password123'
    });

    const url = new URL(urlStr);
    const options = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: url.pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = (url.protocol === 'https:' ? https : http).request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log(`Status: ${res.statusCode}`);
            console.log(`Response: ${body}`);
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request to ${urlStr}: ${e.message}`);
    });

    req.write(data);
    req.end();
}

testAPI('http://localhost:8000/api/auth/register/');
testAPI('https://moonflex.onrender.com/api/auth/register/');
