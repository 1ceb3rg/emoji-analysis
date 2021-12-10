import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';
import { useTimeoutFn } from 'react-use';
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
}
function TrackView(props: ITrackViewProps) {
  const { track: newTrack, bgColor, nextTrack } = props;
  const [track, setTrack] = useState(newTrack);
  const [isShowing, setIsShowing] = useState(false);
  const [, , resetIsShowing] = useTimeoutFn(() => {
    setIsShowing(true);
  }, 1000);

  useEffect(() => {
    resetIsShowing();
  }, [newTrack, resetIsShowing]);

  return (
    <div
      className="grid grid-cols-6 duration-75  h-screen justify-center py-10 rounded-md"
      style={{ backgroundColor: bgColor }}
    >
      <NextTrackButton
        onClick={() => {
          setIsShowing(false);

          nextTrack('left');
        }}
        direction="left"
      />
      <div className="col-span-4">
        <div className="flex w-full flex-shrink-0 flex-col">
          <div className="h-3/6 flex-shrink-0">
            <Transition
              className="   w-full "
              show={isShowing}
              appear
              unmount={false}
              afterLeave={() => setTrack(newTrack)}
              enter="transition duration-100"
              enterFrom=" blur"
              leave="transition duration-100"
              leaveTo=" blur "
            >
              <img className="object-contain shadow-md" alt="Album Cover" src={track.album.images[0].url} />
            </Transition>
          </div>
          <div className="flex flex-col mt-3 shadow-md  rounded-xl  ">
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

      <NextTrackButton
        onClick={() => {
          setIsShowing(false);
          resetIsShowing();
          nextTrack('right');
        }}
        direction="right"
      />
    </div>
  );
}
export default TrackView;
