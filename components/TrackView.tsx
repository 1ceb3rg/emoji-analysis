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
      {direction === 'right' ? <ChevronRightIcon className=" opacity-100 " /> : <ChevronLeftIcon />}
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
    <div
      style={{ backgroundColor: bgColor }}
      className={classNames('absolute inset-0 overflow-hidden', { hidden: !isShowing })}
    >
      <div className="w-full flex items-end justify-end">
        <button type="button" onClick={onClose}>
          <XIcon className="h-10 w-10" />
        </button>
      </div>
      <div className="grid grid-cols-6 duration-75  h-screen justify-center py-10 rounded-md">
        <NextTrackButton
          onClick={() => {
            setImageShow(false);

            nextTrack('left');
          }}
          direction="left"
        />
        <div className="col-span-4">
          <Transition
            className=" w-full h-full "
            show={imageShow}
            appear
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex w-full  flex-col">
              <div className="basis-2/3 h-2/3 ">
                <img className="object-contain shadow-md" alt="Album Cover" src={track.album.images[0].url} />
              </div>
              <div className={classNames('flex basis-1/3 flex-col mt-3 shadow-md  rounded-xl  ')}>
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
    </div>
  );
}
export default TrackView;
