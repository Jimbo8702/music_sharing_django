import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";
export default function Room() {
  const navigate = useNavigate();
  const params = useParams();
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
    fetch("http://localhost:8000/api/get-room" + "?code=" + roomCode)
      .then((response) => response.json())
      .then((data) => {
        setRoomState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }
  function leaveButtonPressed() {
    navigate("/");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:8000/api/leave-room", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
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
