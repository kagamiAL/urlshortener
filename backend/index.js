const config = require("./utils/config");
const logger = require("./utils/logger");
const app = require("./App");

app.listen(config.PORT, () => {
  logger.info("App listening on PORT:", config.PORT);
});
