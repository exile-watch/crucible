import * as React from 'react';

function SvgFormatCodeIcon(
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
        d="M14.949 6.316a1 1 0 00-1.898-.632l-4 12a1 1 0 001.898.632l4-12zM8.207 7.793a1 1 0 010 1.414L5.414 12l2.793 2.793a1 1 0 11-1.414 1.414l-3.5-3.5a1 1 0 010-1.414l3.5-3.5a1 1 0 011.414 0zm7.586 0a1 1 0 000 1.414L18.586 12l-2.793 2.793a1 1 0 001.414 1.414l3.5-3.5a1 1 0 000-1.414l-3.5-3.5a1 1 0 00-1.414 0z"
        fill="#000"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgFormatCodeIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
