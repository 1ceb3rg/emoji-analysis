import { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from '@heroicons/react/outline';
import { Dialog, Transition } from '@headlessui/react';
import { useTimeoutFn } from 'react-use';
import classNames from 'classnames';
import { ITrack } from '../models/playlist';
import TrackSection from './TrackSection';
import { getAcousticEmoji, getDanceEmoji, getTempoEmoji } from '../utilities/emoji';
import AnimateEmoji from './AnimateEmoji';

interface INextTrackButtonProps {
  direction: 'right' | 'left';
  onClick: () => void;
  onClose: () => void;
}
function NextTrackButton(props: INextTrackButtonProps) {
  const { direction, onClick, onClose } = props;
  return (
    <div className=" w-2/12 basis-2/12  flex flex-col  text-gray-50 ">
      {direction === 'right' && (
        <button
          type="button"
          className="hover:opacity-50  justify-self-start h-1/6 flex justify-center align-middle   hover:text-black  text-gray-50 hover:bg-gray-200"
          onClick={onClose}
        >
          <XIcon className=" h-max min-h-0" />
        </button>
      )}
      <button
        type="button"
        onClick={onClick}
        className="  min-w-2/12 flex content-end items-end  flex-grow text-gray-50 hover:text-black hover:bg-gray-200 hover:opacity-50  justify-items-end  "
      >
        {direction === 'right' ? (
          <ChevronRightIcon className="min-h-0 h-max" />
        ) : (
          <ChevronLeftIcon className="min-h-0 h-max" />
        )}
      </button>
    </div>
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
  const [imageShow, setImageShow] = useState(true);
  const [nextTrackDirection, setNextTrackDirection] = useState<'left' | 'right'>('right');

  const [, , resetImageShow] = useTimeoutFn(() => {
    // setTrack(newTrack);
  }, 50);
  useLayoutEffect(() => {
    resetImageShow();
  }, [track, resetImageShow]);
  return (
    <Transition
      as={Fragment}
      show={isShowing}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      beforeEnter={async () => {
        await fetch(track.album.images[0].url);
      }}
    >
      <Dialog onClose={onClose}>
        <Transition className="" show={imageShow}>
          <div className={classNames('fixed inset-0 overflow-hidden')}>
            <div
              style={{ transition: `background-color 0.5s ease-in`, backgroundColor: bgColor }}
              className={classNames(
                'absolute inset-0 overflow-hidden py-2 gap-3 align-content-center justify-items-center justify-center  h-screen flex flex-col',
              )}
            >
              <div className="flex flex-grow-0 min-h-0 basis-6/12 flex-shrink-0  grid-cols-6 justify-center  rounded-md">
                <NextTrackButton
                  onClose={onClose}
                  onClick={() => {
                    setNextTrackDirection('left');
                    setImageShow(false);
                  }}
                  direction="left"
                />

                <Transition.Child
                  className=" flex flex-shrink flex-grow-0  col-span-4  justify-center   "
                  afterLeave={() => {
                    nextTrack(nextTrackDirection);
                    setImageShow(true);
                  }}
                  unmount={false}
                  enter="transform transition duration-500"
                  enterFrom="opacity-0 rotate-[-120deg] scale-50"
                  enterTo="opacity-100 rotate-0 scale-100"
                  leave="transform  transition duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <img className="  flex-grow-0 object-contain " alt="Album Cover" src={track.album.images[0].url} />
                </Transition.Child>

                <NextTrackButton
                  onClose={onClose}
                  onClick={() => {
                    setNextTrackDirection('right');
                    setImageShow(false);
                  }}
                  direction="right"
                />
              </div>
              <div className="basis-4/12 min-h-0  flex-shrink-0 flex-grow-0 col-span-6 ">
                <Transition.Child
                  as={Fragment}
                  appear
                  unmount={false}
                  enter="transition-opacity duration-500"
                  enterFrom="blur"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="blur"
                >
                  <div
                    className={classNames(
                      'flex  mx-2 md:mx-20 h-full overflow-y-scroll flex-grow-0   flex-col  shadow-md  rounded-xl   ',
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
                      <AnimateEmoji
                        timeSignature={track.time_signature}
                        tempo={track?.tempo}
                        emoji={getTempoEmoji(track?.tempo)}
                      />
                      {Math.round(track.tempo)} BPM
                    </TrackSection>
                    <TrackSection className="bg-white  p-2" title="Danceability">
                      {getDanceEmoji(track.danceability)}
                    </TrackSection>
                    <TrackSection className="bg-white  p-2" title="Acousticness">
                      {getAcousticEmoji(track.acousticness)}
                    </TrackSection>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Transition>
      </Dialog>
    </Transition>
  );
}
export default TrackView;
