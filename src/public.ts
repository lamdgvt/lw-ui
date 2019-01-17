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

// 导入vux transfer-dom
// Thanks to: https://github.com/airyland/vux/blob/v2/src/directives/transfer-dom/index.js
// Thanks to: https://github.com/calebroseland/vue-dom-portal

/**
 * Get target DOM Node
 * @param {(Node|string|Boolean)} [node=document.body] DOM Node, CSS selector, or Boolean
 * @return {Node} The target that the el will be appended to
 */
function getTarget(node) {
    if (node === void 0) {
        node = document.body
    }
    if (node === true) { return document.body }
    return node instanceof window.Node ? node : document.querySelector(node)
}

const TransferDom = {
    inserted(el, { value }) {
        if (el.dataset && el.dataset.transfer !== 'true') return false;
        el.className = el.className ? el.className + ' v-transfer-dom' : 'v-transfer-dom';
        const parentNode = el.parentNode;
        if (!parentNode) return;
        const home = document.createComment('');
        let hasMovedOut = false;

        if (value !== false) {
            parentNode.replaceChild(home, el); // moving out, el is no longer in the document
            getTarget(value).appendChild(el); // moving into new place
            hasMovedOut = true
        }
        if (!el.__transferDomData) {
            el.__transferDomData = {
                parentNode: parentNode,
                home: home,
                target: getTarget(value),
                hasMovedOut: hasMovedOut
            }
        }
    },
    componentUpdated(el, { value }) {
        if (el.dataset && el.dataset.transfer !== 'true') return false;
        // need to make sure children are done updating (vs. `update`)
        const ref$1 = el.__transferDomData;
        if (!ref$1) return;
        // homes.get(el)
        const parentNode = ref$1.parentNode;
        const home = ref$1.home;
        const hasMovedOut = ref$1.hasMovedOut; // recall where home is

        if (!hasMovedOut && value) {
            // remove from document and leave placeholder
            parentNode.replaceChild(home, el);
            // append to target
            getTarget(value).appendChild(el);
            el.__transferDomData = Object.assign({}, el.__transferDomData, { hasMovedOut: true, target: getTarget(value) });
        } else if (hasMovedOut && value === false) {
            // previously moved, coming back home
            parentNode.replaceChild(el, home);
            el.__transferDomData = Object.assign({}, el.__transferDomData, { hasMovedOut: false, target: getTarget(value) });
        } else if (value) {
            // already moved, going somewhere else
            getTarget(value).appendChild(el);
        }
    },
    unbind(el) {
        if (el.dataset && el.dataset.transfer !== 'true') return false;
        el.className = el.className.replace('v-transfer-dom', '');
        const ref$1 = el.__transferDomData;
        if (!ref$1) return;
        if (el.__transferDomData.hasMovedOut === true) {
            el.__transferDomData.parentNode && el.__transferDomData.parentNode.appendChild(el)
        }
        el.__transferDomData = null
    }
};

const strToDateFormat = function (str) {
    str = str.trim();
    let arr = str.split(/ {1,}/i);
    if (!arr.length) return null;

    let ytd = arr[0];
    let timer = arr.length === 2 ? arr[1] : null;
    let date = new Date(ytd);

    if (timer) {
        let timerArr = timer.split(/[:/,\\.]/ig);
        timerArr.length > 1 && date.setHours(timerArr[0]);
        timerArr.length > 2 && date.setMinutes(timerArr[1]);
        timerArr.length > 3 && date.setTime(timerArr[2]);
    }

    if (String(date) === "Invalid Date") return null;

    return date;
}

const dateToStrFormat = function (timer, timepicker = false) {
    let year = timer.getFullYear();
    let month = timer.getMonth() + 1;
    let day = timer.getDate();
    month < 10 && (month = "0" + month);
    day < 10 && (day = "0" + day);
    let str = "" + year + '-' + month + '-' + day;

    if (timepicker) {
        let hour = timer.getHours();
        let minute = timer.getMinutes();
        hour < 10 && (hour = "0" + hour);
        minute < 10 && (minute = "0" + minute);
        str += ` ${hour}:${minute}`;
    }

    return str;
}

export { getTextSize, getZIndex, TransferDom, strToDateFormat, dateToStrFormat }
