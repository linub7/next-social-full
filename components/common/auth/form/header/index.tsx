interface Props {
  header: string;
}

const AuthFormHeaderComponent = (props: Props) => {
  return (
    <>
      <div className="text-center">
        <h3 className="font-semibold">{props.header}</h3>
      </div>
      <div className="my-3">
        <hr />
      </div>
    </>
  );
};

export default AuthFormHeaderComponent;
