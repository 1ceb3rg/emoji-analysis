import classNames from 'classnames';
import { CSSProperties } from 'react';

interface ITrackSectionProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

function TrackSection(props: ITrackSectionProps) {
  const { title, children, className, style } = props;

  return (
    <div
      style={style}
      className={classNames(
        'grid grid-cols-2 font-sans justify-between opacity-70  md:text-black  ',
        className,
        'even:bg-white odd:bg-gray-200   odd:md:bg-gray-50  even:md:bg-gray-50 first:rounded-t-xl last:rounded-b-xl first:md:rounded-b-none last:md:rounded-none ',
      )}
    >
      <dt className="text-sm font-medium text-black p-2 md:p-0  md:hidden ">{title}</dt>
      <dd className="md:col-span-2  mt-1 text-sm text-black justify-center  md:text-black md:text-left ">{children}</dd>
    </div>
  );
}

export default TrackSection;
