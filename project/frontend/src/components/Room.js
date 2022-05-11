import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Room() {
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

  return (
    <div>
      <h3>{roomCode}</h3>
      <p>Votes: {roomState.votesToSkip}</p>
      <p>Guest Can Pause: {roomState.guestCanPause.toString()}</p>
      <p>Host: {roomState.isHost.toString()}</p>
    </div>
  );
}
