import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import { getWikiArticles } from "../../../article/article";
import InternalLink from "../../internal-link";

const dev = process.env.NODE_ENV === "development";

interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${decodeURIComponent(slug)}の記事`,
  };
}

export async function generateStaticParams(): Promise<Params[]> {
  // TODO: 遅い
  const articles = await getWikiArticles();
  const tags: Set<string> = new Set();

  for (const a of articles) {
    const articleTags = a.result.attributes.tags?.split(/\s+/);
    if (!articleTags) continue;

    for (const tag of articleTags) {
      tags.add(tag);
    }
  }

  return [...tags].map((tag) => ({
    slug:
      // TODO: は？
      dev ? encodeURIComponent(tag) : tag,
  }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  // TODO: 遅い
  const articles = await getWikiArticles();
  const tagArticles = articles
    .map((a) => ({
      article: a,
      tags: new Set(a.result.attributes.tags?.split(/\s+/)),
    }))
    .filter((a) => a.tags.has(slug) || a.tags.has(decodeURIComponent(slug)));

  return (
    <Stack padding={2} spacing={2}>
      <Typography component="h1" variant="h4">
        {dev ? decodeURIComponent(slug) : slug}の記事
      </Typography>
      <Stack spacing={1} alignItems="flex-start">
        {tagArticles
          .toSorted((a, b) => b.article.length - a.article.length)
          .map((a) => (
            <InternalLink
              key={a.article.slug}
              href={`/wiki/${encodeURIComponent(a.article.slug)}`}
            >
              {a.article.result.attributes.title} ({a.article.length}字)
            </InternalLink>
          ))}
      </Stack>
    </Stack>
  );
}