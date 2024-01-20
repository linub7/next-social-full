import Image from 'next/image';
import useSWR from 'swr';

interface Props {}

const AccountPageAvatarForm = (props: Props) => {
  const { data, error, isLoading } = useSWR(`/api/auth/me`);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div> Loading...</div>;
  const { data: user } = data;
  return (
    <form>
      {user?.avatar ? (
        <div>
          <Image
            src={user?.avatar}
            alt={user?.username}
            width={200}
            height={200}
            className="rounded-full m-auto my-5"
          />
        </div>
      ) : (
        <div
          className="bg-slate-600 rounded-full m-auto my-5"
          style={{ width: 200, height: 200 }}
        ></div>
      )}
      <input type="file" />
    </form>
  );
};

export default AccountPageAvatarForm;
