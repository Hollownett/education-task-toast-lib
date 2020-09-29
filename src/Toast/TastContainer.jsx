import React from "react";
import { Portal } from "../Portal/Portal";
import { Toast } from "./Toast";

export const ToastContainer = (props) => {
  return <Portal>{props.children}</Portal>;
};
