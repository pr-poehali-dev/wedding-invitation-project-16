import json
import os
import smtplib
import urllib.request
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

TELEGRAM_CHAT_ID = 320956193


def send_telegram(token: str, text: str):
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    data = json.dumps({'chat_id': TELEGRAM_CHAT_ID, 'text': text, 'parse_mode': 'HTML'}).encode()
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    urllib.request.urlopen(req)


def handler(event: dict, context) -> dict:
    """Принимает ответ гостя со свадебного приглашения и отправляет на почту и в Telegram"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    print(f"[RSVP] incoming request, body: {event.get('body')}")

    body = json.loads(event.get('body') or '{}')

    rsvp = body.get('rsvp', '')
    menu = body.get('menu', '')
    alcohol = body.get('alcohol', '')
    dietary = body.get('dietary', '')
    name = body.get('name', 'Гость')

    rsvp_text = 'Да, буду!' if rsvp == 'yes' else 'К сожалению, не смогу'

    html = f"""
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f7faf8; border: 1px solid #b5d5c0; border-radius: 12px;">
        <h2 style="color: #1a1a1a; text-align: center; font-size: 28px; margin-bottom: 8px;">🌿 Новый ответ гостя</h2>
        <p style="text-align: center; color: #8aab7a; font-size: 13px; margin-bottom: 32px; text-transform: uppercase; letter-spacing: 3px;">Свадьба Никиты и Татьяны · 24 июля 2026</p>

        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8f4ed; color: #8aab7a; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; width: 40%;">Гость</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8f4ed; color: #1a1a1a; font-size: 16px;">{name}</td>
            </tr>
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8f4ed; color: #8aab7a; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Присутствие</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8f4ed; color: #1a1a1a; font-size: 16px;">{rsvp_text}</td>
            </tr>
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8f4ed; color: #8aab7a; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Меню</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8f4ed; color: #1a1a1a; font-size: 16px;">{menu or 'не указано'}</td>
            </tr>
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8f4ed; color: #8aab7a; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Напитки</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8f4ed; color: #1a1a1a; font-size: 16px;">{alcohol or 'не указано'}</td>
            </tr>
            <tr>
                <td style="padding: 12px 0; color: #8aab7a; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Пожелания</td>
                <td style="padding: 12px 0; color: #1a1a1a; font-size: 16px;">{dietary or 'нет'}</td>
            </tr>
        </table>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'💌 Ответ гостя: {name} — {rsvp_text}'
    msg['From'] = 'nikita_199579@mail.ru'
    msg['To'] = 'nikita_199579@mail.ru'
    msg.attach(MIMEText(html, 'html'))

    try:
        with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
            server.login('nikita_199579@mail.ru', os.environ['SMTP_PASSWORD'])
            server.sendmail('nikita_199579@mail.ru', 'nikita_199579@mail.ru', msg.as_string())
        print("[RSVP] email sent OK")
    except Exception as e:
        print(f"[RSVP] email ERROR: {e}")

    tg_text = (
        f'💌 <b>Новый ответ гостя</b>\n\n'
        f'👤 <b>Гость:</b> {name}\n'
        f'✅ <b>Присутствие:</b> {rsvp_text}\n'
        f'🍽 <b>Меню:</b> {menu or "не указано"}\n'
        f'🥂 <b>Напитки:</b> {alcohol or "не указано"}\n'
        f'📝 <b>Пожелания:</b> {dietary or "нет"}'
    )
    try:
        send_telegram(os.environ['TELEGRAM_BOT_TOKEN'], tg_text)
        print("[RSVP] telegram sent OK")
    except Exception as e:
        print(f"[RSVP] telegram ERROR: {e}")

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }