const fs = require("fs");

module.export = (req, res) => {
  const id = req.url.split('/')[2];
  const items = fs.readFile("items.json", "utf-8", (err, data) => {
if(err) {
res.writeHead(405);
res.end("could not delete file")
};
return data;
})
  const index = JSON.parse(items).findIndex(i => i.id === id);

  if (index === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Item not found' }));
    return;
  }

  const deleted = items.splice(index, 1)[0];
  fs.writeFile("items.json", JSON.stringify(deleted), (err) => {
if(err) {
res.writeHead(405);
res.end("could not write file to items.json");
}
})
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: true, data: deleted }));
};