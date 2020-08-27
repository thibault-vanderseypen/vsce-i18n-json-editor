var vscode;
(function () {
    vscode = acquireVsCodeApi();

    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.command) {
            case 'content':
                document.getElementById('content-view').innerHTML = message.render;
                break;

            case 'update':
                const t = message.translation;
                if (t) {
                    const el = document.getElementById(`input-key-${t.id}`);
                    el.value = t.key;
                    t.valid ? el.classList.remove('is-invalid') : el.classList.add('is-invalid');
                    document.getElementById(`input-key-${t.id}-feedback`).innerText = t.error;

                    const select = document.getElementById(`select-key-${t.id}`);
                    if (select) select.innerHTML = t.key == '' ? '&nbsp;' : t.key;
                }
                break;
        }
    });
    setTimeout(() => this.refresh(), 200);
})();

function add() {
    vscode.postMessage({
        command: 'add'
    })
}

function mark(id) {
    vscode.postMessage({
        command: 'mark',
        id: id
    });
}

function navigate(page) {
    vscode.postMessage({
        command: 'navigate',
        page: page
    });
}

function refresh() {
    vscode.postMessage({
        command: 'refresh'
    });
}

function remove(id) {
    vscode.postMessage({
        command: 'remove',
        id: id
    });
}

function save() {
    vscode.postMessage({
        command: 'save'
    })
}

function search(el) {
    vscode.postMessage({
        command: 'search',
        value: el.value
    });
}

function select(id) {
    vscode.postMessage({
        command: 'select',
        id: id
    });
}

function sort(column, ascending) {
    vscode.postMessage({
        command: 'sort',
        column: column,
        ascending: ascending
    });
}

function switchView() {
    const el = document.getElementById('icon-switch-view');
    const isTableView = !el.classList.contains('icon-table');
    isTableView ? el.classList.replace('icon-list-bullet', 'icon-table') : el.classList.replace('icon-table', 'icon-list-bullet');
    vscode.postMessage({
        command: 'switch-view',
        view: isTableView ? 'list' : 'table'
    });
}
function updateInput(el, id, language = '') {
    vscode.postMessage({
        command: 'update',
        id: id,
        value: el.value,
        language: language
    });
}