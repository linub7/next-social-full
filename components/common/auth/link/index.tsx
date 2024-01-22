import Link from 'next/link';

interface Props {
  href: string;
  label: string;
}

const AuthLinkComponent = (props: Props) => {
  const { href, label } = props;
  return (
    <div>
      <Link
        href={href}
        className="dark:text-white text-slate-800 border dark:border-white border-slate-800 my-4 p-3 rounded-lg block text-center"
      >
        {label}
      </Link>
    </div>
  );
};

export default AuthLinkComponent;
