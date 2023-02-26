module.exports = {
    HTML:(title,description)=>
        `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        <body>
            <h1>${title}</h1>
            ${description}
        </body>
        </html>`
    ,
    List:(filelist)=>{
        var list = '<ul>';
        var i=0;
        while(i<filelist.length){
            list=list+`<li><a href="/app/${filelist[i]}">${filelist[i]}</a></li>`;
            i++;
        }
        list=list+'</ul>';
        return list;
    }
    
}