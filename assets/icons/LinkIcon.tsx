import * as React from 'react';

function SvgLinkIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
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
        d="M10.438 18.563l-.813.812-.21.21a2 2 0 01-2.83 0l-2.144-2.144a2 2 0 01.027-2.855L9.75 9.5l.061-.061a1.948 1.948 0 012.814.061v0l.688.75m.656-4.813l.844-.812.197-.19a2 2 0 012.874.103L19.73 6.59a2 2 0 01-.073 2.752L14.5 14.5l-.086.086a2 2 0 01-2.828 0L11.5 14.5l-.75-.75"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgLinkIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
