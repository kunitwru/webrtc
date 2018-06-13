const openStream = require("./openStream");
const playVideo = require("./playVideo");
const Peer = require("simple-peer");
const $ = require("jquery");

openStream(function(stream) {
    // play video
    playVideo(stream, "currentVideo");

    var p = new Peer({
        initiator: location.hash === '#1',
        trickle: false,
        stream: stream
    });

    p.on('signal', function (token) {
        $('#txtMySignal').val(JSON.stringify(token));
    });

    $("#btnConnect").click(function () {
        const friendSignal = JSON.parse($('#txtFriendSignal').val());
        p.signal(friendSignal);
    });

    p.on("stream", friendStream => playVideo(friendStream, "friendStream"));
});