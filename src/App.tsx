import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { CssBaseline, Container, Typography } from '@mui/material';

const App: React.FC = () => (
    <>
      <CssBaseline />
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Справочник организаций и сотрудников
        </Typography>
        <AppRoutes />
      </Container>
    </>
);

export default App;