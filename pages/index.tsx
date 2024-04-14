import type { HomepageType } from "@exile-watch/encounter-data";
import type { GetStaticProps } from "next";
import { REVALIDATE_FREQUENCY } from "#constants";
import { fetchHomeData } from "#features/home/Home.api";
import { HomePage } from "#features/pages";

type GetStaticParams = {
  directory: string;
  category: string;
};

export const getStaticProps = (async () => {
  const data = await fetchHomeData();

  if (!data?.default) {
    return { notFound: true };
  }

  return {
    props: {
      data: data?.default,
    },
    revalidate: REVALIDATE_FREQUENCY,
  };
}) satisfies GetStaticProps<{ data: HomepageType }, GetStaticParams>;

export default HomePage;
