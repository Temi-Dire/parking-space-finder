// const http = require("http");
// const port = 3500;

// const server = http.createServer((req, res) => {
//   console.log(req.url);
//   res.end("hello world");
// });

// server.listen(port, (err) => {
//   if (err) console.log("There is an error");
//   else console.log(`server is listening at port ${port}`);
// });
document.getElementById("contactLink").addEventListener("click", function () {
  let dropdown = document.getElementById("contactDropdown");
  let contactButton = document.getElementById("contactLink");
  contactButton.style.backgroundColor =
    contactButton.style.backgroundColor === "white" ? "transparent" : "white";

  contactButton.style.color =
    contactButton.style.color === "black" ? "white" : "black";

  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});
