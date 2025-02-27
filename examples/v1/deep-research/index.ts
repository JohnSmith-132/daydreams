import { createGroq } from "@ai-sdk/groq";
import { cli, createDreams, LogLevel } from "@daydreamsai/core/v1";
import { deepResearch } from "./research";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY!,
});

createDreams({
  logger: LogLevel.INFO,
  model: groq("deepseek-r1-distill-llama-70b"),
  debugger: async (contextId, keys, data) => {
    const [type, id] = keys;
    await Bun.write(`./logs/${contextId}/${id}-${type}.md`, data);
  },
  extensions: [cli, deepResearch],
}).start();
