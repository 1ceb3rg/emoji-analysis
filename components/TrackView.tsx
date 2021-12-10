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
  const { track, bgColor, nextTrack, onClose, isShowing } = props;
  // const [track, setTrack] = useState(newTrack);
  const [imageShow, setImageShow] = useState(false);

  const [, , resetImageShow] = useTimeoutFn(() => {
    // setTrack(newTrack);
  }, 50);
  useEffect(() => {
    resetImageShow();
  }, [track, resetImageShow]);
  return (
    <Transition unmount={false} show={imageShow}>
      <div className={classNames('fixed inset-0 overflow-hidden', { hidden: !isShowing })}>
        <div
          style={{ backgroundColor: bgColor }}
          className={classNames('absolute inset-0 overflow-hidden  h-screen flex flex-col')}
        >
          <div className="w-full  h-screen flex basis-1/12  items-end justify-end">
            <button
              type="button"
              className="hover:opacity-50 w-1/6 flex justify-center hover:text-black  text-gray-50 hover:bg-gray-200"
              onClick={onClose}
            >
              <XIcon className="h-10 m-3" />
            </button>
          </div>
          <div className="grid flex-grow-0 flex-shrink basis-6/12 grid-cols-6 justify-center  rounded-md">
            <NextTrackButton
              onClick={() => {
                setImageShow(false);
              }}
              direction="left"
            />
            <div className="col-span-4 flex  place-items-center justify-center w-full">
              <Transition.Child
                className=" flex h-11/12 w-11/12  justify-center   "
                appear
                unmount={false}
                afterLeave={() => {
                  nextTrack('left');
                  setImageShow(true);
                }}
                enter="transform transition duration-500"
                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform  transition duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="   ">
                  <img className=" shadow-md  object-contain " alt="Album Cover" src={track.album.images[0].url} />
                </div>
              </Transition.Child>
            </div>
            <NextTrackButton
              onClick={() => {
                setImageShow(false);
              }}
              direction="right"
            />
          </div>
          <div className="basis-4/12 col-span-6 ">
            <Transition.Child
              appear
              unmount={false}
              enter="transition-opacity duration-500"
              enterFrom="blur"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="blur"
            >
              <div className={classNames('flex   mx-2 md:mx-20   flex-col  shadow-md  rounded-xl   ')}>
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
            </Transition.Child>
          </div>
        </div>
      </div>
    </Transition>
  );
}
export default TrackView;
