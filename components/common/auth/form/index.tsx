import { FormEvent } from 'react';

interface Props {
  children: React.ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const AuthFormComponent = (props: Props) => {
  const { children, onSubmit } = props;
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 p-5 max-w-xs w-full dark:bg-slate-800 bg-slate-300 rounded"
    >
      {children}
    </form>
  );
};

export default AuthFormComponent;
