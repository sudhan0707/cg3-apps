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
    }
});

mongoose.model("Question", QuestionSchema);