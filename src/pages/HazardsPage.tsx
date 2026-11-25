import React from 'react';
import { HazardsMatrix } from '../components/hazards/HazardsMatrix';

export const HazardsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <HazardsMatrix />
    </div>
  );
};
