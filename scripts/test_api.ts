import { DefaultService, OpenAPI } from "../src/lib/api/index";

OpenAPI.BASE = "http://localhost:9003";

async function go() {
  // const x = await DefaultService.readRootIsCheckpointCheckpointIdGet("a")
  const x = await DefaultService.readRootIsCheckpointCheckpointIdGet;
  // const y = await DefaultService.readRootCheckpointCheckpointIdGet("notexist")
  // console.log(x, y)

  console.log(x);
}

go();
