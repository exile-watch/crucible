import { EncountersPage } from "#features/pages";
import {checkIfDirExists, directoryPaths} from "#features/directory/Directory.api";
import {GetStaticPaths, GetStaticProps} from "next";
import {fetchEncountersData} from "#features/encounters/Encounters.api";
import type {CategoryPageType} from "@exile-watch/encounter-data";

type GetStaticParams = {
  directory: string;
}

export const getStaticPaths = (async () => {
  return {
    paths: directoryPaths,
    fallback: 'blocking'
  };
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
  const { params } = context;

  if (!params) {
    return { notFound: true };
  }

  const { directory } = params;

  const dirExists = await checkIfDirExists(directory);
  const data = await fetchEncountersData(directory);

  if (!dirExists || !data?.default) {
    return { notFound: true };
  }

  return {
    props: {
      data: data?.default
    },
    revalidate: 60, // Revalidate at most once per minute
  };
}) satisfies GetStaticProps<{data: CategoryPageType}, GetStaticParams>

export default EncountersPage;
