import { DataJson } from "./data.js";

let selectedNavElement = "None"

var sidePanelSelected = "None"

var oldSearch;

var directories

var clearSidePanel = 0;

class directory {

    children = [];

    parent = null;

    name = null;

    constructor (parent, nestingList) {
        if (parent != null){
            this.parent = parent;
        }
        if (nestingList != null) {
            this.name = nestingList[0];
        }
        if (nestingList != null) {
            if (nestingList.length > 0) {
                if (this.getChildByName(this.name) == null) {
                    nestingList.splice(0, 1)
                    this.children.push(new directory(this, nestingList))
                } else {
                    nestingList.splice(0, 1)
                    this.getChildByName(this.name).getChildren.push(new directory(this, nestingList))
                }
            }
        }
    }
        
    getChildren () {
        return this.children;
    }

    getParent () {
        return this.parent;
    }

    getName () {
        return this.name;
    }

    addNesting(nestingList) {
        if (nestingList.length > 0) {
            nestingList.splice(0, 1)
            if (this.getChildByName(nestingList[0]) == null) {
                this.children.push(new directory(this, nestingList))
            } else {
                this.getChildByName(nestingList[0]).addNesting(nestingList)
            }
        }
    }

    getChildByName (name) {
        for (var i in this.children) {
            if (this.children[i].getName() == name){
                return this.children[i];
            }
        }
        return null;
    }

    getLocation() {
        if (this.parent.getName() == null) {
            return this.name;
        } else {
            return (this.parent.getLocation() + ", " + this.name)
        }
    }

    getRoot() {
        if (this.name == null){
            return this
        } else {
            return this.parent.getRoot()
        }
    }
}

var rootDirectory = new directory(null, null);

// Create class structure for the metadata entries in the library
class DataSource {
    constructor(dataName, citation, description, time_period_of_content, spatial_domain, keywords, access_constraints, use_constraints, point_of_contact, browse_graphic,
        data_set_credit, data_set_size_at_reception, data_category, indirect_spatial_reference, direct_spatial_reference, point_and_vector_object_information,
        horizontal_coordinate_system_definition, vertical_coordinate_system_definition, detailed_description, overview_description, data_custodian, resource_description,
        standard_order_process, technical_prerequisites, metadata_date, metadata_standard_name, metadata_standard_version, metadata_time_conversion, available_in_platform,
        external_metadata_reference, test_field
    ) {
        this.dataName = dataName;
        this.citation = citation;
        this.description = description;
        this.time_period_of_content = time_period_of_content;
        this.spatial_domain = spatial_domain;
        this.keywords = keywords;
        this.access_constraints = access_constraints;
        this.use_constraints = use_constraints;
        this.point_of_contact = point_of_contact;
        this.browse_graphic = browse_graphic;
        this.data_set_credit = data_set_credit;
        this.data_set_size_at_reception = data_set_size_at_reception;
        this.data_category = data_category;
        this.indirect_spatial_reference = indirect_spatial_reference;
        this.direct_spatial_reference = direct_spatial_reference;
        this.point_and_vector_object_information = point_and_vector_object_information;
        this.horizontal_coordinate_system_definition = horizontal_coordinate_system_definition;
        this.vertical_coordinate_system_definition = vertical_coordinate_system_definition;
        this.overview_description = overview_description;
        this.data_custodian = data_custodian;
        this.resource_description = resource_description;
        this.standard_order_process = standard_order_process;
        this.technical_prerequisites = technical_prerequisites;
        this.metadata_date = metadata_date;
        this.metadata_standard_name = metadata_standard_name;
        this.metadata_standard_version = metadata_standard_version;
        this.metadata_time_conversion = metadata_time_conversion;
        this.available_in_platform = available_in_platform;
        this.external_metadata_reference = external_metadata_reference;
        this.test_field = test_field;

    }
}

var headerMapping = {
    "citation": "Citation",
    "description": "Description",
    "time_period_of_content": "Time Period of Content",
    "spatial_domain": "Spatial Domain",
    "keywords": "Keywords",
    "access_constraints": "Access Constraints",
    "use_constraints": "Use Constraints",
    "point_of_contact": "Point of Contact",
    "browse_graphic": "Browse Graphic",
    "data_set_credit": "Data Set Credit - Where Credited",
    "data_set_size_at_reception": "Data Set Size at Reception",
    "data_category": "Data Category",
    "indirect_spatial_reference": "Indirect Spatial Reference",
    "direct_spatial_reference": "Direct Spatial Reference",
    "point_and_vector_object_information": "Point and Vector Object Information",
    "horizontal_coordinate_system_definition": "Horizontal Coordinate System Information",
    "vertical_coordinate_system_definition": "Vertical Coordinate System Definition",
    "overview_description": "Overview Description",
    "data_custodian": "Data  Custodian",
    "resource_description": "Resource Description",
    "standard_order_process": "Standard Order Process",
    "technical_prerequisites": "Technical Prerequisites",
    "metadata_date": "Metadata Date",
    "metadata_standard_name": "Metadata Standard Name",
    "metadata_standard_version": "Metadata Standard Version",
    "metadata_time_conversion": "Metadata Time Conversion",
    "available_in_platform": "Available in Platform",
    "external_metadata_reference": "External Metadata Reference",
    "test_field": "Test Field"
}

//Initialise list that will contain DataSource classes
var metadataSources = [];
var categoriesToDraw = [];
var categoriesOpened = [];
var drawFilters = false;

// Read in json data of the metadata library
var jsonData = JSON.parse(DataJson)

// Iterate through the json data and turn them into DataSource classes
for (var i in jsonData) {
    var dataArray = [];
    var title = i;
    var data = jsonData[i];
    dataArray.push(title)
    for (var j in data) {
        var subKey = j;
        var subData = data[j]
        dataArray.push(subData)
    }
    metadataSources.push(new DataSource(
        dataArray[0], 
        dataArray[1],
        dataArray[2],
        dataArray[3],
        dataArray[4],
        dataArray[5],
        dataArray[6],
        dataArray[7],
        dataArray[8],
        dataArray[9],
        dataArray[10],
        dataArray[11],
        dataArray[12],
        dataArray[13],
        dataArray[14],
        dataArray[15],
        dataArray[16],
        dataArray[17],
        dataArray[18],
        dataArray[19],
        dataArray[20],
        dataArray[21],
        dataArray[22],
        dataArray[23],
        dataArray[24],
        dataArray[25],
        dataArray[26],
        dataArray[27],
        dataArray[28],
        dataArray[29],
        dataArray[30],
        dataArray[31]
    )
    )
    for (var j in dataArray[12].split(", ")){
        if (categoriesToDraw.indexOf(dataArray[12].split(", ")[j]) == -1) {
            categoriesToDraw.push(dataArray[12].split(", ")[j])
        }
    }

    let nesting = dataArray[12].split(", ")
    nesting.splice(0,0, "root")
    rootDirectory.addNesting(nesting)
}


// Give an onclick effect to all elements of the navigation panel on the left
var buttons = document.querySelectorAll("div.navEntry");
for (i = 0; i < buttons.length; i++) {
    buttons[i].onclick = navSelector
}


// This function redraws the table on the right containing the metadata
function redrawDataWindow(selectedElement) {
    var drawNode;
    for (var i in metadataSources) {
        if (metadataSources[i].dataName == selectedElement) {
            drawNode = metadataSources[i]
        }
    }
    document.getElementById('display').innerHTML = ''
    document.getElementById('display').innerHTML += '<table class="table-class" id="display-table">';
    document.getElementById('display-table').innerHTML += ` 
                <tr> 
                    <td class="table-light-left-header"> Metadata Attribute </td>
                    <td class="table-light-right-header"> Attribute Value </td>
                </tr>
                `
    var colorTurn = 0;
    for (var i in drawNode) {  
        if (i != "dataName"){
            if (colorTurn == 1){
                document.getElementById('display-table').innerHTML += ` 
                <tr> 
                    <td class="table-light-left">${headerMapping[i]} </td>
                    <td class="table-light-right">${drawNode[i].split("�").join('')} </td>
                </tr>
                `
                colorTurn = 0;
            } else {
                document.getElementById('display-table').innerHTML += ` 
                <tr> 
                    <td class="table-heavy-left">${headerMapping[i]} </td>
                    <td class="table-heavy-right">${drawNode[i].split("�").join('')} </td>
                </tr>
                `
                colorTurn = 1;
            }
        }
        
    }
}

// This function returns the text of whatever element is clicked in the left hand side navigation 
// panel
function navSelector(e) {
    if (e == "None"){
        selectedNavElement = "None";
        displayWelcome(e);
        drawSidePanelWrapper()
    } else if (e.target.innerText == selectedNavElement) {
        selectedNavElement = "None";
        let searchedText = document.getElementById("metadata-search").value
        displayWelcomeNoEscape(e);
        drawSidePanelWrapper()
    } else {
        selectedNavElement = e.target.innerText
        redrawDataWindow(selectedNavElement);
        drawSidePanelWrapper()
    }
}

function headerSelector(e) {
    let oldEle = selectedNavElement
    let text = e.target.parentElement.innerText
    if (text[text.length - 1] == "&#x23F5" || text[text.length - 1] == "&#x23F7") {
        selectedNavElement = text.slice(0, text.length - 2).trim()
    } else {
        selectedNavElement = text.slice(0, text.length - 2).trim()
    }
    if (categoriesOpened.indexOf(selectedNavElement) > -1){
        categoriesOpened.splice(categoriesOpened.indexOf(selectedNavElement), 1)
    } else {
        categoriesOpened.push(selectedNavElement);
    }
    if (categoriesToDraw.includes(selectedNavElement)) {
        selectedNavElement = oldEle
    }
    if (document.getElementById("metadata-search").value == ""){
        drawUnsearchedNavPanel(e)
    } else {
        drawSearched(e)
    }
    
}

// Establish the search box as a variable
const searchField = document.getElementById("metadata-search")


searchField.addEventListener('input', function(e) {
    filterSearch()
})

function drawSearched(e) {
    var searchResults = [];
    var cats = [];
    document.getElementById('Navigator').innerHTML = ''
    for (var key in metadataSources) {
        // Gives index : object pairs
        for (var data in metadataSources[key]) {
            if(metadataSources[key][data].toLowerCase().includes(document.getElementById("metadata-search").value.toLowerCase())) {
                searchResults.push(metadataSources[key])
                break;
            }
        }
    }
    for (var i in searchResults) {
        var catList = searchResults[i].data_category.split(",")
        for (var j in catList){
            if (cats.includes(catList[j].trim()) == 0){
                cats.push(catList[j].trim())
            }
        }
    }
    for (var i in cats){
        if (i == 0) {
            if (categoriesOpened.includes(cats[i])){
                document.getElementById('Navigator').innerHTML += 
                `<div class="unpadded-div"  style="margin-top: 50px;">
                    <button class="nav-entry-button">
                        <div class="navHeader">
                            <p class="inter-nav" id="${cats[i]}"> ${cats[i]} </p>
                            <div class="chevron-div">
                                &#x23F7
                            </div>
                        </div>
                    </button>
                </div>`
            } else {
                document.getElementById('Navigator').innerHTML += 
                `<div class="unpadded-div"  style="margin-top: 50px;">
                    <button class="nav-entry-button">
                        <div class="navHeader">
                            <p class="inter-nav" id="${cats[i]}"> ${cats[i]} </p>
                            <div class="chevron-div">
                                &#x23F5
                            </div>
                        </div>
                    </button>
                </div>`
            }
        } else {
            if (categoriesOpened.includes(cats[i])){
                document.getElementById('Navigator').innerHTML += 
                `<div class="unpadded-div">
                    <button class="nav-entry-button">
                        <div class="navHeader">
                            <p class="inter-nav" id="${cats[i]}"> ${cats[i]} </p>
                            <div class="chevron-div">
                                &#x23F7
                            </div>
                        </div>
                    </button>
                </div>`
            } else {
                document.getElementById('Navigator').innerHTML += 
                `<div class="unpadded-div">
                    <button class="nav-entry-button">
                        <div class="navHeader">
                            <p class="inter-nav" id="${cats[i]}"> ${cats[i]} </p>
                            <div class="chevron-div">
                                &#x23F5
                            </div>
                        </div>
                    </button>
                </div>`
            }
        }
        
            
            if (categoriesOpened.indexOf(cats[i]) != -1) {
                for (var j in searchResults) {
                    if (searchResults[j].data_category.includes(cats[i])) {
                        if (searchResults[j].dataName == selectedNavElement) {
                            document.getElementById('Navigator').innerHTML +=
                            `<div class="unpadded-div">
                                <button class="nav-entry-button">
                                    <div class="navEntrySelected">
                                        <p class="inter-nav-selected" id="${searchResults[j].dataName}"> ${searchResults[j].dataName} </p>
                                    </div>
                                </button>
                            </div>`
                        } else {
                            document.getElementById('Navigator').innerHTML +=
                            `<div class="unpadded-div">
                                <button class="nav-entry-button">
                                    <div class="navEntry">
                                        <p class="inter-nav" id="${searchResults[j].dataName}"> ${searchResults[j].dataName} </p>
                                    </div>
                                </button>
                            </div>`
                        }
                    }
                }
            }
        }
    
        var buttons = document.querySelectorAll("div.navEntry");
    
        for (i = 0; i < buttons.length; i++) {
            buttons[i].onclick = navSelector
        }

        var selected = document.querySelectorAll("div.navEntrySelected");

        for (i = 0; i < selected.length; i++) {
            selected[i].onclick = navSelector
        }
    
        var headers = document.querySelectorAll("div.navHeader");
    
        for (i = 0; i < headers.length; i++) {
            headers[i].onclick = headerSelector
        }
    
}

// Draw the left hand side navigation panel when nothing is searched
function drawUnsearchedNavPanel(e){
    document.getElementById('Navigator').innerHTML = ''
    for (var i in categoriesToDraw){
        if (i == 0){
            if (categoriesOpened.includes(categoriesToDraw[i])){
                document.getElementById('Navigator').innerHTML += 
                `<div class="unpadded-div">
                    <button class="nav-entry-button" style="margin-top: 50px;">
                        <div class="navHeader">
                            <p class="inter-nav" id="${categoriesToDraw[i]}"> ${categoriesToDraw[i]}</p>
                            <div class="chevron-div">
                                &#x23F7
                            </div>
                        </div>
                    </button>
                </div>`
            } else {
                document.getElementById('Navigator').innerHTML += 
                `<div class="unpadded-div">
                    <button class="nav-entry-button"  style="margin-top: 50px;">
                        <div class="navHeader">
                            <p class="inter-nav" id="${categoriesToDraw[i]}"> ${categoriesToDraw[i]}</p>
                            <div class="chevron-div">
                                &#x23F5
                            </div>
                        </div>
                    </button>
                </div>`
            }
        } else {
            if (categoriesOpened.includes(categoriesToDraw[i])){
                document.getElementById('Navigator').innerHTML += 
                `<div class="unpadded-div">
                    <button class="nav-entry-button">
                        <div class="navHeader">
                            <p class="inter-nav" id="${categoriesToDraw[i]}"> ${categoriesToDraw[i]}</p>
                            <div class="chevron-div">
                                &#x23F7
                            </div>
                        </div>
                    </button>
                </div>`
            } else {
                document.getElementById('Navigator').innerHTML += 
                `<div class="unpadded-div">
                    <button class="nav-entry-button">
                        <div class="navHeader">
                            <p class="inter-nav" id="${categoriesToDraw[i]}"> ${categoriesToDraw[i]}</p>
                            <div class="chevron-div">
                                &#x23F5
                            </div>
                        </div>
                    </button>
                </div>`
            }
        }
        
        if (categoriesOpened.indexOf(categoriesToDraw[i]) != -1) {
            for (var j in metadataSources) {
                if (metadataSources[j].data_category.includes(categoriesToDraw[i])) {
                    if (metadataSources[j].dataName == selectedNavElement) {
                        document.getElementById('Navigator').innerHTML +=
                        `<div class="unpadded-div">
                            <button class="nav-entry-button">
                                <div class="navEntrySelected">
                                    <p class="inter-nav-selected" id="${metadataSources[j].dataName}"> ${metadataSources[j].dataName} </p>
                                </div>
                            </button>
                        </div>`
                    } else {
                        document.getElementById('Navigator').innerHTML +=
                        `<div class="unpadded-div">
                            <button class="nav-entry-button">
                                <div class="navEntry">
                                    <p class="inter-nav" id="${metadataSources[j].dataName}"> ${metadataSources[j].dataName} </p>
                                </div>
                            </button>
                        </div>`
                    }
                }
            }
        }
    }

    var buttons = document.querySelectorAll("div.navEntry");

    for (i = 0; i < buttons.length; i++) {
        buttons[i].onclick = navSelector
    }

    var selected = document.querySelectorAll("div.navEntrySelected");

    for (i = 0; i < selected.length; i++) {
        selected[i].onclick = navSelector
    }

    var headers = document.querySelectorAll("div.navHeader");

    for (i = 0; i < headers.length; i++) {
        headers[i].onclick = headerSelector
    }
    var mainHeader = document.querySelectorAll("p.inter-main-header")
    mainHeader[0].onclick = headerReset
}

function headerReset() {
    displayWelcome("None");
}

function calculateDepth(directoryElement) {
    let depth = 0
    if (directoryElement.getName() == null){
        return depth;
    } else {
        depth = depth + 1;
        return 1 + calculateDepth(directoryElement.getParent())
    }
}

function drawSideNavPanel (currentNode) {
    if (currentNode.getName() != null) {
       if (document.getElementById('Navigator').innerHTML == ''){
            document.getElementById('Navigator').innerHTML +=
            `<div class="unpadded-div-1"></div>
            <div class="unpadded-div">
                <button class="nav-entry-button">
                    <div class="navEntry${calculateDepth(currentNode)}First">
                        <p class="inter-nav-${calculateDepth(currentNode)}" id="${currentNode.getLocation()}"> ${currentNode.getName()} </p>
                    </div>
                </button>
            </div>` 
       } else {
            document.getElementById('Navigator').innerHTML +=
            `<div class="unpadded-div">
                <button class="nav-entry-button">
                    <div class="navEntry${calculateDepth(currentNode)}">
                        <p class="inter-nav-${calculateDepth(currentNode)}" id="${currentNode.getLocation()}"> ${currentNode.getName()} </p>
                    </div>
                </button>
            </div>` 
       }
    }
    for (var i in currentNode.getChildren()) {
        drawSideNavPanel(currentNode.getChildren()[i])
    }
    if (currentNode.getParent() == null) {
        return;
    }
    var siblings = currentNode.getParent().getChildren()
    var drawOther = false;
    for (var i in siblings) {
        if (siblings[i].getName() == null){
            drawOther = true
        }
    } 
    if (drawOther == true) {
        if (calculateDepth(currentNode) > 1) {
            document.getElementById('Navigator').innerHTML +=
            `<div class="unpadded-div">
                <button class="nav-entry-button">
                    <div class="navEntry${calculateDepth(currentNode)}">
                        <p class="inter-nav-${calculateDepth(currentNode)}" id="${currentNode.getParent().getLocation()}, Others"> Other </p>
                    </div>
                </button>
            </div>` 
        }
    }
}

function navOnClickHandle(e) {
    if (e.target.parentElement.id != '') {
        selectedNavElement = e.target.parentElement.id
    } else if (e.target.id != '') {
        selectedNavElement = e.target.id
    } else {
        selectedNavElement = e.target.children[0].id
    }
    toggleFilters()
    toggleFilters()

    if (sidePanelSelected == selectedNavElement){
        selectedNavElement = "None"
        imageWidthHandler()
        displayWelcome("None")
        drawSidePanelWrapper()
        document.getElementById(sidePanelSelected).parentElement.style.backgroundColor = "#FFFAE5"
        
        
    } else {
        sidePanelSelected = selectedNavElement
        drawSidePanelWrapper()
        document.getElementById(sidePanelSelected).parentElement.style.backgroundColor = "#fff5cd"
    }

    sidePanelSelected = selectedNavElement

    redrawDataDisplaySelected(selectedNavElement, '')
}

function drawSidePanelWrapper() {
    document.getElementById('Navigator').innerHTML = ''
    drawSideNavPanel(rootDirectory.getRoot())

    var buttons = document.getElementsByClassName("nav-entry-button")
    for (var i in buttons) {
        if (buttons[i] == buttons.length) {
            continue;
        }
        buttons[i].onclick = navOnClickHandle
    }
}

function displaySelectionHandler(e, selectionResults) {
    let select = e;
    if (e.target.hasAttribute('id')){
        select = e.target.id
    } else {
        select = e.target.parentElement.id
    }
    let drawNode = ''
    let overviewColumns = ["dataName", "data_set_credit", "time_period_of_content", 
        "data_category", "keywords", "description", "citation"]
    for (var i in metadataSources) {
        if (metadataSources[i].dataName === select) {
            drawNode = metadataSources[i]
            break;
        }
    }
    
    document.getElementById("display").innerHTML = ''
    document.getElementById('display').innerHTML += `<div class="back-div"><p class="back-text">Back </p></div>`
    document.getElementById('display').innerHTML += `<p class="inter-display-over-table">Overview Metadata </p>`
    document.getElementById('display').innerHTML += '<table class="table-class" id="display-table-overview">';
    document.getElementById('display-table-overview').innerHTML += ` 
                <tr> 
                    <td class="table-light-left-header"> Metadata Attribute </td>
                    <td class="table-light-right-header"> Attribute Value </td>
                </tr>
                `
    var colorTurn = 1;
    for (var i in drawNode) {  
        if (overviewColumns.includes(i)) {
            if (i != "dataName"){
                if (colorTurn == 1){
                    document.getElementById('display-table-overview').innerHTML += ` 
                    <tr> 
                        <td class="table-light-left">${headerMapping[i]} </td>
                        <td class="table-light-right">${drawNode[i].split("�").join('').replace(/(https:\/\/[^\s()]+)(?=[^\w/]*|$)/g, '<a href="$1" target="_blank">$1</a>')} </td>
                    </tr>
                    `
                    colorTurn = 0;
                } else {
                    document.getElementById('display-table-overview').innerHTML += ` 
                    <tr> 
                        <td class="table-heavy-left">${headerMapping[i]} </td>
                        <td class="table-heavy-right">${drawNode[i].split("�").join('').replace(/(https:\/\/[^\s()]+)(?=[^\w/]*|$)/g, '<a href="$1" target="_blank">$1</a>')} </td>
                    </tr>
                    `
                    colorTurn = 1;
                }
            }
        }
    }

    // TODO: This is where you would add an if statement to check if the metadata piece is a report e.g.:
    // if (!drawNode.data_category.includes("report"))     <---- Something like this
    document.getElementById('display').innerHTML += "<br>"
    document.getElementById('display').innerHTML += `<p class="inter-display-over-table">Technical Metadata </p>`
    document.getElementById('display').innerHTML += '<table class="table-class" id="display-table-technical">';
    document.getElementById('display-table-technical').innerHTML += ` 
                <tr> 
                    <td class="table-light-left-header"> Metadata Attribute </td>
                    <td class="table-light-right-header"> Attribute Value </td>
                </tr>
                `
    var colorTurn = 1;
    for (var i in drawNode) { 
        if (!overviewColumns.includes(i)) {
            if (i != "dataName"){
                if (colorTurn == 1){
                    document.getElementById('display-table-technical').innerHTML += ` 
                    <tr> 
                        <td class="table-light-left">${headerMapping[i]} </td>
                        <td class="table-light-right">${drawNode[i].split("�").join('').replace(/(https:\/\/[^\s()]+)(?=[^\w/]*|$)/g, '<a href="$1" target="_blank">$1</a>')} </td>
                    </tr>
                    `
                    colorTurn = 0;
                } else {
                    document.getElementById('display-table-technical').innerHTML += ` 
                    <tr> 
                        <td class="table-heavy-left">${headerMapping[i]} </td>
                        <td class="table-heavy-right">${drawNode[i].split("�").join('').replace(/(https:\/\/[^\s()]+)(?=[^\w/]*|$)/g, '<a href="$1" target="_blank">$1</a>')} </td>
                    </tr>
                    `
                    colorTurn = 1;
                }
            }
        }
    }

    var back = document.getElementsByClassName("back-div")[0]
    back.onclick = function () {
        filterSearch()
    }

    var buttons = document.querySelectorAll("div.navEntry");
    for (i = 0; i < buttons.length; i++) {
        buttons[i].onclick = navSelector
    }

}

function redrawDataDisplaySelected(search, selectionResults) {
    document.getElementById("display").innerHTML = ''
    if (selectionResults == "NO SEARCH RESULTS") {
        document.getElementById('display').innerHTML += '<table class="table-display" id="display-table">';
        document.getElementById('display-table').innerHTML += ` 
            <tr> 
                <td class="table-display-no-results" id="no-results">
                    <p class="inter-source-header"> No Results Found </p>
                </td>
            </tr>
            `
    }

    if (selectionResults.length == 0 || selectionResults == "NO RESULTS"){
        selectionResults = [];
    
        if (search.split(", ")[1] === "Others") {
            for (var i in metadataSources) {
                if (metadataSources[i].data_category === search.split(", ")[0]) {
                    selectionResults.push(metadataSources[i])
                }
            }
        } else {
            for (var i in metadataSources) {
                if (metadataSources[i].data_category.includes(search)) {
                    selectionResults.push(metadataSources[i])
                }
            }
        }
    }
    document.getElementById('display').innerHTML += `<div class="inter-display-over-table" style="padding-bottom: 10px;"> Available Metadata </div>`
    document.getElementById('display').innerHTML += '<table class="table-display" id="display-table">';
    var colorTurn = 0;
    for (var i in selectionResults) { 
        var data_set_cred = ''
        if (selectionResults[i].data_set_credit.includes(";")) {
            data_set_cred = selectionResults[i].data_set_credit.split(";")[0]
        } else {
            data_set_cred = selectionResults[i].data_set_credit
        } 
        if (colorTurn == 1){
            document.getElementById('display-table').innerHTML += ` 
            <tr> 
                <td class="table-display-dark" id="${selectionResults[i].dataName}">
                    <p class="inter-source-header" id="${selectionResults[i].dataName}">${selectionResults[i].dataName} </p>
                    <p class="inter-source-authors">${data_set_cred.split(";")[0]}, ${selectionResults[i].time_period_of_content}</p>
                    <p class="inter-source-description">${selectionResults[i].description.substr(0, 300).split("�").join('')}... </p>
                </td>
            </tr>
            `
            colorTurn = 0;
        } else {
            document.getElementById('display-table').innerHTML += ` 
            <tr> 
                <td class="table-display-light" id="${selectionResults[i].dataName}"> 
                    <p class="inter-source-header" id="${selectionResults[i].dataName}">${selectionResults[i].dataName} </p>
                    <p class="inter-source-authors">${data_set_cred}, ${selectionResults[i].time_period_of_content}</p>
                    <p class="inter-source-description">${selectionResults[i].description.substr(0, 300).split("�").join('')}... </p>
                </td>
            </tr>
            `
            colorTurn = 1;
        }
    }
    if (selectionResults.length == 0) {
        document.getElementById('display').innerHTML += '<table class="table-display" id="display-table">';
        document.getElementById('display-table').innerHTML += ` 
            <tr> 
                <td class="table-display-no-results" id="no-results">
                    <p class="inter-source-header"> No Results Found </p>
                </td>
            </tr>
            `
    }

    var buttons = document.getElementsByClassName("table-display-light")
    for (var i in buttons) {
        if (buttons[i] == buttons.length){
            continue;
        }
        buttons[i].onclick = displaySelectionHandler
    }

    var buttons = document.getElementsByClassName("table-display-dark")
    for (var i in buttons) {
        if (buttons[i] == buttons.length){
            continue;
        }
        buttons[i].onclick = displaySelectionHandler
    }
}

function filterSearch () {
    let searchText = document.getElementById("metadata-search").value.toLowerCase()
    if (drawFilters == true) {
        var results = []
        if (document.getElementById("available-in-platform").value == "yes") {
            for (var i in metadataSources) {
                if (metadataSources[i].available_in_platform == "Yes") {
                    results.push(metadataSources[i]);
                }
            }
        } else if (document.getElementById("available-in-platform").value == "no") {
            for (var i in metadataSources) {
                if (metadataSources[i].available_in_platform == "No") {
                    results.push(metadataSources[i]);
                }
            }
        } else {
            for (var i in metadataSources) {
                results.push(metadataSources[i])
            }
        }

        const categoryEle = document.getElementById('category');
        const categoryVals = Array.from(categoryEle.selectedOptions).map(option => option.value);
        
        const custodianEle = document.getElementById('custodian');
        const custodianVals = Array.from(custodianEle.selectedOptions).map(option => option.value);
        let new_results = []
        if (categoryVals[0] != 'none') {
            for (var i in results) {
                for (var j in categoryVals) {
                    if (results[i].data_category.includes(categoryVals[j])) {
                        new_results.push(results[i])
                    }
                }
            }
            new_results = Array.from(new Set(new_results))
            results = new_results
        }


        new_results = []
        if (custodianVals[0] != 'none') {
            for (var i in results) {
                for (var j in custodianVals) {
                    if (results[i].data_custodian.includes(custodianVals[j])) {
                        new_results.push(results[i])
                    }
                }
            }
            new_results = Array.from(new Set(new_results))
            results = new_results
        }

        new_results = []
        let searchFieldText = document.getElementById("metadata-search").value.toLowerCase()
        if (searchFieldText != ''){
            for (var i in results) {
                for (var j in results[i]) {
                    if (results[i][j].toLowerCase().includes(searchFieldText)) {
                        new_results.push(results[i])
                    }
                }
            }
            new_results = Array.from(new Set(new_results))
            results = new_results
        }
        
        if (results.length == 0){
            redrawDataDisplaySelected('', "NO SEARCH RESULTS")
        } else{
            redrawDataDisplaySelected('', results)
        }
    } else {
        var results = []
        for (var i in metadataSources) {
            for (var j in metadataSources[i]) {
                if (metadataSources[i][j].toLowerCase().includes(searchText.toLowerCase()) > 0) {
                    results.push(metadataSources[i]);
                    break;
                }
            }
        }
        redrawDataDisplaySelected('', results)
        
    }
    sidePanelSelected = "None"
    drawSidePanelWrapper()
}

function toggleFilters () {
    if (drawFilters == false) {
        drawFilters = true
        let ele = document.getElementById("right-column")
        let custodians = []
        let categories = []
        for (var i in metadataSources) {
            custodians.push(metadataSources[i].data_custodian)

            if (metadataSources[i].data_category.includes(", ")){
                let categ = metadataSources[i].data_category.split(", ")
                for (var j in categ) {
                    categories.push(categ[j])
                }
            } else {
                categories.push(metadataSources[i].data_category)
            }
        }
        categories = Array.from(new Set(categories))
        custodians = Array.from(new Set(custodians))
        let catHTML = `<label for="category" class="inter-filter-labels"> Data Category </label>\n`
        catHTML += '<select id="category" name="category" class="dropdown" multiple>\n'
        catHTML += `\t<option value="none" selected>Hold "ctrl" to select multiple</option>\n`
        for (var i in categories){
            catHTML += `\t<option value="${categories[i]}"> ${categories[i]} </option>\n`
        }
        catHTML += `</select>\n`

        let custHTML = `<label for="custodian" class="inter-filter-labels"> Data custodian </label>\n`

        custHTML += '<select id="custodian" name="custodian" class="dropdown" multiple>\n'
        custHTML += `\t<option value="none" selected> Hold "ctrl" to select multiple </option>\n`
        for (var i in custodians){
            custHTML += `\t<option value="${custodians[i]}"> ${custodians[i]} </option>\n`
        }
        custHTML += `</select>\n`
        ele.insertAdjacentHTML("afterbegin", `<div class="search-filters-div" id="filters">
        <div class="div-floated-left">
            <label for="available-in-platform" class="inter-filter-labels"> In Platform </label>
            <select id="available-in-platform" name="platform" class="dropdown">
                <option value="none" selected></option>
                <option value="yes"> Yes </option>
                <option value="no"> No </option>
                <option value="all"> All </option>
            </select>
        </div>
        <div class="div-floated-left"> 
            ${catHTML}
        </div>
        <div class="div-floated-left"> 
            ${custHTML}
        </div>

        </div> `)

        document.getElementById("available-in-platform").addEventListener('change', function(e) {
            filterSearch()
        })

        document.getElementById("custodian").addEventListener('change', function(e) {
            filterSearch()
        })

        document.getElementById("category").addEventListener('change', function(e) {
            filterSearch()
        })
        
    } else {
        drawFilters = false
        document.getElementById("filters").remove()
    }
}

// Function to handle resizing some elements of the page
function imageWidthHandler() {
    drawFilters = false;
    if (document.getElementById("metadata-search") != null) {
        if (document.getElementById("metadata-search").value != null) {
            oldSearch = document.getElementById("metadata-search").value
        } else if (oldSearch != null && document.getElementById("metadata-search").value == null) {
            document.getElementById("metadata-search").value = oldSearch;
        }
    }
    if (window.innerWidth < 800){
        document.getElementById("body").innerHTML = `
        <div class="data-display" id="display">
                <p class="inter-paragraph-white"> 
                Mobile is not currently supported for this platform. Please revisit this platform on a device with a larger screen.
                </p>

                <p class="inter-paragraph-white"> 
                We apologise for the inconvenience.
                </p>
            </div>
        `
    } else {
        document.getElementById("body").innerHTML = `
        <div class="mainHeader">
            <div class="left-float-div">
                <p class="inter-main-header">Moreton Bay Knowledge Library</p>
            </div>
            <div class="right-float-div">
                <img src="images/QUT.png" class="header-image">
                <img src="images/MBF.png" class="header-image">
            </div>
        </div> 
        <div class="left-column">
            <div class="side-nav-wrapper">
                <div class="search-div">
                    <input type="search" id="metadata-search" name="q" class="search-box" placeholder="&#x1F50D Search the Library">
                    <button class="filters-button"> Filters </button>
                </div>
                <nav class="sideNav" id="Navigator">
                
                </nav>
            </div>
        </div>
        <div class="right-column" id="right-column">
            <div class="data-display" id="display">
                <p class="inter-intro-header"> Welcome to the Moreton Bay Knowledge Library</p>
                <p class="inter-paragraph-white"> 
                This page is your gateway to finding a wide range of information about Moreton Bay. It brings together links to knowledge records (e.g.maps, data, reports, research) from different organisations that study and care for the Bay—we don't host the information ourselves, but we help you find where it lives.
                </p>
                <p class="inter-paragraph-white">
                On the left-hand side of your screen, you’ll see a list of categories where you can explore a range of topics. Clicking a caregory will display the current list of knowledge records. 
                </p>
                <p class="inter-paragraph-white">
                You can also search the entire library using the search box at the top left of the page. This search checks all records for the words you type in. Sometimes, using broader or simpler terms (for example, typing “Moreton Bay” instead of “Peel Island”) can help you get better results.
                </p>
                <p class="inter-paragraph-white">
                Or, click the filters button near the search in the top left for a detailed search by data custodian, data category or platform availability.
                </p>                
                <a href="https://moretonbayfoundation.org/" target="_blank" style="text-decoration:none;"><div id="submit-data" class="contact-box">  <p style="margin-top: 5px; text-align: center;">Have we missed something? Want to get in touch? Click here.</p> </div></a>
            </div>

            
        </div>
        `

        // TODO CHANGE LINK ~ 5 lines above this to the google form link 
        if (oldSearch != null) {
            document.getElementById("metadata-search").value = oldSearch
        }
        if (document.getElementById("metadata-search").value == null){
            filterSearch()
        }
        

        var searchF = document.getElementById("metadata-search")

        searchF.addEventListener('input', function(e) {
            filterSearch()
        })

        var filtersButton = document.getElementsByClassName("filters-button")
        filtersButton[0].onclick = toggleFilters

        var mainHeader = document.querySelectorAll("p.inter-main-header")
        mainHeader[0].onclick = headerReset

        drawSidePanelWrapper();
    }
}

imageWidthHandler()

function displayWelcome(e) {
    if (e.key == "Escape" || e == "None") {
        imageWidthHandler()
        var mainHeader = document.querySelectorAll("p.inter-main-header")
        mainHeader[0].onclick = headerReset
        sidePanelSelected = "None"
        drawSidePanelWrapper();

        var searchF = document.getElementById("metadata-search")

        searchF.addEventListener('input', function(e) {
            filterSearch()
        })
    }
}

function displayWelcomeNoEscape(e) {
    imageWidthHandler()
    document.getElementById("body").innerHTML = `
    <div class="mainHeader">
        <div class="left-float-div">
            <p class="inter-main-header">Moreton Bay Knowledge Library</p>
        </div>
        <div class="right-float-div">
            <img src="images/QUT.png" class="header-image">
            <img src="images/MBF.png" class="header-image">
        </div>
    </div> 
    <div class="left-column">
        <div class="search-div">
            <input type="search" id="metadata-search" name="q" class="search-box" placeholder="&#x1F50D Search the Library">
            <button class="filters-button"> Filters </button>
        </div>
        <nav class="sideNav" id="Navigator">
        
        </nav>
    </div>
    <div class="right-column" id="right-column">
        <div class="data-display" id="display">
            <p class="inter-intro-header"> Welcome to the Moreton Bay Knowledge Metadata Library</p>
            <p class="inter-paragraph-white"> 
            This page serves a metadata library for data pertaining to different aspects of the Moreton Bay region. 
            The metadata featured in this library stretch over several categories as you can see in the navigation panel on the left hand side of the screen.
            As you click on the dark blue buttons on the left, the metadata included in that category will appear as a drop down selection.
            </p>
            <p class="inter-paragraph-white">
            You can also through all metadata in the library by using the search box located in the top left of this page - just above the left hand side navigation panel.
            This search function examines every entry of each metadata entry for whatever text that is typed into the search entry. Due to the nature of keywords,
            and spatial references in the data searching may not not yield the data you are looking for after the first search. You may need to alter your search slightly i.e 
            changing from "Peel Island" to "Moreton Bay" will yield significantly more results.
            </p>
            <p class="inter-paragraph-white">
            This information can be viewed at any time by hitting "Esc" on your keyboard.
            </p>
            
        </div>
    </div>
    `
    drawSidePanelWrapper();

    var mainHeader = document.querySelectorAll("p.inter-main-header")
    mainHeader[0].onclick = headerReset

    var searchF = document.getElementById("metadata-search")

    searchF.addEventListener('input', function(e) {
        filterSearch()
    })
}


document.addEventListener('keydown', function(e){
    displayWelcome(e)
})

window.addEventListener("resize", imageWidthHandler)


const params = new URLSearchParams(window.location.search);
const q = params.get("search");
document.getElementById("metadata-search").value = q;
if (q != null) {
    drawSearched()
}

drawSidePanelWrapper()

var mainHeader = document.querySelectorAll("p.inter-main-header")
mainHeader[0].onclick = headerReset


var searchF = document.getElementById("metadata-search")

searchF.addEventListener('input', function(e) {
    filterSearch()

})
