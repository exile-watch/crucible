import * as React from 'react';

function SvgEditIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
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
        d="M13.25 7.75l-.75.75L11 10l-6 6v3h3l6-6 1.5-1.5.75-.75m-3-3L14 7l3-3 3 3-3 3-.75.75m-3-3l3 3"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgEditIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
