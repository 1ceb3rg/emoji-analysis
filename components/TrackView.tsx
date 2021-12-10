import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';
import { useTimeoutFn } from 'react-use';
import classNames from 'classnames';
import { ITrack } from '../models/playlist';
import TrackSection from './TrackSection';

interface INextTrackButtonProps {
  direction: 'right' | 'left';
  onClick: () => void;
}
function NextTrackButton(props: INextTrackButtonProps) {
  const { direction, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className="col-span-1 min-w-1/12  flex align-middle text-gray-50 hover:text-black hover:bg-gray-200 hover:opacity-50"
    >
      {direction === 'right' ? (
        <ChevronRightIcon className=" opacity-100 " />
      ) : (
        <ChevronLeftIcon className=" opacity-100 " />
      )}
    </button>
  );
}

interface ITrackViewProps {
  track: ITrack;
  bgColor: string;
  nextTrack: (direction: 'left' | 'right') => void;
  onClose: () => void;
  isShowing: boolean;
}
function TrackView(props: ITrackViewProps) {
  const { track: newTrack, bgColor, nextTrack, onClose, isShowing } = props;
  const [track, setTrack] = useState(newTrack);
  const [imageShow, setImageShow] = useState(false);

  const [, , resetImageShow] = useTimeoutFn(() => {
    setTrack(newTrack);
    setImageShow(true);
  }, 500);

  useEffect(() => {
    resetImageShow();
  }, [newTrack, resetImageShow]);

  return (
    <div className={classNames('fixed inset-0 overflow-hidden', { hidden: !isShowing })}>
      <div
        style={{ backgroundColor: bgColor }}
        className={classNames('absolute inset-0 overflow-hidden h-screen flex flex-col')}
      >
        <div className="w-full w h-full flex basis-1/12  items-end justify-end">
          <button
            type="button"
            className="hover:opacity-50 w-1/6 flex justify-center hover:text-black  text-gray-50 hover:bg-gray-200"
            onClick={onClose}
          >
            <XIcon className="h-10 m-3" />
          </button>
        </div>
        <div className="grid flex-grow-0 flex-shrink basis-4/12 grid-cols-6 justify-center  rounded-md">
          <NextTrackButton
            onClick={() => {
              setImageShow(false);

              nextTrack('left');
            }}
            direction="left"
          />
          <div className="col-span-4">
            <Transition
              className="w-full h-full flex  justify-center   "
              show={imageShow}
              appear
              unmount={false}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="w-full  ">
                <img className=" shadow-md  " alt="Album Cover" src={track.album.images[0].url} />
              </div>
            </Transition>
          </div>
          <NextTrackButton
            onClick={() => {
              setImageShow(false);
              resetImageShow();
              nextTrack('right');
            }}
            direction="right"
          />
        </div>
        <div
          className={classNames(
            'flex col-span-6 basis-/12  mx-2 md:mx-20  h-2/3 flex-col mt-3 shadow-md  rounded-xl overflow-y-scroll  ',
          )}
        >
          <TrackSection className="bg-gray-200 p-2  " title="Artist">
            {track.artists.reduce((artists, artist) => {
              return `${artists}, ${artist}`;
            })}
          </TrackSection>
          <TrackSection className="bg-white p-2 " title="Name">
            {track.name}
          </TrackSection>
          <TrackSection className="bg-gray-200 p-2 " title="Album">
            {track.album.name}
          </TrackSection>

          <TrackSection className="bg-white  p-2" title="Tempo">
            {Math.round(track.tempo)}
          </TrackSection>
        </div>
      </div>
    </div>
  );
}
export default TrackView;
