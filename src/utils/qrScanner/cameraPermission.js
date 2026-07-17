

export async function watchCameraPermission({
  isOpen,
  permissionCameraRef,
  stopScanner,
  onDenied,
}) {
  if (!isOpen) return;

  if (!navigator.permissions) return;

  try {
    const permission = await navigator.permissions.query({
      name: "camera",
    });

    permissionCameraRef.current = permission;

    permission.onchange = async () => {
      if (permission.state === "denied") {
        await stopScanner();

        onDenied();
      }
    };
  } catch (error) {
    console.warn("Permission API:", error);
  }
}