import { metaEncounter } from "@exile-watch/seo";
import { kebabCase } from "lodash";
import type { InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { Layout } from "#components";
import type { getStaticProps } from "#pages/[directory]/encounters/[category]/[map]/[boss]";
import EncounterContainer from "./_components/EncounterHeading/EncounterContainer";

const EncounterPage = ({
  data,
  isMap,
  activeEncounterAbilities,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    query: { directory, category, map, boss },
  } = useRouter();

  const title = data?.encounters?.map(({ name: encounterName }) => {
    const kebabCasedEncounterName = kebabCase(encounterName);
    const redirect = isMap
      ? `/${directory}/encounters/${category}/${map}/${kebabCasedEncounterName}`
      : `/${directory}/encounters/${category}/${kebabCasedEncounterName}`;
    return {
      name: encounterName,
      redirect,
      isMap,
    };
  });

  return (
    <>
      {directory && category && (map || boss) && (
        <NextSeo
          {...metaEncounter({ directory, category, encounter: map || boss })}
        />
      )}

      <Layout title={title}>
        <EncounterContainer
          activeEncounterAbilities={activeEncounterAbilities}
        />
      </Layout>
    </>
  );
};

export { EncounterPage };
