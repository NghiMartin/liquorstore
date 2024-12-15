export function generateRandomId() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

const toastrOptions = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-bottom-right",
    preventDuplicates: false,
    showDuration: "1000",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  
  // Assign toastr options
  export const toastr_options =  toastrOptions;