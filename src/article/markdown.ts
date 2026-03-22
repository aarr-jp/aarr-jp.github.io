import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { rehypeWikiLink } from "./rehype-wiki-link";

export const compile = async (markdown: string): Promise<string> =>
  unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      defaultLang: "plaintext",
    })
    .use(rehypeWikiLink)
    .use(rehypeStringify)
    .process(markdown)
    .then((file) => file.toString());