import { Avatar, Tooltip } from '@mantine/core';
import { IDesignForm } from '@modules/design/view/DesignForm/DesignForm.helpers';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<IDesignForm>;
};

export const AvatarGroup = ({ form }: Props) => {
  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        <Tooltip label="Minh Luu" withArrow>
          <Avatar src="image.png" radius="xl">
            ML
          </Avatar>
        </Tooltip>
        <Tooltip label="Salazar Troop" withArrow>
          <Avatar radius="xl">ST</Avatar>
        </Tooltip>
        <Tooltip
          label={
            <>
              <div>John Outcast</div>
              <div>Levi Capitan</div>
            </>
          }
          withArrow
        >
          <Avatar radius="xl">+5</Avatar>
        </Tooltip>
      </Avatar.Group>
    </Tooltip.Group>
  );
};

export default AvatarGroup;
