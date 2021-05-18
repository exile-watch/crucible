import FAQCreate from '#features/builds/components/EditorSections/FAQ/FAQCreate/FAQCreate';
import FAQList from '#features/builds/components/EditorSections/FAQ/FAQList/FAQList';

import EditorSectionWrapper from '../EditorSectionWrapper';

import styles from './FAQ.module.scss';

const FAQ = () => {
  return (
    <EditorSectionWrapper section="FAQ">
      <div className={styles.faq}>
        <FAQCreate />
        <FAQList />
      </div>
    </EditorSectionWrapper>
  );
};

export default FAQ;
