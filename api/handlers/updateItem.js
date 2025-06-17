const fs = require("fs");

module.exports = (req, res) => {
  const body = [];

  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const parsedItem = Buffer.concat(body).toString();
    const detailsToChange = JSON.parse(parsedItem);
    const itemId = detailsToChange.id;

    fs.readFile("items.json", "utf-8", (err, items) => {
      if (err) {
        console.log(err);
        res.writeHead(404);
        res.end("An error occured");
      }
      const itemsObj = JSON.parse(items);
      const itemIndex = itemsObj.findIndex((item) => item.id === itemId);
      if (itemIndex === -1) {
        res.writeHead(404);
        res.end(
          JSON.stringify({
            message: "Item with specified ID not found",
          })
        );
        return;
      }

      const updateditems = { ...itemsObj[itemIndex], ...detailsToChange };
      itemsObj[itemIndex] = updateditems;

      fs.writeFile("items.json", JSON.stringify(itemsObj), (err) => {
        if (err) {
          res.writeHead(500);
          res.end("there was an error updating the items db");
        }

        res.writeHead(200);
        res.end("item successfully updated");
      });
    });
  });
};
