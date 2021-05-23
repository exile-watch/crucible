import React from 'react';
import cx from 'classnames';

import { VerticalMenuIcon } from '#design-system/icons';
import { removeFAQ } from '#features/builds/slices/buildSlice';
import { FAQType } from '#features/builds/types/Store';
import { useDispatch } from '#hooks/useStore';

import styles from './FAQItem.module.scss';

type FAQItemProps = {
  faq: FAQType;
  isVariantOnly?: boolean;
};

const FAQItem = ({ faq, isVariantOnly }: FAQItemProps) => {
  const dispatch = useDispatch();

  const handleFAQItemRemove = () => dispatch(removeFAQ({ isVariantOnly, id: faq.id }));

  return (
    <li className={styles.faqItem}>
      <div>
        <em className="px-3 py-1">{faq.q}</em>
        <p className="px-3 py-1">{faq.a}</p>
      </div>
      <div className={cx('p-1', styles.menu)} onClick={handleFAQItemRemove}>
        <VerticalMenuIcon />
      </div>
    </li>
  );
};

export default FAQItem;
