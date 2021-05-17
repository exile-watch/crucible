import * as React from 'react';

function SvgSearchIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <circle cx={11} cy={11} r={6} stroke="#000" strokeWidth={2} />
      <path
        d="M20 20l-4-4"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgSearchIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
