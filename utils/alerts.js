import Swal from "sweetalert2";

export function successAlert(title, text) {
  Swal.fire({ title, text, icon: "success", confirmButtonText: "Okay" });
}

export function errorAlert(title, text) {
  Swal.fire({ title, text, icon: "error", confirmButtonText: "Okay" });
}
