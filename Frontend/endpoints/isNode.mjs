function isNode() {
  return typeof window === "undefined";
}

var localStorage2;

// // Descomente esse código para testar os endpoints no node
// const { LocalStorage } = await import("node-localstorage");
// localStorage2 = new LocalStorage("./scratch");

export { isNode, localStorage2 };
