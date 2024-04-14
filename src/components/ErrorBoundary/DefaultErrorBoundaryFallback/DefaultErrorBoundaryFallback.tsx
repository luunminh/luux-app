import { PATHS } from '@config/paths';
import { Box, Button, Container, Flex, Text, Title } from '@mantine/core';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FallbackProps } from '../CustomErrorBoundary/CustomErrorBoundary';

const DefaultErrorFallback: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
  showErrorMessage = false,
}) => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    resetErrorBoundary();
    navigate(PATHS.root);
  };

  const handleTryAgain = () => {
    resetErrorBoundary();
    window.location.reload();
  };

  return (
    <Container>
      <Box
        mih="70vh"
        pt={8}
        style={{
          textAlign: 'center',
        }}
      >
        <Title order={2}>Unfortunately, something went wrong.</Title>
        <Text mt={4}>
          Please refresh your browser. If the error continues, please contact our support team.
        </Text>

        {showErrorMessage && (
          <Box mt={4}>
            <pre>{error?.message}</pre>
          </Box>
        )}

        <Flex align="center" justify="center" mt={4} gap={3}>
          <Button onClick={handleBackToHome}>Back to Home</Button>
          <Button onClick={handleTryAgain} variant="outlined">
            Try again
          </Button>
        </Flex>
      </Box>
    </Container>
  );
};

export default DefaultErrorFallback;
