import express from "express";
import { statusComplete, statusError} from "./utils.js";

const app = express();
const PORT = 3000;

app.use(express.json());

const storage = [];


app.get('/storage', (req, res) => {
    return statusComplete(res, 200, storage)
});


app.get('/storage/:id', (req, res) => {
    const index = req.params.id
    if (!storage[index]) {
        return statusError(res, 404, "not found");
    }
    return statusComplete(res, 200, storage[index])
});


app.post('/storage', (req, res) => {
    if (typeof req.body.element !== "string") {
        return statusError(res, 400, "not string")
    }
    storage.push(req.body.element);
    return statusComplete(res, 200, storage)
});


app.delete('/storage/delete', (req, res) => {
    storage.length = 0
    return statusComplete(res, 200, storage)
});


app.delete('/storage/:id', (req, res) => {
    const index = req.params.id
    if (!storage[index]) {
        return statusError(res, 404, "not found");
    }
    storage.splice(index, 1)
    return statusComplete(res, 200, storage)
});



app.listen(PORT);



