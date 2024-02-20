const Parser = require("rss-parser");
const parser = new Parser;
const express = require('express');
const app = express();
const port = 80;
const fs = require('node:fs');

app.get('/', async (req, res) => {
    var send = '';
    let feed = await parser.parseURL("https://www.ahaber.com.tr/rss/galeri/ekonomi.xml");
    feed.items.forEach(i => {
        send += `
        <div class="news-box" onclick="window.open('${i.link}')">
            <img src="${i.enclosure.url}">
            <h2>${i.title}</h2>
        </div>
        `;
    });
    let content = fs.readFileSync("./index.html", "utf8");
    content = content.replace("$haberler", send);
    res.send(content);
});

app.get("/style.css", (req, res) => {
    res.sendFile(__dirname + "/style.css");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})