import { FunctionComponent, ReactNode } from "react";

interface FilterSectionProps {
  title: string;
  children: ReactNode;
}

const FilterSection: FunctionComponent<FilterSectionProps> = ({
  children,
  title,
}) => {
  return (
    <div className="bg-white p-3 ">
      <p className="font-light text-md">{title}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
};

export default FilterSection;
