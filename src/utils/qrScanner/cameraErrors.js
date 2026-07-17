
  // Map camera-related errors to a unified structure for UI handling
export function normalizeCameraError(error) {
  const message = error?.message || "";

  if (message.includes("NotAllowedError"))
    return "NotAllowedError";

  if (message.includes("NotFoundError"))
    return "NotFoundError";

  if (message.includes("NotReadableError"))
    return "NotReadableError";

  return error?.name || "UnknownError";
}

// Generate user-friendly messages for camera-related errors
export function getCameraErrorMessage(error) {
  switch (normalizeCameraError(error)) {
    case "NotAllowedError":
      return {
        title: "Camera Permission Denied",
        description:
          "Please allow camera access or upload a QR image instead.",
      };

    case "NotFoundError":
      return {
        title: "Camera Not Found",
        description:
          "No camera was detected on this device.",
      };

    case "NotReadableError":
      return {
        title: "Camera Busy",
        description:
          "Your camera is currently being used by another application.",
      };

    default:
      return {
        title: "Camera Error",
        description:
          "Unable to start the camera.",
      };
  }
}