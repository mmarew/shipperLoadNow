Great question — when you run:

```bash
adb logcat *:E
```

It **shows all errors (E)** from **every app and system service**, which can get noisy.

---

### ✅ Solution: Filter Only Your App’s Errors

Here are **3 better ways** to focus just on **your app’s crash/errors**:

---

### ✅ **Option 1: Use your app’s package name + `FATAL` or `AndroidRuntime`**

```bash
adb logcat | grep -i 'com.shipperloadnow'
```

Or to see only fatal crash logs from Android runtime:

```bash
adb logcat | grep 'AndroidRuntime'
```

Even better for clean crash tracking:

```bash
adb logcat | grep -E 'FATAL EXCEPTION|AndroidRuntime|com.shipperloadnow'
```

---

### ✅ **Option 2: Filter by your app’s PID (process ID)**

1. First, get the **current PID**:

   ```bash
   adb shell pidof com.shipperloadnow
   ```

2. Use this PID in logcat:

   ```bash
   adb logcat --pid=12345
   ```

> Replace `12345` with your actual PID.

---

### ✅ **Option 3: Use `logcat` color + filtering tools (Optional)**

Install [`pidcat`](https://github.com/JakeWharton/pidcat) (Linux/macOS only):

```bash
pip install pidcat
pidcat com.shipperloadnow
```

It will:

* Auto-detect your app's PID
* Show only your logs
* Highlight by tag & log level

---

### ✅ Pro Tip: Clear Logs First

Before launching your app, clear logs to reduce noise:

```bash
adb logcat -c
```

Then start filtered logcat and open your app.

---

Let me know which approach you're using, and I can tailor the filter further (e.g., only `E` + `com.shipperloadnow`).

To find errors use 
FATAL EXCEPTION
AndroidRuntime
Exception:
Error:
java.lang.
Caused by:

// to get only errors in file

To quickly **find fatal crashes or exceptions** in a large log file like yours, here are **practical methods** to filter them easily:

---

### ✅ **Method 1: Use Search (`Ctrl + F`) in any text editor**

Search for these keywords one by one:

```
FATAL EXCEPTION
AndroidRuntime
Exception:
Error:
java.lang.
Caused by:
```

---

### ✅ **Method 2: Use Command Line (Best for Devs)**

If you're on **macOS/Linux**, open Terminal and run:

```bash
grep -i "FATAL EXCEPTION" errorlogs.txt
```

Or to include full trace after that:

```bash
grep -i -A 30 "FATAL EXCEPTION" errorlogs.txt
```

If you're on **Windows** with Git Bash or PowerShell, use:

```bash
Select-String -Path errorlogs.txt -Pattern "FATAL EXCEPTION" -Context 0,30
```

---

### ✅ **Method 3: Use VS Code**

1. Open the `errorlogs.txt` in VS Code.
2. Press `Ctrl+F`, enter:

   ```
   FATAL EXCEPTION
   ```
3. Click the ".\*" (regex) button and try searching:

   ```
   (FATAL EXCEPTION|java\.lang\.)
   ```

---

### ✅ **Method 4: Use Logcat Filtering (during development)**

If you’re debugging on an emulator or device, run:

```bash
adb logcat *:E
```

This filters for only **Error level logs**.

Or use:

```bash
adb logcat | grep -i "exception"
```

---

### 📌 Bonus Tip: Reduce Log Noise

You can filter out only errors from `AndroidRuntime`:

```bash
grep "AndroidRuntime" errorlogs.txt
```

---

If you want, I can also write you a small script to extract only the crash logs from the full file. Let me know what OS you're on (Windows/macOS/Linux).

rm -rf android/.gradle android/build android/app/build

