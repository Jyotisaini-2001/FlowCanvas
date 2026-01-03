# FlowForge - Demo Scenarios for Recording

Here are 4 practical examples to demonstrate FlowForge's capabilities.

---

## 🎯 Scenario 1: Customer Support Chatbot Pipeline

**Use Case:** Automatically route customer messages to AI and send responses

### Step-by-Step Instructions:

1. **Start Fresh**
   - Open http://localhost:3000
   - Clear canvas if needed

2. **Build the Pipeline**
   - Drag **Input** node to canvas
     - Click on it
     - Set Name: `customer_message`
     - Set Type: `Text`

   - Drag **LLM** node to the right
     - Click on it
     - Select Model: `GPT-4`

   - Drag **Output** node to the right
     - Click on it
     - Set Name: `ai_response`
     - Set Type: `Text`

3. **Connect the Nodes**
   - Connect Input → LLM (drag from right circle to left circle)
   - Connect LLM → Output

4. **Save the Pipeline**
   - Click **💾 Save** button
   - Enter name: `customer_support_bot`
   - Press Enter

5. **Test It**
   - Click **Submit Pipeline** button
   - Check console: Should show "3 nodes, 2 edges, is_dag: true"

6. **Export It**
   - Press **Ctrl+E** (or click Export button)
   - JSON file downloads automatically

**What to Highlight in Recording:**
- Drag & drop functionality
- Node configuration editing
- Connection creation
- Save/Load feature
- Pipeline validation

---

## 🎯 Scenario 2: Content Moderation System

**Use Case:** Filter inappropriate content and transform it before publishing

### Step-by-Step Instructions:

1. **Load Template (Quick Start)**
   - Click **📋 Templates** dropdown
   - Select **"Data Processing Pipeline"**
   - Template loads with 4 nodes!

2. **Customize the Nodes**
   - Click on **Input** node
     - Change Name to: `user_content`

   - Click on **Filter** node
     - Set Field: `content`
     - Set Operator: `Contains`
     - Set Value: `spam`

   - Click on **Transform** node
     - Select: `lowercase`

   - Click on **Output** node
     - Change Name to: `clean_content`

3. **Test Undo/Redo**
   - Make a change to any node
   - Press **Ctrl+Z** to undo
   - Press **Ctrl+Shift+Z** to redo

4. **Save It**
   - Press **Ctrl+S**
   - Name: `content_moderator`

**What to Highlight in Recording:**
- Template system (instant pipeline setup)
- Multiple node types working together
- Undo/Redo keyboard shortcuts
- Real-time editing

---

## 🎯 Scenario 3: Dynamic Email Generator with Variables

**Use Case:** Create personalized emails using dynamic variables

### Step-by-Step Instructions:

1. **Start Fresh**
   - Clear canvas or refresh page

2. **Build with Text Node (Special Feature)**
   - Drag **Input** node
     - Name: `customer_name`
     - Type: `Text`

   - Drag **Input** node again
     - Name: `order_count`
     - Type: `Text`

   - Drag **Text** node to center
     - Click on it
     - In the text area, type:
       ```
       Hello {{ name }},

       Thank you for your {{ count }} orders!
       We appreciate your business.
       ```
     - **Watch the magic:** Two new handles appear for `name` and `count`!

   - Drag **LLM** node
     - Model: `GPT-3.5`

   - Drag **Output** node
     - Name: `email_content`

3. **Connect with Variables**
   - Connect first Input → Text node's `name` handle
   - Connect second Input → Text node's `count` handle
   - Connect Text → LLM
   - Connect LLM → Output

4. **Observe Variable Detection**
   - Edit the Text node content
   - Add new variable: `{{ product }}`
   - See new handle appear automatically!

5. **Save**
   - Name: `email_generator`

**What to Highlight in Recording:**
- Dynamic variable detection ({{ variable }} syntax)
- Automatic handle creation
- Multiple inputs to one node
- Real-time variable parsing

---

## 🎯 Scenario 4: Conditional Workflow with Decision Logic

**Use Case:** Route urgent vs normal customer requests differently

### Step-by-Step Instructions:

1. **Load Template**
   - Click **📋 Templates**
   - Select **"Conditional Routing"**

2. **Understand the Flow**
   - 1 Input splits into 2 Outputs based on condition
   - Point out the Conditional node with 2 output handles

3. **Customize**
   - Click **Input**
     - Name: `support_ticket`

   - Click **Conditional** node
     - Condition: `priority == high`
     - Logic: `If/Else`

   - Click first **Output** (top)
     - Name: `urgent_queue`

   - Click second **Output** (bottom)
     - Name: `normal_queue`

4. **Add More Nodes**
   - Drag **LLM** node between Conditional and urgent_queue
     - Model: `GPT-4`
     - This handles urgent tickets with better AI

   - Reconnect: Conditional (true) → LLM → urgent_queue

5. **Test the Pipeline**
   - Click **Submit Pipeline**
   - Show: "5 nodes, 4 edges, is_dag: true"

6. **Save**
   - Name: `priority_router`

**What to Highlight in Recording:**
- Conditional logic (if/else branching)
- Multiple outputs from one node
- Complex pipeline validation
- Adding nodes to existing template

---

## 🎬 Recording Tips

### What to Show in Each Demo:

1. **Opening Sequence** (for any scenario)
   - Terminal 1: `cd backend && uvicorn main:app --reload`
   - Terminal 2: `cd frontend && npm start`
   - Browser opens at localhost:3000

2. **During Build**
   - Smooth drag & drop
   - Click on nodes to show editing
   - Type in real-time to show responsiveness
   - Create connections with cursor

3. **Key Features to Demonstrate**
   - ✅ Drag & Drop nodes
   - ✅ Edit node properties
   - ✅ Create connections
   - ✅ Dynamic variables ({{ variable }})
   - ✅ Templates dropdown
   - ✅ Save/Load pipelines
   - ✅ Undo/Redo (Ctrl+Z/Ctrl+Shift+Z)
   - ✅ Export (Ctrl+E)
   - ✅ Submit & Validate
   - ✅ MiniMap & Controls

4. **Ending Sequence**
   - Click Submit Pipeline
   - Show console with validation result
   - Optionally show saved pipelines in localStorage (F12 → Application → Local Storage)

---

## 🎨 Visual Flow Summary

**Scenario 1:** Input → LLM → Output (Simple)
**Scenario 2:** Input → Filter → Transform → Output (Data Processing)
**Scenario 3:** Input + Input → Text(variables) → LLM → Output (Dynamic)
**Scenario 4:** Input → Conditional → [LLM → Output (urgent)] + [Output (normal)] (Branching)

---

## 🎥 Recommended Recording Order

1. **Scenario 3** (Most Impressive) - Shows dynamic variable magic
2. **Scenario 2** (Quick) - Shows templates + multiple node types
3. **Scenario 4** (Complex) - Shows conditional logic
4. **Scenario 1** (Simple) - Shows basic workflow

**Total Recording Time:** ~8-12 minutes for all 4 scenarios

Good luck with your demo! 🚀
