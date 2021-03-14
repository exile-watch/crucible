import * as React from 'react';

function SvgRedirectIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11 13l8-8m0 0h-7m7 0v7M7 5H5v14h14v-2"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoSvgRedirectIcon = React.memo(SvgRedirectIcon);
export default MemoSvgRedirectIcon;
