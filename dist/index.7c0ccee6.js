/* <div id="parent">
    <div id="child1">
        <h2>Hi h2 child1</h2>
    </div>
    <div id="child1">
        <h2>Hi h2 child1</h2>
    </div>
</div> */ const parent = React.createElement("div", {
    id: "parent"
}, [
    React.createElement("div", {
        id: "child1"
    }, React.createElement("h2", {}, "Hi h2 child1")),
    React.createElement("div", {
        id: "child2"
    }, React.createElement("h2", {}, "Hi h2 child2"))
]);
const head = React.createElement("h2", {
    id: "heading"
}, "Hello world from react");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);

//# sourceMappingURL=index.7c0ccee6.js.map
