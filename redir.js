const url='https://script.google.com/macros/s/AKfycbwivqaniKlduIKlvvjz75RZv_ZIQ5yMzMyGGn6uKQvDnkwuEGe41GYx0xgi7mwVFvQ/exec'
const makelog= async ()=>{ 
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

