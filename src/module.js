export default function(label = "Hello World") {
    const element = document.createElement("div");

    element.innerHTML = label;
    element.id = "component";

    element.onclick = () => {
        import("./lazy")
        .then(lazy => {
            element.innerHTML = element.innerHTML + " " + lazy.default;
        })
        .catch(err => {
            console.log(err);
        });
    };

    return element;
};