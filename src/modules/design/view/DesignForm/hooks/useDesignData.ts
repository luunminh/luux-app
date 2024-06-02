import { socketService } from '@core/common';
import { IGetDesignUser } from '@modules/design/queries';
import { useDesignStore } from '../store';

const useDesignData = () => {
  const { data, onSetData } = useDesignStore();

  const addDesignPermission = (newPermission: IGetDesignUser) => {
    const newData = { ...data, users: [...data.users, newPermission] };
    onSetData(newData);
    socketService.editDesign(newData);
  };

  const removeDesignPermission = (userId: string) => {
    const newData = {
      ...data,
      users: data.users.filter((user) => user.id !== userId),
    };
    onSetData(newData);
    socketService.editDesign(newData);
  };

  const updateDesignPermission = (userId: string, newPermission: string) => {
    const newData = {
      ...data,
      users: data.users.map((user) => {
        if (user.id === userId) {
          return { ...user, permission: newPermission };
        }

        return user;
      }),
    };
    onSetData(newData);
    socketService.editDesign(newData);
  };

  return { addDesignPermission, removeDesignPermission, updateDesignPermission };
};

export default useDesignData;
