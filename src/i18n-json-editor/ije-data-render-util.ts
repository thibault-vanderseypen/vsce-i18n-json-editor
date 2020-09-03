import { IJEDataTranslation } from "./models/ije-data-translation";
import { IJEPage } from "./models/ije-page";
import { IJESort } from "./models/ije-sort";

export class IJEDataRenderUtil {

    static renderPagination(translations: IJEDataTranslation[], page: IJEPage, withPageSizeSelector: boolean = true) {
        let render = '<div class="container-fluid">';
        render += '<div class="row">';
        render += '<div class="col-4">';
        render += '<div class="mt-3">';
        if (page.count == 0) {
            render += '0 ';
        } else {
            var firstEl = ((page.pageNumber - 1) * page.pageSize) + 1;
            render += `${firstEl}-${firstEl + (translations.length - 1)} `;
        }
        render += `of ${page.count}`;
        render += '</div>';
        render += '</div>';
        render += '<div class="col-8">';
        render += '<div class="float-right">';
        render += '<div class="form-inline">';
        if (withPageSizeSelector) {
            render += '<select class="form-control form-control-sm mr-4" style="height: 32px;" onchange="pageSize(this)">';
            [10, 20, 50, 100].forEach(i => {
                render += `<option value="${i}" ${i === page.pageSize ? 'selected="selected"' : ""}>${i}</option>`;
            });
            render += ' </select>';
        }
        render += '<nav class="mt-3">';
        render += '<ul class="pagination justify-content-center">';
        render += `<li class="page-item ${page.pageNumber <= 1 ? 'disabled' : ''}"><a class="page-link" href="#" onclick="navigate(1)">|<</a></li>`;
        render += `<li class="page-item ${page.pageNumber - 1 < 1 ? 'disabled' : ''}"><a class="page-link" href="#" onclick="navigate(${page.pageNumber - 1})"><</a></li>`;
        render += `<li class="page-item ${page.pageNumber + 1 > page.totalPages ? 'disabled' : ''}"><a class="page-link" href="#" onclick="navigate(${page.pageNumber + 1})">></a></li>`;
        render += `<li class="page-item ${page.pageNumber >= page.totalPages ? 'disabled' : ''}"><a class="page-link" href="#" onclick="navigate(${page.totalPages})">>|</a></li>`;
        render += '</ul>';
        render += '</nav>';
        render += '</div>';
        render += '</div>';
        render += '</div>';
        render += '</div>';
        render += '</div>';

        return render;
    }

    private static _getTableHeader(column: string, sort: IJESort) {
        return `<th class="text-center" style="cursor: pointer;" onclick="sort('${column}',${sort.column === column ? !sort.ascending : true})">
           ${column}             
           ${sort.column === column ? (sort.ascending ? '<i class="icon-up-open"></i>' : '<i class="icon-down-open"></i>') : ''}
            
        </th>`;
    }

    static renderTable(translations: IJEDataTranslation[], languages: string[], page: IJEPage, sort: IJESort) {
        let render = `
        <table class="table table-borderless">
            <tr>
                <th></th>
                ${this._getTableHeader('KEY', sort)}
        `;

        languages.forEach((language: string) => {
            render += `${this._getTableHeader(language, sort)}`;
        });
        render += '</tr>';

        translations.forEach(t => {
            render += `
                <tr>
                    <td>
                        <button type="button" class="btn" onclick="remove(${t.id})"><i class="error-vscode icon-trash-empty"></i></button>
                    </td>
                    <td>
                        <input id="input-key-${t.id}" class="form-control ${t.valid ? '' : 'is-invalid'}" type="text" placeholder="Key..." value="${t.key}" onfocus="mark(${t.id})" onchange="updateInput(this,${t.id});" />
                        <div id="input-key-${t.id}-feedback" class="invalid-feedback error-vscode">${t.error}</div>
                    </td>
            `;

            languages.forEach((language: string) => {
                render += '<td>';
                render += `<input class="form-control" type="text" placeholder="Translation..." onfocus="mark(${t.id})" onchange="updateInput(this,${t.id},'${language}');" `;
                if (t.languages[language]) {
                    render += `value="${t.languages[language].replace(/\n/g, '\\n')}" `;
                }
                render += '/>';
                render += '</td>';
            });

            render += '</tr>';
        });
        render += '</table>';

        render += this.renderPagination(translations, page);

        return render;
    }

    static renderList(translations: IJEDataTranslation[], selectTranslation: IJEDataTranslation, languages: string[], page: IJEPage, sort: IJESort) {
        let render = '<div class="container-fluid">';
        render += '<div class="row">';
        render += '<div class="col-5">';
        render += '<div style="word-wrap: break-word;" class="list-group">';
        translations.forEach(t => {
            render += `<a href="#" id="select-key-${t.id}" onclick="select(${t.id})" class="btn-vscode-secondary list-group-item list-group-item-action ${selectTranslation && selectTranslation.id == t.id ? 'active' : ''}">${t.key === '' ? '&nbsp;' : t.key}</a>`;
        });
        render += '</div>';
        render += this.renderPagination(translations, page, false);
        render += '</div>';

        render += '<div class="col-7">';

        if (selectTranslation) {
            render += `
                <div class="form-group">
                    <label>Key</label>
                    <div class="row">
                        <div class="col-10">
                            <input id="input-key-${selectTranslation.id}" class="form-control ${selectTranslation.valid ? '' : 'is-invalid'}" type="text" placeholder="Key..." value="${selectTranslation.key}" onchange="updateInput(this,${selectTranslation.id});" />
                            <div id="input-key-${selectTranslation.id}-feedback" class="invalid-feedback error-vscode">${selectTranslation.error}</div>
                        </div>
                 
                        <div class="col-2">
                            <button type="button" class="btn" onclick="remove(${selectTranslation.id})"><i class=" error-vscode icon-trash-empty"></i></button>
                        </div>
                    </div>
                </div>`;
            languages.forEach((language: string) => {
                render += `<label>${language}</label>`;
                render += `<textarea class="form-control mb-2" rows="6" placeholder="Translation..." onchange="updateInput(this,${selectTranslation.id},'${language}');">`;
                if (selectTranslation.languages[language]) {
                    render += selectTranslation.languages[language];
                }
                render += '</textarea>';
            });
        }

        render += '</div>';
        render += '</div>';
        render += '</div>';
        return render;
    }

}