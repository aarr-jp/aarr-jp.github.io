import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import { getWikiArticles } from "../../../article/article";
import { compile } from "../../../article/markdown";
import InternalLink from "../../internal-link";
import Content from "./content";

const dev = process.env.NODE_ENV === "development";

interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // TODO: 遅いのでキャッシュする
  const articles = await getWikiArticles();
  const article = articles.find((article) => article.slug === slug);

  return {
    title: article?.result.attributes.title,
  };
}

export async function generateStaticParams(): Promise<Params[]> {
  const articles = await getWikiArticles();

  return articles.map((a) => ({
    // TODO: は？
    slug: dev ? encodeURIComponent(a.slug) : a.slug,
  }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  // TODO: 遅いのでキャッシュする
  const articles = await getWikiArticles();
  const article = articles.find(
    (article) =>
      // TODO: は？
      article.slug === slug || article.slug === decodeURIComponent(slug),
  );

  if (!article) {
    throw new Error(`Invalid slug: ${slug}`);
  }

  const html = await compile(article.result.body);

  return (
    <Stack spacing={2} padding={2}>
      <Box>
        <InternalLink href="/">← ホームに戻る</InternalLink>
      </Box>
      <Typography component="h1" variant="h4">
        {article.result.attributes.title}
      </Typography>
      <Typography>タグ: {article.result.attributes.tags}</Typography>
      <Divider />
      <Content html={html} />
    </Stack>
  );
}