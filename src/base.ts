import {
  closeMainWindow,
  environment,
} from "@raycast/api";
import { spawnSync } from "child_process";
import fs from "fs";


export default async function send(type: string) {
  console.log(`send:${type}`)
  await closeMainWindow({ clearRootSearch: true });
  const binary = `${environment.assetsPath}/media-key`;
  try {
    await fs.promises.access(binary, fs.constants.X_OK);
  } catch {
    await fs.promises.chmod(binary, 0o775);
  }
  //const { status, output, stdout, stderr, error } = spawnSync(binary, [type]);
  const { status, output, stdout, stderr, error } = spawnSync("/usr/bin/swift", [`${environment.assetsPath}/main.swift`, type]);
  console.log(status)
  console.log(output)
  console.log(error)
  console.log(stdout?.toString())
  console.log(stderr?.toString())
}
