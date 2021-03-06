import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ToastWrapper } from "./components";

export const Toast = (props) => {
  const { toastList, position, autoDelete, autoDeleteTime, animation } = props;
  const [list, setList] = useState([toastList]);

  useEffect(() => {
    setList([...toastList]);

    // eslint-disable-next-line
  }, [toastList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, autoDeleteTime);

    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line
  }, [toastList, autoDelete, autoDeleteTime, list]);

  const deleteToast = (id) => {
    const listItemIndex = list.findIndex((e) => e.id === id);
    const toastListItem = toastList.findIndex((e) => e.id === id);
    list.splice(listItemIndex, 1);
    toastList.splice(toastListItem, 1);
    setList([...list]);
  };

  return (
    <ToastWrapper animation={animation}>
      <div className={`notification-container ${position}`}>
        {list.map((toast, i) => (
          <div
            key={i}
            className={`notification toast ${position}`}
            style={{
              backgroundColor: toast.backgroundColor,
              padding: toast.toastPadding
                ? toast.toastPadding
                : "30px 20px 20px 25px",
            }}
          >
            <button
              onClick={() => deleteToast(toast.id)}
              style={{
                color: toast.titleColor,
              }}
            >
              X
            </button>
            <div className="notification-image">
              <img src={toast.icon} alt="" />
            </div>
            <div>
              <p
                className="notification-title"
                style={{
                  color: toast.titleColor,
                }}
              >
                {toast.title}
              </p>
              <p className="notification-message">{toast.description}</p>
            </div>
          </div>
        ))}
      </div>
    </ToastWrapper>
  );
};

Toast.defaultProps = {
  position: "bottom-right",
  autoDelete: false,
};

Toast.propTypes = {
  toastList: PropTypes.array.isRequired,
  position: PropTypes.string,
  autoDelete: PropTypes.bool,
  autoDeleteTime: PropTypes.number,
  toastPadding: PropTypes.string,
  animation: PropTypes.string,
};
