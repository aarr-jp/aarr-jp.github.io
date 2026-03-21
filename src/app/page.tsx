import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getWikiArticles } from "../article/article";
import InternalLink from "./internal-link";

export default async function Page() {
  const articles = await getWikiArticles();

  return (
    <Stack spacing={2} padding={2}>
      <Typography component="h1" variant="h4">
        荒連資料館
      </Typography>
      <Stack spacing={1} alignItems="flex-start">
        {articles.map((article) => (
          <InternalLink
            key={article.slug}
            href={`/wiki/${encodeURIComponent(article.slug)}`}
          >
            {article.result.attributes.title}
          </InternalLink>
        ))}
      </Stack>
    </Stack>
  );
}