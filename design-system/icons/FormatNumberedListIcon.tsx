import * as React from 'react';

function SvgFormatNumberedListIcon(
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 1A1 1 0 005.354.237l-2 1.692a1 1 0 001.292 1.527l.354-.3v2.92a1 1 0 002 0V1zM4 8.462a1 1 0 000 2h1.248L3.139 14.03A1 1 0 004 15.539h3a1 1 0 000-2H5.752L7.861 9.97A1 1 0 007 8.462H4zm0 8.461a1 1 0 100 2h2v.539H5a1 1 0 000 2h1V22H4a1 1 0 100 2h3a1 1 0 001-1v-5.077a1 1 0 00-1-1H4zM11.5 1.5a1.5 1.5 0 000 3H20a1.5 1.5 0 000-3h-8.5zm0 9a1.5 1.5 0 000 3H20a1.5 1.5 0 000-3h-8.5zm0 8.5a1.5 1.5 0 000 3H20a1.5 1.5 0 000-3h-8.5z"
        fill="#000"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgFormatNumberedListIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
