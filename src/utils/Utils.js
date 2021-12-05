const getBodyData = (req, res) => new Promise((resolve) => {
    try {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: error.message }))
            }
        })
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: error.message }))
    }
});

const validatePersonProperties = ({ name, age, hobbies }, res) => {
    if (name && typeof name !== 'string') {
        res.writeHead(400, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({ message: 'Name must be of type "string"' }));
        return false;
    }

    if (age && typeof age !== 'number') {
        res.writeHead(400, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({ message: 'Age must be of type "number"' }));
        return false;
    }

    if (hobbies && !hobbies.every((element) => typeof element === 'string')) {
        res.writeHead(400, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({ message: 'Each hobby must be of type "string"' }));
        return false;
    }

    return true;
}

const extractFirstId = (req) => req.url.split('/')[2];
const extractSecondId = (req) => req.url.split('/')[4];

const splitChunks = (array, size) => {
    const results = [];

    while (array.length) {
        const chunk = array.splice(0, size);

        results.push(chunk)
    }

    return results;
};

module.exports = {
    getBodyData,
    validatePersonProperties,
    extractFirstId,
    extractSecondId,
    splitChunks,
}