import '../css/erdemo.less';

import faviconurl from '../eds/common/favicon.png';

// Load favicon
let favicon = document.createElement("link");
favicon.rel = "icon"
favicon.type = "image/png"
favicon.href = `dist/${faviconurl}`;
document.head.appendChild(favicon)
    
// Figure out which mode we're in
let params = new URLSearchParams(document.location.search.substring(1))
let mode = params.get("mode");
if (!mode) mode = "";

let template = document.querySelector(`template#template-${mode}-mode`);
let clone = document.importNode(template.content, true);
document.querySelector(".appcontent").appendChild(clone);
document.querySelector(`.btn-mode`).classList.remove("active");
let modeButton = document.querySelector(`#btn-${mode}`);
if (modeButton) modeButton.classList.toggle("active");

// Set a theme (light is default)
let theme = params.get("theme");
if (theme) {
    let bclasses = document.querySelector("body").classList;
    bclasses.remove("light");
    bclasses.remove("dark");
    bclasses.add(theme);
}

// Load mode stylesheet and script
if (mode) {
    let stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet"
    stylesheet.href = `dist/${mode}.css`
    document.head.appendChild(stylesheet)
    
    let script = document.createElement("script");
    script.src = `dist/${mode}.js`
    document.head.appendChild(script)
}
