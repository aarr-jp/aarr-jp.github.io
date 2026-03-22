import type { Root } from "hast";
import { selectAll } from "hast-util-select";
import type { Plugin } from "unified";
import { getWikiArticles } from "./article";

export const rehypeWikiLink: Plugin<[], Root, Root> = () => async (tree) => {
  const articles = await getWikiArticles();
  const slugs = new Set(articles.map((a) => a.slug));

  for (const node of selectAll("a", tree)) {
    const href = node.properties.href;
    if (typeof href !== "string") continue;
    if (!href.startsWith("/wiki/")) continue;

    const slug = href.split("/").pop();
    if (!slug) continue;

    // 存在しているリンクは何もしない
    if (slugs.has(decodeURIComponent(slug))) continue;

    node.tagName = "span";
    node.properties.href = undefined;
    node.properties.class = "deadLink";
    node.properties.title = "まだ存在しない記事";
  }
};