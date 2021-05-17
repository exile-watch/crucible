import * as React from 'react';

function SvgFormatHeadingOneIcon(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 6a1 1 0 00-2 0v12a1 1 0 102 0v-5h6v.5a1 1 0 102 0V6a1 1 0 10-2 0v5H9V6zm8 11a1 1 0 00-1.707-.707l-2 2a1 1 0 001.414 1.414l.293-.293V22a1 1 0 102 0v-5z"
        fill="#000"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgFormatHeadingOneIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
