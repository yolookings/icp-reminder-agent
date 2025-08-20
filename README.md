![Dana Desa Logo](/img/logo-reminder-agent.png)

# 🤖 ICP Reminder System

A decentralized blockchain-based reminder system built with **Internet Computer Protocol (ICP)** and powered by intelligent agents.

> 💡 **Why Blockchain?** Unlike traditional reminder apps that can lose your data, this system stores reminders permanently on the ICP blockchain, ensuring your important tasks are never lost.

## ✨ What Makes This Special

- **🔒 Permanent Storage**: Your reminders live forever on the blockchain
- **🗣️ Natural Language**: Just talk normally - "Remind me to call mom tomorrow at 3pm"
- **🌍 Always Available**: No servers to go down, works from anywhere
- **🔓 Open Source**: Fully transparent and customizable
- **💰 Low Cost**: Deploy once, use forever for pennies

---

## 🏗️ How It Works

```
                    ICP Reminder System Architecture

    ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
    │                 │      │                 │      │                 │
    │   👤 User       │ ───▶ │  🤖 uAgent      │ ───▶ │  ⛓️ ICP Canister │
    │                 │      │  (Fetch.ai)     │      │  (Motoko)       │
    │ Natural Language│      │ Smart Parser    │      │ Smart Contract  │
    │ Commands        │      │ API Interface   │      │ Blockchain      │
    └─────────────────┘      └─────────────────┘      └─────────────────┘
            │                          │                          │
            │                          │                          │
    ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
    │                 │      │                 │      │                 │
    │  📱 Interface   │ ◀─── │  🌐 Agentverse  │ ◀─── │  🗄️ Blockchain  │
    │                 │      │  (Deploy)       │      │  (Storage)      │
    │ Multi-Platform  │      │ Agent Runtime   │      │ Immutable Data  │
    │ Notifications   │      │ Cloud Hosting   │      │ Global Access   │
    └─────────────────┘      └─────────────────┘      └─────────────────┘
```

---

## 🚀 Quick Start Guide

### 🎯 Option 1: Simulation Mode (Recommended for Beginners)

Perfect for testing and development without spending any money.

```bash
# 1️⃣ Complete setup in one command
./scripts/setup.sh

# 2️⃣ Start your local blockchain
./scripts/start-local.sh

# 3️⃣ Launch the AI agent
./scripts/start-agent.sh

# 4️⃣ Test everything works
./scripts/test-system.sh
```

**That's it!** 🎉 Your reminder system is ready to use locally.

### 🌐 Option 2: Production Mode (Deploy to Real Blockchain)

For when you're ready to make it live and accessible worldwide.

```bash
# Set up your ICP identity
dfx identity new production
dfx identity use production

# Deploy to the Internet Computer
dfx deploy --network ic --with-cycles 1000000000000
```

### 🔧 Manual Setup (If Automated Scripts Don't Work)

<details>
<summary>Click to expand manual installation steps</summary>

#### Install Dependencies

```bash
# Install DFX SDK
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

# Install Node.js dependencies
npm install

# Install Python dependencies
cd agent
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
```

#### Setup Backend

```bash
dfx start --clean --background
dfx deploy
```

#### Setup Agent

```bash
cd agent
cp .env.example .env
# Edit .env with your canister ID
python main.py
```

</details>

---

## 📝 How to Use

### Basic Commands

Just speak naturally to your reminder system:

**Creating Reminders:**

```
✅ "Remind me about the doctor appointment tomorrow at 2pm"
✅ "Set a reminder to call mom this evening"
✅ "Don't let me forget the team meeting on Friday morning"
✅ "Remind me to take my medicine every day at 8am"
```

**Checking Your Schedule:**

```
✅ "What's on my schedule today?"
✅ "Show me tomorrow's reminders"
✅ "List all my upcoming tasks"
✅ "What do I need to do this week?"
```

**Managing Reminders:**

```
✅ "Mark the meeting reminder as done"
✅ "Delete the medicine reminder"
✅ "Update my doctor appointment to 3pm"
```

### Smart Time Recognition

The system understands various time formats:

| What You Say          | What It Understands          |
| --------------------- | ---------------------------- |
| "tomorrow morning"    | Tomorrow at 8:00 AM          |
| "next Friday at 3"    | Next Friday at 3:00 PM       |
| "in 2 hours"          | Exactly 2 hours from now     |
| "every Monday at 9am" | Recurring weekly reminder    |
| "25/12/2024 at 14:30" | December 25, 2024 at 2:30 PM |

---

## 🛠️ Technical Details

### Project Structure

```
icp-reminder-system/
├── 📂 src/
│   └── reminder-backend/
│       └── main.mo              # 🧠 Smart contract (Motoko)
├── 📂 agent/
│   ├── main.py                  # 🤖 AI agent code
│   ├── requirements.txt         # 📦 Python dependencies
│   └── .env.example            # ⚙️ Configuration template
├── 📂 scripts/
│   ├── setup.sh                # 🚀 One-command setup
│   ├── start-local.sh          # 💻 Local development
│   ├── start-agent.sh          # 🤖 Start AI agent
│   └── test-system.sh          # 🧪 Run tests
├── dfx.json                    # ⚙️ ICP configuration
└── README.md                   # 📖 This file
```

### Backend API Reference

The Motoko smart contract provides these methods:

| Method                  | Purpose               | Example                 |
| ----------------------- | --------------------- | ----------------------- |
| `createReminder()`      | Add new reminder      | Create "Meeting at 3pm" |
| `getAllReminders()`     | List all reminders    | Show my schedule        |
| `getPendingReminders()` | Show incomplete tasks | What's left to do?      |
| `completeReminder()`    | Mark as done          | ✅ Meeting completed    |
| `deleteReminder()`      | Remove reminder       | Delete old reminder     |
| `getDueReminders()`     | Show urgent tasks     | What's due now?         |

### Agent Features

**Core Capabilities:**

- 🧠 Natural language processing for command parsing
- 🌐 HTTP client for ICP canister communication
- 🛡️ Error handling and comprehensive logging
- 👥 Multi-user support and session management

---

## 💰 Cost Breakdown

### Development (Free)

- ✅ Local testing: **$0**
- ✅ Simulation mode: **$0**
- ✅ Agent development: **$0**

### Production (Very Affordable)

- 💳 Deploy to ICP: **~$1-2 USD** (one-time)
- 💳 Monthly running: **~$0.10 USD/month**
- 💳 Agentverse hosting: **Free tier available**

**Total monthly cost: Less than a cup of coffee! ☕**

---

## 🔧 Troubleshooting

### Common Issues & Solutions

**Problem: DFX won't start**

```bash
dfx stop
dfx start --clean --background
```

**Problem: Deployment failed**

```bash
dfx canister delete --all
dfx deploy
```

**Problem: Agent not responding**

1. Check `CANISTER_URL` in your `.env` file
2. Make sure your canister is running: `dfx canister status reminder-backend`
3. Enable debug mode: `export LOG_LEVEL=DEBUG && python main.py`

**Problem: Permission denied on scripts**

```bash
chmod +x scripts/*.sh
```

### Debug Mode

Enable detailed logging for troubleshooting:

```bash
export LOG_LEVEL=DEBUG
python main.py
```

---

## 🤝 Contributing

We'd love your help making this better! Here's how:

1. **🍴 Fork** the repository
2. **🌿 Create** your feature branch: `git checkout -b feature/amazing-feature`
3. **💾 Commit** your changes: `git commit -m 'Add amazing feature'`
4. **🚀 Push** to your branch: `git push origin feature/amazing-feature`
5. **🎯 Open** a Pull Request

### What We're Looking For

- 🐛 Bug fixes and improvements
- 📚 Better documentation
- 🌐 UI/UX enhancements
- 🔧 New features and integrations

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation
- Keep commits atomic and well-described

---

## 📚 Learn More

### Resources

- 📖 [ICP Documentation](https://internetcomputer.org/docs/current/developer-docs/quickstart/hello10mins)
- 🤖 [Fetch.ai uAgents Guide](https://docs.fetch.ai/uAgents)
- 🎓 [Motoko Programming Language](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/)
- 🎬 [Video Tutorial Series](https://youtube.com/example) (Coming Soon)

### Community

- 💬 [Discord Community](https://discord.gg/example) - Get help and share ideas
- 🐦 [Twitter Updates](https://twitter.com/example) - Latest news and updates
- 📧 Email Support: `support@example.com`
- 📱 [Telegram Group](https://t.me/example) - Quick questions and updates

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Special Thanks

- **[Internet Computer Protocol](https://internetcomputer.org/)** - Revolutionary blockchain platform
- **[Fetch.ai](https://fetch.ai/)** - Cutting-edge AI agent framework
- **[DFINITY Foundation](https://dfinity.org/)** - Building the future of the internet
- **Open Source Community** - For continuous inspiration and support

---

<div align="center">

### 🚀 Ready to build the future of reminders?

[![Star this repo](https://img.shields.io/github/stars/yourusername/icp-reminder-system?style=social)](https://github.com/yourusername/icp-reminder-system)
[![Fork this repo](https://img.shields.io/github/forks/yourusername/icp-reminder-system?style=social)](https://github.com/yourusername/icp-reminder-system/fork)
[![Issues](https://img.shields.io/github/issues/yourusername/icp-reminder-system)](https://github.com/yourusername/icp-reminder-system/issues)
[![License](https://img.shields.io/github/license/yourusername/icp-reminder-system)](https://github.com/yourusername/icp-reminder-system/blob/main/LICENSE)

**[⭐ Star this repo](https://github.com/yourusername/icp-reminder-system)** • **[🍴 Fork it](https://github.com/yourusername/icp-reminder-system/fork)** • **[🐛 Report bugs](https://github.com/yourusername/icp-reminder-system/issues)**

_Built with ❤️ for the decentralized future_

</div>
