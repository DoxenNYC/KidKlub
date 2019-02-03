import React from "react";
import ContentBody from "../../components/ContentBody/ContentBody";
import GameBody from "../../components/GameBody/GameBody";
import VideoBody from "../../components/VideoBody/VideoBody";
import LoginApp from "../../LoginApp";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MessengerApp from "../../components/messenger/MessengerApp";


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function Home() {
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <div className="row cont">
                        <div className="col-sm-9">
                            <Route exact path="/" component={LoginApp} />
                            <Route exact path="/home" component={ContentBody} />
                            <Route exact path="/video" component={VideoBody} />
                            <Route exact path="/game" component={GameBody} />
                        </div>
                        <div className="col-sm-3">
                            <div className="card">
                                <div className="card-header">
                                    Messages
                            </div>
                                <div className="card-body">
                                    <MessengerApp />
                                </div>
                            </div>
                        </div>
                    </div>
                </Switch>
                <Footer />
            </div>
        </Router >



    );
}

export default Home;