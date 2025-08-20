import asyncio
import re
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import requests
import json
from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Agent configuration
AGENT_MAILBOX_KEY = os.getenv("AGENT_MAILBOX_KEY", "")
AGENT_SEED = os.getenv("AGENT_SEED", "reminder_agent_seed_123")

# ICP Canister configuration
CANISTER_URL = os.getenv("CANISTER_URL", "http://localhost:4943")
CANISTER_ID = os.getenv("CANISTER_ID", "")

# Create the reminder agent
reminder_agent = Agent(
    name="reminder_agent",
    seed=AGENT_SEED,
    mailbox=f"{AGENT_MAILBOX_KEY}@https://agentverse.ai" if AGENT_MAILBOX_KEY else None,
)

# Fund agent if running on testnet
fund_agent_if_low(reminder_agent.wallet.address())

# Message models
class ReminderRequest(Model):
    message: str
    user_id: Optional[str] = "default_user"

class ReminderResponse(Model):
    success: bool
    message: str
    reminder_id: Optional[int] = None

class ReminderListRequest(Model):
    user_id: Optional[str] = "default_user"
    filter_type: Optional[str] = "all"  # all, pending, due

class ReminderListResponse(Model):
    success: bool
    reminders: list
    count: int

# ICP Canister interaction functions
class ICPReminderClient:
    def __init__(self, canister_url: str, canister_id: str):
        self.canister_url = canister_url
        self.canister_id = canister_id
        self.base_url = f"{canister_url}/api/v2/canister/{canister_id}/call"
    
    def create_reminder(self, title: str, description: str, reminder_time: int) -> Dict[str, Any]:
        """Create a new reminder in the ICP canister"""
        try:
            payload = {
                "method_name": "createReminder",
                "args": f"(record {{ title=\"{title}\"; description=\"{description}\"; reminderTime={reminder_time}; isCompleted=false; createdAt=0 }})"
            }
            
            response = requests.post(self.base_url, json=payload)
            if response.status_code == 200:
                return {"success": True, "data": response.json()}
            else:
                return {"success": False, "error": f"HTTP {response.status_code}"}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def get_all_reminders(self) -> Dict[str, Any]:
        """Get all reminders from the ICP canister"""
        try:
            payload = {
                "method_name": "getAllReminders",
                "args": "()"
            }
            
            response = requests.post(self.base_url, json=payload)
            if response.status_code == 200:
                return {"success": True, "data": response.json()}
            else:
                return {"success": False, "error": f"HTTP {response.status_code}"}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def get_pending_reminders(self) -> Dict[str, Any]:
        """Get pending reminders from the ICP canister"""
        try:
            payload = {
                "method_name": "getPendingReminders",
                "args": "()"
            }
            
            response = requests.post(self.base_url, json=payload)
            if response.status_code == 200:
                return {"success": True, "data": response.json()}
            else:
                return {"success": False, "error": f"HTTP {response.status_code}"}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def complete_reminder(self, reminder_id: int) -> Dict[str, Any]:
        """Mark a reminder as completed"""
        try:
            payload = {
                "method_name": "completeReminder",
                "args": f"({reminder_id})"
            }
            
            response = requests.post(self.base_url, json=payload)
            if response.status_code == 200:
                return {"success": True, "data": response.json()}
            else:
                return {"success": False, "error": f"HTTP {response.status_code}"}
        except Exception as e:
            return {"success": False, "error": str(e)}

# Initialize ICP client
icp_client = ICPReminderClient(CANISTER_URL, CANISTER_ID)

# Natural language processing functions
def parse_reminder_message(message: str) -> Dict[str, Any]:
    """Parse natural language reminder message"""
    message = message.lower().strip()
    
    # Extract title (everything before time indicators)
    time_patterns = [
        r'\b(in|at|on|tomorrow|today|next|this)\b',
        r'\b\d+\s*(minute|hour|day|week|month)s?\b',
        r'\b\d{1,2}:\d{2}\b',
        r'\b\d{1,2}\s*(am|pm)\b'
    ]
    
    title = message
    for pattern in time_patterns:
        match = re.search(pattern, message)
        if match:
            title = message[:match.start()].strip()
            break
    
    # Clean up title
    title = re.sub(r'^(remind me to|remind me|set reminder|create reminder)', '', title).strip()
    if not title:
        title = "Reminder"
    
    # Parse time
    reminder_time = parse_time_from_message(message)
    
    return {
        "title": title.capitalize(),
        "description": f"Reminder: {title}",
        "reminder_time": reminder_time
    }

def parse_time_from_message(message: str) -> int:
    """Parse time from natural language message"""
    now = datetime.now()
    
    # Tomorrow
    if "tomorrow" in message:
        time_match = re.search(r'(\d{1,2}):?(\d{2})?\s*(am|pm)?', message)
        if time_match:
            hour = int(time_match.group(1))
            minute = int(time_match.group(2)) if time_match.group(2) else 0
            ampm = time_match.group(3)
            
            if ampm == "pm" and hour != 12:
                hour += 12
            elif ampm == "am" and hour == 12:
                hour = 0
                
            target_time = (now + timedelta(days=1)).replace(hour=hour, minute=minute, second=0, microsecond=0)
        else:
            target_time = now + timedelta(days=1)
    
    # Today at specific time
    elif "today" in message or re.search(r'\d{1,2}:\d{2}', message):
        time_match = re.search(r'(\d{1,2}):?(\d{2})?\s*(am|pm)?', message)
        if time_match:
            hour = int(time_match.group(1))
            minute = int(time_match.group(2)) if time_match.group(2) else 0
            ampm = time_match.group(3)
            
            if ampm == "pm" and hour != 12:
                hour += 12
            elif ampm == "am" and hour == 12:
                hour = 0
                
            target_time = now.replace(hour=hour, minute=minute, second=0, microsecond=0)
            if target_time <= now:
                target_time += timedelta(days=1)
        else:
            target_time = now + timedelta(hours=1)
    
    # In X minutes/hours
    elif "in" in message:
        time_match = re.search(r'in\s+(\d+)\s*(minute|hour|day)s?', message)
        if time_match:
            amount = int(time_match.group(1))
            unit = time_match.group(2)
            
            if unit == "minute":
                target_time = now + timedelta(minutes=amount)
            elif unit == "hour":
                target_time = now + timedelta(hours=amount)
            elif unit == "day":
                target_time = now + timedelta(days=amount)
            else:
                target_time = now + timedelta(hours=1)
        else:
            target_time = now + timedelta(hours=1)
    
    # Default: 1 hour from now
    else:
        target_time = now + timedelta(hours=1)
    
    # Convert to nanoseconds (ICP Time format)
    return int(target_time.timestamp() * 1_000_000_000)

# Agent event handlers
@reminder_agent.on_event("startup")
async def startup_handler(ctx: Context):
    ctx.logger.info(f"Reminder Agent started with address: {reminder_agent.address}")
    ctx.logger.info("Ready to process reminder requests!")

@reminder_agent.on_message(model=ReminderRequest)
async def handle_reminder_request(ctx: Context, sender: str, msg: ReminderRequest):
    """Handle incoming reminder creation requests"""
    try:
        ctx.logger.info(f"Processing reminder request: {msg.message}")
        
        # Parse the natural language message
        parsed = parse_reminder_message(msg.message)
        
        # Create reminder in ICP canister
        result = icp_client.create_reminder(
            title=parsed["title"],
            description=parsed["description"],
            reminder_time=parsed["reminder_time"]
        )
        
        if result["success"]:
            response = ReminderResponse(
                success=True,
                message=f"✅ Reminder created: '{parsed['title']}'",
                reminder_id=1  # Would be actual ID from canister response
            )
            ctx.logger.info(f"Reminder created successfully: {parsed['title']}")
        else:
            response = ReminderResponse(
                success=False,
                message=f"❌ Failed to create reminder: {result.get('error', 'Unknown error')}"
            )
            ctx.logger.error(f"Failed to create reminder: {result.get('error')}")
        
        await ctx.send(sender, response)
        
    except Exception as e:
        ctx.logger.error(f"Error processing reminder request: {str(e)}")
        error_response = ReminderResponse(
            success=False,
            message=f"❌ Error: {str(e)}"
        )
        await ctx.send(sender, error_response)

@reminder_agent.on_message(model=ReminderListRequest)
async def handle_reminder_list_request(ctx: Context, sender: str, msg: ReminderListRequest):
    """Handle requests to list reminders"""
    try:
        ctx.logger.info(f"Processing reminder list request: {msg.filter_type}")
        
        # Get reminders from ICP canister based on filter
        if msg.filter_type == "pending":
            result = icp_client.get_pending_reminders()
        else:
            result = icp_client.get_all_reminders()
        
        if result["success"]:
            reminders = result.get("data", [])
            response = ReminderListResponse(
                success=True,
                reminders=reminders,
                count=len(reminders)
            )
            ctx.logger.info(f"Retrieved {len(reminders)} reminders")
        else:
            response = ReminderListResponse(
                success=False,
                reminders=[],
                count=0
            )
            ctx.logger.error(f"Failed to retrieve reminders: {result.get('error')}")
        
        await ctx.send(sender, response)
        
    except Exception as e:
        ctx.logger.error(f"Error processing reminder list request: {str(e)}")
        error_response = ReminderListResponse(
            success=False,
            reminders=[],
            count=0
        )
        await ctx.send(sender, error_response)

# Periodic reminder checking
@reminder_agent.on_interval(period=300.0)  # Check every 5 minutes
async def check_due_reminders(ctx: Context):
    """Periodically check for due reminders"""
    try:
        # This would integrate with notification system
        ctx.logger.info("Checking for due reminders...")
        # Implementation would depend on notification requirements
        
    except Exception as e:
        ctx.logger.error(f"Error checking due reminders: {str(e)}")

if __name__ == "__main__":
    print("🤖 Starting ICP Reminder Agent...")
    print(f"Agent Address: {reminder_agent.address}")
    print("Send reminder requests to create reminders!")
    reminder_agent.run()
