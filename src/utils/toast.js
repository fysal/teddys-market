function showToast(){
    var toastLiveExample = document.getElementById("liveToast");

console.log("I have been toast");

var toast = new bootstrap.Toast(toastLiveExample);

toast.show();
}
 export default showToast;
