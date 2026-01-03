# Practice Steps - Try Before Recording

Follow these exact steps to practice each demo scenario.

---

## 🎬 Setup (Do this once at the start)

### Terminal Setup:
```bash
# Terminal 1 - Backend
cd backend
uvicorn main:app --reload

# Terminal 2 - Frontend
cd frontend
npm start
```

**Wait for:** Browser to open at http://localhost:3000

---

## 📝 Scenario 1: Customer Support Chatbot Pipeline

**Goal:** Build Input → LLM → Output pipeline

### Step-by-Step:

1. **Clear canvas** (if needed)
   - Refresh page OR delete any existing nodes

2. **Add Input Node**
   - From toolbar, click and drag **Input** to canvas (left side)
   - Click on the Input node to select it
   - In the node, you'll see two fields:
     - **Name field:** Click and type `customer_message`
     - **Type dropdown:** Keep it as `Text`

3. **Add LLM Node**
   - Drag **LLM** node to canvas (middle area)
   - Click on it
   - **Model dropdown:** Select `GPT-4` from dropdown

4. **Add Output Node**
   - Drag **Output** node to canvas (right side)
   - Click on it
   - **Name field:** Type `ai_response`
   - **Type dropdown:** Keep as `Text`

5. **Connect the Nodes**
   - Hover over Input node's **right side** (you'll see a circle)
   - Click and drag from that circle to LLM's **left side** circle
   - You'll see a line connecting them
   - Now connect LLM's **right side** to Output's **left side**

6. **Save the Pipeline**
   - Click the **💾 Save** button (top bar)
   - A prompt appears
   - Type: `customer_support_bot`
   - Press **Enter**
   - You'll see a success message

7. **Test Validation**
   - Click **Submit Pipeline** button (bottom)
   - Open browser console (F12)
   - Look for: `"num_nodes": 3, "num_edges": 2, "is_dag": true`

8. **Test Export**
   - Press **Ctrl+E** (or click Export button if visible)
   - A JSON file will download
   - Check your Downloads folder

**✅ Success Check:**
- 3 nodes visible and connected
- All fields are filled
- Console shows valid DAG
- File downloaded

**⏱️ Time:** ~2-3 minutes

---

## 📝 Scenario 2: Content Moderation System

**Goal:** Use template, customize nodes, test undo/redo

### Step-by-Step:

1. **Load Template**
   - Click **📋 Templates** dropdown (top bar)
   - Click **"Data Processing Pipeline"**
   - **BOOM!** 4 nodes appear instantly

2. **Customize Input Node**
   - Click on the **Input** node (leftmost)
   - Change **Name** from `raw_data` to `user_content`
   - Leave Type as Text

3. **Customize Filter Node**
   - Click on the **Filter** node (second from left)
   - You'll see 3 fields:
     - **Field:** Type `content`
     - **Operator:** Select `Contains` from dropdown
     - **Value:** Type `spam`

4. **Customize Transform Node**
   - Click on the **Transform** node (third node)
   - **Transform dropdown:** Select `lowercase`

5. **Customize Output Node**
   - Click on the **Output** node (rightmost)
   - Change **Name** to `clean_content`

6. **Test Undo**
   - Click on Input node
   - Change name to something random like `test123`
   - Press **Ctrl+Z**
   - Watch it change back to `user_content`!

7. **Test Redo**
   - Press **Ctrl+Shift+Z**
   - Watch it change to `test123` again
   - Press **Ctrl+Z** again to undo

8. **Save**
   - Press **Ctrl+S**
   - Type: `content_moderator`
   - Press Enter

9. **Test Submit**
   - Click **Submit Pipeline**
   - Check console: Should show 4 nodes, 3 edges

**✅ Success Check:**
- Template loaded instantly
- All nodes customized
- Undo/Redo works
- Saved successfully

**⏱️ Time:** ~2-3 minutes

---

## 📝 Scenario 3: Dynamic Email Generator ⭐ (MOST IMPRESSIVE!)

**Goal:** Show dynamic {{ variable }} feature with auto-handle creation

### Step-by-Step:

1. **Start Fresh**
   - Refresh page to get clean canvas

2. **Add First Input Node**
   - Drag **Input** to left side
   - Click on it
   - **Name:** Type `customer_name`
   - **Type:** Keep as `Text`

3. **Add Second Input Node**
   - Drag another **Input** below the first one
   - Click on it
   - **Name:** Type `order_count`
   - **Type:** Keep as `Text`

4. **Add Text Node (THE MAGIC PART!)**
   - Drag **Text** node to center
   - Click on it
   - In the **text area**, type exactly:
     ```
     Hello {{ name }},

     Thank you for your {{ count }} orders!
     We appreciate your business.
     ```
   - **WATCH CAREFULLY:** As you type `{{ name }}` and `{{ count }}`, new handles appear on the LEFT side of the Text node!
   - You'll see small circles with labels "name" and "count"

5. **Add LLM Node**
   - Drag **LLM** to the right of Text node
   - Select **Model:** `GPT-3.5`

6. **Add Output Node**
   - Drag **Output** to far right
   - **Name:** `email_content`

7. **Connect with Variables (Important!)**
   - Connect **first Input** (customer_name) → Text node's **"name" handle** (you'll see it labeled)
   - Connect **second Input** (order_count) → Text node's **"count" handle**
   - Connect **Text node** (right side) → **LLM** (left side)
   - Connect **LLM** (right side) → **Output** (left side)

8. **Show More Magic**
   - Click on Text node again
   - Add a new variable: `{{ product }}`
   - **WATCH:** A new handle appears instantly for "product"!
   - Remove it (delete the text `{{ product }}`)
   - **WATCH:** The handle disappears!

9. **Save**
   - Press Ctrl+S
   - Name: `email_generator`

**✅ Success Check:**
- 2 Input nodes, 1 Text node, 1 LLM, 1 Output
- Text node shows "name" and "count" handles on left
- All connected properly
- Adding/removing {{ variables }} creates/removes handles in real-time

**⏱️ Time:** ~3-4 minutes

**🎯 Recording Tip:** This is your WOW moment! Emphasize the automatic handle creation when typing {{ variable }}.

---

## 📝 Scenario 4: Conditional Workflow

**Goal:** Show branching logic with conditional node

### Step-by-Step:

1. **Load Template**
   - Click **📋 Templates**
   - Select **"Conditional Routing"**
   - 4 nodes appear (1 Input, 1 Conditional, 2 Outputs)

2. **Customize Input**
   - Click on **Input** node (left)
   - **Name:** Change to `support_ticket`

3. **Customize Conditional Node**
   - Click on **Conditional** node (middle)
   - You'll see 2 fields:
     - **Condition:** Type `priority == high`
     - **Logic:** Select `If/Else` from dropdown
   - **Notice:** This node has TWO output handles on the right (labeled "true" and "false")

4. **Customize First Output (Top)**
   - Click on the **top Output** node
   - **Name:** Change to `urgent_queue`

5. **Customize Second Output (Bottom)**
   - Click on the **bottom Output** node
   - **Name:** Change to `normal_queue`

6. **Add LLM for Urgent Path**
   - Drag **LLM** node and place it between Conditional and top Output
   - **Model:** Select `GPT-4`

7. **Reconnect the Urgent Path**
   - First, **delete** the existing edge from Conditional to top Output
     - Click on the edge (it highlights)
     - Press Delete key
   - Now connect: **Conditional's "true" handle** → **LLM's input**
   - Then connect: **LLM's output** → **urgent_queue Output**

8. **Verify the Flow**
   - You should now have:
     - Input → Conditional
     - Conditional (true) → LLM → urgent_queue
     - Conditional (false) → normal_queue

9. **Test**
   - Click **Submit Pipeline**
   - Console should show: 5 nodes, 4 edges, is_dag: true

10. **Save**
    - Press Ctrl+S
    - Name: `priority_router`

**✅ Success Check:**
- Branching logic visible (1 input splits to 2 outputs)
- Urgent path has LLM processing
- Normal path goes directly to output
- All connections correct

**⏱️ Time:** ~4-5 minutes

---

## 🎯 Practice Order (Recommended)

### For First Practice Run:
1. **Scenario 1** (easiest - build confidence)
2. **Scenario 2** (templates - quick)
3. **Scenario 3** (dynamic variables - practice the wow moment)
4. **Scenario 4** (most complex - practice until smooth)

### For Recording:
1. **Scenario 3** FIRST (most impressive - grab attention)
2. **Scenario 2** (show templates)
3. **Scenario 4** (show complexity)
4. **Scenario 1** (simple, clean finish) OR skip if time is tight

---

## 🔧 Troubleshooting

### If nodes don't show fields:
- Refresh the page
- Make sure you CLICK on the node to see its properties

### If connections don't work:
- Make sure you're dragging from the small circle handle
- Source (output) is on the RIGHT, Target (input) is on the LEFT

### If template doesn't load:
- Check browser console for errors
- Refresh and try again

### If variables don't create handles:
- Make sure you're using double curly braces: `{{ name }}`
- The Text node needs to be the special Text node, not Input node

### If Submit Pipeline doesn't work:
- Make sure backend is running (Terminal 1)
- Check http://localhost:8000 to verify backend is up
- Open browser console (F12) to see the response

---

## 📋 Quick Test Checklist

Before recording, verify each feature works:

- [ ] Drag & drop nodes from toolbar
- [ ] Click on nodes to edit fields
- [ ] Type in text fields
- [ ] Select from dropdowns
- [ ] Create connections between nodes
- [ ] Delete connections (click + Delete key)
- [ ] Templates dropdown loads pipelines
- [ ] {{ variable }} creates handles automatically
- [ ] Undo (Ctrl+Z) works
- [ ] Redo (Ctrl+Shift+Z) works
- [ ] Save (Ctrl+S) works
- [ ] Export (Ctrl+E) downloads JSON
- [ ] Submit Pipeline validates correctly
- [ ] Console shows correct output

---

## 🎬 Recording Tips

1. **Start clean** - Fresh browser, clear canvas
2. **Go slow** - Give viewers time to see what you're doing
3. **Narrate** - Explain what you're clicking and why
4. **Highlight** - Point out cool features (dynamic variables!)
5. **Show console** - Open F12 to show validation results
6. **Smooth mouse** - Slow, deliberate movements

**Good luck with practice! 🚀**

**When you're comfortable with all 4 scenarios, you're ready to record!**
