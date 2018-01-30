var miniXPos = readConfig("miniXPos", 0);
var miniYPos = readConfig("miniYPos", 1050);
var miniHeight = readConfig("miniHeight", 240);
var miniWidth = readConfig("miniWidth", 240);
var returnPosX = readConfig("returnPosX", 0);
var returnPosY = readConfig("returnPosY", 0);

function contains (rect1, rect2) {
    if (rect1.x <= rect2.x && rect1.y <= rect2.y) {
        if (rect1.height >= rect2.height && rect1.width >= rect2.width) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

registerShortcut("Mini Display: Send To", "Mini Display: Send To", "Ctrl+Alt+M", function() {
    if (geo.height <= miniHeight && geo.width <= miniWidth) {
        sendToMini (workspace.activeClient);
    }
});

registerUserActionsMenu(function (client) {
    geo = client.geometry;
    canFit = geo.height <= miniHeight && geo.width <= miniWidth;
    if (canFit) {
        return {
            text: "Send to Mini",
            triggered: function () {sendToMini(client);}
        };
    } else {
        return null;
    }
});

function sendToMain (client, animate) {
    geo = client.geometry;
    if (contains({x: miniXPos, y: miniYPos, width: miniWidth, height: miniHeight}, geo)) {
        client.geometry = {x: returnPosX, y: returnPosY, width: geo.width, height: geo.height};
    }
    client.minimized = false;
    client.clientMinimized.disconnect(sendToMain);
}

function sendToMini (client) {
    var geometry = {
        x: miniXPos + ((miniHeight - client.geometry.width) / 2),
        y: miniYPos + ((miniWidth - client.geometry.height) / 2),
        width: client.geometry.width,
        height: client.geometry.height
    };
    client.geometry = geometry;
    client.clientMinimized.connect(sendToMain);
}
