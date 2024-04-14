import { HomePage } from "#features/pages";
import {GetStaticProps} from "next";
import type {HomepageType} from "@exile-watch/encounter-data";
import {fetchHomeData} from "#features/home/Home.api";


type GetStaticParams = {
  directory: string;
  category: string;
}

export const getStaticProps = (async () => {
  const data = await fetchHomeData()

  if (!data?.default) {
    return { notFound: true };
  }

  return {
    props: {
      data: data?.default
    },
    revalidate: 60, // Revalidate at most once per minute
  };
}) satisfies GetStaticProps<{data: HomepageType}, GetStaticParams>

export default HomePage;
