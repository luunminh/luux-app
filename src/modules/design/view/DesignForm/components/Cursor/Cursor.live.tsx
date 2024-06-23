import { isEmpty } from '@core/common';
import { useProfile } from '@core/queries';
import { isNumber } from 'lodash';
import Cursors from '.';
import { useDesignStore } from '../../store';

export const COLORS = ['#DC2626', '#D97706', '#059669', '#7C3AED', '#DB2777'];

const LiveCursor = () => {
  const { onlineUsers } = useDesignStore();
  const {
    profile: { id },
  } = useProfile();

  const filteredUsers = onlineUsers
    .filter((user) => isNumber(user?.x) && isNumber(user?.y))
    .filter((user) => user.id !== id);

  if (isEmpty(filteredUsers)) return null;

  return filteredUsers.map((user, index) => (
    <Cursors.Cursor
      key={user.id}
      x={user.x}
      y={user.y}
      name={user.name}
      color={COLORS[index % COLORS.length]}
    />
  ));
};

export default LiveCursor;
