var initialPath = "M 10 100 Q 450 200 980 100";
var finalPath = "M 10 100 Q 450 100 980 100";
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
    initialPath = `M 10 100 Q ${dets.x} ${dets.y} 980 100`
    gsap.to("#path", {
        attr: { d: initialPath },
        duration: 0.3,
        ease: "power3.out"

    })
})
string.addEventListener("mouseleave", function (dets) {
    gsap.to("#path", {
        attr: { d: finalPath },
        duration: 1.5,
        ease: "elastic.out(1,0.2)"

    })
})