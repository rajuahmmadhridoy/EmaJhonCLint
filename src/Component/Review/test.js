// let obj = {
//     name: 'Raju',
//     email: 'raju@gmail.com'
// }

// let objArray = Object.keys(obj)

// objArray.map(hi => {
//     console.log(hi)
//     console.log(obj[hi])
// })

// console.log(objArray)

// console.log(obj.email)

let name;

name = 'raju'
function init () {

    function print() {
        let clousure = {
            name: name
        }
        console.log(clousure.name);
        console.log(name)
    }

    print()
}



init();