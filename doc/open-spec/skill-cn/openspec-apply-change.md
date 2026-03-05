---
name: openspec-apply-change
description: 实施 OpenSpec 变更中的任务。当用户想要开始实施、继续实施或处理任务时使用。
license: MIT
compatibility: 需要 openspec CLI。
metadata:
  author: openspec
  version: "1.0"
  generatedBy: "1.2.0"
---

实施 OpenSpec 变更中的任务。

**输入**: 可选地指定变更名称。如果省略，检查是否可以从对话上下文中推断出来。如果模糊或不明确，必须提示用户选择可用变更。

**步骤**

1. **选择变更**

   如果提供了名称，使用它。否则：
   - 如果用户提到了变更，从对话上下文中推断
   - 如果只存在一个活动变更，自动选择
   - 如果不明确，运行 `openspec list --json` 获取可用变更，并使用 **AskUserQuestion tool** 让用户选择

   始终宣布："Using change: <name>"（使用变更：<name>）以及如何覆盖（例如，`/opsx:apply <other>`）。

2. **检查状态以了解模式**
   ```bash
   openspec status --change "<name>" --json
   ```
   解析 JSON 以了解：
   - `schemaName`: 正在使用的模式（例如，"spec-driven"）
   - 哪个工件包含任务（对于 spec-driven 通常是 "tasks"，其他模式请检查状态）

3. **获取实施指令**

   ```bash
   openspec instructions apply --change "<name>" --json
   ```

   这将返回：
   - 上下文文件路径（因模式而异 - 可能是 proposal/specs/design/tasks 或 spec/tests/implementation/docs）
   - 进度（总计，完成，剩余）
   - 带有状态的任务列表
   - 基于当前状态的动态指令

   **处理状态：**
   - 如果 `state: "blocked"`（缺少工件）：显示消息，建议使用 openspec-continue-change
   - 如果 `state: "all_done"`：祝贺，建议归档
   - 否则：继续实施

4. **阅读上下文文件**

   阅读实施指令输出中 `contextFiles` 列出的文件。
   文件取决于正在使用的模式：
   - **spec-driven**: proposal, specs, design, tasks
   - 其他模式：遵循 CLI 输出的 contextFiles

5. **显示当前进度**

   显示：
   - 正在使用的模式
   - 进度："N/M tasks complete"（N/M 任务已完成）
   - 剩余任务概览
   - 来自 CLI 的动态指令

6. **实施任务（循环直到完成或阻塞）**

   对于每个待处理任务：
   - 显示正在处理哪个任务
   - 进行所需的代码更改
   - 保持更改最小化且专注
   - 在任务文件中标记任务完成：`- [ ]` → `- [x]`
   - 继续下一个任务

   **暂停条件：**
   - 任务不清楚 → 询问澄清
   - 实施揭示设计问题 → 建议更新工件
   - 遇到错误或阻塞 → 报告并等待指导
   - 用户中断

7. **完成或暂停时，显示状态**

   显示：
   - 本次会话完成的任务
   - 总体进度："N/M tasks complete"（N/M 任务已完成）
   - 如果全部完成：建议归档
   - 如果暂停：解释原因并等待指导

**实施期间的输出**

```
## Implementing: <change-name> (schema: <schema-name>)

Working on task 3/7: <task description>
[...implementation happening...]
✓ Task complete

Working on task 4/7: <task description>
[...implementation happening...]
✓ Task complete
```

**完成时的输出**

```
## Implementation Complete

**Change:** <change-name>
**Schema:** <schema-name>
**Progress:** 7/7 tasks complete ✓

### Completed This Session
- [x] Task 1
- [x] Task 2
...

All tasks complete! Ready to archive this change.
```

**暂停时的输出（遇到问题）**

```
## Implementation Paused

**Change:** <change-name>
**Schema:** <schema-name>
**Progress:** 4/7 tasks complete

### Issue Encountered
<description of the issue>

**Options:**
1. <option 1>
2. <option 2>
3. Other approach

What would you like to do?
```

**护栏**
- 继续执行任务直到完成或被阻塞
- 开始前始终阅读上下文文件（来自实施指令输出）
- 如果任务模棱两可，实施前暂停并询问
- 如果实施揭示问题，暂停并建议更新工件
- 保持代码更改最小化并限定在每个任务范围内
- 完成每个任务后立即更新任务复选框
- 遇到错误、阻塞或不明确的需求时暂停 - 不要猜测
- 使用 CLI 输出的 contextFiles，不要假设特定的文件名

**流畅的工作流集成**

此技能支持"变更上的操作"模型：

- **可随时调用**：在所有工件完成之前（如果任务存在），部分实施之后，与其他操作交错进行
- **允许工件更新**：如果实施揭示设计问题，建议更新工件 - 不锁定阶段，流畅工作
