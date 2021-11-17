import React from 'react';
import { Button } from '@material-ui/core';

import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout title="AcconTube">
      Clone Youtube com Next.JS + Material-UI
      <Button variant="outlined" color="secondary">
        Primary
      </Button>
      </Layout>
  );
}
