import { metaEncounter } from "@exile-watch/seo";
import { kebabCase } from "lodash";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { Layout } from "#components";
import { useEncounterData } from "#hooks/useEncounterData";
import EncounterContainer from "./_components/EncounterHeading/EncounterContainer";

const EncounterPage = () => {
  const {
    query: { directory, category, map, boss },
  } = useRouter();
  const { data, isMap } = useEncounterData();

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
        <EncounterContainer />
      </Layout>
    </>
  );
};

export { EncounterPage };
