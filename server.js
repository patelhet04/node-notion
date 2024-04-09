// Import statements for ES Modules
import Fastify from "fastify";
import { Client as NotionClient } from "@notionhq/client";
import { repoDataController } from "./controller/repoDataController.js";
import { exportMarkDownTable, parseMarkdownTable } from "./tableDataUtils.js";
import dotenv from "dotenv";
import { mapInternshipToNotionProperties } from "./dataMappingUtils.js";

dotenv.config();

const fastify = Fastify({ logger: true });

if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
  console.error(
    "Please set NOTION_API_KEY and NOTION_DATABASE_ID in your environment variables."
  );
  process.exit(1);
}

// Initializing Notion client
const notion = new NotionClient({
  auth: process.env.NOTION_API_KEY, // Ensure your Notion API key is stored in an environment variable
});

fastify.get("/fetch-internships", async (request, reply) => {
  try {
    const content = await repoDataController.fetchInternshipListings();
    const tableContent = exportMarkDownTable(content);
    const parsedContent = parseMarkdownTable(tableContent);

    const createInternshipPromises = parsedContent.map(async (internship) => {
      const properties = await mapInternshipToNotionProperties(internship);
      await exponentialBackoffRetry(async () => {
        await notion.pages.create({
          parent: { database_id: process.env.NOTION_DATABASE_ID },
          properties: properties,
        });
      });
    });

    await Promise.all(createInternshipPromises);
    console.log("Internships added to Notion database.");
    return reply.send({ message: "Internships added to Notion database." });
  } catch (error) {
    console.error("Error:", error.message);
  }
});

const exponentialBackoffRetry = async (
  operation,
  maxRetries = 5,
  baseDelay = 1000
) => {
  let retryCount = 0;
  while (retryCount < maxRetries) {
    try {
      await operation();
      return;
    } catch (error) {
      if (error.code === "conflict_error") {
        // Conflict error, retry with exponential backoff
        const delay = baseDelay * Math.pow(2, retryCount);
        await new Promise((resolve) => setTimeout(resolve, delay));
        retryCount++;
      } else {
        // If it's not a conflict error, rethrow the error
        throw error;
      }
    }
  }
  throw new Error("Max retries exceeded.");
};

fastify.get("/list-database", async (request, reply) => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    reply.send(response);
  } catch (error) {
    fastify.log(error);
    reply.code(500).send({ error: error.message });
  }
});

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
