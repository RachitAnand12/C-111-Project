prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350, 
    height: 300, 
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '">';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/4hKWDsKLj/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model has Loaded!");
}

function speak() {
    synth = window.speechSynthesis;
    speakData_1 = "The first prediction is " + prediction_1;
    speakData_2 = "And the second prediction is" + prediction_2;
    utter = new SpeechSynthesisUtterance (speakData_1 + speakData_2);
    synth.speak(utter);
}

function identify_image() {
    image = document.getElementById("captured_image");
    classifier.classify(image, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }

    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
    }
    
}