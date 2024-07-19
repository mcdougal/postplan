import { toast } from 'react-hot-toast';

import deleteHashtagGroupServerAction from './deleteHashtagGroupServerAction';

type Request = {
  deleteHashtagGroup: (id: string) => Promise<void>;
};

export default (onCompleted: () => void): Request => {
  const deleteHashtagGroup = async (id: string): Promise<void> => {
    const response = await deleteHashtagGroupServerAction({
      where: { id },
    });

    if (response.status === `error`) {
      toast.error(response.message);
    } else {
      onCompleted();
    }
  };

  return {
    deleteHashtagGroup,
  };
};
