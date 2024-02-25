'use client';

import useMouseOver from '#/hooks/useMouseTracker';

const MouseTracker: React.FC = () => {
  const currentClass = useMouseOver();
  return (
    <div>
      <h1>Mouse Tracker</h1>
      <p>Move your mouse over different elements to track them.</p>
      <p>Current Class: {currentClass?.className}</p>
    </div>
  );
};

export default MouseTracker;
