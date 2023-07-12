
const url='https://script.google.com/macros/s/AKfycbx0LeEMDEP2VqJFtFmAWqjKc3cbEtNlgoyr1Dtk2qlmsMIvQ4slKAEFOpV11Gh5Nvdj/exec'
const makelog=async ()=>{ 
   fetch(url+location.search,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            
            },
        }
    )
    .then((res) => res.json())
}
makelog();

window.onload=function (){
    let encodedurl=location.search.split('up=')[1].split('&')[0];
    let newurl=atob(decodeURI(encodedurl));
    window.setTimeout(`window.open("${newurl}","_top",{})`,750) 
}
