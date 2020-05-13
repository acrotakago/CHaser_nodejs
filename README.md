# CHaser_nodejs
Node.js（v12.14）で動作するCHaserクライアントのモジュールです。

以下よりNode.jsをインストールするだけで動作させることが出来ます。

https://nodejs.org/ja/

## 実行方法
※CHaserサーバーは旭川U16プロコンの物を利用（[zipファイル](http://www.procon-asahikawa.org/files/U16-AsahikawaProcon-ServerQt1.93_windows.zip)）
* Node.jsをインストール
* 本リポジトリをclone
* CHaserサーバーを起動
* Cool or Hotのどちらかを待機状態にする
* sample.jsとCHaserClient.jsが置いてあるディレクトリでsample.jsを実行（Coolの場合）

```
$ node sample.js bot 127.0.0.1 2009
```

* もう片方も接続し、ゲーム開始
