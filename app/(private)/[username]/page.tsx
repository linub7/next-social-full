interface Props {
  params: {
    username: string;
  };
}

const UsernamePage = (props: Props) => {
  const {
    params: { username },
  } = props;
  return <div>{username}</div>;
};

export default UsernamePage;
