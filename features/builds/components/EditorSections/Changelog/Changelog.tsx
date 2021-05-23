import React from 'react';

import { Message } from '#design-system/components';

import EditorSectionWrapper from '../EditorSectionWrapper';

const Changelog = () => {
  return (
    <EditorSectionWrapper section="Changelog" locked>
      <Message type="warning" size="small" className="mb-3">
        This section is not editable during build creation.
      </Message>
      <i>21 May 2021</i> - Build created.
    </EditorSectionWrapper>
  );
};

export default Changelog;
