import * as React from 'react';

function SvgCrossIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
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
        d="M7.05 7.05l9.9 9.9m-9.9 0l9.9-9.9"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgCrossIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
