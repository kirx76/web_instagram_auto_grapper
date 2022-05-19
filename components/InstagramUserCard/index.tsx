import React, { useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { instagramuser } from "@prisma/client";
import { observer } from "mobx-react";
import { useStores } from "../../hooks/mobx";

type TInstagramUserCard = {
  user: instagramuser;
};

const InstagramUserCard: React.FC<TInstagramUserCard> = observer(({ user }) => {
  const { userStore } = useStores();
  const [enableStatusLoading, setEnableStatusLoading] = useState(false);

  const onChangeEnabledState = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnableStatusLoading(true);
    await userStore.changeInstagramUserEnabledStatus(user);
    setEnableStatusLoading(false);
  };

  return (
    <Card sx={{ minHeight: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={user.profile_pic_location}
          alt={user.username}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.full_name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/*<Button size="small" color="primary">*/}
        {/*  Share*/}
        {/*</Button>*/}
        <FormGroup sx={{ p: 1 }}>
          <FormControlLabel
            disabled={enableStatusLoading}
            control={
              <Switch onChange={onChangeEnabledState} checked={user.enabled} />
            }
            label={user.enabled ? "Enabled" : "Disabled"}
          />
        </FormGroup>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item>
            <Chip
              label={`Posts: ${user._count.instagrampost}`}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Chip
              label={`Stories: ${user._count.instagramstory}`}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Chip
              label={`Highlights ${user._count.instagramhighlight}`}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
});

export default InstagramUserCard;
