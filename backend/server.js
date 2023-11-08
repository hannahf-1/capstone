import http from "http";
import fs from "fs";
import url from "url";
//import wurl from "whatwg-url";  // url.parse() is deprecated

const address = "127.0.0.1";
const port = 4001;


const server = http.createServer((req, res) => {
    console.log(req.url)
    //const local_url = new url.URL(req.url, address);
    //console.log(`requested url: ${local_url}`);
    res.end("hello client: " + req.url);
})


server.listen(port, address, () => {

})


