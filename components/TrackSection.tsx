import classNames from "classnames";
import { CSSProperties } from "react";

interface ITrackSectionProps {
  title?: string;
  children?: React.ReactNode;
  index?: number;
  className?: string;
  style?: CSSProperties;
}

const TrackSection = (props: ITrackSectionProps) => {
  const { index, title, children, className, style } = props;

  return (
    <div
      style={style}
      className={classNames(
        "grid grid-cols-2 font-sans justify-between opacity-70  md:text-black  ",
        className,
        "md:bg-gray-50"
      )}
    >
      <dt className="text-sm font-medium text-black  md:hidden ">{title}</dt>
      <dd className="md:col-span-2  mt-1 text-sm text-black justify-center  md:text-black md:text-left ">
        {children}
      </dd>
    </div>
  );
};
export default TrackSection;
