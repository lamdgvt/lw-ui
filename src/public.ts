let getTextSize = function (text, style) {
    if (!text) return;

    let div = document.createElement("div");
    div.innerText = text;
    div.style.cssText = "visibility:hidden; position:absolute; top:0px; overflow:hidden; white-space:nowrap; " + style;
    document.body.appendChild(div);
    let { offsetWidth, offsetHeight } = div;

    return {
        width: Math.ceil(offsetWidth),
        height: Math.ceil(offsetHeight)
    };
}

export { getTextSize }