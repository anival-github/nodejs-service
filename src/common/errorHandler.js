const ErrorHandler = {
    badRequest: (res, data) => {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    },
    notFound: (res, data) => {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    },
    internalServerError: (res, data) => {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(data))
    }
}

module.exports = { ErrorHandler };
