const installBtn = document.querySelector("[data-install]");
const toast = document.querySelector("[data-toast]");

let deferredPrompt = null;

function showToast(message) {
  if (!toast) return;
  toast.hidden = false;
  toast.textContent = message;
  window.setTimeout(() => {
    toast.hidden = true;
  }, 3200);
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  if (installBtn) installBtn.hidden = false;
});

installBtn?.addEventListener("click", async () => {
  if (!deferredPrompt) {
    showToast("En iOS: Compartir → Agregar a inicio");
    return;
  }
  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;
  if (choice.outcome === "accepted") {
    showToast("Zenia quedó instalada");
  }
  deferredPrompt = null;
  installBtn.hidden = true;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      showToast("No se pudo registrar el modo offline");
    });
  });
}
