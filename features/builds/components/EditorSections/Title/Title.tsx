import cx from 'classnames';

import { TrashIcon } from '#assets/icons';
import Input from '#components/Input/Input';
import InputGroup from '#components/InputGroup/InputGroup';
import Message from '#components/Message/Message';
import { Pob } from '#features/builds/components/EditorSections';
import {
  addVoidVariant,
  editTitle,
  editVariantTitle,
  removeVoidVariant,
  selectActiveVariant,
  selectBuildTitle,
  selectBuildVariants,
  setActiveVariant,
} from '#features/builds/slices/buildSlice';
import { useDispatch, useSelector } from '#hooks/useStore';

import styles from './Title.module.scss';

type Event = { target: { value: string } };

const Title = () => {
  const title = useSelector(selectBuildTitle);
  const variants = useSelector(selectBuildVariants);
  const activeVariant = useSelector(selectActiveVariant);
  const dispatch = useDispatch();

  const handleTitleChange = ({ target: { value } }: Event) => {
    dispatch(editTitle(value));
  };

  const handleVariantTitleChange = ({ target: { value } }: Event, variantId: number) => {
    dispatch(editVariantTitle({ value, variantId }));
  };

  const handleVariantTitleClick = (variantId: number) => {
    dispatch(setActiveVariant(variantId));
  };

  const handleAddNewVariantClick = () => dispatch(addVoidVariant());

  const handleRemoveVariantClick = () =>
    activeVariant !== 0 && dispatch(removeVoidVariant(activeVariant));

  return (
    <div>
      <div className={styles.heading}>
        <Input
          label="Build title"
          className={cx('theme-transition-scope mb-3', styles.input)}
          value={title}
          onChange={handleTitleChange}
        />
        <div className={styles.actions}>
          <div>
            <Pob />
          </div>
          <div>preview</div>
          <div>comments</div>
          <div onClick={handleRemoveVariantClick}>remove variant</div>
          <div>Create</div>
        </div>
      </div>
      <div className={styles.titleWrapper}>
        {variants.map((variant, variantId) => (
          <>
            {variantId !== 0 && <span className={cx('mx-3', styles.separator)}>•</span>}
            <InputGroup>
              <Input
                key={`variantTitle_${variantId}`}
                label={`Variant ${variantId + 1}`}
                className={cx(styles.input, activeVariant !== variantId && styles.activeInput)}
                value={variant.title}
                onClick={() => handleVariantTitleClick(variantId)}
                size="large"
                onChange={(e) => handleVariantTitleChange(e, variantId)}
              />
              <InputGroup.Append disabled={false}>
                <TrashIcon onClick={handleRemoveVariantClick} />
              </InputGroup.Append>
            </InputGroup>
          </>
        ))}
        <p onClick={handleAddNewVariantClick}>+ Add another variant</p>
      </div>
      {variants.length > 1 && (
        <Message type="info" className="mt-3">
          Currently adding content for
          <b className="p-1">
            <u>
              {variants[activeVariant].title.length > 0
                ? variants[activeVariant].title
                : `Variant ${activeVariant + 1}`}
            </u>
          </b>
          variant.
        </Message>
      )}
    </div>
  );
};

export default Title;
