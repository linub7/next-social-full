import { usePathname } from 'next/navigation';
import PrivatePagesNavbarItem from './nav-item';

interface Props {}

const PrivatePagesNavbar = (props: Props) => {
  const pathname = usePathname();
  const handleActiveLink = (path: string): Boolean => pathname.startsWith(path);
  return (
    <nav className="flex max-w-md w-full p-5 dark:bg-slate-800 bg-slate-300 rounded-lg my-2">
      <ul className="flex flex-row items-center justify-around w-full">
        <PrivatePagesNavbarItem
          href="/feed"
          label="Feed"
          isActive={handleActiveLink('/feed')}
        />
        <PrivatePagesNavbarItem
          href="/profile"
          label="Profile"
          isActive={handleActiveLink('/profile')}
        />
        <PrivatePagesNavbarItem
          href="/following"
          label="Following"
          isActive={handleActiveLink('/following')}
        />
        <PrivatePagesNavbarItem
          href="/followers"
          label="Followers"
          isActive={handleActiveLink('/followers')}
        />
      </ul>
    </nav>
  );
};

export default PrivatePagesNavbar;
