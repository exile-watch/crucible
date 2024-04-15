import type { GetStaticPaths, GetStaticProps } from "next";
import { REVALIDATE_FREQUENCY } from "#constants";
import {
  checkIfDirExists,
  directoryPaths,
} from "#features/directory/Directory.api";
import { DirectoryPage } from "#features/pages";

export const config = { runtime: "experimental-edge" };

type GetStaticPropsType = {
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

  if (!dirExists) {
    return { notFound: true };
  }

  return {
    props: {},
    revalidate: REVALIDATE_FREQUENCY,
  };
}) satisfies GetStaticProps<Record<string, never>, GetStaticPropsType>;

export default DirectoryPage;
