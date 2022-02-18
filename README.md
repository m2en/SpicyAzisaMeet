# SpicyAzisaMeet

Minecraft Java Edition　公開サーバー[【AzisabaNetwork】](https://www.azisaba.net/) で使われる面接BOT **SpicyAzisaMeet** です。

## Usage

使用方法につきましては **アジ鯖面接用ディスコードグループ内** - `#面接botガイド` にあるマニュアルを参照してください。

## 設定

### .env

設定例: [`.example.env`](https://github.com/merunno/SpicyAzisaMeet/blob/main/.example.env)

```dotenv
DISCORD_TOKEN=
LOG_CHANNEL_ID=
JOIN_CHANNEL_ID=
UNKNOWN_SERVER_ID=
CLIENT_ID=
GUILD_ID=
AZI_ADMIN_ROLE_ID=
```

| 値                 | 説明                           |
|-------------------|------------------------------|
| DISCORD_TOKEN     | BOTのトークン                     |
| LOG_CHANNEL_ID    | ログチャンネルとして指定するチャンネルのID       |
| JOIN_CHANNEL_ID   | 入室時の希望サーバーのオーダーを送信するチャンネルのID |
| UNKNOWN_SERVER_ID | 希望先未決定のロールのIDを指定             |
| CLIENT_ID         | BOTのClientID(ユーザーID)         |
| GUILD_ID          | アジ鯖面接用ディスコードグループ サーバーID      |
| AZI_ADMIN_ROLE_ID | `アジ鯖運営` のロールID               |

### SelectServer.json

設定例: [`src/config/.example.SelectServer.json`](https://github.com/merunno/SpicyAzisaMeet/blob/main/src/config/.example.SelectServer.json)

```json
{
  "selectServerData": [
    {
      "label": "その他",
      "description": "このリストにないサーバーを選択する",
      "value": "希望先未決定"
    }
  ]
}
```
