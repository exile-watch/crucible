import { EncountersCategoryPage } from "#features/pages";

import type { CategoryPageType } from "@exile-watch/encounter-data";
import type { GetStaticPaths, GetStaticProps } from "next";
import { REVALIDATE_FREQUENCY } from "#constants";
import { checkIfDirExists } from "#features/directory/Directory.api";
import {
  fetchCategoryData,
  fetchCategoryPaths,
} from "#features/encounters/EncountersCategory/EncountersCategory.api";

export const runtime = "edge";

type GetStaticParams = {
  directory: string;
  category: string;
};

export const getStaticPaths = (async () => {
  const paths = await fetchCategoryPaths();
  return {
    paths,
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const { params } = context;

  if (!params) {
    return { notFound: true };
  }

  const { directory, category } = params;

  const dirExists = await checkIfDirExists(directory);
  const categoryData = await fetchCategoryData({ directory, category });

  if (!dirExists || !categoryData?.default) {
    return { notFound: true };
  }

  return {
    props: {
      data: categoryData?.default,
    },
    revalidate: REVALIDATE_FREQUENCY,
  };
}) satisfies GetStaticProps<{ data: CategoryPageType }, GetStaticParams>;

export default EncountersCategoryPage;
