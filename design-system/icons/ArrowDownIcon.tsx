import * as React from 'react';

function SvgArrowDownIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
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
        d="M5 8l7 7 7-7"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgArrowDownIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
