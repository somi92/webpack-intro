export default function(label) {
    const element = document.createElement("div");

    element.innerHTML = label;
    element.id = "component";

    element.onclick = () => {
        element.innerHTML = element.innerHTML + " CLICKED";
    };

    return element;
};