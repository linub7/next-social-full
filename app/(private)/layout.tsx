import PrivatePagesFooter from '@/components/private/footer';
import PrivatePagesHeader from '@/components/private/header';
import PrivatePagesNavbar from '@/components/private/navbar';

interface Props {
  children: React.ReactNode;
}

const PrivateLayout = (props: Props) => {
  return (
    <div>
      <PrivatePagesHeader />
      <PrivatePagesNavbar />
      <main>{props.children}</main>
      <PrivatePagesFooter />
    </div>
  );
};

export default PrivateLayout;
