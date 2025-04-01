
function print() {
    const content = document.getElementById("content");
    const printWindow = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

    const head = printWindow.document.getElementsByTagName('head')[0]
    const resumeStyle = document.createElement('link');
    resumeStyle.rel = 'stylesheet';
    resumeStyle.type = 'text/css';
    resumeStyle.href = "resume.css"

    const globalStyle = document.createElement('link');
    globalStyle.rel = 'stylesheet';
    globalStyle.type = 'text/css';
    globalStyle.href = "../common/global.css"

    const printStyle = document.createElement('link');
    printStyle.rel = 'stylesheet';
    printStyle.type = 'text/css';
    printStyle.href = "print.css";

    head.appendChild(printStyle);

    head.appendChild(resumeStyle)
    head.appendChild(globalStyle)

    printWindow.document.getElementsByTagName('body')[0].appendChild(content.cloneNode(true))
    
    printWindow.document.close();
    printWindow.focus();
}