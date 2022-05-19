import React from "react";
import { observer } from "mobx-react";
import { Box, Button, Grid } from "@mui/material";
import InstagramUserCard from "../components/InstagramUserCard";
import { useStores } from "../hooks/mobx";

const InstagramAccounts: React.FC = observer(() => {
  const { userStore } = useStores();

  return (
    <Box
      p={2}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {userStore.instagramAccounts.map((user) => (
          <Grid item key={user.id} xs={12} sm={6}>
            <InstagramUserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

export default InstagramAccounts;
