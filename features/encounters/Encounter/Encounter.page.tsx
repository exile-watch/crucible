import { kebabCase } from "lodash";
import { useRouter } from "next/router";
import { Layout } from "#components";
import { useEncounterData } from "#hooks/useEncounterData";
import EncounterContainer from "./_components/EncounterHeading/EncounterContainer";

const EncounterPage = () => {
  const {
    query: { category, map },
  } = useRouter();
  const { data, isMap } = useEncounterData();

  const title = data?.bosses?.map(({ name: encounterName }) => {
    const kebabCasedEncounterName = kebabCase(encounterName);
    const redirect = isMap
      ? `/encounters/${category}/${map}/${kebabCasedEncounterName}`
      : `/encounters/${category}/${kebabCasedEncounterName}`;
    return {
      name: encounterName,
      redirect,
      isMap,
    };
  });

  return (
    <Layout title={title}>
      <EncounterContainer />
    </Layout>
  );
};

export { EncounterPage };
