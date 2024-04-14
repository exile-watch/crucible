import type { CategoryPageType } from "@exile-watch/encounter-data";
import type { GetStaticPaths, GetStaticProps } from "next";
import { REVALIDATE_FREQUENCY } from "#constants";
import {
  checkIfDirExists,
  directoryPaths,
} from "#features/directory/Directory.api";
import { fetchEncountersData } from "#features/encounters/Encounters.api";
import { EncountersPage } from "#features/pages";

type GetStaticParams = {
  directory: string;
};

export const getStaticPaths = (async () => {
  return {
    paths: directoryPaths,
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

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
      data: data?.default,
    },
    revalidate: REVALIDATE_FREQUENCY,
  };
}) satisfies GetStaticProps<{ data: CategoryPageType }, GetStaticParams>;

export default EncountersPage;
