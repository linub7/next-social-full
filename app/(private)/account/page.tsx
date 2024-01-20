'use client';

import SignoutButton from '@/components/common/buttons/signout';
import AccountPageAvatarForm from '@/components/private/account/form';

type Props = {};

const AccountPage = (props: Props) => {
  return (
    <div>
      <AccountPageAvatarForm />
      <SignoutButton />
    </div>
  );
};

export default AccountPage;
