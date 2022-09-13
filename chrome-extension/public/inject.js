// //create a script tag to inject, then set a variable with the id in that script
// let idScript = document.createElement("script");
// idScript.setAttribute("type", "application/javascript");
// idScript.textContent = 'var myExtId = "' + chrome.runtime.id +'";';
// let parent = ( document.head || document.documentElement );
// parent.insertBefore( idScript, parent.firstChild );

console.log("myExtId: ", chrome.runtime.id);
//inject and run your other script here

// idScript.remove(); //then cleanup 