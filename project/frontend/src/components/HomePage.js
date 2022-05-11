import React, { useEffect, useState } from "react";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import { useNavigate } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import Room from "./Room";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

export default function HomePage() {
  const [homeState, setHomeState] = useState({
    roomCode: null,
  });

  useEffect(async () => {
    await fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHomeState({
          roomCode: data.code,
        });
      });
  }, []);

  function Home() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            homeState.roomCode ? (
              <Navigate to={`/room/${homeState.roomCode}`} />
            ) : (
              <Home />
            )
          }
        />
        <Route path="/join" element={<JoinRoomPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
  );
}
