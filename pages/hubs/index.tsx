import * as React from 'react';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { GetServerSideProps } from 'next';
import { HubsService, OpenAPI, CustomerHubsIn } from '../../api';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function GutterlessList({
  hubsList = [],
}: {
  hubsList: CustomerHubsIn[];
}): JSX.Element {
  const router = useRouter();
  return (
    <Box sx={{ width: 1, height: 1, paddingTop: '70px' }}>
      <Button onClick={() => router.push('/add-hub')} variant="text">
        <AddIcon />
        Add a hub
      </Button>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {hubsList.length !== 0 ? (
          hubsList.map((hub: CustomerHubsIn) => (
            <ListItem
              key={hub.name + hub.lat}
              disableGutters
              secondaryAction={
                <IconButton aria-label="comment">
                  <CommentIcon />
                </IconButton>
              }
            >
              <ListItemText sx={{ px: 2 }} primary={hub.name} />
            </ListItem>
          ))
        ) : (
          <h4>There is no hubs.</h4>
        )}
      </List>
    </Box>
  );
}
export default GutterlessList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['access-token'];
  OpenAPI.TOKEN = token;
  let response: CustomerHubsIn[] = [];
  try {
    response = await HubsService.hubsGetCustomerHubs();
  } catch (e) {
    console.dir(e);
  }
  return {
    props: {
      hubsList: response,
    },
  };
};
