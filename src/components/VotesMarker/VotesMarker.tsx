import { FunctionComponent } from "react";
import "./style.css";

interface VotesMarkerProps {
  percentage: number;
}

const VotesMarker: FunctionComponent<VotesMarkerProps> = ({ percentage }) => {
  return (
    <div className="font-bold">
      <svg viewBox="-2 -2 40 40" className="circular-chart green">
        <path
          className="circle-bg"
          d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="circle"
          strokeDasharray={`${percentage}, 100`}
          d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="22" className="percentage">
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default VotesMarker;
