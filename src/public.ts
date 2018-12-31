let getTextSize = function (text, style) {
    /**
     * 频繁操作Dom节点,影响性能.
     */
    if (!text) return { width: 0, height: 0 };
    let div = document.createElement("div");
    div.innerText = text;
    div.style.cssText = "visibility:hidden; position:absolute; top:0px; overflow:hidden; white-space:nowrap; " + style;
    document.body.appendChild(div);
    let { offsetWidth, offsetHeight } = div;
    document.body.removeChild(div);
    return {
        width: Math.ceil(offsetWidth),
        height: Math.ceil(offsetHeight)
    };
}

let zIndex = 100;

let getZIndex = function () {
    return zIndex++;
}

export { getTextSize, getZIndex }