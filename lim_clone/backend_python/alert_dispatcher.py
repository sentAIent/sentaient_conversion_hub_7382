import os
import json
import requests
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

CONFIG_FILE = os.path.join(os.path.dirname(__file__), "alerts_config.json")

class AlertDispatcher:
    @classmethod
    def load_config(cls) -> dict:
        if not os.path.exists(CONFIG_FILE):
            return {
                "discord_webhook_url": "",
                "telegram_bot_token": "",
                "telegram_chat_id": "",
                "events_enabled": {
                    "trade_executed": True,
                    "stop_loss_triggered": True,
                    "drawdown_circuit_breaker": True,
                    "alpha_stream_signal": True
                }
            }
        try:
            with open(CONFIG_FILE, "r") as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error loading alerts config: {e}")
            return {}

    @classmethod
    def save_config(cls, config: dict) -> dict:
        with open(CONFIG_FILE, "w") as f:
            json.dump(config, f, indent=2)
        return {"status": "SUCCESS", "message": "Alert dispatcher configurations saved."}

    @classmethod
    def send_discord_alert(cls, webhook_url: str, title: str, description: str, fields: list = None, color: int = 3447003) -> bool:
        if not webhook_url:
            return False
        try:
            payload = {
                "username": "Contango Quant Bot",
                "avatar_url": "https://img.icons8.com/color/512/bullish.png",
                "embeds": [
                    {
                        "title": title,
                        "description": description,
                        "color": color, # Blue = 3447003, Green = 3066993, Red = 15158332
                        "fields": fields or [],
                        "footer": {
                            "text": f"Contango Quant Execution Network • {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}"
                        }
                    }
                ]
            }
            res = requests.post(webhook_url, json=payload, timeout=5)
            return res.status_code in [200, 204]
        except Exception as e:
            logger.error(f"Discord dispatch error: {e}")
            return False

    @classmethod
    def send_telegram_alert(cls, bot_token: str, chat_id: str, text: str) -> bool:
        if not bot_token or not chat_id:
            return False
        try:
            url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
            payload = {
                "chat_id": chat_id,
                "text": text,
                "parse_mode": "Markdown"
            }
            res = requests.post(url, json=payload, timeout=5)
            return res.status_code == 200
        except Exception as e:
            logger.error(f"Telegram dispatch error: {e}")
            return False

    @classmethod
    def dispatch_trade_event(cls, symbol: str, action: str, price: float, shares: float, strategy: str = "Volatility Arb") -> dict:
        config = cls.load_config()
        discord_url = config.get("discord_webhook_url")
        tg_token = config.get("telegram_bot_token")
        tg_chat = config.get("telegram_chat_id")

        color = 3066993 if "BUY" in action else 15158332
        title = f"⚡ Trade Execution: {action} {symbol}"
        desc = f"Strategy **{strategy}** executed an automated order via Contango Quant OMS."
        fields = [
            {"name": "Symbol", "value": symbol, "inline": True},
            {"name": "Action", "value": action, "inline": True},
            {"name": "Price", "value": f"${price:.2f}", "inline": True},
            {"name": "Shares", "value": str(shares), "inline": True},
            {"name": "Total Value", "value": f"${(price * shares):,.2f}", "inline": True}
        ]

        d_sent = cls.send_discord_alert(discord_url, title, desc, fields, color) if discord_url else False
        
        tg_msg = (
            f"⚡ *Contango Quant Trade Executed*\n\n"
            f"• *Strategy:* `{strategy}`\n"
            f"• *Symbol:* `{symbol}`\n"
            f"• *Action:* `{action}`\n"
            f"• *Price:* `${price:.2f}`\n"
            f"• *Shares:* `{shares}`\n"
            f"• *Total Value:* `${(price * shares):,.2f}`\n"
            f"• *Timestamp:* `{datetime.utcnow().strftime('%H:%M:%S UTC')}`"
        )
        tg_sent = cls.send_telegram_alert(tg_token, tg_chat, tg_msg) if tg_token and tg_chat else False

        return {
            "status": "DISPATCHED",
            "discord_sent": d_sent,
            "telegram_sent": tg_sent
        }
