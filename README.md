cordova-demos
=============

Just some demos that I put together on Cordova for Android

Had Some Troubles
-------------
- From the terminal I had to type "android" to get the SDK manager to open. Then from there I had to install the API Level 19. 
- I had to copy the android-support jar from the v13 directory inside of my SDK into the platforms/android/CodovaLib/libs directory. 
- A few times I had to change dir to the platforms/android directory and run 'ant clean', cause I was getting some weird errors. 
- I had to run the following from the root of the project in the terminal 'android update project -p . -t android-19'. This fixed a lot of the issues I was having. 
