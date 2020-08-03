import { run } from "./build.js";

module.exports = ctx => {
  let runParams = {
    env: "formalTest"
  };
  run(ctx, runParams);
};
