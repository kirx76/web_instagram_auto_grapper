import React, { useEffect, useState } from "react";
import { initWebApp, initWebView } from "../public/static/main";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { observer } from "mobx-react";
import { useStores } from "../hooks/mobx";
import { toJS } from "mobx";
import InstagramUserCard from "../components/InstagramUserCard";
import { useRouter } from "next/router";

const MainPage: React.FC = observer(() => {
  const { userStore } = useStores();
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    initWebView();
    initWebApp();
    userStore.setUserFromWindow();
    setLoaded(true);
  }, []);

  const onClick = async () => {
    await userStore.initUserData().then(() => {
      console.log(toJS(userStore));
      router.push("/instagramUsers");
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
      <Grid
        container
        spacing={4}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          {userStore.instagramUsers.length <= 0 && (
            <Button onClick={onClick} variant="outlined">
              Instagram users
            </Button>
          )}
        </Grid>
        <Grid item xs={6}>
          {userStore.instagramAccounts.length <= 0 && (
            <Button onClick={onClick} variant="outlined">
              Instagram accounts
            </Button>
          )}
        </Grid>
      </Grid>
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
