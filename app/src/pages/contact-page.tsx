import * as React from "react";
import {Card, CardTitle, CardText} from "material-ui/Card";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

import ContactForm from "../components/contact-form";

export default class ContactPage extends React.Component<{}, {}> {
  render() {
    return (
      <div className="contact-page">
        <Card>
          <CardTitle title="Contact Us" />
          <CardText>
            <p>Email: <a href="mailto:info@dyslexiatuitioncentre.co.uk">info@dyslexiatuitioncentre.co.uk</a></p>
            <Divider className="contact-page-divider"/>

            <p>Phone: <a href="tel://07944-016-239">07944-016-239</a></p>
            <Divider className="contact-page-divider"/>

            <p>Or via this webform:</p>
            <ContactForm />
          </CardText>
        </Card>
      </div>
    );
  }
}
