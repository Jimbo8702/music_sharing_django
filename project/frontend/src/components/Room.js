import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";
import Settings from "./Settings";
export default function Room() {
  const navigate = useNavigate();
  const params = useParams();
  const [settings, setSettings] = useState(false);
  const [roomState, setRoomState] = useState({
    votesToSkip: 1,
    guestCanPause: false,
    isHost: false,
  });
  const roomCode = params.roomCode;
  useEffect(() => {
    getRoomDetails(roomCode);
  }, []);

  function getRoomDetails(roomCode) {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => response.json())
      .then((data) => {
        setRoomState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
          code: roomCode,
        });
      });
  }
  function leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
    navigate("/");
  }
  function updateShowSettings(value) {
    setSettings(value);
  }
  const updateRoom = () => {
    setSettings(false);
    getRoomDetails(roomCode);
  };

  function SettingsPage() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Settings info={roomState} updateRoom={updateRoom} />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }
  function SettingsBtn() {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }
  if (settings) {
    return <SettingsPage />;
  }
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes: {roomState.votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest Can Pause: {roomState.guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Host: {roomState.isHost.toString()}
        </Typography>
      </Grid>
      {roomState.isHost ? <SettingsBtn /> : null}
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}
