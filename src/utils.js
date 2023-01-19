export function statusError(res, statusCode, error) {
    return res.status(statusCode).send({error: error})
};

export function statusComplete(res, statusCode, complete) {
    return res.status(statusCode).send ({data: complete})
};