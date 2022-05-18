

const randomString = () => {
    let charactors =
      "-ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randString = ""

      for(let i = 0 ; i < 20 ; i++){
        randString += charactors.charAt(Math.random() * charactors.length)
      }
    return randString
}

export default randomString;