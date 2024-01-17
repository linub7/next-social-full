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
      <Link href={href} className={isActive ? 'text-green-400' : ''}>
        {label}
      </Link>
    </li>
  );
};

export default PrivatePagesNavbarItem;
