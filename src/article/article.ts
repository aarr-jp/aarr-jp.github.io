import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import fm, { type FrontMatterResult } from "front-matter";

export interface Article {
  slug: string;
  result: FrontMatterResult<any>;
}

export async function getWikiArticles() {
  const wikiArticleDir = join(process.cwd(), "article/wiki");
  const dirs = await readdir(wikiArticleDir);
  const articles: Article[] = [];

  for (const dir of dirs) {
    const path = join(wikiArticleDir, dir, "index.md");
    const index = await readFile(path, "utf8");
    const result = fm(index);

    articles.push({
      result,
      slug: (result.attributes as any).title,
    });
  }

  return articles;
}