# mini-display-kwin
Manage a mini display using a kwin script.

### Workflow:
1. Configure the kwin script with your mini display's resolution and position, and return position
2. Make the window smaller then the mini display
3. Move the window by:
   - Openning window's menu and selecting 'Send to Mini'
   - Entering the shortcut on the active window (default: Ctrl-Alt-M)
4. The window is moved to the mini display and centered
5. Minimize window to return it to main display at return position
