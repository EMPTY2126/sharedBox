function cursorDesign(uid,CurosrPath){
    const wrapper = document.createElement("div");
    wrapper.className = uid;
    wrapper.style.position = "absolute";
    wrapper.style.top = "10px";
    wrapper.style.left = "10px";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.color = "white";
    const img = document.createElement("img");
    img.src = CurosrPath;
    img.style.width = "20px";
    const label = document.createElement("div");
    label.textContent = `${uid}`;
    label.style.fontSize = "10px";
    wrapper.appendChild(img);
    wrapper.appendChild(label);
    return wrapper;
    // curse.appendChild(wrapper);
    // divs.set(uid,wrapper);
}

export default {
    cursorDesign

}