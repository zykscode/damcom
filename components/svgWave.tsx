import * as React from 'react';

const SVGComponent = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 804 50.167"
    enableBackground="new 0 0 804 50.167"
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="#E9C6DD"
      d="M804,0v16.671c0,0-204.974,33.496-401.995,33.496C204.974,50.167,0,16.671,0,16.671V0H804z"
    />
  </svg>
);
export default SVGComponent;
