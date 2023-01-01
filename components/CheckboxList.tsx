import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

interface CheckItem {
  labelId: string;
  value: number;
}

interface CheckboxProps {
  checked: number[];
  setChecked: (checkList: number[]) => void;
  list: CheckItem[];
}

export default function CheckboxList({
  checked,
  setChecked,
  list,
}: CheckboxProps) {
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {list.map(({ labelId, value }) => {
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemText id={labelId} primary={labelId} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
