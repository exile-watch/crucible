import React from 'react';
import cx from 'classnames';

import FAQItem from '#features/builds/components/EditorSections/FAQ/FAQItem/FAQItem';
import {
  selectActiveVariantTitle,
  selectFAQ,
  selectVariantFAQ,
} from '#features/builds/slices/buildSlice';
import { useSelector } from '#hooks/useStore';

import styles from './FAQList.module.scss';

const FAQList = () => {
  const activeVariantTitle = useSelector(selectActiveVariantTitle);
  const faqs = useSelector(selectFAQ);
  const variantFaqs = useSelector(selectVariantFAQ);

  return (
    <div className={cx('pt-2 pr-3', styles.faqList)}>
      {variantFaqs.length > 0 && (
        <div className={cx('p-3 mb-3', styles.variantListWrapper)}>
          <div className={cx('px-3', styles.variantListHeader)}>
            {activeVariantTitle} <span>specific</span>
          </div>
          <ul className={styles.variantFaqList}>
            {variantFaqs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} isVariantOnly />
            ))}
          </ul>
        </div>
      )}
      {faqs.length > 0 && (
        <ul>
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </ul>
      )}
      {faqs.length === 0 && variantFaqs.length === 0 && <p>There are no FAQs.</p>}
    </div>
  );
};

export default FAQList;
