import React, { ChangeEvent, Dispatch, useState } from 'react';
import cx from 'classnames';

import Input from '#components/Input/Input';
import Textarea from '#components/Textarea/Textarea';
import { addFAQ } from '#features/builds/slices/buildSlice';
import { useDispatch } from '#hooks/useStore';

import styles from './FAQCreate.module.scss';

const FAQCreate = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isVariantOnly, setIsVariantOnly] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>, func: Dispatch<any>) =>
    func(e.target.value);
  const handleCheckboxChange = () => setIsVariantOnly((state) => !state);

  const handleSubmit = () => {
    if (question.length > 0 && answer.length > 0) {
      dispatch(addFAQ({ isVariantOnly, qna: { q: question, a: answer, id: +new Date() } }));
      setQuestion('');
      setAnswer('');
    }
  };

  return (
    <div className={styles.createQNA}>
      <div className={cx(styles.inputWrapper)}>
        <label className="mr-3" htmlFor="faq_q">
          Q:
        </label>
        <Textarea
          placeholder="Question goes here"
          id="faq_q"
          onChange={(e) => handleInputChange(e, setQuestion)}
          value={question}
        />
      </div>
      <div className={cx('mt-3', styles.inputWrapper)}>
        <label className="mr-3" htmlFor="faq_a">
          A:
        </label>
        <Textarea
          placeholder="Answer goes here"
          id="faq_a"
          onChange={(e) => handleInputChange(e, setAnswer)}
          value={answer}
        />
      </div>
      <div className={cx('mt-3', styles.createQNAfooter)}>
        <div>
          <label htmlFor="faq_variant">Is Variant only?</label>
          <Input
            id="faq_variant"
            type="checkbox"
            checked={isVariantOnly}
            onChange={handleCheckboxChange}
          />
        </div>
        <button onClick={handleSubmit} disabled={question.length === 0 || answer.length === 0}>
          Add FAQ
        </button>
      </div>
    </div>
  );
};

export default FAQCreate;
