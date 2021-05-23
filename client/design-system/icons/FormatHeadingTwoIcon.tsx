import * as React from 'react';

function SvgFormatHeadingTwoIcon(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 6a1 1 0 00-2 0v12a1 1 0 102 0v-5h6v.5a1 1 0 102 0V6a1 1 0 10-2 0v5H9V6zm5 10a1 1 0 100 2h1.234l-2.091 3.485A1 1 0 0014 23h3a1 1 0 100-2h-1.234l2.092-3.485A1 1 0 0017 16h-3z"
        fill="#000"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgFormatHeadingTwoIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
