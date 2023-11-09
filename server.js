import http from "http";
import fs from "fs";
import url from "url";
import qstring from "querystring";

//import wurl from "whatwg-url";  // url.parse() is deprecated

const address = "127.0.0.1";
const port = 4002;

const server = http.createServer((req, res) => {
    console.log(`Request received: ${req.method} ${req.url}`);

    log_info(req, res);

    switch (req.method) {
        case "GET":
            handleGet(req, res);
            break;
        case "POST":
            handlePost(req, res);
            break;
        case "PUT":
            handlePut(req, res);
            break;
        case "DELETE":
            handleDelete(req, res);
            break;
        default:
            console.log("Unsupported request method");
            break;
    }

    //console.log(`requested url: ${local_url}`);
    console.log("************END*************")
    //res.end(); //calling end overwrites written htmml file
})


const log_info = (request, response) => {
    const local_url = new url.URL(request.url, `http://${request.headers.host}`);
    //console.log(local_url);
    console.log(`pathname: ${local_url.pathname}`);

    let str_buf = "";
    const urlParams = local_url.searchParams;
    console.log("Search Params: ");
    if (urlParams && urlParams.size > 0) {
        for (const [key, value] of urlParams) {
            console.log(`\t -> ${key}: ${value}`);
            //str_buf += `\t${key}: ${value}\n`;
        }
    } else {
        console.log("\tNone")
    }
}

function handleGet(request, response) {

    const local_url = new url.URL(request.url, `https://${request.headers.host}`);
    switch (local_url.pathname) {
        case '/':
            response.writeHead(200, { "Content-Type": "text/html" })
            fs.createReadStream("frontend\\index.html").pipe(response)
            break;
        default:
            response.writeHead(404, { "Content-Type": "text/html" })
            response.write(`'${local_url.pathname}' not found`)
            //needs to be called here since we're calling write()
            //browser will continue to load if not
            response.end()
            break;
    }

}

const handlePost = (request, response) => {
    let query_data = ""

    request.on('data', (data) => {
        query_data += data;
        console.log()
    })

    request.on("end", () => {
        response.writeHead(200, {'Content-Type': 'text/plain'})
        response.write(`Hello ${query_data}`)
        response.end();
    })

}

server.listen(port, address, () => {
    console.log(`Listening on ${address}:${port}`);
    console.log("---------------------------")
})


