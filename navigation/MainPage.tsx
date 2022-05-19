import React, { useEffect, useState } from "react";
import { initWebApp, initWebView } from "../public/static/main";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { observer } from "mobx-react";
import { useStores } from "../hooks/mobx";
import { toJS } from "mobx";
import InstagramUserCard from "../components/InstagramUserCard";

const MainPage: React.FC = observer(() => {
  const { userStore } = useStores();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    initWebView();
    initWebApp();
    userStore.setUserFromWindow();
    setLoaded(true);
  }, []);

  const onClick = async () => {
    await userStore.initUserData().then(() => {
      console.log(toJS(userStore));
    });
  };

  console.log(userStore.instagramUsers, ["userStore.instagramUsers"]);

  if (!loaded || !userStore.user) {
    return (
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      p={2}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {userStore.instagramUsers.length <= 0 && (
        <Button onClick={onClick} variant="outlined">
          Get telegram user instagram accounts
        </Button>
      )}
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {userStore.instagramUsers.map((user) => (
          <Grid item key={user.pk} xs={12} sm={6}>
            {/*<Item>*/}
            <InstagramUserCard user={user} />
            {/*</Item>*/}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

export default MainPage;
