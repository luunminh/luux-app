import { ToastService, socketService } from '@core/common';
import { useProfile } from '@core/queries';
import {
  IGetDesignUser,
  useDeleteDesignPermission,
  useUpdateDesignPermission,
} from '@modules/design/queries';
import { homePaths } from '@modules/home/route';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDesignStore } from '../store';

enum UserPermission {
  VIEW = 'view',
  EDIT = 'edit',
  OWNER = 'owner',
}

const useDesignData = () => {
  const navigate = useNavigate();
  const { data, onSetData } = useDesignStore();
  const { profile } = useProfile();

  const isOwner = useMemo(() => data?.createdByUserId === profile?.id, [data, profile]);

  const hasEditingPermission = useMemo(
    () => data?.users?.some((u) => u?.id === profile?.id && u?.canEdit === true),
    [data, profile],
  );
  const notHavePermission = useMemo(
    () => data?.users?.every((user) => user.id !== profile?.id) && data.privacy === 'PRIVATE',
    [data, profile],
  );

  useEffect(() => {
    if (notHavePermission) {
      ToastService.error('You do not have permission to view this design');

      setTimeout(() => {
        navigate(homePaths.home);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notHavePermission]);

  const { onUpdateDesignPermission, isLoading: isUpdatingDesignPermission } =
    useUpdateDesignPermission({
      onSuccess(data, payload) {
        updateDesignPermission(
          payload.userId,
          payload.canEdit ? UserPermission.EDIT : UserPermission.VIEW,
        );
      },
      onError() {
        ToastService.error('Failed to update permission');
      },
    });

  const { onDeleteDesignPermission, isLoading: isDeleteDesignPermission } =
    useDeleteDesignPermission({
      onSuccess(data, payload) {
        removeDesignPermission(payload.userId);
      },
      onError() {
        ToastService.error('Failed to remove this user');
      },
    });

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
      users: data?.users.map((user) => {
        if (user.id === userId) {
          return { ...user, canEdit: newPermission === UserPermission.EDIT };
        }

        return user;
      }),
    };
    onSetData(newData);
    socketService.editDesign(newData);
  };

  const handleUpdateDesignPermission = (userId: string, canEdit: boolean) => {
    onUpdateDesignPermission({
      designId: data.id,
      userId,
      canEdit,
      canView: true,
    });
  };

  const handleRemoveDesignPermission = (userId: string) => {
    onDeleteDesignPermission({
      designId: data.id,
      userId,
    });
  };

  return {
    isOwner,
    hasEditingPermission,
    notHavePermission,
    addDesignPermission,
    handleRemoveDesignPermission,
    handleUpdateDesignPermission,
  };
};

export default useDesignData;
