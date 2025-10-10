import express from 'express';
import type { Request, Response } from 'express';
import OpenAI from 'openai';
import 'dotenv/config';
import z from 'zod';

const client = new OpenAI();
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Schema
const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, 'this is required field')
    .max(100, 'you have added too much text at a time!'),
  conversationId: z.uuid(),
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

const lastConversationID = new Map<string, string>();

app.post('/api/chat', async (req: Request, res: Response) => {
  const parseResult = chatSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json(parseResult.error.format());
    return;
  }

  const { prompt, conversationId } = req.body;

  const response = await client.responses.create({
    model: 'gpt-5-nano',
    input: prompt,
    previous_response_id: lastConversationID.get(conversationId),
  });
  lastConversationID.set(conversationId, response.id);

  res.json({ message: response.output_text });
});

app.listen(port, () => {
  console.log(`App is runnung at http://localhost:${port}`);
});
