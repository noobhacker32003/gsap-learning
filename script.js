var initialPath = "M 10 100 Q 450 200 980 100";
var finalPath = "M 10 100 Q 450 0 980 100";
const string = document.querySelector("#string")
// string.addEventListener("mouseenter", function () {
//     gsap.to("#path", {
//         attr: { d: finalPath },
//         duration: 1,
//         ease: "power2.out"
//     })
// })
// string.addEventListener("mouseleave", function () {
//     gsap.to("#path", {
//         attr: { d: initialPath },
//         duration: 1,
//         ease: "power2.out"
//     })
// })  

string.addEventListener("mousemove", function (dets) {
    initialPath = `M 10 100 Q 450 ${dets.y} 980 100`
    gsap.to("#path", {
        attr: { d: initialPath },

    })
})