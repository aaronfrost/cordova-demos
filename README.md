cordova-demos
=============

Just some demos that I put together on Cordova for Android

Includes iBeaconPlugin
----------------------
This includes the iBeaconPlugin, so that you can work with cordova and ibeacon to triangulate position, but I couldn't get it to work. It would return to me an empty array of beacons. It wouldn't find the beacons. So, that is better than an error, but not as good as working. https://github.com/attendease/iBeaconsPlugin

Had Some Troubles
-------------
- From the terminal I had to type "android" to get the SDK manager to open. Then from there I had to install the API Level 19. 
- I had to copy the android-support jar from the v13 directory inside of my SDK into the platforms/android/CodovaLib/libs directory. 
- A few times I had to change dir to the platforms/android directory and run 'ant clean', cause I was getting some weird errors. 
- I had to run the following from the root of the project in the terminal 'android update project -p . -t android-19'. This fixed a lot of the issues I was having. 
