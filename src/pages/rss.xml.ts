import type { APIRoute } from "astro";

import { getCollection } from "astro:content";
import { site } from "~/config";
import { Feed } from "feed";
import { sortByDate } from "~/lib/utils";

export const get: APIRoute = async () => {
  const allPosts = await getCollection(
    "blog",
    (item) => !item.data.is_page && item.data.date
  );

  const feed = new Feed({
    title: site.title,
    description: site.description,
    id: site.url,
    copyright: `All rights reserved`,
    link: site.url,
  });

  for (const post of sortByDate(allPosts)) {
    feed.addItem({
      title: post.data.title,
      date: post.data.date!,
      link: `${site.url}/${post.slug}`,
    });
  }
  return {
    body: feed.rss2(),
  };
};
