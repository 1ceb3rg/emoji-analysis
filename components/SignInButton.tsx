import { signIn } from 'next-auth/react';
import Image from 'next/image';
import SpotifyLogo from '../public/Spotify_Icon_CMYK_Green.png';

function SignInButton() {
  return (
    <div className="flex justify-center ">
      <button
        className=" flex ring-1 rounded-md p-6 bg-[#191414] hover:bg-gray-700 text-white "
        type="button"
        onClick={() => signIn('spotify')}
      >
        <div className="flex h-6 w-6 mr-3">
          <Image className="h-6 w-6" alt="Spotify Logo" src={SpotifyLogo} />
        </div>
        Sign in with Spotify
      </button>
    </div>
  );
}
export default SignInButton;
