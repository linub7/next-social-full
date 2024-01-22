import Link from 'next/link';

interface Props {
  href: string;
  label: string;
  isActive?: Boolean;
}

const PrivatePagesNavbarItem = (props: Props) => {
  const { href, label, isActive = false } = props;
  return (
    <li>
      <Link
        href={href}
        className={isActive ? 'dark:text-green-400 text-green-800' : ''}
      >
        {label}
      </Link>
    </li>
  );
};

export default PrivatePagesNavbarItem;
