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
var ICONSDIRECORY = 'img/icons/';
var ICONS =
        {
            pokeball: ICONSDIRECORY + 'pokeball.svg',
            whistle: ICONSDIRECORY + 'whistle.svg',
            directions: ICONSDIRECORY + 'directions.svg'
        };
var ToolBar = {
    createToolbarObject: function() {
        var toolbar = document.createElement("div");
        toolBarElements = toolbar.toolBarElements = new Array();

        $(toolbar).addClass('gui toolbar');
        toolbar.addToolbarElement = function(tempToolBarElement) {
            $(toolbar).append(tempToolBarElement);

            toolBarElements[toolBarElements.length] = tempToolBarElement;
        };
        toolbar.render = function()
        {
            $(toolBarElements[0]).css('border-left', 'none');

        };
        return toolbar;
    },
    createToolbarElement: function(icon, action) {
        var ElementIcon = document.createElement("div");
        var ElementBackground = document.createElement('div');
        $(ElementBackground).addClass('gui toolbarelement-background')
                .bind('click', action);
        $(ElementIcon).css('background-image', 'url(' + icon + ')')
                .addClass('gui toolbarelement-icon');
        $(ElementBackground).append(ElementIcon);
        return ElementBackground;
    }
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}

var app = {
    INITIALIZEDPAGES: new Array(),
    APPPAGES: APPPAGES =
            {
                NEWS: function() {
                        var name = "news";
                        var page = document.createElement("div");
                        var header = document.createElement('h1');
                        header.textContent = 'News';
                        $(page).addClass(name + " page").append(header);
                        $(page).append(app.MODULES.DEVICEREADY);
                        
                        page.id = guid();
                        $(page).attr('id',page.id);
                        app.INITIALIZEDPAGES[app.INITIALIZEDPAGES.length] = page;
                        return page;
                    },
                EVENTS: 'events'
            },
    MODULES: MODULES =
            {
                DEVICEREADY: MODULE = function() {
                    var module = document.createElement('div');
                    var testListening = document.createElement('p');
                    var testReceived = document.createElement('p');
                    $(module).attr('id','deviceready').addClass('blink');
                    $(testListening).addClass('event listening').text('Connecting to Device');
                    $(testReceived).addClass('event received').text('Device is Ready');
                    $(module).append(testListening).append(testReceived);
                    return module;
                }
            },
    // Application Constructor
    initialize: function() {
//        this.setPageToVisibleActivity(this.APPPAGES.NEWS());
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    setPageToVisibleActivity: function(page)
    {
        $('.app').children('.activepages').append(page);
    },
    destroyPage: function(page)
    {
      $('#' + page.id).remove();
      app.INITIALIZEDPAGES.splice(app.INITIALIZEDPAGES.indexOf(page),1);
    },
    setPageToBackgroundActivity: function(page)
    {
        $('.app').children('.backgroundactivity').append(this.APPPAGES.INITIALPAGE);
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.showLocation();
        var toolbar = ToolBar.createToolbarObject()

        toolbar.addToolbarElement(ToolBar.createToolbarElement(ICONS.whistle, function() {
           app.destroyPage(app.INITIALIZEDPAGES[app.INITIALIZEDPAGES.length -1]);
        }));
        toolbar.addToolbarElement(ToolBar.createToolbarElement(ICONS.directions, function() {
           app.setPageToVisibleActivity(app.APPPAGES.NEWS());
        }));
        toolbar.addToolbarElement(ToolBar.createToolbarElement(ICONS.pokeball, function() {
            alert('poke');
        }));

        $('.header').append(toolbar);
        toolbar.render();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    showLocation: function() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
};
function onSuccess(position) {

    info = 'Latitude: ' + position.coords.latitude + '<br />' +
            'Longitude: ' + position.coords.longitude + '<br />' +
            'Altitude: ' + position.coords.altitude + '<br />' +
            'Accuracy: ' + position.coords.accuracy + '<br />' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
            'Heading: ' + position.coords.heading + '<br />' +
            'Speed: ' + position.coords.speed + '<br />' +
            'Timestamp: ' + position.timestamp + '<br />';
    $(".location").text(info);
}
;

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}
;

