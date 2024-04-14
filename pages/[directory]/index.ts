import { DirectoryPage } from "#features/pages";
import {checkIfDirExists, directoryPaths} from "#features/directory/Directory.api";
import {GetStaticPaths, GetStaticProps} from "next";
import {REVALIDATE_FREQUENCY} from "#constants";

type GetStaticPropsType = {
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

  if (!dirExists) {
    return { notFound: true };
  }

  return {
    props: {},
    revalidate: REVALIDATE_FREQUENCY
  };
}) satisfies GetStaticProps<{}, GetStaticPropsType>

export default DirectoryPage;
