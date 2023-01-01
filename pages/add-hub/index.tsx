import React from 'react';
import TextField from '@mui/material/TextField';
import CheckboxList from '../../components/CheckboxList';
import Map from '../../components/Map';
import { HubsService, CustomerHubsIn, OpenAPI } from '../../api';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

type checkItem = {
  labelId: string;
  value: number;
  name: string;
};
const defaultCoordinate = { lat: 35.6998, lng: 51.3381 };
const listItem: checkItem[] = [
  { labelId: 'Regular', value: 0, name: 'is_regular' },
  { labelId: 'Eco', value: 1, name: 'is_eco' },
  { labelId: 'Large', value: 2, name: 'is_large' },
  { labelId: 'Cold', value: 3, name: 'is_cold' },
];

function AddHub() {
  const [center, setCenter] = React.useState<{ lat: number; lng: number }>(
    defaultCoordinate
  );
  const [checked, setChecked] = React.useState<number[]>([]);
  const [hubName, setHubName] = React.useState<string>('');

  const router = useRouter();

  async function submitHandler() {
    if (!hubName || !center.lat || !center.lng) return;
    const hub: Partial<CustomerHubsIn> = {};
    hub.name = hubName;
    hub.lat = +center.lat.toFixed(5);
    hub.long = +center.lng.toFixed(5);
    for (const checkItem of listItem) {
      Object.assign(hub, {
        [checkItem.name]: checked.includes(checkItem.value),
      });
    }

    try {
      const response = await HubsService.hubsAddCustomerHubs(
        hub as CustomerHubsIn
      );
      if ('id' in response) {
        router.push('/hubs');
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Grid container spacing={4} columns={{ xs: 1, md: 2 }} sx={{ py: 5 }}>
      <Grid item xs={1}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          placeholder="Name of hub"
          autoFocus
          value={hubName}
          onChange={(event) => setHubName(event.target.value)}
        />
        <CheckboxList
          checked={checked}
          setChecked={setChecked}
          list={listItem}
        />
      </Grid>
      <Grid item xs={1}>
        <div style={{ width: '100%', height: '500px' }}>
          <Map
            defaultCoordinate={defaultCoordinate}
            lat={center.lat}
            lng={center.lng}
            setCoordinate={setCenter}
          />
        </div>
      </Grid>

      <Grid item xs={1} md={2} sx={{ textAlign: 'right' }}>
        <Button color="warning" onClick={() => router.push('/hubs')}>
          Discard
        </Button>
        <Button color="success" onClick={submitHandler}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddHub;
