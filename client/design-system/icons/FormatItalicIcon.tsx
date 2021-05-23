import * as React from 'react';

function SvgFormatItalicIcon(
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
        d="M16 7a1 1 0 100-2v2zM8 17a1 1 0 100 2v-2zm3-12a1 1 0 100 2V5zm2 14a1 1 0 100-2v2zm-5 0h2v-2H8v2zm6-12h2V5h-2v2zm-4 12h1v-2h-1v2zm2-12h1V5h-1v2zm1 0h1V5h-1v2zm-2 0h1V5h-1v2zm2 10h-2v2h2v-2zm-2.051 1.316l4-12-1.898-.632-4 12 1.898.632z"
        fill="#000"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgFormatItalicIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
