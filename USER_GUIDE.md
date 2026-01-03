# FlowForge - User Guide

## 🚀 Start the App

```bash
# Terminal 1 - Backend
cd backend
uvicorn main:app --reload

# Terminal 2 - Frontend
cd frontend
npm start
```

Browser opens at **http://localhost:3000**

---

## 🎯 Quick Example

### 1. Load a Template
- Click **"📋 Templates"** dropdown (top bar)
- Select **"Simple LLM Chat"**
- ✅ 3 nodes appear!

### 2. Test It
- Click **"Submit Pipeline"** button (bottom)
- See: "3 nodes, 2 edges, is_dag: true"

### 3. Save It
- Click **"💾 Save"** button
- Enter name: "test"
- ✅ Saved!

### 4. Load It Back
- Click **"📂 Load"** button
- Type: "test"
- ✅ Loaded!

---

## ⌨️ Keyboard Shortcuts

- **Ctrl+Z** - Undo
- **Ctrl+Shift+Z** - Redo
- **Ctrl+S** - Save
- **Ctrl+E** - Export

---

## 📋 Available Templates

1. **Simple LLM Chat** - Input → LLM → Output
2. **Data Processing** - Filter and transform
3. **API Integration** - API calls
4. **Conditional Routing** - If/else logic
5. **Database Query** - Database ops
6. **Text Processing** - Multi-step text

---

## 🎨 Build Your Own Pipeline

1. **Drag** nodes from toolbar to canvas
2. **Connect** them (right circle → left circle)
3. **Configure** by clicking on nodes
4. **Save** with 💾 Save button
5. **Test** with Submit Pipeline button

---

## 💡 Dynamic Variables

In any **Text** node, type:
```
Hello {{ name }}, you have {{ count }} messages
```

✅ Handles appear automatically for `name` and `count`!

---

## ✅ That's It!

All features work through the UI buttons. No console needed!
