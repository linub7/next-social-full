interface Props {
  children: React.ReactNode;
}

const PrivateLayout = (props: Props) => {
  return <main>{props.children}</main>;
};

export default PrivateLayout;
