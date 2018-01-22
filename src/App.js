import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import jQuery from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hrefContent: ""
    }
  }

  composeMailContent() {

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

    this.storeData({
      mailto: $("#mailto").val(),
      applicant: $("#sender").val(),
      subject: $("#subject").val(),
      department: $("#department").val(),
      email: $("#email").val(),
      wechatid: $("#wechatid").val(),
      description: $("#description").val()
    });

    //$("#sendmail").attr('href', );
    let body = mailTO + encodeURIComponent(mailBody);
    console.log(body);
    this.setState({
      hrefContent: body
    });
  }

  retrieveData() {
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

  storeData(storeContent) {
    localStorage.mailto = storeContent.mailto;
    localStorage.applicant = storeContent.applicant;
    localStorage.subject = storeContent.subject;
    localStorage.department = storeContent.department;
    localStorage.email = storeContent.email;
    localStorage.wechatid = storeContent.wechatid;
    localStorage.description = storeContent.description;
  }

  onTextChanged() {
    this.composeMailContent();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          < Card >
            < CardTitle title="Application"
              subtitle="Fill the form to send the request" />

            < CardText >
              < TextField id="mailto"
                floatingLabelText="Mail to"
                hintText="platform@ileopard.com and others"
                onChange={
                  this.onTextChanged.bind(this)
                }
              /> < br />
              < TextField id="sender"
                floatingLabelText="申請人姓名："
                hintText="Please give me your name"
                onChange={
                  this.onTextChanged.bind(this)
                }
              /> <br />
              < TextField id="subject"
                floatingLabelText="信件主旨："
                onChange={
                  this.onTextChanged.bind(this)
                }
              /> <br />
              < TextField onChange={
                this.onTextChanged.bind(this)
              }
                id="department"
                floatingLabelText="部門：" /> < br />
              < TextField onChange={
                this.onTextChanged.bind(this)
              }
                id="email"
                floatingLabelText="電子信箱地址：" /> < br />
              < TextField onChange={
                this.onTextChanged.bind(this)
              }
                id="wechatid"
                floatingLabelText="微信WeChat帳號：" /> < br />
              < TextField onChange={
                this.onTextChanged.bind(this)
              }
                id="description"
                floatingLabelText="申請緣由：" /> < br />
            </CardText> <CardActions > <a id="sendmail" href={this.state.hrefContent}> <FlatButton label="SEND" /> </a> </CardActions > </Card >
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
