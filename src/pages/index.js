import React from 'react';
import { Box, Grid } from '@material-ui/core';

import Layout from 'src/components/Layout';
import VideoCard from 'src/components/VideoCard';
import { StylesContext } from '@material-ui/styles';
import { getVideos } from 'src/database/getVideos';
import { getSession } from 'next-auth/client';
//final dos imports


//início do código do vídeo
function Home({ data }) {
  return (
    <Layout title="AcconTube">
      <Box p={2}>
        <Grid container spacing={4}>
          {data.map((item) => (
            <Grid key={item._id} item xl={3} lg={3} md={4} sm={6} xs={12}>
              <VideoCard item={item} />
            </Grid>
          ))}        
        </Grid>
      </Box>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const session = await getSession(context);

  const data = await getVideos();

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
    revalidate: 5,
  };
}

export default Home;