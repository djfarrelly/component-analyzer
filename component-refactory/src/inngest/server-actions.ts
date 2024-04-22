"use server";
import { client } from "./client";

import { addProject, updateProjectStatus } from "@/db";

export async function onParseProject({
  user,
  repo,
  appRoot,
}: {
  user: string;
  repo: string;
  appRoot: string;
}) {
  const id = Math.random().toString(36).substring(7);

  await addProject(id, user, repo, appRoot);
  await updateProjectStatus(id, "Starting processing", false);

  await client.send({
    name: "system/parse-project",
    data: {
      trackingId: id,
      user,
      repo,
      appRoot,
    },
  });

  return id;
}
