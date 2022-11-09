// browser.storage.local.clear();


document.addEventListener('DOMContentLoaded', function() {
    //video player toggle
    document.getElementById('videoPlayerOn').addEventListener('click', function(e){
        toggleActive(e.target.parentNode.firstElementChild, e.target.parentNode.lastElementChild, true);
        addToLocalStorage('isVideoPlayerActive', true);
        setEltClass(document.getElementById('videoPlayer-config'), "disabled", false);
    });
    document.getElementById('videoPlayerOff').addEventListener('click', function(e){
        toggleActive(e.target.parentNode.lastElementChild, e.target.parentNode.firstElementChild, false);
        addToLocalStorage('isVideoPlayerActive', false);
        setEltClass(document.getElementById('videoPlayer-config'), "disabled", true);
    });

    //init
    browser.storage.local.get('isVideoPlayerActive').then(result => {
        if (result['isVideoPlayerActive']) {
            const httpElt =  document.getElementById("videoPlayerOn")
            toggleActive(httpElt, httpElt.parentNode.lastElementChild)
            setEltClass(document.getElementById('videoPlayer-config'), "disabled", false);
        } else {
            setEltClass(document.getElementById('videoPlayer-config'), "disabled", true);
        }
    });

    //dates toggle
    document.getElementById('datesOn').addEventListener('click', function(e){
        toggleActive(e.target.parentNode.firstElementChild, e.target.parentNode.lastElementChild, true);
        addToLocalStorage('isDatesActive', true);
        setEltClass(document.getElementById('dates-config'), "disabled", false);
    });
    document.getElementById('datesOff').addEventListener('click', function(e){
        toggleActive(e.target.parentNode.lastElementChild, e.target.parentNode.firstElementChild, false);
        addToLocalStorage('isDatesActive', false);
        setEltClass(document.getElementById('dates-config'), "disabled", true);
    });

    //init
    browser.storage.local.get('isDatesActive').then(result => {
        if (result['isDatesActive']) {
            const httpElt =  document.getElementById("datesOn")
            toggleActive(httpElt, httpElt.parentNode.lastElementChild)
            setEltClass(document.getElementById('dates-config'), "disabled", false);
        } else {
            setEltClass(document.getElementById('dates-config'), "disabled", true);
        }
    });

    //login toggle
    document.getElementById('loginOn').addEventListener('click', function(e){
        toggleActive(e.target.parentNode.firstElementChild, e.target.parentNode.lastElementChild, true);
        addToLocalStorage('isloginActive', true);
        setEltClass(document.getElementById('login-config'), "disabled", false);
    });
    document.getElementById('loginOff').addEventListener('click', function(e){
        toggleActive(e.target.parentNode.lastElementChild, e.target.parentNode.firstElementChild, false);
        addToLocalStorage('isloginActive', false);
        setEltClass(document.getElementById('login-config'), "disabled", true);
    });

    //init
    browser.storage.local.get('isloginActive').then(result => {
        if (result['isloginActive']) {
            const httpElt =  document.getElementById("loginOn")
            toggleActive(httpElt, httpElt.parentNode.lastElementChild)
            setEltClass(document.getElementById('login-config'), "disabled", false);
        } else {
            setEltClass(document.getElementById('login-config'), "disabled", true);
        }
    });
});

function setEltClass(elt, className, set){
    if (set) {
        if(!elt.classList.contains(className)){
            elt.classList.add(className)
        }
    } else {//remove elt
        elt.classList.remove(className);
    }
}


function toggleActive(eltClick, elt=0){
    if(eltClick.parentNode.classList.contains("toggle")){//toggle for 2 menus
        if(!eltClick.classList.contains("toggle_btn--active")){
            eltClick.classList.toggle("toggle_btn--active");
            elt.classList.toggle("toggle_btn--active");
            elt.parentNode.classList.toggle("toggle--checked");
        }
    }else if(eltClick.parentNode.classList.contains("toggle_3")){//toggle for 3 menus
        if(false == eltClick.classList.contains("toggle_btn3--active")){
            eltClick.parentNode.classList.remove("toggle_3--0")
            eltClick.parentNode.classList.remove("toggle_3--1")
            eltClick.parentNode.classList.remove("toggle_3--2")
            let value;
            for(let k =0; k < 3; k++){
                if(eltClick.parentNode.children[k].classList.contains("toggle_btn3--active")){
                    eltClick.parentNode.children[k].classList.remove("toggle_btn3--active");
                }
                if(eltClick.parentNode.children[k] == eltClick){
                    eltClick.parentNode.classList.add("toggle_3--"+k);
                    value = Math.abs(k-2);
                }
            }
            eltClick.classList.add("toggle_btn3--active");
        }
    }
}