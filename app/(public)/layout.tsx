interface Props {
  children: React.ReactNode;
}

const PublicLayout = (props: Props) => {
  return (
    <main className="flex min-h-screen max-w-md items-center justify-center m-auto">
      {props.children}
    </main>
  );
};

export default PublicLayout;
