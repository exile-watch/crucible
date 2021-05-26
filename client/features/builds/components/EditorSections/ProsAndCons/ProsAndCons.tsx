import React, { ChangeEvent, useState } from 'react';
import cx from 'classnames';

import { Button, Heading, Input } from '#design-system/components';
import { CrossIcon } from '#design-system/icons';
import { addProOrCon, removeProOrCon, selectProsAndCons } from '#features/builds/slices/buildSlice';
import { useDispatch, useSelector } from '#hooks/useStore';

import EditorSectionWrapper from '../EditorSectionWrapper';

import styles from './ProsAndCons.module.scss';

type ProOrCon = 'pro' | 'con';

const ProsAndCons = () => {
  const [proValue, setProValue] = useState('');
  const [conValue, setConValue] = useState('');
  const dispatch = useDispatch();
  const { pros, cons } = useSelector(selectProsAndCons);

  const handleInputChange = (
    { target: { value } }: ChangeEvent<HTMLInputElement>,
    type: ProOrCon
  ) => (type === 'pro' ? setProValue(value) : setConValue(value));

  const handleAddProOrConSubmit = (type: ProOrCon) => {
    const isPro = type === 'pro';
    if ((isPro && proValue === '') || (!isPro && conValue === '')) return;
    dispatch(addProOrCon({ type, label: isPro ? proValue : conValue, id: +new Date() }));
    isPro ? setProValue('') : setConValue('');
  };

  const handleRemoveProOrCon = (type: ProOrCon, id: any) => dispatch(removeProOrCon({ type, id }));

  return (
    <EditorSectionWrapper section="Pros and Cons">
      <div className={cx('mb-3', styles.inputWrapper)}>
        <Input
          className={styles.proInput}
          value={proValue}
          label="New Pro"
          onChange={(e) => handleInputChange(e, 'pro')}
        />
        <Button
          variant="secondary"
          className="ml-3"
          disabled={proValue === ''}
          onClick={() => handleAddProOrConSubmit('pro')}
        >
          Add Pro
        </Button>
      </div>
      <Heading as="h4">Pros:</Heading>
      {pros.length === 0 && <p>There are no pros.</p>}
      <ul>
        {pros.map((pro) => (
          <li key={pro.id} className={cx('py-1', styles.pro)}>
            <span> + {pro.label}</span>
            <CrossIcon onClick={() => handleRemoveProOrCon('pro', pro.id)} />
          </li>
        ))}
      </ul>
      <div className={cx('my-3', styles.inputWrapper)}>
        <Input
          className={styles.conInput}
          value={conValue}
          label="New Con"
          onChange={(e) => handleInputChange(e, 'con')}
        />
        <Button
          variant="secondary"
          className="ml-3"
          disabled={conValue === ''}
          onClick={() => handleAddProOrConSubmit('con')}
        >
          Add Con
        </Button>
      </div>
      <Heading as="h4">Cons:</Heading>
      {cons.length === 0 && <p>There are no cons!</p>}
      <ul>
        {cons.map((con) => (
          <li key={con.id} className={cx('py-1', styles.con)}>
            <span>- {con.label}</span>
            <CrossIcon onClick={() => handleRemoveProOrCon('con', con.id)} />
          </li>
        ))}
      </ul>
    </EditorSectionWrapper>
  );
};

export default ProsAndCons;
