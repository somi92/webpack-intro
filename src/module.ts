export default function(label?: string) {
    const element = document.createElement("div");

    element.innerHTML = label || "Hello World!!!";
    element.id = "component";

    element.onclick = () => {
        element.innerHTML = element.innerHTML + " CLICKED"; 
    };

    return element;
};