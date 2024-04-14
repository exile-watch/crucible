import { EncountersCategoryPage } from "#features/pages";

import {checkIfDirExists} from "#features/directory/Directory.api";
import {fetchCategoryPaths, fetchCategoryData} from "#features/encounters/EncountersCategory/EncountersCategory.api";
import {GetStaticPaths, GetStaticProps} from "next";
import type {CategoryPageType} from "@exile-watch/encounter-data";

type GetStaticParams = {
  directory: string;
  category: string;
}

export const getStaticPaths = (async () => {
  const paths = await fetchCategoryPaths();
  return {
    paths,
    fallback: 'blocking'
  };
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
  const { params } = context;

  if (!params) {
    return { notFound: true };
  }

  const { directory, category } = params;

  const dirExists = await checkIfDirExists(directory);
  const categoryData = await fetchCategoryData({directory, category});

  if (!dirExists || !categoryData?.default) {
    return { notFound: true };
  }

  return {
    props: {
      data: categoryData?.default
    },
    revalidate: 60, // Revalidate at most once per minute
  };
}) satisfies GetStaticProps<{data: CategoryPageType}, GetStaticParams>

export default EncountersCategoryPage;
