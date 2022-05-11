import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  FormControl,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@material-ui/core";

export default function Settings({ info, updateRoom }) {
  const navigate = useNavigate();
  const [roomState, setRoomState] = useState({
    guestCanPause: info.guestCanPause,
    votesToSkip: info.votesToSkip,
  });

  function handleInputChange(e) {
    if (e.target.name == "guestCanPause") {
      setRoomState({
        votesToSkip: roomState.votesToSkip,
        guestCanPause: e.target.value === "true" ? true : false,
      });
    } else if (e.target.name == "votesToSkip") {
      setRoomState({
        votesToSkip: e.target.value,
        guestCanPause: roomState.guestCanPause,
      });
    }
  }
  function handleUpdateRoom() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: roomState.votesToSkip,
        guest_can_pause: roomState.guestCanPause,
        code: info.code,
      }),
    };
    fetch("/api/update-room", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        updateRoom();
      });
  }
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Settings
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
            defaultValue={roomState.votesToSkip}
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
        <Button color="primary" variant="contained" onClick={handleUpdateRoom}>
          Update A Room
        </Button>
      </Grid>
    </Grid>
  );
}
