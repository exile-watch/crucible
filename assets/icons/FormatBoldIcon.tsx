import * as React from 'react';

function SvgFormatBoldIcon(
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
        d="M8 6V5a1 1 0 00-1 1h1zm0 12H7a1 1 0 001 1v-1zm6.27-6.135l.448.894-.447-.894zM7 6v6h2V6H7zm0 6v6h2v-6H7zm1 1h6v-2H8v2zm0-6h5.698V5H8v2zm5.823 3.97l-.27.136.894 1.788.27-.135-.894-1.789zM8 19h5.698v-2H8v2zm5.553-6.106l.27.136.895-1.79-.27-.134-.895 1.788zM13.698 7c.043 0 .086.01.125.03l.895-1.79a2.28 2.28 0 00-1.02-.24v2zm.125.03c1.624.811 1.624 3.128 0 3.94l.895 1.79c3.098-1.55 3.098-5.97 0-7.52l-.895 1.79zm0 6c1.624.812 1.624 3.129 0 3.94l.895 1.79c3.098-1.55 3.098-5.97 0-7.52l-.895 1.79zM13.698 19c.354 0 .703-.082 1.02-.24l-.895-1.79a.281.281 0 01-.125.03v2z"
        fill="#000"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgFormatBoldIcon);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
