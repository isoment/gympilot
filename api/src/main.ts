import { startWebServer } from "./server/server";

async function start() {
  return Promise.all([startWebServer()]);
}

start()
  .then((response) => {
    console.log(`Server running on port ${response[0].port}`);
  })
  .catch((error) => {
    console.log(error.message);
  });

// import http from "http";

// export const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(
//     JSON.stringify({
//       data: "It Works!",
//     }),
//   );
// });

// server.listen(5000, () => {
//   console.log("Server running on http://localhost:3000/");
// });
