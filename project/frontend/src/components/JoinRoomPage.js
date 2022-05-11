import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography } from "@material-ui/core";

export default function JoinRoomPage() {
  const navigate = useNavigate();
  const [joinRoomState, setJoinRoomState] = useState({
    roomCode: "",
    error: "",
  });

  function handleTextFieldChange(e) {
    setJoinRoomState({
      roomCode: e.target.value,
      error: "",
    });
    console.log(joinRoomState.roomCode);
  }

  function roomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: joinRoomState.roomCode,
      }),
    };
    console.log(requestOptions);
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${joinRoomState.roomCode}`);
        } else {
          setJoinRoomState({
            roomCode: joinRoomState.roomCode,
            error: "Room not found.",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={joinRoomState.error}
          label="Code"
          placeholder="Enter a Room Code"
          value={joinRoomState.roomCode}
          helperText={joinRoomState.error}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={roomButtonPressed}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
