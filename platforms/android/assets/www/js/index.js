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

var uuids = [
  '00000000-0000-0000-0000-000000000000'
];

var destType;
var accelInterval;
var compassInterval;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      app.receivedEvent('deviceready');
      app.doBeacons();
      destType = navigator.camera.DestinationType;

      if(navigator.compass == undefined){
        document.body.classList.add("no-compass")
      }
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
  doBeacons: function(){
    var attempt = 1;
    var target = document.querySelector('#bstatus');
    AttendeaseBeacons.monitor(uuids, function() {
      return setInterval((function() {
        return AttendeaseBeacons.getBeacons(function(beacons) {


          if(beacons.length){
            target.innerText = "Attempt: "+attempt++ +" - Beacons found: "+beacons.length;
          }else{
            target.innerText = "Attempt: "+attempt++ +" - Beacons found: 0";
          }

        });
      }), 3000);
    });
  },
  takePic: function(){
    alert(Camera.DestinationType.DATA_URL);
    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      targetHeight: 100,
      destinationType: Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
      var image = document.querySelector('#camera-section .newpic img');
      image.src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
      alert('Failed because: ' + message);
    }
  },
  accelerate: function(){
    document.querySelector('.accel-deets').style.display = "";
    document.querySelector('.accel-start').style.display = "none";
    var x = document.querySelector('#a-x');
    var y = document.querySelector('#a-y');
    var z = document.querySelector('#a-z');
    var time = document.querySelector('#a-t');

    accelInterval = setInterval(function(){
      navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
    }, 500);

    function onSuccess(acceleration) {
      setData(acceleration.x, acceleration.y, acceleration.z, acceleration.timestamp);
    }

    function onError() {
      setData('error','error','error','error');
    }

    function setData(_x, _y, _z, _t){
      x.innerHTML = _x;
      y.innerHTML = _y;
      z.innerHTML = _z;
      time.innerHTML = _t;
    }
  },
  decelerate: function(){
    document.querySelector('.accel-deets').style.display = "none";
    document.querySelector('.accel-start').style.display = "";
    clearInterval(accelInterval);
  },
  compassOn: function(){
    alert('ON');
    document.querySelector('.comp-deets').style.display = "";
    document.querySelector('.comp-start').style.display = "none";

    compassInterval = setInterval(function(){
      try{
        navigator.compass.getCurrentHeading(compassSuccess, compassError);
      }catch(e){
        app.compassOff();
      }

    }, 500);

    function compassSuccess(heading){
      alert("HERE");
    }

    function compassError(){

    }

    function setData(){

    }
  },
  compassOff: function(){
    document.querySelector('.comp-deets').style.display = "none";
    document.querySelector('.comp-start').style.display = "";
    clearInterval(compassInterval);
  }
};
