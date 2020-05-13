const BYTE_CODE_CR = 13;
const BYTE_CODE_LF = 10;
const BYTE_CODE_HASH = 35;

var CHaserClient = function(name, ip, port) {
    this.name = name;
    this.ip = ip;
    this.port = port;
}

CHaserClient.prototype.init = function() {
    const net = require('net');
    // IPアドレス確認 ※localhostはNG
    if (net.isIP(this.ip) == 0) {
        console.log('IPアドレスが不正です。再入力してください。', ip);
        process.exit(0);
    }
    this.value = [];
    this.isGetReady = false;
    this.needSendHash = false;
    this.client = net.connect(this.port, this.ip);

    // エラー発生イベント
    this.client.on('error', function(e) {
        console.log(e.message);
    });

    // データ受信イベント
    this.client.on('data', function(chunk) {
        console.log('data', Array.from(chunk.toString('utf8', 0, 10)));
        this.value = Array.from(chunk.toString('utf8', 0, 10))

        // gr送信が済んでいない場合、@確認
        if (!this.isGetReady) {
            if (this.value.indexOf('@') != -1) {
                this.order(this.sendMessage);
                this.isGetReady = true;
            }
            else {
                throw 'Connection failed.';
            }   
        }
        else {
            // #送信が必要な場合、#\r\n送信
            if (this.needSendHash) {
                this.client.write(new Uint8Array([BYTE_CODE_HASH, BYTE_CODE_CR, BYTE_CODE_LF]));
                this.needSendHash = false;
            }
            
            // ゲーム状況確認
            if (this.value[0] == '0') {
                this.client.end();
            }
            // 制御情報を除いて、周辺情報をコールバックに返却
            this.callback(this.value.slice(1));
        }
    }.bind(this));

    this.client.on('end', function() {
        console.log('End.');
        process.exit(0);
    });

    // 接続成功イベント
    this.client.on('connect', function() {
        console.log('Connected');
        // 名前送信
        this.order(this.name);
    }.bind(this));

    // 接続終了イベント
    this.client.on('close', function() {
        console.log('Close');
        process.exit(0);
    });
}

// コマンド送信
CHaserClient.prototype.order = function(str) {
    try {
        let sendStr = unescape(encodeURIComponent(str));
        let byteStrArray = [];
        for (let i = 0; i < sendStr.length; i++) {
            let charcode = sendStr.charCodeAt(i);
            byteStrArray.push(charcode);
        }
        // \r\n
        byteStrArray.push(BYTE_CODE_CR, BYTE_CODE_LF);
        this.client.write(new Uint8Array(byteStrArray));
    }
    catch (error) {
        console.log(error);
        process.exit(0);
    }
}

CHaserClient.prototype.start = function(callback) {
    this.getReady(callback);
}

CHaserClient.prototype.getReady = function(callback) {
    this.isGetReady = false;
    this.callback = callback;
    this.sendMessage = 'gr';
}

CHaserClient.prototype.walkRight = function(callback) {
    this.callback = callback;
    this.sendMessage = 'wr';
    this.needSendHash = true;
    this.order('wr');
}

CHaserClient.prototype.walkUp = function(callback) {
    this.callback = callback;
    this.sendMessage = 'wu';
    this.needSendHash = true;
    this.order('wu');
}

CHaserClient.prototype.walkLeft = function(callback) {
    this.callback = callback;
    this.sendMessage = 'wl';
    this.needSendHash = true;
    this.order('wl');
}

CHaserClient.prototype.walkDown = function(callback) {
    this.callback = callback;
    this.sendMessage = 'wd';
    this.needSendHash = true;
    this.order('wd');
}

CHaserClient.prototype.lookRight = function(callback) {
    this.callback = callback;
    this.sendMessage = 'lr';
    this.needSendHash = true;
    this.order('lr');
}

CHaserClient.prototype.lookUp = function(callback) {
    this.callback = callback;
    this.sendMessage = 'lu';
    this.needSendHash = true;
    this.order('lu');
}

CHaserClient.prototype.lookLeft = function(callback) {
    this.callback = callback;
    this.sendMessage = 'll';
    this.needSendHash = true;
    this.order('ll');
}

CHaserClient.prototype.lookDown = function(callback) {
    this.callback = callback;
    this.sendMessage = 'ld';
    this.needSendHash = true;
    this.order('ld');
}

CHaserClient.prototype.searchRight = function(callback) {
    this.callback = callback;
    this.sendMessage = 'sr';
    this.needSendHash = true;
    this.order('sr');
}

CHaserClient.prototype.searchUp = function(callback) {
    this.callback = callback;
    this.sendMessage = 'su';
    this.needSendHash = true;
    this.order('su');
}

CHaserClient.prototype.searchLeft = function(callback) {
    this.callback = callback;
    this.sendMessage = 'sl';
    this.needSendHash = true;
    this.order('sl');
}

CHaserClient.prototype.searchDown = function(callback) {
    this.callback = callback;
    this.sendMessage = 'sd';
    this.needSendHash = true;
    this.order('sd');
}

CHaserClient.prototype.putRight = function(callback) {
    this.callback = callback;
    this.sendMessage = 'pr';
    this.needSendHash = true;
    this.order('pr');
}

CHaserClient.prototype.putUp = function(callback) {
    this.callback = callback;
    this.sendMessage = 'pu';
    this.needSendHash = true;
    this.order('pu');
}

CHaserClient.prototype.putLeft = function(callback) {
    this.callback = callback;
    this.sendMessage = 'pl';
    this.needSendHash = true;
    this.order('pl');
}

CHaserClient.prototype.putDown = function(callback) {
    this.callback = callback;
    this.sendMessage = 'pd';
    this.needSendHash = true;
    this.order('pd');
}

module.exports = { CHaserClient: CHaserClient }