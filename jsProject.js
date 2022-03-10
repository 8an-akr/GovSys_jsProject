let dataBase = [{
        fName: "eitan",
        lastName: "akrish",
        id: "1",
        city: "psagot",
        dateOfBirth: "01/01/1998",
        parentID: "5"
    },
    {
        fName: "racheli",
        lastName: "akrish",
        id: "2",
        city: "psagot",
        dateOfBirth: "10/08/1998",
        parentID: "4"
    },
    {
        fName: "alma",
        lastName: "akrish",
        id: "3",
        city: "psagot",
        dateOfBirth: "14/08/1998",
        parentID: "1"
    },
    {
        fName: "gabbi",
        lastName: "sasson",
        id: "4",
        city: "psagot",
        dateOfBirth: "01/06/2000",
        parentID: "batman"
    },
    {
        fName: "hefzi",
        lastName: "akrish",
        id: "5",
        city: "neve daniel",
        dateOfBirth: "06/05/1945",
        parentID: "batman"
    }, {
        fName: "yonatan",
        lastName: "veis",
        id: "6",
        city: "kfar adumim",
        dateOfBirth: "07/06/1995",
        parentID: "batman"
    }, {
        fName: "yoni",
        lastName: "akrish",
        id: "11",
        city: "neve daniel",
        dateOfBirth: "04/04/2000",
        parentID: "5"
    }, {
        fName: "ahiya",
        lastName: "sasson",
        id: "7",
        city: "psagot",
        dateOfBirth: "07/08/2005",
        parentID: "4"
    }
]

// ***************print*****************
function printPerson(array, place) {
    alert(`
    ${capitalizer(array[place].fName)} ${capitalizer(array[place].lastName)}:
    ID: ${array[place].id}
    City: ${capitalizer(array[place].city)}
    Date of Birth: ${array[place].dateOfBirth}
    Parent ID: ${array[place].parentID}`);
    console.log(`
    ${capitalizer(array[place].fName)} ${capitalizer(array[place].lastName)}:
    ID: ${array[place].id}
    City: ${capitalizer(array[place].city)}
    Date of Birth: ${array[place].dateOfBirth}
    Parent ID: ${array[place].parentID}`);
    let infoBoard = document.getElementById('info-board')
    let msg = document.createElement("span").innerHTML = `
    <span> ${capitalizer(array[place].fName)} ${capitalizer(array[place]. lastName)}</span>
    <span> ID: ${array[place].id}</span>
    <span> City: ${capitalizer(array[place].city)}</span>
    <span> Date of Birth: ${array[place].dateOfBirth}</span>
    <span> Parent ID: ${array[place].parentID}`
    infoBoard.appendChild(msg)
}

function arangePerson(array, place) {
    return `
    ${capitalizer(array[place].fName)} ${capitalizer(array[place].lastName)}:
    ID: ${array[place].id}
    City: ${capitalizer(array[place].city)}
    Date of Birth: ${array[place].dateOfBirth}
    Parent: ${array[place].parentID}\n`;
}

function printArr(array) {
    let msg = '';
    for (let i = 0; i < array.length; i++) {
        msg += arangePerson(array, i);
    }
    alert(`${msg}`)
    console.log(`${msg}`);
    document.getElementById('info-board').innerHTML = `${msg}`
}

function addPersonArr(personObject) {
    dataBase.push(personObject)
}

function alertTryAgain(msg) {
    alert(`Sorry but ${msg}, \nPlease try again`)
}

// ******** Checks*************************

function letterCheck(str) {
    return !/\d/.test(str);
}

function numCheck(str) {
    return /\d/.test(str);
}

function idCheck(idNum) {
    return dataBase.some(obj => obj.id == idNum)
}

function dateCheck(date) {
    if (!/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/.test(date)) {
        return false;
    }
    const parts = date.split('/').map((p) => parseInt(p, 10));
    parts[1] -= 1;
    const d = new Date(parts[2], parts[1], parts[0]);
    return d.getMonth() === parts[1] && d.getDate() === parts[0] && d.getFullYear() === parts[2];
}


function emptyCheck(variable) {
    return variable == ''
}

function search(arr, key, searchKey) {
    return arr.filter(obj => Object.keys(obj).some(keys => obj[key].includes(searchKey)));
}


// *********** input checks**********************
function nameInput(name) {
    if (emptyCheck(name) == false && letterCheck(name)) {
        return name
    } else {
        alertTryAgain('your name was not valid.');
    }
}

function idInput(id) {
    if (idCheck(id) == false && emptyCheck(id) == false && numCheck(id)) {
        return id
    } else {
        alertTryAgain('your ID was not valid.');
    }
}

function parentIdInput(id) {
    if (idCheck(id) == true && numCheck(id)) {;
        return id
    } else if (emptyCheck(id) == true) {
        return 'batman'
    } else {
        alertTryAgain('your parents ID was not valid.');
    }
}

function dateInput(date) {
    if (dateCheck(date)) {
        return date
    } else {
        alertTryAgain('your date was not valid.');
    }
}

function input(vName, inputType, check) {
    let variable;
    do {
        variable = prompt(
            `please enter your ${vName}`, `${inputType}`).toLowerCase();
        // TODO: delete boolean & 
        if (Boolean(check(variable)) == true) {
            return check(variable)
        }
    } while (variable != null);
}

function evenMonthOfBirth(arr, index) {
    let month = arr[index].dateOfBirth.charAt(3) + arr[index].dateOfBirth.charAt(4)
    return Number(month) % 2 == 0
}

function palindromeCheck(fname) {
    let eman = '';
    for (i = fname.length - 1; i >= 0; i--) {
        eman += fname.charAt(i)
    }
    return eman == fname
}

function arrPalindrome(array) {
    if (array) {
        return array.some(obj => palindromeCheck(obj.fName))
    } else { return array }
}


function isFamilyPalindrome(parentObj) {
    return (palindromeCheck(parentObj.fName) || arrPalindrome(findChildren(parentObj.id)))
}

function createPerson(fName, lName, id, city, dateOfBirth, parentId) {
    return {
        fName: fName,
        lastName: lName,
        id: id,
        city: city,
        dateOfBirth: dateOfBirth,
        parentID: parentId
    };
}

function changePersonValue(index) {
    let inp4 = prompt('what would you like to change?\n 1. first Name\n 2. Last fName\n 3. ID\n 4. City\n 5. Parent ID')
    switch (inp4) {
        case '1':
            dataBase[index].fName = input(`name`, `Letters only`, nameInput)
            break;
        case '2':
            dataBase[index].lastName = input(`lastName`, `Letters only`, nameInput)
            break;
        case '3':
            dataBase[index].id = input(`id`, `Numbers only`, idInput)
            break;
        case '4':
            dataBase[index].city = input(`city`, `Letters only`, nameInput)
            break;
        case '5':
            dataBase[index].parentID = input(`parentsID`, '', parentIdInput)
            break;

        default:
            break;
    }
}

function searchForCitys() {
    let citys = []
    for (let i = 0; i < dataBase.length; i++) {
        console.log(dataBase[i].city);
        if (citys.includes(dataBase[i].city)) {
            continue
        } else { citys.push(dataBase[i].city) }
    }
    return citys
}

function byCitys() {
    let citys = searchForCitys()
    let arranged = '';
    for (i = 0; i < citys.length; i++) {
        console.log('city', i);
        arranged += `${capitalizer(citys[i])}:\n`
        for (let j = 0; j < dataBase.length; j++) {
            console.log('in', i);
            if (dataBase[j].city == citys[i]) {
                console.log(`database`, j);
                arranged += `${arangePerson(dataBase,j)}`
            }
        }
        arranged += `\n\n`
    }
    return arranged
}



function searchByName() {
    let inp = prompt('search for name')
    printArr((search(dataBase, 'fName', inp).concat(search(dataBase, `lastName`, inp))))
}

function searchByID() {
    let inp = prompt('search for ID')
    printArr(search(dataBase, 'id', inp))
}

function findByID(id, key) {
    return dataBase.findIndex(obj => Object.keys(obj).some(keys => obj[key] == id));
}

function capitalizer(string) {
    if (string.includes(' ')) {
        console.log(string.split(' '));
        let newNameCap = '';
        let strArr = string.split(' ')
        for (k = 0; k < strArr.length; k++) {
            k == strArr.length - 1 ? newNameCap += ' ' : {}
            newNameCap += capitalizer(strArr[k]);
        }
        return newNameCap
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function ageCalc(dateOfBirth) {
    let from = dateOfBirth.split("/");
    let birthdateTimeStamp = new Date(from[2], from[1] - 1, from[0]);
    let cur = new Date();
    let diff = cur - birthdateTimeStamp;
    return currentAge = Math.floor(diff / 31557600000);
}

function ageReport() {
    let lowAge = prompt('From What age would you like the report?')
    if (numCheck(lowAge) && lowAge > 0 && lowAge < 120) {
        let aboveAge = [];
        for (i = 0; i < dataBase.length; i++) {
            if (ageCalc(dataBase[i].dateOfBirth) > lowAge) {
                aboveAge.push(dataBase[i])
            }
        }
        printArr(aboveAge)
    } else { alert(`${lowAge} has to be in the 0-120 range`) }
}

function findChildren(parentId) {
    let childrenArr = search(dataBase, 'parentID', parentId);
    if (findByID(parentId, 'parentID') != -1) {
        return childrenArr
    } else {
        return false
    }
}



// ***********entire option*************
function addNewPerson() {
    try {
        addPersonArr(createPerson(
            input(`first name`, `Letters only`, nameInput),
            input(`last name`, `Letters only`, nameInput),
            input(`ID`, `Numbers only`, idInput),
            input(`City`, `Letters only`, nameInput),
            input(`Date Of Birth`, `dd/mm/yyyy`, dateInput),
            input(`parents ID`, '', parentIdInput)))
    } catch (error) {
        console.log(`canceled`);
    }
}


function showPerson() {
    let inp2 = prompt(`would you like to show by:\n1. ID\n2. Name`)
    switch (inp2) {
        case '1':
            searchByID()
            break;
        case '2':
            searchByName()
            break;
        default:
            alert('GoodBye')
            break;
    }
}

function editPerson() {
    let specificID = prompt('ID of person you want to edit')
    let idIndex = findByID(specificID, "id")
    console.log(idIndex);
    if (idIndex != -1) {
        changePersonValue(idIndex)
    } else {
        alert('ID not found')
    }
}

function deleteChildren(dataBase, [parentID], idParent) {
    let childrenArr = search(dataBase, "parentID", idParent);
    if (findByID(idParent, "parentID") != -1) {
        alert(`person has children if you delete they will have no parent, better to delete them too...`)
        printArr(childrenArr)
        let inp6 = prompt('Would you like to:\n1. Free the children\n2. Delete them too')
        switch (inp6) {
            case `1`:
                for (i = 0; i < childrenArr.length; i++) {
                    dataBase[findByID(childrenArr[i].id, 'id')].idParent = 'batman'
                }
                dataBase.splice(findByID(idParent, 'id'), 1)
                break;
            case `2`:
                for (i = 0; i < childrenArr.length; i++) {
                    deleteChildren(dataBase, "parentID", childrenArr[i].id)
                    dataBase.splice(findByID(childrenArr[i].id, 'id'), 1)
                }
                dataBase.splice(findByID(idParent, 'id'), 1)
                break;

            default:
                alert('Never Mind..')
                break;
        }
    }
}

function deletePerson() {
    let specificID = prompt('ID of person you want to delete')
    if (findByID(specificID, "id") != -1) {
        deleteChildren(dataBase, "parentID", specificID)
    } else {
        alert('ID not found')
    }
}

function find() {
    let specificID = prompt('ID of person you want to show')
    let idIndex = findByID(specificID, 'id')
    if (idIndex != -1) {
        printPerson(dataBase, idIndex)
    } else {
        alert('ID not found')
    }
}

function showChildren() {
    let parentID = prompt('ID of person you want to show')
    if (findByID(parentID, 'id') != -1) {
        findChildren(parentID) ? printArr(findChildren(parentID)) : alert(`This person has no children..`)
    } else if (parent == null) {} else {
        alert('ID not found')
        showChildren()
    }
}

function evenOrTwo() {
    let evenOrTwoArr = [];
    for (let i = dataBase.length - 1; i > -1; i--) {
        if (evenMonthOfBirth(dataBase, i) || findChildren(dataBase[i].id).length >= 2 || isFamilyPalindrome(dataBase[i])) {
            evenOrTwoArr.push(dataBase[i])
            console.log(i);
        }
    }
    printArr(evenOrTwoArr)
}

function reports() {
    let inp5 = ''
    do {
        inp5 = prompt(`Choose a report:\n1. Show all people\n2. People above the age of..\n3. Show all children by ID\n4. Born on an even month or has at least 2 children and his or their name is a palindrome\n5. By City\n6. Exit Menu`)
        switch (inp5) {
            case '1':
                printArr(dataBase)
                break;
            case '2':
                ageReport()
                break;
            case '3':
                showChildren()
                break;
            case '4':
                evenOrTwo()
                break;
            case '5':
                console.log(byCitys())
                break;
            case null:
                inp5 = 6
                break;
            default:
                alert(`Wrong input..`)
                break;
        }

    } while (inp5 != `6` || inp5 == null);
}




do {
    inp = prompt(`what would you like to do?\n1. Add new person\n2. Erase exisiting person\n3. Edit existing person\n4. Search for people\n5. Search for specific person\n6. Reports\n7. Exit`)
    switch (inp) {
        case `1`:
            addNewPerson()
            break;
        case `2`:
            deletePerson()
            break;
        case `3`:
            editPerson()
            break;
        case `4`:
            showPerson()
            break;
        case `5`:
            find()
            break;
        case `6`:
            reports()
            break;
        case null:
            inp = 7
            break;

        default:
            console.log(dataBase);
            break;
    }
} while (inp != 7);