import React, { ChangeEvent } from 'react';

import { Input, InputGroup } from '#design-system/components';
import { LinkIcon } from '#design-system/icons';
import { changePob, selectBuildPob } from '#features/builds/slices/buildSlice';
import { useDispatch, useSelector } from '#hooks/useStore';

const Pob = () => {
  const dispatch = useDispatch();
  const pob = useSelector(selectBuildPob);
  const handlePobChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    dispatch(changePob(value));

  return (
    <InputGroup>
      <InputGroup.Prepend>
        <LinkIcon />
      </InputGroup.Prepend>
      <Input value={pob} onChange={handlePobChange} label="PoB link or code" />
    </InputGroup>
  );
};

export default Pob;
