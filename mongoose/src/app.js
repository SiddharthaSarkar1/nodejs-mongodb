const mongoose = require("mongoose");

const validator = require("validator");

mongoose.connect("mongodb://localhost:27017/siddharthathapatch", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connection Successful....")).catch((err) => console.log(err));

//Defining Schema ==>

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: [2, "Minimum of 2 letters are required!!!!" ],
        maxlength: 30
    },
    ctype: {
        type: String,
        required: true,
        lowercase: true,
        enum: ["frontend", "backend", "database"]
    },
    videos: {
        type: Number,
        validate(value){
            if(value < 0){
                throw new Error("Videos count cann't be negative!!!!");
            }
        }
    },
    author: String,
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is Invalid!!!!");
            }
        }
    },
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})

//Defining Model ==>

const Playlist = new mongoose.model("Playlist", playlistSchema);

//Create document and Insert document ==>

const createDocument = async () => {
    try {
        const jsPlaylist = new Playlist({
            name: "JS",
            ctype: "Back End",
            videos: 4,
            author: "Sidh",
            active: true,
        });

        const expressPlaylist = new Playlist({
            name: "Express JS",
            ctype: "Back End",
            videos: 5,
            author: "Sidh",
            active: true,
        });

        const mongoPlaylist = new Playlist({
            name: "MongoDb",
            ctype: "Database",
            videos: 17,
            author: "Sid",
            active: true,
        });

        const vuePlaylist = new Playlist({
            name: "bhailang js",
            ctype: "frontend",
            videos: 6,
            author: "Sid",
            email: "bukudidi@yahoo.co.in",
            active: true,
        });

        // const result = await Playlist.insertMany([jsPlaylist, expressPlaylist, mongoPlaylist, mongoosePlaylist]);
        const result = await Playlist.insertMany([vuePlaylist]);
        console.log(result);
    } catch (err) {
        console.log(err);
    }

}

createDocument();


const getDocument = async () => {
    try {
        const result = await Playlist
        .find({ author: "Sidh" })
        .select({name: 1})
        .sort({name : 1});
        //.countDocuments();
        console.log(result);
    } catch (err) {
        console.log(err);
    }

}

//getDocument();

//UPDATE the Document ==> 

const updateDocument =  async (_id) => {
    try{

        const result = await Playlist.findByIdAndUpdate({_id},{
            $set: {
                name: "JavaScript Sid"
            }
        },{
            new: true,
            useFindAndModify: true
        });

        console.log(result);

    }catch(err){
        console.log(err);
    }
}

//updateDocument("635ce3737e30337f173335b5");

//DELETE the document ==>

const deleteDocument = async (_id) => {
    try{
        //const result = await Playlist.deleteOne({_id});
        const result = await Playlist.findByIdAndDelete({_id},{
            new: true,
            useFindAndModify: true
        });
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

//deleteDocument("635ce3737e30337f173335b8");



