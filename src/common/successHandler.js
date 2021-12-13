const SuccessHandler = {
    OK: (res, data) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    },
    created: (res, data) => {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    },
    noContent: (res, data) => {
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }
};


module.exports = SuccessHandler;