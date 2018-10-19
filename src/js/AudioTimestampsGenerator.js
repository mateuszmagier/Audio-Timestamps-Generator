import { AudioFileModel } from './AudioFileModel';

/*
    filesInputSelector: iCSS selector of audio files input
*/
export class AudioTimestampsGenerator {

    constructor(filesInputSelector) {
        this.input = document.querySelector(filesInputSelector); // input element used to attach audio files
        this.obtainedDurations = 0; // number of known durations of audio files
        this.attachedFilesNumber = 0; // number of files attached by user
        this.models = []; // array of AudioFileModel objects
        this.views = []; // array of AudioFileView objects

        if (this.input === null) {
            console.log("Nieprawidłowy selektor");
        }

        this.handleFilesUpload(); // register change event for files input
    }

    // read files attached by user and create AudioFileModel objects for each of them
    handleFilesUpload() {
        this.input.addEventListener("change", e => {
            var files = e.target.files; // File objects collection (files attached by user)
            var model; // AudioFileModel object
            this.attachedFilesNumber = files.length;

        [].forEach.call(files, file => { // create model object for each attached file
                model = new AudioFileModel(file, this);
                this.models.push(model); // add model object to collection
            });
        });
    }

    // method called by AudioFileModel objects when audio's duration is obtained
    incrementObtainedDurations() {
        this.obtainedDurations++;
        console.log(this.obtainedDurations);
        if (this.obtainedDurations === this.attachedFilesNumber) // check if model objects are ready to generate timestamps
            console.log("Załadowano wszystkie.");
    }
}