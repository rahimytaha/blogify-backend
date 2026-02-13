import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { BlogService } from 'src/blog/blog.service';

@Injectable()
export class AiService {
  constructor(
    private config: ConfigService,
    private blogService: BlogService,
  ) {}
  async createBlog() {
    try {
      console.log('st');
      const ai = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-small-latest',
        temperature: 0.4,
        max_tokens: 5000,
         presence_penalty: 0.6, 
        response_format: { type: "json_object" },

        messages: [
          {
            role: 'system',
            content: `You are a tech blogger. Write ONLY in English.

Every time you get a message, make ONE completely new blog post.
NEVER repeat old topics. Always choose different topic.

Topics: React, Next.js, Node.js, TypeScript, JavaScript, Arduino, IoT.
Pick useful topic developers want in 2026.

Rules:
- Full post ~1400-1700 words = 10 minutes read
- Good structure: title, intro, headings with <h2> and <h3>, real code examples inside <pre><code>, lists with <ul><li> or <ol><li>, conclusion + call to action
- Good SEO: keywords in title and text
- All in English: title, content, excerpt
- Real code people can copy (use <pre><code class="language-jsx"> or similar)
- Content must be valid HTML (no markdown, no # or )
- we have this titles so create new things titles :[${await this.blogService.listOfTitles()}]
Answer ONLY valid JSON. No extra words. Start with { and end with }.

{
  "title": "English title with good keywords",
  "slug": "english-kebab-case-slug-example",
  "content": "<h1>Post title here</h1><p>Intro text...</p><h2>Section</h2><p>Text...</p><pre><code class=\"language-jsx\">code here</code></pre>...",
  "readingTime": 10,
  "excerpt": "Short English summary 150-200 characters",
  "status": "DRAFT",
  "publishedAt": "2026-02-13T10:00:00Z",
  "coverImage": "https://picsum.photos/1200/630",
  "isFeatured": false
}

Now make one new post. Different from last time.`
          },
          {
            role: 'user',
            content: 'go'
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${this.config.get("MISTRAL_KEY")}`,
          'Content-Type': 'application/json'
        }
      }
    );
      let content = ai.data.choices[0].message.content;
      content = content.trim();
      content = content.replace(/^```json\s*/, '');
      content = content.replace(/\s*```$/, '');
      const response = JSON.parse(content);
      response["slug"]=response.slug + Math.random()
      await this.blogService.create(response);
    } catch (error) {
      console.log(error);
    }
  }
}
