import * as React from 'react';

function SvgFormatUnderlineIcon(
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
        d="M9 6a1 1 0 00-2 0h2zm8 0a1 1 0 10-2 0h2zM8 17a1 1 0 100 2v-2zm8 2a1 1 0 100-2v2zM7 6v3.585h2V6H7zm8 0v3.004h2V6h-2zm-6.643 7.875c1.818 1.8 4.533 1.877 6.594.382l-1.174-1.619c-1.343.974-2.955.863-4.013-.184l-1.407 1.421zM8 19h8v-2H8v2zm7-9.996c0 1.644-.309 2.97-1.223 3.634l1.174 1.619C16.73 12.967 17 10.687 17 9.004h-2zm-8 .58c0 1.29.12 3.067 1.357 4.291l1.407-1.421C9.167 11.864 9 10.877 9 9.584H7z"
        fill="#000"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgFormatUnderlineIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
