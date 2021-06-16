var vscode;
(function () {
  vscode = acquireVsCodeApi();

  window.addEventListener("message", (event) => {
    const message = event.data;
    switch (message.command) {
      case "content":
        document.getElementById("content-view").innerHTML = message.render;
        break;

      case "folders":
        const folders = message.folders;
        if (folders) {
          var select = document.getElementById("select-folder");
          for (const d of folders) {
            var option = document.createElement("option");
            option.text = d.name;
            option.value = d.path;
            select.add(option);
          }
          select.style.display = "inline";
        }

        break;

      case "update":
        const t = message.translation;
        if (t) {
          const el = document.getElementById(`input-key-${t.id}`);
          el.value = t.key;
          t.valid ? el.classList.remove("is-invalid") : el.classList.add("is-invalid");
          document.getElementById(`input-key-${t.id}-feedback`).innerText = t.error;

          const select = document.getElementById(`select-key-${t.id}`);
          if (select) {
            select.innerHTML = t.key === "" ? "&nbsp;" : t.key;
          }
        }
        break;
    }
  });
  setTimeout(() => this.refresh(), 200);
})();


add = () => vscode.postMessage({ command: "add" });
filterFolder = (el) => vscode.postMessage({ command: "filterFolder", value: el.value });
mark = (id) => vscode.postMessage({ command: "mark", id: id });
navigate = (page) => vscode.postMessage({ command: "navigate", page: page });
pageSize = (el) => vscode.postMessage({ command: "pageSize", value: el.value });
refresh = () => vscode.postMessage({ command: "refresh" });
remove = (id) => vscode.postMessage({ command: "remove", id: id });
save = () => vscode.postMessage({ command: "save" });
search = (el) => vscode.postMessage({ command: "search", value: el.value });
select = (id) => vscode.postMessage({ command: "select", id: id });
sort = (column, ascending) => vscode.postMessage({ command: "sort", column: column, ascending: ascending });
switchView = () => {
  const el = document.getElementById("icon-switch-view");
  const isTableView = !el.classList.contains("icon-table");
  isTableView ? el.classList.replace("icon-list-bullet", "icon-table") : el.classList.replace("icon-table", "icon-list-bullet");
  vscode.postMessage({
    command: "switch-view",
    view: isTableView ? "list" : "table",
  });
};
updateInput = (el, id, language = "") => vscode.postMessage({ command: "update", id: id, value: el.value, language: language });
updateFolder = (el, id) => vscode.postMessage({ command: "folder", id: id, value: el.value });

