// push history urls/titles into array(?)
// print array into bullet format
// download file

import { searchChromeHistory } from './history'

searchChromeHistory()

const doExportToDisk = () => {
    let savedFileEntry

    if (savedFileEntry) {
        exportToFileEntry(savedFileEntry)
    } else {
        chrome.fileSystem.chooseEntry({
            type: 'saveFile',
            suggestedName: 'list.txt',
            accepts: [{
                description: 'Text files (*.txt)',
                extensions: ['txt']
            }],
            acceptsAllTypes: true
        }, exportToFileEntry)
    }
}

function exportToFileEntry(fileEntry) {
    savedFileEntry = fileEntry
    const status = document.getElementById('status')

    // Use this to get a file path appropriate for displaying
    chrome.fileSystem.getDisplayPath(fileEntry, path => {
        fileDisplayPath = path
        status.innerText = 'Exporting to ' + path
    })

    getTodosAsText(contents => {
        fileEntry.createWriter(fileWriter => {
            let truncated = false
            const blob = new Blob([contents])

            fileWriter.onwriteend = e => {
                if (!truncated) {
                    truncated = true;
                    // You need to explicitly set the file size to truncate
                    // any content that might have been there before
                    this.truncate(blob.size)
                    return
                }
                status.innerText = 'Export to ' + fileDisplayPath + ' completed'
            }

            fileWriter.onerror = e => {
                status.innerText = 'Export failed: ' + e.toString()
            }

            fileWriter.write(blob)
        })
    })
}