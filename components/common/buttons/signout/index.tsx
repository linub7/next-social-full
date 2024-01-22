import { useRouter } from 'next/navigation';

interface Props {}

const SignoutButton = (props: Props) => {
  const router = useRouter();
  const handleSignout = async () => {
    const res = await fetch(`/api/auth/signout`);
    if (res.ok) {
      router.push('/signin');
    }
  };
  return (
    <button
      onClick={handleSignout}
      className="dark:text-green-400 text-green-800 underline p-2 rounded-lg my-5"
    >
      Signout
    </button>
  );
};

export default SignoutButton;
