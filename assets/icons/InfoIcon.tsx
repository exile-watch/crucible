import * as React from 'react';

function SvgInfoIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
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
        d="M12 20a8 8 0 100-16 8 8 0 000 16zm0 2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm1-7v-4a1 1 0 10-2 0v4a1 1 0 102 0zm-1-6a1 1 0 100-2 1 1 0 000 2z"
        fill="#000"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgInfoIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
