import json
import os
import urllib.request


def handler(event: dict, context) -> dict:
    """Получает список последних updates от Telegram бота для определения chat_id"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': ''
        }

    token = os.environ['TELEGRAM_BOT_TOKEN']
    url = f'https://api.telegram.org/bot{token}/getUpdates'

    with urllib.request.urlopen(url) as resp:
        data = json.loads(resp.read())

    chats = []
    for update in data.get('result', []):
        msg = update.get('message') or update.get('my_chat_member', {})
        chat = msg.get('chat', {})
        if chat.get('id'):
            chats.append({
                'id': chat['id'],
                'username': chat.get('username', ''),
                'first_name': chat.get('first_name', ''),
            })

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'chats': chats})
    }
