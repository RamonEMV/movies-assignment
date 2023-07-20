import { FunctionComponent, ReactNode, useState } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

interface FilterContainerProps {
  title: string;
  children: ReactNode;
}

const FilterContainer: FunctionComponent<FilterContainerProps> = ({
  children,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white drop-shadow-md border rounded-lg flex flex-col p-3">
      <div className="flex justify-between">
        <p className="font-bold text-xl">{title}</p>
        {isOpen ? (
          <ChevronDownIcon
            className="stroke-2"
            height={25}
            width={25}
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <ChevronRightIcon
            className="stroke-2"
            height={25}
            width={25}
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>

      {isOpen && (
        <>
          <hr className="my-2" />
          {children}
        </>
      )}
    </div>
  );
};

export default FilterContainer;
