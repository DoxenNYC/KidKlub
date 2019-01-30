// -----GameBody component
import React, { Component } from "react";


class GameBody extends Component {
    render() {
        return (
            <div>
                <div>
                    <div class="row">
                        <div class="col-md-2 panel panel-defaul">
                            <div class="panel-heading">Panel Heading</div>
                            <div class="panel-body">Panel Content</div>
                        </div>
                        <div class=" col-md-8 embed-responsive embed-responsive-16by9">
                            <iframe class="embed-responsive-item" src="http://funkypotato.com/gamez/bunny-goes-boom/index.html"></iframe>
                        </div>
                        <div id="score" class="col-md-2">TBD</div>
                    </div>
                </div>

                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                    crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                    crossorigin="anonymous"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
                    crossorigin="anonymous"></script>

            </div >
        );
    }
}

export default GameBody;