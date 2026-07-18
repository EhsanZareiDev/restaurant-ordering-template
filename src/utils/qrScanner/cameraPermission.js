

export async function watchCameraPermission({
  stopScanner,
  onDenied,
  isOpen
}) {
  if (!isOpen) return () => {};
  if (!navigator.permissions) return () => {};

  try {
    const permission = await navigator.permissions.query({
      name: "camera",
    });

    permission.onchange = async () => {
      if (permission.state === "denied") {
        await stopScanner();
        onDenied();
      }
    };

    // cleanup
    return () => {
      permission.onchange = null;
    };
  } catch (error) {
    console.warn("Permission API:", error);

    return () => {};
  }
}