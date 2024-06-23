import { Box } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';
import { socketService } from 'src/service';
import Cursors from '.';

const CursorWrapper = ({ children }: PropsWithChildren) => {
  const { id } = useParams();
  const handlePointerMove = (event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    socketService.joinDesign({
      x,
      y,
      designId: id,
    });
  };

  const handlePointerLeave = (event: React.PointerEvent) => {
    event.preventDefault();

    socketService.joinDesign({
      x: null,
      y: null,
      designId: id,
    });
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    socketService.joinDesign({
      x,
      y,
      designId: id,
    });
  };

  return (
    <Box
      className="cmp-cursor__wrapper"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
    >
      {children}
      <Cursors.Live />
    </Box>
  );
};

export default CursorWrapper;
