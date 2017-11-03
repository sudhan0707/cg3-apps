/**
 * Created by Owner on 10/31/17.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
   topic:{
       type: String,
       default:''
   },
    subject: {
       type: String,
        default: ''
    },
    answer:{
       type: String,
        default: ''
    },
    rank:{
       type:Number,
        default:0
    }

});

mongoose.model("Question", QuestionSchema);