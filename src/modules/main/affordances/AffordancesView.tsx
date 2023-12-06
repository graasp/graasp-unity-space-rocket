import React, { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Card, ListItemButton, ListItemIcon } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { GetAffordancesList, ListAffordances } from '@/config/affordances';

const AffordancesView: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const handleItemClick = (index: number): void => {
    setVisibleItems(
      (prevVisibleItems) =>
        prevVisibleItems.includes(index)
          ? prevVisibleItems.filter((item) => item !== index) // filter/remove the index if already in list
          : [...prevVisibleItems, index], // add index if not already present
    );
  };

  const data: ListAffordances[] = GetAffordancesList();

  return (
    <List>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <Card sx={{ margin: 2 }}>
            <ListItemButton onClick={() => handleItemClick(index)}>
              <ListItemIcon sx={{ color: 'black' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ sx: { fontWeight: 'medium' } }}
              />
              {visibleItems.includes(index) ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </ListItemButton>
            {visibleItems.includes(index) && (
              <ListItem>{item.components}</ListItem>
            )}
          </Card>
        </React.Fragment>
      ))}
    </List>
  );
};

export default AffordancesView;
