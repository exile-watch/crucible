import Layout from '#components/Layout/Layout';
import { Title } from '#features/builds/components/EditorSections';
import EditorSections from '#features/builds/components/EditorSections/EditorSections';

const CreatePoeClassBuild = () => {
  return (
    <Layout>
      <Title />
      <EditorSections />
    </Layout>
  );
};

export default CreatePoeClassBuild;
