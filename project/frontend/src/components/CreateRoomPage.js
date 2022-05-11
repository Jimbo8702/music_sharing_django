import React, { Component, useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link, useNavigate } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function CreateRoomPage() {
  const navigate = useNavigate();
  const [createRoomState, setCreateRoomState] = useState({
    guestCanPause: true,
    votesToSkip: 1,
  });
  // function handleVotesChange(e) {
  //   console.log(e.target.value);
  //   setCreateRoomState({
  //     votesToSkip: e.target.value,
  //   });
  // }

  // function handleGuestCanPauseChange(e) {
  //   setCreateRoomState({
  //     guestCanPause: e.target.value === "true" ? true : false,
  //   });
  // }
  function handleInputChange(e) {
    if (e.target.name == "guestCanPause") {
      setCreateRoomState({
        votesToSkip: createRoomState.votesToSkip,
        guestCanPause: e.target.value === "true" ? true : false,
      });
    } else if (e.target.name == "votesToSkip") {
      setCreateRoomState({
        votesToSkip: e.target.value,
        guestCanPause: createRoomState.guestCanPause,
      });
    }
  }
  function handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: createRoomState.votesToSkip,
        guest_can_pause: createRoomState.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        navigate(`/room/${data.code}`);
      });
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create A Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue="true"
            name="guestCanPause"
            onChange={handleInputChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            name="votesToSkip"
            onChange={handleInputChange}
            defaultValue={createRoomState.votesToSkip}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
          />
          <FormHelperText>
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >
          Create A Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
