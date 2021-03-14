import * as React from 'react';

function SvgArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9 5l7 7-7 7"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoSvgArrowRightIcon = React.memo(SvgArrowRightIcon);
export default MemoSvgArrowRightIcon;
