const curse = document.querySelector(".cursorBox");
const CurosrPath = "./src/cursorImg.svg";

function initUsers(data,divs){
    if(!data.userMap) return null;
    return data.userMap;
}

export default {
    initUsers
}