import * as React from 'react';

function SvgTrashIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
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
        d="M8 9h-.709a2 2 0 00-1.981 2.27l.954 7A2 2 0 008.246 20h7.508a2 2 0 001.982-1.73l.954-7A2 2 0 0016.71 9H16M8 9V6a2 2 0 012-2h4a2 2 0 012 2v3M8 9h8m-6 3v5m4-5v5"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgTrashIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
