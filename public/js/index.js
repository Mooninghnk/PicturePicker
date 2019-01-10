const input = document.querySelector('#files');
input.addEventListener('change', onFile);

function onFile(evt) {
    let output = [];

    console.log(evt);

    let file = evt.target.files[0];
    console.log(file);

    let reader = new FileReader();
    //reader.readAsText(file);
    let chunkSize = 10000;
    let start = 0;
    let progress = 0;
    let percent = 12.5;
    let binary = false;

    function nextChunk() {
        if (start > file.size) {
            return "end"
        }
        let end = chunkSize + start;
        if (end > file.size) end = file.size;
        console.log(start, end, file.size);
        let blob = file.slice(start, end);

        //setTimeout(() => {

        if (file.type == 'image/jpeg') binary = true

        if (binary) reader.readAsBinaryString(blob)
        else reader.readAsText(blob);

        //}
        //, 10 * start)

        start += chunkSize;
        progress += percent;
        document.querySelector('#progress span').style.width = progress + '%'

    }
    nextChunk();
    // setTimeout(() => {reader.readAsText(file)}, 1000);

    reader.onload = ((theFile) => {
        console.log(theFile.srcElement.result);
        let body = JSON.stringify({
            chunk: theFile.srcElement.result,
            filename: file.name,
            type: file.type,
            binary 
        })
        fetch('./api/upload', {
                method: "POST",
                body
            })
            .then(function (res) {
                return res.text();
            })
            .then(function (data) {
                if (data == 'ok') {
                    nextChunk();
                }
                console.log(data)

            })
    });
}