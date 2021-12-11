import { Fragment, useEffect, useState } from 'react';
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
}
function NextTrackButton(props: INextTrackButtonProps) {
  const { direction, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className="col-span-1 min-w-1/12 basis-3/12  flex align-middle text-gray-50 hover:text-black hover:bg-gray-200 hover:opacity-50"
    >
      {direction === 'right' ? <ChevronRightIcon className="min-h-0" /> : <ChevronLeftIcon className="min-h-0" />}
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
  const [imageShow, setImageShow] = useState(true);
  const [nextTrackDirection, setNextTrackDirection] = useState<'left' | 'right'>('right');

  const [, , resetImageShow] = useTimeoutFn(() => {
    // setTrack(newTrack);
  }, 50);
  useEffect(() => {
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
              className={classNames('absolute inset-0 overflow-hidden  gap-3  h-screen flex flex-col')}
            >
              <div className="w-full  flex-grow-0 flex basis-1/12  items-end justify-end">
                <button
                  type="button"
                  className="hover:opacity-50  min-h-0 w-1/6 flex justify-center hover:text-black  text-gray-50 hover:bg-gray-200"
                  onClick={onClose}
                >
                  <XIcon className="min-h-0 m-3" />
                </button>
              </div>
              <div className="flex flex-grow-0 min-h-0 basis-6/12 flex-shrink  grid-cols-6 justify-center  rounded-md">
                <NextTrackButton
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
                  onClick={() => {
                    setNextTrackDirection('right');
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
                  <div className={classNames('flex flex-grow mb-2 mx-2 md:mx-20   flex-col  shadow-md  rounded-xl   ')}>
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
