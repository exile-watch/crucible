import * as React from 'react';

function SvgFormatBulletedListIcon(
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
        d="M6 5a2 2 0 100-4 2 2 0 000 4zm5-3.5a1.5 1.5 0 000 3h8.5a1.5 1.5 0 000-3H11zm0 9a1.5 1.5 0 000 3h8.5a1.5 1.5 0 000-3H11zm0 9a1.5 1.5 0 000 3h8.5a1.5 1.5 0 000-3H11zM8 12a2 2 0 11-4 0 2 2 0 014 0zM6 23a2 2 0 100-4 2 2 0 000 4z"
        fill="#000"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgFormatBulletedListIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
