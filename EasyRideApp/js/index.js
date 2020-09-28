/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */



    app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;', "width:1000", "height:1000");
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

    
};

app.initialize();



// ## Extend SnapSVG
//snap SVG methodes to show and hide objects
Snap.plugin(function (Snap, Element) {
    // displays the element
    Element.prototype.show = function () {
        this.attr('display', '');
    };

    // hides the element
    Element.prototype.hide = function () {
        this.attr('display', 'none');
    };

    // get the visibility of an element
    Element.prototype.isVisible = function () {
        if (this.attr('display') === 'none') {
            return false;
        } else {
            return true;
        };
    };
});


var TimothyClicked = false;
var WhistlerClicked = false;
var REDClicked = false;
var ShamesClicked = false;
var PowderClicked = false;


//save screen ids
var screenID = {
    startScreen: "#Start",
    mapScreen : "#Map",
    detailScreen : "#Details",
    //screen1 : "#Screen1",
}

//save elemnt ids
var anElementID = {
    panelUnten : "#WholePanelBottom",
    //MapFonts
    mountTimothyFont : "#TimothyFont",
    shamesMountainFont : "#ShamesFont",
    whistlerMountainFont:"#WhistlerFont",
    redMountainFont :"#REDFont",
    powderKingFont:"#PowderFont",

    //HeadlineFonts
    mountTimothyHeadline : "#TimothyHeadline",
    shamesMountainHeadline : "#ShamesHeadline",
    whistlerMountainHeadline : "#WhistlerHeadline",
    redMountainHeadline : "#REDHeadline",
    powderKingHeadline : "#PowderHeadline",

    //Images
    image1Big : "#Image1_x5F_map_x5F_big",
    image2Big : "#Image2_x5F_map_x5F_big",
    image3Big : "#Image3_x5F_map_x5F_big",

    image1BigDetails : "#Image1_x5F_details_x5F_big",
    image2BigDetails : "#Image2_x5F_details_x5F_big",
    image3BigDetails : "#Image3_x5F_details_x5F_big",
    image4BigDetails : "#Image4_x5F_details_x5F_big",
    image5BigDetails : "#Image5_x5F_details_x5F_big",
    image6BigDetails : "#Image6_x5F_details_x5F_big",

    
    bigImageBG : "#BGBlur",
    bigImageBGDetails : "#BGBlur_x5F_details",

    //Bottom panel in map screen
    bottomPanel : "#WholePanelBottom",

    exitButton : "#ExitButton",
    exitButtonDetails : "#ExitButton_x5F_details"
}

//load svg image from file
function loadSVGImage(doAfterImageLoaded) {
    //selet div area
    $("#svgArea")
    //load svg image vis AJAX
    // .load lÃ¤dt daten mit ajax nach
    .load("img/MountainApp_12-06-19_v3.svg", doAfterImageLoaded);
}

//performe some actions after image is loadedant
function imageWasLoaded(){
    //disable all screens
    
    hideAllHeadlineFonts();
    hideAllScreens();
    hideAllMapFonts();
    hideAllBigImages();
    hideAllUnnecessary();
   

    //show main screen
    showElementOrScreen(screenID.startScreen);

    //ad some click function to switch screens
    //select click are for screen1
    //id is layer of button

    //make back button (with dblclik atm)
    $("#Details")
    //ad click funtion 
    .dblclick(function (){
        hideAllScreens();
        showElementOrScreen(screenID.mapScreen);
        showElementOrScreen(anElementID.bottomPanel);
    })

    $("#Map")
    //ad click funtion 
    .dblclick(function (){
        hideAllScreens();
        showElementOrScreen(screenID.startScreen);
        showElementOrScreen(anElementID.bottomPanel);
    })

    //click to start in startscreen
    $("#Start")
    //ad click funtion
    .css('cursor', 'pointer')
    .click(function (){
        //hide
        hideAllScreens();
        //show
        showElementOrScreen(screenID.mapScreen);
    })

    //dragable map
    Draggable.create("#WholeMap", {
        type: "x,y",
        edgeResistance: 0.65,
        bounds:"#MapBorderBig",
        throwProps: true,
        onDragEnd: function(){
            console.log("dragging finished");
            // functions when dragging is finished
        }
    });

    //image scrolling
    Draggable.create("#ImagesDetails", {
        type: "y",
        edgeResistance: 0.65,
        bounds:"#ImagesDetailsBorder",
        throwProps: true,
        onDragEnd: function(){
            console.log("dragging finished");
            // functions when dragging is finished
        }
    });

    //detailbutton function
    $("#DETAILBUTTON")
    //ad click funtion
    .css('cursor', 'pointer')
    .click(function (){
        
        //hide
        hideAllScreens();
        //show
        showElementOrScreen(screenID.detailScreen);

        if (TimothyClicked == true) {
            hideAllHeadlineFonts();
            showElementOrScreen(anElementID.mountTimothyHeadline);
            console.log("Show Timothy Headline");
            TimothyClicked = false;
        }

        if (ShamesClicked == true) {
            hideAllHeadlineFonts();
            showElementOrScreen(anElementID.shamesMountainHeadline);
            ShamesClicked = false;
        }

        if (WhistlerClicked == true) {
            hideAllHeadlineFonts();
            showElementOrScreen(anElementID.whistlerMountainHeadline);
            WhistlerClicked = false;
        }

        if (REDClicked == true) {
            hideAllHeadlineFonts();
            showElementOrScreen(anElementID.redMountainHeadline);
            REDClicked = false;
        }

        if (PowderClicked == true) {
            console.log("powderClicked is "+PowderClicked);
            hideAllHeadlineFonts();
            showElementOrScreen(anElementID.powderKingHeadline);
            PowderClicked = false;
        }


    })

    $("#WhistlerPin")
    //ad click funtion
    .css('cursor', 'pointer')
    .click(function (){
        WhistlerClicked = true;
        //hide
        hideAllMapFonts();
        //show
        showElementOrScreen(anElementID.whistlerMountainFont);
        showElementOrScreen(anElementID.panelUnten);
    })

    $("#TimothyPin")
    //ad click funtion
    .css('cursor', 'pointer')
    .click(function (){
        TimothyClicked = true;
        console.log("TimothyClicked is "+TimothyClicked);
        //hide
        hideAllMapFonts();
        //show
        showElementOrScreen(anElementID.mountTimothyFont);
        showElementOrScreen(anElementID.panelUnten);
    })

    $("#ShamesPin")
    //ad click funtion
    .css('cursor', 'pointer')
    .click(function (){
        ShamesClicked = true;
        //hide
        hideAllMapFonts();
        //show
        showElementOrScreen(anElementID.shamesMountainFont);
        showElementOrScreen(anElementID.panelUnten);
    })

    $("#PowderPin")
    //ad click funtion
    .css('cursor', 'pointer')
    .click(function (){
        
        PowderClicked=true;
        console.log("PowderClick is "+PowderClicked);
        //hide
        hideAllMapFonts();
        //show
        showElementOrScreen(anElementID.powderKingFont);
        showElementOrScreen(anElementID.panelUnten);
    })

    $("#REDPin")
    //ad click funtion
    .css('cursor', 'pointer')
    .click(function (){
        REDClicked = true;
        //hide
        hideAllMapFonts();
        //show
        showElementOrScreen(anElementID.redMountainFont);
        showElementOrScreen(anElementID.panelUnten);
    })

    //functions for images on mapscreen
    $("#Image1_x5F_map")
    .css('cursor', 'pointer')
    .click(function(){
        hideAllBigImages();
        showElementOrScreen(anElementID.bigImageBG);
        showElementOrScreen(anElementID.image1Big);
        showElementOrScreen(anElementID.exitButton);
    })

    $("#Image2_x5F_map")
    .css('cursor', 'pointer')
    .click(function(){
        hideAllBigImages();
        showElementOrScreen(anElementID.bigImageBG);
        showElementOrScreen(anElementID.image1Big);
        showElementOrScreen(anElementID.exitButton);
    })

    $("#Image3_x5F_map")
    .css('cursor', 'pointer')
    .click(function(){
        hideAllBigImages();
        showElementOrScreen(anElementID.bigImageBG);
        showElementOrScreen(anElementID.image1Big);
        showElementOrScreen(anElementID.exitButton);
    })


    //exit big image mode when clicking on the bg
    $("#BGBlur")
    //.css('cursor', 'pointer')
    .click(function(){
        hideAllBigImages(); 
        hideAllUnnecessary();
    })

    $("#BGBlur_x5F_details")
    //.css('cursor', 'pointer')
    .click(function(){
        hideAllBigImages(); 
        hideAllUnnecessary();
    })

    //make the exit button work
    $("#ExitButton")
    //ad click funtion
    .css('cursor', 'pointer')
    .click(function (){
        //show
        hideAllUnnecessary();
        hideAllBigImages();
    })

    $("#ExitButton_x5F_details")
    //ad click funtion
    .css('cursor', 'pointer')
    .click(function (){
        //show
        hideAllUnnecessary();
        hideAllBigImages();
    })
    
    //functions for images on detailscreen
    $("#Image1_x5F_details")
    .css('cursor', 'pointer')
    .click(function(){
        hideAllBigImages();
        showElementOrScreen(anElementID.bigImageBGDetails);
        showElementOrScreen(anElementID.image1BigDetails);
        showElementOrScreen(anElementID.exitButtonDetails);
    })

    $("#Image2_x5F_details")
    .css('cursor', 'pointer')
    .click(function(){
        hideAllBigImages();
        showElementOrScreen(anElementID.bigImageBGDetails);
        showElementOrScreen(anElementID.image2BigDetails);
        showElementOrScreen(anElementID.exitButtonDetails);
    })

    $("#Image3_x5F_details")
    .css('cursor', 'pointer')
    .click(function(){
        hideAllBigImages();
        showElementOrScreen(anElementID.bigImageBGDetails);
        showElementOrScreen(anElementID.image3BigDetails);
        showElementOrScreen(anElementID.exitButtonDetails);
    })

    $("#Image4_x5F_details")
    .css('cursor', 'pointer')
    .click(function(){
        hideAllBigImages();
        showElementOrScreen(anElementID.bigImageBGDetails);
        showElementOrScreen(anElementID.image4BigDetails);
        showElementOrScreen(anElementID.exitButtonDetails);
    })

    $("#Image5_x5F_details")
    .css('cursor', 'pointer')
    .click(function(){
        hideAllBigImages();
        showElementOrScreen(anElementID.bigImageBGDetails);
        showElementOrScreen(anElementID.image5BigDetails);
        showElementOrScreen(anElementID.exitButtonDetails);
    })

    $("#Image6_x5F_details")
    .css('cursor', 'pointer')
    .click(function(){
        hideAllBigImages();
        showElementOrScreen(anElementID.bigImageBGDetails);
        showElementOrScreen(anElementID.image6BigDetails);
        showElementOrScreen(anElementID.exitButtonDetails);
    })



    //close bottom panel when clicking on map etc.
    $("#MapHitbox")
    .click(function(){
        hideElementOrScreen(anElementID.bottomPanel);
        console.log("clickedMap");
    })

    $("#CanadaUSAMap")
    .click(function(){
        hideElementOrScreen(anElementID.bottomPanel);
        console.log("clickedMap");
    })


    
    



    
    
}

//show an elemnt or screen
function showElementOrScreen(elementID) {
    //select the element with snap
    var snapElement = Snap.select(elementID);
    //show the snap element
    snapElement.show();
}

//hide an elemnt or screen
function hideElementOrScreen(elementID) {
    //select the element with snap
    var snapElement = Snap.select(elementID);
    //hide the snap element
    snapElement.hide();
}

//hide all screens
function hideAllScreens() {
    //hide main screen
    hideElementOrScreen(screenID.mapScreen);
    //hide mapScreen
    hideElementOrScreen(screenID.detailScreen);

    hideElementOrScreen(screenID.startScreen);

    hideElementOrScreen(anElementID.panelUnten);
}

function hideAllMapFonts() {
    hideElementOrScreen(anElementID.mountTimothyFont);
    hideElementOrScreen(anElementID.whistlerMountainFont);
    hideElementOrScreen(anElementID.shamesMountainFont);
    hideElementOrScreen(anElementID.powderKingFont);
    hideElementOrScreen(anElementID.redMountainFont);
}

function hideAllHeadlineFonts() {
    hideElementOrScreen(anElementID.mountTimothyHeadline);
    hideElementOrScreen(anElementID.shamesMountainHeadline);
    hideElementOrScreen(anElementID.whistlerMountainHeadline);
    hideElementOrScreen(anElementID.powderKingHeadline);
    hideElementOrScreen(anElementID.redMountainHeadline);
}

function hideAllBigImages() {
    hideElementOrScreen(anElementID.image1Big);
    hideElementOrScreen(anElementID.image2Big);
    hideElementOrScreen(anElementID.image3Big);

    hideElementOrScreen(anElementID.image1BigDetails);
    hideElementOrScreen(anElementID.image2BigDetails);
    hideElementOrScreen(anElementID.image3BigDetails);
    hideElementOrScreen(anElementID.image4BigDetails);
    hideElementOrScreen(anElementID.image5BigDetails);
    hideElementOrScreen(anElementID.image6BigDetails);
}

function hideAllUnnecessary(){
    hideElementOrScreen(anElementID.exitButton);
    hideElementOrScreen(anElementID.bigImageBG);

    hideElementOrScreen(anElementID.exitButtonDetails);
    hideElementOrScreen(anElementID.bigImageBGDetails);
  
    
}
//check if doc is ready
$(document).ready(function(){
    //document ready
    console.log("the document is loaded");
    //load the svg image vis AJAX
    //perform actions in imageWasLoaded  afterwards
    loadSVGImage(imageWasLoaded);
    // SCURR: do not perform any actions here
    // do everything in imageWasLoaded
    
    
})