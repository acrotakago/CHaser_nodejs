/*
getReady() → 行動関数 → getReady() → ... の順で必ず処理を行う

内容は「walk」「look」「search」「put」の4種類
方向は「right」「up」「left」「down」の4種類
この組み合わせで関数を命名
例) walkUp()，searchRight() など

行動関数が返すリストは行動後のマップ情報9つ．
[ ][x][x]
[ ][C][♡]
[H][ ][ ]
このときは [0, 2, 2, 0, 0, 3, 1, 0, 0] が返る．
*/
// 同じディレクトリに CHaserClient.js がある前提
var CHaserClient = require('./CHaserClient.js');
var name = process.argv[2];
var ip = process.argv[3];
var port = process.argv[4];
var chaser = new CHaserClient.CHaserClient(name, ip, port);
chaser.init();
chaser.start(grCallback);

/**
 * getReadyのコールバック
 * @param value 周辺情報
 */
function grCallback(value) {
    console.log('制御情報', value);
    
    if (value[1] != 2) {
        chaser.walkUp(callback);
    }
    else if (value[5] != 2) {
        chaser.walkRight(callback);
    }
    else if (value[7] != 2) {
        chaser.walkDown(callback);
    }
    else if (value[3] != 2) {
        chaser.walkLeft(callback);
    }
}

/**
 * 行動（walk,look,search,put）のコールバック
 * @param value 周辺情報
 */
function callback(value) {
    console.log('制御情報', value);
    chaser.getReady(grCallback);
}