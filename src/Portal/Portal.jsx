import { useEffect } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const mount = document.createElement("div");
  const el = document.createElement("div");
  el.setAttribute("id", "notification-wrapper");
  document.body.appendChild(mount);
  mount.setAttribute("id", "toast-root");

  useEffect(() => {
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [el, mount]);

  return createPortal(children, el);
};

export { Portal };
