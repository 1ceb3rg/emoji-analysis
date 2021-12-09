import { useSession } from "next-auth/react";
import SignInButton from "./SignInButton";

const authenticated = (
  status: "authenticated" | "loading" | "unauthenticated",
  authenicated: React.ReactNode,
  loading: React.ReactNode,
  unauthenticated: React.ReactNode
) => {
  switch (status) {
    case "authenticated":
      return authenicated;
      break;
    case "loading":
      return loading;
      break;
    case "unauthenticated":
      return unauthenticated;
      break;
  }
};
interface IProtectedProps {
  children: React.ReactNode;
}
const Protected = (props: IProtectedProps) => {
  const { status } = useSession();
  const { children } = props;

  return (
    <>{authenticated(status, children, <div>loading</div>, <SignInButton />)}</>
  );
};

export default Protected;
