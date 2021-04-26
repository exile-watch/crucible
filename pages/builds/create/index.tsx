import { useState } from 'react';

import Layout from '#components/Layout/Layout';
import { POE_CLASSES } from '#constants/classes';
import useRouter from '#hooks/useRouter';

const CreateBuild = () => {
  const [theorycrafting, setTheorycrafting] = useState(false);
  const { pathname } = useRouter();

  const handleTheorycraftingClick = () => setTheorycrafting((prevState) => !prevState);

  return (
    <Layout>
      {POE_CLASSES.map((poeClass) => {
        const link = theorycrafting
          ? `${pathname}/${poeClass}?theorycrafting=true`
          : `${pathname}/${poeClass}`;
        return (
          <a key={link} href={link}>
            {poeClass}{' '}
          </a>
        );
      })}
      <button onClick={handleTheorycraftingClick}>theorycraft</button>
    </Layout>
  );
};

export default CreateBuild;
