import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIcon from "../img/error.svg?raw";
import successIcon from "../img/success.svg?raw";

const snackbarForm = document.querySelector(".form");

function createIconDataUrl(svgSource) {
    return `data:image/svg+xml,${encodeURIComponent(svgSource)}`;
}

const notificationIcons = {
    success: createIconDataUrl(successIcon),
    error: createIconDataUrl(errorIcon),
};

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
                return;
            }

            reject(delay);
        }, delay);
    });
}

function showNotification(delay, state) {
    const message =
        state === "fulfilled"
            ? `Fulfilled promise in ${delay}ms`
            : `Rejected promise in ${delay}ms`;
    const notificationMethod = state === "fulfilled" ? "success" : "error";
    const iconUrl = state === "fulfilled" ? notificationIcons.success : notificationIcons.error;

    iziToast[notificationMethod]({
        message,
        iconUrl,
        position: "topRight",
        width: "calc(100% - 8px)",
        timeout: 5000,
        backgroundColor: state === "fulfilled" ? "#b7efc5" : "#ffd4d4",
        messageColor: "#3d4b42",
        progressBarColor: "rgba(0, 0, 0, 0.3)",
    });
}

snackbarForm.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(snackbarForm);
    const delay = Number(formData.get("delay"));
    const state = formData.get("state");

    createPromise(delay, state).then(
        resolvedDelay => showNotification(resolvedDelay, "fulfilled"),
        rejectedDelay => showNotification(rejectedDelay, "rejected"),
    );
});
