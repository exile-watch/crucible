import * as React from 'react';

function SvgErrorIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
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
        d="M12.707 4.621a1 1 0 00-1.414 0L4.62 11.293a1 1 0 000 1.414l6.672 6.672a1 1 0 001.414 0l6.672-6.672a1 1 0 000-1.414L12.707 4.62zM9.88 3.207a3 3 0 014.242 0l6.672 6.672a3 3 0 010 4.242l-6.672 6.672a3 3 0 01-4.242 0L3.207 14.12a3 3 0 010-4.242L9.88 3.207zM11 15a1 1 0 102 0 1 1 0 00-2 0zm2-7v4a1 1 0 11-2 0V8a1 1 0 112 0z"
        fill="#000"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgErrorIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
