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
