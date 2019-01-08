const input = document.querySelector('#files');
input.addEventListener('change', onFile);
function onFile(evt) {
    let output = [];

    console.log(evt);

    let file = evt.target.files[0];

    let reader = new FileReader();
    //reader.readAsText(file);
    let chunkSize = 10;
    for(let start = 0; start < file.size; start += chunkSize) {
        let end = chunkSize + start;
        if (end > file.size) end = file.size;
        console.log(start, end, file.size);
        let blob = file.slice(start, end);
        setTimeout(() => {
            reader.readAsText(blob)}, 10 * start)
    }

    // setTimeout(() => {reader.readAsText(file)}, 1000);

    reader.onload = ((theFile) => {
        console.log(theFile.srcElement.result);
        fetch('./api/upload', {
            method: "POST",
            body: theFile.srcElement.result
        })
        .then(function(res){ return res.text(); })
        .then(function(data){ alert( data ) })
    });
}
