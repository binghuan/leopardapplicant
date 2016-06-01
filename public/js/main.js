import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import jQuery from 'jquery';

import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import MenuItem from 'material-ui/MenuItem';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var fillledData = {
    mailto: "",
    applicant: "",
    sender: "",
    department: "",
    email: "",
    wechatid: "",
    description: ""
}

function composeMailContent() {

    console.log(">>> composeMailContent");

    var mailTO = "mailto:" + $("#mailto").val();


    var subject = $("#subject").val();
    if (subject != null && subject.length > 0) {
        var subjectEncodedString = encodeURIComponent(subject);
        mailTO += "?subject=" + subjectEncodedString;
        mailTO += "&body=";
    } else {
        mailTO += "?body=";
    }


    var mailBody =
        "(a)姓名: " + $("#sender").val() + "\n\n" +
        "(b)部門: " + $("#department").val() + "\n\n" +
        "(c)電子信箱地址: " + $("#email").val() + "\n\n" +
        "(d)微信WeChat帳號: " + $("#wechatid").val() + "\n\n" +
        "(d)申請緣由: " + $("#description").val() + "\n\n";

    storeData({
        mailto: $("#mailto").val(),
        applicant: $("#sender").val(),
        subject: $("#subject").val(),
        department: $("#department").val(),
        email: $("#email").val(),
        wechatid: $("#wechatid").val(),
        description: $("#description").val()
    });

    $("#sendmail").attr('href', mailTO + encodeURIComponent(mailBody));
}


class RequestForm extends React.Component {
    getChildContext() {
        return {
            muiTheme: getMuiTheme(baseTheme)
        };
    }

    handleSubmit() {
        console.log("coutput", document.getElementById("name"));
    }

    onChange(e) {
        composeMailContent();
    }

    render() {
        return ( < Card >
            < CardTitle title = "Application"
            subtitle = "Fill the form the send the request" / >

            < CardText >
            < TextField id = "mailto"
            floatingLabelText = "Mail to"
            hintText = "platform@ileopard.com and others"
            onChange = {
                this.onChange
            }
            / > < br / >
            < TextField id = "sender"
            floatingLabelText = "申請人姓名："
            hintText = "Please give me your name"
            onChange = {
                this.onChange
            }
            /> <br/ >
            < TextField id = "subject"
            floatingLabelText = "信件主旨："
            onChange = {
                this.onChange
            }
            /> <br/ >
            < TextField onChange = {
                this.onChange
            }
            id = "department"
            floatingLabelText = "部門：" / > < br / >
            < TextField onChange = {
                this.onChange
            }
            id = "email"
            floatingLabelText = "電子信箱地址：" / > < br / >
            < TextField onChange = {
                this.onChange
            }
            id = "wechatid"
            floatingLabelText = "微信WeChat帳號：" / > < br / >
            < TextField onChange = {
                this.onChange
            }
            id = "description"
            floatingLabelText = "申請緣由：" / > < br / >
            < /CardText> < CardActions > <a id="sendmail" href=""> < FlatButton label = "SEND" / > < /a> < /CardActions > < /Card >
        )
    }
};
RequestForm.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

function retrieveData() {
    return {
        mailto: localStorage.mailto,
        applicant: localStorage.applicant,
        sbuject: localStorage.subject,
        department: localStorage.department,
        email: localStorage.email,
        wechatid: localStorage.wechatid,
        description: localStorage.description
    }
}

function storeData(storeContent) {
    localStorage.mailto = storeContent.mailto;
    localStorage.applicant = storeContent.applicant;
    localStorage.subject = storeContent.subject;
    localStorage.department = storeContent.department;
    localStorage.email = storeContent.email;
    localStorage.wechatid = storeContent.wechatid;
    localStorage.description = storeContent.description;
}

var lastData = retrieveData();
ReactDOM.render( < RequestForm data = {
            lastData
        }
        / > , document.getElementById("app"));
