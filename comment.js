const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/comments') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const comment = JSON.parse(body);
            // Save the comment to a database or perform any other necessary operations
            console.log('Received comment:', comment);
            res.statusCode = 200;
            res.end('Comment received');
        });
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
