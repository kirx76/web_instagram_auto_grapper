import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { instagramuser } from "@prisma/client";

type TInstagramUserCard = {
  user: instagramuser;
};

const InstagramUserCard: React.FC<TInstagramUserCard> = ({ user }) => {
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
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

export default InstagramUserCard;
