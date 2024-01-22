import Link from 'next/link';

interface Props {
  href: string;
  label: string;
}

const HomePageLink = (props: Props) => {
  const { href, label } = props;
  return (
    <div>
      <Link
        href={href}
        className="dark:bg-slate-900 bg-slate-400 my-4 p-3 rounded-lg block text-center"
      >
        {label}
      </Link>
    </div>
  );
};

export default HomePageLink;
