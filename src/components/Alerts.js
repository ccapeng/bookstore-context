import React, { useEffect } from 'react'
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";

export const Alerts = () => {

  const errors = useSelector(state => state.errors);
  const message = useSelector(state => state.messages);
  console.log("errors", errors);
  console.log("message", message);
  const alert = useAlert();

  useEffect(() => {
    if (errors.msg !== "") {
      alert.error(errors.msg)
    }
  }, [errors]);

  useEffect(() => {
    if (message !== "") {
      alert.success(message)
    }
  }, [message]);

  return (
    <></>
  )
}

export default Alerts;